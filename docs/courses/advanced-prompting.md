# İleri Prompt Teknikleri

## Modül bilgisi

| Bilgi | Değer |
|-------|-------|
| Süre | 75 dakika |
| Seviye | Orta |
| Hedef kitle | Tüm çalışanlar |
| Puan | 50 |
| Tür | İsteğe bağlı |

## Öğrenme hedefleri

Bu modülü tamamladığınızda:

- İleri düzey prompt tekniklerini tanıyacak ve uygulayabileceksiniz
- Chain-of-thought (adım adım düşünme) tekniğini kullanabileceksiniz
- Few-shot örnekleme ile tutarlı çıktılar alabileceksiniz
- Yapılandırılmış çıktı isteme (tablo, JSON, markdown) konusunda uzmanlaşacaksınız
- Karmaşık görevleri alt görevlere bölerek daha iyi sonuç alabileceksiniz

---

## Bölüm 1: Temel Hatırlatma – CRISP Modeli

İleri tekniklere geçmeden önce, temel CRISP modelini hatırlayalım:

- **C**ontext (Bağlam): Ne üzerinde çalışıyoruz?
- **R**ole (Rol): Model hangi uzmanlıkla davransın?
- **I**nput (Girdi): Üzerinde çalışılacak veri/metin
- **S**teps (Adımlar): İşlem sırası
- **P**resentation (Sunum): Çıktı biçimi

Bu modülde CRISP'in üzerine inşa ederek daha güçlü teknikler öğreneceksiniz.

---

## Bölüm 2: Chain-of-Thought (Adım Adım Düşünme)

### Nedir?

Modelden doğrudan sonuç istemek yerine, **düşünce sürecini adım adım açıklamasını** istemek. Bu, özellikle karmaşık problemlerde doğruluk oranını önemli ölçüde artırır.

### Nasıl kullanılır?

**Zayıf prompt:**
> Bu proje karlı mı?

**CoT uygulanmış:**
> Bu projenin karlılığını analiz et. Lütfen adım adım düşün:
> 1. Önce projenin toplam maliyetini hesapla
> 2. Sonra beklenen geliri tahmin et
> 3. Maliyet-gelir karşılaştırmasını yap
> 4. Risk faktörlerini değerlendir
> 5. Son olarak net karlılık değerlendirmeni sun

### Ne zaman kullanmalı?

- Matematiksel veya mantıksal problemlerde
- Çok adımlı analiz gerektiren görevlerde
- Karşılaştırma ve değerlendirme yapılacak durumlarda
- Karar verme süreçlerinde

### İpucu

"Adım adım düşün", "her adımı açıkla", "mantığını göster" gibi ifadeler eklemek bile çıktı kalitesini artırır.

---

## Bölüm 3: Few-Shot Örnekleme

### Nedir?

Modele ne istediğinizi **örneklerle göstermek**. Sözlü açıklama yerine (veya yanında) somut örnekler vermek, çıktının formatını ve kalitesini dramatik şekilde iyileştirir.

### Örnek: Ürün açıklaması

**Zero-shot (örnek yok):**
> Ürün açıklaması yaz: Bluetooth kulaklık

**Few-shot (örnekli):**
> Aşağıdaki stilde ürün açıklamaları yaz.
>
> Örnek 1:
> Ürün: Termos bardak
> Açıklama: Sabah kahvenizi akşama kadar sıcak tutun. 500ml paslanmaz çelik termos, çift cidarlı vakum yalıtımıyla 12 saat sıcak, 24 saat soğuk tutar. Sızdırmaz kapağı sayesinde çantanızda taşıyın.
>
> Örnek 2:
> Ürün: Kablosuz şarj standı
> Açıklama: Masanızda kablo karmaşasına son verin. 15W hızlı kablosuz şarj, tüm Qi uyumlu cihazlarla çalışır. LED göstergesi şarj durumunu anlık takip eder.
>
> Şimdi yaz:
> Ürün: Bluetooth kulaklık

### Ne zaman kullanmalı?

- Belirli bir format veya stil istediğinizde
- Tutarlı çıktılar almak istediğinizde
- Karmaşık çıktı yapısını tarif etmek zor olduğunda
- Tekrarlayan görevlerde standart oluşturmak için

---

## Bölüm 4: Yapılandırılmış Çıktı İsteme

### Tablo formatı

> Aşağıdaki metrikleri tablo formatında sun:
>
> | Metrik | Bu Ay | Geçen Ay | Değişim (%) |
> |--------|-------|----------|-------------|
>
> Her satırda metrik adı, bu ayki değer, geçen ayki değer ve yüzde değişimi olsun.

### Markdown formatı

> Sonuçları aşağıdaki yapıda sun:
> - Her bölüm için **## Başlık**
> - Alt konular için **### Alt başlık**
> - Önemli noktalar **kalın** ile vurgulansın
> - Listeler madde işaretleriyle olsun

### JSON formatı (teknik kullanım için)

> Sonuçları aşağıdaki JSON yapısında döndür:
> ```json
> {
>   "ozet": "...",
>   "bulgular": ["...", "..."],
>   "oneri": "...",
>   "risk_seviyesi": "dusuk|orta|yuksek"
> }
> ```

