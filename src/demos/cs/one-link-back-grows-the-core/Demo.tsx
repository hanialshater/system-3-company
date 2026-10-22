"use client";

// One link back: how big does the core get? A 10-page directed graph drawn as a bow tie
// (IN left, core centre, OUT right). Four exclusive preset chips add the back link I → F, the back
// link J → G, both, or none; the core (pages that each reach every other) is computed live by
// reachability both ways from A, filled, with its internal links drawn bold and a count readout.
// Milestones: I → F seen (core 8, the question's case) and J → G seen (core 6). Each tried chip keeps
// its core size as a trace, so None (the start) cannot erase what the reveal quotes. In the reveal the
// stage is pinned to I → F, the case the reveal walks through.
// Brief: company/domains/briefs/cs.systems.md #8 (NCM wave J, J5). Node check in build.md.

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const IDS = "ABCDEFGHIJ".split("");
const BASE: [string, string][] = [
  ["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"],
  ["E", "A"], ["F", "E"], ["G", "B"],
  ["C", "H"], ["H", "I"], ["D", "J"],
];
const BACK: Record<"IF" | "JG", [string, string]> = { IF: ["I", "F"], JG: ["J", "G"] };
type Preset = "IF" | "JG" | "both" | "none";
const LINKS: Record<Preset, ("IF" | "JG")[]> = { IF: ["IF"], JG: ["JG"], both: ["IF", "JG"], none: [] };
const MILESTONES = ["IF", "JG"] as const;

function edgesFor(p: Preset): [string, string][] {
  return [...BASE, ...LINKS[p].map((k) => BACK[k])];
}
function reach(edges: [string, string][], start: string): Set<string> {
  const seen = new Set([start]);
  const q = [start];
  while (q.length) {
    const c = q.shift()!;
    for (const [a, b] of edges) if (a === c && !seen.has(b)) { seen.add(b); q.push(b); }
  }
  return seen;
}
/** The core: pages A reaches that also reach A. */
function coreOf(p: Preset): Set<string> {
  const e = edgesFor(p);
  const fromA = reach(e, "A");
  return new Set(IDS.filter((id) => fromA.has(id) && reach(e, id).has("A")));
}

const W = 340;
const H = 240;
const R = 15;
const POS: Record<string, [number, number]> = {
  F: [45, 50], E: [75, 110], G: [75, 180], // IN
  A: [140, 110], B: [140, 180], C: [210, 110], D: [210, 180], // core
  I: [295, 50], H: [275, 110], J: [275, 180], // OUT
};
// Back links run around the outside: I → F over the top, J → G under the bottom.
const CTRL: Record<"IF" | "JG", [number, number]> = { IF: [170, -20], JG: [175, 260] };
const TAGS: [string, number, number][] = [["IN", 30, 150], ["CORE", 175, 82], ["OUT", 312, 150]];

function head(tx: number, ty: number, ux: number, uy: number) {
  const bx = tx - ux * 10, by = ty - uy * 10;
  return { bx, by, pts: `${tx},${ty} ${bx - uy * 5},${by + ux * 5} ${bx + uy * 5},${by - ux * 5}` };
}
function straight(a: string, b: string) {
  const [x1, y1] = POS[a];
  const [x2, y2] = POS[b];
  const d = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / d, uy = (y2 - y1) / d;
  const h = head(x2 - ux * (R + 2), y2 - uy * (R + 2), ux, uy);
  return { d: `M${x1 + ux * R},${y1 + uy * R} L${h.bx},${h.by}`, pts: h.pts };
}
function curved(k: "IF" | "JG") {
  const [a, b] = BACK[k];
  const [x1, y1] = POS[a];
  const [x2, y2] = POS[b];
  const [cx, cy] = CTRL[k];
  const d0 = Math.hypot(cx - x1, cy - y1);
  const sx = x1 + ((cx - x1) / d0) * R, sy = y1 + ((cy - y1) / d0) * R;
  const d1 = Math.hypot(x2 - cx, y2 - cy);
  const ux = (x2 - cx) / d1, uy = (y2 - cy) / d1;
  const h = head(x2 - ux * (R + 2), y2 - uy * (R + 2), ux, uy);
  return { d: `M${sx},${sy} Q${cx},${cy} ${h.bx},${h.by}`, pts: h.pts };
}

