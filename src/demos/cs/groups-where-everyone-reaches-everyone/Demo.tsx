"use client";

// Strongly connected components by Kosaraju's two passes. Roads 1>2, 2>3, 3>1, 3>4, 4>5, 5>6, 6>4, 7>6.
// Pass 1: depth-first search from 1 (smallest town first, neighbours in order) gives the finish order
// 6, 5, 4, 3, 2, 1, 7. Pass 2: reverse every road, then flood from the town that finished last, skipping
// towns already coloured: {7}, then {1, 2, 3}, then {4, 5, 6}. Three groups, though all 7 towns are one
// connected map if you ignore direction. One representation: the road map, recoloured as groups appear.

import { useId, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const TOWNS = [1, 2, 3, 4, 5, 6, 7];
const ROADS: [number, number][] = [
  [1, 2],
  [2, 3],
  [3, 1],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 4],
  [7, 6],
];
const POS: Record<number, [number, number]> = {
  1: [50, 50],
  2: [140, 50],
  3: [95, 130],
  4: [205, 130],
  5: [250, 50],
  6: [295, 130],
  7: [295, 208],
};
const COLOURS = ["var(--domain)", "var(--good-fill)", "var(--warn-fill)"];
const R = 18;

const out = (roads: [number, number][], u: number) => roads.filter(([a]) => a === u).map(([, b]) => b).sort((x, y) => x - y);

// Pass 1: finish order of a depth-first search over the towns in number order.
const FINISH = (() => {
  const seen = new Set<number>();
  const order: number[] = [];
  const dfs = (u: number) => {
    seen.add(u);
    for (const v of out(ROADS, u)) if (!seen.has(v)) dfs(v);
    order.push(u);
  };
  for (const u of TOWNS) if (!seen.has(u)) dfs(u);
  return order;
})();
const REVERSED: [number, number][] = ROADS.map(([a, b]) => [b, a]);

// Pass 2: groups, flooding the reversed roads from the latest-finishing uncoloured town.
const GROUPS = (() => {
  const seen = new Set<number>();
  const groups: { start: number; towns: number[]; blocked: number[] }[] = [];
  for (const u of [...FINISH].reverse()) {
    if (seen.has(u)) continue;
    const towns: number[] = [];
    const blocked = new Set<number>();
    const go = (x: number) => {
      seen.add(x);
      towns.push(x);
      for (const y of out(REVERSED, x)) {
        if (!seen.has(y)) go(y);
        else if (!towns.includes(y)) blocked.add(y);
      }
    };
    go(u);
    groups.push({ start: u, towns: [...towns].sort((a, b) => a - b), blocked: [...blocked].sort((a, b) => a - b) });
  }
  return groups;
})();
const groupOf = (t: number) => GROUPS.findIndex((g) => g.towns.includes(t));
const rank = (t: number) => FINISH.indexOf(t) + 1;
const ordinal = (n: number) => `${n}${n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"}`;

