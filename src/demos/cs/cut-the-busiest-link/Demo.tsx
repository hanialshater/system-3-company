"use client";

// Edge betweenness and Girvan–Newman (brief cs.algorithms #82). Ten people, 17 links: group 1 = 0-5 (0 has five
// friends), group 2 = 6-9 (all six links), joined by 5-6 and 3-7. Each link's number and width = the shortest paths
// it carries (Brandes edge betweenness: every unordered pair once; a pair with k shortest paths gives 1/k to each
// path). Tap a link to cut it, or "Cut busiest" (highest count, ties broken by the edge list order). Every count is
// recomputed from the current links after each cut; links whose count changed blink.
// When the network falls apart the links freeze (Reset to start again); if the pieces are the two groups, each
// group takes its own colour. Link tap targets are HTML buttons over the label at each link's midpoint (28 px:
// 17 midpoints do not leave room for 44 px), DOM order bridges first.
// Milestones: first-bridge-cut (one between-group link cut while the network is whole; the other's new count and
// the inner link that changed most are recorded), split (the pieces are exactly the two groups; sizes recorded).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const N = 10;
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [2, 3], [3, 4], [4, 5], [1, 5],
  [6, 7], [7, 8], [8, 9], [6, 9], [6, 8], [7, 9],
  [5, 6], [3, 7],
];
const BRIDGES = [15, 16];
const GROUP1 = [0, 1, 2, 3, 4, 5];
const GROUP2 = [6, 7, 8, 9];
const VW = 370;
const VH = 215;
const POS: [number, number][] = [
  [95, 110], [25, 136], [30, 72], [148, 57], [169, 123], [114, 182],
  [250, 170], [250, 50], [350, 110], [285, 110],
];
// label / tap point on each link: the midpoint
const MID = EDGES.map(([a, b]) => [(POS[a][0] + POS[b][0]) / 2, (POS[a][1] + POS[b][1]) / 2] as [number, number]);
const name = (i: number) => `${EDGES[i][0]}–${EDGES[i][1]}`;
const fmt = (x: number) => (Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : x.toFixed(1));
const HIT = 28;

function bfs(src: number, cut: Set<number>) {
  const adj: number[][] = Array.from({ length: N }, () => []);
  EDGES.forEach(([a, b], i) => {
    if (cut.has(i)) return;
    adj[a].push(b);
    adj[b].push(a);
  });
  const d = Array(N).fill(-1);
  const sg = Array(N).fill(0);
  d[src] = 0;
  sg[src] = 1;
  const q = [src];
  while (q.length) {
    const u = q.shift()!;
    for (const v of adj[u]) {
      if (d[v] < 0) {
        d[v] = d[u] + 1;
        q.push(v);
      }
      if (d[v] === d[u] + 1) sg[v] += sg[u];
    }
  }
  return { d, sg };
}

// shortest paths carried by each link, every unordered pair once, split evenly over a pair's shortest paths
function loads(cut: Set<number>) {
  const B = Array.from({ length: N }, (_, v) => bfs(v, cut));
  const L = EDGES.map(() => 0);
  for (let a = 0; a < N; a++)
    for (let t = a + 1; t < N; t++) {
      const dist = B[a].d[t];
      if (dist < 0) continue;
      EDGES.forEach(([x, y], i) => {
        if (cut.has(i)) return;
        for (const [u, v] of [[x, y], [y, x]])
          if (B[a].d[u] >= 0 && B[t].d[v] >= 0 && B[a].d[u] + 1 + B[t].d[v] === dist) L[i] += (B[a].sg[u] * B[t].sg[v]) / B[a].sg[t];
      });
    }
  return L;
}

function pieces(cut: Set<number>) {
  const d = bfs(0, cut).d;
  const comp = Array(N).fill(-1);
  let k = 0;
  for (let v = 0; v < N; v++) {
    if (comp[v] >= 0) continue;
    const dv = bfs(v, cut).d;
    for (let u = 0; u < N; u++) if (dv[u] >= 0) comp[u] = k;
    k++;
  }
  const isGroups =
    k === 2 && GROUP1.every((v) => comp[v] === comp[0]) && GROUP2.every((v) => comp[v] === comp[6]) && comp[0] !== comp[6];
  return { count: k, comp, isGroups, whole: d.every((x) => x >= 0) };
}

