# Claude 101: Temel Kullanım

## Modül bilgisi

| Bilgi | Değer |
|-------|-------|
| Süre | 60 dakika |
| Seviye | Başlangıç |
| Hedef kitle | Tüm çalışanlar |
| Puan | 60 |
| Tür | Zorunlu |

## Öğrenme hedefleri

Bu modülü tamamladığınızda:

- Claude'un ne olduğunu ve diğer AI araçlarından farkını bileceksiniz
- Claude arayüzünü rahatça kullanabileceksiniz
- Temel prompt yazma tekniklerini uygulayabileceksiniz
- Claude'un güçlü ve zayıf yönlerini bileceksiniz
- İş hayatında Claude'u verimli kullanmaya başlayabileceksiniz

---

## Bölüm 1: Claude Nedir?

Claude, Anthropic şirketi tarafından geliştirilen bir yapay zekâ asistanıdır. Büyük dil modeli (LLM) teknolojisini kullanır ve metin tabanlı görevlerde size yardımcı olur.

### Claude'un öne çıkan özellikleri

- **Uzun bağlam desteği**: Çok uzun dokümanları tek seferde işleyebilir
- **Güvenlik odaklı tasarım**: Anthropic'in "Constitutional AI" yaklaşımıyla eğitilmiş
- **Dürüst yanıtlar**: Bilmediği konularda "bilmiyorum" diyebilir
- **Çok dilli destek**: Türkçe dahil birçok dilde çalışır
- **Kod yazma ve analiz**: Programlama görevlerinde güçlü

### Claude'a nasıl erişilir?

- **claude.ai**: Tarayıcı üzerinden sohbet arayüzü
- **Claude API**: Yazılım projeleri için programatik erişim
- **Claude for Enterprise**: Kurumsal güvenlik ve yönetim özellikleri
- **IDE eklentileri**: VS Code, Cursor gibi editörlerde Claude Code

---

## Bölüm 2: İlk Adımlar – Claude ile Sohbet

### Temel kullanım akışı

1. Claude arayüzüne girin
2. Metin kutusuna isteğinizi (prompt) yazın
3. Gönder düğmesine basın
4. Yanıtı okuyun ve gerekirse takip sorusu sorun

### İlk deneyebileceğiniz görevler

- **Metin özetleme**: "Aşağıdaki metni 3 maddede özetle:"
- **E-posta taslağı**: "Müşteriye gecikme hakkında özür e-postası yaz"
- **Fikir üretme**: "Ekip toplantısı için 5 gündem maddesi öner"
- **Açıklama**: "Blockchain teknolojisini 10 yaşındaki bir çocuğa anlat"
- **Çeviri**: "Aşağıdaki metni İngilizce'den Türkçe'ye çevir:"

---

## Bölüm 3: Etkili Prompt Yazma Temelleri

Prompt, Claude'a verdiğiniz yazılı talimattır. İyi bir prompt, iyi bir sonuç almanın anahtarıdır.

### İyi prompt'un 5 bileşeni

1. **Bağlam (Context)**: Ne üzerinde çalışıyorsunuz?
2. **Rol (Role)**: Claude hangi uzmanlıkla davransın?
3. **Görev (Task)**: Tam olarak ne yapmasını istiyorsunuz?
4. **Format**: Çıktı nasıl bir biçimde olsun?
5. **Kısıtlar**: Uzunluk, dil, ton gibi sınırlamalar neler?

### Örnek: Zayıf vs. Güçlü Prompt

**Zayıf prompt:**
> Raporu özetle.

**Güçlü prompt:**
> Sen deneyimli bir iş analisti gibi davran. Aşağıda şirketimizin Q3 satış raporunu paylaşıyorum. Lütfen:
> 1. Raporu 5 maddede özetle
> 2. En önemli 3 büyüme fırsatını belirt
> 3. Dikkat edilmesi gereken 2 riski listele
>
> Yanıtını Türkçe olarak, başlık ve madde işaretleri formatında ver.

### Sık kullanılan prompt kalıpları

- **"… gibi davran"**: Rol atama
- **"Adım adım …"**: Yapılandırılmış yanıt isteme
- **"Aşağıdaki formatta …"**: Çıktı biçimi belirleme
- **"En fazla X madde / kelime ile …"**: Uzunluk sınırlama
- **"Önce … sonra … en sonda …"**: Sıralı görev verme

---

