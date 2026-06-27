"use client";

import { useRef, useState } from "react";

type Props = {
  photos: string[];
  masks: string[];
  photoLabel: string;
  maskLabel: string;
  hint: string;
  className?: string;
};

/**
 * Two image sets (input photos + AI normal maps) shown side by side. Moving
 * the mouse left/right over the area scrubs both through their frames in sync —
 * as if orbiting around the subject in the centre. Drag works on touch.
 */
export default function SpinShowcase({
  photos,
  masks,
  photoLabel,
  maskLabel,
  hint,
  className = "",
}: Props) {
  const n = Math.min(photos.length, masks.length);
  const [idx, setIdx] = useState(Math.floor((n - 1) / 2));
  const ref = useRef<HTMLDivElement | null>(null);

  const scrub = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = Math.min(0.9999, Math.max(0, (clientX - r.left) / r.width));
    setIdx(Math.floor(p * n));
  };

  return (
    <div className={className}>
      <div
        ref={ref}
        onMouseMove={(e) => scrub(e.clientX)}
        onTouchStart={(e) => scrub(e.touches[0].clientX)}
        onTouchMove={(e) => {
          e.preventDefault();
          scrub(e.touches[0].clientX);
        }}
        className="grid cursor-ew-resize grid-cols-2 gap-3 sm:gap-4"
      >
        <Frame srcs={photos} idx={idx} alt={photoLabel} />
        <Frame srcs={masks} idx={idx} alt={maskLabel} dark />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 px-1">
        <div className="flex gap-6 text-sm font-semibold">
          <span>{photoLabel}</span>
          <span>{maskLabel}</span>
        </div>
        <span className="shrink-0 rounded-full bg-foreground/8 px-2.5 py-1 text-[11px] font-medium text-muted">
          {hint}
        </span>
      </div>

      {/* frame indicator */}
      <div className="mt-3 flex justify-center gap-1.5">
        {Array.from({ length: n }).map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all ${
              i === idx ? "w-5 bg-foreground" : "w-1.5 bg-foreground/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Frame({
  srcs,
  idx,
  alt,
  dark = false,
}: {
  srcs: string[];
  idx: number;
  alt: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`relative aspect-[3/4] w-full overflow-hidden rounded-2xl border shadow-[0_22px_50px_-24px_rgba(0,0,0,0.4)] ring-1 ring-black/5 ${
        dark ? "border-foreground bg-foreground" : "border-line bg-white"
      }`}
    >
      {srcs.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={alt}
          draggable={false}
          className={`absolute inset-0 h-full w-full transition-opacity duration-100 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
          style={{
            objectFit: dark ? "contain" : "cover",
            objectPosition: dark ? "center" : "center 28%",
          }}
        />
      ))}
    </div>
  );
}
