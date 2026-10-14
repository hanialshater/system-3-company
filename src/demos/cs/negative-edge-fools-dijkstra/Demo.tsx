"use client";

// Side-by-side comparison, stacked: the same four towns and roads, two methods.
// Panel 1 settles the cheapest town first and treats settled labels as final.
// Panel 2 checks every road, pass after pass, with no lock.
// Roads: S>A 2, S>B 3, B>A -2, A>C 2. True costs: A 1, C 3 (checked in node, see meta.json).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Town = "S" | "A" | "B" | "C";
type Road = { from: Town; to: Town; cost: number };
type Labels = Record<Town, number>;

const INF = Infinity;
const TOWNS: Town[] = ["S", "A", "B", "C"];
const POS: Record<Town, [number, number]> = { S: [48, 100], A: [165, 52], B: [165, 148], C: [305, 52] };
const R = 22;
const ROADS: Road[] = [
  { from: "S", to: "A", cost: 2 },
  { from: "S", to: "B", cost: 3 },
  { from: "B", to: "A", cost: -2 },
  { from: "A", to: "C", cost: 2 },
];
// The order the passes check the roads (numbered on the stage): A>C is checked before B>A lowers A,
// so pass 1 prices C at 4 from the old A, then fixes A to 1; pass 2 re-checks A>C and lowers C to 3.
const PASS_ORDER: Road[] = [ROADS[0], ROADS[3], ROADS[1], ROADS[2]];

const START: Labels = { S: 0, A: INF, B: INF, C: INF };
const show = (v: number) => (v === INF ? "∞" : String(v).replace("-", "−"));

type P1 = { d: Labels; settled: Town[]; late: boolean; hint: string };
type P2 = { d: Labels; pass: number; changed: Road[] };

