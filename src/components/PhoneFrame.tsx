"use client";

import { useState } from "react";

type Props = {
  src?: string;
  alt: string;
  /** label shown in the placeholder when no screenshot is dropped in yet */
  placeholderLabel?: string;
  className?: string;
};

/**
 * A phone mockup frame. Drop a screenshot into /public/screens/ and pass its
 * path as `src`. The placeholder always sits behind the image; the image shows
 * by default and is only hidden if it fails to load (so it never gets stuck
 * invisible from an onLoad race when the file is served from cache).
 */
export default function PhoneFrame({
  src,
  alt,
  placeholderLabel,
  className = "",
}: Props) {
  const [errored, setErrored] = useState(false);
  const showImage = Boolean(src) && !errored;

  return (
    <div
      className={`relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.2rem] border border-line bg-surface shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] ring-1 ring-black/5 ${className}`}
    >
      {/* Placeholder layer — always present, sits behind the image */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="text-foreground/40"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </div>
        <span className="text-xs font-medium text-muted">
          {placeholderLabel ?? alt}
        </span>
      </div>

      {/* notch */}
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/85" />

      {/* Image layer — visible by default; hidden only if it fails to load */}
      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
