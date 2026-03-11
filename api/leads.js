const { Router } = require('express');
const { run, all } = require('../db/init');
const { optionalAuth, adminRequired } = require('./middleware');

const router = Router();

router.post('/', optionalAuth, (req, res) => {
  let { plan, name, email, company, phone, message, source } = req.body || {};
  plan = (plan || '').trim();
  name = (name || '').trim();
  email = (email || '').trim();
  company = (company || '').trim();
  phone = (phone || '').trim();
  message = (message || '').trim();
  source = (source || 'plan_contact').trim();

  if (!plan || !name || !email) {
    return res.status(400).json({ error: 'Plan, ad ve e-posta zorunludur.' });
  }

  run(
    `INSERT INTO leads (plan, name, email, company, phone, message, source, status, user_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?)`,
    [plan, name, email, company || null, phone || null, message || null, source, req.user?.id || null]
  );

  return res.json({ ok: true });
});

router.get('/', adminRequired, (req, res) => {
  const leads = all(
    `SELECT id, plan, name, email, company, phone, message, source, status, user_id, created_at
     FROM leads
     ORDER BY created_at DESC
     LIMIT 200`
  );
  res.json({ leads });
});

module.exports = router;

