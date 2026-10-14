"use client";

// Dijkstra on four towns. Roads (costs): S–G 10 (one road, drawn straight), S–A 3, S–B 8, A–B 4, B–G 2.
// Each town has a label: the cheapest cost from S found so far. The learner taps the unsettled town
// with the smallest label to settle it; its roads update the neighbours' labels. A wrong tap says
// which label is smaller. G's first label is 10 (the straight road); it drops to 9 when B is settled.
// v4: the question asks whether G's first label is final (the BFS habit), not a printed sum. Each
// settle shows on stage why the label is final (every other way passes a label already as big), and
// re-reaching a settled town shows the later route costing more. The run is recorded when G is
// settled, so the reveal and the trace row survive "Start again".

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type N = "S" | "A" | "B" | "G";
const NODES: N[] = ["S", "A", "B", "G"];
const ROADS: [N, N, number][] = [["S", "G", 10], ["S", "A", 3], ["S", "B", 8], ["A", "B", 4], ["B", "G", 2]];
const POS: Record<N, { x: number; y: number }> = { S: { x: 10, y: 78 }, A: { x: 30, y: 24 }, B: { x: 70, y: 24 }, G: { x: 90, y: 78 } };
const INF = Number.POSITIVE_INFINITY;

type St = { label: Record<N, number>; settled: N[] };
type Back = { from: N; to: N; cost: number; label: number };
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
const fmt = (v: number) => (v === INF ? "∞" : String(v));
// A road from n back to a town already settled (not S, if another exists): the later route's cost.
function backRoute(st: St, n: N): Back | null {
  const backs = ROADS.map(([a, b, c]) => (a === n ? ([b, c] as const) : b === n ? ([a, c] as const) : null))
    .filter((x): x is readonly [N, number] => !!x && st.settled.includes(x[0]))
    .map(([to, c]) => ({ from: n, to, cost: st.label[n] + c, label: st.label[to] }));
  return backs.find((b) => b.to !== "S") ?? backs[0] ?? null;
}

type Run = { g: number[]; back: Back };

export default function CheapestIsNotShortest({ slug }: { slug: string }) {
  const [st, setSt] = useState<St>(START);
  const [note, setNote] = useState<string | null>(null);
  const [why, setWhy] = useState<string | null>(null);
  const [gHistory, setGHistory] = useState<number[]>([]);
  const [back, setBack] = useState<Back | null>(null);
  const [run, setRun] = useState<Run | null>(null);
  const open = NODES.filter((n) => !st.settled.includes(n));
  const smallest = open.length ? Math.min(...open.map((n) => st.label[n])) : INF;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Each tap settles the town with the smallest label. When S is settled, G gets its first label from the straight road. What happens to G's label before G is settled?",
        options: ["It stays the same", "It goes down", "It goes up"],
        answer: FINAL.G < ROADS[0][2] ? 1 : 0,
      }}
      exploreHint="Settle the town with the smallest label, again and again."
      minInteractions={2}
      reveal={() =>
        run ? (
          <>
            <p>
              G&apos;s label went <strong>{run.g.join(" then ")}</strong>. The first came from the one straight road; settling
              B found a route with three roads that costs less. First found is not final, and the fewest roads was the dearest.
            </p>
            <p>
              Settling the smallest label is safe: any other way to that town passes a label at least as big, and costs only
              add. Your run showed it: {run.back.from} back to {run.back.to} would cost {run.back.cost}, more than{" "}
              {run.back.to}&apos;s settled {run.back.label}. This is Dijkstra&apos;s algorithm (1959).
            </p>
          </>
        ) : (
          <p>Settle every town to see where G&apos;s label ends up. Each settled label is final once no other way can beat it.</p>
        )
      }
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-settle", "g-settled"]}>
          {(reach) => {
            const tap = (n: N) => {
              if (locked || st.settled.includes(n)) return;
              if (st.label[n] > smallest) {
                const best = open.find((x) => st.label[x] === smallest)!;
                setNote(`Not yet: ${n}'s ${fmt(st.label[n])} is bigger than ${best}'s ${fmt(smallest)}.`);
                setWhy(null);
                return;
              }
              const r = settle(st, n);
              const g = r.st.label.G !== st.label.G ? [...gHistory, r.st.label.G] : gHistory;
              setSt(r.st);
              setGHistory(g);
              const others = open.filter((x) => x !== n && st.label[x] < INF);
              const b = backRoute(st, n);
              const nb = b && b.to !== "S" ? b : back;
              setBack(nb);
              setNote(
                `${n} settled at ${fmt(st.label[n])}.${r.changes.length ? " " + r.changes.join("; ") + "." : ""}` +
                  (b ? ` ${b.from} to ${b.to}: ${b.cost}, more than ${b.to}'s ${b.label}.` : ""),
              );
              setWhy(
                n === "S"
                  ? null
                  : others.length
                    ? `Other ways to ${n} pass ${others.map((x) => `${x} ${fmt(st.label[x])}`).join(" or ")}: already more.`
                    : `No town left that could beat ${fmt(st.label[n])}.`,
              );
              reach("first-settle");
              if (n === "G" && nb) {
                setRun({ g, back: nb });
                reach("g-settled");
              }
            };
            const reset = () => {
              if (locked || st.settled.length === 0) return;
              setSt(START);
              setGHistory([]);
              setBack(null);
              setNote(null);
              setWhy(null);
            };
            const msg = locked
              ? "Make a prediction to start."
              : note ?? "Tap a town to settle it: its label is then final. Start with the smallest label.";
            return (
              <div className={s.wrap}>
                <Control className={s.reset} disabled={locked || st.settled.length === 0} onClick={reset}>Start again</Control>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <p className={s.why}>{locked ? "" : why ?? ""}</p>
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
                <p className={s.legend}>Label: cheapest cost from S found so far. ∞: not reached yet.</p>
                <p className={s.legend}>
                  {locked ? "" : run ? `Your run: G ${run.g.join(" → ")}. ${run.back.from} to ${run.back.to}: ${run.back.cost} > ${run.back.label}.` : `G's label so far: ${gHistory.join(" → ") || "∞"}`}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
