# Toplantı Notlarından Aksiyon Listesi Üretimi

## Modül bilgisi

| Bilgi | Değer |
|-------|-------|
| Süre | 45 dakika |
| Seviye | Orta |
| Hedef kitle | Ofis / İş Birimleri |
| Puan | 30 |
| Tür | İsteğe bağlı |

## Öğrenme hedefleri

Bu modülü tamamladığınızda:

- Toplantı notlarını AI ile hızlıca özetleyebileceksiniz
- Ham notlardan yapılandırılmış aksiyon listeleri çıkarabileceksiniz
- Toplantı takip sürecinizi sistematik hale getirebileceksiniz
- Etkili toplantı notu prompt'ları yazabileceksiniz

---

## Bölüm 1: Toplantı Notu Problemi

### Ortak sorunlar

Çoğu ekipte toplantı notları şu problemlerden muzdariptir:

- Notlar düzensiz ve okunması zor
- Kimin ne yapacağı belirsiz
- Kararlar karışıyor, aksiyon maddeleri kaybolyor
- Toplantıdan sonra kimse notlara dönmüyor
- Farklı kişiler farklı şeyler anlamış oluyor

### AI ile çözüm

Claude, ham toplantı notlarınızı:

- **Yapılandırılmış özete** dönüştürebilir
- **Aksiyon listesi** çıkarabilir (sorumlu + tarih ile)
- **Karar kayıtları** oluşturabilir
- **Takip e-postası** taslağı hazırlayabilir

---

## Bölüm 2: Adım Adım Süreç

### Adım 1: Toplantı notlarını toparlayın

Toplantı sırasında veya hemen sonrasında ham notlarınızı bir metin dosyasına aktarın. Mükemmel olması gerekmez; kısa cümleler, anahtar kelimeler yeterli.

### Adım 2: Güvenlik kontrolü yapın

Notlarınızı Claude'a göndermeden önce:

- Kişisel verileri anonimleştirin
- Gizli bilgileri çıkarın veya genelleştirin
- Hassas finansal detayları maskelyin

### Adım 3: Claude'a gönderin

**Ana prompt şablonu:**

> Sen deneyimli bir proje koordinatörü gibi davran. Aşağıda bir toplantının ham notlarını paylaşıyorum. Lütfen şu çıktıları hazırla:
>
> 1. **Toplantı özeti** (5-7 cümle, ana kararları ve tartışmaları kapsa)
> 2. **Aksiyon listesi** (her madde için: görev, sorumlu kişi, teslim tarihi)
> 3. **Kararlar** (toplantıda alınan kesin kararlar listesi)
> 4. **Açık konular** (çözülmemiş, sonraki toplantıya kalan konular)
>
> Format: Başlıklar ve madde işaretleri kullan. Türkçe yaz.
>
> Toplantı notları:
> [notlarınızı buraya yapıştırın]

### Adım 4: Gözden geçirin ve düzenleyin

- Sorumlu kişi atamalarını kontrol edin
- Tarihleri doğrulayın
- Eksik aksiyonları ekleyin
- Öncelikleri belirleyin

### Adım 5: Takip e-postası oluşturun

> Yukarıdaki toplantı özetini ve aksiyon listesini kullanarak, katılımcılara gönderilecek takip e-postası taslağı oluştur. Ton: profesyonel ama samimi.

---

## Bölüm 3: İleri Düzey Teknikler

### Farklı toplantı türleri için özelleştirilmiş prompt'lar

**Sprint planlama:**
> Notlardaki kullanıcı hikayelerini çıkar, her birine tahmini efor puanı ata ve sprint backlog'unu tablo halinde sun.

**Müşteri toplantısı:**
> Müşterinin talep ve beklentilerini ayrı listele. Verdiğimiz taahhütleri belirle. Risk oluşturabilecek noktaları işaretle.

**Yönetim toplantısı:**
> Stratejik kararları, bütçe etkilerini ve KPI hedeflerini ayrı ayrı özetle. Yönetim sunumu formatında düzenle.

### Toplantı serisi takibi

Düzenli toplantılarınız varsa, önceki toplantının aksiyonlarını da ekleyin:

> Aşağıda iki bilgi seti var:
> 1. Geçen haftaki toplantının aksiyon listesi ve durumları
> 2. Bu haftaki toplantının ham notları
>
> Lütfen: Geçen haftanın aksiyonlarından hangilerinin tamamlandığını, hangilerinin devam ettiğini belirt. Bu haftanın yeni aksiyonlarını ekle. Genel ilerleme durumunu özetle.

---

## Bölüm 4: Örnek Senaryo

### Ham toplantı notları (örnek)

> Pazartesi standup - Mehmet DB migration bitirmiş test ortamında sorun var Ali bakacak - Yeni dashboard tasarımı Ayşe'den geldi güzel olmuş ama renkleri değiştirelim dedi müdür - Q3 raporu cuma gün sonuna kadar hazır olmalı Zeynep topluyor - Sunucu maliyetleri yüksek gelmiş DevOps ekibi alternatif bakacak - Müşteri X'in entegrasyon sorunu hâlâ çözülmedi ticket açılmış

### Claude'un üreteceği yapılandırılmış çıktı

**Toplantı Özeti:** Pazartesi standup toplantısında 5 ana konu ele alındı. DB migration tamamlanmış ancak test ortamında sorun devam ediyor. Dashboard tasarımı sunuldu, renk revizyonu istendi. Q3 raporunun cuma gününe yetiştirilmesi gerekiyor. Sunucu maliyetleri gözden geçirilecek ve müşteri entegrasyon sorunu takip ediliyor.

**Aksiyon Listesi:**

| Görev | Sorumlu | Tarih |
|-------|---------|-------|
| Test ortamı sorununu incele | Ali | Salı |
| Dashboard renk revizyonu | Ayşe | Çarşamba |
| Q3 raporunu topla ve tamamla | Zeynep | Cuma |
| Sunucu maliyet alternatiflerini araştır | DevOps ekibi | Gelecek hafta |
| Müşteri X entegrasyon ticket'ını takip et | İlgili ekip | Bu hafta |

---

## Pratik Alıştırmalar

### Alıştırma 1: Gerçek toplantı
Bir sonraki toplantınızda ham not tutun ve toplantı sonrasında bu modüldeki şablonu kullanarak Claude ile özetleyin.

### Alıştırma 2: Geçmiş notlar
Geçen haftaki bir toplantının notlarını bulun ve Claude ile yapılandırın. Eksik kalmış aksiyonlar var mı kontrol edin.

### Alıştırma 3: Takip e-postası
Claude'un oluşturduğu özet ve aksiyon listesini kullanarak bir takip e-postası hazırlatın ve ekibinize gönderin.

---

## Sonraki adım

Bu modülden sonra **Görevler** sekmesindeki "Toplantı Notlarını Özetle" görevini tamamlayarak pratiğinizi pekiştirebilirsiniz.
