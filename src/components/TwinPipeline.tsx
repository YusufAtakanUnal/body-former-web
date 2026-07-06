"use client";

import { useState } from "react";

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
 * One compact, interactive pipeline: arrow through the 8 input photos; the
 * AI normal map syncs to the same angle; the 3D model plays as the output.
 * Images float (no boxy cards) — the normal map and model are transparent /
 * white-blended so only the figure shows.
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
  const go = (d: number) => setI((x) => (x + d + n) % n);

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-2 lg:gap-4">
        {/* Stage 1 — input photo, arrow-navigable */}
        <div className="w-full max-w-[240px]">
          <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-[0_24px_50px_-24px_rgba(0,0,0,0.5)]">
            {photos.map((src, idx) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={labels.input}
                draggable={false}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-150 ${
                  idx === i ? "opacity-100" : "opacity-0"
                }`}
                style={{ objectPosition: "center 25%" }}
              />
            ))}
            <button
              onClick={() => go(-1)}
              aria-label="Önceki"
              className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-foreground shadow-md backdrop-blur transition hover:bg-white"
            >
              <Chevron dir="left" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Sonraki"
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-foreground shadow-md backdrop-blur transition hover:bg-white"
            >
              <Chevron dir="right" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-foreground/80 px-2.5 py-0.5 font-mono text-[11px] text-white backdrop-blur">
              {i + 1} / {n}
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
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-150 ${
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
              src={video}
              autoPlay
              loop
              muted
              playsInline
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

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
  );
}