type Seen = Partial<Record<Preset, number>>;

export default function OneLinkBackGrowsTheCore({ slug }: { slug: string }) {
  const [preset, setPreset] = useState<Preset>("none");
  const seen = useRef<Seen>({});

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You map a 10-page web. In its core, pages A to D can each click their way to every other. You add one link, from OUT page I to IN page F. How many pages are in the core now?",
        options: ["5", "8", "10"],
        answer: 1,
      }}
      exploreHint="Add I → F, then J → G instead, then both, then none. Watch which pages fill."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const sn = seen.current;
        return (
          <>
            <p>
              I → F closed one loop: F → E → A → B → C → H → I → F. Every page on it now reaches every other, so E,
              F, H and I joined: core {sn.IF ?? 8}. G still can't be reached from the core, and J can't click back,
              so they stayed out.
            </p>
            <p>
              J → G instead closed J → G → B → C → D → J: core {sn.JG ?? 6}.
              {sn.both !== undefined ? ` Both links: all ${sn.both}.` : ""} One back link adds only
              the pages on the loop it closes.
            </p>
            <p className="muted">A toy web, not to scale.</p>
          </>
        );
      }}
    >
      {(ctx) => <Stage {...ctx} preset={preset} setPreset={setPreset} seen={seen.current} />}
    </Lesson>
  );
}

function Stage({
  locked,
  phase,
  interact,
  preset,
  setPreset,
  seen,
}: StageContext & { preset: Preset; setPreset: (p: Preset) => void; seen: Seen }) {
  const { reach: hit } = useMilestones(interact, MILESTONES);
  const shown: Preset = phase === "reveal" ? "IF" : preset;
  const core = coreOf(shown);
  const inCore = (a: string, b: string) => core.has(a) && core.has(b);

  const go = (p: Preset) => {
    setPreset(p);
    if (seen[p] === undefined) seen[p] = coreOf(p).size;
    if (p === "IF" || p === "JG") hit(p);
  };

  const chips: { p: Preset; label: string }[] = [
    { p: "IF", label: "Add I → F" },
    { p: "JG", label: "Add J → G" },
    { p: "both", label: "Both" },
    { p: "none", label: "None" },
  ];

  return (
    <div className={s.wrap}>
      <p className={s.readout} aria-live="polite">
        core: <b>{core.size}</b> pages
      </p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={`Core: ${[...core].join(", ")} (${core.size} pages)`}
      >
        {BASE.map(([a, b]) => {
          const { d, pts } = straight(a, b);
          const bold = inCore(a, b);
          return (
            <g key={a + b} className={bold ? s.edgeCore : s.edge}>
              <path d={d} />
              <polygon points={pts} />
            </g>
          );
        })}
        {LINKS[shown].map((k) => {
          const { d, pts } = curved(k);
          return (
            <g key={k} className={s.edgeNew}>
              <path d={d} />
              <polygon points={pts} />
            </g>
          );
        })}
        {IDS.map((id) => {
          const [x, y] = POS[id];
          const on = core.has(id);
          return (
            <g key={id}>
              <circle cx={x} cy={y} r={R} className={on ? s.nodeCore : s.node} />
              <text x={x} y={y + 5} textAnchor="middle" className={on ? s.labelCore : s.label}>
                {id}
              </text>
            </g>
          );
        })}
        {TAGS.map(([t, x, y]) => (
          <text key={t} x={x} y={y} textAnchor="middle" className={s.tag}>
            {t}
          </text>
        ))}
      </svg>

      <Row>
        {chips.map((c) => {
          const on = shown === c.p;
          const trace = seen[c.p];
          return (
            <Control
              key={c.p}
              disabled={locked || phase === "reveal" || on}
              className={`${s.tap} ${on ? "active" : ""}`}
              aria-pressed={on}
              onClick={() => go(c.p)}
            >
              <span>{c.label}</span>
              {trace !== undefined && <span className={s.trace}>✓ {trace}</span>}
            </Control>
          );
        })}
      </Row>
    </div>
  );
}
