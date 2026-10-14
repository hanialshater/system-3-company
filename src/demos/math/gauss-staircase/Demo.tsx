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
  const [built, setBuilt] = useState(0); // most steps the learner has shown with the flipped copy on

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Add 1 + 2 + 3 + … + 100, every whole number up to 100. What do you get?",
        options: ["5,000", "5,050", "10,100"],
        answer: 1,
      }}
      exploreHint="Build a staircase of 10 or more steps, add the flipped copy, then jump to 100 steps."
      reveal={() => (
        <>
          <p>
            It is <strong>5,050</strong>. Two 100-step staircases fit into a 100 × 101 rectangle: 10,100 dots. One
            staircase is half of that.
            {built > 0
              ? ` You saw the same with ${built} steps: ${built} × ${built + 1} = ${(built * (built + 1)).toLocaleString("en-US")}, half is ${((built * (built + 1)) / 2).toLocaleString("en-US")}.`
              : ""}
          </p>
          <p>
            It works for any number of steps, because the flipped copy always fills exactly what the first one leaves
            empty: n × (n + 1), halved. So 1 + 2 + … + 100 = 100 × 101 ÷ 2, with no long adding.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} n={n} setN={setN} copy={copy} setCopy={setCopy} onBuilt={(m) => setBuilt((p) => Math.max(p, m))} />}
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
  onBuilt,
}: StageContext & { n: number; setN: (v: number) => void; copy: boolean; setCopy: (v: boolean) => void; onBuilt: (n: number) => void }) {
  const fired = useRef(false);
  useEffect(() => {
    if (!locked && copy) onBuilt(n);
    if (!locked && copy && n >= 10 && !fired.current) {
      fired.current = true;
      interact();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked, copy, n, interact]);

  const cell = Math.min((W - 2 * PAD) / n, (H - 2 * PAD) / (n + 1), 26);
  const dots = n <= 20; // beyond 20 steps the dots are drawn as two solid staircases
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
  const bottom = y0 + gh;
  const baseShape: string[] = [`${x0},${bottom}`];
  for (let c = 0; c < n; c++) baseShape.push(`${x0 + c * cell},${bottom - (c + 1) * cell}`, `${x0 + (c + 1) * cell},${bottom - (c + 1) * cell}`);
  baseShape.push(`${x0 + gw},${bottom}`);
  const topShape: string[] = [`${x0},${y0}`, `${x0 + gw},${y0}`];
  for (let c = n - 1; c >= 0; c--) topShape.push(`${x0 + (c + 1) * cell},${y0 + (n - c) * cell}`, `${x0 + c * cell},${y0 + (n - c) * cell}`);

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`A staircase of ${n} steps${copy ? " and its flipped copy" : ""}`}>
        {copy && <rect x={x0 - 3} y={y0 - 3} width={gw + 6} height={gh + 6} rx={6} className={s.frame} />}
        {!dots && <polygon points={baseShape.join(" ")} className={s.dot} />}
        {dots && base.map((d) => (
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
          {!dots && <polygon points={topShape.join(" ")} className={s.dotCopy} />}
          {dots && top.map((d) => (
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
            ? `Blue + green: ${n} × ${n + 1} = ${(n * (n + 1)).toLocaleString("en-US")}. Blue is half: 1 + … + ${n} = ${sum.toLocaleString("en-US")}.`
            : `Blue staircase: 1 + 2 + … + ${n}. Add a flipped copy.`}
      </p>

      <Row>
        <Slider label="Steps" value={n} min={3} max={100} disabled={locked} onChange={setN} />
        <Control disabled={locked} onClick={() => setCopy(!copy)} className={copy ? "active" : ""} aria-pressed={copy}>
          {copy ? "Remove copy" : "Add flipped copy"}
        </Control>
        <Control disabled={locked || n === 100} onClick={() => setN(100)}>
          Jump to 100 steps
        </Control>
      </Row>
    </div>
  );
}
