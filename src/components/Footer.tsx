"use client";

import { useLang } from "@/i18n/LanguageProvider";

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const year = 2026;

  return (
    <footer className="border-t border-line bg-white px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <span className="text-[15px] font-bold tracking-[0.16em]">
              BODYFORMER
            </span>
            <p className="mt-3 max-w-xs text-sm text-muted">{f.tagline}</p>
          </div>

          <div>
            <h3 className="eyebrow">{f.product}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#how" className="text-muted hover:text-foreground">
                  {f.links.how}
                </a>
              </li>
              <li>
                <a href="#twin" className="text-muted hover:text-foreground">
                  {f.links.features}
                </a>
              </li>
              <li>
                <a href="#compete" className="text-muted hover:text-foreground">
                  {f.links.compete}
                </a>
              </li>
              <li>
                <a href="#gyms" className="text-muted hover:text-foreground">
                  {f.links.gyms}
                </a>
              </li>
              <li>
                <a href="#faq" className="text-muted hover:text-foreground">
                  {f.links.faq}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow">{f.contact}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:iletisim@bodyformer.com"
                  className="text-muted hover:text-foreground"
                >
                  iletisim@bodyformer.com
                </a>
              </li>
              <li>
                <a href="#waitlist" className="text-muted hover:text-foreground">
                  {t.nav.cta}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {year} BodyFormer. {f.rights}
          </p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">
              {f.links.privacy}
            </a>
            <a href="#" className="hover:text-foreground">
              {f.links.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
