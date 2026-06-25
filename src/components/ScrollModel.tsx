"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** rotating model video under /public */
  src: string;
};

/**
 * The 3D model as a fixed background on the right of the hero.
 * - Scrolling scrubs the video → the model rotates.
 * - After ~1 screen of scroll it slowly fades out and disappears.
 * - Text stays in normal flow on the left (this sits behind it, z-0).
 *
 * On touch / small screens video scrubbing is unreliable, so there we just
 * autoplay-loop the clip (it still rotates) and let it fade with scroll.
 */
export default function ScrollModel({ src }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    // This fixed model is desktop-only (hidden < md). Mobile uses a separate
    // inline video, so skip all work on small screens.
    if (window.matchMedia("(max-width: 767px)").matches) return;

    let duration = 0;
    let ticking = false;

    const onMeta = () => {
      duration = video.duration || 0;
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    // Prime then pause so we can seek frame-by-frame on scroll.
    video.muted = true;
    video.play().then(() => video.pause()).catch(() => {});

    const update = () => {
      ticking = false;
      const H = window.innerHeight || 1;
      const y = window.scrollY;

      // Rotate by scrubbing across the first ~1.1 screens.
      if (duration) {
        const p = Math.min(1, Math.max(0, y / (H * 1.1)));
        const t = p * (duration - 0.05);
        if (Math.abs(video.currentTime - t) > 0.012) {
          try {
            video.currentTime = t;
          } catch {
            /* seek not ready yet */
          }
        }
      }

      // Fade out between ~0.8 and ~1.25 screens — within the hero, before
      // the next section scrolls up under it.
      const fade = Math.min(1, Math.max(0, (y - H * 0.8) / (H * 0.45)));
      const opacity = 1 - fade;
      wrap.style.opacity = opacity.toFixed(3);
      wrap.style.visibility = opacity <= 0.01 ? "hidden" : "visible";
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [src]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed inset-y-0 right-0 z-0 hidden w-[52%] items-center justify-center md:flex lg:w-[50%]"
    >
      {/* soft halo behind the model */}
      <div className="absolute h-[70%] w-[70%] rounded-full bg-surface blur-3xl" />
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        className="relative h-[78vh] max-h-190 w-full object-contain"
      />
    </div>
  );
}
