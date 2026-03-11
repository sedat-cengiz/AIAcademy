const { Router } = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const { get, all, run } = require('../db/init');
const { authRequired, deductCredits } = require('./middleware');
const { PLANS, getPlanForUser } = require('./credits');
const crypto = require('crypto');

const router = Router();

const SYSTEM_PROMPTS = {
  general: 'Sen bir AI asistanisin. Kullaniciya Turkce olarak yardimci ol.',
  hr: 'Sen bir IK uzmani AI asistanisin. IK surecleri, ise alim konularinda Turkce yardim et.',
  it: 'Sen bir BT uzmani AI asistanisin. Yazilim, sistem, guvenlik konularinda Turkce destek ver.',
  marketing: 'Sen bir pazarlama uzmani AI asistanisin. Dijital pazarlama, icerik stratejisi konularinda Turkce yardim et.',
  finance: 'Sen bir finans uzmani AI asistanisin. Finansal analiz, butceleme konularinda Turkce yardim et.',
  legal: 'Sen bir hukuk danismani AI asistanisin. Sozlesme, mevzuat konularinda Turkce yardim et. Kesin hukuki tavsiye veremezsin.',
  tutor: 'Sen bir AI egitmenisin. AI okuryazarligi konusunda interaktif Turkce ogretim yap.',
};

router.get('/conversations', authRequired, (req, res) => {
  const convs = all('SELECT id, title, system_prompt, created_at, updated_at FROM conversations WHERE user_id = ? ORDER BY updated_at DESC LIMIT 50', [req.user.id]);
  res.json({ conversations: convs });
});

router.post('/conversations', authRequired, (req, res) => {
  const { systemPrompt } = req.body;
  const id = crypto.randomUUID();
  run('INSERT INTO conversations (id, user_id, system_prompt) VALUES (?, ?, ?)',
    [id, req.user.id, systemPrompt || SYSTEM_PROMPTS.general]);
  res.json({ id, title: 'Yeni Sohbet' });
});

