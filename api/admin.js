const { Router } = require('express');
const { get, all, run } = require('../db/init');
const { adminRequired } = require('./middleware');

const router = Router();

router.get('/dashboard', adminRequired, (req, res) => {
  const totalUsers = get('SELECT COUNT(*) as cnt FROM users')?.cnt || 0;
  const activeToday = get("SELECT COUNT(*) as cnt FROM users WHERE last_login > datetime('now', '-1 day')")?.cnt || 0;
  const totalMessages = get('SELECT COUNT(*) as cnt FROM chat_messages')?.cnt || 0;
  const totalToolUses = get('SELECT COUNT(*) as cnt FROM tool_usage')?.cnt || 0;
  const totalCerts = get('SELECT COUNT(*) as cnt FROM certificates')?.cnt || 0;
  const totalPrompts = get('SELECT COUNT(*) as cnt FROM prompts')?.cnt || 0;
  const topUsers = all('SELECT id, name, email, points, credits FROM users ORDER BY points DESC LIMIT 10');
  res.json({ stats: { totalUsers, activeToday, totalMessages, totalToolUses, totalCerts, totalPrompts }, topUsers });
});

router.get('/users', adminRequired, (req, res) => {
  const { search, role, plan } = req.query;
  let sql = 'SELECT id, name, email, role, plan, credits, points, is_admin, completed_courses, completed_challenges, created_at, last_login FROM users WHERE 1=1';
  const params = [];
  if (search) { sql += ' AND (name LIKE ? OR email LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
  if (role && role !== 'all') { sql += ' AND role = ?'; params.push(role); }
  if (plan && plan !== 'all') { sql += ' AND plan = ?'; params.push(plan); }
  sql += ' ORDER BY created_at DESC LIMIT 200';

  const users = all(sql, params).map(u => ({
    ...u,
    courseCount: JSON.parse(u.completed_courses || '[]').length,
    challengeCount: JSON.parse(u.completed_challenges || '[]').length,
  }));
  res.json({ users });
});

router.put('/users/:id', adminRequired, (req, res) => {
  const { role, plan, credits, is_admin } = req.body;
  if (role) run('UPDATE users SET role = ? WHERE id = ?', [role, req.params.id]);
  if (plan) run('UPDATE users SET plan = ? WHERE id = ?', [plan, req.params.id]);
  if (typeof credits === 'number') run('UPDATE users SET credits = ? WHERE id = ?', [credits, req.params.id]);
  if (typeof is_admin === 'number') run('UPDATE users SET is_admin = ? WHERE id = ?', [is_admin, req.params.id]);
  res.json({ ok: true });
});

router.post('/bulk-import', adminRequired, (req, res) => {
  const { users } = req.body;
  if (!Array.isArray(users)) return res.status(400).json({ error: 'users dizisi gerekli' });
  const bcrypt = require('bcryptjs');
  let imported = 0, skipped = 0;
  for (const u of users) {
    if (!u.email || !u.name) { skipped++; continue; }
    try {
      const hash = bcrypt.hashSync(u.password || 'changeme123', 10);
      run('INSERT INTO users (email, password_hash, name, role, plan) VALUES (?, ?, ?, ?, ?)',
        [u.email.toLowerCase(), hash, u.name, u.role || 'general', u.plan || 'free']);
      imported++;
    } catch { skipped++; }
  }
  res.json({ imported, skipped, total: users.length });
});

router.get('/ai-maturity', adminRequired, (req, res) => {
  const total = get('SELECT COUNT(*) as cnt FROM users')?.cnt || 0;
  if (total === 0) return res.json({ score: 0, level: 'Farkindalik Oncesi', breakdown: { education: 0, practice: 0, adoption: 0, certification: 0 }, recommendations: [] });

  const chatUsers = get('SELECT COUNT(DISTINCT user_id) as cnt FROM chat_messages')?.cnt || 0;
  const toolUsers = get('SELECT COUNT(DISTINCT user_id) as cnt FROM tool_usage')?.cnt || 0;
  const certUsers = get('SELECT COUNT(DISTINCT user_id) as cnt FROM certificates')?.cnt || 0;

  const educationScore = Math.min(100, 30);
  const practiceScore = Math.min(100, 20);
  const adoptionScore = Math.min(100, ((chatUsers + toolUsers) / Math.max(total, 1)) * 50);
  const certificationScore = Math.min(100, (certUsers / Math.max(total, 1)) * 100);
  const overall = Math.round(educationScore * 0.3 + practiceScore * 0.2 + adoptionScore * 0.35 + certificationScore * 0.15);

  let level = 'Farkindalik Oncesi';
  if (overall >= 80) level = 'Lider';
  else if (overall >= 60) level = 'Ileri';
  else if (overall >= 40) level = 'Gelisen';
  else if (overall >= 20) level = 'Baslangic';

  const recs = [];
  if (educationScore < 50) recs.push('Zorunlu egitimlerin tamamlanma oranini artirin.');
  if (adoptionScore < 40) recs.push('AI arac kullanimini tesvik edin.');
  if (certificationScore < 30) recs.push('Sertifika programini tanitin.');
  if (!recs.length) recs.push('Harika! AI olgunluk seviyeniz yuksek.');

  res.json({ score: overall, level, breakdown: { education: Math.round(educationScore), practice: Math.round(practiceScore), adoption: Math.round(adoptionScore), certification: Math.round(certificationScore) }, recommendations: recs });
});

module.exports = router;
