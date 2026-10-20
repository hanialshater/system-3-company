"use client";

// Weak links hold it together. The brief's model: 60 people in 6 groups of 10, each within-group pair
// linked with probability 0.5, plus 12 distinct random between-group links ("bridges"). Link strength
// is neighbourhood overlap: shared friends / friends of either end (excluding each other).
// The learner cuts 0-40% of links, weakest first or strongest first, and watches the largest
// connected group. Build conditions from the spec (company/design/specs/weak-links-hold-it-together.md):
//   1. links with equal overlap are cut in a seeded random order (tie key stream mulberry32(seed + 1000));
//   2. seeds come only from networks that start in one piece (seeds 2 and 4 start disconnected);
//   3. the seed list and its rule are disclosed in claim c1.
// Everything is computed from the seed; nothing is hard-coded.
// v3 (wave G r7): the "bridges cut" readout is hidden until the commit (it pointed at the deciding
// mechanism); the reveal always quotes the question's own case (20%) on the current network, and once
// both 20% cuts have been seen a stage row shows exactly those numbers; "seed" left the stage and reveal.

import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import { useState } from "react";
import s from "./styles.module.css";

const GROUPS = 6;
const SIZE = 10;
const N = GROUPS * SIZE;
const BRIDGES = 12;
const P_IN = 0.5;
const LEVELS = [0, 1, 2, 3, 4]; // x 10% cut
const MILESTONES = ["strong-20", "weak-20"] as const;

type Order = "strong" | "weak";
interface Net {
  seed: number;
  edges: [number, number, boolean][]; // a, b, isBridge
  overlap: number[];
  order: Record<Order, number[]>; // edge indices, in cutting order
}

export function makeNet(seed: number): Net {
  const rng = mulberry32(seed);
  const edges: [number, number, boolean][] = [];
  for (let g = 0; g < GROUPS; g++)
    for (let i = 0; i < SIZE; i++)
      for (let j = i + 1; j < SIZE; j++) if (rng() < P_IN) edges.push([g * SIZE + i, g * SIZE + j, false]);
  const seen = new Set<number>();
  while (seen.size < BRIDGES) {
    const a = Math.floor(rng() * N);
    const b = Math.floor(rng() * N);
    if (Math.floor(a / SIZE) === Math.floor(b / SIZE)) continue;
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    if (seen.has(lo * N + hi)) continue;
    seen.add(lo * N + hi);
    edges.push([lo, hi, true]);
  }
  const nb = Array.from({ length: N }, () => new Set<number>());
  for (const [a, b] of edges) {
    nb[a].add(b);
    nb[b].add(a);
  }
  const overlap = edges.map(([a, b]) => {
    let shared = 0;
    for (const x of nb[a]) if (nb[b].has(x)) shared++;
    const either = nb[a].size + nb[b].size - shared - 2;
    return either > 0 ? shared / either : 0;
  });
  const keyRng = mulberry32(seed + 1000);
  const key = edges.map(() => keyRng());
  const idx = edges.map((_, i) => i);
  return {
    seed,
    edges,
    overlap,
    order: {
      weak: [...idx].sort((x, y) => overlap[x] - overlap[y] || key[x] - key[y]),
      strong: [...idx].sort((x, y) => overlap[y] - overlap[x] || key[x] - key[y]),
    },
  };
}

/** Component label per node, with links in `cut` removed. */
function pieces(net: Net, cut: Set<number>) {
  const p = Array.from({ length: N }, (_, i) => i);
  const find = (x: number): number => (p[x] === x ? x : (p[x] = find(p[x])));
  net.edges.forEach(([a, b], i) => {
    if (!cut.has(i)) p[find(a)] = find(b);
  });
  const root = Array.from({ length: N }, (_, v) => find(v));
  const size = new Map<number, number>();
  for (const r of root) size.set(r, (size.get(r) ?? 0) + 1);
  const largest = Math.max(...size.values());
  return { root, size, largest };
}

export const cutCount = (net: Net, level: number) => Math.round(level * 0.1 * net.edges.length);
export function stateAt(net: Net, order: Order, level: number) {
  const cut = new Set(net.order[order].slice(0, cutCount(net, level)));
  const pc = pieces(net, cut);
  const bridgesCut = [...cut].filter((i) => net.edges[i][2]).length;
  return { cut, ...pc, bridgesCut };
}

