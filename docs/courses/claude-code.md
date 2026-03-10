# Claude Code in Action

## Modül bilgisi

| Bilgi | Değer |
|-------|-------|
| Süre | 90 dakika |
| Seviye | Orta |
| Hedef kitle | Teknik Ekip (IT / Yazılım / Veri) |
| Puan | 60 |
| Tür | İsteğe bağlı |

## Öğrenme hedefleri

Bu modülü tamamladığınızda:

- Claude Code'un ne olduğunu ve nasıl çalıştığını bileceksiniz
- Yazılım geliştirme sürecinizde Claude'u aktif kullanabileceksiniz
- Kod yazma, inceleme ve refactoring'de AI desteği alabileceksiniz
- Test yazma ve debugging süreçlerinizi hızlandırabileceksiniz
- AI destekli geliştirmenin sınırlarını ve risklerini kavrayacaksınız

---

## Bölüm 1: Claude Code Nedir?

Claude Code, Anthropic'in yazılım geliştirme süreçleri için tasarlanmış AI aracıdır. Terminal tabanlı bir arayüz üzerinden çalışır ve kodlama görevlerinde kapsamlı destek sağlar.

### Temel yetenekler

- **Kod yazma**: Sıfırdan fonksiyon, sınıf, modül oluşturma
- **Kod inceleme**: Mevcut kodu analiz etme, sorunları tespit etme
- **Refactoring**: Kodu daha okunabilir ve sürdürülebilir hale getirme
- **Test yazma**: Unit test, integration test oluşturma
- **Debug**: Hata ayıklama ve çözüm önerisi sunma
- **Dokümantasyon**: Kod açıklamaları ve API dokümanları oluşturma
- **Dosya işlemleri**: Proje yapısını anlama, dosya oluşturma/düzenleme

### Erişim yolları

- **Terminal**: `claude` komutu ile doğrudan terminal'den kullanım
- **IDE entegrasyonu**: VS Code, Cursor gibi editörlerde entegre çalışma
- **claude.ai**: Web arayüzü üzerinden kod görevleri

---

## Bölüm 2: Yazılım Geliştirmede Claude Kullanımı

### Yeni kod yazma

**Fonksiyon oluşturma:**
> Aşağıdaki gereksinimleri karşılayan bir TypeScript fonksiyonu yaz:
> - Girdi: Bir tarih aralığı (başlangıç ve bitiş tarihi)
> - Bir API'den satış verilerini çeker
> - Verileri günlük bazda gruplar
> - Her gün için toplam ve ortalama hesaplar
> - Sonuçları bir nesne dizisi olarak döndürür
> - Hata yönetimi ekle (try-catch)
> - JSDoc ile dokümante et

**Sınıf tasarımı:**
> Python'da bir `CacheManager` sınıfı tasarla:
> - TTL (time-to-live) destekli in-memory cache
> - LRU eviction policy
> - Thread-safe olmalı
> - get, set, delete, clear metodları
> - İstatistik (hit/miss ratio) tutabilmeli

### Mevcut kodu anlama

Yeni katıldığınız bir projede veya karmaşık bir kod bloğunda Claude'dan yardım alabilirsiniz:

> Aşağıdaki kodu incele ve şunları açıkla:
> 1. Bu kodun genel amacı nedir?
> 2. Her fonksiyonun rolü ne?
> 3. Veri akışı nasıl işliyor?
> 4. Potansiyel sorunlar veya iyileştirme fırsatları var mı?

---

## Bölüm 3: Kod İnceleme ve Refactoring

### AI destekli kod inceleme

Claude'u bir kod reviewer olarak kullanabilirsiniz:

> Sen kıdemli bir yazılım mühendisi gibi davran. Aşağıdaki pull request'i incele. Şu açılardan değerlendir:
> 1. **Doğruluk**: Mantık hataları var mı?
> 2. **Okunabilirlik**: Kod anlaşılır mı, isimlendirmeler uygun mu?
> 3. **Performans**: Gereksiz işlem veya bellek kullanımı var mı?
> 4. **Güvenlik**: Güvenlik açığı potansiyeli var mı?
> 5. **Test kapsamı**: Testler yeterli mi?
>
> Her bulgu için önem derecesi (kritik/önemli/önerme) belirt.

