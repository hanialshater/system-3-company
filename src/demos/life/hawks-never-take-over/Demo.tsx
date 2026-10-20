"use client";

// Hawk-dove in a very large, randomly mixing population (deterministic shares, no randomness).
// Prize V = 4, injury C = 6. Scores per meeting (row against column):
//   hawk vs hawk (V - C)/2 = -1, hawk vs dove 4, dove vs hawk 0, dove vs dove 2.
// With hawk share x: hawk score 4 - 5x, dove score 2 - 2x. They are equal at x = 2/3 = V/C.
// Offspring = 10 + score (a baseline of 10 keeps every count positive, since hawk vs hawk is -1).
// Replicator update: x' = x * W_hawk / mean W. The slider sets the start; the chart redraws
// the whole 150-generation run at once, and keeps the last few runs as faint lines.
// v2 (r6): title and hook no longer rule out "all hawks"; four options, each with a share; the stage line
// derives hawk vs hawk = (4 − 6) ÷ 2 = −1; the reveal's end share is computed from the learner's own
// 10%-side and 90%-side starts; chart capped lower so it is not cropped on the reveal.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const GENS = 150;
const BASE = 10;
const START0 = 30; // opening start (percent): neither preset, so both preset buttons change the stage
const LOW = 10;
const HIGH = 90;
const MILESTONES = ["from-few", "from-many"] as const;

const scoreH = (x: number) => -1 * x + 4 * (1 - x);
const scoreD = (x: number) => 0 * x + 2 * (1 - x);

function trajectory(x0: number) {
  const out = [x0];
  let x = x0;
  for (let g = 1; g <= GENS; g++) {
    const wh = BASE + scoreH(x);
    const wd = BASE + scoreD(x);
    x = (x * wh) / (x * wh + (1 - x) * wd);
    out.push(x);
  }
  return out;
}

// Chart: generation 0..150 on x, hawk share 0..100% on y.
const X0 = 34, X1 = 290, Y0 = 10, Y1 = 104;
const gx = (g: number) => X0 + ((X1 - X0) * g) / GENS;
const py = (x: number) => Y1 - (Y1 - Y0) * x;
const path = (tr: number[]) => tr.map((x, g) => `${gx(g).toFixed(1)},${py(x).toFixed(1)}`).join(" ");
const pct = (x: number) => `${Math.round(100 * x)}%`;
const endPct = (startPct: number) => pct(trajectory(startPct / 100)[GENS]);
const sc = (v: number) => (v < 0 ? `−${Math.abs(v).toFixed(1)}` : v.toFixed(1));

