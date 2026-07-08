"use client";

import { useEffect, useRef, useState } from "react";

type Labels = {
  input: string;
  aiEngine: string;
  normal: string;
  output: string;
};

type Props = {
  photos: string[];
  normals: string[];
  video: string;
  labels: Labels;
  className?: string;
};

/**
 * One compact, self-playing pipeline: the 8 input photos auto-cycle; the AI
 * normal map syncs to the same angle; the 3D model plays as the output. The
 * photos advance once per (model-video length / 8), so one full photo loop
 * lines up with one loop of the model video. Hovering the photo/normal region
 * pauses the cycle; leaving resumes it. Images float (no boxy cards) — the
 * normal map and model are transparent / white-blended so only the figure shows.
 */
export default function TwinPipeline({
  photos,
  normals,
  video,
  labels,
  className = "",
}: Props) {
  const n = Math.min(photos.length, normals.length);
  const [i, setI] = useState(0);
  const pausedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Per-photo interval (ms); starts with a sensible default and is refined to
  // (video duration / n) once the model video reports its metadata.
  const [stepMs, setStepMs] = useState(1200);

  useEffect(() => {
    if (n <= 1) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setI((x) => (x + 1) % n);
    }, stepMs);
    return () => window.clearInterval(id);
  }, [n, stepMs]);

  const onMeta = () => {
    const d = videoRef.current?.duration;
    if (d && Number.isFinite(d) && d > 0 && n > 0) {
      setStepMs((d / n) * 1000);
    }
  };

  return (
    <div className={className}>
      {/* Always a horizontal row, sized to fit the viewport — no scrolling.
          Hovering pauses the auto-cycle. */}
      <div
        className="flex flex-row items-center justify-center gap-1.5 sm:gap-2 lg:gap-4"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        {/* Stage 1 — input photo, auto-cycling */}
        <div className="min-w-0 flex-1 sm:w-40 sm:flex-none md:w-52 lg:w-full lg:max-w-[240px]">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-[0_24px_50px_-24px_rgba(0,0,0,0.5)]">
            {photos.map((src, idx) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={labels.input}
                draggable={false}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  idx === i ? "opacity-100" : "opacity-0"
                }`}
                style={{ objectPosition: "center 25%" }}
              />
            ))}
            {/* Progress dots (non-interactive) */}
            <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-foreground/70 px-1.5 py-0.5 backdrop-blur sm:bottom-2 sm:gap-1.5 sm:px-2 sm:py-1">
              {photos.slice(0, n).map((src, idx) => (
                <span
                  key={src}
                  className={`h-1 w-1 rounded-full transition-colors sm:h-1.5 sm:w-1.5 ${
                    idx === i ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="mt-1.5 text-center text-[10px] font-semibold sm:mt-3 sm:text-sm">
            {labels.input}
          </p>
        </div>

        <Arrow label={labels.aiEngine} />

        {/* Stage 2 — AI normal map (transparent, floats) */}
        <div className="min-w-0 flex-1 sm:w-40 sm:flex-none md:w-52 lg:w-full lg:max-w-[240px]">
          <div className="relative aspect-[3/4] w-full">
            {normals.map((src, idx) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={labels.normal}
                draggable={false}
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
                  idx === i ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          <p className="mt-1.5 text-center text-[10px] font-semibold sm:mt-3 sm:text-sm">
            {labels.normal}
          </p>
        </div>

        <Arrow />

        {/* Stage 3 — 3D model output (white-blended, floats). The source
            video frames the figure a bit small, so scale it up slightly
            (clipped by the overflow-hidden wrapper) to match the visual
            weight of the other two stages. */}
        <div className="min-w-0 flex-1 sm:w-40 sm:flex-none md:w-52 lg:w-full lg:max-w-[240px]">
          <div className="aspect-[3/4] w-full overflow-hidden">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              ref={videoRef}
              src={video}
              autoPlay
              loop
              muted
              playsInline
              onLoadedMetadata={onMeta}
              className="h-full w-full scale-[1.12] object-contain"
            />
          </div>
          <p className="mt-1.5 text-center text-[10px] font-semibold sm:mt-3 sm:text-sm">
            {labels.output}
          </p>
        </div>
      </div>
    </div>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center justify-center gap-1 text-muted">
      {label && (
        <span className="hidden text-center text-[10px] font-semibold uppercase tracking-wider sm:inline">
          {label}
        </span>
      )}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-[14px] w-[14px] shrink-0 sm:h-7 sm:w-7"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </div>
  );
}
