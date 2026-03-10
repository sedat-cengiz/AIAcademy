# Claude API Entegrasyonu ile Basit Uygulama

## Modül bilgisi

| Bilgi | Değer |
|-------|-------|
| Süre | 90 dakika |
| Seviye | Orta / İleri |
| Hedef kitle | Teknik Ekip (IT / Yazılım / Veri) |
| Puan | 80 |
| Tür | İsteğe bağlı |

## Öğrenme hedefleri

Bu modülü tamamladığınızda:

- Claude API'nin temel kavramlarını bileceksiniz
- API anahtarı yönetimi ve güvenlik pratiklerini uygulayabileceksiniz
- Basit bir Claude API entegrasyonu yapabileceksiniz
- Prompt yönetimini programatik olarak uygulayabileceksiniz
- Hata yönetimi ve rate limiting stratejilerini kavrayacaksınız

---

## Bölüm 1: Claude API'ye Giriş

### API nedir, neden kullanılır?

Claude'u web arayüzü yerine **programatik olarak** kullanmak istediğinizde API'yi kullanırsınız. Bu şu durumlarda gereklidir:

- Kendi uygulamanıza AI özelliği eklemek
- Toplu işlem yapmak (batch processing)
- Otomatik iş akışları oluşturmak
- Özel arayüzler geliştirmek
- Diğer sistemlerle entegrasyon

### Temel kavramlar

- **API Key**: Kimlik doğrulama için kullanılan gizli anahtar
- **Endpoint**: API'ye istek gönderdiğiniz URL
- **Model**: Kullanmak istediğiniz Claude versiyonu (claude-sonnet, claude-opus vb.)
- **Messages**: Sohbet mesajlarının listesi
- **System prompt**: Modele verilen genel talimat/bağlam
- **Tokens**: Metnin modele gönderilen parçaları (fiyatlandırma birimi)
- **Rate limit**: Belirli sürede yapılabilecek maksimum istek sayısı

---

## Bölüm 2: API Anahtarı ve Güvenlik

### API anahtarı alma

1. Anthropic Console'a giriş yapın
2. API Keys bölümüne gidin
3. Yeni anahtar oluşturun
4. Anahtarı güvenli bir yerde saklayın

### Güvenlik kuralları

**Yapın:**
- API anahtarını **ortam değişkenlerinde** (environment variables) saklayın
- `.env` dosyası kullanın ve `.gitignore`'a ekleyin
- Anahtarları düzenli olarak rotate edin
- Kullanım limitlerini ve maliyeti izleyin

**Yapmayın:**
- API anahtarını **asla** kaynak koduna yazmayın
- API anahtarını commit etmeyin veya paylaşmayın
- Client-side (tarayıcı) kodunda API anahtarı kullanmayın
- Tek bir anahtarı tüm projeler için kullanmayın

### Ortam değişkeni örneği

```
# .env dosyası (asla commit etmeyin!)
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

```python
# Python ile okuma
import os
api_key = os.environ.get("ANTHROPIC_API_KEY")
```

---

## Bölüm 3: İlk API Çağrısı

### Python ile basit örnek

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    system="Sen yardımcı bir Türkçe asistansın.",
    messages=[
        {
            "role": "user",
            "content": "Yapay zekâ nedir? 3 cümle ile açıkla."
        }
    ]
)

print(message.content[0].text)
```

### Node.js ile basit örnek

```javascript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const message = await client.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  system: "Sen yardımcı bir Türkçe asistansın.",
  messages: [
    {
      role: "user",
      content: "Yapay zekâ nedir? 3 cümle ile açıkla.",
    },
  ],
});

console.log(message.content[0].text);
```

### İstek ve yanıt yapısı

**İstek parametreleri:**

| Parametre | Zorunlu | Açıklama |
|-----------|---------|----------|
| model | Evet | Kullanılacak model adı |
| max_tokens | Evet | Yanıttaki maksimum token sayısı |
| messages | Evet | Sohbet mesajları dizisi |
| system | Hayır | Sistem prompt'u |
| temperature | Hayır | Yaratıcılık seviyesi (0-1) |
| top_p | Hayır | Nucleus sampling parametresi |

**Yanıt yapısı:**
- `content`: Modelin yanıt metni
- `model`: Kullanılan model
- `usage`: Token kullanım bilgisi (input_tokens, output_tokens)
- `stop_reason`: Yanıtın neden durduğu

---

## Bölüm 4: İleri Konular

### Sohbet geçmişi yönetimi

Çok turlu sohbet için önceki mesajları da göndermeniz gerekir:

