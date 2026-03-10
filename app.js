const STORAGE_KEY = 'aiAcademyPortalState_v2';

const COURSES = [
  // Zorunlu temel modüller (herkes)
  {
    id: 'c-ai-fluency',
    title: 'AI Fluency / Yapay Zekâ Okuryazarlığı',
    role: 'general',
    mandatory: true,
    duration: '60 dk',
    level: 'Başlangıç',
    points: 50,
    provider: 'Kurum İçi İçerik',
    link: 'docs/viewer.html?doc=courses/ai-fluency.md',
  },
  {
    id: 'c-claude-101',
    title: 'Claude 101: Temel Kullanım',
    role: 'general',
    mandatory: true,
    duration: '60 dk',
    level: 'Başlangıç',
    points: 60,
    provider: 'Kurum İçi İçerik',
    link: 'docs/viewer.html?doc=courses/claude-101.md',
  },
  {
    id: 'c-ai-ethics',
    title: 'AI Etiği ve Sorumlu Kullanım',
    role: 'general',
    mandatory: true,
    duration: '60 dk',
    level: 'Başlangıç / Orta',
    points: 55,
    provider: 'Kurum İçi İçerik',
    link: 'docs/viewer.html?doc=courses/ai-ethics.md',
  },
  {
    id: 'c-data-privacy',
    title: 'Veri Gizliliği ve AI Güvenliği',
    role: 'general',
    mandatory: true,
    duration: '50 dk',
    level: 'Başlangıç / Orta',
    points: 55,
    provider: 'Kurum İçi İçerik',
    link: 'docs/viewer.html?doc=courses/data-privacy.md',
  },

  // İleri düzey – herkes
  {
    id: 'c-advanced-prompting',
    title: 'İleri Prompt Teknikleri',
    role: 'general',
    mandatory: false,
    duration: '75 dk',
    level: 'Orta',
    points: 50,
    provider: 'Kurum İçi İçerik',
    link: 'docs/viewer.html?doc=courses/advanced-prompting.md',
  },

  // Ofis / İş birimleri
  {
    id: 'c-claude-for-work',
    title: 'Claude for Work: Doküman, E-posta ve Raporlama',
    role: 'business',
    mandatory: false,
    duration: '75 dk',
    level: 'Orta',
    points: 40,
    provider: 'Kurum İçi İçerik',
    link: 'docs/viewer.html?doc=courses/claude-for-work.md',
  },
  {
    id: 'c-meeting-notes',
    title: 'Toplantı Notlarından Aksiyon Listesi Üretimi',
    role: 'business',
    mandatory: false,
    duration: '45 dk',
    level: 'Orta',
    points: 30,
    provider: 'Kurum İçi İçerik',
    link: 'docs/viewer.html?doc=courses/meeting-notes.md',
  },

  // Teknik ekipler
  {
    id: 'c-claude-code',
    title: 'Claude Code in Action',
    role: 'technical',
    mandatory: false,
    duration: '90 dk',
    level: 'Orta',
    points: 60,
    provider: 'Kurum İçi İçerik',
    link: 'docs/viewer.html?doc=courses/claude-code.md',
  },
  {
    id: 'c-api-integration',
    title: 'Claude API Entegrasyonu ile Basit Uygulama',
    role: 'technical',
    mandatory: false,
    duration: '90 dk',
    level: 'Orta / İleri',
    points: 80,
    provider: 'Kurum İçi İçerik',
    link: 'docs/viewer.html?doc=courses/api-integration.md',
  },
];

