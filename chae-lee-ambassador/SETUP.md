# Chae Lee Ambassador System — Kurulum Rehberi

## Hızlı Özet

```
QR Kod → Next.js Form → /api/submit → Google Apps Script → Google Sheets
```

---

## Adım 1 — Google Sheets Hazırla

1. [sheets.google.com](https://sheets.google.com) → **Yeni Spreadsheet oluştur**
2. Başlık: `Chae Lee Ambassador Database`
3. Spreadsheet'i aç, URL'deki ID'yi kopyala:
   ```
   https://docs.google.com/spreadsheets/d/[BU_ID_SENI_ILGILENDIRIYOR]/edit
   ```

---

## Adım 2 — Google Apps Script Kur

1. Spreadsheet'te: **Extensions → Apps Script**
2. `Code.gs` dosyasındaki kodu tamamen yapıştır
3. **Deploy → New Deployment → Web App** seç
   - Execute as: **Me**
   - Who has access: **Anyone**
4. **Deploy** → Web App URL'ini kopyala:
   ```
   https://script.google.com/macros/s/XXXX/exec
   ```

> ⚠️ Her kod değişikliğinde yeni deployment oluştur, aynı URL'yi güncelle.

---

## Adım 3 — Vercel'e Deploy Et

```bash
cd chae-lee-ambassador
npm install
```

[vercel.com](https://vercel.com) → **New Project → Import** → bu klasörü seç.

**Environment Variables** ekle:
```
GOOGLE_APPS_SCRIPT_URL = https://script.google.com/macros/s/SENIN_URL/exec
NEXT_PUBLIC_EVENT_HASHTAG = #ChaeLeeKBeauty
NEXT_PUBLIC_INSTAGRAM_HANDLE = @chaelee.beauty
```

**Deploy!** → Vercel sana bir URL verecek.

---

## Adım 4 — QR Kod Oluştur

1. [qr-code-generator.com](https://www.qr-code-generator.com/) veya [qrcode-monkey.com](https://www.qrcode-monkey.com/)
2. URL: `https://senin-vercel-urlin.vercel.app`
3. Renk: `#C4869B` (Chae Lee rose)
4. Logo: Chae Lee logosu ortaya eklenebilir
5. PNG/SVG olarak indir → baskıya gönder

---

## Adım 5 — Analytics Görüntüle

Google Apps Script editöründe:
1. Fonksiyonlar listesinden `buildAnalyticsSheet` seç
2. **Run** → Sheets'te yeni "Analytics" sekmesi oluşur

Analytics sayfası şunları gösterir:
- 🏆 Top 10 Ambassador adayı (toplam skora göre)
- 📍 Şehir dağılımı
- 📊 İçerik türü dağılımı
- 👥 Takipçi aralığı dağılımı
- 📈 Genel istatistikler

---

## Skor Sistemi

| Skor | Hesaplama | Max |
|------|-----------|-----|
| **Engagement Score** | (Takipçi puanı + Paylaşım sıklığı) / 2 | 100 |
| **Brand Fit Score** | İçerik uyumu %40 + K-beauty ilgisi %40 + Marka deneyimi %20 | 100 |
| **Camera Presence Score** | (Kamera güveni + Etkinlik isteği) / 2 | 100 |
| **Luxury Aesthetic Score** | İçerik tipi %60 + Creator kimliği %40 | 100 |
| **TOPLAM** | 4 skorun toplamı | 400 |

**Renk kodu (Google Sheets'te otomatik):**
- 🟢 ≥75 — Yüksek potansiyel
- 🟡 50–74 — Orta potansiyel
- 🟠 <50 — Düşük potansiyel

---

## Lokal Test

```bash
cp .env.example .env.local
# .env.local dosyasını Apps Script URL'inle doldur
npm run dev
# → http://localhost:3000
```

---

## Dosya Yapısı

```
chae-lee-ambassador/
├── src/
│   ├── app/
│   │   ├── page.tsx              ← Landing (QR kod açılış ekranı)
│   │   ├── apply/page.tsx        ← 20 sorulu form
│   │   ├── thank-you/page.tsx    ← Başvuru sonrası ekran
│   │   └── api/submit/route.ts   ← Backend → Google Sheets
│   └── lib/
│       ├── questions.ts          ← Tüm soru tanımları
│       └── scoring.ts            ← Skor hesaplama
├── google-apps-script/
│   └── Code.gs                   ← Sheets entegrasyonu
└── SETUP.md                      ← Bu dosya
```

---

## Sorun Giderme

**Form submit olmuyor:**
- Vercel env'de `GOOGLE_APPS_SCRIPT_URL` set edildi mi?
- Apps Script "Anyone" erişimiyle deploy edildi mi?
- Apps Script'te yeni deployment oluşturuldu mu (kod güncellemesi sonrası)?

**Sheets'e veri gitmiyor:**
- Apps Script editor → Executions sekmesini kontrol et
- `doGet` fonksiyonunu tarayıcıda test et: Apps Script URL'ini aç

**QR Kod çalışmıyor:**
- Vercel URL'i doğru mu?
- HTTPS mi? (HTTP QR kodları mobilde engellenir)
