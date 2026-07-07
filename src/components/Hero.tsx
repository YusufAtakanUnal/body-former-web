"use client";

import { useRef } from "react";
import { useLang } from "@/i18n/LanguageProvider";
import EmailForm from "./EmailForm";

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;
  const videoRef = useRef<HTMLVideoElement>(null);

  const replay = () => {
    const video = videoRef.current;
    if (!video || !video.paused) return;
    video.currentTime = 0;
    video.play();
  };

  return (
    <section
      id="top"
      className="relative px-5 pb-24 pt-32 sm:px-8 sm:pt-40"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
          {h.badge}
        </span>

        <h1 className="mt-7 text-6xl font-bold leading-[0.95] tracking-tight sm:text-8xl">
          {h.title}
        </h1>

        <video
          ref={videoRef}
          src="/screens/logo-video.mp4"
          autoPlay
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
          onMouseEnter={replay}
          className="mt-6 h-[144px] w-auto mix-blend-multiply sm:h-[202px]"
        />

        <div className="rule mt-7" />

        <p className="mt-7 max-w-xl text-2xl font-medium leading-snug sm:text-3xl">
          {h.tagline}
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {h.subtitle}
        </p>

        <div className="mt-9 w-full max-w-md">
          <EmailForm
            placeholder={h.emailPlaceholder}
            cta={h.emailCta}
            success={t.waitlist.success}
          />
          <p className="mt-2.5 text-xs text-muted">{h.emailNote}</p>
        </div>

        <dl className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-6 border-t border-line pt-8">
          {[
            { v: h.stat1, s: h.stat1sub },
            { v: h.stat2, s: h.stat2sub },
            { v: h.stat3, s: h.stat3sub },
          ].map((stat) => (
            <div key={stat.v}>
              <dt className="text-xl font-bold leading-tight sm:text-2xl">
                {stat.v}
              </dt>
              <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">
                {stat.s}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
