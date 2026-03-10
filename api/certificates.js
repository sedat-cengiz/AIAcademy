const { Router } = require('express');
const crypto = require('crypto');
const { get, all, run } = require('../db/init');
const { authRequired } = require('./middleware');

const router = Router();

router.post('/generate', authRequired, (req, res) => {
  const { level, score } = req.body;
  if (!level || !score || score < 70) return res.status(400).json({ error: 'Seviye ve min 70 skor gerekli' });

  const existing = get('SELECT * FROM certificates WHERE user_id = ? AND level = ?', [req.user.id, level]);
  if (existing) return res.json({ certificate: existing, alreadyExists: true });

  const code = `AIACAD-${level.toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  run('INSERT INTO certificates (user_id, level, score, certificate_code) VALUES (?, ?, ?, ?)', [req.user.id, level, score, code]);
  const cert = get('SELECT * FROM certificates WHERE certificate_code = ?', [code]);
  res.json({ certificate: cert });
});

router.get('/my', authRequired, (req, res) => {
  const certs = all('SELECT * FROM certificates WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
  res.json({ certificates: certs });
});

router.get('/verify/:code', (req, res) => {
  const cert = get('SELECT c.*, u.name as holder_name FROM certificates c JOIN users u ON c.user_id = u.id WHERE c.certificate_code = ?', [req.params.code]);
  if (!cert) return res.status(404).json({ valid: false });
  res.json({ valid: true, holderName: cert.holder_name, level: cert.level, score: cert.score, issuedAt: cert.created_at, code: cert.certificate_code });
});

router.get('/pdf/:code', authRequired, (req, res) => {
  const cert = get('SELECT c.*, u.name as holder_name FROM certificates c JOIN users u ON c.user_id = u.id WHERE c.certificate_code = ? AND c.user_id = ?', [req.params.code, req.user.id]);
  if (!cert) return res.status(404).json({ error: 'Sertifika bulunamadi' });
  const levelNames = { level1: 'Temel AI Okuryazarligi', level2: 'Is/Ofis AI Yetkinligi', level3: 'Teknik AI Uzmanligi' };
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Sertifika</title>
<style>@media print{body{margin:0}}body{font-family:'Segoe UI',sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#f8fafc;margin:0}
.cert{width:800px;padding:60px;background:#fff;border:3px solid #4f46e5;border-radius:12px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.1);position:relative}
.cert::before{content:'';position:absolute;inset:8px;border:1px solid #e5e7eb;border-radius:8px}
.logo{font-size:32px;font-weight:800;color:#4f46e5;margin-bottom:8px}.subtitle{color:#6b7280;font-size:14px;margin-bottom:30px}
.title{font-size:28px;color:#111827;margin-bottom:8px;font-weight:300;letter-spacing:4px;text-transform:uppercase}
.name{font-size:36px;font-weight:700;color:#1e293b;margin:20px 0;border-bottom:2px solid #4f46e5;display:inline-block;padding-bottom:8px}
.level{font-size:20px;color:#4f46e5;margin:16px 0}.score{font-size:16px;color:#6b7280}
.footer{margin-top:40px;display:flex;justify-content:space-between;font-size:12px;color:#9ca3af}
.qr{font-family:monospace;font-size:11px;padding:8px;background:#f1f5f9;border-radius:6px}</style></head>
<body><div class="cert"><div class="logo">AI Academy</div><div class="subtitle">Kurumsal AI Platform</div>
<div class="title">Sertifika</div><div class="name">${cert.holder_name}</div>
<div class="level">${levelNames[cert.level] || cert.level}</div><div class="score">Basari Puani: ${cert.score}/100</div>
<div class="footer"><div>Tarih: ${new Date(cert.created_at).toLocaleDateString('tr-TR')}</div><div class="qr">Dogrulama: ${cert.certificate_code}</div></div>
</div></body></html>`;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

module.exports = router;