const CHALLENGES = [
  {
    id: 'ch-weekly-report',
    title: 'Haftalık Raporu Claude ile Yeniden Yaz',
    description:
      'Mevcut bir haftalık rapor metnini Claude ile daha net, kısa ve etkili hale getir. Öncesi / sonrası örneklerini kaydet.',
    suggestedRole: 'business',
    points: 40,
  },
  {
    id: 'ch-meeting-summary',
    title: 'Toplantı Notlarını Özetle',
    description:
      'Son yaptığın toplantının ham notlarını Claude’a vererek, özet ve aksiyon listesi oluştur.',
    suggestedRole: 'general',
    points: 30,
  },
  {
    id: 'ch-refactor-function',
    title: 'Bir Fonksiyonu Claude Code ile Refactor Et',
    description:
      'Karmaşık bir fonksiyonu seç, Claude Code’dan okunabilirlik ve test ekleme konusunda yardım al.',
    suggestedRole: 'technical',
    points: 50,
  },
  {
    id: 'ch-prompt-library',
    title: 'Prompt Şablon Kütüphanesi Oluştur',
    description:
      'Sık yaptığın 3 iş görevi için CRISP modeline uygun prompt şablonları yaz ve ekibinle paylaş.',
    suggestedRole: 'general',
    points: 40,
  },
  {
    id: 'ch-hallucination-hunt',
    title: 'AI Halüsinasyonu Tespit Et',
    description:
      'Claude\'a niş bir konu sor ve yanıttaki hatalı bilgileri tespit et. Bulgularını raporla.',
    suggestedRole: 'general',
    points: 35,
  },
  {
    id: 'ch-anonymize-data',
    title: 'Bir Dokümanı Anonimleştir',
    description:
      'Gerçek bir iş dokümanını alıp kişisel verileri anonimleştirdikten sonra Claude ile özetle.',
    suggestedRole: 'business',
    points: 35,
  },
  {
    id: 'ch-department-guide',
    title: 'Departmanın İçin AI Kullanım Rehberi Yaz',
    description:
      'Kendi departmanın için 3 AI kullanım senaryosu ve dikkat noktalarını içeren kısa bir rehber oluştur.',
    suggestedRole: 'business',
    points: 45,
  },
  {
    id: 'ch-presentation-ai',
    title: 'AI ile Sunum İçeriği Hazırla',
    description:
      'Claude kullanarak 8 slaytlık sunum içeriği (başlık, ana mesajlar, konuşmacı notları) hazırla.',
    suggestedRole: 'general',
    points: 40,
  },
  {
    id: 'ch-code-review-ai',
    title: 'AI ile Kod İnceleme Yap',
    description:
      'Son merge edilen bir PR\'ı Claude\'a incelet. Güvenlik, performans ve okunabilirlik bulgularını raporla.',
    suggestedRole: 'technical',
    points: 45,
  },
];

const BADGES = [
  {
    id: 'b-beginner',
    name: 'AI Beginner',
    minPoints: 50,
    description: 'İlk adımları atan AI kullanıcıları.',
  },
  {
    id: 'b-power',
    name: 'AI Power User',
    minPoints: 150,
    description: 'Düzenli olarak AI’ı iş akışına entegre edenler.',
  },
  {
    id: 'b-champion',
    name: 'AI Champion',
    minPoints: 300,
    description: 'Takımında AI kullanımını yaygınlaştıran elçiler.',
  },
];

const LIBRARY_DOCS = [
  {
    id: 'doc-ai-what',
    title: 'AI Nedir? Temel Kavramlar ve Türler',
    category: 'Temeller',
    level: 'Başlangıç',
    roles: ['general', 'business', 'technical'],
    file: 'docs/viewer.html?doc=00_ai_nedir.md',
    readingTime: '15 dk',
  },
  {
    id: 'doc-prompt-intro',
    title: 'Prompt Mühendisliğine Giriş',
    category: 'Pratik Yöntemler',
    level: 'Başlangıç / Orta',
    roles: ['general', 'business', 'technical'],
    file: 'docs/viewer.html?doc=40_prompt_muhendisligine_giris.md',
    readingTime: '20 dk',
  },
  {
    id: 'doc-evaluating-ai',
    title: 'AI Çıktılarını Değerlendirme ve Doğrulama',
    category: 'Pratik Yöntemler',
    level: 'Başlangıç / Orta',
    roles: ['general', 'business', 'technical'],
    file: 'docs/viewer.html?doc=50_ai_ciktilarini_degerlendirme.md',
    readingTime: '15 dk',
  },
  {
    id: 'doc-ai-tools',
    title: 'AI Araçları Ekosistemi',
    category: 'Genel Kültür',
    level: 'Başlangıç',
    roles: ['general', 'business', 'technical'],
    file: 'docs/viewer.html?doc=60_ai_araclari_ekosistemi.md',
    readingTime: '15 dk',
  },
  {
    id: 'doc-department-scenarios',
    title: 'Departman Bazlı AI Kullanım Senaryoları',
    category: 'Pratik Yöntemler',
    level: 'Orta',
    roles: ['general', 'business', 'technical'],
    file: 'docs/viewer.html?doc=70_departman_bazli_senaryolar.md',
    readingTime: '20 dk',
  },
  {
    id: 'doc-kvkk-ai',
    title: 'KVKK ve AI: Bilmeniz Gerekenler',
    category: 'Güvenlik ve Uyumluluk',
    level: 'Başlangıç / Orta',
    roles: ['general', 'business', 'technical'],
    file: 'docs/viewer.html?doc=80_kvkk_ve_ai.md',
    readingTime: '15 dk',
  },
];

