const { Router } = require('express');
const { google } = require('googleapis');
const { get, run } = require('../db/init');
const { authRequired } = require('./middleware');

const router = Router();

function getAuthClient(user) {
  const oauth2 = new google.auth.OAuth2(
    (process.env.GOOGLE_CLIENT_ID || '').trim(),
    (process.env.GOOGLE_CLIENT_SECRET || '').trim(),
    (process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback').trim()
  );
  oauth2.setCredentials({
    access_token: user.google_access_token,
    refresh_token: user.google_refresh_token,
    expiry_date: user.google_token_expiry ? new Date(user.google_token_expiry).getTime() : undefined,
  });
  oauth2.on('tokens', (tokens) => {
    if (tokens.access_token) {
      run('UPDATE users SET google_access_token = ?, google_token_expiry = ? WHERE id = ?', [
        tokens.access_token,
        tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
        user.id,
      ]);
    }
    if (tokens.refresh_token) {
      run('UPDATE users SET google_refresh_token = ? WHERE id = ?', [tokens.refresh_token, user.id]);
    }
  });
  return oauth2;
}

function requireGoogle(req, res, next) {
  authRequired(req, res, () => {
    if (req.user.plan === 'free') {
      return res.status(403).json({ error: 'Google entegrasyonu Pro plan gerektirir.', requiresPro: true });
    }
    if (!req.user.google_id || !req.user.google_access_token) {
      return res.status(403).json({ error: 'Google hesabi baglanmamis. Once Google ile giris yapin.' });
    }
    req.gAuth = getAuthClient(req.user);
    next();
  });
}

// ─── STATUS ──────────────────────────────────────────────────

router.get('/status', authRequired, (req, res) => {
  const connected = !!req.user.google_id && !!req.user.google_access_token;
  res.json({
    connected,
    googleId: req.user.google_id || null,
    avatarUrl: req.user.avatar_url || null,
    services: connected ? ['gmail', 'calendar', 'drive', 'contacts', 'tasks'] : [],
  });
});

// ─── PROFILE ─────────────────────────────────────────────────

router.get('/profile', requireGoogle, async (req, res) => {
  try {
    const oauth2 = google.oauth2({ version: 'v2', auth: req.gAuth });
    const { data } = await oauth2.userinfo.get();
    res.json({ profile: data });
  } catch (err) {
    handleGoogleError(res, err);
  }
});

// ─── GMAIL ───────────────────────────────────────────────────

router.get('/gmail/messages', requireGoogle, async (req, res) => {
  try {
    const gmail = google.gmail({ version: 'v1', auth: req.gAuth });
    const { q, maxResults, pageToken } = req.query;
    const { data } = await gmail.users.messages.list({
      userId: 'me',
      q: q || '',
      maxResults: Math.min(parseInt(maxResults) || 20, 50),
      pageToken: pageToken || undefined,
    });

    if (!data.messages || data.messages.length === 0) {
      return res.json({ messages: [], nextPageToken: null, total: 0 });
    }

    const summaries = await Promise.all(
      data.messages.slice(0, 20).map(async (m) => {
        const { data: msg } = await gmail.users.messages.get({
          userId: 'me', id: m.id, format: 'metadata',
          metadataHeaders: ['Subject', 'From', 'Date', 'To'],
        });
        const headers = msg.payload?.headers || [];
        const getH = (name) => headers.find(h => h.name === name)?.value || '';
        return {
          id: m.id, threadId: m.threadId,
          subject: getH('Subject'), from: getH('From'),
          to: getH('To'), date: getH('Date'),
          snippet: msg.snippet || '',
          labelIds: msg.labelIds || [],
          isUnread: (msg.labelIds || []).includes('UNREAD'),
        };
      })
    );

    res.json({ messages: summaries, nextPageToken: data.nextPageToken || null, total: data.resultSizeEstimate || 0 });
  } catch (err) {
    handleGoogleError(res, err);
  }
});

router.get('/gmail/messages/:id', requireGoogle, async (req, res) => {
  try {
    const gmail = google.gmail({ version: 'v1', auth: req.gAuth });
    const { data } = await gmail.users.messages.get({ userId: 'me', id: req.params.id, format: 'full' });
    const headers = data.payload?.headers || [];
    const getH = (name) => headers.find(h => h.name === name)?.value || '';

    let body = '';
    if (data.payload?.body?.data) {
      body = Buffer.from(data.payload.body.data, 'base64url').toString('utf-8');
    } else if (data.payload?.parts) {
      const textPart = data.payload.parts.find(p => p.mimeType === 'text/plain')
                    || data.payload.parts.find(p => p.mimeType === 'text/html');
      if (textPart?.body?.data) {
        body = Buffer.from(textPart.body.data, 'base64url').toString('utf-8');
      }
    }

    res.json({
      id: data.id, threadId: data.threadId,
      subject: getH('Subject'), from: getH('From'),
      to: getH('To'), date: getH('Date'), cc: getH('Cc'),
      snippet: data.snippet || '', body,
      labelIds: data.labelIds || [],
    });
  } catch (err) {
    handleGoogleError(res, err);
  }
});

// ─── CALENDAR ────────────────────────────────────────────────

router.get('/calendar/events', requireGoogle, async (req, res) => {
  try {
    const calendar = google.calendar({ version: 'v3', auth: req.gAuth });
    const now = new Date();
    const { data } = await calendar.events.list({
      calendarId: 'primary',
      timeMin: req.query.timeMin || now.toISOString(),
      timeMax: req.query.timeMax || new Date(now.getTime() + 7 * 86400000).toISOString(),
      maxResults: Math.min(parseInt(req.query.maxResults) || 30, 100),
      singleEvents: true,
      orderBy: 'startTime',
    });
    const events = (data.items || []).map(e => ({
      id: e.id, summary: e.summary || '(Basliks\u0131z)',
      description: e.description || '', location: e.location || '',
      start: e.start?.dateTime || e.start?.date,
      end: e.end?.dateTime || e.end?.date,
      status: e.status, htmlLink: e.htmlLink,
      attendees: (e.attendees || []).map(a => ({ email: a.email, name: a.displayName, status: a.responseStatus })),
      organizer: e.organizer ? { email: e.organizer.email, name: e.organizer.displayName } : null,
    }));
    res.json({ events, summary: data.summary });
  } catch (err) {
    handleGoogleError(res, err);
  }
});

router.post('/calendar/events', requireGoogle, async (req, res) => {
  try {
    const calendar = google.calendar({ version: 'v3', auth: req.gAuth });
    const { summary, description, location, start, end, attendees } = req.body;
    if (!summary || !start || !end) return res.status(400).json({ error: 'Baslik, baslangic ve bitis gerekli' });

    const { data } = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary, description: description || '', location: location || '',
        start: { dateTime: start, timeZone: 'Europe/Istanbul' },
        end: { dateTime: end, timeZone: 'Europe/Istanbul' },
        attendees: (attendees || []).map(e => ({ email: e })),
      },
    });
    res.json({ event: { id: data.id, summary: data.summary, htmlLink: data.htmlLink } });
  } catch (err) {
    handleGoogleError(res, err);
  }
});

