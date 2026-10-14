"use client";

// Collatz (hailstone) runs as a storyboard / scrub (company/design/specs/hailstone-27-climbs.md).
// Rule: even -> n/2, odd -> 3n + 1, stop at 1; a step is one application. The learner steps or runs 27 to 1,
// then scrubs back over the run they made. Start chips add 26, 28 and 97 as thin lines on the same axes.
// 27: 111 steps, peak 9,232 at step 77; 26: 10; 28: 18; 97: 118 (claims c1, c2; re-run in node by the builder).
// Answer visibility: the x tick labels stay hidden until the first run reaches 1; the y axis only grows.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const STARTS = [26, 27, 28, 97] as const;
type Start = (typeof STARTS)[number];

function hailstone(n: number): number[] {
  const seq = [n];
  while (n !== 1) {
    n = n % 2 === 0 ? n / 2 : 3 * n + 1;
    seq.push(n);
  }
  return seq;
}
const SEQ: Record<Start, number[]> = { 26: hailstone(26), 27: hailstone(27), 28: hailstone(28), 97: hailstone(97) };
const STEPS = (n: Start) => SEQ[n].length - 1;
const peakOf = (n: Start) => Math.max(...SEQ[n]);

const fmt = (v: number) => v.toLocaleString("en-US");
const scaleFor = (v: number) => (v <= 100 ? 100 : v <= 1000 ? 1000 : 10000);

const reducedMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Chart layout (viewBox 342 x 266).
const X0 = 40;
const X1 = 336;
const Y0 = 230;
const Y1 = 10;
const XMAX = 120;
const xs = (step: number) => X0 + (step / XMAX) * (X1 - X0);

type Drawn = Partial<Record<Start, number>>;

