"use client";

import { createElement, useEffect } from "react";

type Props = {
  /** .glb model under /public */
  src: string;
  alt: string;
  className?: string;
  /**
   * model-viewer load strategy. Defaults to "eager" so most models are ready by
   * the time they scroll into view. Pass "lazy" for very heavy models (e.g. the
   * ~39MB coin) so they only fetch when near the viewport.
   */
  loading?: "eager" | "lazy";
};

/**
 * Renders an interactive .glb with Google's <model-viewer> web component:
 * auto-rotates and can be dragged. Starts fetching the model as soon as it
 * mounts (rather than waiting until scrolled into view), so it's already
 * loaded by the time the user scrolls down to see it.
 */
export default function ModelViewer({
  src,
  alt,
  className = "",
  loading = "eager",
}: Props) {
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
    loading,
    reveal: "auto",
    class: className,
    style: { width: "100%", height: "100%", backgroundColor: "transparent" },
  });
}
