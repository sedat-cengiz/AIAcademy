/* ============================================================
   AI Academy Platform – Frontend Application
   ============================================================ */

const API = '';
const STORAGE_KEY = 'aiAcademyPortalState_v3';

// ─── ANALYTICS ──────────────────────────────────────────────
function trackEvent(eventName, params = {}) {
  if (typeof gtag === 'undefined') return;
  gtag('event', eventName, params);
}

function trackPageView(tabName) {
  if (typeof gtag === 'undefined') return;
  gtag('event', 'page_view', {
    page_title: tabName,
    page_location: window.location.origin + '/#' + tabName,
  });
}

// ─── TOAST NOTIFICATION SYSTEM ──────────────────────────────
function showToast(message, type = 'info', duration = 4000) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const icons = { success: '&#10004;', error: '&#10006;', info: '&#8505;', warning: '&#9888;' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span><span class="toast-message">${message}</span><button class="toast-close" aria-label="Kapat">&times;</button>`;
  container.appendChild(toast);
  toast.querySelector('.toast-close').addEventListener('click', () => dismissToast(toast));
  setTimeout(() => dismissToast(toast), duration);
}
function dismissToast(toast) {
  if (toast.classList.contains('toast-exit')) return;
  toast.classList.add('toast-exit');
  toast.addEventListener('animationend', () => toast.remove());
}

// ─── DATA ───────────────────────────────────────────────────
const COURSES = [
  { id:'c-ai-fluency', title:'AI Fluency / Yapay Zeka Okuryazarligi', role:'general', mandatory:true, duration:'60 dk', level:'Baslangic', points:50, provider:'Kurum Ici', link:'/docs/viewer.html?doc=courses/ai-fluency.md' },
  { id:'c-claude-101', title:'Claude 101: Temel Kullanim', role:'general', mandatory:true, duration:'60 dk', level:'Baslangic', points:60, provider:'Kurum Ici', link:'/docs/viewer.html?doc=courses/claude-101.md' },
  { id:'c-ai-ethics', title:'AI Etigi ve Sorumlu Kullanim', role:'general', mandatory:true, duration:'60 dk', level:'Baslangic / Orta', points:55, provider:'Kurum Ici', link:'/docs/viewer.html?doc=courses/ai-ethics.md' },
  { id:'c-data-privacy', title:'Veri Gizliligi ve AI Guvenligi', role:'general', mandatory:true, duration:'50 dk', level:'Baslangic / Orta', points:55, provider:'Kurum Ici', link:'/docs/viewer.html?doc=courses/data-privacy.md' },
  { id:'c-advanced-prompting', title:'Ileri Prompt Teknikleri', role:'general', mandatory:false, duration:'75 dk', level:'Orta', points:50, provider:'Kurum Ici', link:'/docs/viewer.html?doc=courses/advanced-prompting.md' },
  { id:'c-claude-for-work', title:'Claude for Work: Dokuman, E-posta ve Raporlama', role:'business', mandatory:false, duration:'75 dk', level:'Orta', points:40, provider:'Kurum Ici', link:'/docs/viewer.html?doc=courses/claude-for-work.md' },
  { id:'c-meeting-notes', title:'Toplanti Notlarindan Aksiyon Listesi Uretimi', role:'business', mandatory:false, duration:'45 dk', level:'Orta', points:30, provider:'Kurum Ici', link:'/docs/viewer.html?doc=courses/meeting-notes.md' },
  { id:'c-claude-code', title:'Claude Code in Action', role:'technical', mandatory:false, duration:'90 dk', level:'Orta', points:60, provider:'Kurum Ici', link:'/docs/viewer.html?doc=courses/claude-code.md' },
  { id:'c-api-integration', title:'Claude API Entegrasyonu ile Basit Uygulama', role:'technical', mandatory:false, duration:'90 dk', level:'Orta / Ileri', points:80, provider:'Kurum Ici', link:'/docs/viewer.html?doc=courses/api-integration.md' },
];

const CHALLENGES = [
  { id:'ch-weekly-report', title:'Haftalik Raporu Claude ile Yeniden Yaz', description:'Mevcut bir haftalik rapor metnini Claude ile daha net hale getir.', suggestedRole:'business', points:40 },
  { id:'ch-meeting-summary', title:'Toplanti Notlarini Ozetle', description:'Son toplantinin notlarini Claude ile ozetle.', suggestedRole:'general', points:30 },
  { id:'ch-refactor-function', title:'Bir Fonksiyonu Claude Code ile Refactor Et', description:'Karmasik bir fonksiyonu sec, Claude Code\'dan yardim al.', suggestedRole:'technical', points:50 },
  { id:'ch-prompt-library', title:'Prompt Sablon Kutuphanesi Olustur', description:'Sik yaptigin 3 is gorevi icin CRISP modeline uygun sablonlar yaz.', suggestedRole:'general', points:40 },
  { id:'ch-hallucination-hunt', title:'AI Halusinasyonu Tespit Et', description:'Claude\'a nis bir konu sor ve yanittaki hatalari tespit et.', suggestedRole:'general', points:35 },
  { id:'ch-anonymize-data', title:'Bir Dokumani Anonimlestir', description:'Gercek bir is dokumanindaki kisisel verileri anonimlestirip Claude ile ozetle.', suggestedRole:'business', points:35 },
  { id:'ch-department-guide', title:'Departmanin Icin AI Kullanim Rehberi Yaz', description:'Kendi departmanin icin 3 AI kullanim senaryosu iceren rehber olustur.', suggestedRole:'business', points:45 },
  { id:'ch-presentation-ai', title:'AI ile Sunum Icerigi Hazirla', description:'Claude kullanarak 8 slaytlik sunum icerigi hazirla.', suggestedRole:'general', points:40 },
  { id:'ch-code-review-ai', title:'AI ile Kod Inceleme Yap', description:'Son merge edilen bir PR\'i Claude\'a incelet.', suggestedRole:'technical', points:45 },
];

const BADGES = [
  { id:'b-beginner', name:'AI Beginner', minPoints:50, description:'Ilk adimlari atan kullanici.' },
  { id:'b-power', name:'AI Power User', minPoints:150, description:'AI\'i is akisina entegre edenler.' },
  { id:'b-champion', name:'AI Champion', minPoints:300, description:'Takiminda AI kullanimini yayginlastiranlar.' },
];

const LIBRARY_DOCS = [
  { id:'doc-ai-what', title:'AI Nedir? Temel Kavramlar', category:'Temeller', level:'Baslangic', roles:['general','business','technical'], file:'/docs/viewer.html?doc=00_ai_nedir.md', readingTime:'15 dk' },
  { id:'doc-prompt-intro', title:'Prompt Muhendisligine Giris', category:'Pratik', level:'Baslangic / Orta', roles:['general','business','technical'], file:'/docs/viewer.html?doc=40_prompt_muhendisligine_giris.md', readingTime:'20 dk' },
  { id:'doc-evaluating-ai', title:'AI Ciktilarini Degerlendirme', category:'Pratik', level:'Baslangic / Orta', roles:['general','business','technical'], file:'/docs/viewer.html?doc=50_ai_ciktilarini_degerlendirme.md', readingTime:'15 dk' },
  { id:'doc-ai-tools', title:'AI Araclari Ekosistemi', category:'Genel', level:'Baslangic', roles:['general','business','technical'], file:'/docs/viewer.html?doc=60_ai_araclari_ekosistemi.md', readingTime:'15 dk' },
  { id:'doc-department-scenarios', title:'Departman Bazli AI Senaryolari', category:'Pratik', level:'Orta', roles:['general','business','technical'], file:'/docs/viewer.html?doc=70_departman_bazli_senaryolar.md', readingTime:'20 dk' },
  { id:'doc-kvkk-ai', title:'KVKK ve AI', category:'Guvenlik', level:'Baslangic / Orta', roles:['general','business','technical'], file:'/docs/viewer.html?doc=80_kvkk_ve_ai.md', readingTime:'15 dk' },
];

const QUIZZES = {
  level1: { id:'level1', name:'Seviye 1 – Temel', passScore:70, questions:[
    { text:'Yapay zeka (AI) en basit haliyle neyi amaclar?', options:['Bilgisayarlarin sadece dort islem yapmasi','Bilgisayarlarin insan benzeri ogrenme kazanmasi','Internete hizli baglanma','Oyun yazan programlar'], correctIndex:1 },
    { text:'Dar AI (narrow AI) hangi tanima uygundur?', options:['Her turlu problem cozen sistemler','Tek alanda iyi olan sistemler','Veri kullanmadan calisan sistemler','Donanim gerektirmeyen yazilimlar'], correctIndex:1 },
    { text:'Claude ve ChatGPT hangi AI turune ornektir?', options:['Kural tabanli sistemler','Uretimsel AI (generative AI)','Veri kullanmayan AI','Sensor verisiyle calisan AI'], correctIndex:1 },
    { text:'AI ciktilariyla ilgili hangisi dogrudur?', options:['Her zaman dogrudur','Hata yapabilir, kontrol edilmeli','Sadece rakamlarda yanilir','Sadece Ingilizce calisir'], correctIndex:1 },
    { text:'Kurumsal AI kullaniminda temel ilke nedir?', options:['Gizli verileri modele gondermek','Ciktilari kontrol etmeden paylasmak','Insan sorumlulugunu korumak','Tum kararlari AI\'a birakmak'], correctIndex:2 },
    { text:'AI onyargisinin ana kaynagi nedir?', options:['Islemci hizi','Egitim verilerindeki onyargilar','Internet kalitesi','Kullanicinin yasi'], correctIndex:1 },
    { text:'AI uretimi ciktiyi paylasmadan ne yapmali?', options:['AI urettigini gizlemek','AI destekli oldugunu belirtmek ve dogrulamak','Sadece yoneticiye soylemek','Hicbir sey'], correctIndex:1 },
    { text:'KVKK kapsaminda hangisi kisisel veridir?', options:['Hava durumu','Web sitesi icerigi','Calisanin ad-soyad ve TC no','Sektor istatistikleri'], correctIndex:2 },
  ]},
  level2: { id:'level2', name:'Seviye 2 – Is / Ofis', passScore:70, questions:[
    { text:'Ofiste AI\'dan en cok hangi is icin faydalanilir?', options:['Dosya tasimak','Metin ozetleme, rapor ve e-posta','Fotokopi','Kablo duzenleme'], correctIndex:1 },
    { text:'Toplanti notlarini AI ile ozetlerken iyi uygulama?', options:['Gizli bilgileri paylasmak','Notlari temizleyip kisisel verileri maskelemek','Duygusal ifadeler gondermek','Hic not paylasmadan ozet istemek'], correctIndex:1 },
    { text:'AI ile hazirlanan raporu sunmadan once?', options:['Oldugu gibi gondermek','Sadece basligi degistirmek','Icerik okuyup rakam kontrolu yapmak','Rengi degistirmek'], correctIndex:2 },
    { text:'Iyi bir is prompt\'unda ne olmali?', options:['Gorev ve beklenen ciktinin net tanimi','Tek kelimelik komutlar','Rastgele emojiler','Sadece "yap" demek'], correctIndex:0 },
    { text:'AI is akisini ekiple paylasirken onemli olan?', options:['Kimsenin bilmemesi','Seffaf olup sinirlari aciklamak','Sadece yoneticiye anlatmak','Hic dokumante etmemek'], correctIndex:1 },
    { text:'Musteri verileri iceren dokumanla ne yapmali once?', options:['AI\'a dogrudan yapistirmak','Kisisel verileri anonimlestirmek','E-posta ile gondermek','Hicbir sey'], correctIndex:1 },
    { text:'AI halusinasyonu ne demektir?', options:['Yavas calisma','Guvenle yanlis bilgi uretmesi','Gorsel icerik uretmesi','Internet kaybetmesi'], correctIndex:1 },
    { text:'Cok Gizli veri icin dogru olan?', options:['Dikkatle kullanilebilir','Anonimlestirilerek gonderilebilir','AI ile kesinlikle paylasilmamali','Hafta sonlari paylasilabilir'], correctIndex:2 },
  ]},
  level3: { id:'level3', name:'Seviye 3 – Teknik', passScore:70, questions:[
    { text:'LLM\'ler temelde ne yapar?', options:['Sabit kural calistirir','Sonraki kelimeyi olasiliksal tahmin eder','Veritabani indeksler','Dosya sistemi yonetir'], correctIndex:1 },
    { text:'Kod uretirken AI icin iyi uygulama?', options:['Incelemeden prod\'a almak','Mantigi anlayip test yazmak','Sadece yorum satirlari','Surum kontrolunu birakmak'], correctIndex:1 },
    { text:'AI API entegrasyonunda ilk dusunulmesi gereken?', options:['Logo tasarlamak','Veri guvenligi ve yetkilendirme','Rastgele model secmek','Sadece hiz'], correctIndex:1 },
    { text:'Teknik gorevi tarif ederken ne yapmali?', options:['Dil, teknoloji, kisitlar ve format tanimlamak','Sadece "kodu duzelt" demek','Tek satirda yazmak','Sadece hata mesaji gondermek'], correctIndex:0 },
    { text:'Unit test ile dogrulama neden onemli?', options:['Testler gereksiz','Model hic hata yapmaz','Beklenen davranisi otomatik kontrol etme','Sadece dokumantasyonu uzatir'], correctIndex:2 },
    { text:'API anahtari nerede saklanmali?', options:['Kaynak kodun icinde','Ortam degiskenlerinde','Client-side JavaScript\'te','Paylasilan belge dosyasinda'], correctIndex:1 },
    { text:'AI kodunda kritik guvenlik kontrolu?', options:['Renk kontrolu','Hardcoded credentials, SQL injection, XSS','Satir sayisinin cift olmasi','Dosya isim uzunlugu'], correctIndex:1 },
    { text:'Chain-of-thought teknigi ne ise yarar?', options:['Daha hizli yanit','Dusunce surecini gosterip dogrulugu artirmak','Tek kelimelik yanit','Internete baglanma'], correctIndex:1 },
  ]},
};

const TOOL_FORMS = {
  'email-writer': [
    { name:'subject', label:'Konu', type:'text', placeholder:'E-posta konusu' },
    { name:'recipient', label:'Alici', type:'text', placeholder:'Kime gonderilecek?' },
    { name:'notes', label:'Notlar / Icerik', type:'textarea', placeholder:'E-postada yer almasi gerekenler...' },
    { name:'tone', label:'Ton', type:'select', options:['profesyonel','samimi','resmi','ikna edici'] },
  ],
  'summarizer': [
    { name:'text', label:'Metin', type:'textarea', placeholder:'Ozetlenmesini istediginiz metni yapin...' },
    { name:'length', label:'Uzunluk', type:'select', options:['kisa','orta','detayli'] },
  ],
  'meeting-notes': [
    { name:'text', label:'Ham Toplanti Notlari', type:'textarea', placeholder:'Toplanti notlarini yapin...' },
  ],
  'report-generator': [
    { name:'text', label:'Veriler / Notlar', type:'textarea', placeholder:'Rapor icin veriler...' },
    { name:'reportType', label:'Rapor Turu', type:'select', options:['genel','finansal','performans','proje durumu'] },
    { name:'audience', label:'Hedef Kitle', type:'select', options:['yonetim','ekip','musteri'] },
  ],
  'code-reviewer': [
    { name:'code', label:'Kod', type:'textarea', placeholder:'Incelenmesini istediginiz kodu yapin...' },
    { name:'language', label:'Programlama Dili', type:'text', placeholder:'JavaScript, Python, vb.' },
  ],
  'translator': [
    { name:'text', label:'Metin', type:'textarea', placeholder:'Cevrilecek metin...' },
    { name:'from', label:'Kaynak Dil', type:'select', options:['otomatik','Turkce','Ingilizce','Almanca','Fransizca'] },
    { name:'to', label:'Hedef Dil', type:'select', options:['Turkce','Ingilizce','Almanca','Fransizca'] },
  ],
  'presentation': [
    { name:'topic', label:'Konu', type:'text', placeholder:'Sunum konusu' },
    { name:'slideCount', label:'Slayt Sayisi', type:'select', options:['5','8','10','15'] },
    { name:'audience', label:'Hedef Kitle', type:'text', placeholder:'Kimler izleyecek?' },
    { name:'notes', label:'Ek Notlar', type:'textarea', placeholder:'Ek bilgiler...' },
  ],
  'contract-analyzer': [
    { name:'text', label:'Sozlesme Metni', type:'textarea', placeholder:'Analiz edilecek hukuki metin...' },
  ],
};

// ─── STATE ──────────────────────────────────────────────────
let token = localStorage.getItem('aiacademy_token');
let currentUser = null;
let currentConvId = null;

function loadLocalState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch { return null; }
}
function saveLocalState(s) { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }

let appState = loadLocalState() || {
  role: 'general',
  completedCourses: [],
  completedChallenges: [],
  recentCompletions: [],
  points: 0,
  quizResults: {},
  onboarding: { chat: false, tool: false, course: false },
  onboardingDismissed: false,
};

function ensureOnboardingState() {
  if (!appState.onboarding) {
    appState.onboarding = { chat: false, tool: false, course: false };
  }
}

function getOnboardingState() {
  ensureOnboardingState();
  return appState.onboarding;
}

function isOnboardingComplete() {
  const o = getOnboardingState();
  return !!(o.chat && o.tool && o.course);
}

function completeOnboardingStep(step) {
  ensureOnboardingState();
  if (appState.onboarding[step]) return;
  appState.onboarding[step] = true;
  saveLocalState(appState);
  renderOnboardingCard();
}

function getState() {
  if (currentUser) {
    return {
      role: currentUser.role || 'general',
      completedCourses: currentUser.completedCourses || [],
      completedChallenges: currentUser.completedChallenges || [],
      recentCompletions: appState.recentCompletions || [],
      points: currentUser.points || 0,
      quizResults: currentUser.quizResults || {},
    };
  }
  return appState;
}

// ─── API HELPERS ────────────────────────────────────────────
async function apiFetch(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(API + path, { ...opts, headers, body: opts.body ? JSON.stringify(opts.body) : undefined });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Bir hata olustu');
  return data;
}

async function syncProgress() {
  if (!token) return;
  const s = getState();
  try {
    await apiFetch('/api/auth/sync-progress', { method: 'POST', body: {
      completedCourses: s.completedCourses,
      completedChallenges: s.completedChallenges,
      points: s.points,
      quizResults: s.quizResults,
    }});
  } catch { /* silent */ }
}

// ─── AUTH ────────────────────────────────────────────────────
let authMode = 'login';

function showAuthModal() {
  document.getElementById('authModal').style.display = 'flex';
  setAuthMode('login');
  setTimeout(() => document.getElementById('authEmail').focus(), 100);
}

function hideAuthModal() {
  document.getElementById('authModal').style.display = 'none';
  document.getElementById('authError').textContent = '';
  document.getElementById('authEmail').value = '';
  document.getElementById('authPassword').value = '';
  document.getElementById('authName').value = '';
  const strengthEl = document.getElementById('passwordStrength');
  if (strengthEl) strengthEl.style.display = 'none';
}

const PLAN_DISPLAY = {
  pro: { name: 'Pro', price: '99 TL/ay', desc: 'Gelişmiş AI modeli, 200 mesaj/gün, tüm araçlar ve Google entegrasyonu.' },
  enterprise: { name: 'Kurumsal', price: 'Özel fiyat', desc: 'Sınırsız kullanım, admin paneli, API erişimi ve dedike destek.' },
};

function openPlanContactModal(plan) {
  const info = PLAN_DISPLAY[plan];
  if (!info) return;
  trackEvent('plan_contact_opened', {
    plan,
    plan_name: info.name,
    current_plan: currentUser?.plan || 'anonymous',
  });
  const modal = document.getElementById('planContactModal');
  const infoBox = document.getElementById('planContactInfo');
  infoBox.innerHTML = `<p class="plan-contact-plan-name">${info.name} Planı</p><p class="plan-contact-plan-price">${info.price} &mdash; ${info.desc}</p>`;
  document.getElementById('planContactPlan').value = plan;
  document.getElementById('planContactTitle').textContent = `${info.name} Planı Hakkında Bilgi Alın`;

  const form = document.getElementById('planContactForm');
  form.style.display = '';
  const successEl = modal.querySelector('.plan-contact-success');
  if (successEl) successEl.remove();

  if (currentUser) {
    document.getElementById('planContactName').value = currentUser.name || '';
    document.getElementById('planContactEmail').value = currentUser.email || '';
  } else {
    document.getElementById('planContactName').value = '';
    document.getElementById('planContactEmail').value = '';
  }
  document.getElementById('planContactCompany').value = '';
  document.getElementById('planContactPhone').value = '';
  document.getElementById('planContactMessage').value = '';
  document.getElementById('planContactError').textContent = '';

  modal.style.display = 'flex';
  setTimeout(() => document.getElementById('planContactName').focus(), 100);
}

function hidePlanContactModal() {
  document.getElementById('planContactModal').style.display = 'none';
}

function handlePlanContactSubmit(e) {
  e.preventDefault();
  const errEl = document.getElementById('planContactError');
  errEl.textContent = '';

  const name = document.getElementById('planContactName').value.trim();
  const email = document.getElementById('planContactEmail').value.trim();
  const company = document.getElementById('planContactCompany').value.trim();
  const phone = document.getElementById('planContactPhone').value.trim();
  const message = document.getElementById('planContactMessage').value.trim();
  const plan = document.getElementById('planContactPlan').value;
  const planInfo = PLAN_DISPLAY[plan];

  if (!name) { errEl.textContent = 'Lütfen adınızı girin.'; return; }
  if (!email || !email.includes('@')) { errEl.textContent = 'Lütfen geçerli bir e-posta adresi girin.'; return; }

  trackEvent('plan_contact_submitted', {
    plan,
    plan_name: planInfo?.name || plan,
    has_token: !!token,
  });
  const submitBtn = document.getElementById('planContactSubmitBtn');
  submitBtn.disabled = true;
  submitBtn.classList.add('btn-loading');

  apiFetch('/api/leads', {
    method: 'POST',
    body: {
      plan,
      name,
      email,
      company,
      phone,
      message,
      source: 'pricing_modal',
    },
  }).then(() => {
    const form = document.getElementById('planContactForm');
    form.style.display = 'none';
    const modal = document.getElementById('planContactModal');
    const successDiv = document.createElement('div');
    successDiv.className = 'plan-contact-success';
    successDiv.innerHTML = `
    <div class="success-icon">&#9993;</div>
    <h3>Talebiniz alındı!</h3>
    <p>Satış ekibimiz en kısa sürede sizinle iletişime geçecek.</p>
    <p style="margin-top:8px;font-size:13px;color:var(--text-muted)">Acil durumlar için doğrudan <strong>info@aiacademy.com.tr</strong> adresine de yazabilirsiniz.</p>
    `;
    modal.querySelector('.plan-contact-modal').appendChild(successDiv);
    showToast('Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.', 'success');
  }).catch((err) => {
    errEl.textContent = err.message || 'Talep kaydedilirken hata oluştu.';
    showToast(err.message || 'Talep kaydedilirken hata oluştu.', 'error');
  }).finally(() => {
    submitBtn.disabled = false;
    submitBtn.classList.remove('btn-loading');
  });

}

function setAuthMode(mode) {
  authMode = mode;
  document.getElementById('authModalTitle').textContent = mode === 'login' ? 'Giris Yap' : 'Kayit Ol';
  document.getElementById('authNameField').style.display = mode === 'register' ? 'block' : 'none';
  document.getElementById('authSubmitBtn').textContent = mode === 'login' ? 'Giris Yap' : 'Kayit Ol';
  document.getElementById('authSwitchText').textContent = mode === 'login' ? 'Hesabiniz yok mu?' : 'Zaten hesabiniz var mi?';
  document.getElementById('authSwitchLink').textContent = mode === 'login' ? 'Kayit Ol' : 'Giris Yap';
  if (mode === 'register') {
    trackEvent('signup_started', { method: 'email' });
  }
}

async function handleAuth(e) {
  e.preventDefault();
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value;
  const name = document.getElementById('authName').value.trim();
  const errEl = document.getElementById('authError');
  const submitBtn = document.getElementById('authSubmitBtn');

  if (!email || !password) { errEl.textContent = 'E-posta ve şifre zorunludur.'; return; }
  if (authMode === 'register' && password.length < 6) { errEl.textContent = 'Şifre en az 6 karakter olmalıdır.'; return; }
  if (authMode === 'register' && !name) { errEl.textContent = 'İsim alanı zorunludur.'; return; }

  submitBtn.classList.add('btn-loading');
  submitBtn.disabled = true;
  errEl.textContent = '';

  try {
    const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const body = authMode === 'login' ? { email, password } : { email, password, name, role: appState.role };
    const data = await apiFetch(endpoint, { method: 'POST', body });
    token = data.token;
    currentUser = data.user;
    localStorage.setItem('aiacademy_token', token);

    if (authMode === 'login' && currentUser) {
      appState.completedCourses = currentUser.completedCourses || [];
      appState.completedChallenges = currentUser.completedChallenges || [];
      appState.points = currentUser.points || 0;
      appState.quizResults = currentUser.quizResults || {};
      appState.role = currentUser.role || 'general';
      saveLocalState(appState);
    } else {
      syncProgress();
    }
    hideAuthModal();
    updateAuthUI();
    refreshUI();
    if (authMode === 'login') {
      trackEvent('login', { method: 'email', user_plan: currentUser.plan, user_role: currentUser.role });
    } else {
      trackEvent('sign_up', { method: 'email', user_plan: currentUser.plan, user_role: currentUser.role });
      trackEvent('signup_completed', { method: 'email', user_plan: currentUser.plan, user_role: currentUser.role });
    }
    showToast(`Hoş geldiniz, ${currentUser.name}!`, 'success');
  } catch (err) {
    errEl.textContent = err.message;
    showToast(err.message, 'error');
  } finally {
    submitBtn.classList.remove('btn-loading');
    submitBtn.disabled = false;
  }
}

async function checkAuth() {
  if (!token) return;
  try {
    const data = await apiFetch('/api/auth/me');
    currentUser = data.user;
    appState.role = currentUser.role || appState.role;
    updateAuthUI();
  } catch {
    token = null;
    currentUser = null;
    localStorage.removeItem('aiacademy_token');
  }
}

function updateAuthUI() {
  const authArea = document.getElementById('authArea');
  const userArea = document.getElementById('userArea');
  const creditPill = document.getElementById('creditPill');
  const adminLink = document.getElementById('adminLink');
  const logoutBtn = document.getElementById('logoutBtn');

  if (currentUser) {
    authArea.style.display = 'none';
    userArea.style.display = 'block';
    document.getElementById('userMenuBtn').textContent = currentUser.name.split(' ')[0];
    creditPill.style.display = 'block';
    creditPill.querySelector('#creditCount').textContent = currentUser.credits;
    if (currentUser.isAdmin) adminLink.style.display = 'inline';
    logoutBtn.style.display = 'inline-block';
    const planLabels = { free: 'Ücretsiz', pro: 'Pro', enterprise: 'Kurumsal' };
    const planLabel = planLabels[currentUser.plan] || currentUser.plan;
    document.getElementById('profilePlan').textContent = planLabel;
    document.getElementById('profileCredits').textContent = currentUser.credits;

    const dropdownInfo = document.getElementById('dropdownUserInfo');
    if (dropdownInfo) {
      dropdownInfo.innerHTML = `<div class="dropdown-name">${currentUser.name}</div><div class="dropdown-email">${currentUser.email}</div><span class="dropdown-plan-badge">${planLabel} Plan</span>`;
    }
    updatePlanUI();
  } else {
    authArea.style.display = 'block';
    userArea.style.display = 'none';
    creditPill.style.display = 'none';
    adminLink.style.display = 'none';
    hidePlanUI();
    logoutBtn.style.display = 'none';
  }
}

function logout() {
  token = null;
  currentUser = null;
  localStorage.removeItem('aiacademy_token');
  closeUserDropdown();
  updateAuthUI();
  refreshUI();
  showToast('Başarıyla çıkış yaptınız.', 'success');
}

async function startProCheckout() {
  if (!token) {
    showAuthModal();
    showToast('Önce hesap oluşturup giriş yapın, ardından tekrar deneyin.', 'info');
    return;
  }
  try {
    trackEvent('plan_checkout_started', { target_plan: 'pro', current_plan: currentUser?.plan || 'free' });
    const data = await apiFetch('/api/billing/create-checkout-session', { method: 'POST' });
    if (data.url) {
      window.location.href = data.url;
    } else {
      showToast('Ödeme oturumu oluşturulamadı.', 'error');
    }
  } catch (err) {
    showToast(err.message || 'Ödeme başlatılırken hata oluştu.', 'error');
  }
}

// ─── PLAN UI & UPGRADE BANNERS ──────────────────────────────
let _planLimits = null;

async function fetchPlanLimits() {
  if (!token) return null;
  try {
    _planLimits = await apiFetch('/api/credits/limits');
    return _planLimits;
  } catch { return null; }
}

function updatePlanUI() {
  if (!currentUser) return;
  const isFree = currentUser.plan === 'free';

  const chatBanner = document.getElementById('chatUpgradeBanner');
  if (chatBanner) chatBanner.style.display = isFree ? 'flex' : 'none';

  const toolBanner = document.getElementById('toolUpgradeBanner');
  if (toolBanner) toolBanner.style.display = isFree ? 'flex' : 'none';

  const googleBanner = document.getElementById('googleUpgradeBanner');
  if (googleBanner) googleBanner.style.display = isFree ? 'flex' : 'none';

  const modelHint = document.getElementById('chatModelHint');
  if (modelHint) {
    modelHint.textContent = isFree ? 'Haiku modeli' : (currentUser.plan === 'pro' ? 'Sonnet modeli' : '');
  }

  updateToolCardStates();

  if (token) fetchPlanLimits().then(updateUsageIndicators);

  const planBtns = document.querySelectorAll('[data-plan]');
  planBtns.forEach(btn => {
    const p = btn.dataset.plan;
    if (p === currentUser.plan) {
      btn.textContent = 'Mevcut Plan';
      btn.disabled = true;
      btn.classList.remove('primary');
    } else if (p === 'free') {
      btn.textContent = 'Ücretsiz Plan';
      btn.disabled = true;
    } else if (p === 'enterprise') {
      btn.textContent = 'İletişime Geç';
      btn.disabled = false;
    } else {
      btn.textContent = 'Bilgi Al';
      btn.disabled = false;
      if (p === 'pro') btn.classList.add('primary');
    }
  });
}

function hidePlanUI() {
  ['chatUpgradeBanner', 'toolUpgradeBanner', 'googleUpgradeBanner', 'chatUsageBar', 'toolUsageBar'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

function updateUsageIndicators(limits) {
  if (!limits) return;

  const chatUsageBar = document.getElementById('chatUsageBar');
  const chatUsageFill = document.getElementById('chatUsageFill');
  const chatUsageText = document.getElementById('chatUsageText');
  if (chatUsageBar && limits.dailyMessages) {
    chatUsageBar.style.display = 'flex';
    const pct = Math.min(100, (limits.dailyMessages.used / limits.dailyMessages.limit) * 100);
    chatUsageFill.style.width = pct + '%';
    chatUsageFill.className = 'usage-bar-fill' + (pct >= 90 ? ' danger' : pct >= 70 ? ' warning' : '');
    chatUsageText.textContent = `${limits.dailyMessages.used}/${limits.dailyMessages.limit}`;
  }

  const toolUsageBar = document.getElementById('toolUsageBar');
  const toolUsageFill = document.getElementById('toolUsageFill');
  const toolUsageText = document.getElementById('toolUsageText');
  if (toolUsageBar && limits.dailyToolUses) {
    toolUsageBar.style.display = limits.plan === 'free' ? 'flex' : 'none';
    const pct = Math.min(100, (limits.dailyToolUses.used / limits.dailyToolUses.limit) * 100);
    toolUsageFill.style.width = pct + '%';
    toolUsageFill.className = 'usage-bar-fill' + (pct >= 90 ? ' danger' : pct >= 70 ? ' warning' : '');
    toolUsageText.textContent = `${limits.dailyToolUses.used}/${limits.dailyToolUses.limit}`;
  }

  const chatLimitText = document.getElementById('chatLimitText');
  if (chatLimitText && limits.dailyMessages) {
    const remaining = Math.max(0, limits.dailyMessages.limit - limits.dailyMessages.used);
    chatLimitText.textContent = `Ücretsiz planda günde ${limits.dailyMessages.limit} mesaj hakkınız var. (Kalan: ${remaining})`;
  }
}

function updateToolCardStates() {
  if (!currentUser) return;
  const isFree = currentUser.plan === 'free';
  const freeTools = ['email-writer', 'summarizer', 'translator'];
  document.querySelectorAll('.tool-card').forEach(card => {
    const toolId = card.dataset.tool;
    const isLocked = isFree && !freeTools.includes(toolId);
    card.classList.toggle('tool-locked', isLocked);
    const badge = card.querySelector('.tool-badge');
    if (badge) badge.style.display = isLocked ? 'inline' : 'none';
  });
}

// ─── USER DROPDOWN ──────────────────────────────────────────
function toggleUserDropdown() {
  const dropdown = document.getElementById('userDropdown');
  const btn = document.getElementById('userMenuBtn');
  const isOpen = dropdown.classList.contains('open');
  if (isOpen) {
    closeUserDropdown();
  } else {
    dropdown.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}
function closeUserDropdown() {
  const dropdown = document.getElementById('userDropdown');
  const btn = document.getElementById('userMenuBtn');
  if (dropdown) dropdown.classList.remove('open');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

// ─── RENDER FUNCTIONS (ORIGINAL) ────────────────────────────
function computeTotalMandatory() { return COURSES.filter(c => c.mandatory).length; }
function computeCompletedMandatory() { return COURSES.filter(c => c.mandatory && getState().completedCourses.includes(c.id)).length; }
function getOverallProgressPercent() { const t = computeTotalMandatory(); return t ? Math.round((computeCompletedMandatory() / t) * 100) : 0; }
function getCurrentBadgeId() { let cur = null; for (const b of BADGES) { if (getState().points >= b.minPoints) cur = b.id; } return cur; }

function renderOverallStats() {
  const s = getState();
  document.getElementById('overallProgressPercent').textContent = `${getOverallProgressPercent()}%`;
  document.getElementById('completedMandatoryCount').textContent = computeCompletedMandatory();
  document.getElementById('totalMandatoryCount').textContent = computeTotalMandatory();
  document.getElementById('totalPoints').textContent = s.points;
  const badge = BADGES.find(b => b.id === getCurrentBadgeId());
  document.getElementById('currentBadge').textContent = badge ? badge.name : '-';
}

function renderRoleSelector() { document.getElementById('roleSelect').value = getState().role; }

function renderDashboardLists() {
  const s = getState();
  const recList = document.getElementById('recommendedList');
  recList.innerHTML = '';
  COURSES.filter(c => c.mandatory).forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="pill-badge"><span class="pill-label">${c.title}</span><span class="pill-meta">${c.duration} · ${c.points} puan</span></span>`;
    recList.appendChild(li);
  });

  const roleList = document.getElementById('roleBasedList');
  roleList.innerHTML = '';
  COURSES.filter(c => c.role === s.role || (s.role === 'general' && c.mandatory)).slice(0, 4).forEach(c => {
    const li = document.createElement('li');
    const rl = c.role === 'general' ? 'Genel' : c.role === 'business' ? 'Ofis' : 'Teknik';
    li.innerHTML = `<span class="pill-badge"><span class="pill-label">${c.title}</span><span class="pill-meta">${rl} · ${c.level}</span></span>`;
    roleList.appendChild(li);
  });

  const recentList = document.getElementById('recentCompletionsList');
  recentList.innerHTML = '';
  if (!s.recentCompletions.length) {
    recentList.innerHTML = '<li>Henuz bir aktivite yok.</li>';
  } else {
    s.recentCompletions.slice(0, 5).forEach(e => {
      const li = document.createElement('li');
      li.textContent = `${e.type === 'course' ? 'Egitim' : 'Gorev'}: ${e.title} (${e.points} puan)`;
      recentList.appendChild(li);
    });
  }

  const ws = document.getElementById('weeklyGoalStatus');
  ws.innerHTML = '';
  const cm = computeCompletedMandatory() > 0;
  const cc = s.completedChallenges.length > 0;
  ws.innerHTML = `<li><span>1 zorunlu modul</span><span class="${cm ? 'status-ok' : 'status-pending'}">${cm ? 'Tamam' : 'Bekleniyor'}</span></li>
    <li><span>1 gorev</span><span class="${cc ? 'status-ok' : 'status-pending'}">${cc ? 'Tamam' : 'Bekleniyor'}</span></li>`;
}

