"use client";

// 1 + 2 + ... + n as a staircase of dots. A second staircase, turned half a turn, is the
// exact complement inside an n-by-(n+1) rectangle: column i holds i dots below and
// n + 1 - i dots above. So two staircases make n(n+1) dots and one is n(n+1)/2.
// The copy starts rotated 180 degrees about the rectangle's centre, which places it
// exactly on top of the original staircase; un-rotating it swings it into the gap.
// The reveal waits until the learner has made the 10-step rectangle.

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const W = 280;
const H = 250;
const PAD = 22;

export default function GaussStaircase({ slug }: { slug: string }) {
  const [n, setN] = useState(8);
  const [copy, setCopy] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "What is 1 + 2 + 3 + … + 10?",
        options: ["50", "55", "110"],
        answer: 1,
      }}
      exploreHint="Set 10 steps, then add a flipped copy."
      reveal={() => (
        <>
          <p>
            It is <strong>55</strong>. Two 10-step staircases fit together into a 10 × 11 rectangle: 110 dots. One
            staircase is half of that.
          </p>
          <p>
            It works for any number of steps, because the flipped copy always fills exactly what the first one leaves
            empty: n × (n + 1), halved. So 1 + 2 + … + 100 = 100 × 101 ÷ 2 = 5050, with no long adding.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} n={n} setN={setN} copy={copy} setCopy={setCopy} />}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  n,
  setN,
  copy,
  setCopy,
}: StageContext & { n: number; setN: (v: number) => void; copy: boolean; setCopy: (v: boolean) => void }) {
  const fired = useRef(false);
  useEffect(() => {
    if (!locked && copy && n === 10 && !fired.current) {
      fired.current = true;
      interact();
    }
  }, [locked, copy, n, interact]);

  const cell = Math.min((W - 2 * PAD) / n, (H - 2 * PAD) / (n + 1), 26);
  const gw = cell * n;
  const gh = cell * (n + 1);
  const x0 = (W - gw) / 2;
  const y0 = (H - gh) / 2 + 4;
  const cx = (c: number) => x0 + cell * c + cell / 2;
  const cy = (r: number) => y0 + gh - cell * r - cell / 2; // r = 0 is the bottom row
  const r = cell * 0.36;

  const base: { c: number; r: number }[] = [];
  const top: { c: number; r: number }[] = [];
  for (let c = 0; c < n; c++) {
    for (let k = 0; k <= c; k++) base.push({ c, r: k });
    for (let k = c + 1; k <= n; k++) top.push({ c, r: k });
  }
  const sum = (n * (n + 1)) / 2;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`A staircase of ${n} steps${copy ? " and its flipped copy" : ""}`}>
        {copy && <rect x={x0 - 3} y={y0 - 3} width={gw + 6} height={gh + 6} rx={6} className={s.frame} />}
        {base.map((d) => (
          <circle key={`b${d.c}-${d.r}`} cx={cx(d.c)} cy={cy(d.r)} r={r} className={s.dot} />
        ))}
        <g
          className={s.copy}
          style={{
            transformOrigin: `${x0 + gw / 2}px ${y0 + gh / 2}px`,
            transform: copy ? "rotate(0deg)" : "rotate(180deg)",
            opacity: copy ? 1 : 0,
          }}
        >
          {top.map((d) => (
            <circle key={`t${d.c}-${d.r}`} cx={cx(d.c)} cy={cy(d.r)} r={r} className={s.dotCopy} />
          ))}
        </g>
        {copy && (
          <>
            <text x={x0 + gw / 2} y={y0 + gh + 15} textAnchor="middle" className={s.dim}>
              {n} wide
            </text>
            <text x={x0 - 8} y={y0 + gh / 2} textAnchor="middle" className={s.dim} transform={`rotate(-90 ${x0 - 8} ${y0 + gh / 2})`}>
              {n + 1} tall
            </text>
          </>
        )}
      </svg>

      <p className={s.caption} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : copy
            ? `Blue + green: ${n} × ${n + 1} = ${n * (n + 1)}. Blue alone, 1 + … + ${n}: ${sum}.`
            : `Blue staircase: 1 + 2 + … + ${n}. Add a flipped copy.`}
      </p>

      <Row>
        <Slider label="Steps" value={n} min={3} max={12} disabled={locked} onChange={setN} />
        <Control disabled={locked} onClick={() => setCopy(!copy)} className={copy ? "active" : ""} aria-pressed={copy}>
          {copy ? "Remove copy" : "Add flipped copy"}
        </Control>
      </Row>
    </div>
  );
}
