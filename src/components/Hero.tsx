"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/i18n/LanguageProvider";

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

  // If the visitor doesn't scroll within ~1.5s of the logo animation finishing,
  // glide them down to the "How it works" section. Any real scroll/keypress
  // cancels it so we never fight the user.
  useEffect(() => {
    const video = videoRef.current;
    let done = false;
    let timer = 0;
    const glide = () => {
      if (done) return;
      done = true;
      document.getElementById("how")?.scrollIntoView({ behavior: "smooth" });
    };
    const arm = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(glide, 1500);
    };
    const cancel = () => {
      done = true;
      window.clearTimeout(timer);
    };
    // Prefer the exact end of the animation; fall back to metadata duration in
    // case "ended" doesn't fire (e.g. autoplay quirks).
    const onEnded = () => arm();
    const onMeta = () => {
      if (video) {
        window.clearTimeout(timer);
        timer = window.setTimeout(glide, (video.duration || 5) * 1000 + 1500);
      }
    };
    const opts = { passive: true } as const;
    window.addEventListener("wheel", cancel, opts);
    window.addEventListener("touchmove", cancel, opts);
    window.addEventListener("keydown", cancel);
    video?.addEventListener("ended", onEnded);
    video?.addEventListener("loadedmetadata", onMeta);
    if (video?.readyState && video.readyState >= 1) onMeta();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchmove", cancel);
      window.removeEventListener("keydown", cancel);
      video?.removeEventListener("ended", onEnded);
      video?.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

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

        <dl className="mt-12 grid w-full max-w-2xl grid-cols-3 gap-6 border-t border-line pt-8">
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