function renderOnboardingCard() {
  const card = document.getElementById('onboardingCard');
  if (!card) return;
  const state = getOnboardingState();
  const dismissed = appState.onboardingDismissed;
  const completed = isOnboardingComplete();

  if (dismissed || completed) {
    card.style.display = 'none';
    return;
  }

  card.style.display = 'block';
  const steps = ['chat', 'tool', 'course'];
  const completedCount = steps.filter(k => state[k]).length;
  const progressEl = document.getElementById('onboardingProgress');
  if (progressEl) progressEl.textContent = `${completedCount}/3 adım tamamlandı`;

  const stepMap = {
    chat: document.getElementById('obStepChat'),
    tool: document.getElementById('obStepTool'),
    course: document.getElementById('obStepCourse'),
  };
  steps.forEach(key => {
    const cb = stepMap[key];
    if (!cb) return;
    cb.checked = !!state[key];
    const li = cb.closest('.onboarding-step');
    if (li) {
      li.classList.toggle('completed', !!state[key]);
    }
  });
}

function renderCourses() {
  const s = getState();
  const container = document.getElementById('courseList');
  const rf = document.getElementById('courseRoleFilter').value;
  const tf = document.getElementById('courseTypeFilter').value;
  container.innerHTML = '';
  let filtered = COURSES.slice();
  if (rf !== 'all') filtered = filtered.filter(c => c.role === rf);
  if (tf !== 'all') filtered = filtered.filter(c => tf === 'mandatory' ? c.mandatory : !c.mandatory);

  filtered.forEach(course => {
    const done = s.completedCourses.includes(course.id);
    const rl = course.role === 'general' ? 'Genel' : course.role === 'business' ? 'Ofis' : 'Teknik';
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `<div class="course-main"><div class="course-title-row"><h3>${course.title}</h3><span class="course-chip">${rl}</span></div>
      <div class="course-meta"><span>${course.level}</span><span>${course.duration}</span><span class="points-pill">${course.points} puan</span>
      <span class="${course.mandatory ? 'mandatory-tag' : 'optional-tag'}">${course.mandatory ? 'Zorunlu' : 'Istege bagli'}</span></div></div>
      <div class="course-actions"><a href="${course.link}" target="_blank" class="small-link" data-course-open-id="${course.id}">Icerigi ac</a>
      <button class="small-button ${done ? 'completed' : 'primary'}" data-course-id="${course.id}">${done ? 'Tamamlandi' : 'Tamamladim'}</button></div>`;
    container.appendChild(card);
  });
}

