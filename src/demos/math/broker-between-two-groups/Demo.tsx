"use client";

// Broker between two groups. 11 people: Hana (0) and her 5 friends (1-5) all know each other; a
// second group of 4 (6-9) all know each other; Bo (10) is friends with 2 of Hana's friends (1, 2) and
// 2 people in the other group (6, 7), not with Hana. Following brief 6 exactly.
// Controls in order: Hana, Bo (show that person's friends, the friend pairs who are strangers as
// dashed lines, and how many pairs of other people have every shortest path through them), then
// "Next pair" which traces one shortest path between a person in each group (24 such pairs, all via Bo).
// Numbers computed here: Hana 5 friends, 0 stranger pairs, betweenness 0; Bo 4 friends, 4 stranger
// pairs, betweenness 24; the next highest (Bo's friends 1 and 2, who have 6 friends) 10.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const N = 11;
const HANA = 0;
const BO = 10;
const GROUP_A = [0, 1, 2, 3, 4, 5];
const GROUP_B = [6, 7, 8, 9];
const MILESTONES = ["saw-hana", "saw-bo", "traced-a-path"] as const;
type Who = typeof HANA | typeof BO;

const EDGES: [number, number][] = [];
for (const g of [GROUP_A, GROUP_B]) for (let i = 0; i < g.length; i++) for (let j = i + 1; j < g.length; j++) EDGES.push([g[i], g[j]]);
EDGES.push([BO, 1], [BO, 2], [BO, 6], [BO, 7]);
const NB: number[][] = Array.from({ length: N }, () => []);
for (const [a, b] of EDGES) {
  NB[a].push(b);
  NB[b].push(a);
}
const linked = (a: number, b: number) => NB[a].includes(b);

/** Pairs of v's friends who are not friends with each other. */
const strangerPairs = (v: number) => {
  const f = NB[v];
  const out: [number, number][] = [];
  for (let i = 0; i < f.length; i++) for (let j = i + 1; j < f.length; j++) if (!linked(f[i], f[j])) out.push([f[i], f[j]]);
  return out;
};

/** Breadth-first search from s: distances, shortest-path counts, and one predecessor per node. */
function bfs(src: number) {
  const d = Array(N).fill(-1);
  const sigma = Array(N).fill(0);
  const pred = Array(N).fill(-1);
  d[src] = 0;
  sigma[src] = 1;
  const q = [src];
  while (q.length) {
    const v = q.shift()!;
    for (const w of [...NB[v]].sort((a, b) => a - b)) {
      if (d[w] < 0) {
        d[w] = d[v] + 1;
        pred[w] = v;
        q.push(w);
      }
      if (d[w] === d[v] + 1) sigma[w] += sigma[v];
    }
  }
  return { d, sigma, pred };
}
const BFS = Array.from({ length: N }, (_, v) => bfs(v));

/** Betweenness: over pairs of other people, the share of their shortest paths that pass through v. */
const BETWEENNESS = Array.from({ length: N }, (_, v) => {
  let b = 0;
  for (let a = 0; a < N; a++)
    for (let c = a + 1; c < N; c++) {
      if (a === v || c === v) continue;
      const A = BFS[a];
      if (A.d[v] + BFS[v].d[c] === A.d[c]) b += (A.sigma[v] * BFS[v].sigma[c]) / A.sigma[c];
    }
  return b;
});
const NEXT_HIGHEST = Math.max(...BETWEENNESS.filter((_, v) => v !== BO));
const MOST_FRIENDS = Math.max(...NB.map((f) => f.length));

// The 24 pairs with one person in each group, Hana's first. One shortest path each (lowest-numbered route).
const CROSS: [number, number][] = GROUP_A.flatMap((a) => GROUP_B.map((b) => [a, b] as [number, number]));
const pathOf = ([a, b]: [number, number]) => {
  const out = [b];
  while (out[0] !== a) out.unshift(BFS[a].pred[out[0]]);
  return out;
};
const allViaBo = ([a, b]: [number, number]) =>
  BFS[a].d[BO] + BFS[BO].d[b] === BFS[a].d[b] && BFS[a].sigma[BO] * BFS[BO].sigma[b] === BFS[a].sigma[b];
const CROSS_VIA_BO = CROSS.filter(allViaBo).length;

// Hand-drawn layout: Hana's group a hexagon on the left (Hana top-left), the other group a square on
// the right, Bo in the gap.
const POS: [number, number][] = [];
// Put Bo's two friends (1, 2) on the right-hand corners of the hexagon (30° and -30°).
const HEX_ANGLES = [150, 30, -30, -90, 210, 90];
GROUP_A.forEach((v, k) => {
  const ang = (HEX_ANGLES[k] * Math.PI) / 180;
  POS[v] = [92 + 62 * Math.cos(ang), 104 - 62 * Math.sin(ang)];
});
const SQ_ANGLES = [135, 225, 315, 45];
GROUP_B.forEach((v, k) => {
  const ang = (SQ_ANGLES[k] * Math.PI) / 180;
  POS[v] = [288 + 42 * Math.cos(ang), 104 - 42 * Math.sin(ang)];
});
POS[BO] = [192, 104];

