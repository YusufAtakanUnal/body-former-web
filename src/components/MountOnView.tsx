"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders its children only once the wrapper scrolls near the viewport. Used to
 * defer very heavy content (e.g. the ~39MB coin model) so it never loads — and
 * never spins up a WebGL context — until the user actually reaches it. Keeps the
 * initial page and first scroll smooth.
 */
export default function MountOnView({
  children,
  className = "",
  rootMargin = "300px",
}: {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShow(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {show ? children : null}
    </div>
  );
}