// Seed list: the first five seeds from 1 whose network starts in one piece (the spec's rule; it also asks
// that the weak-first 20% cut leaves <= 30, which all five meet, so no seed was skipped for its result).
export const SEEDS: number[] = [];
for (let seed = 1; SEEDS.length < 5; seed++) if (stateAt(makeNet(seed), "weak", 0).largest === N) SEEDS.push(seed);
export const NETS = SEEDS.map(makeNet);
export const CURVES = NETS.map((net) => ({
  weak: LEVELS.map((l) => stateAt(net, "weak", l)),
  strong: LEVELS.map((l) => stateAt(net, "strong", l)),
}));

// Layout: six rings of 10 on a hexagon.
const CX = 180;
const CY = 140;
const HEX_R = 102;
const RING_R = 34;
const POS: [number, number][] = Array.from({ length: N }, (_, v) => {
  const g = Math.floor(v / SIZE);
  const i = v % SIZE;
  const ga = -Math.PI / 2 + (g * Math.PI) / 3;
  const gx = CX + HEX_R * Math.cos(ga);
  const gy = CY + HEX_R * Math.sin(ga);
  const a = ga + (i * 2 * Math.PI) / SIZE;
  return [gx + RING_R * Math.cos(a), gy + RING_R * Math.sin(a)];
});

interface View {
  seedIdx: number;
  level: number;
  order: Order;
  visited: Record<Order, number>;
}

// v4 (learner r8, phone fit): one-line rule ("Link strength = share of friends in common."); "network N of 5" moved
// into the chart's bottom-right corner; chart labels 9/10 -> 11 px (>= 10 px as drawn); the slider and the order
// buttons are Row foldAtReveal (their state stays in the picture, the chart and the Seen row, which the reveal quotes);
// Seen row and reveal trimmed. Crop 125 -> 0 px at 390x844.
export default function WeakLinksHoldItTogether({ slug }: { slug: string }) {
  const [view, setView] = useState<View>({ seedIdx: 0, level: 0, order: "strong", visited: { strong: 0, weak: 0 } });
  const L = 2; // the question's case: 20% of links cut
  const net = NETS[view.seedIdx];
  const k = cutCount(net, L);
  const strong = CURVES[view.seedIdx].strong[L];
  const weak = CURVES[view.seedIdx].weak[L];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A town of 60 people lives in 6 friend groups. You can delete 20% of its friendships: those with the fewest shared friends, or those with the most. Which splits the town apart?",
        options: ["Fewest shared friends", "Most shared friends", "Both about the same"],
        answer: 0,
      }}
      exploreHint="Cut 20% of links, then switch which links go first."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            In network {view.seedIdx + 1}, cutting 20% ({k} links) closest first left {strong.largest} of 60 in one
            piece. Cutting the {k} loosest first left a largest group of {weak.largest}, with {weak.bridgesCut} of the 12 bridges
            among them.
          </p>
          <p>
            Here the links between groups all have few shared friends, so cutting the weakest links first removes them and
            breaks the network apart. Close ties sit inside groups, and the groups hold together without them.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const apply = (next: View) => {
              const visited = { ...next.visited, [next.order]: Math.max(next.visited[next.order], next.level) };
              setView({ ...next, visited });
              if (next.level >= 2) reach(`${next.order}-20`);
            };
            return <Stage locked={locked} view={view} apply={apply} />;
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

const label = (o: Order) => (o === "weak" ? "weakest first" : "strongest first");

