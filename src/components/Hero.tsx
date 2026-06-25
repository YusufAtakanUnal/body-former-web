"use client";

import dynamic from "next/dynamic";
import { useLang } from "@/i18n/LanguageProvider";
import EmailForm from "./EmailForm";

// Video + scroll math — client only.
const ScrollModel = dynamic(() => import("./ScrollModel"), { ssr: false });

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;

  return (
    <section
      id="top"
      className="relative px-5 pb-24 pt-28 sm:px-8 sm:pt-36 md:min-h-[140vh]"
    >
      {/* 3D model — fixed on the right, rotates on scroll, fades out */}
      <ScrollModel src="/screens/modelvideo.mp4" />

      {/* Hero copy — stays left, above the model */}
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1 text-xs font-semibold text-muted backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
            {h.badge}
          </span>

          <h1 className="mt-6 text-[3.4rem] font-bold leading-[0.95] tracking-tight sm:text-7xl">
            {h.title}
          </h1>

          <div className="rule mt-6" />

          <p className="mt-6 max-w-md text-xl font-medium leading-snug sm:text-2xl">
            {h.tagline}
          </p>
          <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
            {h.subtitle}
          </p>

          {/* Mobile-only inline model (desktop uses the fixed ScrollModel) */}
          <div className="mt-8 flex justify-center md:hidden">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src="/screens/modelvideo.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-[44vh] w-auto object-contain"
            />
          </div>

          <div className="mt-8 max-w-md">
            <EmailForm
              placeholder={h.emailPlaceholder}
              cta={h.emailCta}
              success={t.waitlist.success}
            />
            <p className="mt-2.5 pl-1 text-xs text-muted">{h.emailNote}</p>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
            {[
              { v: h.stat1, s: h.stat1sub },
              { v: h.stat2, s: h.stat2sub },
              { v: h.stat3, s: h.stat3sub },
            ].map((stat) => (
              <div key={stat.v}>
                <dt className="text-lg font-bold leading-tight sm:text-xl">
                  {stat.v}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-muted">
                  {stat.s}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