function renderChallenges() {
  const s = getState();
  const container = document.getElementById('challengeList');
  container.innerHTML = '';
  CHALLENGES.forEach(ch => {
    const done = s.completedChallenges.includes(ch.id);
    const rl = ch.suggestedRole === 'general' ? 'Genel' : ch.suggestedRole === 'business' ? 'Ofis' : 'Teknik';
    const card = document.createElement('div');
    card.className = 'challenge-card';
    card.innerHTML = `<div class="challenge-main"><div class="course-title-row"><h3>${ch.title}</h3><span class="course-chip">${rl}</span></div>
      <p style="font-size:12px;color:var(--text-muted);margin:4px 0">${ch.description}</p>
      <div class="course-meta"><span class="points-pill">${ch.points} puan</span></div></div>
      <div class="challenge-actions"><button class="small-button ${done ? 'completed' : 'primary'}" data-challenge-id="${ch.id}">${done ? 'Tamamlandi' : 'Tamamladim'}</button></div>`;
    container.appendChild(card);
  });
}

function renderProfile() {
  const s = getState();
  const roleLabel = s.role === 'general' ? 'Genel' : s.role === 'business' ? 'Ofis / Is' : 'Teknik';
  document.getElementById('profileRole').textContent = roleLabel;
  document.getElementById('profileCompletedCourses').textContent = s.completedCourses.length;
  document.getElementById('profileCompletedChallenges').textContent = s.completedChallenges.length;
  document.getElementById('profilePoints').textContent = s.points;

  const bl = document.getElementById('badgeList');
  bl.innerHTML = '';
  const curBadge = getCurrentBadgeId();
  BADGES.forEach(b => {
    const div = document.createElement('div');
    div.className = `badge-item ${b.id === curBadge ? 'active' : ''}`;
    div.innerHTML = `<span class="badge-name">${b.name}</span><span class="badge-desc">Min ${b.minPoints} puan</span>`;
    bl.appendChild(div);
  });
}

