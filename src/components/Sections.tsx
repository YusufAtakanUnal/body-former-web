"use client";

import { useLang } from "@/i18n/LanguageProvider";
import Reveal from "./Reveal";
import EmailForm from "./EmailForm";

export function SectionHead({
  eyebrow,
  title,
  lead,
  invert = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  invert?: boolean;
}) {
  return (
    <Reveal className="max-w-3xl">
      <span className={`eyebrow ${invert ? "!text-white/55" : ""}`}>
        {eyebrow}
      </span>
      <div className={`rule mt-4 ${invert ? "!bg-white" : ""}`} />
      <h2
        className={`mt-5 text-3xl font-bold leading-[1.05] tracking-tight sm:text-[2.7rem] ${
          invert ? "text-white" : ""
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            invert ? "text-white/65" : "text-muted"
          }`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}

/* ---------------- For Gyms ---------------- */
export function Gyms() {
  const { t } = useLang();
  const g = t.gyms;
  return (
    <section id="gyms" className="border-t border-line px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow={g.eyebrow} title={g.title} lead={g.lead} />
          <Reveal className="mt-8">
            <a
              href="mailto:iletisim@bodyformer.com"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {g.cta}
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
        <Reveal>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {g.bullets.map((b) => (
              <li
                key={b}
                className="flex items-center gap-4 bg-white px-6 py-5 text-sm font-medium"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-white">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Waitlist CTA band ---------------- */
export function Waitlist() {
  const { t } = useLang();
  const w = t.waitlist;
  return (
    <section
      id="waitlist"
      className="bg-foreground px-5 py-24 text-white sm:px-8"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow !text-white/55">{w.eyebrow}</span>
        <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {w.title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-white/65">{w.lead}</p>
        <div className="mx-auto mt-8 max-w-md">
          <EmailForm
            placeholder={w.placeholder}
            cta={w.cta}
            success={w.success}
            variant="dark"
          />
          <p className="mt-3 text-xs text-white/45">{w.note}</p>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
export function Faq() {
  const { t } = useLang();
  const f = t.faq;
  return (
    <section id="faq" className="border-t border-line px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <SectionHead eyebrow={f.eyebrow} title={f.title} />
        <div className="mt-12 divide-y divide-line border-y border-line">
          {f.items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-base font-semibold">{item.q}</span>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center text-muted transition-transform group-open:rotate-45">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 pr-8 text-sm leading-relaxed text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
