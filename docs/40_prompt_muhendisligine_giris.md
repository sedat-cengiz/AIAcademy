# Prompt Mühendisliğine Giriş

## Kimin için?

- AI araçlarını (Claude, ChatGPT vb.) işinde kullanmak isteyen herkes
- Özellikle ofis çalışanları, analistler, yazılımcılar

## Öğrenme hedefleri

- Prompt (istek) nedir, neden bu kadar önemli, bunu anlamak
- İyi ve kötü prompt örneklerini ayırt edebilmek
- Basit bir şablonla kendi işiniz için güçlü prompt’lar yazabilmek
- Claude ve ChatGPT için aynı prensipleri uygulayabildiğinizi görmek

## Kısa özet

“Prompt”, AI modeline verdiğiniz yazılı yönergedir. Aynı kişiyle konuşur gibi
“şu rolde davran, şu veriyi kullan, şu formatta cevap ver” diyerek modele talimat
verirsiniz. Güçlü prompt’lar:

- **Bağlam (context)** verir,
- **Rol** tanımlar,
- **Görev**i net söyler,
- Çıktı için **biçim/format** ister,
- Gerekirse ek **kısıtlar** koyar (dil, uzunluk, hedef kitle vb.).

Bu doküman, basit ama güçlü bir çerçeve veriyor: **CRISP modeli** (Context, Role, Input,
Steps, Presentation).

## Prompt nedir, ne değildir?

- **Nedir?**
  - Modele ne yapmasını istediğinizi anlattığınız metin.
  - Bir nevi mini “görev tanımı” veya “talimat dokümanı”.
- **Ne değildir?**
  - Sihirli bir cümle.
  - Tüm işi sizin yerinize yapacak bir büyü.

AI’dan iyi sonuç almak için, önce ne istediğinizi kendinize de net anlatabilmeniz gerekir.

## CRISP modeli: Güçlü prompt için 5 bileşen

1. **Context (Bağlam)**  
   - Ne üzerinde çalışıyoruz? Bu hangi ortam/iş akışı?
   - Örnek: “Şirket içi haftalık satış raporu üzerinde çalışıyoruz.”

2. **Role (Rol)**  
   - Model hangi rolde davransın?
   - Örnek: “Deneyimli bir iş analisti gibi düşün.”

3. **Input (Girdi)**  
   - Üzerinde çalışılacak ham veri, metin, kod, tablo vb.
   - Örnek: “Aşağıdaki ham raporu kullan.”

4. **Steps (Adımlar)**  
   - Modelden nasıl bir işlem sırası istiyorsunuz?
   - Örnek: “Önce özet çıkar, sonra fırsatları belirt, en sonda riskleri listele.”

5. **Presentation (Sunum)**  
   - Çıktı biçimi, uzunluğu, dili, tonu.
   - Örnek: “Yanıtı Türkçe ver, başlık ve madde işaretleri kullan.”

Basit bir kural: Prompt’unuzda bu 5 öğeden ne kadar fazlası net ve kısa şekilde varsa, sonuç o
kadar iyi olur.

## Örnek 1 – Zayıf prompt vs. güçlü prompt

### Zayıf prompt

> Raporu özetler misin?

Sorunlar:

- Hangi rapor, ne amaçla, kim için belli değil.
- Format beklentisi yok.

### Güçlü prompt (CRISP uygulanmış)

> Sen deneyimli bir **iş analisti** gibi davran.  
> Aşağıda **şirket içi haftalık satış raporu** metnini paylaşıyorum.  
> 1. Önce 5 madde ile **genel özeti** çıkar.  
> 2. Sonra 5 madde ile **büyüme fırsatlarını** yaz.  
> 3. Ardından 5 madde ile **risk ve dikkat edilmesi gereken noktaları** belirt.  
> Çıktıyı **Türkçe**, başlık + madde işaretleri formatında ver.  
> İşte rapor metni:  
> `...buraya raporu yapıştırın...`

Bu şablon hem Claude hem ChatGPT için aynı şekilde çalışır.

## Örnek 2 – Kod için prompt

### Zayıf

> Bu kodu düzelt.

### Daha iyi

> Aşağıda bir JavaScript fonksiyonu var.  
> Amacı: bir sayı dizisi alıp, içindeki tek sayıları toplayarak sonucu döndürmek.  
> Ancak bazı hatalar içeriyor ve her zaman doğru çalışmıyor.  
> 1. Kodu incele.  
> 2. Hataları düzelt.  
> 3. Daha okunabilir hale getir.  
> 4. Basit test örnekleri öner.  
> Sadece **düzeltilmiş kodu ve test örneklerini** döndür. Açıklama ekleme.  
> Kod:
> `...buraya kodu yapıştırın...`

Burada da rol (deneyimli geliştirici), görev, adımlar ve çıktı formatı net.

## Kendi işiniz için hızlı prompt şablonu

Kendinize göre uyarlayabileceğiniz bir iskelet:

> Sen deneyimli bir **[rol]** gibi davran.  
> Aşağıda **[bağlam / içerik]** ile ilgili bir metin/veri paylaşıyorum.  
> Amacım: **[amacı net yaz]**.  
> 1. Önce **[ilk adım]**  
> 2. Sonra **[ikinci adım]**  
> 3. En sonunda **[son adım / çıktı]**  
> Yanıtını **[dil]** olarak, **[biçim: tablo, madde, başlıklar…]** formatında ver.  
> İşte içerik:  
> `...`

Bu şablonu kaydedip, her seferinde küçük değişikliklerle kullanabilirsiniz.

## Anthropic Academy ve OpenAI Academy ile bağlantı

- Anthropic tarafında:
  - [Anthropic Academy / Learn](https://www.anthropic.com/learn) üzerinde yer alan Claude
    kullanım rehberleri ve örnek prompt’lar, burada anlattığımız prensiplerin pratik
    uygulamalarını içerir.
- OpenAI tarafında:
  - [OpenAI Academy](https://academy.openai.com/) içindeki ChatGPT ve Codex odaklı oturumlar,
    yazılım geliştirme, eğitim, içerik üretimi gibi alanlarda iyi prompt örnekleri sunar.

Bu doküman, bu iki kaynağın temel mantığını Türkçe ve kurum içi senaryolara uyarlanmış şekilde
özetler.

## Alıştırmalar – Kendinizi geliştirmek için 3 küçük görev

1. **Günlük işinizden bir senaryo seçin.**  
   Örneğin: müşteri e-postalarına cevap, toplantı notu özetleme, kod review.  
   - Önce “zayıf” bir prompt yazın.  
   - Sonra CRISP modeline göre iyileştirin.  
   - İki sonucun farkını karşılaştırın.

2. **Bir çıktı formatı deneyin.**  
   Aynı içeriği hem “madde işaretleriyle özetle” hem de “tablo halinde sun” diyerek isteyin.
   Hangi format işinizi daha çok kolaylaştırıyor?

3. **Kişisel şablonunuzu oluşturun.**  
   Sık kullandığınız 2–3 senaryo için kendi prompt şablonlarınızı yazın ve kaydedin.  
   Bunları zamanla geliştirerek “kişisel AI kütüphaneniz” haline getirin.

Bu basit adımları uyguladığınızda, AI araçlarından aldığınız verimin gözle görülür şekilde
arttığını fark edeceksiniz.

