export type Lang = "tr" | "en";

export const content = {
  tr: {
    nav: {
      how: "Nasıl Çalışır",
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
      stat1: "8 Fotoğraf",
      stat1sub: "Donanım gerekmez",
      stat2: "15 Ölçüm",
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
    journey: {
      eyebrow: "01 · Nasıl Çalışır",
      title: "İndir, taran, yarış, ödülünü al.",
      lead: "BodyFormer'ın tamamı tek bir akışta — hepsi telefonunda, saniyeler içinde.",
      tabs: { scan: "Tara", compete: "Yarış", rewards: "Ödüller" },
      scan: {
        steps: [
          {
            n: "01",
            t: "İndir & abone ol",
            d: "Play Store veya App Store'dan indir, kaydol ve abone ol.",
          },
          {
            n: "02",
            t: "8 AI fotoğrafı çek",
            d: "Uygulamada 8 fotoğrafını çek, boyunu ve kilonu gir.",
          },
          {
            n: "03",
            t: "Sonucunu al",
            d: "3D modelin ve 15 ölçümün saniyeler içinde hazır.",
          },
        ],
        photoLabel: "Giriş fotoğrafı",
        aiEngine: "AI ENGINE",
        maskLabel: "Normal Maps",
        output: "3D Model",
        measurementsTitle: "15 Bölge Ölçümü",
        measurements: [
          "Boyun Çevresi",
          "Göğüs Çevresi",
          "Bel Çevresi",
          "Pazı Çevresi",
          "Dirsek Çevresi",
          "Ön Kol Çevresi",
          "Bilek Çevresi",
          "Uyluk / Orta Bacak Çevresi",
          "Baldır Çevresi",
          "Omuz Genişliği",
          "Kalça Genişliği",
          "Gövde Uzunluğu",
          "Üst Bacak Uzunluğu",
          "Alt Bacak Uzunluğu",
          "Vücut Yağı",
        ],
        privacy:
          "Fotoğrafların ve ölçümlerin uçtan uca şifrelenerek gönderilir — güvende.",
      },
      compete: {
        title: "Coin kazanmanın üç yolu.",
        lead: "Filtreli fotoğraflar değil — BodyFormer onaylı gerçek gelişimin yarışır.",
        modes: [
          {
            k: "01",
            t: "Bireysel",
            d: "Ölçümlerindeki pozitif değişimi takip et; her gelişiminde Coin kazan.",
          },
          {
            k: "02",
            t: "Klan İçi",
            d: "Klanının en çok gelişen ilk 3 üyesi arasına gir, Coin kazan.",
          },
          {
            k: "03",
            t: "Klanlar Arası",
            d: "Klanın karşı klanla savaşı kazanırsa, tüm klan Coin kazanır.",
          },
        ],
        earnTitle: "Geliştikçe Coin kazanırsın",
        earnLead:
          "Ölçümlerindeki her pozitif değişim sana BodyFormer Coin olarak döner.",
        coinLabel: "BodyFormer Coin",
      },
      rewards: {
        title: "Coin'lerini gerçek ödüllere çevir.",
        lead: "Biriken Coin'lerini anlaşmalı supplement markalarında indirime ve ürüne çevir.",
        spend: "Coin'lerini harca",
        earn: "Supplement al",
        coinLabel: "BodyFormer Coin",
        supplementLabel: "Supplement",
      },
    },
    gyms: {
      eyebrow: "03 · Salonlar İçin",
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
      zeroDayCta: "Become Zero Day Builder",
      zeroDayNote:
        "Formu doldurarak bizi ilk andan desteklediğin için başka kimsenin elde edemeyeceği bir unvan kazan.",
    },
    faq: {
      eyebrow: "02 · SSS",
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
      stat1: "8 Photos",
      stat1sub: "No hardware needed",
      stat2: "15 Measurements",
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
    journey: {
      eyebrow: "01 · How it works",
      title: "Download, scan, compete, get rewarded.",
      lead: "All of BodyFormer in one flow — on your phone, in seconds.",
      tabs: { scan: "Scan", compete: "Compete", rewards: "Rewards" },
      scan: {
        steps: [
          {
            n: "01",
            t: "Download & subscribe",
            d: "Get it on the Play Store or App Store, sign up and subscribe.",
          },
          {
            n: "02",
            t: "Take 8 AI photos",
            d: "Capture 8 photos in the app, enter your height and weight.",
          },
          {
            n: "03",
            t: "Get your result",
            d: "Your 3D model and 15 measurements are ready in seconds.",
          },
        ],
        photoLabel: "Input photo",
        aiEngine: "AI ENGINE",
        maskLabel: "Normal Maps",
        output: "3D Model",
        measurementsTitle: "15 Region Measurements",
        measurements: [
          "Neck Circumference",
          "Chest Circumference",
          "Waist Circumference",
          "Bicep Circumference",
          "Elbow Circumference",
          "Forearm Circumference",
          "Wrist Circumference",
          "Thigh Circumference",
          "Calf Circumference",
          "Shoulder Width",
          "Hip Width",
          "Torso Length",
          "Upper Leg Length",
          "Lower Leg Length",
          "Body Fat",
        ],
        privacy:
          "Your photos and measurements are sent end-to-end encrypted — safe.",
      },
      compete: {
        title: "Three ways to earn Coin.",
        lead: "Not filtered photos — your real, BodyFormer-verified progress competes.",
        modes: [
          {
            k: "01",
            t: "Individual",
            d: "Track the positive change in your measurements; earn Coin with every improvement.",
          },
          {
            k: "02",
            t: "Intra-clan",
            d: "Finish among the top 3 most-improved members of your clan to earn Coin.",
          },
          {
            k: "03",
            t: "Inter-clan",
            d: "When your clan wins its war against another clan, the whole clan earns Coin.",
          },
        ],
        earnTitle: "Earn Coin as you improve",
        earnLead:
          "Every positive change in your measurements comes back to you as BodyFormer Coin.",
        coinLabel: "BodyFormer Coin",
      },
      rewards: {
        title: "Turn your Coin into real rewards.",
        lead: "Convert the Coin you accumulate into discounts and products from partner supplement brands.",
        spend: "Spend your Coin",
        earn: "Get supplements",
        coinLabel: "BodyFormer Coin",
        supplementLabel: "Supplement",
      },
    },
    gyms: {
      eyebrow: "03 · For Gyms",
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
      zeroDayCta: "Become Zero Day Builder",
      zeroDayNote:
        "Fill out the form to support us from day one and earn a title no one else can get.",
    },
    faq: {
      eyebrow: "02 · FAQ",
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