function Graph({
  d,
  settled = [],
  hot = [],
  order = [],
  late = false,
  children,
}: {
  d: Labels;
  settled?: Town[];
  hot?: Road[];
  order?: Road[];
  late?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className={s.graph}>
      <svg viewBox="0 0 360 200" className="stage-svg" role="img" aria-label={`Labels: S ${show(d.S)}, A ${show(d.A)}, B ${show(d.B)}, C ${show(d.C)}`}>
        <defs>
          <marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="var(--fg)" />
          </marker>
          <marker id="arr-hot" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="var(--domain)" />
          </marker>
        </defs>
        {ROADS.map((r) => {
          const [x1, y1] = POS[r.from];
          const [x2, y2] = POS[r.to];
          const len = Math.hypot(x2 - x1, y2 - y1);
          const ux = (x2 - x1) / len;
          const uy = (y2 - y1) / len;
          const on = hot.includes(r);
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2;
          // label sits to the side of the road
          const nx = -uy;
          const ny = ux;
          const side = r.from === "B" ? -1 : r.from === "S" && r.to === "B" ? -1 : 1;
          return (
            <g key={`${r.from}${r.to}`}>
              <line
                x1={x1 + ux * R}
                y1={y1 + uy * R}
                x2={x2 - ux * (R + 3)}
                y2={y2 - uy * (R + 3)}
                stroke={on ? "var(--domain)" : "var(--fg)"}
                strokeWidth={on ? 3.5 : 1.6}
                strokeDasharray={r.cost < 0 ? "5 4" : undefined}
                markerEnd={on ? "url(#arr-hot)" : "url(#arr)"}
              />
              <text
                x={mx + nx * 12 * side}
                y={my + ny * 12 * side + 4}
                textAnchor="middle"
                className={r.cost < 0 ? s.neg : s.cost}
              >
                {show(r.cost)}
              </text>
              {order.includes(r) && (
                <text x={mx - nx * 13 * side} y={my - ny * 13 * side + 4} textAnchor="middle" className={s.order}>
                  {`#${order.indexOf(r) + 1}`}
                </text>
              )}
            </g>
          );
        })}
        {TOWNS.map((t) => {
          const [x, y] = POS[t];
          const locked = settled.includes(t);
          const py = t === "A" || t === "C" ? y - R - 22 : y + R + 6;
          return (
            <g key={t}>
              <circle cx={x} cy={y} r={R} fill="var(--bg-2)" stroke="var(--fg)" strokeWidth={locked ? 4 : 1.2} />
              <text x={x} y={y + 5} textAnchor="middle" className={s.name}>
                {t}
              </text>
              {locked && (
                <g transform={`translate(${x + 14} ${y - 30})`} aria-label="settled">
                  <rect x="0" y="6" width="11" height="8" rx="1.5" fill="var(--fg)" />
                  <path d="M2.5,6 V3.5 a3,3 0 0 1 6,0 V6" fill="none" stroke="var(--fg)" strokeWidth="1.6" />
                </g>
              )}
              <rect x={x - 17} y={py} width={34} height={17} rx={8} fill="var(--bg-2)" stroke="var(--line)" />
              <text x={x} y={py + 12.5} textAnchor="middle" className={s.pill} aria-label={d[t] === INF ? "no label yet" : undefined}>
                {show(d[t])}
              </text>
            </g>
          );
        })}
        {late && (
          <g>
            <text x={POS.A[0] + 28} y={POS.A[1] - R - 9} className={s.struck}>
              1
            </text>
            <line x1={POS.A[0] + 26} y1={POS.A[1] - R - 12} x2={POS.A[0] + 38} y2={POS.A[1] - R - 12} stroke="var(--bad)" strokeWidth="1.6" />
            <text x={POS.A[0] + 42} y={POS.A[1] - R - 9} className={s.tag}>
              too late
            </text>
          </g>
        )}
      </svg>
      {children}
    </div>
  );
}

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [p1, setP1] = useState<P1>({ d: START, settled: [], late: false, hint: "" });
  const [p2, setP2] = useState<P2>({ d: START, pass: 0, changed: [] });

  const tapTown = (t: Town) => {
    if (locked || p1.settled.includes(t)) return;
    const open = TOWNS.filter((x) => !p1.settled.includes(x));
    const smallest = Math.min(...open.map((x) => p1.d[x]));
    if (p1.d[t] === INF || p1.d[t] > smallest) {
      setP1({ ...p1, hint: "Not the smallest label yet." });
      return;
    }
    const settled = [...p1.settled, t];
    const d = { ...p1.d };
    let late = p1.late;
    for (const r of ROADS) {
      if (r.from !== t || d[t] + r.cost >= d[r.to]) continue;
      if (settled.includes(r.to)) late = true; // offered a cheaper cost to a locked town: ignored
      else d[r.to] = d[t] + r.cost;
    }
    setP1({ d, settled, late, hint: "" });
    if (late) reach("too-late");
  };

  const runPass = () => {
    if (locked || p2.pass >= 2) return;
    const d = { ...p2.d };
    const changed: Road[] = [];
    for (const r of PASS_ORDER) {
      if (d[r.from] !== INF && d[r.from] + r.cost < d[r.to]) {
        d[r.to] = d[r.from] + r.cost;
        changed.push(r);
      }
    }
    setP2({ d, pass: p2.pass + 1, changed });
    if (p2.pass + 1 === 2) reach("two-passes");
  };

  return (
    <div className={s.wrap}>
      <section className={s.panel} aria-label="Cheapest first">
        <h4 className={s.head}>Cheapest first</h4>
        <p className={s.rule} aria-live="polite">
          {p1.hint || "Tap the smallest unsettled town. Settled labels are final."}
        </p>
        <Graph d={p1.d} settled={p1.settled} late={p1.late}>
          {TOWNS.map((t) => (
            <button
              key={t}
              type="button"
              data-qa="control"
              className={s.town}
              style={{ left: `${(POS[t][0] / 360) * 100}%`, top: `${(POS[t][1] / 200) * 100}%` }}
              disabled={locked || p1.settled.includes(t)}
              onClick={() => tapTown(t)}
              aria-label={`Settle town ${t}`}
            />
          ))}
        </Graph>
      </section>
      <section className={s.panel} aria-label="Check every road">
        <h4 className={s.head}>Check every road</h4>
        <p className={s.rule}>Each pass checks every road once, in order #1 to #4.</p>
        <Graph d={p2.d} hot={p2.changed} order={PASS_ORDER} />
        <Row>
          <Control className={`tap ${p2.pass >= 1 ? "active" : ""}`} disabled={locked || p2.pass !== 0} onClick={runPass}>
            Pass 1
          </Control>
          <Control className={`tap ${p2.pass >= 2 ? "active" : ""}`} disabled={locked || p2.pass !== 1} onClick={runPass}>
            Pass 2
          </Control>
        </Row>
      </section>
    </div>
  );
}

export default function NegativeEdgeFoolsDijkstra({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Roads: S to A costs 2, S to B costs 3, B to A is a refund of 2 (cost −2), A to C costs 2. Settling the cheapest town first locks A at 2. What is the true cheapest cost to A?",
        options: ["2", "1", "3"],
        answer: 1,
      }}
      exploreHint="Settle the towns in order, then run both passes."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Cheapest-first locked A at 2. When B was settled, the −2 road offered 1: too late.
          </p>
          <p>
            Pass 1 showed the knock-on: road #2 priced C at 4 from the old A, and only then did road #4 fix A to 1. C was
            still 4. Pass 2 re-checked road #2 and lowered C to 3. Settling assumes no later road can make a settled town
            cheaper; a road that subtracts breaks that, and every town priced from it inherits the error.
          </p>
          <p className="muted">Bellman-Ford keeps no locks and re-checks every road, at the cost of more checks.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["too-late", "two-passes"]}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
