"use client";

// Kruskal's algorithm: test roads cheapest first; build a road unless its two towns are already
// connected (same group). Five towns, eight roads: A-C 1, B-C 2, D-E 3 built, A-B 4 skipped,
// B-D 5 built, A-D 7, C-D 8, C-E 10 skipped. 4 roads built, total 11. The lesson is the skips.
// One representation: the map, with group colours on the towns and a verdict line above it.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Town = "A" | "B" | "C" | "D" | "E";
const TOWNS: Town[] = ["A", "B", "C", "D", "E"];
// already sorted cheapest first
const ROADS: { a: Town; b: Town; cost: number }[] = [
  { a: "A", b: "C", cost: 1 },
  { a: "B", b: "C", cost: 2 },
  { a: "D", b: "E", cost: 3 },
  { a: "A", b: "B", cost: 4 },
  { a: "B", b: "D", cost: 5 },
  { a: "A", b: "D", cost: 7 },
  { a: "C", b: "D", cost: 8 },
  { a: "C", b: "E", cost: 10 },
];
// planar layout: A sits inside triangle B, C, D
const POS: Record<Town, [number, number]> = {
  A: [158, 108],
  B: [158, 26],
  C: [56, 176],
  D: [266, 150],
  E: [176, 206],
};
// group colours, one per starting town (a group takes the colour of its representative)
const COLOUR: Record<Town, string> = {
  A: "var(--domain)",
  B: "#d9822b",
  C: "#8b6fd6",
  D: "#2a9d8f",
  E: "#c2577a",
};

type Verdict = "built" | "skipped";

// replay the first n tests with a tiny union-find; returns verdicts and each town's group representative
function run(n: number) {
  const parent: Record<Town, Town> = { A: "A", B: "B", C: "C", D: "D", E: "E" };
  const find = (t: Town): Town => (parent[t] === t ? t : (parent[t] = find(parent[t])));
  const verdicts: Verdict[] = [];
  for (const r of ROADS.slice(0, n)) {
    const ra = find(r.a);
    const rb = find(r.b);
    if (ra === rb) verdicts.push("skipped");
    else {
      // keep the alphabetically first town as the group's name, so colours are stable
      if (ra < rb) parent[rb] = ra;
      else parent[ra] = rb;
      verdicts.push("built");
    }
  }
  const group = Object.fromEntries(TOWNS.map((t) => [t, find(t)])) as Record<Town, Town>;
  return { verdicts, group };
}

const FULL = run(ROADS.length);
const BUILT = FULL.verdicts.filter((v) => v === "built").length; // 4
const SKIPPED = ROADS.length - BUILT; // 4
const TOTAL = ROADS.reduce((sum, r, i) => sum + (FULL.verdicts[i] === "built" ? r.cost : 0), 0); // 11
const CHEAPEST_SKIP = ROADS.find((_, i) => FULL.verdicts[i] === "skipped")!; // A-B 4
const name = (r: { a: Town; b: Town }) => `${r.a}–${r.b}`;

