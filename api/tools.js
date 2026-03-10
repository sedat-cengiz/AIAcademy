const { Router } = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const { run } = require('../db/init');
const { authRequired, deductCredits } = require('./middleware');

const router = Router();

const TOOL_DEFS = {
  'email-writer': { name: 'E-posta Yazici', creditCost: 3,
    buildPrompt: (p) => `Profesyonel bir is e-postasi yaz.\nTon: ${p.tone || 'profesyonel'}\nKonu: ${p.subject}\nAlici: ${p.recipient || 'belirtilmemis'}\nNotlar: ${p.notes}\nSadece e-posta metnini dondur.` },
  'summarizer': { name: 'Dokuman Ozetleyici', creditCost: 3,
    buildPrompt: (p) => `Asagidaki metni Turkce ozetle.\nUzunluk: ${p.length || 'orta'}\n\nMetin:\n${p.text}` },
  'meeting-notes': { name: 'Toplanti Notu', creditCost: 4,
    buildPrompt: (p) => `Ham toplanti notlarindan yapilandirilmis tutanak olustur.\nFormat: Tarih, Katilimcilar, Gundem, Kararlar, Aksiyonlar\n\nNotlar:\n${p.text}` },
  'report-generator': { name: 'Rapor Olusturucu', creditCost: 5,
    buildPrompt: (p) => `Profesyonel ${p.reportType || 'genel'} raporu olustur.\nHedef kitle: ${p.audience || 'yonetim'}\n\nVeriler:\n${p.text}` },
  'code-reviewer': { name: 'Kod Inceleyici', creditCost: 4,
    buildPrompt: (p) => `Kodu incele: guvenlik, performans, okunabilirlik.\nDil: ${p.language || 'belirtilmemis'}\n\n\`\`\`\n${p.code}\n\`\`\`\nBulgu listesi olustur.` },
  'translator': { name: 'Ceviri Motoru', creditCost: 3,
    buildPrompt: (p) => `Metni ${p.from || 'otomatik'} dilinden ${p.to || 'Turkce'} diline profesyonel cevir.\n\nMetin:\n${p.text}` },
  'presentation': { name: 'Sunum Taslagi', creditCost: 5,
    buildPrompt: (p) => `${p.slideCount || 8} slaytlik sunum taslagi olustur.\nKonu: ${p.topic}\nHedef kitle: ${p.audience || 'genel'}\nHer slayt: Baslik, Ana mesajlar, Konusmaci notlari\nEk: ${p.notes || 'yok'}` },
  'contract-analyzer': { name: 'Sozlesme Analizi', creditCost: 6,
    buildPrompt: (p) => `Sozlesme/hukuki metin analiz et. Riskli maddeler, eksik hukumler, dikkat noktalari belirt.\nOnemli: Hukuki tavsiye degildir.\n\nMetin:\n${p.text}` },
};

router.get('/list', authRequired, (req, res) => {
  const tools = Object.entries(TOOL_DEFS).map(([id, t]) => ({
    id, name: t.name, creditCost: t.creditCost,
    available: req.user.plan !== 'free' || ['email-writer', 'summarizer', 'translator'].includes(id),
  }));
  res.json({ tools });
});

router.post('/run/:toolId', authRequired, async (req, res) => {
  const { toolId } = req.params;
  const tool = TOOL_DEFS[toolId];
  if (!tool) return res.status(404).json({ error: 'Arac bulunamadi' });
  if (req.user.plan === 'free' && !['email-writer', 'summarizer', 'translator'].includes(toolId))
    return res.status(403).json({ error: 'Bu arac Pro plan gerektirir.' });

  const prompt = tool.buildPrompt(req.body);
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey.startsWith('sk-ant-your')) {
    run('INSERT INTO tool_usage (user_id, tool_name, tokens_used, credits_used) VALUES (?, ?, ?, ?)',
      [req.user.id, toolId, 0, 0]);
    return res.json({ output: `**${tool.name} - Demo Ciktisi**\n\nGercek AI ciktisi icin .env dosyasina API anahtari ekleyin.\n\n---\n*Demo Modu Aktif*`, creditsUsed: 0, demo: true });
  }

  if (!deductCredits(req.user.id, tool.creditCost, `Arac: ${tool.name}`))
    return res.status(402).json({ error: 'Yetersiz kredi' });

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({ model: 'claude-sonnet-4-20250514', max_tokens: 4096, messages: [{ role: 'user', content: prompt }] });
    const output = response.content[0].text;
    const tokensUsed = (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0);
    run('INSERT INTO tool_usage (user_id, tool_name, tokens_used, credits_used) VALUES (?, ?, ?, ?)',
      [req.user.id, toolId, tokensUsed, tool.creditCost]);
    res.json({ output, tokensUsed, creditsUsed: tool.creditCost });
  } catch (err) {
    console.error('Tool API error:', err.message);
    res.status(500).json({ error: 'AI islemi basarisiz.' });
  }
});

module.exports = router;
