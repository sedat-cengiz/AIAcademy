const { Router } = require('express');
const { get, all, run } = require('../db/init');
const { authRequired, optionalAuth, deductCredits, addCredits } = require('./middleware');

const router = Router();

router.get('/prompts', optionalAuth, (req, res) => {
  const { category, sort, search } = req.query;
  let sql = 'SELECT p.*, u.name as author_name FROM prompts p JOIN users u ON p.user_id = u.id WHERE 1=1';
  const params = [];

  if (category && category !== 'all') { sql += ' AND p.category = ?'; params.push(category); }
  if (search) { sql += ' AND (p.title LIKE ? OR p.description LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }

  if (sort === 'popular') sql += ' ORDER BY p.usage_count DESC';
  else if (sort === 'rating') sql += ' ORDER BY (CASE WHEN p.rating_count > 0 THEN p.rating_sum / p.rating_count ELSE 0 END) DESC';
  else if (sort === 'newest') sql += ' ORDER BY p.created_at DESC';
  else sql += ' ORDER BY p.is_featured DESC, p.usage_count DESC';
  sql += ' LIMIT 50';

  const prompts = all(sql, params);
  res.json({ prompts: prompts.map(p => ({ ...p, avgRating: p.rating_count > 0 ? (p.rating_sum / p.rating_count).toFixed(1) : null })) });
});

router.post('/prompts', authRequired, (req, res) => {
  const { title, description, content, category, price } = req.body;
  if (!title || !content || !category) return res.status(400).json({ error: 'Baslik, icerik ve kategori gerekli' });
  run('INSERT INTO prompts (user_id, title, description, content, category, price) VALUES (?, ?, ?, ?, ?, ?)',
    [req.user.id, title, description || '', content, category, price || 0]);
  res.json({ ok: true });
});

router.get('/prompts/:id', optionalAuth, (req, res) => {
  const prompt = get('SELECT p.*, u.name as author_name FROM prompts p JOIN users u ON p.user_id = u.id WHERE p.id = ?', [req.params.id]);
  if (!prompt) return res.status(404).json({ error: 'Prompt bulunamadi' });

  let canView = prompt.price === 0 || (req.user && prompt.user_id === req.user.id);
  if (req.user && !canView) {
    const purchased = get('SELECT id FROM prompt_purchases WHERE prompt_id = ? AND user_id = ?', [prompt.id, req.user.id]);
    canView = !!purchased;
  }

  const ratings = all('SELECT r.*, u.name as reviewer_name FROM prompt_ratings r JOIN users u ON r.user_id = u.id WHERE r.prompt_id = ? ORDER BY r.created_at DESC LIMIT 20', [prompt.id]);
  res.json({ prompt: { ...prompt, content: canView ? prompt.content : '[Satin almaniz gerekiyor]', avgRating: prompt.rating_count > 0 ? (prompt.rating_sum / prompt.rating_count).toFixed(1) : null, canView }, ratings });
});

router.post('/prompts/:id/buy', authRequired, (req, res) => {
  const prompt = get('SELECT * FROM prompts WHERE id = ?', [req.params.id]);
  if (!prompt) return res.status(404).json({ error: 'Prompt bulunamadi' });
  if (prompt.price === 0 || prompt.user_id === req.user.id) return res.json({ ok: true });

  const already = get('SELECT id FROM prompt_purchases WHERE prompt_id = ? AND user_id = ?', [prompt.id, req.user.id]);
  if (already) return res.json({ ok: true });

  if (!deductCredits(req.user.id, prompt.price, `Prompt: ${prompt.title}`)) return res.status(402).json({ error: 'Yetersiz kredi' });
  addCredits(prompt.user_id, Math.floor(prompt.price * 0.8), `Prompt satisi: ${prompt.title}`);
  run('INSERT INTO prompt_purchases (prompt_id, user_id, price_paid) VALUES (?, ?, ?)', [prompt.id, req.user.id, prompt.price]);
  res.json({ ok: true, creditsUsed: prompt.price });
});

router.post('/prompts/:id/rate', authRequired, (req, res) => {
  const { rating, comment } = req.body;
  if (!rating || rating < 1 || rating > 5) return res.status(400).json({ error: 'Puan 1-5 arasi olmali' });
  const prompt = get('SELECT * FROM prompts WHERE id = ?', [req.params.id]);
  if (!prompt) return res.status(404).json({ error: 'Prompt bulunamadi' });

  const existing = get('SELECT * FROM prompt_ratings WHERE prompt_id = ? AND user_id = ?', [prompt.id, req.user.id]);
  if (existing) {
    run('UPDATE prompt_ratings SET rating = ?, comment = ? WHERE id = ?', [rating, comment || '', existing.id]);
    run('UPDATE prompts SET rating_sum = rating_sum + ? WHERE id = ?', [rating - existing.rating, prompt.id]);
  } else {
    run('INSERT INTO prompt_ratings (prompt_id, user_id, rating, comment) VALUES (?, ?, ?, ?)', [prompt.id, req.user.id, rating, comment || '']);
    run('UPDATE prompts SET rating_sum = rating_sum + ?, rating_count = rating_count + 1 WHERE id = ?', [rating, prompt.id]);
  }
  run('UPDATE prompts SET usage_count = usage_count + 1 WHERE id = ?', [prompt.id]);
  res.json({ ok: true });
});

module.exports = router;
