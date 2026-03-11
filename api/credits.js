const { Router } = require('express');
const { get, all, run } = require('../db/init');
const { authRequired, addCredits } = require('./middleware');

const router = Router();

const PLANS = {
  free: {
    name: 'Ucretsiz', price: 0, monthlyCredits: 50, dailyMessages: 10, dailyToolUses: 3,
    allowedTools: ['email-writer', 'summarizer', 'translator'],
    model: 'claude-3-haiku-20240307',
    features: ['Tum egitimler', 'Kutuphane erisimi', 'Sinav ve sertifika', 'Gunluk gorevler', 'AI Asistan (10 mesaj/gun)', '3 AI Araci (3 kullanim/gun)', 'Ucretsiz promptlar'],
  },
  pro: {
    name: 'Pro', price: 99, monthlyCredits: 2000, dailyMessages: 200, dailyToolUses: 999,
    allowedTools: 'all',
    model: 'claude-sonnet-4-20250514',
    features: ['Tum ucretsiz ozellikler', 'AI Asistan (200 mesaj/gun)', 'Tum 8 AI Araci', 'Google Workspace entegrasyonu', 'Prompt pazaryeri (alim-satim)', 'Oncelikli destek', 'Gelismis AI modeli (Sonnet)'],
  },
  enterprise: {
    name: 'Kurumsal', price: null, monthlyCredits: 99999, dailyMessages: 99999, dailyToolUses: 99999,
    allowedTools: 'all',
    model: 'claude-sonnet-4-20250514',
    features: ['Tum Pro ozellikleri', 'Sinirsiz kullanim', 'Admin paneli', 'AI Olgunluk Skoru', 'Toplu kullanici yonetimi', 'KVKK uyumluluk raporu', 'API erisimi', 'Ozel branding', 'Dedike destek'],
  },
};

function getPlanForUser(user) {
  return PLANS[user.plan] || PLANS.free;
}

function getDailyToolUsage(userId) {
  const row = get("SELECT COUNT(*) as cnt FROM tool_usage WHERE user_id = ? AND created_at > datetime('now', '-1 day')", [userId]);
  return row?.cnt || 0;
}

router.get('/plans', (req, res) => { res.json({ plans: PLANS }); });

router.get('/limits', authRequired, (req, res) => {
  const plan = getPlanForUser(req.user);
  const todayMessages = get("SELECT COUNT(*) as cnt FROM chat_messages WHERE user_id = ? AND role = 'user' AND created_at > datetime('now', '-1 day')", [req.user.id]);
  const todayTools = getDailyToolUsage(req.user.id);
  res.json({
    plan: req.user.plan,
    dailyMessages: { used: todayMessages?.cnt || 0, limit: plan.dailyMessages },
    dailyToolUses: { used: todayTools, limit: plan.dailyToolUses },
    credits: { remaining: req.user.credits, monthly: plan.monthlyCredits },
    allowedTools: plan.allowedTools,
    model: plan.model,
  });
});

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
module.exports.PLANS = PLANS;
module.exports.getPlanForUser = getPlanForUser;
module.exports.getDailyToolUsage = getDailyToolUsage;
