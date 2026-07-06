"use client";

import { useLang } from "@/i18n/LanguageProvider";

type Node = { x: number; y: number; r: number };

const N: Record<string, Node> = {
  bf: { x: 480, y: 120, r: 112 },
  user: { x: 180, y: 395, r: 96 },
  brand: { x: 790, y: 395, r: 128 },
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
  const px = -uy;
  const py = ux;
  const cx = mx + px * bow;
  const cy = my + py * bow;
  return { d: `M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`, lx: cx, ly: cy };
}

export default function EcosystemGraph() {
  const { t } = useLang();
  const e = t.coin.edges;
  const nlab = t.coin.nodes;

  const edges = [
    { ...edge(N.user, N.bf, -46), label: e.userToBf },
    { ...edge(N.bf, N.user, -46), label: e.bfToUser },
    { ...edge(N.brand, N.bf, 40), label: e.brandToBf },
    { ...edge(N.bf, N.brand, 40), label: e.bfToBrand },
    { ...edge(N.brand, N.user, 66), label: e.brandToUser },
  ];

  return (
    <svg
      viewBox="0 0 960 520"
      className="h-auto w-full"
      role="img"
      aria-label="BodyFormer ecosystem value graph"
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

      {/* edges */}
      <g className="text-foreground/35">
        {edges.map((ed, i) => (
          <path
            key={i}
            d={ed.d}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            markerEnd="url(#eg-arrow)"
          />
        ))}
      </g>

      {/* edge labels */}
      {edges.map((ed, i) => {
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

      {/* nodes */}
      <Node node={N.bf} label="BodyFormer" hub />
      <Node node={N.user} label={nlab.user} />
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
  const w = hub ? 210 : Math.max(150, label.length * 11 + 40);
  const h = 62;
  return (
    <g>
      <rect
        x={node.x - w / 2}
        y={node.y - h / 2}
        width={w}
        height={h}
        rx={16}
        className={hub ? "fill-foreground" : "fill-background"}
        stroke="currentColor"
        strokeWidth={hub ? 0 : 1.6}
        style={{ color: "var(--foreground)" }}
      />
      <text
        x={node.x}
        y={node.y + 6}
        textAnchor="middle"
        className={hub ? "fill-background" : "fill-foreground"}
        style={{ fontSize: hub ? "20px" : "16px", fontWeight: 700 }}
      >
        {label}
      </text>
    </g>
  );
}
