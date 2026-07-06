"use client";

import { useLang } from "@/i18n/LanguageProvider";

type Node = { x: number; y: number; r: number };

// User is the hub — everything flows to/from "You".
const N: Record<string, Node> = {
  user: { x: 480, y: 140, r: 104 },
  bf: { x: 165, y: 395, r: 96 },
  brand: { x: 795, y: 395, r: 128 },
};

function edge(a: Node, b: Node, bow: number) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const L = Math.hypot(dx, dy) || 1;
  const ux = dx / L;
  const uy = dy / L;
  const sx = a.x + ux * a.r;
  const sy = a.y + uy * a.r;
  const ex = b.x - ux * b.r;
  const ey = b.y - uy * b.r;
  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  const cx = mx + -uy * bow;
  const cy = my + ux * bow;
  return { d: `M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`, lx: cx, ly: cy };
}

export default function EcosystemGraph() {
  const { t } = useLang();
  const e = t.coin.edges;
  const nlab = t.coin.nodes;

  const primary = [
    { ...edge(N.user, N.bf, 44), label: e.userToBf },
    { ...edge(N.bf, N.user, 44), label: e.bfToUser },
    { ...edge(N.brand, N.user, 40), label: e.brandToUser },
  ];
  const secondary = { ...edge(N.bf, N.brand, 66), label: e.bfBrand };

  return (
    <svg
      viewBox="0 0 960 520"
      className="h-auto w-full"
      role="img"
      aria-label="BodyFormer value graph"
    >
      <defs>
        <marker
          id="eg-arrow"
          viewBox="0 0 10 10"
          refX="8.5"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10z" fill="currentColor" />
        </marker>
      </defs>

      {/* secondary (brand ⇄ bodyformer) — de-emphasised */}
      <g className="text-foreground/20">
        <path
          d={secondary.d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeDasharray="5 5"
          markerStart="url(#eg-arrow)"
          markerEnd="url(#eg-arrow)"
        />
      </g>

      {/* primary edges (everything to/from the user) */}
      <g className="text-foreground/45">
        {primary.map((ed, i) => (
          <path
            key={i}
            d={ed.d}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            markerEnd="url(#eg-arrow)"
          />
        ))}
      </g>

      {/* labels */}
      {[...primary, secondary].map((ed, i) => {
        const w = ed.label.length * 6.6 + 16;
        return (
          <g key={`l${i}`}>
            <rect
              x={ed.lx - w / 2}
              y={ed.ly - 11}
              width={w}
              height={22}
              rx={11}
              className="fill-background"
              stroke="currentColor"
              strokeWidth="1"
              style={{ color: "var(--line)" }}
            />
            <text
              x={ed.lx}
              y={ed.ly + 4}
              textAnchor="middle"
              className="fill-foreground"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              {ed.label}
            </text>
          </g>
        );
      })}

      {/* nodes — user is the highlighted hub */}
      <Node node={N.user} label={nlab.user} hub />
      <Node node={N.bf} label="BodyFormer" />
      <Node node={N.brand} label={nlab.brand} />
    </svg>
  );
}

function Node({
  node,
  label,
  hub = false,
}: {
  node: Node;
  label: string;
  hub?: boolean;
}) {
  const w = hub
    ? Math.max(160, label.length * 13 + 56)
    : Math.max(150, label.length * 11 + 40);
  const h = hub ? 70 : 60;
  return (
    <g>
      <rect
        x={node.x - w / 2}
        y={node.y - h / 2}
        width={w}
        height={h}
        rx={hub ? 20 : 16}
        className={hub ? "fill-foreground" : "fill-background"}
        stroke="currentColor"
        strokeWidth={hub ? 0 : 1.6}
        style={{ color: "var(--foreground)" }}
      />
      <text
        x={node.x}
        y={node.y + (hub ? 7 : 6)}
        textAnchor="middle"
        className={hub ? "fill-background" : "fill-foreground"}
        style={{ fontSize: hub ? "22px" : "16px", fontWeight: 700 }}
      >
        {label}
      </text>
    </g>
  );
}
