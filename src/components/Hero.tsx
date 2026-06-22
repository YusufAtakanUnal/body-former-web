"use client";

import dynamic from "next/dynamic";
import { useLang } from "@/i18n/LanguageProvider";
import EmailForm from "./EmailForm";

// WebGL + workers — load only on the client, after the page paints.
const SplatViewer = dynamic(() => import("./SplatViewer"), {
  ssr: false,
});

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pt-36"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left: copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted">
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

        {/* Right: interactive 3D Gaussian-splat scan */}
        <div className="relative mx-auto w-full max-w-110">
          <div className="absolute -inset-8 -z-10 rounded-full bg-surface blur-2xl" />
          <SplatViewer src="/screens/demir.ply" className="aspect-3/4 w-full" />
          <p className="mt-3 text-center text-xs text-muted">
            {t.viewer.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
