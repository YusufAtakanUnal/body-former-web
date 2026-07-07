"use client";

import { createElement, useEffect } from "react";

type Props = {
  /** .glb model under /public */
  src: string;
  alt: string;
  className?: string;
};

/**
 * Renders an interactive .glb with Google's <model-viewer> web component:
 * auto-rotates and can be dragged. Starts fetching the model as soon as it
 * mounts (rather than waiting until scrolled into view), so it's already
 * loaded by the time the user scrolls down to see it.
 */
export default function ModelViewer({ src, alt, className = "" }: Props) {
  useEffect(() => {
    // registers the <model-viewer> custom element
    import("@google/model-viewer");
  }, []);

  return createElement("model-viewer", {
    src,
    alt,
    "camera-controls": "",
    "auto-rotate": "",
    "rotation-per-second": "22deg",
    "auto-rotate-delay": "0",
    "interaction-prompt": "none",
    "disable-zoom": "",
    "shadow-intensity": "0.6",
    "shadow-softness": "1",
    exposure: "1.05",
    loading: "eager",
    reveal: "auto",
    class: className,
    style: { width: "100%", height: "100%", backgroundColor: "transparent" },
  });
}
