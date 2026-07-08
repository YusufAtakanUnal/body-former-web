"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useLang } from "@/i18n/LanguageProvider";
import type { Content } from "@/i18n/content";
import Reveal from "./Reveal";
import TwinPipeline from "./TwinPipeline";
import MountOnView from "./MountOnView";
import { SectionHead } from "./Sections";

const ModelViewer = dynamic(() => import("./ModelViewer"), { ssr: false });

const YG = Array.from({ length: 8 }, (_, i) => i + 1);

type Tab = "scan" | "compete" | "rewards";

// The tab a nudge should point the user toward next.
const NEXT_TAB: Record<Tab, Tab | null> = {
  scan: "compete",
  compete: "rewards",
  rewards: null,
};

// The nudge bob starts slow and ramps up the longer it's been inviting a
// click, so it gets harder to ignore the longer the user waits.
const NUDGE_START_S = 1.3;
const NUDGE_FLOOR_S = 0.45;
const NUDGE_DECAY = 0.88;
const NUDGE_TICK_MS = 500;

/**
 * The single dynamic "How it works" section — the page centerpiece. Three tabs
 * tell the whole product in one place: Scan (input → 3D model + 15 measurements),
 * Compete (the three ways to earn Coin, which all feed a Coin back to you), and
 * Rewards (spend Coin ↔ get supplements). The 3D coin/supplement models live
 * inside this narrative rather than as a separate showcase.
 */
