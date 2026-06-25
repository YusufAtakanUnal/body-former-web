"use client";

import { useState } from "react";

type Props = {
  /** image srcs under /public, in order */
  photos: string[];
  className?: string;
};

/**
 * A stack of photos that sits like a held deck and fans open on hover/tap —
 * "as if I opened the deck in my hand". Used for the 8 input photos.
 */
export default function FanDeck({ photos, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const n = photos.length;
  const mid = (n - 1) / 2;

  return (
    <div
      className={`relative select-none ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
      tabIndex={0}
      role="button"
      aria-label="Giriş fotoğrafları"
    >
      {/* sizing box — cards are absolutely centered within */}
      <div className="relative mx-auto h-64 w-72 sm:h-72 sm:w-80">
        {photos.map((src, i) => {
          const offset = i - mid; // negative = left, positive = right
          // Closed: a tight, slightly messy stack. Open: a hand-held fan.
          const rot = open ? offset * 7 : offset * 2.2;
          const tx = open ? offset * 36 : offset * 4;
          const ty = open ? Math.abs(offset) * 5 : Math.abs(offset) * 0.5;
          return (
            <div
              key={src}
              className="absolute left-1/2 top-1/2 h-56 w-42 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_18px_40px_-16px_rgba(0,0,0,0.45)] ring-1 ring-black/5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:h-64 sm:w-48"
              style={{
                zIndex: i,
                transformOrigin: "50% 92%",
                transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px) rotate(${rot}deg)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Giriş fotoğrafı ${i + 1}`}
                draggable={false}
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