### Refactoring örnekleri

**Karmaşık fonksiyonu sadeleştirme:**
> Aşağıdaki fonksiyon çok uzun ve karmaşık. Lütfen:
> 1. Single Responsibility Principle'a göre küçük fonksiyonlara böl
> 2. Magic number'ları anlamlı sabitlerle değiştir
> 3. Okunabilirliği artır
> 4. Orijinal davranışı bozmadan refactor et

**Design pattern uygulama:**
> Bu kod tekrar eden if-else bloklarından oluşuyor. Strategy pattern kullanarak yeniden tasarla. Her stratejiyi ayrı sınıf olarak implement et.

---

## Bölüm 4: Test Yazma

### Unit test oluşturma

> Aşağıdaki fonksiyon için kapsamlı unit testler yaz:
> - Normal durumlar (happy path)
> - Sınır değerler (edge cases)
> - Hata durumları (error cases)
> - Null/undefined girdi
>
> Test framework: Jest
> Her test'e açıklayıcı isim ver.

### Test kapsamı analizi

> Aşağıdaki kodu ve mevcut testleri incele. Hangi senaryolar test edilmemiş? Eksik test case'leri listele ve her biri için test kodu yaz.

---

## Bölüm 5: Debugging

### Hata analizi

> Aşağıdaki hata mesajını ve ilgili kodu paylaşıyorum:
>
> Hata: [hata mesajı]
> Kod: [ilgili kod]
>
> 1. Hatanın kök nedenini tespit et
> 2. Neden oluştuğunu açıkla
> 3. Düzeltme öner
> 4. Bu tür hataları önlemek için genel öneriler ver

### Performans sorunları

> Bu fonksiyon büyük veri setlerinde çok yavaş çalışıyor. Profilleme sonuçları:
> [veriler]
>
> 1. Darboğaz noktalarını belirle
> 2. Optimizasyon önerileri sun
> 3. Her önerinin beklenen etkisini açıkla
> 4. Optimize edilmiş kodu yaz

---

## Bölüm 6: En İyi Pratikler

### Yapın

- AI'ın ürettiği kodu **mutlaka** inceleyin ve test edin
- Prompt'larda bağlam verin (dil, framework, kısıtlar)
- İteratif çalışın: ilk çıktıyı adım adım geliştirin
- AI'ı pair programming partneri olarak düşünün
- Üretilen kodu anladığınızdan emin olun

### Yapmayın

- AI çıktısını incelemeden production'a almayın
- Güvenlik kritik kodda AI'a körü körüne güvenmeyin
- Gizli API anahtarları veya credentials paylaşmayın
- AI'ın her önerisini sorgulamadan kabul etmeyin
- Karmaşık mimari kararları yalnızca AI'a bırakmayın

### Güvenlik kontrol listesi

1. Üretilen kodda hardcoded credentials var mı?
2. SQL injection, XSS gibi açıklara karşı koruma var mı?
3. Input validation yapılıyor mu?
4. Error handling hassas bilgi sızdırıyor mu?
5. Dependency'ler güvenli ve güncel mi?

---

## Pratik Alıştırmalar

### Alıştırma 1: Refactoring
Projenizdeki karmaşık bir fonksiyonu seçin. Claude'dan okunabilirlik ve test kapsamı konusunda yardım alın.

### Alıştırma 2: Test yazma
Projenizdeki test edilmemiş bir modül için Claude ile kapsamlı unit test'ler yazın.

### Alıştırma 3: Kod inceleme
Son merge edilen bir PR'ı Claude ile inceleyin. İnsan reviewer'ın kaçırmış olabileceği noktalar var mı?

### Alıştırma 4: Debug
Son karşılaştığınız bir bug'ı Claude'a açıklayın ve çözüm önerileri alın.

---

## Sonraki adım

Bu modülden sonra **Claude API Entegrasyonu** modülüne geçerek, Claude'u kendi uygulamalarınıza entegre etmeyi öğrenebilirsiniz.
