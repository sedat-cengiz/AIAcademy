# AI Çıktılarını Değerlendirme ve Doğrulama

## Kimin için?

- AI araçlarını iş süreçlerinde kullanan herkes
- Özellikle raporlama, karar destek ve içerik üretimi yapanlar

## Öğrenme hedefleri

- AI'ın ne zaman ve neden hata yaptığını anlayabilmek
- Halüsinasyonları (uydurma bilgi) tespit edebilmek
- Sistematik bir doğrulama süreci uygulayabilmek
- Eleştirel düşünme becerilerini AI kullanımına uygulayabilmek

## AI neden hata yapar?

AI modelleri **kesinlik makineleri değildir**. Temelde bir sonraki kelimeyi olasılıksal olarak tahmin ederler. Bu nedenle:

### Halüsinasyon (uydurma bilgi)

Model, eğitim verisinde yeterli bilgi olmadığında veya kalıpları yanlış eşleştirdiğinde **güvenle yanlış bilgi üretebilir**. Bu halüsinasyona denir.

**Örnekler:**
- Var olmayan bir araştırma makalesi veya kitap referansı verme
- Gerçekte yaşanmamış bir olayı anlatma
- Yanlış istatistik veya rakam sunma
- Mevcut olmayan bir kişiyi veya kurumu referans gösterme

### Güncellik sınırı

Modelin eğitim verisi belirli bir tarihe kadardır. Bu tarihten sonraki olayları bilemez. Güncel konularda bilgi istediğinizde hata riski yüksektir.

### Bağlam kaybı

Uzun sohbetlerde veya çok büyük metinlerde model, önceki bilgileri kısmen unutabilir veya karıştırabilir.

### Aşırı genelleme

Model, spesifik bir durum hakkında genel kalıpları uygulayarak yanlış sonuçlara varabilir.

---

## Doğrulama çerçevesi: FACT kontrolü

AI çıktısını değerlendirirken **FACT** kontrol listesini kullanın:

### F — Factual accuracy (Gerçeklik)
- Belirtilen olgular doğru mu?
- Rakamlar, tarihler, isimler gerçek mi?
- Referans gösterilen kaynaklar var mı?

### A — Assumptions (Varsayımlar)
- AI gizli varsayımlar yapıyor mu?
- Bu varsayımlar sizin bağlamınıza uygun mu?
- Eksik bilgi var mı?

### C — Completeness (Bütünlük)
- Konu yeterince kapsamlı ele alınmış mı?
- Önemli bir perspektif atlanmış mı?
- Karşıt görüş veya riskler belirtilmiş mi?

### T — Tone & bias (Ton ve önyargı)
- Metin dengeli mi yoksa tek yanlı mı?
- Stereotipler veya önyargılar var mı?
- Hedef kitleye uygun mu?

---

## Pratik doğrulama adımları

### 1. Kritik bilgileri çapraz kontrol edin
- Rakamları bağımsız kaynaklardan doğrulayın
- İsim ve tarihleri kontrol edin
- "Bu gerçekten var mı?" sorusunu sorun

### 2. Mantık testini uygulayın
- Sonuçlar mantıksal olarak tutarlı mı?
- Neden-sonuç ilişkileri doğru mu?
- "Bu gerçekten anlamlı mı?" diye sorun

### 3. Boşlukları tespit edin
- AI neyi söyledi, neyi söylemedi?
- Önemli bir konu atlanmış mı?
- Karşıt görüş var mı?

### 4. İkinci bir perspektif alın
- Aynı soruyu farklı şekilde sorun
- Başka bir kişiden gözden geçirmesini isteyin
- Gerekirse farklı bir AI aracıyla da kontrol edin

---

## Güven seviyeleri

AI çıktısına duymanız gereken güven seviyesi, kullanım amacına göre değişir:

| Kullanım amacı | Güven seviyesi | Doğrulama derecesi |
|----------------|----------------|---------------------|
| Beyin fırtınası, fikir üretme | Yüksek güven OK | Hafif kontrol |
| İç taslak veya not | Orta güven | Orta kontrol |
| Müşteriye gidecek doküman | Düşük güven | Detaylı doğrulama |
| Finansal rapor veya hukuki metin | Çok düşük güven | Bağımsız doğrulama şart |
| Kritik iş kararı | Minimum güven | Uzman onayı gerekli |

---

## Kırmızı bayraklar — Ne zaman şüphelenmeli?

AI çıktısında şu durumları gördüğünüzde **ek doğrulama yapın**:

- Çok spesifik rakamlar veya istatistikler (ör. "%73,2'si...")
- Detaylı tarih ve yer bilgileri
- Belirli kişi veya kurumlara atıflar
- "Araştırmalara göre..." diye başlayan iddialar
- Kaynak gösterilmeden yapılan kesin ifadeler
- Aşırı iyimser veya aşırı olumsuz değerlendirmeler
- Sezgisel olarak "bu doğru mu?" dedirten bilgiler

---

## Alıştırmalar

1. **Halüsinasyon tespiti**: Claude'a niş bir konu hakkında bilgi isteyin (ör. küçük bir kasabanın tarihi). Verdiği bilgilerin doğruluğunu araştırın. Hangileri uydurma?

2. **FACT kontrolü**: Son aldığınız bir AI çıktısına FACT çerçevesini uygulayın. Her boyutta (F, A, C, T) değerlendirme yapın.

3. **Güven seviyesi**: Farklı görevler için (e-posta, rapor, sunum, strateji notu) hangi güven seviyesinde çalışmanız gerektiğini belirleyin.