export default function Journey() {
  const { t } = useLang();
  const j = t.journey;
  const [tab, setTab] = useState<Tab>("scan");
  const [nudgeSec, setNudgeSec] = useState(NUDGE_START_S);
  const nextTab = NEXT_TAB[tab];

  const tabs: { id: Tab; label: string }[] = [
    { id: "scan", label: j.tabs.scan },
    { id: "compete", label: j.tabs.compete },
    { id: "rewards", label: j.tabs.rewards },
  ];

  // Restart the ramp — slow bob at first, accelerating the longer the target
  // tab has been waiting for a click — every time the target itself changes.
  useEffect(() => {
    if (!nextTab) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    setNudgeSec(NUDGE_START_S);
    const id = window.setInterval(() => {
      setNudgeSec((s) => Math.max(NUDGE_FLOOR_S, s * NUDGE_DECAY));
    }, NUDGE_TICK_MS);
    return () => window.clearInterval(id);
  }, [nextTab]);

  // On the Rewards (last) tab, if the user lingers ~5s without scrolling, glide
  // them down to the FAQ — the next section. Any real scroll/keypress cancels.
  useEffect(() => {
    if (tab !== "rewards") return;
    let cancelled = false;
    const cancel = () => {
      cancelled = true;
      cleanup();
    };
    const timer = window.setTimeout(() => {
      if (cancelled) return;
      document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
    }, 5000);
    const opts = { passive: true } as const;
    window.addEventListener("wheel", cancel, opts);
    window.addEventListener("touchmove", cancel, opts);
    window.addEventListener("keydown", cancel);
    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchmove", cancel);
      window.removeEventListener("keydown", cancel);
    }
    return cleanup;
  }, [tab]);

  return (
    <section id="how" className="border-t border-line px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow={j.eyebrow} title={j.title} lead={j.lead} />

        {/* Tab switcher — the "next" tab gently bobs to invite the click */}
        <Reveal className="mt-10">
          <div className="inline-flex flex-wrap rounded-full border border-line p-1 text-sm font-semibold">
            {tabs.map((tb) => (
              <button
                key={tb.id}
                onClick={() => setTab(tb.id)}
                aria-pressed={tab === tb.id}
                className={`rounded-full px-5 py-2 transition-colors ${
                  tab === tb.id
                    ? "bg-foreground text-white"
                    : "text-muted hover:text-foreground"
                } ${nextTab === tb.id ? "tab-nudge" : ""}`}
                style={
                  nextTab === tb.id
                    ? { animationDuration: `${nudgeSec}s` }
                    : undefined
                }
              >
                {tb.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Active panel — keyed so it replays the entrance on every switch */}
        <div key={tab} className="panel-in mt-14">
          {tab === "scan" && <ScanPanel j={j} />}
          {tab === "compete" && <CompetePanel j={j} />}
          {tab === "rewards" && <RewardsPanel j={j} />}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Scan panel ---------------- */
function ScanPanel({ j }: { j: Content["journey"] }) {
  const s = j.scan;
  return (
    <div className="space-y-16">
      {/* Steps: download & subscribe → 8 photos + height/weight → result */}
      <div className="grid gap-4 sm:grid-cols-3">
        {s.steps.map((step) => (
          <div
            key={step.n}
            className="rounded-2xl border border-line bg-surface p-6"
          >
            <span className="font-mono text-sm text-muted">{step.n}</span>
            <h3 className="mt-4 text-lg font-bold">{step.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.d}</p>
          </div>
        ))}
      </div>

      {/* The pipeline: input photo → AI normal map → 3D model */}
      <Reveal>
        <TwinPipeline
          photos={YG.map((i) => `/screens/yg${i}.jpeg`)}
          normals={YG.map((i) => `/screens/yg${i}_cut.png`)}
          video="/screens/modelvideo.mp4"
          labels={{
            input: s.photoLabel,
            aiEngine: s.aiEngine,
            normal: s.maskLabel,
            output: s.output,
          }}
        />
      </Reveal>

      {/* 15 measurements (looping marquee) + privacy note */}
      <Reveal className="grid gap-8 border-t border-line pt-12 lg:grid-cols-[1fr_18rem] lg:items-center">
        <div>
          <p className="eyebrow mb-4">{s.measurementsTitle}</p>
          <MeasurementsMarquee items={s.measurements} />
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 text-sm leading-relaxed text-muted">
          <LockIcon />
          <span>{s.privacy}</span>
        </div>
      </Reveal>
    </div>
  );
}

/* ---------------- Compete panel ---------------- */
function CompetePanel({ j }: { j: Content["journey"] }) {
  const c = j.compete;
  return (
    <div>
      <div className="mx-auto max-w-xl text-center">
        <h3 className="text-2xl font-bold tracking-tight">{c.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{c.lead}</p>
      </div>
      {/* Always a horizontal row — never stacks, even on phones. Swipe if it
          doesn't fully fit the viewport. */}
      <div className="mt-12 flex justify-start gap-4 overflow-x-auto px-1 py-1 sm:justify-center">
        {c.modes.map((m, idx) => (
          <Reveal
            key={m.k}
            delay={idx * 80}
            className="w-56 shrink-0 rounded-2xl border border-line bg-surface p-6 sm:w-64 sm:p-7"
          >
            <span className="font-mono text-sm text-muted">{m.k}</span>
            <h4 className="mt-6 text-xl font-bold">{m.t}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">{m.d}</p>
          </Reveal>
        ))}
      </div>

      {/* All three ways funnel a Coin back to you */}
      <Reveal className="mt-6 flex flex-col items-center text-center">
        <FlowArrow down />
        <MountOnView className="mt-2 h-32 w-32 sm:h-40 sm:w-40">
          <ModelViewer
            src="/screens/coin.glb"
            alt={c.coinLabel}
            loading="lazy"
            className="h-full w-full"
          />
        </MountOnView>
        <h3 className="mt-2 text-2xl font-bold tracking-tight">
          {c.earnTitle}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
          {c.earnLead}
        </p>
      </Reveal>
    </div>
  );
}

/* ---------------- Rewards panel ---------------- */
function RewardsPanel({ j }: { j: Content["journey"] }) {
  const r = j.rewards;
  return (
    <div>
      <div className="mx-auto max-w-xl text-center">
        <h3 className="text-2xl font-bold tracking-tight">{r.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{r.lead}</p>
      </div>

      {/* Two-way exchange, models floating on the page (no cards): spend Coin
          → supplements, and back. Always a horizontal row — never stacks,
          even on phones. Swipe if it doesn't fully fit the viewport. */}
      <div className="mt-14 flex flex-row items-center justify-start gap-4 overflow-x-auto px-1 py-1 sm:justify-center sm:gap-6 lg:gap-10">
        {/* Coin */}
        <MountOnView className="h-28 w-28 shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48">
          <ModelViewer
            src="/screens/coin.glb"
            alt={r.coinLabel}
            loading="lazy"
            className="h-full w-full"
          />
        </MountOnView>

        {/* Bidirectional arrows */}
        <div className="flex shrink-0 flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-muted">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              {r.spend}
            </span>
            <ExchangeArrow />
          </div>
          <div className="flex items-center gap-2 text-muted">
            <ExchangeArrow className="rotate-180" />
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              {r.earn}
            </span>
          </div>
        </div>

        {/* Supplements */}
        <div className="flex shrink-0 gap-3 sm:gap-4">
          <div className="h-28 w-20 shrink-0 sm:h-40 sm:w-28 lg:h-48 lg:w-36">
            <ModelViewer
              src="/screens/protein_powder.glb"
              alt={r.supplementLabel}
              className="h-full w-full"
            />
          </div>
          <div className="h-28 w-20 shrink-0 sm:h-40 sm:w-28 lg:h-48 lg:w-36">
            <ModelViewer
              src="/screens/protein_sachet.glb"
              alt={r.supplementLabel}
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Bits ---------------- */
function MeasurementsMarquee({ items }: { items: string[] }) {
  return (
    <div className="marquee-mask relative h-64 overflow-hidden rounded-2xl border border-line bg-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-white to-transparent" />
      <ul className="marquee-track">
        {[...items, ...items].map((m, idx) => (
          <li
            key={idx}
            className="flex items-center gap-3 px-5 py-2.5 text-sm text-foreground"
          >
            <span className="w-5 font-mono text-xs text-muted">
              {String((idx % items.length) + 1).padStart(2, "0")}
            </span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-foreground" />
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FlowArrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={`shrink-0 text-muted ${down ? "rotate-90" : "rotate-90 lg:rotate-0"}`}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ExchangeArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={`shrink-0 ${className}`}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="mt-0.5 shrink-0 text-foreground"
    >
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