const START = loads(new Set());
const ORDER = [...BRIDGES, ...EDGES.map((_, i) => i).filter((i) => !BRIDGES.includes(i))]; // tap-target DOM order

type First = { cut: number; other: number; before: number; after: number; inner: number; innerBefore: number; innerAfter: number };

export default function CutTheBusiestLink({ slug }: { slug: string }) {
  const [cut, setCut] = useState<number[]>([]);
  const [prev, setPrev] = useState<number[] | null>(null);
  const [tick, setTick] = useState(0);
  const [first, setFirst] = useState<First | null>(null);
  const [split, setSplit] = useState<[number, number] | null>(null);

  const cutSet = new Set(cut);
  const L = loads(cutSet);
  const P = pieces(cutSet);
  const frozen = P.count > 1;
  const changed = new Set(prev ? EDGES.map((_, i) => i).filter((i) => !cutSet.has(i) && Math.abs(L[i] - prev[i]) > 1e-9) : []);
  const busiest = EDGES.map((_, i) => i)
    .filter((i) => !cutSet.has(i))
    .reduce((best, i) => (best < 0 || L[i] > L[best] + 1e-9 ? i : best), -1);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Two friend groups are joined by two links, each carrying 12 shortest paths. Cut one link. What does the other carry now?",
        options: ["12, the same", "24", "6"],
        answer: 1,
      }}
      exploreHint="Cut a link between the groups and watch every number recount. Then keep cutting the busiest."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Before the cut, the {GROUP1.length * GROUP2.length} pairs with one person in each group shared two links,{" "}
            {fmt(START[BRIDGES[0]])} each. After you cut one, all {GROUP1.length * GROUP2.length} had to squeeze through the
            other, so its count {first && Math.abs(first.after - 2 * first.before) < 1e-9 ? `doubled to ${fmt(first.after)}` : `rose to ${first ? fmt(first.after) : ""}`}, and
            links inside the groups changed too.
          </p>
          <p>
            A list ranked once goes stale after every cut. So the Girvan–Newman method cuts the busiest link, recounts, and
            repeats. Your last cut split the network into its two groups, {split?.[0]} and {split?.[1]}.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-bridge-cut", "split"]}>
          {(reach) => {
            const apply = (next: number[]) => {
              if (locked) return;
              const ns = new Set(next);
              const nl = loads(ns);
              const np = pieces(ns);
              setPrev(L);
              setCut(next);
              setTick(tick + 1);
              const bridgesCut = BRIDGES.filter((b) => ns.has(b));
              if (!first && np.whole && bridgesCut.length === 1) {
                const c = bridgesCut[0];
                const other = BRIDGES.find((b) => b !== c)!;
                let inner = -1;
                EDGES.forEach((_, i) => {
                  if (BRIDGES.includes(i) || ns.has(i)) return;
                  if (inner < 0 || Math.abs(nl[i] - L[i]) > Math.abs(nl[inner] - L[inner]) + 1e-9) inner = i;
                });
                setFirst({ cut: c, other, before: L[other], after: nl[other], inner, innerBefore: L[inner], innerAfter: nl[inner] });
                reach("first-bridge-cut");
              }
              if (np.isGroups) {
                setSplit([GROUP1.length, GROUP2.length]);
                reach("split");
              }
            };
            const tap = (i: number) => {
              if (locked || frozen) return;
              apply(cutSet.has(i) ? cut.filter((x) => x !== i) : [...cut, i]);
            };
            const cutBusiest = () => {
              if (locked || frozen || busiest < 0) return;
              apply([...cut, busiest]);
            };
            const reset = () => {
              if (locked) return;
              setPrev(null);
              setCut([]);
            };

            const msg = locked
              ? "Make a prediction to start."
              : P.isGroups
                ? `Split: two groups, ${GROUP1.length} and ${GROUP2.length}. Reset to start again.`
                : frozen
                  ? "A piece broke off, not the two groups. Reset to try again."
                  : cut.length === 0
                    ? "Number on a link: shortest paths it carries. Tap a link to cut it."
                    : `Recounted after cutting ${name(cut[cut.length - 1])}. Blinking counts changed.`;
            const fill = (v: number) =>
              !locked && P.isGroups ? (GROUP1.includes(v) ? "var(--domain)" : "var(--good)") : "var(--bg-2)";

            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <Row>
                  <Control disabled={locked || frozen} onClick={cutBusiest}>
                    Cut busiest{!locked && !frozen && busiest >= 0 ? ` (${name(busiest)})` : ""}
                  </Control>
                  <Control disabled={locked || cut.length === 0} onClick={reset}>
                    Reset
                  </Control>
                </Row>
                <div className={s.stage}>
                  <svg viewBox={`0 0 ${VW} ${VH}`} className="stage-svg" role="img" aria-label={`Network, ${17 - cut.length} of 17 links, ${P.count} piece${P.count > 1 ? "s" : ""}`}>
                    {EDGES.map(([a, b], i) => {
                      const isCut = cutSet.has(i);
                      return (
                        <line
                          key={`l${i}-${changed.has(i) ? tick : 0}`}
                          x1={POS[a][0]}
                          y1={POS[a][1]}
                          x2={POS[b][0]}
                          y2={POS[b][1]}
                          stroke={isCut ? "var(--bad)" : "var(--fg)"}
                          strokeWidth={isCut ? 2 : 1.5 + L[i] * 0.35}
                          strokeDasharray={isCut ? "4 5" : undefined}
                          opacity={isCut ? 0.6 : 0.45}
                          className={changed.has(i) ? s.blink : undefined}
                        />
                      );
                    })}
                    {POS.map(([x, y], v) => (
                      <circle key={v} cx={x} cy={y} r={10} fill={fill(v)} stroke="var(--fg)" strokeWidth={1.5} />
                    ))}
                    {EDGES.map((_, i) => {
                      const [x, y] = MID[i];
                      const isCut = cutSet.has(i);
                      const txt = isCut ? "✕" : fmt(L[i]);
                      const w = txt.length * 7 + 6;
                      return (
                        <g key={`t${i}-${changed.has(i) ? tick : 0}`} className={changed.has(i) ? s.blink : undefined}>
                          <rect x={x - w / 2} y={y - 8} width={w} height={16} rx={4} fill={changed.has(i) ? "color-mix(in srgb, var(--domain) 45%, var(--bg))" : "var(--bg)"} opacity={0.92} />
                          <text x={x} y={y + 4.5} textAnchor="middle" className={`${s.num} ${isCut ? s.cutNum : changed.has(i) ? s.changed : ""}`}>
                            {txt}
                          </text>
                        </g>
                      );
                    })}
                    {!locked && P.isGroups ? (
                      <>
                        <text x={95} y={VH - 4} textAnchor="middle" className={s.group}>
                          group of {GROUP1.length}
                        </text>
                        <text x={300} y={VH - 4} textAnchor="middle" className={s.group}>
                          group of {GROUP2.length}
                        </text>
                      </>
                    ) : null}
                  </svg>
                  {ORDER.map((i) => (
                    <button
                      key={i}
                      type="button"
                      data-qa="control"
                      className={s.hit}
                      style={{ left: `calc(${(MID[i][0] / VW) * 100}% - ${HIT / 2}px)`, top: `calc(${(MID[i][1] / VH) * 100}% - ${HIT / 2}px)`, width: HIT, height: HIT }}
                      disabled={locked || frozen}
                      aria-pressed={cutSet.has(i)}
                      aria-label={cutSet.has(i) ? `Restore link ${name(i)}` : `Cut link ${name(i)}, carries ${fmt(L[i])}`}
                      onClick={() => tap(i)}
                    />
                  ))}
                </div>
                <p className={s.trace}>
                  {!locked && first
                    ? `First cut ${name(first.cut)}: ${name(first.other)} ${fmt(first.before)} → ${fmt(first.after)}, ${name(first.inner)} ${fmt(first.innerBefore)} → ${fmt(first.innerAfter)}.`
                    : " "}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
