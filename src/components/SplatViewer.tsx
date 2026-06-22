"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useLang } from "@/i18n/LanguageProvider";

type Props = {
  /** path to the .ply / .splat / .ksplat scene under /public */
  src: string;
  className?: string;
};

type SplatMeshLike = {
  getSplatCount: () => number;
  getSplatCenter: (i: number, out: THREE.Vector3, transform: boolean) => void;
};

type ViewerLike = {
  camera?: THREE.PerspectiveCamera;
  controls?: { target: THREE.Vector3; update: () => void };
  getSplatMesh?: () => SplatMeshLike;
  splatMesh?: SplatMeshLike;
  addSplatScene?: (u: string, o: object) => Promise<void>;
  start?: () => void;
  stop?: () => void;
  dispose?: () => void;
};

/**
 * Interactive 3D Gaussian Splat viewer (the user's real BodyFormer scan).
 * Renders with @mkkellogg/gaussian-splats-3d on its own WebGL canvas with
 * built-in orbit controls so users can rotate / zoom the avatar.
 *
 * After load it auto-frames the model from its real bounding box, so the
 * camera always points at the scan regardless of the export's scale/center.
 *
 * Client-only (WebGL + workers). Load it via next/dynamic with ssr:false.
 */
export default function SplatViewer({ src, className = "" }: Props) {
  const { t } = useLang();
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let viewer: ViewerLike | null = null;
    let disposed = false;

    (async () => {
      try {
        const host = hostRef.current;
        if (!host) return;

        const GS = await import("@mkkellogg/gaussian-splats-3d");
        const Viewer = GS.Viewer ?? GS.default?.Viewer;
        if (!Viewer) throw new Error("Viewer export not found");

        // Worker-based sort WITHOUT SharedArrayBuffer, so the site needs no
        // COOP/COEP headers and deploys anywhere (static hosts, Vercel, etc.).
        const v: ViewerLike = new Viewer({
          rootElement: host,
          sharedMemoryForWorkers: false,
          useBuiltInControls: true,
          selfDrivenMode: true,
          antialiased: true,
          cameraUp: [0, 1, 0],
          initialCameraPosition: [0, 0, 4],
          initialCameraLookAt: [0, 0, 0],
        });
        viewer = v;

        await v.addSplatScene!(src, {
          splatAlphaRemovalThreshold: 5,
          showLoadingUI: false,
          progressiveLoad: false,
          onProgress: (pct: number) => {
            if (!disposed) setProgress(Math.min(100, Math.round(pct)));
          },
        });

        if (disposed) return;
        v.start?.();
        frameModel(v);
        setStatus("ready");
      } catch (err) {
        console.error("[SplatViewer] failed to load scene:", err);
        if (!disposed) setStatus("error");
      }
    })();

    // Point the camera at the model's true centre, framed by its bounding box.
    function frameModel(v: ViewerLike) {
      try {
        const mesh = v.getSplatMesh?.() ?? v.splatMesh;
        const cam = v.camera;
        if (!mesh || !cam) return;
        const count = mesh.getSplatCount();
        if (!count) return;

        const box = new THREE.Box3();
        const tmp = new THREE.Vector3();
        const step = Math.max(1, Math.floor(count / 15000));
        for (let i = 0; i < count; i += step) {
          mesh.getSplatCenter(i, tmp, true);
          box.expandByPoint(tmp);
        }
        if (box.isEmpty()) return;

        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const radius = 0.5 * size.length();
        const fov = ((cam.fov ?? 60) * Math.PI) / 180;
        const dist = (radius / Math.sin(fov / 2)) * 1.05;

        cam.position.set(center.x, center.y, center.z + dist);
        cam.near = Math.max(0.01, dist - radius * 2);
        cam.far = dist + radius * 4;
        cam.updateProjectionMatrix();

        if (v.controls) {
          v.controls.target.copy(center);
          v.controls.update();
        }
      } catch (e) {
        console.warn("[SplatViewer] auto-frame skipped:", e);
      }
    }

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
      className={`relative overflow-hidden rounded-4xl border border-line bg-surface ${className}`}
    >
      {/* Viewer mounts its canvas here */}
      <div ref={hostRef} className="absolute inset-0 [&_canvas]:outline-none!" />

      {status === "loading" && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground" />
          <span className="text-xs font-medium text-muted">
            {t.viewer.loading}
            {progress > 0 ? ` ${progress}%` : ""}
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