## Bölüm 4: Claude ile Yapabileceğiniz Temel Görevler

### Metin özetleme

Uzun raporları, e-posta zincrilerini, toplantı notlarını kısa ve öz şekilde özetleyebilirsiniz.

> **Örnek prompt:** "Aşağıdaki toplantı notlarını 5 maddelik bir özet ve aksiyon listesine dönüştür. Her aksiyon maddesinde sorumlu kişiyi belirt."

### Yazı düzenleme ve iyileştirme

Mevcut metinlerinizi daha profesyonel, anlaşılır veya kısa hale getirebilirsiniz.

> **Örnek prompt:** "Aşağıdaki e-posta taslağını daha profesyonel bir dille yeniden yaz. Tonunu nazik ama kararlı tut. Uzunluğunu yarıya indir."

### Fikir üretme ve beyin fırtınası

Yeni fikirler, alternatif yaklaşımlar veya yaratıcı çözümler için Claude'u kullanabilirsiniz.

> **Örnek prompt:** "Çalışan bağlılığını artırmak için 10 yaratıcı öneri listele. Her önerinin yanına tahmini maliyet seviyesini (düşük/orta/yüksek) ekle."

### Veri analizi ve yorumlama

Tablo, liste veya metin formatındaki verileri analiz ettirebilirsiniz.

> **Örnek prompt:** "Aşağıdaki satış verilerindeki trendi analiz et. Hangi ürün kategorisi en çok büyümüş? Hangi bölge gerilemiş? Bulgularını tablo formatında sun."

### Kod yazma ve açıklama

Basit kodlar yazdırabilir, mevcut kodu açıklattırabilir veya hata ayıklatabilirsiniz.

> **Örnek prompt:** "Python'da bir CSV dosyasını okuyan, satış toplamını hesaplayan ve sonucu bir Excel dosyasına yazan bir script yaz. Kodu yorumlarla açıkla."

---

## Bölüm 5: Claude Kullanırken Dikkat Edilmesi Gerekenler

### Bilmediğini kabul eder ama yine de hata yapabilir

Claude dürüst olmaya çalışır, ancak bazen yanlış bilgi üretebilir (halüsinasyon). Özellikle:

- Spesifik rakamlar ve tarihler
- Güncel olaylar
- Teknik detaylar ve referanslar

**Her zaman kritik bilgileri bağımsız kaynaklardan doğrulayın.**

### Gizli veri paylaşımında dikkatli olun

- Müşteri isimleri, TC kimlik numaraları, finansal veriler gibi hassas bilgileri **anonimleştirmeden** paylaşmayın
- Kurum politikanıza uygun davranın
- Şüphe duyduğunuzda IT ekibinize danışın

### Bağlamı koruyun

- Uzun sohbetlerde Claude önceki mesajları unutabilir
- Önemli bağlam bilgilerini gerektiğinde tekrarlayın
- Çok farklı konular için yeni sohbet başlatın

### Sonuçları düzenleyin

AI'ın ürettiği metni olduğu gibi kullanmak yerine:

1. Okuyun ve doğruluğunu kontrol edin
2. Kendi tarzınıza uyarlayın
3. Gerekli düzenlemeleri yapın
4. Sonra paylaşın

---

## Pratik Alıştırmalar

### Alıştırma 1: İlk sohbet
Claude'a girin ve şu prompt'u deneyin: "Bana kendini 3 cümleyle tanıt ve en iyi yapabildiğin 5 görevi listele."

### Alıştırma 2: E-posta taslağı
Son yazdığınız bir iş e-postasını Claude'a verin ve "bunu daha profesyonel bir dille yeniden yaz" deyin. Sonuçları karşılaştırın.

### Alıştırma 3: Özetleme
Uzun bir makale veya raporu Claude'a yapıştırın. "Bu metni 5 maddede özetle ve en önemli bulguyu vurgula" deyin.

### Alıştırma 4: Prompt iyileştirme
Önce basit bir prompt yazın, sonra CRISP modelini uygulayarak geliştirin. İki sonucu karşılaştırın.

---

## Sonraki adım

Bu modülden sonra rolünüze göre önerilen bir sonraki modüle geçin:

- **Ofis / İş birimleri**: Claude for Work: Doküman, E-posta ve Raporlama
- **Teknik ekip**: Claude Code in Action
- **Herkes**: Prompt Mühendisliğine Giriş (Kütüphane)