```python
messages = [
    {"role": "user", "content": "Python'da liste sıralama nasıl yapılır?"},
    {"role": "assistant", "content": "Python'da sort() ve sorted()..."},
    {"role": "user", "content": "Peki özel bir karşılaştırma fonksiyonu nasıl kullanırım?"},
]

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=messages
)
```

### System prompt ile davranış yönetimi

```python
system = """Sen bir kurumsal müşteri destek asistanısın.
Kuralların:
- Her zaman Türkçe yanıt ver
- Nazik ve profesyonel ol
- Bilmediğin konularda "Bu konuda size yardımcı olamıyorum, lütfen destek ekibimize ulaşın" de
- Kişisel veri talep etme
- Yanıtları kısa ve net tut (maks 3 paragraf)"""
```

### Hata yönetimi

```python
import anthropic

try:
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        messages=[{"role": "user", "content": "Merhaba"}]
    )
except anthropic.RateLimitError:
    print("Rate limit aşıldı, lütfen bekleyin.")
except anthropic.AuthenticationError:
    print("API anahtarı geçersiz.")
except anthropic.APIError as e:
    print(f"API hatası: {e}")
```

### Streaming (akış) yanıtlar

Uzun yanıtları parça parça almak için:

```python
with client.messages.stream(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Uzun bir hikaye anlat."}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

---

## Bölüm 5: Pratik Proje – Basit Soru-Cevap Botu

### Proje yapısı

```
qa-bot/
├── .env                 # API anahtarı (gitignore'da!)
├── .gitignore
├── requirements.txt
├── bot.py               # Ana uygulama
└── prompts.py           # System prompt'lar
```

### Adım adım uygulama

**1. Ortamı hazırlayın:**
```
pip install anthropic python-dotenv
```

**2. System prompt'u tanımlayın (prompts.py):**
```python
SYSTEM_PROMPT = """Sen şirketimizin iç destek asistanısın.
Görevin: Çalışanların IT, İK ve genel ofis sorularını yanıtlamak.
Kurallar:
- Türkçe yanıt ver
- Kısa ve net ol
- Emin olmadığın konularda ilgili departmana yönlendir
- Kişisel veri paylaşma"""
```

**3. Ana uygulamayı yazın (bot.py):**
```python
import os
from dotenv import load_dotenv
import anthropic
from prompts import SYSTEM_PROMPT

load_dotenv()
client = anthropic.Anthropic()

def ask(question, history=None):
    messages = history or []
    messages.append({"role": "user", "content": question})

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=512,
        system=SYSTEM_PROMPT,
        messages=messages
    )

    answer = response.content[0].text
    messages.append({"role": "assistant", "content": answer})
    return answer, messages

if __name__ == "__main__":
    print("Soru-Cevap Botu (çıkmak için 'q' yazın)")
    history = []
    while True:
        q = input("\nSoru: ").strip()
        if q.lower() == "q":
            break
        answer, history = ask(q, history)
        print(f"\nYanıt: {answer}")
```

---

## Bölüm 6: Maliyet ve Optimizasyon

### Token kullanımını izleme

```python
response = client.messages.create(...)
print(f"Giriş: {response.usage.input_tokens} token")
print(f"Çıkış: {response.usage.output_tokens} token")
```

### Maliyet azaltma ipuçları

- **max_tokens** limitini gerçekçi tutun
- Gereksiz yere uzun system prompt kullanmayın
- Sohbet geçmişini özetleyerek kısaltın
- Uygun model seçin (daha basit görevler için daha küçük model)
- Önbellekleme (caching) kullanın; aynı soru tekrar geldiğinde API çağrısı yapmayın

---

## Pratik Alıştırmalar

### Alıştırma 1: İlk API çağrısı
Yukarıdaki basit örneklerden birini kendi bilgisayarınızda çalıştırın.

### Alıştırma 2: System prompt tasarımı
Kendi ekibiniz için bir system prompt tasarlayın. Farklı prompt'ları test edip sonuçları karşılaştırın.

### Alıştırma 3: Soru-cevap botu
Pratik proje bölümündeki botu kurup çalıştırın. Kendi kullanım senaryonuza göre özelleştirin.

### Alıştırma 4: Hata yönetimi
Bilinçli olarak hatalı istekler gönderin (yanlış model adı, çok uzun mesaj vb.) ve hata yönetimi kodunuzu test edin.

---

## Sonraki adım

Bu modülü tamamladıktan sonra **Görevler** sekmesindeki "Bir Fonksiyonu Claude Code ile Refactor Et" görevini deneyerek pratik yapabilirsiniz.