### Karşılaştırma formatı

> İki seçeneği şu yapıda karşılaştır:
>
> **Seçenek A: [isim]**
> - Avantajlar: ...
> - Dezavantajlar: ...
> - Maliyet: ...
>
> **Seçenek B: [isim]**
> - Avantajlar: ...
> - Dezavantajlar: ...
> - Maliyet: ...
>
> **Öneri:** [hangisi neden tercih edilmeli]

---

## Bölüm 5: Görev Ayrıştırma (Task Decomposition)

### Nedir?

Büyük ve karmaşık bir görevi **küçük, yönetilebilir alt görevlere** bölerek AI'dan sırayla yapmasını istemek.

### Neden önemli?

- AI, tek seferde çok şey istendiğinde kalite kaybeder
- Küçük görevler daha doğru sonuç verir
- Ara çıktıları kontrol etme şansınız olur
- Hata durumunda sadece ilgili adımı düzeltirsiniz

### Örnek: Müşteri analiz raporu

**Kötü yaklaşım (tek seferde her şeyi istemek):**
> Müşteri verilerini analiz et, rapor yaz, sunum hazırla, e-posta taslağı oluştur.

**İyi yaklaşım (ayrıştırılmış):**

Adım 1:
> Bu müşteri verilerindeki temel eğilimleri 5 maddede özetle.

Adım 2:
> Bu eğilimlere dayanarak, en önemli 3 büyüme fırsatını belirle. Her biri için kanıt göster.

Adım 3:
> Fırsatları ve eğilimleri kullanarak 8 slaytlık bir sunum taslağı oluştur.

Adım 4:
> Sunum özetini yönetime gönderilecek 1 paragraflık bir e-postaya dönüştür.

---

## Bölüm 6: Kısıtlama ve Yönlendirme Teknikleri

### Negatif yönlendirme (ne yapmasın)

> Yanıtında şunları **yapma**:
> - Spekülatif veya varsayımsal bilgi verme
> - 5 maddeden fazla listeleme
> - Jargon veya teknik terim kullanma
> - Emin olmadığın bilgiyi kesin gibi sunma

### Persona (kimlik) belirleme

> Sen Türkiye'de 15 yıllık deneyime sahip bir finans kontrolörüsün. Cevaplarını IFRS standartlarına ve Türk vergi mevzuatına uygun ver. Teknik terimleri kullan ama her birini parantez içinde kısaca açıkla.

### Çıktı uzunluğu kontrolü

- "En fazla 3 paragraf"
- "Her madde en fazla 1 cümle"
- "150 kelimeyi aşma"
- "Sadece başlık ve madde işaretleri, açıklama paragrafı yazma"

### Ton ve üslup kontrolü

- "Resmi ve profesyonel"
- "Samimi ama profesyonel"
- "10 yaşındaki bir çocuğun anlayacağı şekilde"
- "C-level yöneticiye sunum yapıyormuş gibi, öz ve etkili"

---

## Bölüm 7: Meta-Prompting

### Prompt'u AI'a yazdırma

Bazen en iyi prompt'u bulmak zordur. Claude'dan yardım alabilirsiniz:

> Aşağıdaki görevi en iyi şekilde yerine getirmek için ideal bir prompt yaz:
> Görev: Aylık satış raporunu 3 sayfalık bir yönetim özetine dönüştürmek.
> Hedef kitle: CEO ve yönetim kurulu.
> Beklenti: Vizyon odaklı, stratejik, rakamlarla desteklenmiş.

### İteratif iyileştirme

> Bu yanıtı şu açılardan iyileştir:
> 1. Daha kısa ve öz yap
> 2. Her bölüme somut örnek ekle
> 3. Teknik jargonu azalt
> 4. Aksiyon odaklı öneriler ekle

---

## Pratik Alıştırmalar

### Alıştırma 1: Chain-of-thought
Bir iş kararını (örn. yeni bir yazılım aracı satın alma) Claude'a adım adım analiz ettirin. Sonucu, CoT kullanmadan aldığınız yanıtla karşılaştırın.

### Alıştırma 2: Few-shot
Sık yazdığınız bir içerik türü için (e-posta, rapor, duyuru) 2-3 örnek vererek Claude'dan aynı stilde yeni içerik ürettirin.

### Alıştırma 3: Yapılandırılmış çıktı
Bir veriyi hem tablo, hem madde listesi, hem de paragraf formatında isteyip hangisinin işinize en çok yaradığını değerlendirin.

### Alıştırma 4: Görev ayrıştırma
Büyük bir projenizi 5 alt göreve bölün ve her birini ayrı ayrı Claude'a yaptırın. Sonuçları birleştirip değerlendirin.

### Alıştırma 5: Meta-prompting
Claude'dan, en sık yaptığınız bir görev için ideal prompt yazmasını isteyin. Bu prompt'u kaydedip şablon olarak kullanın.

---

## Sonraki adım

Bu modülden sonra **Görevler** bölümünden pratik yaparak teknikleri pekiştirin. Özellikle "Prompt Şablon Kütüphanesi Oluştur" görevi bu modülün mükemmel bir tamamlayıcısıdır.
