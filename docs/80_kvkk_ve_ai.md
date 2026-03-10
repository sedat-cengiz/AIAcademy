# KVKK ve AI: Bilmeniz Gerekenler

## Kimin için?

- AI araçları ile çalışan tüm çalışanlar
- Özellikle kişisel veriyle temas eden birimler (İK, Satış, Pazarlama, Müşteri İlişkileri)

## Öğrenme hedefleri

- KVKK'nın AI kullanımındaki temel yükümlülüklerini bilmek
- Kişisel veri tanımını ve kapsamını kavramak
- AI araçlarına veri gönderirken uyulması gereken kuralları uygulamak
- Veri ihlali durumunda atılması gereken adımları bilmek

---

## KVKK nedir?

**6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)**, gerçek kişilerin kişisel verilerinin işlenmesini düzenler. 2016'da yürürlüğe girmiştir ve AB'nin GDPR düzenlemesiyle benzer ilkeleri paylaşır.

### Temel ilkeler

1. **Hukuka ve dürüstlük kurallarına uygun olma**
2. **Doğru ve gerektiğinde güncel olma**
3. **Belirli, açık ve meşru amaçlar için işlenme**
4. **İşlendikleri amaçla bağlantılı, sınırlı ve ölçülü olma**
5. **İlgili mevzuatta öngörülen veya işlendikleri amaç için gerekli süre kadar muhafaza edilme**

---

## Kişisel veri nedir?

Kimliği belirli veya belirlenebilir gerçek kişiye ilişkin **her türlü bilgi**.

### Kişisel veri örnekleri

- Ad-soyad, TC kimlik numarası
- Telefon numarası, e-posta adresi
- Adres bilgileri
- Fotoğraf, parmak izi
- IP adresi, konum bilgisi
- Banka hesap bilgileri
- Çalışan sicil numarası

### Özel nitelikli kişisel veriler (hassas veriler)

KVKK'da ekstra korumaya sahip veriler:

- Irk, etnik köken
- Siyasi düşünce, felsefi inanç, din, mezhep
- Kılık kıyafet
- Dernek, vakıf, sendika üyeliği
- Sağlık verileri, cinsel hayat
- Ceza mahkumiyeti ve güvenlik tedbirleri
- Biyometrik ve genetik veriler

> **Bu veriler AI araçlarıyla kesinlikle paylaşılmamalıdır.**

---

## AI kullanımında KVKK uygulaması

### Veri AI'a gönderilince ne olur?

AI aracına metin gönderdiğinizde, bu metin "veri işleme" kapsamına girer. KVKK açısından:

1. **Veri aktarımı** gerçekleşir (sunuculara gönderim)
2. **Veri işleme** yapılır (model tarafından analiz)
3. **Veri depolama** olabilir (sohbet geçmişi kaydı)
4. **Yurt dışı aktarım** söz konusu olabilir (sunucu lokasyonuna bağlı)

### Ne yapmalısınız?

**Kişisel veri içeren metinler için:**

1. **Anonimleştirin**: Kişiyi belirlenebilir kılan bilgileri çıkarın
2. **Minimize edin**: Sadece gerekli bilgiyi paylaşın
3. **Amacı sorgulayın**: Bu veriyi AI'a göndermenin gerçekten gerekli olup olmadığını değerlendirin
4. **Alternatif düşünün**: Kişisel veri olmadan da görev yapılabilir mi?

### Örneklerle açıklama

**Yanlış kullanım:**
> "Ahmet Yılmaz'ın (TC: 12345678901) maaşı 35.000 TL, performans notu 4/5. Bu çalışanın değerlendirmesini yaz."

**Doğru kullanım:**
> "Orta kademe bir çalışanın performans değerlendirmesi için şablon oluştur. Kriterler: hedef gerçekleştirme, ekip çalışması, liderlik, teknik yetkinlik."

---

## Veri işleme şartları

