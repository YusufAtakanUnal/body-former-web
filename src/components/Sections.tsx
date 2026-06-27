"use client";

import { Fragment } from "react";
import { useLang } from "@/i18n/LanguageProvider";
import Reveal from "./Reveal";
import EmailForm from "./EmailForm";
import ScreenshotCard from "./ScreenshotCard";
import SpinShowcase from "./SpinShowcase";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("./ModelViewer"), { ssr: false });

function SectionHead({
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

/* ---------------- Problem ---------------- */
export function Problem() {
  const { t } = useLang();
  const p = t.problem;
  return (
    <section id="problem" className="border-t border-line px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.cards.map((c, i) => (
            <Reveal
              as="article"
              key={c.tag}
              delay={i * 80}
              className={`flex flex-col rounded-2xl border p-6 ${
                i === 3
                  ? "border-foreground bg-foreground text-white"
                  : "border-line bg-white"
              }`}
            >
              <span
                className={`text-sm font-bold ${
                  i === 3 ? "text-white" : "text-foreground"
                }`}
              >
                {c.tag}
              </span>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  i === 3 ? "text-white/70" : "text-muted"
                }`}
              >
                {c.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */
export function How() {
  const { t } = useLang();
  const h = t.how;
  return (
    <section id="how" className="border-t border-line px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow={h.eyebrow} title={h.title} lead={h.lead} />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {h.steps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 80}
              className="flex flex-col bg-white p-7"
            >
              <span className="font-mono text-sm text-muted">{s.n}</span>
              <h3 className="mt-8 text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Digital Twin + measurements ---------------- */
const YG = Array.from({ length: 8 }, (_, i) => i + 1);

export function Twin() {
  const { t } = useLang();
  const tw = t.twin;
  return (
    <section id="twin" className="border-t border-line px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow={tw.eyebrow} title={tw.title} lead={tw.lead} />

        <div className="mt-14 grid items-start gap-14 lg:grid-cols-2">
          {/* Left: the two synced spin sets (photos + normal maps) */}
          <Reveal>
            <SpinShowcase
              photos={YG.map((i) => `/screens/yg${i}.jpeg`)}
              masks={YG.map((i) => `/screens/yg${i}_masked.png`)}
              photoLabel={tw.photoLabel}
              maskLabel={tw.maskLabel}
              hint={tw.spinHint}
            />
          </Reveal>

          {/* Right: the 16 measurements */}
          <Reveal>
            <p className="eyebrow mb-4">{tw.measurementsTitle}</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {tw.measurements.map((m) => (
                <li
                  key={m}
                  className="flex items-center gap-2.5 text-sm text-foreground"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-foreground" />
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- App showcase ---------------- */
export function AppShowcase() {
  const { t } = useLang();
  const s = t.showcase;
  return (
    <section className="border-t border-line bg-surface px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
          <Reveal className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {s.highlights.map((hl) => (
              <div key={hl.v} className="min-w-27.5">
                <p className="text-2xl font-bold tracking-tight">{hl.v}</p>
                <p className="mt-1 text-xs leading-snug text-muted">{hl.s}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="flex items-center justify-center gap-4 sm:gap-6">
          <ScreenshotCard
            src="/screens/inapp1.jpeg"
            alt="BodyFormer — tüm ölçümler ekranı"
            className="w-1/2 max-w-64 -rotate-3"
          />
          <ScreenshotCard
            src="/screens/inapp2.jpeg"
            alt="BodyFormer — ölçüm listesi ekranı"
            className="mt-8 w-1/2 max-w-64 rotate-3"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Pipeline: photo -> normal map -> 3D ---------------- */
export function Pipeline() {
  const { t } = useLang();
  const p = t.twin.pipeline;
  const stages = [
    { kind: "img", src: "/screens/yg1.jpeg", label: p.steps[0], dark: false },
    {
      kind: "img",
      src: "/screens/yg1_masked.png",
      label: p.steps[1],
      dark: true,
    },
    { kind: "video", src: "/screens/modelvideo.mp4", label: p.steps[2], dark: false },
  ];

  return (
    <section className="border-t border-line bg-surface px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow={p.eyebrow} title={p.title} lead={p.lead} />

        <div className="mt-14 flex flex-col items-center justify-center gap-5 md:flex-row md:items-stretch md:gap-3">
          {stages.map((s, i) => (
            <Fragment key={s.src}>
              <Reveal delay={i * 110} className="w-full max-w-65">
                <div
                  className={`relative aspect-3/4 w-full overflow-hidden rounded-2xl border shadow-[0_22px_50px_-22px_rgba(0,0,0,0.4)] ring-1 ring-black/5 ${
                    s.dark ? "border-foreground bg-foreground" : "border-line bg-white"
                  }`}
                >
                  <span
                    className={`absolute left-3 top-3 z-10 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold ${
                      s.dark ? "bg-white/15 text-white" : "bg-foreground/8 text-foreground"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  {s.kind === "video" ? (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video
                      src={s.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.src}
                      alt={s.label}
                      className="h-full w-full object-cover"
                      style={{
                        objectFit: s.dark ? "contain" : "cover",
                        objectPosition: s.dark ? "center" : "center 28%",
                      }}
                    />
                  )}
                </div>
                <p className="mt-3 text-center text-sm font-semibold">
                  {s.label}
                </p>
              </Reveal>

              {i < stages.length - 1 && (
                <div className="flex shrink-0 items-center justify-center self-center text-muted">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="rotate-90 md:rotate-0"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Compete / Clans ---------------- */
export function Compete() {
  const { t } = useLang();
  const c = t.compete;
  return (
    <section
      id="compete"
      className="bg-foreground px-5 py-24 text-white sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow={c.eyebrow} title={c.title} lead={c.lead} invert />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {c.cards.map((card, i) => (
            <Reveal
              as="article"
              key={card.t}
              delay={i * 80}
              className="rounded-2xl border border-white/15 bg-white/[0.04] p-7"
            >
              <span className="font-mono text-sm text-white/50">
                0{i + 1}
              </span>
              <h3 className="mt-6 text-xl font-bold text-white">{card.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {card.d}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Coin economy ---------------- */
export function Coin() {
  const { t } = useLang();
  const c = t.coin;
  const products = [
    { src: "/screens/protein_powder.glb", ...c.products[0] },
    { src: "/screens/protein_sachet.glb", ...c.products[1] },
  ];
  return (
    <section className="border-t border-line px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-2">
          <SectionHead eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
          <Reveal className="self-center">
            <div className="overflow-hidden rounded-2xl border border-line">
              {c.rows.map((row, i) => (
                <div
                  key={row.a}
                  className={`flex items-center justify-between gap-4 px-6 py-4 ${
                    i !== 0 ? "border-t border-line" : ""
                  }`}
                >
                  <span className="text-sm text-foreground">{row.a}</span>
                  <span className="flex shrink-0 items-center gap-1.5 font-mono text-sm font-semibold">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[9px] text-white">
                      ₿
                    </span>
                    {row.c}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted">{c.note}</p>
          </Reveal>
        </div>

        {/* 3D supplement rewards */}
        <Reveal className="mt-20">
          <div className="mx-auto max-w-xl text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              {c.rewardsTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {c.rewardsLead}
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
            {products.map((p) => (
              <div
                key={p.src}
                className="rounded-3xl border border-line bg-surface p-4"
              >
                <div className="aspect-square w-full">
                  <ModelViewer src={p.src} alt={p.name} className="h-full w-full" />
                </div>
                <div className="flex items-center justify-between px-2 pb-1 pt-2">
                  <div>
                    <p className="text-sm font-bold">{p.name}</p>
                    <p className="text-xs text-muted">{p.note}</p>
                  </div>
                  <span className="rounded-full bg-foreground/8 px-2.5 py-1 text-[11px] font-medium text-muted">
                    {c.productHint}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Privacy ---------------- */
export function Privacy() {
  const { t } = useLang();
  const p = t.privacy;
  return (
    <section className="border-t border-line px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {p.points.map((pt, i) => (
            <Reveal
              as="article"
              key={pt.t}
              delay={i * 80}
              className="rounded-2xl border border-line bg-surface p-7"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <rect x="4" y="11" width="16" height="9" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-bold">{pt.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{pt.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
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
