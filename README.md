## AI Academy İç Portalı

Bu proje, şirket içi çalışanların yapay zekâ ve özellikle Claude kullanımını öğrenmesi için hazırlanmış basit bir **web tabanlı eğitim portalıdır**.

### Özellikler

- **Rol seçimi**: Çalışan kendi rolünü seçer (Genel, Ofis/İş Birimleri, Teknik).
- **Kurs listesi**: Her rol için önerilen modüller ve dış bağlantılar (ör. `https://www.anthropic.com/learn` üzerindeki kurslar).
- **Zorunlu / isteğe bağlı eğitimler**: Zorunlu temel modüller ve rol bazlı ek modüller ayrımı.
- **İlerleme takibi**: Tamamlanan kurslar ve görevler için ilerleme yüzdesi ve durum.
- **Puan ve rozet sistemi**: Kurs ve görev tamamlayarak puan kazanma, “Beginner / Power User / Champion” gibi rozetler.
- **Challenge/görevler**: Haftalık ya da aylık AI kullanım görevleri.

### Teknoloji

- Saf **HTML + CSS + JavaScript** (framework gerektirmez).
- Kullanıcı ilerlemesi ve tercihleri için **`localStorage`** kullanılır.
- Harici AI eğitim içeriği bağlantıları için örnek olarak Anthropic Academy (`https://www.anthropic.com/learn`) kullanılır.

### Kurulum

1. Bu klasörü (`d:\AIAcademy`) herhangi bir statik sunucuyla ya da doğrudan tarayıcıyla açabilirsiniz:
   - Dosya sisteminden: `index.html` dosyasını çift tıklayarak açın.
   - Veya bir statik HTTP sunucuyla:
     - Node.js varsa:
       ```bash
       npx serve .
       ```
     - Veya IDE’nizdeki “Live Server” eklentisini kullanın.

2. Tarayıcıda açtıktan sonra:
   - Rolünüzü seçin.
   - Önerilen kurslara gidin, `Tamamladım` butonları ile ilerlemenizi işaretleyin.
   - Challenge bölümünden görevleri tamamlayıp puan kazanın.

### Özelleştirme

- **Kurs ve görev tanımları** `app.js` içinde yer alan sabit dizilerden yönetilir.
- Şirketinize özel:
  - İç wiki / LMS bağlantıları,
  - İç politika dokümanları,
  - Kendi AI kullanım yönergeleriniz
  kolayca eklenebilir.

### Notlar ve Varsayımlar

- Portal, başlangıç sürümünde **kimlik doğrulama içermez**; her tarayıcı kendisine özel bir “kullanıcı profili” saklar.
- Kurum içi entegrasyonlar (SSO, merkezi kullanıcı veritabanı, kurumsal raporlama vb.) daha sonra eklenmek üzere tasarımda ayrı tutulmuştur.

