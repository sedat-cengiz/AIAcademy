# Veri Gizliliği ve AI Güvenliği

## Modül bilgisi

| Bilgi | Değer |
|-------|-------|
| Süre | 50 dakika |
| Seviye | Başlangıç / Orta |
| Hedef kitle | Tüm çalışanlar |
| Puan | 55 |
| Tür | Zorunlu |

## Öğrenme hedefleri

Bu modülü tamamladığınızda:

- AI kullanımında veri gizliliği risklerini tanıyabileceksiniz
- KVKK kapsamında AI ile veri paylaşımı kurallarını bileceksiniz
- Veri sınıflandırma ve anonimleştirme tekniklerini uygulayabileceksiniz
- Güvenli AI kullanım alışkanlıkları geliştireceksiniz
- Kurum içi veri güvenliği politikasına uygun davranabileceksiniz

---

## Bölüm 1: AI ve Veri Gizliliği Riskleri

### Verileriniz nereye gidiyor?

Bir AI aracına metin gönderdiğinizde bu veriler:

- **Sunuculara iletilir**: Metin, işlenmek üzere AI sağlayıcısının sunucularına gönderilir
- **İşlenir ve yanıt üretilir**: Model metni analiz eder ve yanıt oluşturur
- **Saklanabilir**: Bazı sağlayıcılar sohbet geçmişini kaydeder
- **Eğitime dahil edilebilir**: Bazı durumlarda verileriniz model eğitiminde kullanılabilir

### Risk senaryoları

**Senaryo 1 — Gizli veri sızıntısı:**
Bir çalışan, müşteri listesini Claude'a yapıştırarak "en karlı müşterileri analiz et" diyor. Müşteri isimleri, iletişim bilgileri ve finansal verileri artık dış bir sunucuya gönderilmiş oluyor.

**Senaryo 2 — Kişisel veri ihlali:**
İK departmanından birisi, çalışan şikayetlerini AI'a vererek "özetle" diyor. Şikayetlerde çalışan adları, departman bilgileri ve hassas konular yer alıyor.

**Senaryo 3 — Ticari sır:**
Ürün geliştirme ekibi, henüz duyurulmamış bir ürünün teknik spesifikasyonlarını AI'a vererek dokümantasyon hazırlatıyor.

---

## Bölüm 2: KVKK ve AI

### KVKK nedir?

**Kişisel Verilerin Korunması Kanunu (KVKK)**, Türkiye'de kişisel verilerin işlenmesine ilişkin temel yasal çerçevedir (6698 sayılı kanun).

### KVKK kapsamında kişisel veri nedir?

Kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgi:

| Veri türü | Örnekler |
|-----------|----------|
| Kimlik bilgileri | Ad-soyad, TC kimlik no, doğum tarihi |
| İletişim bilgileri | Telefon, e-posta, adres |
| Finansal bilgiler | Maaş, banka hesap no, kredi bilgileri |
| Sağlık bilgileri | Sağlık raporları, engellilik durumu |
| Çalışma bilgileri | Özlük dosyası, performans değerlendirmeleri |
| Dijital kimlik | IP adresi, çerez verileri, konum bilgisi |

### AI kullanımında KVKK uyumu

- Kişisel verileri AI'a **göndermeden önce** anonimleştirin
- Açık rıza olmadan kişisel verileri AI ile **işlemeyin**
- Veri minimizasyonu: Sadece **gerekli olan** veriyi paylaşın
- Veri aktarımı: AI sağlayıcısının sunucularının **nerede** olduğunu bilin
- Kayıt tutma: AI ile hangi verilerin işlendiğini **dokümante edin**

---

## Bölüm 3: Veri Sınıflandırma

### Dört seviyeli sınıflandırma

Kurumsal verilerinizi AI'a göndermeden önce sınıflandırın:

### Seviye 1 — Genel (Yeşil)
AI ile serbestçe kullanılabilir.
- Kamuya açık bilgiler
- Genel sektör bilgisi
- Şirketin web sitesindeki bilgiler
- Herkesin erişebildiği dokümanlar

### Seviye 2 — İç Kullanım (Sarı)
Dikkatli kullanılabilir, hassas detaylar çıkarılmalı.
- İç prosedürler ve süreç dokümanları
- Genel toplantı notları (isimler maskelenerek)
- Eğitim materyalleri
- Departman raporları (finansal detaylar çıkarılarak)

### Seviye 3 — Gizli (Turuncu)
AI ile paylaşılmamalı veya çok sıkı anonimleştirme gerektirir.
- Müşteri verileri
- Çalışan özlük bilgileri
- Finansal detaylar ve bütçeler
- Sözleşmeler ve anlaşmalar
- İş stratejileri