function Stage({ locked, view, apply }: { locked: boolean; view: View; apply: (v: View) => void }) {
  const net = NETS[view.seedIdx];
  const st = stateAt(net, view.order, view.level);
  const curves = CURVES[view.seedIdx];
  const total = net.edges.length;
  const aria =
    `${label(view.order)}, ${view.level * 10}% cut: largest group ${st.largest} of 60; ` +
    (locked ? "" : `${st.bridgesCut} of 12 between-group links cut.`);

  // Curve geometry.
  const px = (l: number) => 34 + l * 50;
  const py = (v: number) => 92 - (v / 60) * 80;
  const lines = (["weak", "strong"] as Order[]).map((o) => {
    const pts = LEVELS.slice(0, view.visited[o] + 1).map((l) => [px(l), py(curves[o][l].largest)] as const);
    return { o, pts, last: curves[o][view.visited[o]].largest };
  });
  // End labels in the right gutter, nudged apart if close.
  const labelY: Record<Order, number> = { weak: py(lines[0].last) + 4, strong: py(lines[1].last) + 4 };
  if (Math.abs(labelY.weak - labelY.strong) < 13) {
    if (labelY.weak >= labelY.strong) labelY.weak = labelY.strong + 13;
    else labelY.strong = labelY.weak + 13;
  }

  return (
    <div className={s.wrap}>
      <p className={s.rule}>Link strength = share of friends in common.</p>
      <svg viewBox="0 0 360 282" className={`stage-svg ${s.net}`} role="img" aria-label={aria}>
        {net.edges.map(([a, b], i) => {
          const gone = st.cut.has(i);
          return (
            <line
              key={i}
              x1={POS[a][0]}
              y1={POS[a][1]}
              x2={POS[b][0]}
              y2={POS[b][1]}
              className={gone ? s.ghost : s.link}
              strokeWidth={gone ? 1 : 0.6 + 2.2 * net.overlap[i]}
            />
          );
        })}
        {POS.map(([x, y], v) => (
          <circle
            key={v}
            cx={x}
            cy={y}
            r={4.5}
            className={st.size.get(st.root[v]) === st.largest ? s.inGiant : s.outGiant}
          />
        ))}
      </svg>

      <div className={s.readouts}>
        <span>
          Largest group: <strong>{st.largest}</strong> of 60
        </span>
        {!locked && (
          <span className={st.bridgesCut > 0 ? s.bad : ""}>
            bridges cut: <strong>{st.bridgesCut}</strong> of 12
          </span>
        )}
      </div>

      <svg viewBox="0 0 360 108" className={s.curve} role="img" aria-label="Largest group against share of links cut">
        <line x1={px(0)} y1={py(0)} x2={px(4)} y2={py(0)} className={s.axis} />
        <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(60)} className={s.axis} />
        {LEVELS.map((l) => (
          <text key={l} x={px(l)} y={105} className={s.tick}>
            {l * 10}%
          </text>
        ))}
        <text x={px(0) - 5} y={py(60) + 4} className={s.tickY}>
          60
        </text>
        <text x={px(0) - 5} y={py(0) + 1} className={s.tickY}>
          0
        </text>
        {lines.map(({ o, pts }) =>
          pts.length > 1 ? (
            <polyline
              key={o}
              points={pts.map((p) => p.join(",")).join(" ")}
              className={o === "weak" ? s.weakLine : s.strongLine}
            />
          ) : null,
        )}
        {lines.map(({ o, pts }) =>
          pts.map(([x, y], j) => <circle key={`${o}${j}`} cx={x} cy={y} r={2.6} className={o === "weak" ? s.weakDot : s.strongDot} />),
        )}
        {lines.map(({ o, last }) =>
          view.visited[o] > 0 ? (
            <text key={o} x={px(4) + 10} y={labelY[o]} className={o === "weak" ? s.weakLabel : s.strongLabel}>
              {label(o)} {last}
            </text>
          ) : null,
        )}
        <text x={360} y={105} className={s.seedLabel}>
          network {view.seedIdx + 1} of {SEEDS.length}
        </text>
      </svg>
      {view.visited.strong >= 2 && view.visited.weak >= 2 && (
        <p className={s.rule} data-testid="seen">
          At 20% cut ({cutCount(net, 2)} links), network {view.seedIdx + 1}: strongest first {curves.strong[2].largest} of 60 ·
          weakest first {curves.weak[2].largest}, {curves.weak[2].bridgesCut} of 12 bridges cut
        </p>
      )}

      <Row foldAtReveal>
        <Slider
          label="Links cut"
          value={view.level}
          min={0}
          max={4}
          step={1}
          disabled={locked}
          format={(l) => `${l * 10}% (${cutCount(net, l)} of ${total})`}
          onChange={(l) => apply({ ...view, level: l })}
        />
      </Row>
      <Row foldAtReveal>
        <div className={s.controls}>
        {(["strong", "weak"] as Order[]).map((o) => (
          <Control
            key={o}
            className={`${s.tap} ${view.order === o ? "active" : ""}`}
            aria-pressed={view.order === o}
            disabled={locked || view.order === o}
            onClick={() => apply({ ...view, order: o })}
          >
            {o === "weak" ? "Weakest first" : "Strongest first"}
          </Control>
        ))}
        <Control
          className={s.tap}
          disabled={locked}
          onClick={() => apply({ ...view, seedIdx: (view.seedIdx + 1) % SEEDS.length })}
        >
          New network
        </Control>
        </div>
      </Row>
    </div>
  );
}
