"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageProvider";

type Props = {
  /** path to the .ply / .splat / .ksplat scene under /public */
  src: string;
  className?: string;
};

/**
 * Interactive 3D Gaussian Splat viewer (the user's real BodyFormer scan).
 * Renders with @mkkellogg/gaussian-splats-3d on its own WebGL canvas with
 * built-in orbit controls so users can rotate / zoom the avatar.
 *
 * Client-only (WebGL + workers). Load it via next/dynamic with ssr:false.
 */
export default function SplatViewer({ src, className = "" }: Props) {
  const { t } = useLang();
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  useEffect(() => {
    let viewer: { dispose?: () => void; stop?: () => void } | null = null;
    let disposed = false;

    (async () => {
      try {
        const host = hostRef.current;
        if (!host) return;

        const GS = await import("@mkkellogg/gaussian-splats-3d");

        // Worker-based sort WITHOUT SharedArrayBuffer, so the site needs no
        // COOP/COEP headers and deploys anywhere (Vercel, static hosts, etc.).
        viewer = new GS.Viewer({
          rootElement: host,
          sharedMemoryForWorkers: false,
          useBuiltInControls: true,
          selfDrivenMode: true,
          antialiased: true,
          // The scan is exported Y-down; flip up-axis so it stands upright.
          cameraUp: [0, -1, 0],
          initialCameraPosition: [0, 0.2, -3.2],
          initialCameraLookAt: [0, 0.1, 0],
        }) as typeof viewer & {
          addSplatScene: (u: string, o: object) => Promise<void>;
          start: () => void;
        };

        await (
          viewer as unknown as {
            addSplatScene: (u: string, o: object) => Promise<void>;
          }
        ).addSplatScene(src, {
          splatAlphaRemovalThreshold: 5,
          showLoadingUI: false,
          progressiveLoad: false,
        });

        if (disposed) return;
        (viewer as unknown as { start: () => void }).start();
        setStatus("ready");
      } catch (err) {
        console.error("[SplatViewer] failed to load scene:", err);
        if (!disposed) setStatus("error");
      }
    })();

    return () => {
      disposed = true;
      try {
        viewer?.stop?.();
        viewer?.dispose?.();
      } catch {
        /* ignore teardown errors */
      }
    };
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-line bg-surface ${className}`}
    >
      {/* Viewer mounts its canvas here */}
      <div ref={hostRef} className="absolute inset-0 [&_canvas]:!outline-none" />

      {status === "loading" && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground" />
          <span className="text-xs font-medium text-muted">
            {t.viewer.loading}
          </span>
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-foreground/50"
            >
              <path d="M12 2 2 7l10 5 10-5-10-5Z" />
              <path d="m2 17 10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xs font-medium text-muted">
            {t.viewer.error}
          </span>
        </div>
      )}

      {status === "ready" && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground/80 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
          {t.viewer.hint}
        </div>
      )}
    </div>
  );
}
