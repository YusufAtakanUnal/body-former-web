"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * Clean app-screenshot card. The screenshots are already full phone screens,
 * so we show them at their natural aspect ratio (no crop, no fake notch) inside
 * a rounded, shadowed frame. Falls back to a labelled placeholder if missing.
 */
export default function ScreenshotCard({ src, alt, className = "" }: Props) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={`overflow-hidden rounded-[1.9rem] border border-line bg-white shadow-[0_30px_60px_-22px_rgba(0,0,0,0.3)] ring-1 ring-black/5 ${className}`}
    >
      {errored ? (
        <div className="flex aspect-[9/18] w-full flex-col items-center justify-center gap-2 bg-surface px-4 text-center">
          <span className="text-xs font-medium text-muted">{src}</span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
          className="block h-auto w-full"
        />
      )}
    </div>
  );
}
