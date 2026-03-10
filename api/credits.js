const { Router } = require('express');
const { get, all, run } = require('../db/init');
const { authRequired, addCredits } = require('./middleware');

const router = Router();

const PLANS = {
  free: { name: 'Ucretsiz', price: 0, monthlyCredits: 100, dailyMessages: 20 },
  pro: { name: 'Pro', price: 99, monthlyCredits: 2000, dailyMessages: 200 },
  enterprise: { name: 'Kurumsal', price: null, monthlyCredits: 99999, dailyMessages: 99999 },
};

router.get('/plans', (req, res) => { res.json({ plans: PLANS }); });

router.get('/balance', authRequired, (req, res) => {
  const user = get('SELECT credits, plan, monthly_credits FROM users WHERE id = ?', [req.user.id]);
  const todayUsage = get("SELECT COALESCE(SUM(ABS(amount)), 0) as used FROM credit_transactions WHERE user_id = ? AND type = 'usage' AND created_at > datetime('now', '-1 day')", [req.user.id]);
  res.json({ credits: user.credits, plan: user.plan, todayUsage: todayUsage?.used || 0 });
});

router.get('/history', authRequired, (req, res) => {
  const txns = all('SELECT * FROM credit_transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 100', [req.user.id]);
  res.json({ transactions: txns });
});

router.post('/upgrade', authRequired, (req, res) => {
  const { plan } = req.body;
  if (!PLANS[plan]) return res.status(400).json({ error: 'Gecersiz plan' });
  run('UPDATE users SET plan = ?, monthly_credits = ?, credits = credits + ? WHERE id = ?',
    [plan, PLANS[plan].monthlyCredits, PLANS[plan].monthlyCredits, req.user.id]);
  addCredits(req.user.id, PLANS[plan].monthlyCredits, `Plan yukseltme: ${PLANS[plan].name}`);
  const updated = get('SELECT credits FROM users WHERE id = ?', [req.user.id]);
  res.json({ ok: true, plan, credits: updated.credits });
});

router.post('/earn', authRequired, (req, res) => {
  const { reason, amount } = req.body;
  if (!reason || !amount || amount <= 0 || amount > 50) return res.status(400).json({ error: 'Gecersiz bonus' });
  addCredits(req.user.id, amount, `Ogrenme bonusu: ${reason}`);
  res.json({ ok: true, added: amount });
});

module.exports = router;