function renderLibrary() {
  const s = getState();
  const container = document.getElementById('libraryList');
  if (!container) return;
  container.innerHTML = '';
  LIBRARY_DOCS.forEach(doc => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `<div class="course-main"><div class="course-title-row"><h3>${doc.title}</h3><span class="course-chip">${doc.category}</span></div>
      <div class="course-meta"><span>${doc.level}</span><span>${doc.readingTime} okuma</span></div></div>
      <div class="course-actions"><a href="${doc.file}" target="_blank" class="small-link">Dokumani ac</a></div>`;
    container.appendChild(card);
  });
}

function renderExamSummary() {
  const s = getState();
  const lid = document.getElementById('examLevelSelect').value;
  const quiz = QUIZZES[lid];
  if (!quiz) return;
  const results = s.quizResults[lid] || { bestScore: null, passed: false };
  document.getElementById('examBestScore').textContent = typeof results.bestScore === 'number' ? `${results.bestScore} / 100` : '-';
  const certEl = document.getElementById('examCertificateStatus');
  const dlBtn = document.getElementById('downloadCertBtn');
  const liBtn = document.getElementById('linkedinShareBtn');
  if (results.passed) {
    certEl.textContent = `${quiz.name} sertifikasi alindi`;
    dlBtn.style.display = 'inline-block';
    liBtn.style.display = 'inline-block';
  } else {
    certEl.textContent = 'Henuz alinmadi';
    dlBtn.style.display = 'none';
    liBtn.style.display = 'none';
  }
  renderMyCerts();
}

function renderQuiz(levelId) {
  const quiz = QUIZZES[levelId];
  if (!quiz) return;
  const container = document.getElementById('quizContainer');
  const submitBtn = document.getElementById('submitExamBtn');
  document.getElementById('quizResultMessage').textContent = '';
  trackEvent('exam_started', {
    exam_level: levelId,
    exam_name: quiz.name,
    question_count: quiz.questions.length,
  });
  container.innerHTML = quiz.questions.map((q, qi) =>
    `<div class="quiz-question"><div class="quiz-question-title">Soru ${qi+1}: ${q.text}</div>
    <ul class="quiz-options">${q.options.map((o, oi) => `<li><label><input type="radio" name="quiz-q-${qi}" value="${oi}"><span>${o}</span></label></li>`).join('')}</ul></div>`
  ).join('');
  submitBtn.disabled = false;
}

function evaluateQuiz() {
  const s = getState();
  const lid = document.getElementById('examLevelSelect').value;
  const quiz = QUIZZES[lid];
  if (!quiz) return;
  const container = document.getElementById('quizContainer');
  let correct = 0;
  quiz.questions.forEach((q, qi) => {
    const sel = container.querySelector(`input[name="quiz-q-${qi}"]:checked`);
    if (sel && Number(sel.value) === q.correctIndex) correct++;
  });
  const score = Math.round((correct / quiz.questions.length) * 100);
  const passed = score >= quiz.passScore;

  if (!s.quizResults[lid]) s.quizResults[lid] = { attempts: 0, bestScore: null, lastScore: null, passed: false };
  s.quizResults[lid].attempts++;
  s.quizResults[lid].lastScore = score;
  s.quizResults[lid].bestScore = Math.max(s.quizResults[lid].bestScore || 0, score);
  s.quizResults[lid].passed = s.quizResults[lid].passed || passed;

  appState.quizResults = s.quizResults;
  saveLocalState(appState);
  syncProgress();

  const msg = document.getElementById('quizResultMessage');
  msg.textContent = passed ? `Tebrikler! Skor: ${score}/100. Sertifika kazandınız!` : `Skor: ${score}/100. En az ${quiz.passScore} gerekli.`;
  msg.className = `exam-result-message ${passed ? 'exam-result-pass' : 'exam-result-fail'}`;
  showToast(passed ? `Tebrikler! ${quiz.name} sınavını ${score} puanla geçtiniz!` : `Sınav puanı: ${score}/100. Geçme notu: ${quiz.passScore}`, passed ? 'success' : 'warning');
  trackEvent('exam_submit', { exam_level: lid, exam_name: quiz.name, score, passed, attempts: s.quizResults[lid].attempts });
  trackEvent('exam_completed', { exam_level: lid, exam_name: quiz.name, score, passed, attempts: s.quizResults[lid].attempts });
  document.getElementById('submitExamBtn').disabled = true;

  if (passed && token) {
    trackEvent('certificate_earned', { level: lid, score });
    generateCertificate(lid, score);
    apiFetch('/api/credits/earn', { method: 'POST', body: { reason: `Sinav gecme: ${quiz.name}`, amount: 10 } }).catch(() => {});
  }
  renderExamSummary();
}

async function generateCertificate(level, score) {
  if (!token) return;
  try {
    await apiFetch('/api/certificates/generate', { method: 'POST', body: { level, score } });
    renderMyCerts();
  } catch { /* silent */ }
}

async function renderMyCerts() {
  if (!token) return;
  const card = document.getElementById('myCertsCard');
  const list = document.getElementById('myCertsList');
  try {
    const data = await apiFetch('/api/certificates/my');
    if (data.certificates.length === 0) { card.style.display = 'none'; return; }
    card.style.display = 'block';
    const levelNames = { level1: 'Temel', level2: 'Is/Ofis', level3: 'Teknik' };
    list.innerHTML = data.certificates.map(c =>
      `<div class="course-card"><div class="course-main"><h3>${levelNames[c.level] || c.level} Sertifikasi</h3>
      <div class="course-meta"><span>Skor: ${c.score}/100</span><span>Kod: ${c.certificate_code}</span><span>${new Date(c.created_at).toLocaleDateString('tr-TR')}</span></div></div>
      <div class="course-actions"><a href="/api/certificates/pdf/${c.certificate_code}" target="_blank" class="small-link">PDF Goruntule</a></div></div>`
    ).join('');
  } catch { card.style.display = 'none'; }
}

// ─── CHAT ────────────────────────────────────────────────────
let hasTrackedChatStart = false;
async function loadConversations() {
  if (!token) return;
  try {
    const data = await apiFetch('/api/chat/conversations');
    const list = document.getElementById('conversationList');
    list.innerHTML = '';
    data.conversations.forEach(c => {
      const div = document.createElement('div');
      div.className = `conv-item ${c.id === currentConvId ? 'active' : ''}`;
      div.innerHTML = `<span>${c.title}</span><button class="conv-delete" data-conv-del="${c.id}">&times;</button>`;
      div.addEventListener('click', (e) => { if (!e.target.dataset.convDel) loadConversation(c.id); });
      list.appendChild(div);
    });
  } catch { /* silent */ }
}

async function loadConversation(id) {
  if (!token) return;
  currentConvId = id;
  try {
    const data = await apiFetch(`/api/chat/conversations/${id}/messages`);
    const container = document.getElementById('chatMessages');
    container.innerHTML = '';
    data.messages.forEach(m => appendChatBubble(m.role, m.content));
    container.scrollTop = container.scrollHeight;
    loadConversations();
  } catch { /* silent */ }
}

async function deleteConversation(id) {
  if (!token) return;
  try {
    await apiFetch(`/api/chat/conversations/${id}`, { method: 'DELETE' });
    if (currentConvId === id) { currentConvId = null; resetChatUI(); }
    loadConversations();
  } catch { /* silent */ }
}

function resetChatUI() {
  document.getElementById('chatMessages').innerHTML = `<div class="chat-welcome"><h2>AI Asistaniniz</h2>
    <p>Departmaniniza ozel AI asistani ile sohbet edin.</p>
    <div class="chat-suggestions">
      <button class="suggestion-chip" data-msg="Etkili prompt yazmayi ogretir misin?">Prompt ipuclari</button>
      <button class="suggestion-chip" data-msg="Profesyonel bir e-posta taslagi hazirla">E-posta yardimi</button>
      <button class="suggestion-chip" data-msg="Bu hafta AI ile neler yapabilirim?">AI kullanim fikirleri</button>
    </div></div>`;
  bindSuggestionChips();
}

async function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;

  if (!token) { showAuthModal(); return; }

  input.value = '';
  input.style.height = 'auto';
  const container = document.getElementById('chatMessages');
  const welcome = container.querySelector('.chat-welcome');
  if (welcome) welcome.remove();

  appendChatBubble('user', message);
  const typing = document.createElement('div');
  typing.className = 'chat-typing';
  typing.textContent = 'AI dusunuyor';
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;

  try {
    const persona = document.getElementById('chatPersona').value;
    const data = await apiFetch('/api/chat/message', { method: 'POST', body: {
      conversationId: currentConvId, message, systemPromptKey: persona
    }});
    typing.remove();
    currentConvId = data.conversationId;
    appendChatBubble('assistant', data.reply);
    container.scrollTop = container.scrollHeight;
    loadConversations();
    trackEvent('chat_message', { persona, credits_used: data.creditsUsed || 0, is_demo: !!data.demo });
    trackEvent('chat_message_sent', {
      persona,
      credits_used: data.creditsUsed || 0,
      has_token: !!token,
      plan: currentUser?.plan || 'anonymous',
    });
    completeOnboardingStep('chat');
    if (currentUser) {
      currentUser.credits -= (data.creditsUsed || 0);
      updateAuthUI();
    }
  } catch (err) {
    typing.remove();
    if (err.message && err.message.includes('limitine')) {
      trackEvent('chat_limit_hit', { plan: currentUser?.plan });
      appendChatBubble('assistant', `${err.message}\n\nPro plana yükseltme yapmak için **Profil** sekmesini ziyaret edin.`);
    } else {
      appendChatBubble('assistant', `Hata: ${err.message}`);
    }
  }
}