export default function SkipTheEdgeThatLoops({ slug }: { slug: string }) {
  const [tested, setTested] = useState(0);
  const { verdicts, group } = run(tested);
  const built = verdicts.filter((v) => v === "built").length;
  const cost = ROADS.reduce((sum, r, i) => sum + (verdicts[i] === "built" ? r.cost : 0), 0);
  const done = tested === ROADS.length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your council can link five towns with eight possible roads costing ${ROADS.map((r) => r.cost).join(", ")}. You go cheapest first, building each road unless its two towns are already connected. How many roads get built?`,
        options: ["8, every road", "5", String(BUILT)],
        answer: 2,
      }}
      exploreHint="Test the roads one at a time, cheapest first. Watch which ones get skipped."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You saw {BUILT} roads built ({ROADS.filter((_, i) => FULL.verdicts[i] === "built").map(name).join(", ")}) and{" "}
            {SKIPPED} skipped, total cost {TOTAL}. The {CHEAPEST_SKIP.cost} road {name(CHEAPEST_SKIP)} was skipped even though
            it is cheaper than {name(ROADS[4])} at {ROADS[4].cost}: {CHEAPEST_SKIP.a} and {CHEAPEST_SKIP.b} were already joined
            through C, so it would only close a loop.
          </p>
          <p>
            A road is skipped only when its towns are already connected, however cheap it is. This is Kruskal&apos;s method. It
            ends with one road fewer than towns, and no tree joining all five towns costs less than {TOTAL}.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-skip", "all-tested"]}>
          {(reach) => {
            const goTo = (n: number) => {
              setTested(n);
              if (run(n).verdicts.includes("skipped")) reach("first-skip");
              if (n === ROADS.length) reach("all-tested");
            };
            const next = () => {
              if (locked || done) return;
              goTo(tested + 1);
            };
            const rest = () => {
              if (locked || done) return;
              goTo(ROADS.length);
            };
            const restart = () => {
              if (locked || tested === 0) return;
              setTested(0);
            };

            const last = tested > 0 ? ROADS[tested - 1] : null;
            const lastV = tested > 0 ? verdicts[tested - 1] : null;
            const upcoming = !done ? ROADS[tested] : null;
            const note = !last
              ? `Next: ${name(upcoming!)}, cost ${upcoming!.cost}. Same colour = already connected.`
              : lastV === "built"
                ? `${name(last)} (${last.cost}): different groups, build it.`
                : `${name(last)} (${last.cost}): already connected, skip it.`;

            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox="0 0 320 228" className="stage-svg" role="img" aria-label={`Roads built ${built}, cost ${cost}`}>
                  {ROADS.map((r, i) => {
                    const [x1, y1] = POS[r.a];
                    const [x2, y2] = POS[r.b];
                    const v = i < tested ? verdicts[i] : null;
                    const isNext = i === tested && !done;
                    const stroke = v === "built" ? "var(--fg)" : isNext ? "var(--domain)" : "var(--line)";
                    return (
                      <g key={name(r)}>
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={stroke}
                          strokeWidth={v === "built" ? 5 : isNext ? 3 : 1.5}
                          strokeDasharray={v === "skipped" ? "4 4" : undefined}
                          opacity={v === "skipped" ? 0.55 : 1}
                        />
                        <rect
                          x={(x1 + x2) / 2 - 10}
                          y={(y1 + y2) / 2 - 9}
                          width={20}
                          height={17}
                          rx={4}
                          fill="var(--bg-2)"
                          stroke={isNext ? "var(--domain)" : "none"}
                        />
                        <text
                          x={(x1 + x2) / 2}
                          y={(y1 + y2) / 2 + 4}
                          textAnchor="middle"
                          className={`${s.cost} ${v === "skipped" ? s.skipped : ""}`}
                        >
                          {r.cost}
                        </text>
                      </g>
                    );
                  })}
                  {TOWNS.map((t) => (
                    <g key={t}>
                      <circle cx={POS[t][0]} cy={POS[t][1]} r={16} fill={COLOUR[group[t]]} stroke="var(--fg)" strokeWidth={1.5} />
                      <text x={POS[t][0]} y={POS[t][1] + 6} textAnchor="middle" className={s.town}>
                        {t}
                      </text>
                    </g>
                  ))}
                </svg>
                <Row>
                  <Control className="active" disabled={locked || done} onClick={next}>
                    {upcoming ? `Test ${name(upcoming)} (${upcoming.cost})` : "All tested"}
                  </Control>
                  <Control disabled={locked || done} onClick={rest}>
                    Test the rest
                  </Control>
                  <Control disabled={locked || tested === 0} onClick={restart}>
                    Start over
                  </Control>
                </Row>
                <Row>
                  <Readout label="Built" value={built} />
                  <Readout label="Skipped" value={tested - built} />
                  <Readout label="Cost" value={cost} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