const QUIZZES = {
  level1: {
    id: 'level1',
    name: 'Seviye 1 – Temel',
    passScore: 70,
    questions: [
      {
        text: 'Yapay zekâ (AI) en basit hâliyle neyi amaçlar?',
        options: [
          'Bilgisayarların sadece dört işlem yapmasını sağlamak',
          'Bilgisayarların insan benzeri öğrenme ve karar verme yetenekleri kazanmasını sağlamak',
          'Bilgisayarların internete daha hızlı bağlanmasını sağlamak',
          'Sadece oyun oynayan programlar yazmak',
        ],
        correctIndex: 1,
      },
      {
        text: 'Dar AI (narrow AI) hangi tanıma daha uygundur?',
        options: [
          'Her türlü problemi insan gibi çözebilen sistemler',
          'Tek bir alanda veya sınırlı görev için iyi olan sistemler',
          'Hiç veri kullanmadan çalışan sistemler',
          'Donanım gerektirmeyen yazılımlar',
        ],
        correctIndex: 1,
      },
      {
        text: 'Claude ve ChatGPT gibi araçlar hangi AI türünün örneğidir?',
        options: [
          'Sadece sabit kural tabanlı sistemler',
          'Üretimsel AI (generative AI)',
          'Hiç veri kullanmayan yapay zekâ',
          'Sadece sensör verisiyle çalışan AI',
        ],
        correctIndex: 1,
      },
      {
        text: 'AI çıktılarıyla ilgili aşağıdakilerden hangisi doğrudur?',
        options: [
          'Her zaman yüzde yüz doğrudur, kontrol etmeye gerek yoktur',
          'Zaman zaman hata yapabilir, mutlaka insan tarafından kontrol edilmelidir',
          'Sadece rakamlar konusunda yanılır, metinlerde hata yapmaz',
          'Sadece İngilizce içerikte çalışır',
        ],
        correctIndex: 1,
      },
      {
        text: 'Kurumsal AI kullanımında temel ilkelerden biri hangisidir?',
        options: [
          'Gizli verileri mutlaka modele göndermek',
          'Hiçbir çıktıyı kontrol etmeden paylaşmak',
          'İnsan sorumluluğunu korumak ve çıktıları doğrulamak',
          'Tüm kararları AI’a bırakmak',
        ],
        correctIndex: 2,
      },
      {
        text: 'AI modelleri önyargılı (biased) sonuçlar üretebilir. Bu önyargının ana kaynağı nedir?',
        options: [
          'Bilgisayarın işlemci hızı',
          'Eğitim verilerindeki mevcut önyargılar ve dengesizlikler',
          'İnternet bağlantı kalitesi',
          'Kullanıcının yaşı',
        ],
        correctIndex: 1,
      },
      {
        text: 'AI ile ürettiğiniz bir çıktıyı başkalarıyla paylaşırken ne yapmalısınız?',
        options: [
          'AI ürettiğini gizlemek',
          'Çıktının AI destekli olduğunu belirtmek ve doğruluğunu kontrol etmek',
          'Sadece yöneticiye söylemek',
          'Hiçbir şey yapmaya gerek yoktur',
        ],
        correctIndex: 1,
      },
      {
        text: 'KVKK kapsamında aşağıdakilerden hangisi kişisel veridir?',
        options: [
          'Hava durumu tahmini',
          'Şirketin genel web sitesi içeriği',
          'Bir çalışanın ad-soyad ve TC kimlik numarası',
          'Sektör istatistikleri',
        ],
        correctIndex: 2,
      },
    ],
  },
  level2: {
    id: 'level2',
    name: 'Seviye 2 – İş / Ofis',
    passScore: 70,
    questions: [
      {
        text: 'Ofis ortamında AI’dan en çok hangi tip iş için faydalanılır?',
        options: [
          'Fiziksel dosya taşımak',
          'Metinleri özetlemek, rapor ve e-posta taslağı üretmek',
          'Fotokopi makinesini çalıştırmak',
          'Kablo düzenlemek',
        ],
        correctIndex: 1,
      },
      {
        text: 'Toplantı notlarını AI ile özetlerken iyi bir uygulama hangisidir?',
        options: [
          'Tüm kişisel ve gizli bilgileri olduğu gibi paylaşmak',
          'Notları temizleyip, kişisel verileri mümkün olduğunca maskelemek',
          'Sadece duygusal ifadeleri göndermek',
          'Hiç not paylaşmadan özet istemek',
        ],
        correctIndex: 1,
      },
      {
        text: 'AI ile hazırlanan bir raporu yönetime sunmadan önce ne yapılmalıdır?',
        options: [
          'Olduğu gibi göndermek',
          'Sadece başlığı değiştirmek',
          'İçeriği dikkatle okuyup, rakam ve iddiaları kontrol etmek',
          'Rengi değiştirmek',
        ],
        correctIndex: 2,
      },
      {
        text: 'İyi bir ofis / iş prompt’unda aşağıdakilerden hangisi mutlaka olmalıdır?',
        options: [
          'Görev ve beklenen çıktının mümkün olduğunca net tanımı',
          'Sadece tek kelimelik komutlar',
          'Rasgele emojiler',
          'Sadece “yap” demek',
        ],
        correctIndex: 0,
      },
      {
        text: 'AI destekli bir iş akışını ekiple paylaşırken en önemli nokta nedir?',
        options: [
          'Kimsenin nasıl çalıştığını bilmemesi',
          'Şeffaf olmak ve sınırlarını / risklerini açıklamak',
          'Sadece yöneticiye anlatmak',
          'Hiç dokümante etmemek',
        ],
        correctIndex: 1,
      },
      {
        text: 'Müşteri verilerini içeren bir dokümanı AI ile özetlemek istiyorsunuz. İlk adım ne olmalıdır?',
        options: [
          'Doğrudan AI\'a yapıştırıp özetle demek',
          'Kişisel verileri anonimleştirmek veya çıkarmak',
          'Dokümanı olduğu gibi e-posta ile göndermek',
          'Hiçbir şey yapmadan özetlemeye başlamak',
        ],
        correctIndex: 1,
      },
      {
        text: 'AI\'ın "halüsinasyon" yapması ne anlama gelir?',
        options: [
          'AI\'ın çok yavaş çalışması',
          'AI\'ın güvenle yanlış veya uydurma bilgi üretmesi',
          'AI\'ın sadece görsel içerik üretmesi',
          'AI\'ın internet bağlantısını kaybetmesi',
        ],
        correctIndex: 1,
      },
      {
        text: 'Veri sınıflandırmasında "Çok Gizli (Kırmızı)" seviyedeki veriler için doğru olan nedir?',
        options: [
          'Dikkatli kullanılabilir',
          'Anonimleştirilerek gönderilebilir',
          'AI ile kesinlikle paylaşılmamalıdır',
          'Sadece hafta sonları paylaşılabilir',
        ],
        correctIndex: 2,
      },
    ],
  },
  level3: {
    id: 'level3',
    name: 'Seviye 3 – Teknik',
    passScore: 70,
    questions: [
      {
        text: 'Büyük dil modelleri (LLM) temelde hangi görevi yaparak çalışır?',
        options: [
          'Sabit kuralları çalıştırır',
          'Bir sonraki kelimeyi olasılıksal olarak tahmin eder',
          'Veritabanı indeksler',
          'Dosya sistemi yönetir',
        ],
        correctIndex: 1,
      },
      {
        text: 'Kod üretirken AI kullanımı için iyi bir uygulama hangisidir?',
        options: [
          'Üretilen kodu hiç incelemeden prod’a almak',
          'Kodun mantığını anlayıp, test yazarak doğrulamak',
          'Sadece yorum satırlarını kullanmak',
          'Sürüm kontrolünü bırakmak',
        ],
        correctIndex: 1,
      },
      {
        text: 'Kurumsal bir uygulamada AI API entegrasyonu yaparken ilk düşünülmesi gereken konu nedir?',
        options: [
          'Önce logoyu tasarlamak',
          'Veri güvenliği, gizlilik ve yetkilendirme',
          'Rastgele bir model seçmek',
          'Sadece hız',
        ],
        correctIndex: 1,
      },
      {
        text: 'Prompt mühendisliği açısından, teknik bir görevi tarif ederken ne yapılmalıdır?',
        options: [
          'Dil, teknoloji, kısıtlar ve beklenen çıktı formatını net tanımlamak',
          'Sadece “şu kodu düzelt” demek',
          'Her şeyi tek satırda yazmak',
          'Sadece hata mesajını göndermek',
        ],
        correctIndex: 0,
      },
      {
        text: 'Model çıktısını unit test’lerle doğrulamak neden önemlidir?',
        options: [
          'Testler gereksizdir, önemli olan hızdır',
          'Model asla hata yapmaz',
          'Üretilen mantığın beklenen davranışı karşıladığını otomatik kontrol etmemizi sağlar',
          'Sadece dokümantasyonu uzatır',
        ],
        correctIndex: 2,
      },
      {
        text: 'AI API entegrasyonunda API anahtarı nerede saklanmalıdır?',
        options: [
          'Kaynak kodun içinde, kolayca erişilebilir şekilde',
          'Ortam değişkenlerinde (environment variables) veya güvenli bir anahtar yöneticisinde',
          'Tarayıcı tarafı (client-side) JavaScript kodunda',
          'Paylaşılan bir belge dosyasında',
        ],
        correctIndex: 1,
      },
      {
        text: 'AI ile üretilen kodda en kritik güvenlik kontrollerinden biri nedir?',
        options: [
          'Kodun renkli olup olmadığı',
          'Hardcoded credentials, SQL injection ve XSS açıklarının kontrolü',
          'Kod satır sayısının çift olması',
          'Dosya isimlerinin uzunluğu',
        ],
        correctIndex: 1,
      },
      {
        text: 'Chain-of-thought (adım adım düşünme) tekniği ne işe yarar?',
        options: [
          'AI\'ın daha hızlı yanıt vermesini sağlar',
          'Karmaşık problemlerde AI\'ın düşünce sürecini göstermesini sağlayarak doğruluğu artırır',
          'AI\'ın sadece tek kelimelik yanıt vermesini sağlar',
          'AI\'ın internete bağlanmasını sağlar',
        ],
        correctIndex: 1,
      },
    ],
  },
};

