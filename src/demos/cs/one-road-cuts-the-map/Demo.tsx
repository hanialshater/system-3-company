"use client";

// Bridges: close one road at a time and flood-fill from town 1. Triangle 1-2-3, road 3-4,
// triangle 4-5-6. Only closing 3-4 splits the map; every triangle road has a way round.
// v2: the towns sit on a circle in the order 1, 4, 2, 5, 6, 3, so the two triangles cross each other and
// 3-4 is one chord among seven (v1's two-triangles-and-a-link drawing showed the answer before the commit).
// "Walk depth-first" runs one DFS from town 1 and shows, per town, its visit number and the highest-up visit
// number it can climb back to (#k ↑#low). Road 3-4 is the one tree road whose lower side climbs no higher than
// its own lower end, so it is marked as the bridge. Milestones: first-test, all-tested, dfs-walk.
// v3 (wave G r7): the climb-back mark reads as "earliest visit it can loop back to" (↩#low, smaller = earlier),
// with a legend on the stage for ↩ and for dotted roads; a "Walk" line under the readouts keeps the
// numbers the reveal quotes (town 4 #3 ↩#3, town 3 #2) in a stage row.
// v4 (W-246, FC pass 26): the walk is computed on the full map, so "Walk depth-first" reopens every road and the
// walk marks (badges, dotted roads, bridge) and their legend show exactly when walked and no road is closed; closing
// a road afterwards hides the marks (the note says so) instead of drawing badges that belong to a different map.
// One representation: the map; reachable towns from town 1 in the domain colour, cut-off towns red.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const TOWNS = [1, 2, 3, 4, 5, 6];
const ROADS: [number, number][] = [
  [1, 2],
  [2, 3],
  [1, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [4, 6],
];
// Circle layout, clockwise from the top: 1, 4, 2, 5, 6, 3 (2-3 and 4-6 are the diameters; 3-4 is a middle-length chord like 1-2 and 4-5).
const CX = 160;
const CY = 124;
const RAD = 84;
const RING = [1, 4, 2, 5, 6, 3];
const POS: Record<number, [number, number]> = Object.fromEntries(
  RING.map((t, i) => {
    const a = (-90 + 60 * i) * (Math.PI / 180);
    return [t, [CX + RAD * Math.cos(a), CY + RAD * Math.sin(a)]];
  }),
);
const name = (r: [number, number]) => `${r[0]}–${r[1]}`;

// towns reachable from town 1 with road `closed` removed
function reach(closed: number | null) {
  const seen = new Set([1]);
  const stack = [1];
  while (stack.length) {
    const u = stack.pop()!;
    ROADS.forEach(([a, b], i) => {
      if (i === closed) return;
      for (const [x, y] of [
        [a, b],
        [b, a],
      ])
        if (x === u && !seen.has(y)) {
          seen.add(y);
          stack.push(y);
        }
    });
  }
  return seen;
}
const SPLITS = ROADS.map((_, i) => reach(i).size < TOWNS.length);
const BRIDGES = ROADS.filter((_, i) => SPLITS[i]); // [3-4]

// One depth-first pass from town 1 (highest-numbered neighbour first, so visit numbers differ from town names): visit numbers, the lowest visit number each
// town's subtree can climb back to by a non-tree road (low), and the tree roads with low[child] > disc[parent].
const DFS = (() => {
  const adj: Record<number, number[]> = {};
  for (const t of TOWNS) adj[t] = [];
  ROADS.forEach(([a, b]) => {
    adj[a].push(b);
    adj[b].push(a);
  });
  for (const t of TOWNS) adj[t].sort((x, y) => y - x);
  const disc: Record<number, number> = {};
  const low: Record<number, number> = {};
  const tree: [number, number][] = [];
  const bridges: [number, number][] = [];
  let n = 0;
  const go = (u: number, parent: number) => {
    disc[u] = low[u] = ++n;
    for (const v of adj[u]) {
      if (v === parent) continue;
      if (disc[v]) low[u] = Math.min(low[u], disc[v]);
      else {
        tree.push([u, v]);
        go(v, u);
        low[u] = Math.min(low[u], low[v]);
        if (low[v] > disc[u]) bridges.push([u, v]);
      }
    }
  };
  go(1, 0);
  return { disc, low, tree, bridges };
})();
const isDfsBridge = (r: [number, number]) => DFS.bridges.some(([a, b]) => (a === r[0] && b === r[1]) || (a === r[1] && b === r[0]));
const isTree = (r: [number, number]) => DFS.tree.some(([a, b]) => (a === r[0] && b === r[1]) || (a === r[1] && b === r[0]));
const BR = DFS.bridges[0]; // [3, 4]: parent 3, child 4

export default function OneRoadCutsTheMap({ slug }: { slug: string }) {
  const [closed, setClosed] = useState<number | null>(null);
  const [tested, setTested] = useState<number[]>([]);
  const [walked, setWalked] = useState(false);
  const reachable = reach(closed);
  const whole = tested.filter((i) => !SPLITS[i]).length;
  const split = tested.length - whole;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Seven roads join six towns, as drawn. Close one road at a time and test whether every town can still reach every other. For how many of the 7 roads does closing it split the map?`,
        options: ["0 of 7", "1 of 7", "3 of 7", "7 of 7"],
        answer: 1,
      }}
      exploreHint="Close each road in turn, then walk the map depth-first."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            You closed all {ROADS.length} roads. {ROADS.length - BRIDGES.length} of them left the map whole; only{" "}
            {BRIDGES.map(name).join(", ")} cut towns 4, 5 and 6 off from 1, 2 and 3. Towns 3 and 4 each touch three roads,
            but closing any of their other roads changed nothing: those roads sit on loops, so traffic went the other way round.
          </p>
          <p>
            A road on a loop has a detour; a bridge is a road on no loop. Your depth-first walk found it in one pass: town{" "}
            {BR[1]} was visited #{DFS.disc[BR[1]]}, and the earliest visit anything from there on can loop back to is #
            {DFS.low[BR[1]]} (↩#{DFS.low[BR[1]]}). Town {BR[0]}, #{DFS.disc[BR[0]]}, came earlier and no loop reaches it, so no
            other road gets around {name(BR)}.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-test", "all-tested", "dfs-walk"]}>
          {(hit) => {
            const close = (i: number) => {
              if (locked || closed === i) return;
              setClosed(i);
              const next = tested.includes(i) ? tested : [...tested, i];
              setTested(next);
              hit("first-test");
              if (next.length === ROADS.length) hit("all-tested");
            };
            const reopen = () => {
              if (locked || closed === null) return;
              setClosed(null);
            };
            const walk = () => {
              if (locked || walked) return;
              setClosed(null);
              setWalked(true);
              hit("dfs-walk");
            };

            // walk marks belong to the full map: shown only after the walk and while every road is open
            const marks = walked && closed === null;
            const hidden = walked ? " Reopen all to see the walk." : "";
            const note =
              closed === null
                ? marks
                  ? `Depth-first from 1. #visit order; ↩ earliest # it loops back to. Dotted: road back.`
                  : "Tap a road below to close it."
                : SPLITS[closed]
                  ? `${name(ROADS[closed])} closed: the map splits in two.${hidden}`
                  : `${name(ROADS[closed])} closed: every town is still reachable.${hidden}`;

            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox="0 0 320 266" className="stage-svg" role="img" aria-label={`${reachable.size} of 6 towns reachable`}>
                  {ROADS.map((r, i) => {
                    const [x1, y1] = POS[r[0]];
                    const [x2, y2] = POS[r[1]];
                    const isClosed = i === closed;
                    const isTested = tested.includes(i);
                    const dfsBridge = marks && isDfsBridge(r);
                    const back = marks && !isTree(r);
                    return (
                      <g key={name(r)}>
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={isClosed ? "var(--bad)" : dfsBridge ? "var(--domain)" : "var(--fg)"}
                          strokeWidth={isClosed ? 3 : dfsBridge ? 6 : 4}
                          strokeDasharray={isClosed ? "5 5" : back ? "2 4" : undefined}
                          opacity={isClosed ? 0.9 : isTested || walked ? 0.85 : 0.5}
                        />
                        {isClosed ? (
                          <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + 6} textAnchor="middle" className={s.cross}>
                            ✕
                          </text>
                        ) : null}
                      </g>
                    );
                  })}
                  {TOWNS.map((t) => {
                    const ok = reachable.has(t);
                    const [x, y] = POS[t];
                    const ox = ((x - CX) / RAD) * 34;
                    const oy = ((y - CY) / RAD) * 30;
                    return (
                      <g key={t}>
                        <circle cx={x} cy={y} r={17} fill={ok ? "var(--domain)" : "var(--bad)"} stroke="var(--fg)" strokeWidth={1.5} />
                        <text x={x} y={y + 6} textAnchor="middle" className={s.town}>
                          {t}
                        </text>
                        {marks ? (
                          <text x={x + ox} y={y + oy + 4} textAnchor="middle" className={s.badge}>
                            #{DFS.disc[t]} ↩#{DFS.low[t]}
                          </text>
                        ) : null}
                      </g>
                    );
                  })}
                  <text x={160} y={262} textAnchor="middle" className={s.label}>
                    {reachable.size} of {TOWNS.length} towns reachable from town 1
                  </text>
                </svg>
                <Row>
                  {ROADS.map((r, i) => (
                    <Control
                      key={name(r)}
                      className={i === closed ? "active" : ""}
                      disabled={locked || i === closed}
                      onClick={() => close(i)}
                      aria-label={`Close road ${name(r)}`}
                    >
                      {name(r)}
                      {tested.includes(i) ? (SPLITS[i] ? " ✕" : " ✓") : ""}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Control disabled={locked || closed === null} onClick={reopen}>
                    Reopen all
                  </Control>
                  <Control disabled={locked || walked} onClick={walk}>
                    Walk depth-first
                  </Control>
                </Row>
                <Row>
                  <Readout label="Map stays whole" value={whole} />
                  <Readout label="Map splits" value={split} />
                  <Readout label="Roads tested" value={`${tested.length} / ${ROADS.length}`} />
                </Row>
                {walked && (
                  <p className={s.note} data-testid="seen-walk">
                    Walk: town {BR[1]} #{DFS.disc[BR[1]]} ↩#{DFS.low[BR[1]]}, town {BR[0]} #{DFS.disc[BR[0]]}. Bridge: {name(BR)}.
                  </p>
                )}
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
