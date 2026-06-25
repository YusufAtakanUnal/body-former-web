export type Lang = "tr" | "en";

export const content = {
  tr: {
    nav: {
      how: "Nasıl Çalışır",
      features: "Özellikler",
      compete: "Rekabet",
      gyms: "Salonlar",
      faq: "SSS",
      cta: "Erken Erişim",
    },
    hero: {
      badge: "Pre-Launch · 2026",
      title: "BodyFormer",
      tagline: "Rekabetçi vücut gelişim takip uygulaması.",
      subtitle:
        "Donanımsız 3D dijital ikiz, doğrulanmış sosyal rekabet ve ödüllü klan ligleri. Sadece telefon kameran.",
      emailPlaceholder: "E-posta adresin",
      emailCta: "Listeye katıl",
      emailNote: "Lansman için ilk sen haberdar ol. Spam yok.",
      stat1: "8 Fotoğraf",
      stat1sub: "Donanım gerekmez",
      stat2: "16 Ölçüm",
      stat2sub: "Saniyeler içinde",
      stat3: "3D Avatar",
      stat3sub: "Kişiye özel dijital ikiz",
    },
    viewer: {
      loading: "3D model yükleniyor…",
      error: "3D model bu cihazda görüntülenemedi.",
      hint: "Döndürmek için sürükle",
      caption: "Gerçek bir BodyFormer taraması — 3DGS avatar",
    },
    problem: {
      eyebrow: "01 · Problem",
      title:
        "Geleneksel sistemler gerçek gelişimi göstermiyor.",
      lead: "Tartı yanıltır, ayna alışır, pahalı cihazlar sadece tablo verir. Gelişimi objektif ve görsel kanıta dönüştüren bir platform yoktu.",
      cards: [
        {
          tag: "Yanıltıcı tartılar",
          body: "Yağ kaybedip kas kazanan kişi tartıda hareket görmez. Motivasyon düşer, spor bırakılır.",
        },
        {
          tag: "Sosyal kanıt açığı",
          body: "Gelişimi doğrulayan bir platform yok. Mevcut kanal: filtreli Instagram fotoğrafları.",
        },
        {
          tag: "Görünmeyen değişim",
          body: "Aynaya her gün bakılır, değişim fark edilmez. Aylar süren ilerleme gözden kaçar.",
        },
        {
          tag: "Pahalı cihaz tuzağı",
          body: "Salonlar on binlerce dolarlık cihazlara mahkum. Çıktı: görsel kanıtı olmayan 2D tablolar.",
        },
      ],
    },
    how: {
      eyebrow: "02 · Nasıl Çalışır",
      title: "Dört adımda dijital ikizin.",
      lead: "Özel donanım, sensör ya da arka plan perdesi gerekmez. Sadece telefonunla.",
      steps: [
        {
          n: "01",
          t: "Tara",
          d: "Telefon kamerasıyla 8 açıdan fotoğraf çek. Saniyeler sürer.",
        },
        {
          n: "02",
          t: "AI İşler",
          d: "Tescilli AI pipeline silüet, derinlik ve uzuv haritasını çıkarır.",
        },
        {
          n: "03",
          t: "Sonuç",
          d: "16 vücut ölçüsü ve fotogerçekçi 3D avatarın ekrana düşer.",
        },
        {
          n: "04",
          t: "Yarış",
          d: "Salonun bir klan olur; aylık savaşlarda Coin ve rank kazan.",
        },
      ],
    },
    twin: {
      eyebrow: "03 · Dijital İkiz",
      title: "8 fotoğraf. 3D model. 16 ölçüm.",
      lead: "Gelişimin rakamların ötesinde görsel kanıta dönüşüyor. Ham görüntülerin senin cihazında şifreli kalır.",
      deckHint: "8 giriş fotoğrafı · üstüne gel",
      appPreview: "Uygulamadan",
      measurementsTitle: "16 Bölge Ölçümü",
      pipeline: {
        eyebrow: "Fotoğraftan modele",
        title: "8 fotoğraf, saniyeler içinde 3D modele dönüşüyor.",
        lead: "Tescilli AI pipeline her fotoğraftan silüet, derinlik ve normal haritası çıkarır; bunları birleştirip dokulu 3D avatarı oluşturur.",
        steps: ["Giriş fotoğrafı", "AI · Normal harita", "3D Model"],
      },
      measurements: [
        "Boyun çevresi",
        "Omuz genişliği",
        "Göğüs çevresi",
        "Bel çevresi",
        "Kalça çevresi",
        "Bicep çevresi",
        "Ön kol çevresi",
        "Bilek çevresi",
        "Dirsek çevresi",
        "Üst bacak çevresi",
        "Baldır çevresi",
        "Ayak bileği çevresi",
        "Üst bacak uzunluğu",
        "Alt bacak uzunluğu",
        "Boy",
        "Vücut hacmi",
      ],
    },
    compete: {
      eyebrow: "04 · Rekabet",
      title: "Klan savaşları. Doğrulanmış rekabet.",
      lead: "Her spor salonu bir klandır. Filtreli fotoğraflar değil, BodyFormer onaylı gerçek 3D modeller yarışır.",
      cards: [
        {
          t: "Salon İçi (Intra-Klan)",
          d: "Üyeler kendi klanlarında aylık BodyFormer Skoru ile yarışır. Ay sonu ilk 3 Coin kazanır.",
        },
        {
          t: "Salonlar Arası (Inter-Klan)",
          d: "Aktif üyeler karşı klandan bir rakip seçip düelloya girer. Galip, klanına puan kazandırır.",
        },
        {
          t: "Streak Madalyonları",
          d: "Sürekli kazanan kişi ve klanlara özel rozetler ve streak madalyonları tanımlanır.",
        },
      ],
    },
    coin: {
      eyebrow: "05 · Ekonomi",
      title: "BodyFormer Coin ile ödüllü döngü.",
      lead: "Rekabeti gerçek bir ödül döngüsüne çeviriyoruz. Kazandığın Coin'leri partner supplement markalarında ürün ve indirime çevir.",
      rows: [
        { a: "Disiplin (4 taramayı tamamla)", c: "200" },
        { a: "Intra-klan 1. / 2. / 3.", c: "1.000 / 600 / 400" },
        { a: "Inter-klan galibiyeti", c: "300" },
        { a: "Arkadaş daveti", c: "500" },
      ],
      note: "BodyFormer Coin kapalı-devre bir sadakat puanıdır — kripto para veya blockchain değildir.",
      rewardsTitle: "Coin'lerini gerçek ödüllere çevir",
      rewardsLead: "Partner supplement markalarından ürün ve indirimler — taradıkça kazan, harcadıkça al.",
      products: [
        { name: "Protein Tozu", note: "Partner markalardan" },
        { name: "Protein Saşe", note: "Tek kullanımlık paket" },
      ],
      productHint: "Döndürmek için sürükle",
    },
    privacy: {
      eyebrow: "06 · Gizlilik",
      title: "Tasarımdan gelen gizlilik.",
      lead: "Ham fotoğrafların ve 3D taramaların, sen paylaşmayı seçmedikçe geliştiriciler dahil kimse tarafından görülemez.",
      points: [
        {
          t: "Anahtar cihazda kalır",
          d: "Şifre çözme anahtarı yalnızca senin cihazında saklanır, sunucuya çıkmaz.",
        },
        {
          t: "Uçtan uca şifreli",
          d: "Cihaz–sunucu iletişiminden yalnızca şifrelenmiş veri geçer.",
        },
        {
          t: "Sıfır-bilgi (Zero-Knowledge)",
          d: "Veriler sunucuda sıfır-bilgi mantığıyla şifreli durur. Biz bile göremeyiz.",
        },
      ],
    },
    showcase: {
      eyebrow: "07 · Uygulama",
      title: "Cebinde bir gelişim laboratuvarı.",
      lead: "Her ölçümün zaman içindeki seyrini izle, body fat trendini gör, klanında yüksel.",
      highlights: [
        { v: "16 ölçüm", s: "Her taramada" },
        { v: "Aylık trend", s: "Body fat & çevreler" },
        { v: "Klan ligi", s: "Sıralama & ödül" },
        { v: "Şifreli", s: "Sadece sende" },
      ],
    },
    gyms: {
      eyebrow: "08 · Salonlar İçin",
      title: "Salonunu bir klana dönüştür.",
      lead: "Üyelerine gelişimlerini kanıtla, bağlılığı artır. On binlerce dolarlık cihazlara gerek yok — sadece BodyFormer.",
      bullets: [
        "Üye tutundurma ve bağlılık motoru",
        "Salon-entegre resmi lig altyapısı",
        "Görsel + ölçümsel ilerleme kanıtı",
        "Kademeli, esnek lisanslama",
      ],
      cta: "Salonun için iletişime geç",
    },
    waitlist: {
      eyebrow: "Erken Erişim",
      title: "Lansmanda ilk sen ol.",
      lead: "Erken erişim listesine katıl. Çıktığımızda haber verelim.",
      placeholder: "E-posta adresin",
      cta: "Listeye katıl",
      success: "Teşekkürler! Listeye eklendin.",
      note: "Formlar şu an demo amaçlıdır.",
    },
    faq: {
      eyebrow: "09 · SSS",
      title: "Sık sorulan sorular.",
      items: [
        {
          q: "Özel bir cihaza ihtiyacım var mı?",
          a: "Hayır. Sadece akıllı telefon kameran yeterli. Sensör, giyilebilir teknoloji ya da arka plan perdesi gerekmez.",
        },
        {
          q: "Ölçümler ne kadar doğru?",
          a: "Gövde çevrelerinde gerçek kullanıcı hedefimiz ~1 cm ortalama mutlak hata. mm-altı hassasiyet iddia etmiyoruz.",
        },
        {
          q: "Fotoğraflarımı kim görebiliyor?",
          a: "Sen paylaşmayı seçmedikçe kimse. Şifre çözme anahtarı yalnızca cihazında kalır; veriler sunucuda sıfır-bilgi mantığıyla şifreli durur.",
        },
        {
          q: "BodyFormer Coin kripto para mı?",
          a: "Hayır. Coin kapalı-devre bir uygulama içi sadakat puanıdır; ekosistem dışında karşılığı yoktur ve nakde çevrilemez.",
        },
        {
          q: "Ne zaman çıkacak?",
          a: "2026'da Türkiye'de pilot ile başlıyoruz. Erken erişim listesine katıl, ilk sen haberdar ol.",
        },
      ],
    },
    footer: {
      tagline: "Rekabetçi vücut gelişim takip uygulaması.",
      contact: "İletişim",
      product: "Ürün",
      legal: "Yasal",
      links: {
        how: "Nasıl Çalışır",
        features: "Özellikler",
        compete: "Rekabet",
        gyms: "Salonlar",
        faq: "SSS",
        privacy: "Gizlilik Politikası",
        terms: "Kullanım Koşulları",
      },
      rights: "Tüm hakları saklıdır.",
    },
  },

  en: {
    nav: {
      how: "How it works",
      features: "Features",
      compete: "Compete",
      gyms: "For Gyms",
      faq: "FAQ",
      cta: "Get early access",
    },
    hero: {
      badge: "Pre-Launch · 2026",
      title: "BodyFormer",
      tagline: "The competitive body-growth tracking app.",
      subtitle:
        "A hardware-free 3D digital twin, verified social competition, and reward-driven clan leagues. Just your phone camera.",
      emailPlaceholder: "Your email",
      emailCta: "Join the list",
      emailNote: "Be first to know at launch. No spam.",
      stat1: "8 Photos",
      stat1sub: "No hardware needed",
      stat2: "16 Measurements",
      stat2sub: "In seconds",
      stat3: "3D Avatar",
      stat3sub: "Your personal digital twin",
    },
    viewer: {
      loading: "Loading 3D model…",
      error: "The 3D model couldn't be displayed on this device.",
      hint: "Drag to rotate",
      caption: "A real BodyFormer scan — 3DGS avatar",
    },
    problem: {
      eyebrow: "01 · Problem",
      title: "Traditional systems don't show real progress.",
      lead: "Scales mislead, mirrors adapt, expensive machines only print tables. There was no platform turning progress into objective, visual proof.",
      cards: [
        {
          tag: "Misleading scales",
          body: "Someone losing fat and gaining muscle sees no movement on the scale. Motivation drops, training stops.",
        },
        {
          tag: "Social proof gap",
          body: "No platform verifies progress. The current channel: filtered Instagram photos.",
        },
        {
          tag: "Invisible change",
          body: "You look in the mirror daily and miss the change. Months of progress go unnoticed.",
        },
        {
          tag: "Costly hardware trap",
          body: "Gyms are stuck with tens-of-thousands-of-dollar machines. Output: 2D tables with no visual proof.",
        },
      ],
    },
    how: {
      eyebrow: "02 · How it works",
      title: "Your digital twin in four steps.",
      lead: "No special hardware, sensors, or backdrop required. Just your phone.",
      steps: [
        {
          n: "01",
          t: "Scan",
          d: "Capture 8 angles with your phone camera. Takes seconds.",
        },
        {
          n: "02",
          t: "AI Engine",
          d: "A proprietary AI pipeline extracts silhouette, depth and a limb map.",
        },
        {
          n: "03",
          t: "Result",
          d: "16 body measurements and a photorealistic 3D avatar appear.",
        },
        {
          n: "04",
          t: "Compete",
          d: "Your gym becomes a clan; earn Coin and rank in monthly battles.",
        },
      ],
    },
    twin: {
      eyebrow: "03 · Digital Twin",
      title: "8 photos. A 3D model. 16 measurements.",
      lead: "Your progress becomes visual proof beyond the numbers. Your raw images stay encrypted on your device.",
      deckHint: "8 input photos · hover to open",
      appPreview: "From the app",
      measurementsTitle: "16 Region Measurements",
      pipeline: {
        eyebrow: "From photo to model",
        title: "8 photos become a 3D model in seconds.",
        lead: "A proprietary AI pipeline extracts a silhouette, depth and a normal map from each photo, then fuses them into a textured 3D avatar.",
        steps: ["Input photo", "AI · Normal map", "3D Model"],
      },
      measurements: [
        "Neck circumference",
        "Shoulder width",
        "Chest circumference",
        "Waist circumference",
        "Hip circumference",
        "Bicep circumference",
        "Forearm circumference",
        "Wrist circumference",
        "Elbow circumference",
        "Thigh circumference",
        "Calf circumference",
        "Ankle circumference",
        "Upper leg length",
        "Lower leg length",
        "Height",
        "Body volume",
      ],
    },
    compete: {
      eyebrow: "04 · Compete",
      title: "Clan wars. Verified competition.",
      lead: "Every gym is a clan. Not filtered photos — real, BodyFormer-verified 3D models compete.",
      cards: [
        {
          t: "Intra-Clan",
          d: "Members compete on monthly BodyFormer Score within their own clan. Top 3 earn Coin at month-end.",
        },
        {
          t: "Inter-Clan",
          d: "Active members pick a rival from the opposing clan and duel. The winner scores points for their clan.",
        },
        {
          t: "Streak Medallions",
          d: "Consistent winners — people and clans — unlock exclusive badges and streak medallions.",
        },
      ],
    },
    coin: {
      eyebrow: "05 · Economy",
      title: "A reward loop powered by BodyFormer Coin.",
      lead: "We turn competition into a real reward loop. Convert the Coin you earn into products and discounts from partner supplement brands.",
      rows: [
        { a: "Discipline (complete 4 scans)", c: "200" },
        { a: "Intra-clan 1st / 2nd / 3rd", c: "1,000 / 600 / 400" },
        { a: "Inter-clan win", c: "300" },
        { a: "Referral", c: "500" },
      ],
      note: "BodyFormer Coin is a closed-loop loyalty point — it is not a cryptocurrency or blockchain.",
      rewardsTitle: "Turn your Coin into real rewards",
      rewardsLead: "Products and discounts from partner supplement brands — earn by scanning, redeem by spending.",
      products: [
        { name: "Protein Powder", note: "From partner brands" },
        { name: "Protein Sachet", note: "Single-serve pack" },
      ],
      productHint: "Drag to rotate",
    },
    privacy: {
      eyebrow: "06 · Privacy",
      title: "Privacy by design.",
      lead: "Your raw photos and 3D scans are visible to no one — including the developers — unless you choose to share them.",
      points: [
        {
          t: "The key stays on-device",
          d: "Your decryption key is stored only on your device and never leaves it.",
        },
        {
          t: "End-to-end encrypted",
          d: "Only encrypted data ever moves between your device and the server.",
        },
        {
          t: "Zero-Knowledge",
          d: "Data rests on the server with zero-knowledge encryption. Not even we can read it.",
        },
      ],
    },
    showcase: {
      eyebrow: "07 · The App",
      title: "A progress lab in your pocket.",
      lead: "Track every measurement over time, watch your body-fat trend, and climb your clan.",
      highlights: [
        { v: "16 metrics", s: "Every scan" },
        { v: "Monthly trend", s: "Body fat & girths" },
        { v: "Clan league", s: "Ranks & rewards" },
        { v: "Encrypted", s: "Yours only" },
      ],
    },
    gyms: {
      eyebrow: "08 · For Gyms",
      title: "Turn your gym into a clan.",
      lead: "Prove progress to your members and boost retention. No tens-of-thousands-of-dollar machines — just BodyFormer.",
      bullets: [
        "Member retention & engagement engine",
        "Gym-integrated official league infrastructure",
        "Visual + measurable proof of progress",
        "Tiered, flexible licensing",
      ],
      cta: "Get in touch for your gym",
    },
    waitlist: {
      eyebrow: "Early Access",
      title: "Be first at launch.",
      lead: "Join the early access list and we'll let you know the moment we go live.",
      placeholder: "Your email",
      cta: "Join the list",
      success: "Thanks! You're on the list.",
      note: "Forms are currently for demo purposes.",
    },
    faq: {
      eyebrow: "09 · FAQ",
      title: "Frequently asked questions.",
      items: [
        {
          q: "Do I need any special hardware?",
          a: "No. Just your smartphone camera. No sensors, wearables, or backdrop required.",
        },
        {
          q: "How accurate are the measurements?",
          a: "Our target for real users on body circumferences is ~1 cm mean absolute error. We do not claim sub-millimeter precision.",
        },
        {
          q: "Who can see my photos?",
          a: "No one, unless you choose to share. Your decryption key stays on your device; data rests on the server with zero-knowledge encryption.",
        },
        {
          q: "Is BodyFormer Coin a cryptocurrency?",
          a: "No. Coin is a closed-loop in-app loyalty point with no value outside the ecosystem, and it can't be cashed out.",
        },
        {
          q: "When does it launch?",
          a: "We're starting with a pilot in Turkey in 2026. Join the early access list to be the first to know.",
        },
      ],
    },
    footer: {
      tagline: "The competitive body-growth tracking app.",
      contact: "Contact",
      product: "Product",
      legal: "Legal",
      links: {
        how: "How it works",
        features: "Features",
        compete: "Compete",
        gyms: "For Gyms",
        faq: "FAQ",
        privacy: "Privacy Policy",
        terms: "Terms of Use",
      },
      rights: "All rights reserved.",
    },
  },
};

export type Content = (typeof content)["tr"];