// ─── DRIVE ───────────────────────────────────────────────────

router.get('/drive/files', requireGoogle, async (req, res) => {
  try {
    const drive = google.drive({ version: 'v3', auth: req.gAuth });
    const { q, pageSize, pageToken, orderBy } = req.query;
    const { data } = await drive.files.list({
      q: q || undefined,
      pageSize: Math.min(parseInt(pageSize) || 20, 100),
      pageToken: pageToken || undefined,
      orderBy: orderBy || 'modifiedTime desc',
      fields: 'nextPageToken, files(id, name, mimeType, size, modifiedTime, webViewLink, iconLink, thumbnailLink, owners)',
    });
    const files = (data.files || []).map(f => ({
      id: f.id, name: f.name, mimeType: f.mimeType,
      size: f.size ? parseInt(f.size) : null,
      modifiedTime: f.modifiedTime,
      webViewLink: f.webViewLink, iconLink: f.iconLink,
      thumbnailLink: f.thumbnailLink,
      owner: f.owners?.[0]?.displayName || '',
    }));
    res.json({ files, nextPageToken: data.nextPageToken || null });
  } catch (err) {
    handleGoogleError(res, err);
  }
});

router.get('/drive/files/:id', requireGoogle, async (req, res) => {
  try {
    const drive = google.drive({ version: 'v3', auth: req.gAuth });
    const { data: meta } = await drive.files.get({
      fileId: req.params.id,
      fields: 'id, name, mimeType, size, modifiedTime, webViewLink, description',
    });

    let textContent = null;
    const exportable = ['application/vnd.google-apps.document', 'application/vnd.google-apps.spreadsheet', 'application/vnd.google-apps.presentation'];
    if (exportable.includes(meta.mimeType)) {
      const { data: exported } = await drive.files.export({ fileId: req.params.id, mimeType: 'text/plain' });
      textContent = typeof exported === 'string' ? exported : JSON.stringify(exported);
    } else if (meta.mimeType?.startsWith('text/') && parseInt(meta.size || '0') < 500000) {
      const { data: content } = await drive.files.get({ fileId: req.params.id, alt: 'media' }, { responseType: 'text' });
      textContent = content;
    }

    res.json({ file: { ...meta, textContent } });
  } catch (err) {
    handleGoogleError(res, err);
  }
});