function loadState() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {
      role: 'general',
      completedCourses: [],
      completedChallenges: [],
      recentCompletions: [],
      points: 0,
      quizResults: {},
    };
  }
  try {
    const parsed = JSON.parse(raw);
    return {
      role: parsed.role || 'general',
      completedCourses: parsed.completedCourses || [],
      completedChallenges: parsed.completedChallenges || [],
      recentCompletions: parsed.recentCompletions || [],
      points: typeof parsed.points === 'number' ? parsed.points : 0,
      quizResults: parsed.quizResults || {},
    };
  } catch {
    return {
      role: 'general',
      completedCourses: [],
      completedChallenges: [],
      recentCompletions: [],
      points: 0,
      quizResults: {},
    };
  }
}

function saveState(state) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let appState = loadState();

function computeTotalMandatory() {
  return COURSES.filter((c) => c.mandatory).length;
}

function computeCompletedMandatory() {
  return COURSES.filter((c) => c.mandatory && appState.completedCourses.includes(c.id)).length;
}

function getOverallProgressPercent() {
  const totalMandatory = computeTotalMandatory();
  if (!totalMandatory) return 0;
  return Math.round((computeCompletedMandatory() / totalMandatory) * 100);
}

function getCurrentBadgeId() {
  let current = null;
  for (const badge of BADGES) {
    if (appState.points >= badge.minPoints) {
      current = badge.id;
    }
  }
  return current;
}