function appendChatBubble(role, content) {
  const container = document.getElementById('chatMessages');
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${role}`;
  bubble.innerHTML = formatMarkdown(content);
  container.appendChild(bubble);
}

function formatMarkdown(text) {
  return text
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

// ─── VOICE ──────────────────────────────────────────────────
let recognition = null;
function initVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;
  recognition = new SpeechRecognition();
  recognition.lang = 'tr-TR';
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.onresult = (e) => {
    const text = e.results[0][0].transcript;
    document.getElementById('chatInput').value = text;
    document.getElementById('voiceStatus').style.display = 'none';
  };
  recognition.onerror = () => { document.getElementById('voiceStatus').style.display = 'none'; };
  recognition.onend = () => { document.getElementById('voiceStatus').style.display = 'none'; };
}

function startVoice() {
  if (!recognition) { initVoice(); }
  if (!recognition) return;
  document.getElementById('voiceStatus').style.display = 'inline';
  recognition.start();
}

// ─── TOOLS ──────────────────────────────────────────────────
function openToolModal(toolId) {
  if (!token) { showAuthModal(); return; }
  const freeTools = ['email-writer', 'summarizer', 'translator'];
  if (currentUser?.plan === 'free' && !freeTools.includes(toolId)) {
    showToast('Bu araç Pro plan gerektirir. Profil sayfasından planınızı yükseltebilirsiniz.', 'warning', 5000);
    return;
  }
  const names = {
    'email-writer': 'E-posta Yazici', 'summarizer': 'Dokuman Ozetleyici', 'meeting-notes': 'Toplanti Notu',
    'report-generator': 'Rapor Olusturucu', 'code-reviewer': 'Kod Inceleyici', 'translator': 'Ceviri Motoru',
    'presentation': 'Sunum Taslagi', 'contract-analyzer': 'Sozlesme Analizi',
  };
  const costs = { 'email-writer':3,'summarizer':3,'meeting-notes':4,'report-generator':5,'code-reviewer':4,'translator':3,'presentation':5,'contract-analyzer':6 };

  trackEvent('tool_opened', {
    tool_id: toolId,
    plan: currentUser?.plan || 'anonymous',
    is_free_tool: freeTools.includes(toolId),
  });

  document.getElementById('toolModalTitle').textContent = names[toolId] || toolId;
  document.getElementById('toolCreditCost').textContent = `${costs[toolId] || 0} kredi harcanacak`;
  document.getElementById('toolOutput').style.display = 'none';

  const formArea = document.getElementById('toolFormArea');
  const fields = TOOL_FORMS[toolId] || [];
  formArea.innerHTML = fields.map(f => {
    if (f.type === 'textarea') return `<label>${f.label}</label><textarea name="${f.name}" placeholder="${f.placeholder || ''}"></textarea>`;
    if (f.type === 'select') return `<label>${f.label}</label><select name="${f.name}">${f.options.map(o => `<option value="${o}">${o}</option>`).join('')}</select>`;
    return `<label>${f.label}</label><input type="${f.type}" name="${f.name}" placeholder="${f.placeholder || ''}" />`;
  }).join('');

  const runBtn = document.getElementById('runToolBtn');
  runBtn.onclick = () => runTool(toolId);
  document.getElementById('toolModal').style.display = 'flex';
}

async function runTool(toolId) {
  const formArea = document.getElementById('toolFormArea');
  const body = {};
  formArea.querySelectorAll('input, textarea, select').forEach(el => { body[el.name] = el.value; });

  const runBtn = document.getElementById('runToolBtn');
  runBtn.disabled = true;
  runBtn.classList.add('btn-loading');
  runBtn.textContent = 'İşleniyor...';

  try {
    const data = await apiFetch(`/api/tools/run/${toolId}`, { method: 'POST', body });
    document.getElementById('toolOutput').style.display = 'block';
    document.getElementById('toolOutputContent').innerHTML = formatMarkdown(data.output);
    trackEvent('tool_use', { tool_id: toolId, credits_used: data.creditsUsed || 0, is_demo: !!data.demo });
    trackEvent('tool_run', {
      tool_id: toolId,
      credits_used: data.creditsUsed || 0,
      is_demo: !!data.demo,
      plan: currentUser?.plan || 'anonymous',
    });
    completeOnboardingStep('tool');
    if (currentUser) {
      currentUser.credits -= (data.creditsUsed || 0);
      updateAuthUI();
    }
  } catch (err) {
    document.getElementById('toolOutput').style.display = 'block';
    const msg = err.message || 'Bilinmeyen hata';
    if (msg.includes('Pro plan') || msg.includes('limitine')) {
      document.getElementById('toolOutputContent').innerHTML = `<div class="upgrade-banner" style="margin:0"><div class="upgrade-banner-text">${msg}</div><button class="upgrade-banner-btn" onclick="document.querySelector('.tab-button[data-tab=&quot;profile&quot;]').click();setTimeout(()=>document.getElementById('pricingCard').scrollIntoView({behavior:'smooth'}),100);document.getElementById('toolModal').style.display='none'">Pro'ya Geç</button></div>`;
    } else {
      document.getElementById('toolOutputContent').textContent = `Hata: ${msg}`;
    }
  } finally {
    runBtn.disabled = false;
    runBtn.classList.remove('btn-loading');
    runBtn.textContent = 'Çalıştır';
    fetchPlanLimits().then(updateUsageIndicators);
  }
}

// ─── MARKETPLACE ────────────────────────────────────────────
async function loadMarketplace() {
  const cat = document.getElementById('mpCategoryFilter').value;
  const sort = document.getElementById('mpSortFilter').value;
  try {
    const data = await apiFetch(`/api/marketplace/prompts?category=${cat}&sort=${sort}`);
    renderPromptList(data.prompts);
  } catch {
    document.getElementById('promptList').innerHTML = '<p style="color:var(--text-muted);font-size:13px">Pazaryeri yuklenirken hata olustu.</p>';
  }
}

function renderPromptList(prompts) {
  const container = document.getElementById('promptList');
  if (!prompts.length) {
    container.innerHTML = '<p style="color:var(--text-muted);font-size:13px">Henuz prompt yok. Ilk prompt\'u siz olusturun!</p>';
    return;
  }
  container.innerHTML = prompts.map(p => {
    const catLabels = { marketing:'Pazarlama', hr:'IK', finance:'Finans', technical:'Teknik', legal:'Hukuk', general:'Genel', education:'Egitim' };
    return `<div class="prompt-card"><div class="prompt-card-header"><div><h3>${p.title}</h3>
      <div class="prompt-card-meta"><span>${catLabels[p.category] || p.category}</span><span>${p.author_name}</span>
      ${p.avgRating ? `<span class="prompt-rating">${p.avgRating}/5</span>` : ''}<span>${p.usage_count} kullanim</span></div>
      ${p.description ? `<p class="prompt-card-desc">${p.description}</p>` : ''}</div>
      <span class="prompt-price ${p.price === 0 ? 'free' : ''}">${p.price === 0 ? 'Ucretsiz' : p.price + ' kredi'}</span></div>
      <div class="prompt-card-actions"><button class="small-button primary" onclick="viewPrompt(${p.id})">Goruntule</button></div></div>`;
  }).join('');
}

async function viewPrompt(id) {
  try {
    const data = await apiFetch(`/api/marketplace/prompts/${id}`);
    const p = data.prompt;
    const modal = document.getElementById('promptModal');
    document.getElementById('promptModalTitle').textContent = p.title;
    document.getElementById('promptModalBody').innerHTML = `
      <p style="color:var(--text-muted);font-size:13px">${p.description || ''}</p>
      <div style="margin-top:12px"><label style="font-size:12px;color:var(--text-muted)">Prompt Icerigi:</label>
      <pre style="background:rgba(0,0,0,0.3);padding:10px;border-radius:8px;font-size:12px;white-space:pre-wrap;margin-top:4px">${p.canView ? p.content : '[Satin almaniz gerekiyor - ' + p.price + ' kredi]'}</pre></div>
      ${!p.canView ? `<button class="primary-button" style="margin-top:10px" onclick="buyPrompt(${p.id})">Satin Al (${p.price} kredi)</button>` : ''}
      ${p.canView ? `<button class="ghost-button" style="margin-top:10px" onclick="copyToClipboard('${p.content.replace(/'/g, "\\'")}')">Kopyala</button>` : ''}
      <div style="margin-top:16px"><h3 style="font-size:14px">Degerlendirmeler</h3>
      ${data.ratings.length ? data.ratings.map(r => `<div style="font-size:12px;margin:4px 0;color:var(--text-muted)"><strong>${r.reviewer_name}</strong>: ${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)} ${r.comment || ''}</div>`).join('') : '<p style="font-size:12px;color:var(--text-muted)">Henuz degerlendirme yok</p>'}
      </div>`;
    modal.style.display = 'flex';
  } catch { /* silent */ }
}

async function buyPrompt(id) {
  try {
    await apiFetch(`/api/marketplace/prompts/${id}/buy`, { method: 'POST' });
    trackEvent('prompt_purchase', { prompt_id: id });
    viewPrompt(id);
    if (currentUser) { currentUser.credits -= 0; checkAuth(); }
  } catch (err) { showToast(err.message, 'error'); }
}

function showCreatePromptModal() {
  if (!token) { showAuthModal(); return; }
  const modal = document.getElementById('promptModal');
  document.getElementById('promptModalTitle').textContent = 'Yeni Prompt Olustur';
  document.getElementById('promptModalBody').innerHTML = `
    <div style="display:flex;flex-direction:column;gap:10px">
      <div><label style="font-size:12px;color:var(--text-muted)">Baslik</label><input type="text" id="newPromptTitle" style="width:100%;background:rgba(15,23,42,0.9);border:1px solid rgba(55,65,81,0.8);border-radius:8px;padding:8px;color:var(--text);font-size:13px" /></div>
      <div><label style="font-size:12px;color:var(--text-muted)">Aciklama</label><input type="text" id="newPromptDesc" style="width:100%;background:rgba(15,23,42,0.9);border:1px solid rgba(55,65,81,0.8);border-radius:8px;padding:8px;color:var(--text);font-size:13px" /></div>
      <div><label style="font-size:12px;color:var(--text-muted)">Kategori</label><select id="newPromptCat" style="width:100%;background:rgba(15,23,42,0.9);border:1px solid rgba(55,65,81,0.8);border-radius:8px;padding:8px;color:var(--text);font-size:13px"><option value="general">Genel</option><option value="marketing">Pazarlama</option><option value="hr">IK</option><option value="finance">Finans</option><option value="technical">Teknik</option><option value="legal">Hukuk</option><option value="education">Egitim</option></select></div>
      <div><label style="font-size:12px;color:var(--text-muted)">Prompt Icerigi</label><textarea id="newPromptContent" rows="5" style="width:100%;background:rgba(15,23,42,0.9);border:1px solid rgba(55,65,81,0.8);border-radius:8px;padding:8px;color:var(--text);font-size:13px;font-family:inherit"></textarea></div>
      <div><label style="font-size:12px;color:var(--text-muted)">Fiyat (0 = ucretsiz, kredi cinsinden)</label><input type="number" id="newPromptPrice" value="0" min="0" style="width:100px;background:rgba(15,23,42,0.9);border:1px solid rgba(55,65,81,0.8);border-radius:8px;padding:8px;color:var(--text);font-size:13px" /></div>
      <button class="primary-button" onclick="submitNewPrompt()">Yayinla</button>
    </div>`;
  modal.style.display = 'flex';
}

async function submitNewPrompt() {
  try {
    await apiFetch('/api/marketplace/prompts', { method: 'POST', body: {
      title: document.getElementById('newPromptTitle').value,
      description: document.getElementById('newPromptDesc').value,
      content: document.getElementById('newPromptContent').value,
      category: document.getElementById('newPromptCat').value,
      price: parseInt(document.getElementById('newPromptPrice').value) || 0,
    }});
    document.getElementById('promptModal').style.display = 'none';
    loadMarketplace();
    trackEvent('prompt_publish', { category: document.getElementById('newPromptCat').value, price: parseInt(document.getElementById('newPromptPrice').value) || 0 });
    showToast('Prompt başarıyla yayınlandı!', 'success');
  } catch (err) { showToast(err.message, 'error'); }
}

// ─── LEADERBOARD ────────────────────────────────────────────
async function loadLeaderboard() {
  const period = document.getElementById('lbPeriod').value;
  try {
    const data = await apiFetch(`/api/leaderboard?period=${period}`);
    renderLeaderboard(data);
  } catch {
    document.getElementById('userLeaderboard').innerHTML = '<p style="font-size:12px;color:var(--text-muted)">Siralama yuklenemedi.</p>';
  }
}

function renderLeaderboard(data) {
  const ul = document.getElementById('userLeaderboard');
  ul.innerHTML = data.users.slice(0, 20).map((u, i) => {
    const roleLabel = u.role === 'general' ? 'Genel' : u.role === 'business' ? 'Ofis' : 'Teknik';
    return `<div class="lb-item"><div class="lb-rank">${i + 1}</div><div class="lb-name">${u.name} <span style="font-size:10px;color:var(--text-muted)">${roleLabel}</span></div><div class="lb-score">${u.points} puan</div></div>`;
  }).join('') || '<p style="font-size:12px;color:var(--text-muted)">Henuz kullanici yok.</p>';

  const dl = document.getElementById('deptLeaderboard');
  if (data.departments.length) {
    const maxPts = Math.max(...data.departments.map(d => d.total_points), 1);
    const deptNames = { general: 'Genel', business: 'Ofis / Is', technical: 'Teknik' };
    dl.innerHTML = data.departments.map(d =>
      `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:12px"><span>${deptNames[d.role] || d.role} (${d.user_count} kisi)</span><span style="color:var(--accent-strong)">${d.total_points} puan</span></div>
      <div class="lb-dept-bar"><div class="lb-dept-fill" style="width:${(d.total_points / maxPts * 100).toFixed(0)}%"></div></div></div>`
    ).join('');
  }
}

// ─── ROI ─────────────────────────────────────────────────────
async function loadROI() {
  if (!token) return;
  try {
    const data = await apiFetch('/api/roi');
    document.getElementById('roiCard').style.display = 'block';
    document.getElementById('roiMini').style.display = 'block';
    document.getElementById('roiHours').textContent = data.estimatedHoursSaved;
    document.getElementById('roiContent').innerHTML = `
      <div class="roi-stat"><div class="roi-value">${data.estimatedHoursSaved}</div><div class="roi-label">Saat Tasarruf</div></div>
      <div class="roi-stat"><div class="roi-value">${data.estimatedValueTL.toLocaleString('tr-TR')} TL</div><div class="roi-label">Tahmini Deger</div></div>
      <div class="roi-stat"><div class="roi-value">${data.messageCount + data.toolCount}</div><div class="roi-label">Toplam AI Kullanim</div></div>`;
  } catch { /* silent */ }
}

// ─── NEWS ───────────────────────────────────────────────────
async function loadNews(forceRefresh = false) {
  const container = document.getElementById('newsList');
  const timestampEl = document.getElementById('newsLastUpdated');
  if (!container) return;

  container.innerHTML = `<div class="news-skeleton">
    <div class="skeleton-line wide"></div><div class="skeleton-line medium"></div>
    <div class="skeleton-line wide"></div><div class="skeleton-line medium"></div>
    <div class="skeleton-line wide"></div><div class="skeleton-line medium"></div>
  </div>`;

  try {
    const url = forceRefresh ? '/api/news?refresh=1' : '/api/news';
    const data = await fetch(url).then(r => r.json());

    if (!data.items || data.items.length === 0) {
      container.innerHTML = `<div class="news-empty"><div class="news-empty-icon">&#128240;</div><p>Henüz haber yüklenemedi. Daha sonra tekrar deneyin.</p></div>`;
      return;
    }

    if (data.fetchedAt && timestampEl) {
      const d = new Date(data.fetchedAt);
      timestampEl.textContent = `Son güncelleme: ${d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`;
    }

    container.innerHTML = data.items.map(item => {
      const catSlug = getCategorySlug(item.category);
      const langBadge = item.lang === 'en' ? '<span class="news-lang-badge">EN</span>' : '';
      return `<a href="${esc(item.link)}" target="_blank" rel="noopener noreferrer" class="news-item">
        <div class="news-source-icon">${item.icon || '📰'}</div>
        <div class="news-content">
          <div class="news-title">${esc(item.title_tr)} ${langBadge}</div>
          <div class="news-summary">${esc(item.summary_tr)}</div>
          <div class="news-meta">
            <span class="news-category news-cat-${catSlug}">${esc(item.category)}</span>
            <span class="news-source-name">${esc(item.source)}</span>
            <span class="news-dot"></span>
            <span class="news-time">${esc(item.timeAgo)}</span>
            <span class="news-external">↗</span>
          </div>
        </div>
      </a>`;
    }).join('');

  } catch (err) {
    container.innerHTML = `<div class="news-empty"><div class="news-empty-icon">&#9888;</div><p>Haberler yüklenirken bir sorun oluştu.</p></div>`;
  }
}

