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
      {/* Hovering anywhere in the pipeline pauses the auto-cycle. */}
      <div
        className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-2 lg:gap-4"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        {/* Stage 1 — input photo, auto-cycling */}
        <div className="w-full max-w-[240px]">
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
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-foreground/70 px-2 py-1 backdrop-blur">
              {photos.slice(0, n).map((src, idx) => (
                <span
                  key={src}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    idx === i ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="mt-3 text-center text-sm font-semibold">
            {labels.input}
          </p>
        </div>

        <Arrow label={labels.aiEngine} />

        {/* Stage 2 — AI normal map (transparent, floats) */}
        <div className="w-full max-w-[240px]">
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
          <p className="mt-3 text-center text-sm font-semibold">
            {labels.normal}
          </p>
        </div>

        <Arrow />

        {/* Stage 3 — 3D model output (white-blended, floats) */}
        <div className="w-full max-w-[240px]">
          <div className="aspect-[3/4] w-full">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              ref={videoRef}
              src={video}
              autoPlay
              loop
              muted
              playsInline
              onLoadedMetadata={onMeta}
              className="h-full w-full object-contain"
            />
          </div>
          <p className="mt-3 text-center text-sm font-semibold">
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
        <span className="text-[10px] font-semibold uppercase tracking-wider">
          {label}
        </span>
      )}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="rotate-90 sm:rotate-0"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </div>
  );
}