export const STAGE_NUMBERS = {
  friends: NB.map((f) => f.length),
  strangers: { hana: strangerPairs(HANA).length, bo: strangerPairs(BO).length },
  betweenness: BETWEENNESS,
  nextHighest: NEXT_HIGHEST,
  crossViaBo: CROSS_VIA_BO,
};

export default function BrokerBetweenTwoGroups({ slug }: { slug: string }) {
  const [who, setWho] = useState<Who | null>(null);
  const [traced, setTraced] = useState(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "At your office, Hana has 5 friends who all know each other. Bo has 4, from two separate groups. Who sits on more shortest paths between other people?",
        options: ["Hana", "Bo", "Same"],
        answer: 1,
      }}
      exploreHint="Look at Hana, then Bo, then trace paths from one group to the other."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Hana has more friends ({NB[HANA].length} to {NB[BO].length}), but they all know each other, so nobody needs her:
            she is on the shortest paths of {BETWEENNESS[HANA]} pairs. Bo&apos;s friends include {strangerPairs(BO).length} pairs
            of strangers, and every path you traced between the groups ran through him: all {CROSS_VIA_BO} pairs.
          </p>
          <p>
            Even the two people with the most friends ({MOST_FRIENDS} each) score only {NEXT_HIGHEST} on the same count: they split their paths
            half and half.
          </p>
          <p>
            Bo spans a gap between groups with no other link, called a structural hole. Sitting in one can matter more than
            having the most friends.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              who={who}
              traced={traced}
              onPick={(w) => {
                setWho(w);
                reach(w === HANA ? "saw-hana" : "saw-bo");
              }}
              onTrace={() => {
                setTraced(traced + 1);
                reach("traced-a-path");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  who,
  traced,
  onPick,
  onTrace,
}: {
  locked: boolean;
  who: Who | null;
  traced: number;
  onPick: (w: Who) => void;
  onTrace: () => void;
}) {
  const pair = traced > 0 ? CROSS[(traced - 1) % CROSS.length] : null;
  const path = pair ? pathOf(pair) : [];
  const onPath = new Set<string>();
  for (let i = 0; i + 1 < path.length; i++) onPath.add([path[i], path[i + 1]].sort((a, b) => a - b).join("-"));
  const friends = new Set(who === null ? [] : NB[who]);
  const gaps = who === null ? [] : strangerPairs(who);
  const caption = locked
    ? "Make a prediction to start."
    : pair
      ? `Path ${((traced - 1) % CROSS.length) + 1} of ${CROSS.length} between the groups: through Bo.`
      : who === HANA
        ? "Hana's friends all know each other."
        : who === BO
          ? "Bo's friends: dashed pairs are strangers."
          : "Tap Hana or Bo.";

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 340 200" className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        {EDGES.map(([a, b], i) => {
          const hot = onPath.has([a, b].sort((x, y) => x - y).join("-"));
          const mine = who !== null && (a === who || b === who);
          return (
            <line
              key={i}
              x1={POS[a][0]}
              y1={POS[a][1]}
              x2={POS[b][0]}
              y2={POS[b][1]}
              className={hot ? s.path : mine ? s.mine : s.edge}
            />
          );
        })}
        {gaps.map(([a, b], i) => (
          <line key={`g${i}`} x1={POS[a][0]} y1={POS[a][1]} x2={POS[b][0]} y2={POS[b][1]} className={s.gap} />
        ))}
        {POS.map(([x, y], v) => {
          const named = v === HANA || v === BO;
          const end = pair && (v === pair[0] || v === pair[1]);
          return (
            <circle
              key={v}
              cx={x}
              cy={y}
              r={named ? 12 : 9}
              className={`${v === who ? s.picked : friends.has(v) ? s.friend : named ? s.named : s.person} ${end ? s.end : ""}`}
            />
          );
        })}
        <text x={POS[HANA][0] - 6} y={POS[HANA][1] - 18} className={s.label}>Hana</text>
        <text x={POS[BO][0]} y={POS[BO][1] - 20} className={s.label}>Bo</text>
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <div className={s.controls}>
        <Control
          className={`${s.tap} ${who === HANA ? "active" : ""}`}
          disabled={locked || who === HANA}
          onClick={() => onPick(HANA)}
        >
          Hana
        </Control>
        <Control className={`${s.tap} ${who === BO ? "active" : ""}`} disabled={locked || who === BO} onClick={() => onPick(BO)}>
          Bo
        </Control>
        <Control className={s.tap} disabled={locked} onClick={onTrace} aria-label="Trace the next path between the two groups">
          Next path
        </Control>
      </div>
      <Row>
        <Readout label="Friends" value={locked || who === null ? "?" : NB[who].length} />
        <Readout label="Stranger pairs" value={locked || who === null ? "?" : gaps.length} />
        <Readout label="On paths of" value={locked || who === null ? "?" : `${BETWEENNESS[who]} pairs`} />
      </Row>
    </div>
  );
}
