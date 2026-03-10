const jwt = require('jsonwebtoken');
const { get, run } = require('../db/init');

const SECRET = () => process.env.JWT_SECRET || 'dev-secret-change-me';

function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Yetkilendirme gerekli' });
  }
  try {
    const payload = jwt.verify(header.slice(7), SECRET());
    const user = get('SELECT * FROM users WHERE id = ?', [payload.userId]);
    if (!user) return res.status(401).json({ error: 'Kullanici bulunamadi' });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: 'Gecersiz token' });
  }
}

function adminRequired(req, res, next) {
  authRequired(req, res, () => {
    if (!req.user.is_admin) {
      return res.status(403).json({ error: 'Yonetici yetkisi gerekli' });
    }
    next();
  });
}

function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return next();
  try {
    const payload = jwt.verify(header.slice(7), SECRET());
    const user = get('SELECT * FROM users WHERE id = ?', [payload.userId]);
    if (user) req.user = user;
  } catch { /* ignore */ }
  next();
}

function deductCredits(userId, amount, description) {
  const user = get('SELECT credits FROM users WHERE id = ?', [userId]);
  if (!user || user.credits < amount) return false;
  run('UPDATE users SET credits = credits - ? WHERE id = ?', [amount, userId]);
  run('INSERT INTO credit_transactions (user_id, amount, type, description) VALUES (?, ?, ?, ?)',
    [userId, -amount, 'usage', description]);
  return true;
}

function addCredits(userId, amount, description) {
  run('UPDATE users SET credits = credits + ? WHERE id = ?', [amount, userId]);
  run('INSERT INTO credit_transactions (user_id, amount, type, description) VALUES (?, ?, ?, ?)',
    [userId, amount, 'topup', description]);
}

module.exports = { authRequired, adminRequired, optionalAuth, deductCredits, addCredits, SECRET };