// ─── CONTACTS (People API) ──────────────────────────────────

router.get('/contacts', requireGoogle, async (req, res) => {
  try {
    const people = google.people({ version: 'v1', auth: req.gAuth });
    const { data } = await people.people.connections.list({
      resourceName: 'people/me',
      pageSize: Math.min(parseInt(req.query.pageSize) || 50, 200),
      personFields: 'names,emailAddresses,phoneNumbers,organizations,photos',
      sortOrder: 'LAST_MODIFIED_DESCENDING',
      pageToken: req.query.pageToken || undefined,
    });
    const contacts = (data.connections || []).map(c => ({
      resourceName: c.resourceName,
      name: c.names?.[0]?.displayName || '',
      email: c.emailAddresses?.[0]?.value || '',
      phone: c.phoneNumbers?.[0]?.value || '',
      organization: c.organizations?.[0]?.name || '',
      photo: c.photos?.[0]?.url || '',
    }));
    res.json({ contacts, nextPageToken: data.nextPageToken || null, total: data.totalPeople || contacts.length });
  } catch (err) {
    handleGoogleError(res, err);
  }
});

// ─── TASKS ───────────────────────────────────────────────────

router.get('/tasks/lists', requireGoogle, async (req, res) => {
  try {
    const tasks = google.tasks({ version: 'v1', auth: req.gAuth });
    const { data } = await tasks.tasklists.list({ maxResults: 20 });
    res.json({ lists: (data.items || []).map(l => ({ id: l.id, title: l.title, updated: l.updated })) });
  } catch (err) {
    handleGoogleError(res, err);
  }
});

router.get('/tasks/lists/:id/tasks', requireGoogle, async (req, res) => {
  try {
    const tasks = google.tasks({ version: 'v1', auth: req.gAuth });
    const { data } = await tasks.tasks.list({
      tasklist: req.params.id,
      maxResults: 100,
      showCompleted: req.query.showCompleted !== 'false',
    });
    const items = (data.items || []).map(t => ({
      id: t.id, title: t.title || '', notes: t.notes || '',
      status: t.status, due: t.due || null, completed: t.completed || null,
      updated: t.updated, position: t.position,
    }));
    res.json({ tasks: items });
  } catch (err) {
    handleGoogleError(res, err);
  }
});

// ─── ERROR HANDLER ───────────────────────────────────────────

function handleGoogleError(res, err) {
  console.error('Google API error:', err.message);
  if (err.code === 401 || err.message?.includes('invalid_grant')) {
    return res.status(401).json({ error: 'Google oturumu suresi doldu. Lutfen tekrar Google ile giris yapin.', reauth: true });
  }
  if (err.code === 403) {
    return res.status(403).json({ error: 'Bu Google servisine erisim izni yok. Lutfen izinleri kontrol edin.' });
  }
  res.status(500).json({ error: 'Google API hatasi: ' + (err.message || 'Bilinmeyen hata') });
}

module.exports = router;