function renderOverallStats() {
  const percent = getOverallProgressPercent();
  document.getElementById('overallProgressPercent').textContent = `${percent}%`;
  document.getElementById('completedMandatoryCount').textContent = computeCompletedMandatory();
  document.getElementById('totalMandatoryCount').textContent = computeTotalMandatory();
  document.getElementById('totalPoints').textContent = appState.points;

  const badgeId = getCurrentBadgeId();
  const badge = BADGES.find((b) => b.id === badgeId);
  document.getElementById('currentBadge').textContent = badge ? badge.name : '-';
}

function renderRoleSelector() {
  const select = document.getElementById('roleSelect');
  select.value = appState.role;
}

function renderDashboardLists() {
  const recommendedList = document.getElementById('recommendedList');
  const roleBasedList = document.getElementById('roleBasedList');
  const recentList = document.getElementById('recentCompletionsList');

  const mandatoryCourses = COURSES.filter((c) => c.mandatory);
  recommendedList.innerHTML = '';
  mandatoryCourses.forEach((course) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="pill-badge">
        <span class="pill-label">${course.title}</span>
        <span class="pill-meta">${course.duration} · ${course.points} puan</span>
      </span>
    `;
    recommendedList.appendChild(li);
  });

  const roleCourses = COURSES.filter(
    (c) => c.role === appState.role || (appState.role === 'general' && c.mandatory),
  ).slice(0, 4);
  roleBasedList.innerHTML = '';
  roleCourses.forEach((course) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="pill-badge">
        <span class="pill-label">${course.title}</span>
        <span class="pill-meta">
          ${course.role === 'general' ? 'Genel' : course.role === 'business' ? 'Ofis' : 'Teknik'}
          · ${course.level}
        </span>
      </span>
    `;
    roleBasedList.appendChild(li);
  });

  recentList.innerHTML = '';
  if (!appState.recentCompletions.length) {
    const li = document.createElement('li');
    li.textContent = 'Henüz bir eğitim veya görev tamamlamadınız.';
    recentList.appendChild(li);
  } else {
    appState.recentCompletions.slice(0, 5).forEach((entry) => {
      const li = document.createElement('li');
      const typeLabel = entry.type === 'course' ? 'Eğitim' : 'Görev';
      li.textContent = `${typeLabel}: ${entry.title} (${entry.points} puan)`;
      recentList.appendChild(li);
    });
  }

  const weeklyStatus = document.getElementById('weeklyGoalStatus');
  weeklyStatus.innerHTML = '';
  const completedAnyMandatory = computeCompletedMandatory() > 0;
  const completedAnyChallenge = appState.completedChallenges.length > 0;

  const goal1 = document.createElement('li');
  goal1.innerHTML = `
    <span>En az 1 zorunlu modül</span>
    <span class="${completedAnyMandatory ? 'status-ok' : 'status-pending'}">
      ${completedAnyMandatory ? 'Tamamlandı' : 'Bekleniyor'}
    </span>
  `;
  weeklyStatus.appendChild(goal1);

  const goal2 = document.createElement('li');
  goal2.innerHTML = `
    <span>En az 1 görev</span>
    <span class="${completedAnyChallenge ? 'status-ok' : 'status-pending'}">
      ${completedAnyChallenge ? 'Tamamlandı' : 'Bekleniyor'}
    </span>
  `;
  weeklyStatus.appendChild(goal2);
}

