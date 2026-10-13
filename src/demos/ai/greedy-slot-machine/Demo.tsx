"use client";

// Exploration vs exploitation. Machine A pays on 30% of pulls, B on 70%; the players do not
// know which is which. Both pull A once, then B once, then:
//   greedy:    always the machine with the better win rate so far (ties to A)
//   explorer:  on 10% of pulls a random machine, otherwise the better-looking one
// Once the explorer has found B it earns 0.9 * 70 + 0.1 * 50 = 68 per 100 pulls.
// Greedy earns about 70 when it finds B and 30 when it gets stuck on A.
// Run 1 shown is mulberry32 seed 5, CHOSEN because greedy gets stuck in it (seeds 1-4 it does
// not); "Next run" steps through seeds 6, 7, ... In seeds 1-2000 greedy is stuck in about 30%.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const PAY = [0.3, 0.7]; // A, B
const PULLS = 500;
const BLOCK = 100;
const EPS = 0.1;
const FIRST_SEED = 5; // chosen: greedy gets stuck on A in this run

type Result = { wins: number[]; onB: number[] }; // per block of 100 pulls

function play(eps: number, seed: number): Result {
  const rng = mulberry32(seed);
  const n = [0, 0];
  const w = [0, 0];
  const wins = Array<number>(PULLS / BLOCK).fill(0);
  const onB = Array<number>(PULLS / BLOCK).fill(0);
  for (let t = 0; t < PULLS; t++) {
    let m: number;
    if (t < 2) m = t;
    else if (rng() < eps) m = rng() < 0.5 ? 0 : 1;
    else m = w[1] / n[1] > w[0] / n[0] ? 1 : 0;
    const win = rng() < PAY[m] ? 1 : 0;
    n[m]++;
    w[m] += win;
    const b = Math.floor(t / BLOCK);
    wins[b] += win;
    if (m === 1) onB[b]++;
  }
  return { wins, onB };
}
const stuck = (r: Result) => r.onB[r.onB.length - 1] < BLOCK / 2;
// MODEL END

const AGENTS = [
  { key: "greedy", label: "Greedy", eps: 0 },
  { key: "explorer", label: "10% explorer", eps: EPS },
] as const;

// Chart: two panels side by side, each 5 bars, y 0..100 wins -> 170..50.
const Y = (v: number) => 170 - v * 1.2;

export default function GreedySlotMachine({ slug }: { slug: string }) {
  const [seed, setSeed] = useState<number | null>(null);
  const [seen, setSeen] = useState<{ runs: number; stuck: number }>({ runs: 0, stuck: 0 });
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["played", "another-run"]);

  const results = seed === null ? null : AGENTS.map((a) => play(a.eps, seed));
  const runNo = seed === null ? 0 : seed - FIRST_SEED + 1;

  const show = (sd: number) => {
    setSeed(sd);
    const g = play(0, sd);
    setSeen((v) => ({ runs: v.runs + 1, stuck: v.stuck + (stuck(g) ? 1 : 0) }));
    reach(sd === FIRST_SEED ? "played" : "another-run");
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Machine A pays on 30% of pulls, B on 70%, but you don't know which is which, and you are stuck on A. A player who pulls a random machine 10% of the time, and otherwise the better-looking one, has found B. Per 100 pulls it wins about:",
        options: ["30", "68", "90"],
        answer: 1,
      }}
      exploreHint="Play run 1, then a few more runs. Compare the two players."
      minInteractions={2}
      reveal={() => {
        const K = 2000;
        let g = 0;
        let e = 0;
        let st = 0;
        for (let sd = 1; sd <= K; sd++) {
          const gr = play(0, sd);
          const ex = play(EPS, sd);
          g += gr.wins[4];
          e += ex.wins[4];
          if (stuck(gr)) st++;
        }
        return (
          <>
            <p>
              Once B is found, the explorer spends 90 pulls on B (70% pays: 63 wins) and 10 at random (half on each: 5 wins):{" "}
              <strong>about 68</strong>. In run 1 greedy&apos;s single early pull on B lost, so B looked like 0% and it never tried B
              again: about 30 per 100, for all 500 pulls.
            </p>
            <p>
              Greedy is not always stuck. In {seen.runs} run{seen.runs === 1 ? "" : "s"} you watched it was stuck {seen.stuck}{" "}
              time{seen.stuck === 1 ? "" : "s"}; across {K.toLocaleString("en-US")} runs, {Math.round((100 * st) / K)}%. Its last 100
              pulls averaged {(g / K).toFixed(0)} wins, the explorer&apos;s {(e / K).toFixed(0)}. Wandering costs about 2 wins
              per 100 when greedy is lucky and saves about 40 when it is not.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 206" className="stage-svg" role="img" aria-label={results ? `Run ${runNo}` : "No run yet"}>
              <text x={160} y={14} textAnchor="middle" className={s.small} fill="var(--muted)">
                Toy: A pays 30%, B 70%. Bars: wins per 100 pulls
              </text>
              {AGENTS.map((a, k) => {
                const ox = 26 + k * 152;
                const r = results?.[k];
                return (
                  <g key={a.key}>
                    <text x={ox + 66} y={36} textAnchor="middle" className={s.label} fill="var(--fg)">
                      {a.label}
                    </text>
                    {[30, 70].map((v) => (
                      <g key={v}>
                        <line x1={ox} y1={Y(v)} x2={ox + 132} y2={Y(v)} stroke="var(--muted)" strokeDasharray="3 3" opacity={0.6} />
                        {k === 0 && (
                          <text x={ox - 4} y={Y(v) + 3} textAnchor="end" className={s.tiny} fill="var(--muted)">
                            {v}
                          </text>
                        )}
                      </g>
                    ))}
                    <line x1={ox} y1={Y(0)} x2={ox + 132} y2={Y(0)} stroke="var(--line)" strokeWidth={2} />
                    {r?.wins.map((v, i) => (
                      <g key={i}>
                        <rect x={ox + 4 + i * 26} y={Y(v)} width={20} height={Y(0) - Y(v)} rx={3} fill={r.onB[i] >= BLOCK / 2 ? "var(--good)" : "var(--bad)"} />
                        <text x={ox + 14 + i * 26} y={Y(v) - 4} textAnchor="middle" className={s.tiny} fill="var(--fg)">
                          {v}
                        </text>
                      </g>
                    ))}
                    {r && (
                      <text x={ox + 66} y={188} textAnchor="middle" className={s.tiny} fill={stuck(r) ? "var(--bad)" : "var(--good)"}>
                        {stuck(r) ? "stuck on A" : "mostly on B"}
                      </text>
                    )}
                  </g>
                );
              })}
              <text x={160} y={202} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                pulls 1–500 →
              </text>
            </svg>
            <Row>
              <Control disabled={locked || seed !== null} onClick={() => show(FIRST_SEED)}>
                Play run 1
              </Control>
              <Control disabled={locked || seed === null} onClick={() => show((seed ?? FIRST_SEED) + 1)}>
                Next run
              </Control>
              <Readout label="Run" value={runNo || "–"} />
              <Readout label="Greedy stuck" value={seen.runs ? `${seen.stuck} of ${seen.runs}` : "–"} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