function getCategorySlug(category) {
  if (!category) return 'teknoloji';
  const map = {
    'Yapay Zeka': 'yapay-zeka', 'LLM': 'llm',
    'Araştırma': 'arastirma', 'Arastirma': 'arastirma',
    'Ürün': 'urun', 'Urun': 'urun',
    'Şirket': 'sirket', 'Sirket': 'sirket',
    'Etik': 'etik', 'Robotik': 'robotik', 'Teknoloji': 'teknoloji',
  };
  return map[category] || 'teknoloji';
}

// ─── ADMIN ──────────────────────────────────────────────────
async function openAdminPanel() {
  if (!token || !currentUser?.isAdmin) return;
  document.getElementById('adminModal').style.display = 'flex';
  loadAdminTab('overview');
}

async function loadAdminTab(tab) {
  const content = document.getElementById('adminContent');
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.toggle('active', t.dataset.adminTab === tab));

  if (tab === 'overview') {
    try {
      const d = await apiFetch('/api/admin/dashboard');
      content.innerHTML = `<div class="admin-stat-grid">
        <div class="admin-stat"><div class="stat-value">${d.stats.totalUsers}</div><div class="stat-label">Toplam Kullanici</div></div>
        <div class="admin-stat"><div class="stat-value">${d.stats.activeToday}</div><div class="stat-label">Bugun Aktif</div></div>
        <div class="admin-stat"><div class="stat-value">${d.stats.totalMessages}</div><div class="stat-label">Chat Mesaji</div></div>
        <div class="admin-stat"><div class="stat-value">${d.stats.totalToolUses}</div><div class="stat-label">Arac Kullanimi</div></div>
        <div class="admin-stat"><div class="stat-value">${d.stats.totalCerts}</div><div class="stat-label">Sertifika</div></div>
        <div class="admin-stat"><div class="stat-value">${d.stats.totalPrompts}</div><div class="stat-label">Prompt</div></div>
      </div>
      <h3 style="font-size:14px;margin:12px 0 6px">En Basarili Kullanicilar</h3>
      <table class="admin-user-table"><tr><th>Ad</th><th>E-posta</th><th>Puan</th><th>Kredi</th></tr>
      ${d.topUsers.map(u => `<tr><td>${u.name}</td><td>${u.email}</td><td>${u.points}</td><td>${u.credits}</td></tr>`).join('')}</table>`;
    } catch { content.innerHTML = '<p>Yukleme hatasi.</p>'; }
  } else if (tab === 'users') {
    try {
      const d = await apiFetch('/api/admin/users');
      content.innerHTML = `<table class="admin-user-table"><tr><th>Ad</th><th>E-posta</th><th>Rol</th><th>Plan</th><th>Puan</th><th>Kurs</th></tr>
      ${d.users.map(u => `<tr><td>${u.name}</td><td>${u.email}</td><td>${u.role}</td><td>${u.plan}</td><td>${u.points}</td><td>${u.courseCount}</td></tr>`).join('')}</table>`;
    } catch { content.innerHTML = '<p>Yukleme hatasi.</p>'; }
  } else if (tab === 'leads') {
    try {
      const d = await apiFetch('/api/leads');
      if (!d.leads.length) {
        content.innerHTML = '<p>Henüz lead bulunmuyor.</p>';
        return;
      }
      content.innerHTML = `<table class="admin-user-table"><tr><th>Tarih</th><th>Plan</th><th>Ad</th><th>E-posta</th><th>Şirket</th><th>Telefon</th><th>Kaynak</th></tr>
      ${d.leads.map(l => `<tr>
        <td>${new Date(l.created_at).toLocaleString('tr-TR')}</td>
        <td>${l.plan}</td>
        <td>${l.name}</td>
        <td>${l.email}</td>
        <td>${l.company || ''}</td>
        <td>${l.phone || ''}</td>
        <td>${l.source || ''}</td>
      </tr>`).join('')}</table>`;
    } catch { content.innerHTML = '<p>Leadler yüklenirken hata oluştu.</p>'; }
  } else if (tab === 'maturity') {
    try {
      const d = await apiFetch('/api/admin/ai-maturity');
      content.innerHTML = `<div style="text-align:center;margin:20px 0"><div style="font-size:48px;font-weight:700;color:var(--accent-strong)">${d.score}/100</div>
        <div style="font-size:18px;color:var(--text)">${d.level}</div></div>
        <div class="admin-stat-grid">
          <div class="admin-stat"><div class="stat-value">${d.breakdown.education}%</div><div class="stat-label">Egitim</div></div>
          <div class="admin-stat"><div class="stat-value">${d.breakdown.practice}%</div><div class="stat-label">Uygulama</div></div>
          <div class="admin-stat"><div class="stat-value">${d.breakdown.adoption}%</div><div class="stat-label">Benimseme</div></div>
          <div class="admin-stat"><div class="stat-value">${d.breakdown.certification}%</div><div class="stat-label">Sertifikasyon</div></div>
        </div>
        <h3 style="font-size:14px;margin:12px 0 6px">Oneriler</h3>
        <ul style="font-size:12px;color:var(--text-muted)">${d.recommendations.map(r => `<li style="margin-bottom:4px">${r}</li>`).join('')}</ul>`;
    } catch { content.innerHTML = '<p>Yukleme hatasi.</p>'; }
  }
}

// ─── GOOGLE DATA ────────────────────────────────────────────
let googleStatus = null;
let currentGmailMessage = null;
let currentDriveFile = null;
let activeTaskList = null;

async function checkGoogleStatus() {
  if (!token) return;
  try {
    googleStatus = await apiFetch('/api/google/status');
    updateGoogleUI();
  } catch { googleStatus = { connected: false }; }
}

function updateGoogleUI() {
  const card = document.getElementById('googleConnectCard');
  const content = document.getElementById('googleDataContent');
  const statusText = document.getElementById('googleStatusText');
  const actions = document.getElementById('googleConnectActions');

  if (googleStatus?.connected) {
    statusText.textContent = 'Google hesabiniz bagli. Asagidaki sekmelerden verilerinize erisin.';
    actions.innerHTML = '<span style="color:#34A853;font-size:13px;font-weight:600">Bagli</span>';
    content.style.display = 'block';
  } else {
    statusText.textContent = 'Google hesabinizi baglayarak Gmail, Calendar, Drive, Contacts ve Tasks verilerinize erisin.';
    actions.innerHTML = `<button id="connectGoogleBtn" class="google-btn" onclick="loginWithGoogle()">
      <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
      Google ile Baglan</button>`;
    content.style.display = 'none';
  }
}

function loginWithGoogle() {
  trackEvent('google_connect_click');
  window.location.href = '/api/auth/google';
}

function handleGoogleTokenFromURL() {
  const params = new URLSearchParams(window.location.search);
  const urlToken = params.get('token');
  const authError = params.get('auth_error');

  if (authError) {
    window.history.replaceState({}, '', '/');
    showToast('Google giriş hatası: ' + authError, 'error');
    return;
  }

  if (urlToken) {
    token = urlToken;
    localStorage.setItem('aiacademy_token', token);
    window.history.replaceState({}, '', '/');
    trackEvent('login', { method: 'google' });
  }
}

async function handleBillingFromURL() {
  const params = new URLSearchParams(window.location.search);
  const success = params.get('billing_success');
  const cancel = params.get('billing_cancel');
  const sessionId = params.get('session_id');

  if (!success && !cancel) return;

  // Temiz URL
  window.history.replaceState({}, '', '/');

  if (cancel) {
    showToast('Ödeme işlemi iptal edildi.', 'info');
    return;
  }

  if (success && sessionId) {
    try {
      const data = await apiFetch('/api/billing/confirm', {
        method: 'POST',
        body: { sessionId },
      });
      trackEvent('plan_checkout_confirmed', { target_plan: 'pro' });
      await checkAuth();
      refreshUI();
      showToast('Ödemeniz başarıyla alındı. Pro planınız aktifleştirildi.', 'success');
    } catch (err) {
      showToast(err.message || 'Ödeme doğrulanırken hata oluştu.', 'error');
    }
  }
}

// ── Gmail ─────────────────────────

async function loadGmail(query) {
  const list = document.getElementById('gmailList');
  list.innerHTML = '<p style="padding:12px;color:var(--text-muted);font-size:13px">Yukleniyor...</p>';
  try {
    const q = query || document.getElementById('gmailSearch').value || '';
    const data = await apiFetch(`/api/google/gmail/messages?q=${encodeURIComponent(q)}&maxResults=20`);
    if (!data.messages.length) {
      list.innerHTML = '<p style="padding:12px;color:var(--text-muted);font-size:13px">E-posta bulunamadi.</p>';
      return;
    }
    list.innerHTML = data.messages.map(m => {
      const from = m.from.replace(/<.*>/, '').trim();
      const d = m.date ? new Date(m.date).toLocaleDateString('tr-TR', { day:'numeric', month:'short' }) : '';
      return `<div class="gmail-item ${m.isUnread ? 'unread' : ''}" data-gmail-id="${m.id}">
        <div class="gmail-from">${esc(from)}</div>
        <div class="gmail-subject">${esc(m.subject || '(Konusuz)')}</div>
        <div class="gmail-snippet">${esc(m.snippet)}</div>
        <div class="gmail-date">${d}</div>
      </div>`;
    }).join('');
    list.querySelectorAll('.gmail-item').forEach(item => {
      item.addEventListener('click', () => openGmailMessage(item.dataset.gmailId));
    });
  } catch (err) {
    if (err.message.includes('reauth')) list.innerHTML = '<p style="padding:12px;color:var(--text-muted)">Oturum suresi doldu. <a href="#" onclick="loginWithGoogle()">Tekrar baglanin</a></p>';
    else list.innerHTML = `<p style="padding:12px;color:#f87171;font-size:13px">Hata: ${esc(err.message)}</p>`;
  }
}

async function openGmailMessage(id) {
  const detail = document.getElementById('gmailDetail');
  detail.style.display = 'block';
  document.getElementById('gmailDetailSubject').textContent = 'Yukleniyor...';
  document.getElementById('gmailDetailMeta').textContent = '';
  document.getElementById('gmailDetailBody').textContent = '';
  document.getElementById('gmailAiResult').style.display = 'none';

  try {
    const data = await apiFetch(`/api/google/gmail/messages/${id}`);
    currentGmailMessage = data;
    document.getElementById('gmailDetailSubject').textContent = data.subject || '(Konusuz)';
    document.getElementById('gmailDetailMeta').innerHTML = `<strong>Kimden:</strong> ${esc(data.from)} | <strong>Kime:</strong> ${esc(data.to)} | <strong>Tarih:</strong> ${data.date ? new Date(data.date).toLocaleString('tr-TR') : '-'}`;
    document.getElementById('gmailDetailBody').innerHTML = data.body || data.snippet || '(Icerik yok)';
    detail.scrollIntoView({ behavior: 'smooth' });
  } catch (err) {
    document.getElementById('gmailDetailSubject').textContent = 'Hata';
    document.getElementById('gmailDetailBody').textContent = err.message;
  }
}

async function summarizeGmail() {
  if (!currentGmailMessage) return;
  const resultEl = document.getElementById('gmailAiResult');
  const contentEl = document.getElementById('gmailAiResultContent');
  resultEl.style.display = 'block';
  contentEl.innerHTML = '<p style="color:var(--text-muted)">AI ozetliyor...</p>';
  try {
    const data = await apiFetch('/api/tools/run/summarizer', { method: 'POST', body: {
      text: `Konu: ${currentGmailMessage.subject}\nKimden: ${currentGmailMessage.from}\n\n${currentGmailMessage.body || currentGmailMessage.snippet}`,
      length: 'kisa',
    }});
    contentEl.innerHTML = formatMarkdown(data.output);
    if (currentUser) { currentUser.credits -= (data.creditsUsed || 0); updateAuthUI(); }
  } catch (err) { contentEl.textContent = 'Hata: ' + err.message; }
}

