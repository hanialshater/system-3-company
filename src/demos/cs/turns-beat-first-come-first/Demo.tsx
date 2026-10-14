"use client";

// Round robin vs first come, first served, as two timelines on one clock
// (company/design/specs/turns-beat-first-come-first.md). Jobs A 10, B 1, C 1 arrive together at 0, served in
// order A, B, C. Wait = finish time - work. One Tick runs one unit in each lane. The first-come lane is never
// cleared; the turn-length chips (5, 2, 1) restart only the turns lane.
// First come: waits 0, 10, 11, average 7. Turns of 1: 2, 1, 2, about 1.67; of 2: 2.33; of 5: 4.33 (claims c1-c3).

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Job = "A" | "B" | "C";
const JOBS: Job[] = ["A", "B", "C"];
const WORK: Record<Job, number> = { A: 10, B: 1, C: 1 };
const END = 12;
type Quantum = 5 | 2 | 1;
const QUANTA: Quantum[] = [5, 2, 1];

// One letter per time unit. A finished job leaves the cycle.
function roundRobin(q: number): Job[] {
  const left = { ...WORK };
  const queue: Job[] = [...JOBS];
  const out: Job[] = [];
  while (queue.length) {
    const j = queue.shift()!;
    const run = Math.min(q, left[j]);
    for (let i = 0; i < run; i++) out.push(j);
    left[j] -= run;
    if (left[j] > 0) queue.push(j);
  }
  return out;
}
const FCFS: Job[] = JOBS.flatMap((j) => Array<Job>(WORK[j]).fill(j));
const TURNS: Record<Quantum, Job[]> = { 5: roundRobin(5), 2: roundRobin(2), 1: roundRobin(1) };
const finishOf = (tl: Job[], j: Job) => tl.lastIndexOf(j) + 1;
const waitsOf = (tl: Job[]) => JOBS.map((j) => finishOf(tl, j) - WORK[j]);
const avgOf = (tl: Job[]) => waitsOf(tl).reduce((a, b) => a + b, 0) / JOBS.length;
const fmtAvg = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(2));

const reducedMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const X = (u: number) => 8 + u * 28;
const LANE_H = 104;
const FILL: Record<Job, string> = { A: "url(#rr-a)", B: "url(#rr-b)", C: "url(#rr-c)" };

function Lane({ tl, upTo, oy, title }: { tl: Job[]; upTo: number; oy: number; title: string }) {
  const waits = waitsOf(tl);
  const finished = JOBS.map((j) => finishOf(tl, j) <= upTo);
  const all = finished.every(Boolean);
  const waitText = `Waits: ${JOBS.map((_, i) => (finished[i] ? waits[i] : "–")).join(" · ")} · average ${
    all ? fmtAvg(avgOf(tl)) : "–"
  }`;
  return (
    <g>
      <text x={6} y={oy + 12} className={s.title}>
        {title}
      </text>
      {tl.slice(0, upTo).map((j, u) => (
        <g key={u}>
          <rect x={X(u) + 0.5} y={oy + 40} width={27} height={26} rx={3} fill={FILL[j]} stroke="var(--fg)" strokeWidth={0.75} />
          <text x={X(u) + 14} y={oy + 57} textAnchor="middle" className={s.letter}>
            {j}
          </text>
        </g>
      ))}
      <line x1={X(0)} x2={X(END)} y1={oy + 66} y2={oy + 66} stroke="var(--line)" />
      {Array.from({ length: END + 1 }, (_, u) => (
        <line key={`t${u}`} x1={X(u)} x2={X(u)} y1={oy + 66} y2={oy + (u % 2 ? 69 : 71)} stroke="var(--line)" />
      ))}
      {[0, 2, 4, 6, 8, 10, 12].map((u) => (
        <text key={`n${u}`} x={X(u)} y={oy + 81} textAnchor="middle" className={s.tick}>
          {u}
        </text>
      ))}
      {JOBS.map((j, i) =>
        finished[i] ? (
          <g key={`p${j}`}>
            <line x1={X(finishOf(tl, j))} x2={X(finishOf(tl, j))} y1={oy + 32} y2={oy + 40} stroke="var(--fg)" strokeWidth={1.5} />
            <circle cx={X(finishOf(tl, j))} cy={oy + 26} r={8} fill="var(--fg)" />
            <text x={X(finishOf(tl, j))} y={oy + 29.5} textAnchor="middle" className={s.pin}>
              {waits[i]}
            </text>
          </g>
        ) : null,
      )}
      <text x={6} y={oy + 97} className={s.waits}>
        {waitText}
      </text>
    </g>
  );
}

