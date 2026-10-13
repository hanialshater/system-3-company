"use client";

// Dijkstra on four towns. Roads (costs): S–G 10 (one hop, drawn straight), S–A 2, A–B 2, B–G 2.
// Each town has a label: the cheapest cost from S found so far. The learner taps the unsettled town
// with the smallest label to settle it; its roads update the neighbours' labels. A wrong tap says
// which label is smaller. G's label goes 10 then drops to 6 when B is settled.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type N = "S" | "A" | "B" | "G";
const NODES: N[] = ["S", "A", "B", "G"];
const ROADS: [N, N, number][] = [["S", "G", 10], ["S", "A", 2], ["A", "B", 2], ["B", "G", 2]];
const POS: Record<N, { x: number; y: number }> = { S: { x: 10, y: 78 }, A: { x: 30, y: 24 }, B: { x: 70, y: 24 }, G: { x: 90, y: 78 } };
const DIRECT = ROADS[0][2]; // 10
const HOP = ROADS[1][2]; // 2
const INF = Number.POSITIVE_INFINITY;

type St = { label: Record<N, number>; settled: N[] };
const START: St = { label: { S: 0, A: INF, B: INF, G: INF }, settled: [] };
function settle(st: St, n: N): { st: St; changes: string[] } {
  const label = { ...st.label };
  const changes: string[] = [];
  for (const [a, b, c] of ROADS) {
    const other = a === n ? b : b === n ? a : null;
    if (!other || st.settled.includes(other)) continue;
    const cand = label[n] + c;
    if (cand < label[other]) {
      changes.push(`${other}: ${label[n]} + ${c} = ${cand}${label[other] < INF ? ` (was ${label[other]})` : ""}`);
      label[other] = cand;
    }
  }
  return { st: { label, settled: [...st.settled, n] }, changes };
}
// The full run, for the question's answer.
function runAll() {
  let st = START;
  while (st.settled.length < NODES.length) {
    const open = NODES.filter((n) => !st.settled.includes(n));
    const n = open.reduce((m, x) => (st.label[x] < st.label[m] ? x : m));
    st = settle(st, n).st;
  }
  return st.label;
}
const FINAL = runAll();
const CHEAPEST = FINAL.G; // 6
const fmt = (v: number) => (v === INF ? "∞" : String(v));

export default function CheapestIsNotShortest({ slug }: { slug: string }) {
  const [st, setSt] = useState<St>(START);
  const [note, setNote] = useState<string | null>(null);
  const [gHistory, setGHistory] = useState<number[]>([]);
  const open = NODES.filter((n) => !st.settled.includes(n));
  const smallest = open.length ? Math.min(...open.map((n) => st.label[n])) : INF;
  const done = open.length === 0;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `From S, the road straight to G costs ${DIRECT}. The other way, S to A to B to G, costs ${HOP} per road. What is the cheapest total cost from S to G?`,
        options: [String(DIRECT), String(CHEAPEST), "3"],
        answer: 1,
      }}
      exploreHint="Settle the town with the smallest label, again and again."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            G&apos;s label went {gHistory.join(" then ")}: the one-road route gave {DIRECT}, and settling B found{" "}
            {HOP} + {HOP} + {HOP} = <strong>{CHEAPEST}</strong>. The route with the fewest roads was the dearest.
          </p>
          <p>
            Settling the smallest label first is safe: with no negative costs, a route found later can only cost more.
            So each settled label is a true cheapest cost. This is Dijkstra&apos;s algorithm (1959).
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-settle", "g-settled"]}>
          {(reach) => {
            const tap = (n: N) => {
              if (locked || st.settled.includes(n)) return;
              if (st.label[n] > smallest) {
                const best = open.find((x) => st.label[x] === smallest)!;
                setNote(`Not yet: ${n}'s ${fmt(st.label[n])} is bigger than ${best}'s ${fmt(smallest)}.`);
                return;
              }
              const r = settle(st, n);
              setSt(r.st);
              if (r.st.label.G !== st.label.G) setGHistory((h) => [...h, r.st.label.G]);
              setNote(`${n} settled at ${fmt(st.label[n])}. ${r.changes.length ? r.changes.join("; ") + "." : "Nothing cheaper."}`);
              reach("first-settle");
              if (n === "G") reach("g-settled");
            };
            const reset = () => {
              if (locked || st.settled.length === 0) return;
              setSt(START);
              setGHistory([]);
              setNote(null);
            };
            const msg = locked
              ? "Make a prediction to start."
              : note ?? "Label: cheapest cost from S found so far. Settle the smallest unsettled label.";
            return (
              <div className={s.wrap}>
                <Control className={s.reset} disabled={locked || st.settled.length === 0} onClick={reset}>Start again</Control>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <div className={s.map}>
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={s.roads} aria-hidden>
                    {ROADS.map(([a, b]) => (
                      <line key={a + b} x1={POS[a].x} y1={POS[a].y} x2={POS[b].x} y2={POS[b].y} className={s.road} />
                    ))}
                  </svg>
                  {ROADS.map(([a, b, c]) => (
                    <span key={a + b} className={s.cost}
                      style={{ left: `${(POS[a].x + POS[b].x) / 2}%`, top: `${(POS[a].y + POS[b].y) / 2 + (a === "S" && b === "G" ? 8 : -9)}%` }}>
                      {c}
                    </span>
                  ))}
                  {NODES.map((n) => {
                    const isSettled = st.settled.includes(n);
                    return (
                      <Control key={n} aria-label={`Settle ${n}`} disabled={locked || isSettled}
                        className={`${s.town} ${isSettled ? `active ${s.settled}` : ""}`}
                        style={{ left: `${POS[n].x}%`, top: `${POS[n].y}%` }} onClick={() => tap(n)}>
                        <span className={s.name}>{n}</span>
                        <span className={s.label}>{locked ? "?" : fmt(st.label[n])}</span>
                      </Control>
                    );
                  })}
                </div>
                <p className={s.legend}>{locked ? "" : done ? `All settled. Cheapest S to G: ${fmt(st.label.G)}.` : `Settled: ${st.settled.join(", ") || "none"}`}</p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