async function replyGmail() {
  if (!currentGmailMessage) return;
  const resultEl = document.getElementById('gmailAiResult');
  const contentEl = document.getElementById('gmailAiResultContent');
  resultEl.style.display = 'block';
  contentEl.innerHTML = '<p style="color:var(--text-muted)">Yanit taslagi olusturuluyor...</p>';
  try {
    const data = await apiFetch('/api/tools/run/email-writer', { method: 'POST', body: {
      subject: 'Re: ' + (currentGmailMessage.subject || ''),
      recipient: currentGmailMessage.from,
      notes: `Bu e-postaya profesyonel bir yanit yaz. Orijinal e-posta:\n\n${currentGmailMessage.body || currentGmailMessage.snippet}`,
      tone: 'profesyonel',
    }});
    contentEl.innerHTML = formatMarkdown(data.output);
    if (currentUser) { currentUser.credits -= (data.creditsUsed || 0); updateAuthUI(); }
  } catch (err) { contentEl.textContent = 'Hata: ' + err.message; }
}

// ── Calendar ──────────────────────

async function loadCalendar() {
  const list = document.getElementById('calendarList');
  list.innerHTML = '<p style="padding:12px;color:var(--text-muted);font-size:13px">Yukleniyor...</p>';
  try {
    const data = await apiFetch('/api/google/calendar/events');
    if (!data.events.length) {
      list.innerHTML = '<p style="padding:12px;color:var(--text-muted);font-size:13px">Yaklasan etkinlik yok.</p>';
      return;
    }
    list.innerHTML = data.events.map(e => {
      const start = e.start ? new Date(e.start) : null;
      const timeStr = start ? start.toLocaleDateString('tr-TR', { weekday:'short', day:'numeric', month:'short' }) + ' ' + start.toLocaleTimeString('tr-TR', { hour:'2-digit', minute:'2-digit' }) : '';
      return `<div class="cal-item">
        <div class="cal-time">${timeStr}</div>
        <div class="cal-info">
          <div class="cal-title">${esc(e.summary)}</div>
          ${e.location ? `<div class="cal-desc">${esc(e.location)}</div>` : ''}
          ${e.attendees?.length ? `<div class="cal-desc">${e.attendees.length} katilimci</div>` : ''}
        </div>
      </div>`;
    }).join('');
  } catch (err) {
    list.innerHTML = `<p style="padding:12px;color:#f87171;font-size:13px">Hata: ${esc(err.message)}</p>`;
  }
}

// ── Drive ─────────────────────────

async function loadDrive() {
  const list = document.getElementById('driveList');
  list.innerHTML = '<p style="padding:12px;color:var(--text-muted);font-size:13px">Yukleniyor...</p>';
  try {
    const data = await apiFetch('/api/google/drive/files?pageSize=20');
    if (!data.files.length) {
      list.innerHTML = '<p style="padding:12px;color:var(--text-muted);font-size:13px">Dosya bulunamadi.</p>';
      return;
    }
    list.innerHTML = data.files.map(f => {
      const date = f.modifiedTime ? new Date(f.modifiedTime).toLocaleDateString('tr-TR') : '';
      const sizeStr = f.size ? formatFileSize(f.size) : '';
      return `<div class="drive-item" data-drive-id="${f.id}">
        <div class="drive-icon">${f.iconLink ? `<img src="${f.iconLink}" alt="">` : '&#128196;'}</div>
        <div class="drive-name">${esc(f.name)}</div>
        <div class="drive-meta">${sizeStr} ${date}</div>
      </div>`;
    }).join('');
    list.querySelectorAll('.drive-item').forEach(item => {
      item.addEventListener('click', () => openDriveFile(item.dataset.driveId));
    });
  } catch (err) {
    list.innerHTML = `<p style="padding:12px;color:#f87171;font-size:13px">Hata: ${esc(err.message)}</p>`;
  }
}

async function openDriveFile(id) {
  const detail = document.getElementById('driveDetail');
  detail.style.display = 'block';
  document.getElementById('driveDetailName').textContent = 'Yukleniyor...';
  document.getElementById('driveDetailContent').textContent = '';
  document.getElementById('driveAiResult').style.display = 'none';

  try {
    const data = await apiFetch(`/api/google/drive/files/${id}`);
    currentDriveFile = data.file;
    document.getElementById('driveDetailName').textContent = data.file.name;
    if (data.file.textContent) {
      document.getElementById('driveDetailContent').textContent = data.file.textContent;
      document.getElementById('driveSummarizeBtn').style.display = 'inline-block';
    } else {
      document.getElementById('driveDetailContent').innerHTML = `<p style="color:var(--text-muted)">Metin icerigi kullanilamiyor. ${data.file.webViewLink ? `<a href="${data.file.webViewLink}" target="_blank" style="color:var(--accent-strong)">Google Drive'da ac</a>` : ''}</p>`;
      document.getElementById('driveSummarizeBtn').style.display = 'none';
    }
    detail.scrollIntoView({ behavior: 'smooth' });
  } catch (err) {
    document.getElementById('driveDetailName').textContent = 'Hata';
    document.getElementById('driveDetailContent').textContent = err.message;
  }
}

async function summarizeDrive() {
  if (!currentDriveFile?.textContent) return;
  const resultEl = document.getElementById('driveAiResult');
  const contentEl = document.getElementById('driveAiResultContent');
  resultEl.style.display = 'block';
  contentEl.innerHTML = '<p style="color:var(--text-muted)">AI ozetliyor...</p>';
  try {
    const data = await apiFetch('/api/tools/run/summarizer', { method: 'POST', body: {
      text: `Dokuman: ${currentDriveFile.name}\n\n${currentDriveFile.textContent.substring(0, 10000)}`,
      length: 'orta',
    }});
    contentEl.innerHTML = formatMarkdown(data.output);
    if (currentUser) { currentUser.credits -= (data.creditsUsed || 0); updateAuthUI(); }
  } catch (err) { contentEl.textContent = 'Hata: ' + err.message; }
}

// ── Contacts ──────────────────────

async function loadContacts() {
  const list = document.getElementById('contactsList');
  list.innerHTML = '<p style="padding:12px;color:var(--text-muted);font-size:13px">Yukleniyor...</p>';
  try {
    const data = await apiFetch('/api/google/contacts?pageSize=50');
    if (!data.contacts.length) {
      list.innerHTML = '<p style="padding:12px;color:var(--text-muted);font-size:13px">Kisi bulunamadi.</p>';
      return;
    }
    list.innerHTML = data.contacts.map(c => {
      const initials = (c.name || '?').split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
      return `<div class="contact-item">
        <div class="contact-avatar">${c.photo ? `<img src="${c.photo}" alt="">` : initials}</div>
        <div class="contact-info">
          <div class="contact-name">${esc(c.name || '(Isimsiz)')}</div>
          <div class="contact-detail">${esc(c.email)}${c.phone ? ' · ' + esc(c.phone) : ''}${c.organization ? ' · ' + esc(c.organization) : ''}</div>
        </div>
        ${c.email ? `<div class="contact-actions"><button class="small-button" onclick="writeEmailToContact('${esc(c.name)}', '${esc(c.email)}')">E-posta Yaz</button></div>` : ''}
      </div>`;
    }).join('');
  } catch (err) {
    list.innerHTML = `<p style="padding:12px;color:#f87171;font-size:13px">Hata: ${esc(err.message)}</p>`;
  }
}

function writeEmailToContact(name, email) {
  document.querySelector('.tab-button[data-tab="tools"]').click();
  setTimeout(() => {
    openToolModal('email-writer');
    setTimeout(() => {
      const recipientField = document.querySelector('#toolFormArea input[name="recipient"]');
      if (recipientField) recipientField.value = `${name} <${email}>`;
    }, 100);
  }, 100);
}

// ── Tasks ─────────────────────────

async function loadTaskLists() {
  const container = document.getElementById('taskLists');
  container.innerHTML = '<p style="padding:4px;color:var(--text-muted);font-size:13px">Yukleniyor...</p>';
  try {
    const data = await apiFetch('/api/google/tasks/lists');
    if (!data.lists.length) {
      container.innerHTML = '<p style="padding:4px;color:var(--text-muted);font-size:13px">Gorev listesi bulunamadi.</p>';
      return;
    }
    container.innerHTML = data.lists.map((l, i) =>
      `<span class="task-list-item ${i === 0 ? 'active' : ''}" data-task-list="${l.id}">${esc(l.title)}</span>`
    ).join('');
    container.querySelectorAll('.task-list-item').forEach(item => {
      item.addEventListener('click', () => {
        container.querySelectorAll('.task-list-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        loadTasks(item.dataset.taskList);
      });
    });
    if (data.lists.length > 0) loadTasks(data.lists[0].id);
  } catch (err) {
    container.innerHTML = `<p style="padding:4px;color:#f87171;font-size:13px">Hata: ${esc(err.message)}</p>`;
  }
}

async function loadTasks(listId) {
  activeTaskList = listId;
  const container = document.getElementById('taskItems');
  container.innerHTML = '<p style="padding:4px;color:var(--text-muted);font-size:13px">Yukleniyor...</p>';
  try {
    const data = await apiFetch(`/api/google/tasks/lists/${listId}/tasks`);
    if (!data.tasks.length) {
      container.innerHTML = '<p style="padding:4px;color:var(--text-muted);font-size:13px">Gorev bulunamadi.</p>';
      return;
    }
    container.innerHTML = data.tasks.map(t => {
      const done = t.status === 'completed';
      const dueStr = t.due ? new Date(t.due).toLocaleDateString('tr-TR') : '';
      return `<div class="task-item ${done ? 'completed' : ''}">
        <div class="task-check">${done ? '&#9745;' : '&#9744;'}</div>
        <div class="task-title">${esc(t.title)}${t.notes ? `<div style="font-size:11px;color:var(--text-muted);margin-top:2px">${esc(t.notes)}</div>` : ''}</div>
        ${dueStr ? `<div class="task-due">${dueStr}</div>` : ''}
      </div>`;
    }).join('');
  } catch (err) {
    container.innerHTML = `<p style="padding:4px;color:#f87171;font-size:13px">Hata: ${esc(err.message)}</p>`;
  }
}

function setupGoogleSubTabs() {
  document.querySelectorAll('.google-sub-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.google-sub-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.google-sub-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('gsub' + capitalize(tab.dataset.gsub));
      if (panel) panel.classList.add('active');

      const sub = tab.dataset.gsub;
      if (sub === 'gmail') loadGmail();
      else if (sub === 'calendar') loadCalendar();
      else if (sub === 'drive') loadDrive();
      else if (sub === 'contacts') loadContacts();
      else if (sub === 'tasks') loadTaskLists();
    });
  });
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function esc(s) { if (!s) return ''; const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

// ─── TOGGLE HANDLERS ────────────────────────────────────────
function handleCourseToggle(id) {
  const s = getState();
  const course = COURSES.find(c => c.id === id);
  if (!course) return;
  const already = s.completedCourses.includes(id);
  if (already) {
    appState.completedCourses = s.completedCourses.filter(c => c !== id);
    appState.points = Math.max(0, s.points - course.points);
  } else {
    appState.completedCourses = [...s.completedCourses, id];
    appState.points = s.points + course.points;
    appState.recentCompletions = [{ type: 'course', id, title: course.title, points: course.points, at: Date.now() }, ...s.recentCompletions];
    showToast(`"${course.title}" tamamlandı! +${course.points} puan`, 'success');
    trackEvent('course_complete', { course_id: id, course_title: course.title, points: course.points, total_completed: appState.completedCourses.length });
    trackEvent('lesson_completed', {
      course_id: id,
      course_title: course.title,
      points: course.points,
      mandatory: !!course.mandatory,
      role: course.role,
    });
    if (token) {
      apiFetch('/api/credits/earn', { method: 'POST', body: { reason: `Kurs tamamlama: ${course.title}`, amount: 5 } }).then(() => checkAuth()).catch(() => {});
    }
  }
  if (currentUser) {
    currentUser.completedCourses = appState.completedCourses;
    currentUser.points = appState.points;
  }
  saveLocalState(appState);
  syncProgress();
  refreshUI();
}

function handleChallengeToggle(id) {
  const s = getState();
  const ch = CHALLENGES.find(c => c.id === id);
  if (!ch) return;
  const already = s.completedChallenges.includes(id);
  if (already) {
    appState.completedChallenges = s.completedChallenges.filter(c => c !== id);
    appState.points = Math.max(0, s.points - ch.points);
  } else {
    appState.completedChallenges = [...s.completedChallenges, id];
    appState.points = s.points + ch.points;
    appState.recentCompletions = [{ type: 'challenge', id, title: ch.title, points: ch.points, at: Date.now() }, ...s.recentCompletions];
    showToast(`"${ch.title}" görevi tamamlandı! +${ch.points} puan`, 'success');
    trackEvent('challenge_complete', { challenge_id: id, challenge_title: ch.title, points: ch.points });
    if (token) {
      apiFetch('/api/credits/earn', { method: 'POST', body: { reason: `Gorev tamamlama: ${ch.title}`, amount: 3 } }).then(() => checkAuth()).catch(() => {});
    }
  }
  if (currentUser) {
    currentUser.completedChallenges = appState.completedChallenges;
    currentUser.points = appState.points;
  }
  saveLocalState(appState);
  syncProgress();
  refreshUI();
}

// ─── UTILITIES ──────────────────────────────────────────────
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Panoya kopyalandı!', 'success', 2000);
  }).catch(() => {
    showToast('Kopyalama başarısız oldu.', 'error', 2000);
  });
}

