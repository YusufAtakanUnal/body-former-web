import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

const siteUrl = "https://bodyformer.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Browser tab shows just the brand name.
  title: "BodyFormer",
  description:
    "Donanımsız 3D dijital ikiz, doğrulanmış sosyal rekabet ve ödüllü klan ligleri. Sadece telefon kameranla 8 fotoğraf → 3D model + 16 ölçüm.",
  keywords: [
    "BodyFormer",
    "vücut takip",
    "3D body scan",
    "body tracking",
    "fitness app",
    "digital twin",
    "body measurement",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "BodyFormer",
    title: "BodyFormer — Rekabetçi Vücut Gelişim Takip Uygulaması",
    description:
      "Donanımsız 3D dijital ikiz, doğrulanmış sosyal rekabet ve ödüllü klan ligleri.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BodyFormer",
    description:
      "Rekabetçi vücut gelişim takip uygulaması. Sadece telefon kameran.",
  },
  // No favicon — show a blank tab icon (empty SVG), not the default logo.
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>",
  },
};

// Structured data so Google recognises the brand "BodyFormer".
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "BodyFormer",
      url: siteUrl,
      email: "iletisim@bodyformer.com",
      description:
        "Rekabetçi vücut gelişim takip uygulaması. Donanımsız 3D dijital ikiz, doğrulanmış sosyal rekabet ve ödüllü klan ligleri.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "BodyFormer",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "tr-TR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