export default function Hailstone27Climbs({ slug }: { slug: string }) {
  const [cur, setCur] = useState<Start>(27);
  const [drawn, setDrawn] = useState<Drawn>({ 27: 0 });
  const [cursor, setCursor] = useState(0);
  const [ymax, setYmax] = useState(100);
  const [done, setDone] = useState<Start[]>([]);
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  const k = drawn[cur] ?? 0;
  const atOne = k >= STEPS(cur);
  const ys = (v: number) => Y0 - (v / ymax) * (Y0 - Y1);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Rule: if n is even, halve it; if odd, make it 3n + 1. Start at 27. How many steps until it reaches 1?",
        options: ["Under 30", "111", "Never reaches 1"],
        answer: 1,
      }}
      exploreHint="Step a few times, then run 27 to 1."
      minInteractions={2}
      reveal={() => {
        const has = (n: Start) => done.includes(n);
        const parts: string[] = [
          `27 took ${STEPS(27)} steps and climbed to ${fmt(peakOf(27))} before falling to 1.`,
        ];
        if (has(26) && has(28)) parts.push(`Its neighbours were tiny: 26 took ${STEPS(26)} steps, 28 took ${STEPS(28)}.`);
        else if (has(26)) parts.push(`Its neighbour 26 took only ${STEPS(26)} steps.`);
        else if (has(28)) parts.push(`Its neighbour 28 took only ${STEPS(28)} steps.`);
        if (has(97)) parts.push(`97 took ${STEPS(97)}.`);
        return (
          <>
            <p>{parts.join(" ")} The start number tells you almost nothing about the run.</p>
            <p>
              Every start that computers have checked reaches 1. But nobody has proved that every start does: the
              Collatz conjecture is still open.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["27-at-1", "another-start"]}>
          {(reach) => {
            const show = (n: Start, steps: number) => {
              setDrawn((d) => ({ ...d, [n]: steps }));
              setCursor(steps);
              const hi = Math.max(...SEQ[n].slice(0, steps + 1));
              setYmax((m) => Math.max(m, scaleFor(hi)));
              if (steps >= STEPS(n)) {
                setDone((list) => (list.includes(n) ? list : [...list, n]));
                reach(n === 27 ? "27-at-1" : "another-start");
              }
            };

            // Draw the rest of a run point by point, <= 400 ms in all (frames may skip points).
            const runOut = (n: Start, from: number) => {
              if (timer.current) clearInterval(timer.current);
              const to = STEPS(n);
              if (reducedMotion() || from >= to) {
                show(n, to);
                return;
              }
              setBusy(true);
              const stride = Math.ceil((to - from) / 22);
              let at = from;
              timer.current = setInterval(() => {
                at = Math.min(to, at + stride);
                show(n, at);
                if (at >= to) {
                  if (timer.current) clearInterval(timer.current);
                  setBusy(false);
                }
              }, 16);
            };

            const step = () => {
              if (locked || busy || atOne) return;
              show(cur, k + 1);
            };
            const runToOne = () => {
              if (locked || busy || atOne) return;
              runOut(cur, k);
            };
            const pick = (n: Start) => {
              if (locked || busy || n === cur) return;
              const finished = atOne;
              setCur(n);
              setDrawn((d) => ({ ...d, [n]: 0 }));
              setCursor(0);
              if (finished) runOut(n, 0);
            };

            const lines = (Object.keys(drawn).map(Number) as Start[]).sort((a, b) => (a === 27 ? 1 : b === 27 ? -1 : 0));
            const xTicks = done.length > 0;
            const cv = SEQ[cur][Math.min(cursor, k)];
            const yTicks = [0, ymax / 2, ymax];
            const aria = atOne
              ? `Start ${cur}: ${STEPS(cur)} steps, highest value ${fmt(peakOf(cur))} at step ${SEQ[cur].indexOf(peakOf(cur))}`
              : `Start ${cur}: ${k} steps so far, value ${fmt(SEQ[cur][k])}`;

            return (
              <div className={s.wrap}>
                <p className={s.rule}>Even: halve it. Odd: times 3, plus 1. Stop at 1.</p>
                <p className={s.readout} aria-live="polite">
                  Start {cur} · step {Math.min(cursor, k)} · value {fmt(cv)}
                </p>
                <svg viewBox="0 0 342 266" className={`stage-svg ${s.chart}`} role="img" aria-label={aria}>
                  {yTicks.map((v) => (
                    <g key={`y${v}`}>
                      <line x1={X0} x2={X1} y1={ys(v)} y2={ys(v)} stroke="var(--line)" strokeWidth={v === 0 ? 1 : 0.5} />
                      <text x={X0 - 4} y={ys(v) + 3.5} textAnchor="end" className={s.tick}>
                        {fmt(v)}
                      </text>
                    </g>
                  ))}
                  <line x1={X0} x2={X0} y1={Y1} y2={Y0} stroke="var(--line)" />
                  {xTicks &&
                    [0, 40, 80, 120].map((t) => (
                      <g key={`x${t}`}>
                        <line x1={xs(t)} x2={xs(t)} y1={Y0} y2={Y0 + 4} stroke="var(--line)" />
                        <text x={xs(t)} y={Y0 + 16} textAnchor="middle" className={s.tick}>
                          {t}
                        </text>
                      </g>
                    ))}
                  <text x={(X0 + X1) / 2} y={262} textAnchor="middle" className={s.axis}>
                    steps
                  </text>
                  {lines.map((n) => {
                    const m = drawn[n] ?? 0;
                    const pts = SEQ[n].slice(0, m + 1);
                    const bold = n === 27;
                    const stroke = bold ? "var(--fg)" : "var(--muted)";
                    const w = bold ? 2 : n === cur ? 1.5 : 1;
                    return (
                      <g key={`l${n}`} data-start={n} data-steps={m}>
                        {pts.length > 1 && (
                          <polyline
                            points={pts.map((v, i) => `${xs(i).toFixed(1)},${ys(v).toFixed(1)}`).join(" ")}
                            fill="none"
                            stroke={stroke}
                            strokeWidth={w}
                            strokeLinejoin="round"
                          />
                        )}
                        {m < 20 &&
                          pts.map((v, i) => <circle key={i} cx={xs(i)} cy={ys(v)} r={bold ? 2.5 : 2} fill={stroke} />)}
                      </g>
                    );
                  })}
                  <line
                    x1={xs(Math.min(cursor, k))}
                    x2={xs(Math.min(cursor, k))}
                    y1={Y1}
                    y2={Y0}
                    stroke="var(--domain)"
                    strokeWidth={1.5}
                  />
                  <circle cx={xs(Math.min(cursor, k))} cy={ys(cv)} r={4} fill="none" stroke="var(--domain)" strokeWidth={2} />
                </svg>
                <div className={s.table} role="group" aria-label="Runs that reached 1">
                  {done.length > 0 && (
                    <>
                      <span className={s.th}>Start</span>
                      <span className={s.th}>Steps</span>
                      <span className={s.th}>Peak</span>
                    </>
                  )}
                  {done.map((n) => (
                    <span key={n} className={s.tr}>
                      <span className={s.td}>{n}</span>
                      <span className={s.td}>{STEPS(n)}</span>
                      <span className={s.td}>{fmt(peakOf(n))}</span>
                    </span>
                  ))}
                </div>
                <Row>
                  <Control className="tap" disabled={locked || busy || atOne} onClick={step}>
                    Step
                  </Control>
                  <Control className="tap" disabled={locked || busy || atOne} onClick={runToOne}>
                    Run to 1
                  </Control>
                </Row>
                <div className={s.scrub}>
                  <Slider
                    label="Step to show"
                    value={Math.min(cursor, k)}
                    min={0}
                    max={Math.max(k, 0)}
                    onChange={(v) => setCursor(v)}
                    disabled={locked || busy || k === 0}
                  />
                </div>
                <Row>
                  <span className={s.lab} id="start-label">
                    Start
                  </span>
                  <span role="group" aria-labelledby="start-label" className={s.chips}>
                    {STARTS.map((n) => (
                      <Control
                        key={n}
                        className={`tap ${cur === n ? "active" : ""}`}
                        aria-pressed={cur === n}
                        disabled={locked || busy || cur === n}
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
