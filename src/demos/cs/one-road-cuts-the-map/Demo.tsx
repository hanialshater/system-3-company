"use client";

// Bridges: close one road at a time and flood-fill from town 1. Triangle 1-2-3, road 3-4,
// triangle 4-5-6. Only closing 3-4 splits the map; every triangle road has a way round.
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
const POS: Record<number, [number, number]> = {
  1: [40, 50],
  2: [40, 160],
  3: [120, 105],
  4: [200, 105],
  5: [280, 160],
  6: [280, 50],
};
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

export default function OneRoadCutsTheMap({ slug }: { slug: string }) {
  const [closed, setClosed] = useState<number | null>(null);
  const [tested, setTested] = useState<number[]>([]);
  const reachable = reach(closed);
  const whole = tested.filter((i) => !SPLITS[i]).length;
  const split = tested.length - whole;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Seven roads join six towns: a triangle 1-2-3, a road 3-4, and a triangle 4-5-6. Close one road at a time and test whether all towns stay connected. For how many roads does the network fall apart?`,
        options: ["0", String(BRIDGES.length), String(ROADS.length)],
        answer: 1,
      }}
      exploreHint="Close each road in turn. Coloured towns can still be reached from town 1."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You closed all {ROADS.length} roads. {ROADS.length - BRIDGES.length} of them left the map whole; only{" "}
            {BRIDGES.map(name).join(", ")} cut towns 4, 5 and 6 off from 1, 2 and 3. Town 3 and town 4 each touch three roads,
            but closing a triangle road beside them changed nothing: traffic went the other way round.
          </p>
          <p>
            A road on a loop has a detour; a bridge is a road on no loop, so it has none. Depth-first search finds every bridge
            in one pass by noting, for each road it walks down, whether the towns below can climb back above it by another road.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-test", "all-tested"]}>
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

            const note =
              closed === null
                ? "Tap a road number below to close that road."
                : SPLITS[closed]
                  ? `${name(ROADS[closed])} closed: the map splits in two.`
                  : `${name(ROADS[closed])} closed: every town is still reachable.`;

            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox="0 0 320 210" className="stage-svg" role="img" aria-label={`${reachable.size} of 6 towns reachable`}>
                  {ROADS.map((r, i) => {
                    const [x1, y1] = POS[r[0]];
                    const [x2, y2] = POS[r[1]];
                    const isClosed = i === closed;
                    const isTested = tested.includes(i);
                    return (
                      <g key={name(r)}>
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={isClosed ? "var(--bad)" : "var(--fg)"}
                          strokeWidth={isClosed ? 3 : 4}
                          strokeDasharray={isClosed ? "5 5" : undefined}
                          opacity={isClosed ? 0.9 : isTested ? 0.85 : 0.5}
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
                    return (
                      <g key={t}>
                        <circle
                          cx={POS[t][0]}
                          cy={POS[t][1]}
                          r={17}
                          fill={ok ? "var(--domain)" : "var(--bad)"}
                          stroke="var(--fg)"
                          strokeWidth={1.5}
                        />
                        <text x={POS[t][0]} y={POS[t][1] + 6} textAnchor="middle" className={s.town}>
                          {t}
                        </text>
                      </g>
                    );
                  })}
                  <text x={160} y={200} textAnchor="middle" className={s.label}>
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
                </Row>
                <Row>
                  <Readout label="Map stays whole" value={whole} />
                  <Readout label="Map splits" value={split} />
                  <Readout label="Roads tested" value={`${tested.length} / ${ROADS.length}`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
