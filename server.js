require('dotenv').config();
const express = require('express');
const path = require('path');
const { initDb, get, all } = require('./db/init');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

async function start() {
  await initDb();

  app.use('/api/auth', require('./api/auth'));
  app.use('/api/chat', require('./api/chat'));
  app.use('/api/tools', require('./api/tools'));
  app.use('/api/credits', require('./api/credits'));
  app.use('/api/marketplace', require('./api/marketplace'));
  app.use('/api/certificates', require('./api/certificates'));
  app.use('/api/admin', require('./api/admin'));
  app.use('/api/google', require('./api/google'));
  app.use('/api/news', require('./api/news'));

  app.get('/api/leaderboard', (req, res) => {
    const { period } = req.query;
    let dateFilter = '';
    if (period === 'week') dateFilter = "AND last_login > datetime('now', '-7 day')";
    else if (period === 'month') dateFilter = "AND last_login > datetime('now', '-30 day')";

    const users = all(`SELECT id, name, role, points FROM users WHERE 1=1 ${dateFilter} ORDER BY points DESC LIMIT 50`);
    const departments = all(`SELECT role, COUNT(*) as user_count, SUM(points) as total_points, AVG(points) as avg_points FROM users GROUP BY role ORDER BY total_points DESC`);
    res.json({ users, departments });
  });

  app.get('/api/roi', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Auth gerekli' });
    const jwt = require('jsonwebtoken');
    let userId;
    try {
      const p = jwt.verify(authHeader.slice(7), process.env.JWT_SECRET || 'dev-secret-change-me');
      userId = p.userId;
    } catch { return res.status(401).json({ error: 'Gecersiz token' }); }

    const user = get('SELECT * FROM users WHERE id = ?', [userId]);
    if (!user) return res.status(404).json({ error: 'Kullanici bulunamadi' });

    const messageCount = get("SELECT COUNT(*) as cnt FROM chat_messages WHERE user_id = ? AND role = 'user'", [userId])?.cnt || 0;
    const toolCount = get('SELECT COUNT(*) as cnt FROM tool_usage WHERE user_id = ?', [userId])?.cnt || 0;
    const courseCount = JSON.parse(user.completed_courses || '[]').length;

    const estimatedMinutesSaved = (messageCount * 5) + (toolCount * 15) + (courseCount * 10);
    const estimatedHoursSaved = (estimatedMinutesSaved / 60).toFixed(1);
    const estimatedValueTL = Math.round(estimatedMinutesSaved / 60 * 150);

    res.json({ messageCount, toolCount, courseCount, estimatedMinutesSaved, estimatedHoursSaved, estimatedValueTL,
      breakdown: { chatSaving: `${messageCount} mesaj x ~5 dk`, toolSaving: `${toolCount} arac x ~15 dk`, learningSaving: `${courseCount} egitim x ~10 dk` }
    });
  });

  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/docs', express.static(path.join(__dirname, 'docs')));

  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Endpoint bulunamadi' });
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`AI Academy Platform running on http://localhost:${PORT}`);
  });
}

start().catch(err => { console.error('Failed to start:', err); process.exit(1); });