export default function TurnsBeatFirstComeFirst({ slug }: { slug: string }) {
  const [q, setQ] = useState<Quantum>(1);
  const [t, setT] = useState(0);
  const [f, setF] = useState(0); // furthest time the first-come lane has run (never cleared)
  const [results, setResults] = useState<{ fcfs?: number } & Partial<Record<Quantum, number>>>({});
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  const ended = t >= END;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Three jobs arrive together needing 10, 1 and 1 time units. First come, first served makes the others wait 10 and 11: average wait (0 + 10 + 11)/3 = 7. Taking turns of one unit each, what is the average wait (finish time minus work)?",
        options: ["7, the same", "About 1.7", "About 5"],
        answer: 1,
      }}
      exploreHint="Tick both schedules and watch when B and C finish."
      minInteractions={1}
      reveal={() => {
        const r1 = TURNS[1];
        const extra: string[] = [];
        if (results[2] !== undefined) extra.push(`turns of 2 gave ${fmtAvg(results[2])}`);
        if (results[5] !== undefined) extra.push(`turns of 5 gave ${fmtAvg(results[5])}`);
        return (
          <>
            <p>
              First come, first served made B and C sit behind A&rsquo;s 10 units: average wait {fmtAvg(avgOf(FCFS))}.
              Taking turns of 1 let B finish at {finishOf(r1, "B")} and C at {finishOf(r1, "C")}. A finished at{" "}
              {finishOf(r1, "A")}, only {finishOf(r1, "A") - WORK.A} later than if it ran alone. Average wait about{" "}
              {fmtAvg(avgOf(r1))}.
              {extra.length ? ` Longer turns crept back toward 7: ${extra.join(", ")}.` : ""}
            </p>
            <p>
              Turns help short jobs without knowing anyone&rsquo;s length. Real systems pay a little for each switch,
              which this model leaves out.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["both-finished"]}>
          {(reach) => {
            const arrive = (quantum: Quantum, time: number) => {
              setF((x) => Math.max(x, time));
              if (time >= END) {
                setResults((r) => ({ ...r, fcfs: avgOf(FCFS), [quantum]: avgOf(TURNS[quantum]) }));
                if (quantum === 1) reach("both-finished");
              }
            };
            const runOut = (quantum: Quantum, from: number) => {
              if (timer.current) clearInterval(timer.current);
              if (reducedMotion() || from >= END) {
                setT(END);
                arrive(quantum, END);
                return;
              }
              setBusy(true);
              let k = from;
              timer.current = setInterval(() => {
                k += 1;
                setT(k);
                arrive(quantum, k);
                if (k >= END) {
                  if (timer.current) clearInterval(timer.current);
                  setBusy(false);
                }
              }, 30);
            };
            const tick = () => {
              if (locked || busy || ended) return;
              setT(t + 1);
              arrive(q, t + 1);
            };
            const toEnd = () => {
              if (locked || busy || ended) return;
              runOut(q, t);
            };
            const pick = (nq: Quantum) => {
              if (locked || busy || nq === q) return;
              const bothDone = ended && f >= END;
              setQ(nq);
              setT(0);
              if (bothDone) runOut(nq, 0);
              else if (timer.current) clearInterval(timer.current);
            };

            const turns = TURNS[q];
            const fUp = Math.max(f, t);
            const tw = waitsOf(turns);
            const turnsDone = t >= END;
            const aria = turnsDone
              ? `Turns of ${q}: A waited ${tw[0]}, B waited ${tw[1]}, C waited ${tw[2]}, average ${fmtAvg(avgOf(turns))}`
              : `Turns of ${q}: time ${t} of ${END}`;

            return (
              <div className={s.wrap}>
                <p className={s.rule}>A, B, C arrive together, needing 10, 1 and 1. Wait = finish − work.</p>
                <svg
                  viewBox={`0 0 354 ${LANE_H * 2 + 4}`}
                  className={`stage-svg ${s.svg}`}
                  role="img"
                  aria-label={`${aria}. First come: time ${fUp} of ${END}.`}
                  data-time={t}
                >
                  <defs>
                    <pattern id="rr-a" width="4" height="4" patternUnits="userSpaceOnUse">
                      <rect width="4" height="4" fill="color-mix(in srgb, var(--domain) 55%, var(--bg-2))" />
                    </pattern>
                    <pattern id="rr-b" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <rect width="6" height="6" fill="var(--bg-2)" />
                      <rect width="3" height="6" fill="color-mix(in srgb, var(--domain) 55%, var(--bg-2))" />
                    </pattern>
                    <pattern id="rr-c" width="6" height="6" patternUnits="userSpaceOnUse">
                      <rect width="6" height="6" fill="var(--bg-2)" />
                      <circle cx="3" cy="3" r="1.4" fill="color-mix(in srgb, var(--domain) 70%, var(--fg))" />
                    </pattern>
                  </defs>
                  <Lane tl={FCFS} upTo={fUp} oy={0} title="First come, first served" />
                  <Lane tl={turns} upTo={t} oy={LANE_H} title={`Take turns (turn = ${q})`} />
                  <line x1={X(t)} x2={X(t)} y1={18} y2={LANE_H + 70} stroke="var(--fg)" strokeWidth={1.5} strokeDasharray="4 3" />
                </svg>
                <p className={s.results}>
                  First come <strong>{results.fcfs !== undefined ? fmtAvg(results.fcfs) : "?"}</strong> · turns of 5:{" "}
                  <strong>{results[5] !== undefined ? fmtAvg(results[5]) : "?"}</strong> · 2:{" "}
                  <strong>{results[2] !== undefined ? fmtAvg(results[2]) : "?"}</strong> · 1:{" "}
                  <strong>{results[1] !== undefined ? fmtAvg(results[1]) : "?"}</strong>
                </p>
                <Row>
                  <Control className="tap" disabled={locked || busy || ended} onClick={tick}>
                    Tick
                  </Control>
                  <Control className="tap" disabled={locked || busy || ended} onClick={toEnd}>
                    Run to the end
                  </Control>
                </Row>
                <Row>
                  <span className={s.lab} id="turn-label">
                    Turn length
                  </span>
                  <span role="group" aria-labelledby="turn-label" className={s.chips}>
                    {QUANTA.map((n) => (
                      <Control
                        key={n}
                        className={`tap ${q === n ? "active" : ""}`}
                        aria-pressed={q === n}
                        aria-label={`Turn length ${n}`}
                        disabled={locked || busy || q === n}
                        onClick={() => pick(n)}
                      >
                        {n}
                      </Control>
                    ))}
                  </span>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