export default function SccTwoPasses({ slug }: { slug: string }) {
  const [pass1, setPass1] = useState(false);
  const [reversed, setReversed] = useState(false);
  const [found, setFound] = useState(0); // groups coloured in pass 2
  const marker = `scc-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const roads = reversed ? REVERSED : ROADS;
  const done = found >= GROUPS.length;
  const coloured = (t: number) => groupOf(t) < found;
  const g = found > 0 ? GROUPS[found - 1] : null;

  const note = !pass1
    ? "One-way roads. Arrows show the direction."
    : !reversed
      ? `Finished in order ${FINISH.join(", ")}. Now reverse every road.`
      : found === 0
        ? `Reversed. Start from ${GROUPS[0].start}, the last to finish.`
        : `From ${g!.start}: {${g!.towns.join(", ")}}${g!.blocked.length ? `; ${g!.blocked.join(", ")} already coloured` : ""}.`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "One-way roads: 1 to 2, 2 to 3, 3 to 1, 3 to 4, 4 to 5, 5 to 6, 6 to 4, 7 to 6. How many groups are there where every town can reach every other in the group?",
        options: ["2", "3", "7"],
        answer: 1,
      }}
      exploreHint="Run pass 1, reverse the roads, then run pass 2 until every town has a colour."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Pass 2 coloured {GROUPS.length} groups: {GROUPS.map((x) => `{${x.towns.join(", ")}}`).join(", ")}. Every town is
            on one map, but town 3 can reach 4 and 4 cannot reach back, so the two loops are different groups. Town 7 reaches
            the right loop, and nothing reaches 7, so it is a group on its own.
          </p>
          <p>
            In pass 2, every reversed road leaving a new group led into a town already coloured (4 to 3, 6 to 7), so each
            flood stayed inside its own group. Shrinking each group to a point leaves 7 → {"{4, 5, 6}"} ← {"{1, 2, 3}"}: no loops left. That is why the
            groups can be put in order.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["pass-1", "reversed", "all-groups"]}>
          {(reach) => {
            const runPass1 = () => {
              if (locked || pass1) return;
              setPass1(true);
              reach("pass-1");
            };
            const reverse = () => {
              if (locked || !pass1 || reversed) return;
              setReversed(true);
              reach("reversed");
            };
            const nextGroup = () => {
              if (locked || !reversed || done) return;
              const n = found + 1;
              setFound(n);
              if (n >= GROUPS.length) reach("all-groups");
            };
            const restart = () => {
              if (locked || !pass1) return;
              setPass1(false);
              setReversed(false);
              setFound(0);
            };

            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox="0 0 340 236" className="stage-svg" role="img" aria-label={note}>
                  <defs>
                    <marker id={marker} viewBox="0 0 10 10" refX={9} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
                      <path d="M0 0 L10 5 L0 10 z" fill="var(--fg)" />
                    </marker>
                  </defs>
                  {roads.map(([a, b]) => {
                    const [x1, y1] = POS[a];
                    const [x2, y2] = POS[b];
                    const d = Math.hypot(x2 - x1, y2 - y1);
                    const ux = (x2 - x1) / d;
                    const uy = (y2 - y1) / d;
                    const inside = coloured(a) && groupOf(a) === groupOf(b);
                    return (
                      <line
                        key={`${a}-${b}`}
                        x1={x1 + ux * R}
                        y1={y1 + uy * R}
                        x2={x2 - ux * (R + 2)}
                        y2={y2 - uy * (R + 2)}
                        stroke={inside ? COLOURS[groupOf(a)] : "var(--fg)"}
                        strokeOpacity={inside ? 1 : 0.7}
                        strokeWidth={inside ? 3 : 1.8}
                        markerEnd={`url(#${marker})`}
                      />
                    );
                  })}
                  {TOWNS.map((t) => {
                    const [x, y] = POS[t];
                    const c = coloured(t) ? COLOURS[groupOf(t)] : null;
                    return (
                      <g key={t}>
                        <circle cx={x} cy={y} r={R} fill={c ?? "var(--bg-2)"} stroke={c ?? "var(--fg)"} strokeWidth={1.8} />
                        <text x={x} y={y + 6} textAnchor="middle" className={c ? s.tOn : s.t}>
                          {t}
                        </text>
                        {pass1 && (
                          <text x={x + R + 6} y={y - R + 2} className={s.f}>
                            {ordinal(rank(t))}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  <Control className={!pass1 ? "active" : ""} disabled={locked || pass1} onClick={runPass1}>
                    Pass 1: finish order
                  </Control>
                  <Control className={pass1 && !reversed ? "active" : ""} disabled={locked || !pass1 || reversed} onClick={reverse}>
                    Reverse roads
                  </Control>
                  <Control className={reversed && !done ? "active" : ""} disabled={locked || !reversed || done} onClick={nextGroup}>
                    Pass 2: next group
                  </Control>
                  <Control disabled={locked || !pass1} onClick={restart}>
                    Start over
                  </Control>
                </Row>
                <Row>
                  <Readout label="Groups" value={found} />
                  <Readout label="Roads" value={reversed ? "reversed" : "as given"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