### Seviye 4 — Çok Gizli (Kırmızı)
AI ile kesinlikle paylaşılmamalı.
- Ticari sırlar
- Şifreler ve erişim anahtarları
- Henüz kamuya açıklanmamış finansal veriler
- Hukuki süreçlere ait belgeler
- Kişisel sağlık ve özel hayat bilgileri

---

## Bölüm 4: Anonimleştirme Teknikleri

### Temel teknikler

**1. İsim maskeleme:**
- Gerçek: "Ahmet Yılmaz'ın performansı düştü"
- Anonimleştirilmiş: "Çalışan A'nın performansı düştü"

**2. Sayı yuvarlama:**
- Gerçek: "Q3 geliri 4.237.891 TL oldu"
- Anonimleştirilmiş: "Q3 geliri yaklaşık 4,2 milyon TL oldu"

**3. Tarih genelleştirme:**
- Gerçek: "15 Mart 2026 tarihli toplantıda"
- Anonimleştirilmiş: "Mart ayı ortasındaki toplantıda"

**4. Bağlam soyutlama:**
- Gerçek: "İstanbul Kadıköy şubemizin müdürü Ayşe Hanım"
- Anonimleştirilmiş: "Bir şube müdürümüz"

**5. Kategori kullanma:**
- Gerçek: "Maaşı 45.000 TL olan çalışan"
- Anonimleştirilmiş: "Orta düzey maaş bandındaki çalışan"

### Anonimleştirme kontrol listesi

AI'a metin göndermeden önce şunları kontrol edin:

- [ ] Ad-soyad var mı? → Maskele
- [ ] TC/vergi numarası var mı? → Çıkar
- [ ] Telefon/e-posta var mı? → Çıkar
- [ ] Adres bilgisi var mı? → Genelleştir
- [ ] Finansal rakamlar var mı? → Yuvarla veya aralık ver
- [ ] Sağlık bilgisi var mı? → Kesinlikle çıkar
- [ ] Ticari sır var mı? → Gönderme

---

## Bölüm 5: Güvenli AI Kullanım Alışkanlıkları

### Günlük pratikler

1. **Gönder düğmesine basmadan önce bir saniye durun**: "Bu metinde hassas veri var mı?"
2. **Kopyala-yapıştır alışkanlığını sorgulayın**: Tüm dokümanı mı yoksa sadece gerekli kısmı mı paylaşıyorsunuz?
3. **Sohbet geçmişini temizleyin**: Hassas konulardan sonra yeni sohbet başlatın
4. **Ekran paylaşımına dikkat**: AI sohbetlerinizi paylaşılan ekranda açık bırakmayın
5. **Kurumsal araçları tercih edin**: Onaylı, kurumsal lisanslı AI araçlarını kullanın

### Olay müdahale planı

Hassas veriyi yanlışlıkla AI'a gönderdiyseniz:

1. **Panik yapmayın** ama hemen harekete geçin
2. **Sohbeti silin** (mümkünse)
3. **IT/güvenlik ekibini bilgilendirin**
4. **Olayı kaydedin** (ne gönderildi, ne zaman, hangi araca)
5. **Etkilenen kişileri bilgilendirme** gerekip gerekmediğini değerlendirin

---

## Bölüm 6: Kurumsal AI Araçları vs. Kişisel Kullanım

### Farklar

| Özellik | Kişisel (ücretsiz) | Kurumsal (Enterprise) |
|---------|--------------------|-----------------------|
| Veri eğitime dahil | Olabilir | Genellikle hayır |
| Veri saklama | Uzun süreli | Kontrollü |
| Erişim kontrolü | Yok | Var (SSO, roller) |
| Denetim kayıtları | Yok | Var |
| Veri lokasyonu | Belirsiz | Belirli (Avrupa vb.) |
| SLA/Destek | Sınırlı | Tam |

### Öneri

- İş amaçlı AI kullanımı için **kurumsal onaylı araçları** tercih edin
- Kişisel ücretsiz hesaplarınızda **iş verisi işlemeyin**
- Yeni bir AI aracı denemek istiyorsanız önce **IT ekibine danışın**

---

## Kendinizi Test Edin

1. AI'a gönderdiğiniz verilere ne olur? En az 3 adımı açıklayabilir misiniz?
2. KVKK kapsamında kişisel veri örnekleri nelerdir?
3. Veri sınıflandırmasında hangi seviye AI ile kesinlikle paylaşılmamalıdır?
4. En az 3 anonimleştirme tekniği sayabilir misiniz?
5. Yanlışlıkla hassas veri gönderdiyseniz ilk yapmanız gereken nedir?

---

## Sonraki adım

Bu modülden sonra **Kütüphane** bölümündeki "KVKK ve AI" dokümanını inceleyerek bilginizi pekiştirin.
