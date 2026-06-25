"use client";

import { useState } from "react";

type Props = {
  /** image srcs under /public, in order */
  photos: string[];
  className?: string;
};

/**
 * A stack of photos that sits like a held deck and fans open on hover/tap.
 * Cards are cropped toward the subject (object-position) and the open fan
 * keeps enough of each card visible that the person — not the background —
 * shows in every card.
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
      <div className="relative mx-auto h-60 w-full max-w-[480px] origin-center scale-[0.62] sm:h-64 sm:scale-100">
        {photos.map((src, i) => {
          const offset = i - mid; // - left, + right
          // Closed: tidy held stack. Open: a wide fan, ~half of each card
          // exposed so the centred subject is visible.
          const rot = open ? offset * 6 : offset * 2;
          const tx = open ? offset * 50 : offset * 4;
          const ty = open ? Math.abs(offset) * 4 : Math.abs(offset) * 0.5;
          return (
            <div
              key={src}
              className="absolute left-1/2 top-1/2 h-52 w-28 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_18px_40px_-16px_rgba(0,0,0,0.45)] ring-1 ring-black/5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:h-56"
              style={{
                zIndex: i,
                transformOrigin: "50% 95%",
                transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px) rotate(${rot}deg)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Giriş fotoğrafı ${i + 1}`}
                draggable={false}
                className="h-full w-full object-cover"
                style={{ objectPosition: "68% 38%" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