router.get('/conversations/:id/messages', authRequired, (req, res) => {
  const conv = get('SELECT * FROM conversations WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
  if (!conv) return res.json({ conversation: null, messages: [] });
  const messages = all('SELECT role, content, created_at FROM chat_messages WHERE conversation_id = ? ORDER BY id ASC', [req.params.id]);
  res.json({ conversation: conv, messages });
});

router.delete('/conversations/:id', authRequired, (req, res) => {
  run('DELETE FROM chat_messages WHERE conversation_id = ? AND user_id = ?', [req.params.id, req.user.id]);
  run('DELETE FROM conversations WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
  res.json({ ok: true });
});

router.post('/message', authRequired, async (req, res) => {
  const { conversationId, message, systemPromptKey } = req.body;
  if (!message) return res.status(400).json({ error: 'Mesaj gerekli' });

  const plan = getPlanForUser(req.user);
  const dailyLimit = plan.dailyMessages;
  const todayCount = get("SELECT COUNT(*) as cnt FROM chat_messages WHERE user_id = ? AND role = 'user' AND created_at > datetime('now', '-1 day')", [req.user.id]);
  if (todayCount && todayCount.cnt >= dailyLimit) {
    const upgradeHint = req.user.plan === 'free' ? ' Pro plana yukseltme yaparak limiti 200 mesaja cikarabilirsiniz.' : '';
    return res.status(429).json({ error: `Gunluk mesaj limitine ulastiniz (${dailyLimit}).${upgradeHint}`, limit: dailyLimit, used: todayCount.cnt, plan: req.user.plan });
  }

  let convId = conversationId;
  let sysPrompt = SYSTEM_PROMPTS[systemPromptKey] || SYSTEM_PROMPTS.general;

  if (!convId) {
    convId = crypto.randomUUID();
    run('INSERT INTO conversations (id, user_id, title, system_prompt) VALUES (?, ?, ?, ?)',
      [convId, req.user.id, message.substring(0, 60), sysPrompt]);
  } else {
    const conv = get('SELECT * FROM conversations WHERE id = ? AND user_id = ?', [convId, req.user.id]);
    if (!conv) {
      run('INSERT INTO conversations (id, user_id, title, system_prompt) VALUES (?, ?, ?, ?)',
        [convId, req.user.id, message.substring(0, 60), sysPrompt]);
    } else {
      sysPrompt = conv.system_prompt || sysPrompt;
    }
  }

  run('INSERT INTO chat_messages (conversation_id, user_id, role, content) VALUES (?, ?, ?, ?)',
    [convId, req.user.id, 'user', message]);

  const history = all('SELECT role, content FROM chat_messages WHERE conversation_id = ? ORDER BY id ASC', [convId]);

  const apiKey = (process.env.ANTHROPIC_API_KEY || '').trim();
  if (!apiKey || apiKey.startsWith('sk-ant-your')) {
    const demoReply = generateDemoReply(message);
    run('INSERT INTO chat_messages (conversation_id, user_id, role, content, tokens_used) VALUES (?, ?, ?, ?, ?)',
      [convId, req.user.id, 'assistant', demoReply, 0]);
    run("UPDATE conversations SET updated_at = datetime('now'), title = ? WHERE id = ?",
      [message.substring(0, 60), convId]);
    return res.json({ conversationId: convId, reply: demoReply, tokensUsed: 0, demo: true });
  }

  try {
    const client = new Anthropic({ apiKey });
    const modelId = plan.model || 'claude-3-haiku-20240307';
    const maxTokens = req.user.plan === 'free' ? 1024 : 2048;
    const response = await client.messages.create({
      model: modelId, max_tokens: maxTokens, system: sysPrompt,
      messages: history.map(m => ({ role: m.role, content: m.content })),
    });
    const reply = response.content[0].text;
    const tokensUsed = (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0);
    const creditsUsed = Math.max(1, Math.ceil(tokensUsed / 1000));

    if (!deductCredits(req.user.id, creditsUsed, `Sohbet: ${message.substring(0, 40)}`)) {
      return res.status(402).json({ error: 'Yetersiz kredi.' });
    }
    run('INSERT INTO chat_messages (conversation_id, user_id, role, content, tokens_used) VALUES (?, ?, ?, ?, ?)',
      [convId, req.user.id, 'assistant', reply, tokensUsed]);
    run("UPDATE conversations SET updated_at = datetime('now') WHERE id = ?", [convId]);
    res.json({ conversationId: convId, reply, tokensUsed, creditsUsed });
  } catch (err) {
    console.error('Claude API error:', err.message, err.status, err.type);
    res.status(500).json({ error: 'AI yanit uretemedi: ' + (err.message || 'bilinmeyen hata') });
  }
});

function generateDemoReply(message) {
  const lower = message.toLowerCase();
  if (lower.includes('merhaba') || lower.includes('selam'))
    return 'Merhaba! Ben AI Academy asistaniyim. Size nasil yardimci olabilirim?\n\n**Not:** Demo modunda calisiyorum. Gercek Claude API yanitlari icin `.env` dosyasina API anahtarinizi ekleyin.';
  if (lower.includes('prompt') || lower.includes('ipucu'))
    return '**Etkili Prompt Yazma Ipuclari:**\n\n1. **Baglam verin** - Ne istediginizi aciklayin\n2. **Rol atayin** - "Bir pazarlama uzmani olarak..." gibi baslayin\n3. **Format belirtin** - Cikti formatini ifade edin\n4. **Ornekler verin** - Beklediginiz ciktiya ornek gosterin\n\n*Demo modu aktif*';
  if (lower.includes('e-posta') || lower.includes('email'))
    return '**Profesyonel E-posta Yazimi:**\n\n1. Konu satirini net ve kisa tutun\n2. Selamlamayla baslayin\n3. Ana mesaji ilk paragrafta verin\n4. Aksiyon ogesini belirtin\n5. Profesyonel kapanisla bitirin\n\nDaha detayli yardim icin **AI Araclari** sekmesindeki E-posta Yazici\'yi kullanabilirsiniz!\n\n*Demo modu*';
  return `Mesajinizi aldim. Bu bir **demo yanittir**.\n\nGercek Claude AI yanitlari almak icin:\n1. Anthropic\'ten API anahtari alin\n2. \`.env\` dosyasina ekleyin\n3. Sunucuyu yeniden baslatin\n\n*Demo modunda temel etkilesimleri deneyebilirsiniz.*`;
}

module.exports = router;
