# Siteyi Güncelleme Rehberi (BodyFormer)

Canlı site: **https://bodyformer.app**
Barındırma: **Netlify** (GitHub'a bağlı — her push otomatik yayınlanır).
Depo: https://github.com/YusufAtakanUnal/body-former-web (private)

## Nasıl çalışır
`main` dalına **her `git push`** → Netlify otomatik build alır → `bodyformer.app`
kendiliğinden güncellenir (~1-2 dk). Ayrı bir "deploy" komutu gerekmez.

## Kendin güncellemek

### 1. Neyi nerede değiştirirsin
| Değişiklik | Dosya / Klasör |
| --- | --- |
| Tüm yazılar (TR + EN) | `src/i18n/content.ts` |
| Giriş fotoğrafları / normal map | `public/screens/yg*.jpeg`, `yg*_cut.png` |
| Uygulama ekranları | `public/screens/inapp1.jpeg`, `inapp2.jpeg` |
| Model videosu | `public/screens/modelvideo.mp4` |
| Logo | `public/logo.png` |
| Sekme başlığı / SEO | `src/app/layout.tsx` |

### 2. (İlk sefer / yeni bilgisayar) kur
```bash
git clone https://github.com/YusufAtakanUnal/body-former-web.git
cd body-former-web
npm install
```

### 3. Yerelde gör (isteğe bağlı)
```bash
npm run dev          # http://localhost:3000
```

### 4. Yayınla
```bash
git pull             # önce en günceli al (özellikle 2 kişi çalışıyorsa)
git add .
git commit -m "ne değişti"
git push
```
→ Netlify otomatik yayınlar. Bitince `bodyformer.app` güncel.

## Notlar
- **Birlikte çalışma:** Repo collaborator'ları (ör. canyagiz) push edince de
  site otomatik güncellenir. Push'tan önce `git pull` yapın (çakışma olmasın).
- **Geri alma:** Netlify paneli → **Deploys** → eski bir deploy → **Publish
  deploy** ile tek tıkla o sürüme dön.
- **Build durumu:** Netlify paneli → **Deploys** sekmesinden canlı takip.
- Domain/DNS Namecheap'te; Netlify SSL'i otomatik yeniler — dokunmaya gerek yok.