KVKK'ya göre kişisel veri ancak belirli şartlarda işlenebilir:

| Şart | Açıklama | AI bağlamı |
|------|----------|------------|
| Açık rıza | Kişinin bilgilendirilmiş onayı | Çalışan/müşteri rızası alınmış mı? |
| Kanuni zorunluluk | Yasal bir gereklilik | AI ile işleme yasal zorunluluk mu? |
| Sözleşme gereği | Sözleşmenin ifası için gerekli | Bu veri sözleşme kapsamında mı? |
| Meşru menfaat | Veri sorumlusunun meşru menfaati | Orantılılık ilkesine uygun mu? |

### Pratikte bu ne anlama gelir?

- Çoğu durumda, çalışan veya müşteri verilerini AI'a göndermeniz için **açık rıza** gerekir
- Açık rıza olmadan kişisel veriyi AI ile işlemeniz **KVKK ihlali** oluşturabilir
- En güvenli yol: **Anonimleştirerek** göndermek (artık kişisel veri olmaktan çıkar)

---

## Veri ihlali durumunda ne yapılmalı?

Kişisel veriyi yanlışlıkla AI'a gönderdiyseniz:

### Hemen yapılması gerekenler

1. Sohbeti/veriyi mümkünse **silin**
2. IT/bilgi güvenliği ekibine **bildirin**
3. Olayı **kayıt altına alın** (ne gönderildi, ne zaman, hangi araca)
4. Etkilenen kişi sayısını ve veri türünü **belirleyin**

### Kurumsal süreç

- Veri sorumlusu (şirket) durumu değerlendirmelidir
- KVKK'ya göre ciddi ihlallerde **72 saat** içinde Kişisel Verileri Koruma Kurulu'na bildirim gerekebilir
- İlgili kişilerin bilgilendirilmesi gerekebilir
- Olay sonrası **iyileştirme planı** oluşturulmalıdır

---

## Pratik kontrol listesi

AI'a metin göndermeden önce bu listeyi gözden geçirin:

- [ ] Metinde kişisel veri (ad, soyad, TC no vb.) var mı?
- [ ] Metinde özel nitelikli veri (sağlık, din vb.) var mı?
- [ ] Bu verilerin AI'a gönderilmesi için rıza alınmış mı?
- [ ] Anonimleştirme yaptım mı?
- [ ] Sadece gerekli bilgiyi mi gönderiyorum?
- [ ] AI aracı kurum tarafından onaylanmış mı?
- [ ] Veri yurt dışına mı aktarılacak?

---

## Sıkça sorulan sorular

### "Sohbet geçmişimi silersem veri silinmiş olur mu?"
Tam olarak değil. Silme işlemi kullanıcı arayüzünden kaldırır, ancak sunucularda belirli bir süre saklanmış olabilir. Bu nedenle hassas veriyi **göndermemek** en güvenli yoldur.

### "Kurumsal AI lisansımız varsa sorun yok mu?"
Kurumsal lisanslar genellikle daha iyi veri koruma sağlar, ancak KVKK yükümlülükleri yine de geçerlidir. Anonimleştirme pratiğini sürdürün.

### "Genel istatistikleri paylaşmak sorun mu?"
Kişiyi belirlenebilir kılmayan, toplulaştırılmış veriler genellikle KVKK kapsamı dışındadır. Örneğin "departmandaki ortalama satış" göndermek sorun olmaz, "Ali'nin satışı" göndermek sorun olur.

---

## Alıştırmalar

1. Bir iş e-postanızda veya raporunuzda hangi bilgiler kişisel veri kapsamına girer? Tespit edin.

2. Gerçek bir iş senaryosu düşünün: Bu senaryoda AI'a nasıl anonimleştirilmiş veri gönderirsiniz? Öncesi ve sonrası örneklerini yazın.

3. Departmanınız için bir "AI veri gönderme kontrol listesi" oluşturun.
