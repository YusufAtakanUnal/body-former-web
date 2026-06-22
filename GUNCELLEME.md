# Siteyi Güncelleme Rehberi (BodyFormer)

Canlı site: **https://bodyformer.app** (Vercel'de barınıyor).

## En kolay yol
Claude'a ne istediğini söyle ("şu yazıyı değiştir", "görseli güncelle") —
düzenleme + yayınlama onun işi.

## Kendin yapmak istersen

### 1. Neyi nerede değiştirirsin
| Değişiklik | Dosya / Klasör |
| --- | --- |
| Tüm yazılar (TR + EN) | `src/i18n/content.ts` |
| Ekran görüntüleri | `public/screens/inapp1.jpeg`, `inapp2.jpeg` (aynı isimle değiştir) |
| 3D model | `public/screens/demir.ply` (aynı isimle değiştir) |
| Sekme başlığı / SEO | `src/app/layout.tsx` |

### 2. (İsteğe bağlı) Önce yerelde gör
```bash
npm run dev
```
Tarayıcıda http://localhost:3000 — değişiklikleri anında görürsün.
Durdurmak için terminalde `Ctrl+C`.

### 3. Canlıya yayınla (2 komut)
Proje klasöründe terminal aç:
```bash
npm run build
vercel --prod --yes
```
Birkaç saniyede `bodyformer.app` güncellenir.

## Notlar
- **Domain otomatik bağlı kalır** — her deploy `bodyformer.app`'e gider, DNS'e
  dokunmana gerek yok.
- **Vercel girişi kalıcı** — `vercel --prod --yes` tekrar login istemez.
- **Geri alma:** Bir şey bozulursa Vercel paneli → Deployments → eski sürüm →
  "Promote to Production" ile tek tıkla geri dön.
- İlk kez başka bilgisayarda yapıyorsan: `npm install` (bir kere) ve
  `npm i -g vercel` + `vercel login` gerekir.
