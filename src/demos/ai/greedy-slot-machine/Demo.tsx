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

type Result = { wins: number[]; onB: number[]; first: number[] }; // per block of 100 pulls; first = outcomes of the A pull and the B pull

function play(eps: number, seed: number): Result {
  const rng = mulberry32(seed);
  const n = [0, 0];
  const w = [0, 0];
  const wins = Array<number>(PULLS / BLOCK).fill(0);
  const onB = Array<number>(PULLS / BLOCK).fill(0);
  const first: number[] = [];
  for (let t = 0; t < PULLS; t++) {
    let m: number;
    if (t < 2) m = t;
    else if (rng() < eps) m = rng() < 0.5 ? 0 : 1;
    else m = w[1] / n[1] > w[0] / n[0] ? 1 : 0;
    const win = rng() < PAY[m] ? 1 : 0;
    if (t < 2) first.push(win);
    n[m]++;
    w[m] += win;
    const b = Math.floor(t / BLOCK);
    wins[b] += win;
    if (m === 1) onB[b]++;
  }
  return { wins, onB, first };
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
  const [seen, setSeen] = useState({ runs: 0, stuck: 0, g: 0, e: 0 }); // tallies over every run watched
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["played", "another-run", "many-runs"]);

  const results = seed === null ? null : AGENTS.map((a) => play(a.eps, seed));
  const runNo = seed === null ? 0 : seed - FIRST_SEED + 1;

  /** Watch `count` runs in a row, seeds sd - count + 1 .. sd, and show the last. */
  const show = (sd: number, count: number, name: string) => {
    setSeed(sd);
    let st = 0;
    let g = 0;
    let e = 0;
    for (let k = sd - count + 1; k <= sd; k++) {
      const gr = play(0, k);
      if (stuck(gr)) st++;
      g += gr.wins[4];
      e += play(EPS, k).wins[4];
    }
    setSeen((v) => ({ runs: v.runs + count, stuck: v.stuck + st, g: v.g + g, e: v.e + e }));
    reach(name);
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Two slot machines: A pays on 30% of pulls, B on 70%, but you don't know which is which. You pull A once and B once, then always pick the one with the better record so far. Over many runs of 500 pulls, how often do you end up stuck on the worse machine, A?",
        options: ["No runs", "3 runs in 10", "9 runs in 10"],
        answer: 1,
      }}
      exploreHint="Play run 1, then another, then 100 more. Compare the two players."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            In run 1 greedy&apos;s single early pull on B lost, so B looked like 0% and it never tried B again: about 30
            wins per 100, for all 500 pulls.
          </p>
          <p>
            Greedy is not always stuck. In the {seen.runs} runs you watched it was stuck {seen.stuck} times (
            {Math.round((100 * seen.stuck) / Math.max(1, seen.runs))}%, about 3 in 10). Its last 100 pulls averaged{" "}
            {(seen.g / Math.max(1, seen.runs)).toFixed(0)} wins, the explorer&apos;s {(seen.e / Math.max(1, seen.runs)).toFixed(0)}.
          </p>
          <p>
            Once the explorer has found B it earns 0.9 × 70 + 0.1 × 50 = <strong>68</strong> per 100 pulls: 90 pulls on B and 10
            at random.
          </p>
        </>
      )}
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
                {results ? `pulls 1–500 · first pulls: A ${results[0].first[0] ? "won" : "lost"}, B ${results[0].first[1] ? "won" : "lost"}` : "pulls 1–500 →"}
              </text>
            </svg>
            <Row>
              <Control disabled={locked || seed !== null} onClick={() => show(FIRST_SEED, 1, "played")}>
                Play run 1
              </Control>
              <Control disabled={locked || seed === null} onClick={() => show((seed ?? FIRST_SEED) + 1, 1, "another-run")}>
                Next run
              </Control>
              <Control disabled={locked || seed === null} onClick={() => show((seed ?? FIRST_SEED) + 100, 100, "many-runs")}>
                Watch 100 more
              </Control>
            </Row>
            <Row>
              <Readout label="Runs watched" value={seen.runs || "–"} />
              <Readout label="Greedy stuck" value={seen.runs ? `${seen.stuck} of ${seen.runs}` : "–"} />
              <Readout
                label="Last 100 pulls, avg wins"
                value={seen.runs ? `${(seen.g / seen.runs).toFixed(0)} greedy · ${(seen.e / seen.runs).toFixed(0)} explorer` : "–"}
              />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
