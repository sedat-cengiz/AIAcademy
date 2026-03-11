const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');
const { get, run } = require('../db/init');
const { authRequired, SECRET } = require('./middleware');

const router = Router();

const GOOGLE_SCOPES = [
  'openid',
  'profile',
  'email',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/contacts.readonly',
  'https://www.googleapis.com/auth/tasks.readonly',
];

function getOAuth2Client() {
  return new google.auth.OAuth2(
    (process.env.GOOGLE_CLIENT_ID || '').trim(),
    (process.env.GOOGLE_CLIENT_SECRET || '').trim(),
    (process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback').trim()
  );
}

router.post('/register', (req, res) => {
  const { email, password, name, role } = req.body;
  if (!email || !password || !name) return res.status(400).json({ error: 'E-posta, sifre ve isim gerekli' });
  if (password.length < 6) return res.status(400).json({ error: 'Sifre en az 6 karakter olmali' });

  const existing = get('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
  if (existing) return res.status(409).json({ error: 'Bu e-posta zaten kayitli' });

  const hash = bcrypt.hashSync(password, 10);
  run('INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)',
    [email.toLowerCase(), hash, name, role || 'general']);

  const user = get('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);
  const token = jwt.sign({ userId: user.id, email: user.email, name: user.name, role: user.role || 'general' }, SECRET(), { expiresIn: '30d' });
  res.json({ token, user: sanitizeUser(user) });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'E-posta ve sifre gerekli' });

  const user = get('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Gecersiz e-posta veya sifre' });
  }
  run("UPDATE users SET last_login = datetime('now') WHERE id = ?", [user.id]);
  const token = jwt.sign({ userId: user.id, email: user.email, name: user.name, role: user.role || 'general' }, SECRET(), { expiresIn: '30d' });
  res.json({ token, user: sanitizeUser(user) });
});

router.get('/me', authRequired, (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
});

router.put('/me', authRequired, (req, res) => {
  const { name, role } = req.body;
  if (name) run('UPDATE users SET name = ? WHERE id = ?', [name, req.user.id]);
  if (role) run('UPDATE users SET role = ? WHERE id = ?', [role, req.user.id]);
  const updated = get('SELECT * FROM users WHERE id = ?', [req.user.id]);
  res.json({ user: sanitizeUser(updated) });
});

router.post('/sync-progress', authRequired, (req, res) => {
  const { completedCourses, completedChallenges, points, quizResults } = req.body;
  run('UPDATE users SET completed_courses = ?, completed_challenges = ?, points = ?, quiz_results = ? WHERE id = ?',
    [JSON.stringify(completedCourses || []), JSON.stringify(completedChallenges || []), points || 0, JSON.stringify(quizResults || {}), req.user.id]);
  res.json({ ok: true });
});

// ─── GOOGLE OAUTH ────────────────────────────────────────────

router.get('/google', (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId || clientId.startsWith('your-')) {
    return res.status(500).json({ error: 'Google OAuth yapilandirilmamis. .env dosyasina GOOGLE_CLIENT_ID ve GOOGLE_CLIENT_SECRET ekleyin.' });
  }
  const oauth2 = getOAuth2Client();
  const url = oauth2.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: GOOGLE_SCOPES,
  });
  res.redirect(url);
});

router.get('/google/callback', async (req, res) => {
  const { code, error: oauthError } = req.query;
  if (oauthError || !code) {
    return res.redirect('/?auth_error=' + encodeURIComponent(oauthError || 'Yetkilendirme iptal edildi'));
  }

  try {
    const oauth2 = getOAuth2Client();
    const { tokens } = await oauth2.getToken(code);
    oauth2.setCredentials(tokens);

    const oauth2Api = google.oauth2({ version: 'v2', auth: oauth2 });
    const { data: profile } = await oauth2Api.userinfo.get();

    const googleId = profile.id;
    const email = profile.email;
    const name = profile.name || email.split('@')[0];
    const avatar = profile.picture || null;

    let user = get('SELECT * FROM users WHERE google_id = ?', [googleId]);
    if (!user) {
      user = get('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);
    }

    if (user) {
      run(`UPDATE users SET
        google_id = ?, google_access_token = ?, google_refresh_token = COALESCE(?, google_refresh_token),
        google_token_expiry = ?, avatar_url = ?, last_login = datetime('now')
        WHERE id = ?`,
        [googleId, tokens.access_token, tokens.refresh_token || null,
         tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
         avatar, user.id]);
    } else {
      run(`INSERT INTO users (email, password_hash, name, role, google_id, google_access_token, google_refresh_token, google_token_expiry, avatar_url)
        VALUES (?, '', ?, 'general', ?, ?, ?, ?, ?)`,
        [email.toLowerCase(), name, googleId, tokens.access_token,
         tokens.refresh_token || null,
         tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
         avatar]);
    }

    user = get('SELECT * FROM users WHERE google_id = ?', [googleId])
        || get('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);

    const jwtToken = jwt.sign({
      userId: user.id, email: user.email, name: user.name,
      role: user.role || 'general', googleId: googleId, avatarUrl: avatar,
    }, SECRET(), { expiresIn: '30d' });
    res.redirect(`/?token=${jwtToken}`);
  } catch (err) {
    console.error('Google OAuth callback error:', err.message);
    res.redirect('/?auth_error=' + encodeURIComponent('Google giris basarisiz: ' + err.message));
  }
});

router.post('/google/link', authRequired, (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId || clientId.startsWith('your-')) {
    return res.status(500).json({ error: 'Google OAuth yapilandirilmamis' });
  }
  const oauth2 = getOAuth2Client();
  const url = oauth2.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: GOOGLE_SCOPES,
    state: `link_${req.user.id}`,
  });
  res.json({ url });
});

function sanitizeUser(u) {
  return {
    id: u.id, email: u.email, name: u.name, role: u.role, plan: u.plan,
    credits: u.credits, monthlyCredits: u.monthly_credits, isAdmin: !!u.is_admin,
    completedCourses: JSON.parse(u.completed_courses || '[]'),
    completedChallenges: JSON.parse(u.completed_challenges || '[]'),
    points: u.points, quizResults: JSON.parse(u.quiz_results || '{}'),
    companyId: u.company_id, createdAt: u.created_at,
    googleConnected: !!u.google_id,
    avatarUrl: u.avatar_url || null,
  };
}

module.exports = router;
