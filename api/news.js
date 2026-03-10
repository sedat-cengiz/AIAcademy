const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── IN-MEMORY CACHE ────────────────────────────────────────
// Server-side cache: translated once, served to ALL users from memory.
// Claude API is called only when cache expires (~6 times/day).
// Estimated cost with Haiku: ~$0.0001/batch → ~$0.02/month
let newsCache = { items: [], fetchedAt: 0 };
const CACHE_TTL = 4 * 60 * 60 * 1000; // 4 hours
const MAX_NEWS = 8;

const TR_SOURCES = [
  { name: 'Webtekno', url: 'https://www.webtekno.com/rss/yapay-zeka.xml', icon: '🔷', lang: 'tr' },
  { name: 'Shiftdelete', url: 'https://shiftdelete.net/feed', icon: '🔶', lang: 'tr' },
  { name: 'Technopat', url: 'https://www.technopat.net/feed/', icon: '🟦', lang: 'tr' },
  { name: 'Donanım Haber', url: 'https://www.donanimhaber.com/rss/tum/', icon: '🟥', lang: 'tr' },
  { name: 'Log', url: 'https://www.log.com.tr/feed/', icon: '📘', lang: 'tr' },
];

const EN_SOURCES = [
  { name: 'TechCrunch', url: 'https://techcrunch.com/category/artificial-intelligence/feed/', icon: '🟢', lang: 'en' },
  { name: 'The Verge', url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', icon: '🔵', lang: 'en' },
  { name: 'VentureBeat', url: 'https://venturebeat.com/category/ai/feed/', icon: '🟠', lang: 'en' },
  { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/technology-lab', icon: '🔴', lang: 'en' },
];

const RSS_SOURCES = [...TR_SOURCES, ...EN_SOURCES];

// ─── RSS PARSER (lightweight, no deps) ──────────────────────
function parseRSSItems(xml, sourceName, icon, lang) {
  const items = [];
  const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = extractTag(block, 'title');
    const link = extractTag(block, 'link');
    const pubDate = extractTag(block, 'pubDate') || extractTag(block, 'dc:date') || extractTag(block, 'published');
    const description = extractTag(block, 'description') || extractTag(block, 'content:encoded');
    if (title && link) {
      items.push({
        title: cleanHTML(title),
        link: cleanHTML(link).trim(),
        pubDate: pubDate || '',
        description: cleanHTML(description || '').substring(0, 300),
        source: sourceName,
        icon,
        lang: lang || 'en',
      });
    }
  }
  return items;
}

function extractTag(block, tag) {
  const cdataRe = new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`, 'i');
  const cdataMatch = block.match(cdataRe);
  if (cdataMatch) return cdataMatch[1];
  const simpleRe = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
  const simpleMatch = block.match(simpleRe);
  return simpleMatch ? simpleMatch[1] : '';
}

function cleanHTML(str) {
  return str
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&lsquo;/g, '\u2018')
    .replace(/&rdquo;/g, '\u201D')
    .replace(/&ldquo;/g, '\u201C')
    .replace(/&mdash;/g, '\u2014')
    .replace(/&ndash;/g, '\u2013')
    .replace(/&hellip;/g, '\u2026')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── FETCH ALL SOURCES ──────────────────────────────────────
async function fetchAllRSS() {
  const trResults = [];
  const enResults = [];

  const fetchPromises = RSS_SOURCES.map(async (source) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(source.url, {
        signal: controller.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AIAcademyBot/1.0)' },
      });
      clearTimeout(timeout);
      if (!res.ok) return { items: [], lang: source.lang };
      const xml = await res.text();
      const items = parseRSSItems(xml, source.name, source.icon, source.lang);
      return { items, lang: source.lang };
    } catch {
      return { items: [], lang: source.lang };
    }
  });

  const allResults = await Promise.all(fetchPromises);
  for (const result of allResults) {
    if (result.lang === 'tr') {
      trResults.push(...result.items);
    } else {
      enResults.push(...result.items);
    }
  }

  const aiKeywords = /\bai\b|artificial intelligence|machine learning|llm|chatgpt|claude|openai|anthropic|google ai|gemini|gpt|deep ?learning|neural|generative|copilot|model|transformer|yapay\s*zeka|derin\s*öğrenme|makine\s*öğren|büyük\s*dil\s*modeli|chatbot|otomasyon/i;

  const filteredTr = trResults.filter(item =>
    aiKeywords.test(item.title) || aiKeywords.test(item.description)
  );
  const trFinal = (filteredTr.length >= 2 ? filteredTr : trResults).slice(0, MAX_NEWS);

  const filteredEn = enResults.filter(item =>
    aiKeywords.test(item.title) || aiKeywords.test(item.description)
  );
  const enFinal = filteredEn.slice(0, MAX_NEWS);

  const combined = [...trFinal, ...enFinal];
  combined.sort((a, b) => {
    const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return db - da;
  });

  return combined.slice(0, MAX_NEWS * 2);
}

// ─── TRANSLATE WITH CLAUDE ──────────────────────────────────
async function translateToTurkish(items) {
  if (!items.length) return [];

  const selected = items.slice(0, MAX_NEWS);
  const trItems = selected.filter(i => i.lang === 'tr');
  const enItems = selected.filter(i => i.lang !== 'tr');

  const processedTr = trItems.map(item => ({
    title_tr: item.title,
    summary_tr: item.description.substring(0, 120),
    category: guessCategory(item.title + ' ' + item.description),
    link: item.link,
    source: item.source,
    icon: item.icon,
    pubDate: item.pubDate,
    timeAgo: getTimeAgo(item.pubDate),
    lang: 'tr',
  }));

  if (enItems.length === 0) return processedTr;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.includes('your-key') || apiKey.includes('placeholder')) {
    const processedEn = enItems.map(fallbackItem);
    return mergeAndSort([...processedTr, ...processedEn]);
  }

  const itemList = enItems.map((item, i) =>
    `${i + 1}. ${item.title}`
  ).join('\n');

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1200,
      messages: [{
        role: 'user',
        content: `Translate these AI news headlines to Turkish. For each, give:
LINE_NUMBER|Turkish title|Turkish 1-line summary|Category

Category must be one of: Yapay Zeka, LLM, Arastirma, Urun, Sirket, Etik, Robotik, Teknoloji

Use | as separator. One line per item. No extra text.

${itemList}`
      }],
    });

    const text = response.content[0].text.trim();
    const lines = text.split('\n').filter(l => l.includes('|'));
    const processedEn = enItems.map((item, i) => {
      const line = lines.find(l => l.startsWith(`${i + 1}|`) || l.startsWith(`${i + 1}.`));
      if (line) {
        const parts = line.split('|').map(p => p.trim());
        const titleTr = (parts[1] || '').replace(/^\d+\.\s*/, '');
        return {
          title_tr: titleTr || item.title,
          summary_tr: parts[2] || item.description.substring(0, 120),
          category: parts[3] || guessCategory(item.title),
          link: item.link,
          source: item.source,
          icon: item.icon,
          pubDate: item.pubDate,
          timeAgo: getTimeAgo(item.pubDate),
          lang: 'tr',
        };
      }
      return fallbackItem(item);
    });
    return mergeAndSort([...processedTr, ...processedEn]);
  } catch (err) {
    console.error('News translation error:', err.message);
    return mergeAndSort([...processedTr, ...enItems.map(fallbackItem)]);
  }
}

function mergeAndSort(items) {
  items.sort((a, b) => {
    const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return db - da;
  });
  return items.slice(0, MAX_NEWS);
}

function guessCategory(text) {
  const t = (text || '').toLowerCase();
  if (/llm|büyük dil|language model|gpt|claude|gemini|chatgpt/.test(t)) return 'LLM';
  if (/araştırma|arastirma|research|paper|bilimsel|akademi/.test(t)) return 'Arastirma';
  if (/ürün|urun|product|launch|release|çıktı|duyur/.test(t)) return 'Urun';
  if (/şirket|sirket|company|startup|yatırım|fonla|raise|milyar|milyon/.test(t)) return 'Sirket';
  if (/etik|ethic|bias|güvenlik|safety|risk|yasal|regul/.test(t)) return 'Etik';
  if (/robot|otonom|self.?driving|insansız/.test(t)) return 'Robotik';
  if (/yapay zeka|artificial intel|ai\b|machine learn|deep learn|derin öğren/.test(t)) return 'Yapay Zeka';
  return 'Teknoloji';
}

function fallbackItem(item) {
  return {
    title_tr: item.title,
    summary_tr: item.description.substring(0, 120),
    category: guessCategory(item.title + ' ' + item.description),
    link: item.link,
    source: item.source,
    icon: item.icon,
    pubDate: item.pubDate,
    timeAgo: getTimeAgo(item.pubDate),
    lang: item.lang || 'en',
  };
}

function getTimeAgo(dateStr) {
  if (!dateStr) return '';
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  if (isNaN(then)) return '';
  const diffMin = Math.floor((now - then) / 60000);
  if (diffMin < 1) return 'Az önce';
  if (diffMin < 60) return `${diffMin} dk önce`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} saat önce`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay === 1) return 'Dün';
  if (diffDay < 7) return `${diffDay} gün önce`;
  return new Date(dateStr).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
}

// ─── ROUTE ──────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const now = Date.now();
    if (newsCache.items.length > 0 && (now - newsCache.fetchedAt) < CACHE_TTL) {
      const items = newsCache.items.map(item => ({
        ...item,
        timeAgo: getTimeAgo(item.pubDate),
      }));
      return res.json({ items, cached: true, fetchedAt: newsCache.fetchedAt });
    }

    const rawItems = await fetchAllRSS();
    if (rawItems.length === 0) {
      return res.json({ items: newsCache.items || [], cached: true, error: 'RSS kaynaklarına erişilemedi' });
    }

    const translated = await translateToTurkish(rawItems);
    newsCache = { items: translated, fetchedAt: now };
    res.json({ items: translated, cached: false, fetchedAt: now });
  } catch (err) {
    console.error('News fetch error:', err.message);
    if (newsCache.items.length > 0) {
      return res.json({ items: newsCache.items, cached: true, error: 'Güncelleme başarısız' });
    }
    res.status(500).json({ error: 'Haberler yüklenirken hata oluştu', items: [] });
  }
});

module.exports = router;
