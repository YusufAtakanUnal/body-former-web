# Yayınlama (Deploy) — Statik Hosting

Site tamamen **statik** olarak dışa aktarılır: `next build` çalıştırınca tüm
site `out/` klasörüne HTML/CSS/JS olarak çıkar. Bu klasörü, domain'inizin
hosting'ine (cPanel/FTP) yüklemeniz yeterli — Node.js sunucusu gerekmez.

## 1. Build al

```bash
npm install
npm run build
```

Bu, proje kökünde bir **`out/`** klasörü oluşturur. İçinde:
`index.html`, `_next/` (JS/CSS/fontlar), `screens/` (3D model + ekran
görüntüleri), `404.html`.

## 2. `out/` içeriğini hosting'e yükle

> **Önemli:** `out` klasörünün **kendisini** değil, **içindekileri** yükle.

- **cPanel → File Manager** ya da **FTP (FileZilla)** ile bağlan.
- Web kök dizinine git — genelde **`public_html`** (ana domain) veya
  alt-domain için onun klasörü.
- `out/` içindeki **her şeyi** (`index.html`, `_next/`, `screens/`, `404.html`)
  bu klasöre kopyala.

Domain'i tarayıcıda açtığında site gelir. `index.html` otomatik açılır.

## 3. Notlar

- **3D model 11 MB.** İlk açılışta birkaç saniye yüklenir; "yükleniyor %.."
  göstergesi görünür. Hosting'in dosya boyutu/aktarım limiti varsa kontrol et.
- **HTTPS:** cPanel'de "SSL/TLS Status" → AutoSSL ile ücretsiz sertifika al.
- **Önbellek:** İçeriği güncelleyip yeniden yüklersen tarayıcıda hard-refresh
  (Ctrl+F5) yap.
- **`.ply` MIME tipi:** Sunucu bilinmeyen uzantıyı `application/octet-stream`
  olarak servis eder; 3D yükleyici bunu sorunsuz okur, ekstra ayar gerekmez.

## Güncelleme yaparken

İçerik/tasarım değişince tekrar `npm run build` → yeni `out/` içeriğini aynı
şekilde yükle (eskinin üzerine yaz).