function Stage({ locked, interact, setSeen }: { locked: boolean; interact: () => void; setSeen: (f: (v: number[]) => number[]) => void }) {
  const [start, setStart] = useState(START0);
  const [ghosts, setGhosts] = useState<number[]>([]);
  const { reach } = useMilestones(interact, MILESTONES);
  const tr = trajectory(start / 100);
  const end = tr[GENS];
  const x0 = start / 100;

  const go = (v: number) => {
    if (v === start) return;
    setGhosts((g) => [start, ...g.filter((k) => k !== start && k !== v)].slice(0, 3));
    setStart(v);
    if (v <= 20) reach("from-few");
    if (v >= 80) reach("from-many");
    setSeen((seen) => (seen.includes(v) ? seen : [...seen, v]));
  };

  return (
    <div className={s.wrap}>
      <table className={s.pay}>
        <thead>
          <tr>
            <th>Score of…</th>
            <th>vs hawk</th>
            <th>vs dove</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className={s.hawkT}>hawk</th>
            <td>−1</td>
            <td>4</td>
          </tr>
          <tr>
            <th className={s.doveT}>dove</th>
            <td>0</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>
      <p className={s.how}>Two hawks: win 4 or lose 6, so (4 − 6) ÷ 2 = −1. Offspring = 10 + score.</p>

      <svg viewBox="0 0 300 124" className={`stage-svg ${s.chart}`} role="img" aria-label={locked ? "Chart of hawk share, hidden until you predict" : `Hawk share from a ${start}% start: ${pct(end)} at generation ${GENS}`}>
        <line x1={X0} y1={Y1} x2={X1} y2={Y1} className={s.axis} />
        <line x1={X0} y1={Y0} x2={X0} y2={Y1} className={s.axis} />
        {[0, 0.5, 1].map((v) => (
          <text key={v} x={X0 - 4} y={py(v) + 4} textAnchor="end" className={s.small}>{pct(v)}</text>
        ))}
        {[0, 50, 100, 150].map((g) => (
          <text key={g} x={gx(g)} y={Y1 + 12} textAnchor="middle" className={s.small}>{g}</text>
        ))}
        <text x={(X0 + X1) / 2} y={122} textAnchor="middle" className={s.small}>generation</text>
        <text x={X0 + 4} y={Y0 + 2} className={s.small}>hawk share</text>
        {locked ? (
          <text x={(X0 + X1) / 2} y={(Y0 + Y1) / 2 + 5} textAnchor="middle" className={s.big}>?</text>
        ) : (
          <>
            {ghosts.map((k) => (
              <polyline key={k} points={path(trajectory(k / 100))} className={s.ghost} />
            ))}
            <polyline points={path(tr)} className={s.line} />
            <circle cx={gx(0)} cy={py(x0)} r={3.5} className={s.dot} />
            <circle cx={gx(GENS)} cy={py(end)} r={3.5} className={s.dot} />
            <text x={gx(GENS) - 4} y={py(end) + (end > 0.5 ? 14 : -6)} textAnchor="end" className={s.endT}>{pct(end)}</text>
          </>
        )}
      </svg>

      <p className={s.msg} aria-live="polite">
        {locked
          ? "Predict first. Then set the starting share of hawks."
          : scoreH(x0) > scoreD(x0)
            ? `At ${start}% hawks: hawk ${sc(scoreH(x0))}, dove ${sc(scoreD(x0))}. Hawks grow.`
            : scoreH(x0) < scoreD(x0)
              ? `At ${start}% hawks: hawk ${sc(scoreH(x0))}, dove ${sc(scoreD(x0))}. Hawks shrink.`
              : `At ${start}% hawks both score the same.`}
      </p>

      <Row>
        <Control className={s.chip} disabled={locked || start === LOW} onClick={() => go(LOW)}>
          Start at {LOW}%
        </Control>
        <Control className={s.chip} disabled={locked || start === HIGH} onClick={() => go(HIGH)}>
          Start at {HIGH}%
        </Control>
      </Row>
      <Slider label="Starting share of hawks" value={start} min={1} max={99} disabled={locked} format={(v) => `${v}%`} onChange={go} />
      <Row>
        <Readout label={`Hawks at gen ${GENS}`} value={locked ? "?" : pct(end)} />
        <Readout label="Scores there (hawk, dove)" value={locked ? "?" : `${sc(scoreH(end))}, ${sc(scoreD(end))}`} />
      </Row>
    </div>
  );
}

export default function HawksNeverTakeOver({ slug }: { slug: string }) {
  const [seen, setSeen] = useState<number[]>([]);
  const low = seen.filter((v) => v <= 20);
  const high = seen.filter((v) => v >= 80);
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "At a feeding spot, birds meet in pairs over food. Hawks fight (the winner takes 4, an injury costs 6); doves share. Start with 10% hawks, or with 90%. Where does the hawk share settle?",
        options: ["Nearly 100% hawks", "About 67% hawks", "About 33% hawks", "Near its start (10% or 90%)"],
        answer: 1,
      }}
      exploreHint="Start with few hawks, then with many. Watch where each run ends."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            {low.length && high.length
              ? `From ${Math.min(...low)}% and from ${Math.max(...high)}% hawks, the share ended at ${endPct(Math.min(...low))} and ${endPct(Math.max(...high))}`
              : "From few hawks and from many, the share ended at the same place"}
            : two hawks in three. Aggression did not take over.
          </p>
          <p>
            A hawk meeting a dove takes the whole prize (4 vs 0), so hawks grow while they are few. Two hawks
            fight and average −1, while a dove facing a hawk just backs off (0), so hawks shrink once they are many.
            The share settles where both score the same: prize ÷ cost = 4 ÷ 6 = 2/3. That mix is evolutionarily
            stable.
          </p>
          <p className="muted">
            Toy model: one-off meetings at random in a huge population, chosen payoffs. It is not a claim about
            real animals.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} setSeen={setSeen} />}
    </Lesson>
  );
}