function bindSuggestionChips() {
  document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.getElementById('chatInput').value = chip.dataset.msg;
      sendChatMessage();
    });
  });
}

// ─── EVENT SETUP ────────────────────────────────────────────
function setupEventHandlers() {
  // Tab navigation
  const tabLabels = { dashboard:'Pano', courses:'Eğitimler', chat:'AI Asistan', tools:'AI Araçları', marketplace:'Pazaryeri', library:'Kütüphane', exam:'Sınav', challenges:'Görevler', googledata:'Google', leaderboard:'Sıralama', profile:'Profil' };
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab-button').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      document.getElementById(`${target}Tab`).classList.add('active');
      document.title = `${tabLabels[target] || target} – AI Academy`;
      trackPageView(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (target === 'chat') {
        loadConversations();
        if (!hasTrackedChatStart) {
          hasTrackedChatStart = true;
          trackEvent('chat_started', { source: 'tab_click' });
        }
      }
      if (target === 'marketplace') loadMarketplace();
      if (target === 'leaderboard') loadLeaderboard();
      if (target === 'googledata') { checkGoogleStatus(); }
    });
  });

  // Hero nav buttons
  document.querySelectorAll('[data-nav-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.navTarget;
      const tb = document.querySelector(`.tab-button[data-tab="${t}"]`);
      if (tb) tb.click();
    });
  });

  // Role change
  document.getElementById('roleSelect').addEventListener('change', (e) => {
    appState.role = e.target.value;
    if (currentUser) { currentUser.role = e.target.value; apiFetch('/api/auth/me', { method: 'PUT', body: { role: e.target.value } }).catch(() => {}); }
    saveLocalState(appState);
    refreshUI();
  });

  // Reset progress
  document.getElementById('resetProgressBtn').addEventListener('click', () => {
    if (!confirm('Tüm ilerlemenizi sıfırlamak istediğinizden emin misiniz? Bu işlem geri alınamaz.')) return;
    appState = { role: appState.role, completedCourses: [], completedChallenges: [], recentCompletions: [], points: 0, quizResults: {} };
    if (currentUser) { currentUser.completedCourses = []; currentUser.completedChallenges = []; currentUser.points = 0; currentUser.quizResults = {}; }
    saveLocalState(appState);
    syncProgress();
    refreshUI();
    showToast('İlerleme sıfırlandı.', 'warning');
  });

  // Course/type filters
  document.getElementById('courseRoleFilter').addEventListener('change', () => { renderCourses(); attachDynamicHandlers(); });
  document.getElementById('courseTypeFilter').addEventListener('change', () => { renderCourses(); attachDynamicHandlers(); });

  // Exam
  document.getElementById('examLevelSelect').addEventListener('change', () => {
    renderExamSummary();
    document.getElementById('quizContainer').innerHTML = '<p class="exam-hint">Sinavi baslatin.</p>';
    document.getElementById('submitExamBtn').disabled = true;
    document.getElementById('quizResultMessage').textContent = '';
  });
  document.getElementById('startExamBtn').addEventListener('click', () => renderQuiz(document.getElementById('examLevelSelect').value));
  document.getElementById('submitExamBtn').addEventListener('click', evaluateQuiz);

  // Certificate buttons
  document.getElementById('downloadCertBtn').addEventListener('click', async () => {
    if (!token) return;
    const certs = await apiFetch('/api/certificates/my').catch(() => ({ certificates: [] }));
    if (certs.certificates.length > 0) window.open(`/api/certificates/pdf/${certs.certificates[0].certificate_code}`, '_blank');
  });
  document.getElementById('linkedinShareBtn').addEventListener('click', () => {
    trackEvent('certificate_share_linkedin');
    window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.origin), '_blank');
  });

  // Auth
  document.getElementById('loginBtn').addEventListener('click', showAuthModal);
  document.getElementById('authForm').addEventListener('submit', handleAuth);
  document.getElementById('authSwitchLink').addEventListener('click', (e) => { e.preventDefault(); setAuthMode(authMode === 'login' ? 'register' : 'login'); });
  document.getElementById('logoutBtn').addEventListener('click', logout);
  document.getElementById('planContactForm').addEventListener('submit', handlePlanContactSubmit);
  document.getElementById('proSubscribeBtn')?.addEventListener('click', startProCheckout);
  document.getElementById('onboardingDismissBtn')?.addEventListener('click', () => {
    appState.onboardingDismissed = true;
    saveLocalState(appState);
    const card = document.getElementById('onboardingCard');
    if (card) card.style.display = 'none';
  });
  const onboardingCheckboxes = [
    { id: 'obStepChat', key: 'chat' },
    { id: 'obStepTool', key: 'tool' },
    { id: 'obStepCourse', key: 'course' },
  ];
  onboardingCheckboxes.forEach(({ id, key }) => {
    const cb = document.getElementById(id);
    if (!cb) return;
    cb.addEventListener('change', (e) => {
      // Kullanıcının manuel olarak uncheck yapmasını engelle
      if (!e.target.checked) {
        e.target.checked = !!getOnboardingState()[key];
        return;
      }
      completeOnboardingStep(key);
    });
  });

  // User dropdown menu
  document.getElementById('userMenuBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleUserDropdown();
  });
  document.getElementById('dropdownLogoutBtn').addEventListener('click', logout);
  document.querySelectorAll('[data-dropdown-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.dropdownAction;
      closeUserDropdown();
      if (action === 'profile') document.querySelector('.tab-button[data-tab="profile"]').click();
      if (action === 'settings') {
        document.querySelector('.tab-button[data-tab="profile"]').click();
        setTimeout(() => document.getElementById('pricingCard').scrollIntoView({ behavior: 'smooth' }), 100);
      }
    });
  });
  document.addEventListener('click', (e) => {
    const wrapper = document.querySelector('.user-dropdown-wrapper');
    if (wrapper && !wrapper.contains(e.target)) closeUserDropdown();
  });

  // Password toggle
  document.getElementById('togglePasswordBtn').addEventListener('click', () => {
    const pwInput = document.getElementById('authPassword');
    const isPassword = pwInput.type === 'password';
    pwInput.type = isPassword ? 'text' : 'password';
    document.getElementById('togglePasswordBtn').innerHTML = isPassword ? '&#128064;' : '&#128065;';
    document.getElementById('togglePasswordBtn').setAttribute('aria-label', isPassword ? 'Şifreyi gizle' : 'Şifreyi göster');
  });

  // Password strength (only for register)
  document.getElementById('authPassword').addEventListener('input', () => {
    if (authMode !== 'register') return;
    const pw = document.getElementById('authPassword').value;
    const strengthEl = document.getElementById('passwordStrength');
    const fill = document.getElementById('passwordStrengthFill');
    const text = document.getElementById('passwordStrengthText');
    if (!pw) { strengthEl.style.display = 'none'; return; }
    strengthEl.style.display = 'block';
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    const levels = [
      { width: '20%', color: '#ef4444', label: 'Çok zayıf' },
      { width: '40%', color: '#f97316', label: 'Zayıf' },
      { width: '60%', color: '#f59e0b', label: 'Orta' },
      { width: '80%', color: '#22c55e', label: 'Güçlü' },
      { width: '100%', color: '#16a34a', label: 'Çok güçlü' },
    ];
    const level = levels[Math.min(score, 4)];
    fill.style.width = level.width;
    fill.style.background = level.color;
    text.textContent = level.label;
    text.style.color = level.color;
  });

  // Mobile chat sidebar toggle
  document.getElementById('mobileChatSidebarToggle')?.addEventListener('click', () => {
    const sidebar = document.getElementById('chatSidebar');
    sidebar.classList.toggle('mobile-open');
  });
  document.getElementById('chatSidebar')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('chatSidebar')) {
      document.getElementById('chatSidebar').classList.remove('mobile-open');
    }
  });

  // Chat
  document.getElementById('sendChatBtn').addEventListener('click', sendChatMessage);
  document.getElementById('chatInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
  });
  document.getElementById('chatInput').addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
  });
  document.getElementById('newChatBtn').addEventListener('click', () => { currentConvId = null; resetChatUI(); });
  document.getElementById('voiceBtn').addEventListener('click', startVoice);
  document.getElementById('conversationList').addEventListener('click', (e) => {
    if (e.target.dataset.convDel) { e.stopPropagation(); deleteConversation(e.target.dataset.convDel); }
  });

  // Tools
  document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', () => openToolModal(card.dataset.tool));
  });
  document.getElementById('copyToolOutput').addEventListener('click', () => {
    copyToClipboard(document.getElementById('toolOutputContent').textContent);
  });

  // Marketplace
  document.getElementById('mpCategoryFilter').addEventListener('change', loadMarketplace);
  document.getElementById('mpSortFilter').addEventListener('change', loadMarketplace);
  document.getElementById('createPromptBtn').addEventListener('click', showCreatePromptModal);

  // Leaderboard
  document.getElementById('lbPeriod').addEventListener('change', loadLeaderboard);

  // Plan upgrade
  document.getElementById('upgradePlanBtn').addEventListener('click', () => {
    openPlanContactModal('pro');
  });
  document.querySelectorAll('[data-plan]').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.dataset.plan;
      if (plan === 'free') return;
      if (plan === currentUser?.plan) return;
      trackEvent('plan_upgrade_click', { target_plan: plan, current_plan: currentUser?.plan || 'free' });
      openPlanContactModal(plan);
    });
  });

  // Admin
  document.getElementById('adminLink').addEventListener('click', (e) => { e.preventDefault(); openAdminPanel(); });
  document.querySelectorAll('.admin-tab').forEach(t => {
    t.addEventListener('click', () => loadAdminTab(t.dataset.adminTab));
  });

  // News
  document.getElementById('refreshNewsBtn')?.addEventListener('click', () => {
    loadNews(true);
    showToast('Haberler güncelleniyor...', 'info', 2000);
  });

  // Google
  document.getElementById('googleLoginBtn').addEventListener('click', loginWithGoogle);
  setupGoogleSubTabs();
  document.getElementById('gmailSearchBtn')?.addEventListener('click', () => loadGmail());
  document.getElementById('gmailRefreshBtn')?.addEventListener('click', () => loadGmail());
  document.getElementById('gmailSummarizeBtn')?.addEventListener('click', summarizeGmail);
  document.getElementById('gmailReplyBtn')?.addEventListener('click', replyGmail);
  document.getElementById('gmailCloseBtn')?.addEventListener('click', () => {
    document.getElementById('gmailDetail').style.display = 'none';
    currentGmailMessage = null;
  });
  document.getElementById('calendarRefreshBtn')?.addEventListener('click', loadCalendar);
  document.getElementById('driveRefreshBtn')?.addEventListener('click', loadDrive);
  document.getElementById('driveSummarizeBtn')?.addEventListener('click', summarizeDrive);
  document.getElementById('driveCloseBtn')?.addEventListener('click', () => {
    document.getElementById('driveDetail').style.display = 'none';
    currentDriveFile = null;
  });
  document.getElementById('contactsRefreshBtn')?.addEventListener('click', loadContacts);
  document.getElementById('tasksRefreshBtn')?.addEventListener('click', loadTaskLists);
  document.getElementById('gmailSearch')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') loadGmail();
  });

  // Modals close
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(btn.dataset.closeModal);
      modal.style.display = 'none';
      if (modal.id === 'authModal') hideAuthModal();
    });
  });
  document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', (e) => {
      if (e.target === m) {
        m.style.display = 'none';
        if (m.id === 'authModal') hideAuthModal();
      }
    });
  });

  // Global keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close dropdown
      closeUserDropdown();
      // Close mobile sidebar
      document.getElementById('chatSidebar')?.classList.remove('mobile-open');
      // Close modals (topmost first)
      const openModals = document.querySelectorAll('.modal[style*="flex"]');
      if (openModals.length > 0) {
        const lastModal = openModals[openModals.length - 1];
        lastModal.style.display = 'none';
        if (lastModal.id === 'authModal') hideAuthModal();
      }
    }
  });

  // Focus trap for modals
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusable = modal.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  });

  bindSuggestionChips();
}

function attachDynamicHandlers() {
  document.querySelectorAll('[data-course-id]').forEach(btn => {
    btn.onclick = () => handleCourseToggle(btn.getAttribute('data-course-id'));
  });
  document.querySelectorAll('[data-challenge-id]').forEach(btn => {
    btn.onclick = () => handleChallengeToggle(btn.getAttribute('data-challenge-id'));
  });
   document.querySelectorAll('[data-course-open-id]').forEach(link => {
    link.addEventListener('click', () => {
      const id = link.getAttribute('data-course-open-id');
      const course = COURSES.find(c => c.id === id);
      if (!course) return;
      trackEvent('lesson_started', {
        course_id: id,
        course_title: course.title,
        mandatory: !!course.mandatory,
        role: course.role,
      });
      completeOnboardingStep('course');
    });
  });
}

function refreshUI() {
  renderRoleSelector();
  renderOverallStats();
  renderOnboardingCard();
  renderDashboardLists();
  renderCourses();
  renderChallenges();
  renderProfile();
  renderExamSummary();
  renderLibrary();
  attachDynamicHandlers();
  updateAuthUI();
  if (token) loadROI();
  loadNews();
}

async function init() {
  handleGoogleTokenFromURL();
  setupEventHandlers();
  await checkAuth();
  await handleBillingFromURL();
  refreshUI();
  initVoice();
  if (token) checkGoogleStatus();
}

window.addEventListener('DOMContentLoaded', init);