function renderCourses() {
  const container = document.getElementById('courseList');
  const roleFilter = document.getElementById('courseRoleFilter').value;
  const typeFilter = document.getElementById('courseTypeFilter').value;

  container.innerHTML = '';

  let filtered = COURSES.slice();

  if (roleFilter !== 'all') {
    filtered = filtered.filter((c) => c.role === roleFilter);
  }

  if (typeFilter !== 'all') {
    filtered = filtered.filter((c) => (typeFilter === 'mandatory' ? c.mandatory : !c.mandatory));
  }

  filtered.forEach((course) => {
    const completed = appState.completedCourses.includes(course.id);
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <div class="course-main">
        <div class="course-title-row">
          <h3>${course.title}</h3>
          <span class="course-chip">${
            course.role === 'general' ? 'Genel' : course.role === 'business' ? 'Ofis' : 'Teknik'
          }</span>
        </div>
        <div class="course-meta">
          <span>${course.level}</span>
          <span>${course.duration}</span>
          <span class="points-pill">${course.points} puan</span>
          <span>${course.provider}</span>
          <span class="${course.mandatory ? 'mandatory-tag' : 'optional-tag'}">
            ${course.mandatory ? 'Zorunlu' : 'İsteğe bağlı'}
          </span>
        </div>
      </div>
      <div class="course-actions">
        <a href="${course.link}" target="_blank" rel="noopener" class="small-link">
          İçeriği aç
        </a>
        <button
          class="small-button ${completed ? 'completed' : 'primary'}"
          data-course-id="${course.id}"
        >
          ${completed ? 'Tamamlandı' : 'Tamamladım'}
        </button>
        <span class="small-badge">
          Durum: ${completed ? 'Tamamlandı' : 'Bekleniyor'}
        </span>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderChallenges() {
  const container = document.getElementById('challengeList');
  container.innerHTML = '';

  CHALLENGES.forEach((ch) => {
    const completed = appState.completedChallenges.includes(ch.id);
    const card = document.createElement('div');
    card.className = 'challenge-card';
    card.innerHTML = `
      <div class="challenge-main">
        <div class="course-title-row">
          <h3>${ch.title}</h3>
          <span class="course-chip">
            Önerilen: ${
              ch.suggestedRole === 'general'
                ? 'Genel'
                : ch.suggestedRole === 'business'
                ? 'Ofis'
                : 'Teknik'
            }
          </span>
        </div>
        <p>${ch.description}</p>
        <div class="course-meta">
          <span class="points-pill">${ch.points} puan</span>
        </div>
      </div>
      <div class="challenge-actions">
        <button
          class="small-button ${completed ? 'completed' : 'primary'}"
          data-challenge-id="${ch.id}"
        >
          ${completed ? 'Tamamlandı' : 'Tamamladım'}
        </button>
        <span class="small-badge">
          Durum: ${completed ? 'Tamamlandı' : 'Bekleniyor'}
        </span>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderProfile() {
  document.getElementById('profileRole').textContent =
    appState.role === 'general'
      ? 'Genel Çalışan'
      : appState.role === 'business'
      ? 'Ofis / İş Birimleri'
      : 'Teknik Ekip';

  document.getElementById('profileCompletedCourses').textContent =
    appState.completedCourses.length;
  document.getElementById('profileCompletedChallenges').textContent =
    appState.completedChallenges.length;
  document.getElementById('profilePoints').textContent = appState.points;

  const badgeList = document.getElementById('badgeList');
  badgeList.innerHTML = '';
  const currentBadgeId = getCurrentBadgeId();

  BADGES.forEach((badge) => {
    const div = document.createElement('div');
    div.className = `badge-item ${badge.id === currentBadgeId ? 'active' : ''}`;
    div.innerHTML = `
      <span class="badge-name">${badge.name}</span>
      <span class="badge-desc">En az ${badge.minPoints} puan</span>
    `;
    badgeList.appendChild(div);
  });
}

function getSelectedExamLevel() {
  const select = document.getElementById('examLevelSelect');
  return select ? select.value : 'level1';
}

function renderExamSummary() {
  const levelId = getSelectedExamLevel();
  const quiz = QUIZZES[levelId];
  if (!quiz) return;

  const results = appState.quizResults[levelId] || { bestScore: null, passed: false };
  const bestScoreSpan = document.getElementById('examBestScore');
  const certSpan = document.getElementById('examCertificateStatus');

  bestScoreSpan.textContent =
    typeof results.bestScore === 'number' ? `${results.bestScore} / 100` : '-';

  if (results.passed) {
    certSpan.textContent = `${quiz.name} sertifikası alındı`;
  } else {
    certSpan.textContent = 'Henüz alınmadı';
  }
}

function renderQuiz(levelId) {
  const quiz = QUIZZES[levelId];
  const container = document.getElementById('quizContainer');
  const submitBtn = document.getElementById('submitExamBtn');
  const resultMsg = document.getElementById('quizResultMessage');

  if (!quiz || !container || !submitBtn || !resultMsg) return;

  resultMsg.textContent = '';
  resultMsg.classList.remove('exam-result-pass', 'exam-result-fail');

  const questionsHtml = quiz.questions
    .map((q, qi) => {
      const optionsHtml = q.options
        .map(
          (opt, oi) => `
        <li>
          <label>
            <input type="radio" name="quiz-q-${qi}" value="${oi}" />
            <span>${opt}</span>
          </label>
        </li>
      `,
        )
        .join('');

      return `
        <div class="quiz-question" data-question-index="${qi}">
          <div class="quiz-question-title">
            Soru ${qi + 1}: ${q.text}
          </div>
          <ul class="quiz-options">
            ${optionsHtml}
          </ul>
        </div>
      `;
    })
    .join('');

  container.innerHTML = questionsHtml || '<p>Bu seviye için soru bulunamadı.</p>';
  submitBtn.disabled = false;
}

function evaluateQuiz() {
  const levelId = getSelectedExamLevel();
  const quiz = QUIZZES[levelId];
  if (!quiz) return;

  const container = document.getElementById('quizContainer');
  const resultMsg = document.getElementById('quizResultMessage');
  const submitBtn = document.getElementById('submitExamBtn');

  if (!container || !resultMsg || !submitBtn) return;

  let correctCount = 0;
  const total = quiz.questions.length;

  quiz.questions.forEach((q, qi) => {
    const selected = container.querySelector(`input[name="quiz-q-${qi}"]:checked`);
    if (selected && Number(selected.value) === q.correctIndex) {
      correctCount += 1;
    }
  });

  const score = Math.round((correctCount / total) * 100);
  const passed = score >= quiz.passScore;

  const prev = appState.quizResults[levelId] || {
    attempts: 0,
    bestScore: null,
    lastScore: null,
    passed: false,
  };

  const bestScore =
    typeof prev.bestScore === 'number' ? Math.max(prev.bestScore, score) : score;

  appState.quizResults[levelId] = {
    attempts: prev.attempts + 1,
    bestScore,
    lastScore: score,
    passed: prev.passed || passed,
  };
  saveState(appState);

  resultMsg.textContent = passed
    ? `Tebrikler! Skorunuz ${score} / 100. Bu seviye için sertifikayı kazandınız.`
    : `Skorunuz ${score} / 100. Sertifika için en az ${quiz.passScore} puan gerekir. Tekrar deneyebilirsiniz.`;
  resultMsg.classList.add(passed ? 'exam-result-pass' : 'exam-result-fail');

  submitBtn.disabled = true;
  renderExamSummary();
}

function renderLibrary() {
  const container = document.getElementById('libraryList');
  if (!container) return;
  container.innerHTML = '';

  LIBRARY_DOCS.forEach((doc) => {
    const card = document.createElement('div');
    card.className = 'course-card';
    const roleLabel =
      appState.role === 'general'
        ? 'Genel'
        : appState.role === 'business'
        ? 'Ofis'
        : 'Teknik';

    card.innerHTML = `
      <div class="course-main">
        <div class="course-title-row">
          <h3>${doc.title}</h3>
          <span class="course-chip">${doc.category}</span>
        </div>
        <div class="course-meta">
          <span>${doc.level}</span>
          <span>${doc.readingTime} okuma</span>
          <span>Önerilen roller: ${
            doc.roles.length === 3 ? 'Herkes' : doc.roles.map((r) => r).join(', ')
          }</span>
        </div>
      </div>
      <div class="course-actions">
        <a href="${doc.file}" target="_blank" rel="noopener" class="small-link">
          Dokümanı aç
        </a>
        <span class="small-badge">
          Bu rol için öneri: ${doc.roles.includes(appState.role) ? roleLabel : 'İsteğe bağlı'}
        </span>
      </div>
    `;

    container.appendChild(card);
  });
}

function handleCourseToggle(id) {
  const course = COURSES.find((c) => c.id === id);
  if (!course) return;

  const already = appState.completedCourses.includes(id);
  if (already) {
    appState.completedCourses = appState.completedCourses.filter((cid) => cid !== id);
    appState.points = Math.max(0, appState.points - course.points);
  } else {
    appState.completedCourses.push(id);
    appState.points += course.points;
    appState.recentCompletions.unshift({
      type: 'course',
      id,
      title: course.title,
      points: course.points,
      at: Date.now(),
    });
  }

  saveState(appState);
  refreshUI();
}

function handleChallengeToggle(id) {
  const challenge = CHALLENGES.find((c) => c.id === id);
  if (!challenge) return;

  const already = appState.completedChallenges.includes(id);
  if (already) {
    appState.completedChallenges = appState.completedChallenges.filter((cid) => cid !== id);
    appState.points = Math.max(0, appState.points - challenge.points);
  } else {
    appState.completedChallenges.push(id);
    appState.points += challenge.points;
    appState.recentCompletions.unshift({
      type: 'challenge',
      id,
      title: challenge.title,
      points: challenge.points,
      at: Date.now(),
    });
  }

  saveState(appState);
  refreshUI();
}

function handleRoleChange(newRole) {
  appState.role = newRole;
  saveState(appState);
  refreshUI();
}

function handleResetProgress() {
  if (!window.confirm('Tüm ilerleme verilerini silmek istediğinizden emin misiniz?')) return;
  appState = {
    role: appState.role,
    completedCourses: [],
    completedChallenges: [],
    recentCompletions: [],
    points: 0,
  };
  saveState(appState);
  refreshUI();
}

function setupEventHandlers() {
  document.getElementById('roleSelect').addEventListener('change', (e) => {
    handleRoleChange(e.target.value);
  });

  document.getElementById('resetProgressBtn').addEventListener('click', () => {
    handleResetProgress();
  });

  document.querySelectorAll('.tab-button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab-button').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(`${target}Tab`).classList.add('active');
    });
  });

  document.querySelectorAll('.hero-actions [data-nav-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.navTarget;
      const targetBtn = document.querySelector(`.tab-button[data-tab="${target}"]`);
      if (targetBtn) targetBtn.click();
    });
  });

  document.getElementById('courseRoleFilter').addEventListener('change', () => {
    renderCourses();
    attachDynamicHandlers();
  });
  document.getElementById('courseTypeFilter').addEventListener('change', () => {
    renderCourses();
    attachDynamicHandlers();
  });

  const examLevelSelect = document.getElementById('examLevelSelect');
  const startExamBtn = document.getElementById('startExamBtn');
  const submitExamBtn = document.getElementById('submitExamBtn');

  if (examLevelSelect) {
    examLevelSelect.addEventListener('change', () => {
      renderExamSummary();
      const quizContainer = document.getElementById('quizContainer');
      if (quizContainer) {
        quizContainer.innerHTML =
          '<p class="exam-hint">Sınavı başlattığınızda 5 soru göreceksiniz. Tüm soruları yanıtlayıp "Cevapları Gönder" düğmesine basın.</p>';
      }
      if (submitExamBtn) {
        submitExamBtn.disabled = true;
      }
      const resultMsg = document.getElementById('quizResultMessage');
      if (resultMsg) {
        resultMsg.textContent = '';
        resultMsg.classList.remove('exam-result-pass', 'exam-result-fail');
      }
    });
  }

  if (startExamBtn) {
    startExamBtn.addEventListener('click', () => {
      const levelId = getSelectedExamLevel();
      renderQuiz(levelId);
    });
  }

  if (submitExamBtn) {
    submitExamBtn.addEventListener('click', () => {
      evaluateQuiz();
    });
  }
}

function attachDynamicHandlers() {
  document.querySelectorAll('[data-course-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-course-id');
      handleCourseToggle(id);
    });
  });

  document.querySelectorAll('[data-challenge-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-challenge-id');
      handleChallengeToggle(id);
    });
  });
}

function refreshUI() {
  renderRoleSelector();
  renderOverallStats();
  renderDashboardLists();
  renderCourses();
  renderChallenges();
  renderProfile();
  renderExamSummary();
  renderLibrary();
  attachDynamicHandlers();
}

function init() {
  setupEventHandlers();
  refreshUI();
}

window.addEventListener('DOMContentLoaded', init);

