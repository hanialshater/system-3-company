"use client";

// Worth something alone (E&K ch. 17, section 17.6 unconfirmed). The below-critical-mass toy market plus a
// stand-alone value a: person x (0-1, keenest first) values the app at (1 - x)(a + share). Price 16¢.
// Each round everyone whose value beats the price uses it: next share = max(0, 1 - 0.16 / (a + share)).
// The chart plots the keenest non-user's value, (1 - z)(a + z) at share z, against the price line:
// where the curve is above the line the share grows, below it shrinks; crossings are the resting points.
// At share 0 the curve's height is a, the keenest fan's value of an empty app.
// a = 0: crossings 20%, 80%. a = 10¢: 7.3%, 82.7%, and 0 still rests. a = 20¢: only 84.7%; 0 climbs.
// Numbers: node company/courses/ncm/checks/rejudged-four.mjs (J11 lines) and launch() below.

import { useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const PRICE = 0.16;
const QUESTION_A = 0.1;
const CHIPS = [0.2, 0, 0.1]; // DOM order after "Launch from 0"

const next = (a: number, z: number) => Math.max(0, 1 - PRICE / (a + z));
const value = (a: number, z: number) => (1 - z) * (a + z);
/** Resting shares other than 0: roots of (1 - z)(a + z) = price. */
function crossings(a: number): number[] {
  const b = 1 - a;
  const d = b * b - 4 * (PRICE - a);
  if (d < 0) return [];
  const r = Math.sqrt(d);
  return [(b - r) / 2, (b + r) / 2].filter((z) => z > 0 && z < 1);
}
/** The tipping point: the lower crossing, if zero is still a resting point (a below the price). */
const tipping = (a: number): number | null => (a < PRICE ? (crossings(a)[0] ?? null) : null);
/** Shares by round from 0; stops when a round moves less than 0.1 point (at most 12 rounds). */
function launch(a: number): number[] {
  const out = [0];
  for (let i = 0; i < 12; i++) {
    const cur = out[out.length - 1];
    const n = next(a, cur);
    out.push(n);
    if (Math.abs(n - cur) < 0.001) break;
  }
  return out;
}
const pct = (z: number) => `${Math.round(z * 100)}%`;
const pct1 = (z: number) => `${(z * 100).toFixed(1)}%`;
const cents = (a: number) => `${Math.round(a * 100)}¢`;

// Geometry (viewBox 320 x 196): share 0-100% across, value 0-40¢ up.
const L = 40;
const R = 304;
const TOP = 16;
const BOT = 158;
const px = (z: number) => L + z * (R - L);
const py = (v: number) => BOT - (v / 0.4) * (BOT - TOP);
const curvePts = (a: number) => Array.from({ length: 101 }, (_, i) => `${px(i / 100)},${py(value(a, i / 100))}`).join(" ");

type Run = { a: number; end: number };

/** Each curve's name, written on the curve at its peak (share (1 - a)/2) over a halo, so it cannot be read
 *  as the name of the curve above or below. Peaks are at least 18 px apart for a = 0, 10¢, 20¢. */
function CurveName({ a, className }: { a: number; className: string }) {
  const z = (1 - a) / 2;
  return (
    <text x={px(z)} y={py(value(a, z)) + 3.5} textAnchor="middle" className={className}>
      {cents(a)} alone
    </text>
  );
}

function Stage({ ctx, runs, onRun }: { ctx: StageContext; runs: Run[]; onRun: (r: Run) => void }) {
  const { locked } = ctx;
  const { reach } = useMilestones(ctx.interact, ["stuck", "climbs", "no-alone"]);
  const [a, setA] = useState(QUESTION_A);
  const [launched, setLaunched] = useState(false);

  const go = (na: number) => {
    if (locked) return;
    const path = launch(na);
    const end = path[path.length - 1];
    setA(na);
    setLaunched(true);
    onRun({ a: na, end });
    if (na === QUESTION_A) reach("stuck");
    if (na === 0.2) reach("climbs");
    if (na === 0) reach("no-alone");
  };

  const path = launched ? launch(a) : [];
  const end = path.length ? path[path.length - 1] : null;
  const tip = tipping(a);
  const ghosts = [...new Set(runs.map((r) => r.a))].filter((g) => g !== a);

  return (
    <div className={s.wrap}>
      <svg
        viewBox="0 0 320 196"
        className="stage-svg"
        role="img"
        aria-label={locked ? "Value against share, price line at 16 cents" : `Stand-alone value ${cents(a)}`}
      >
        <line x1={L} y1={TOP} x2={L} y2={BOT} className={s.axisLine} />
        <line x1={L} y1={BOT} x2={R} y2={BOT} className={s.axisLine} />
        {[0, 50, 100].map((k) => (
          <text key={k} x={px(k / 100)} y={BOT + 13} textAnchor={k === 0 ? "start" : k === 100 ? "end" : "middle"} className={s.tick}>
            {k}%
          </text>
        ))}
        {[0, 20, 40].map((v) => (
          <text key={v} x={L - 4} y={py(v / 100) + 3.5} textAnchor="end" className={s.tick}>
            {v}¢
          </text>
        ))}
        <text x={(L + R) / 2} y={BOT + 30} textAnchor="middle" className={s.tick}>
          share using it
        </text>
        <text x={L + 4} y={TOP - 4} className={s.tick}>
          keenest non-user&apos;s value
        </text>
        <line x1={L} y1={py(PRICE)} x2={R} y2={py(PRICE)} className={s.price} />
        <text x={px(0.62)} y={py(PRICE) + 14} textAnchor="middle" className={s.priceLab}>
          price 16¢
        </text>
        {!locked &&
          ghosts.map((g) => {
            const t = tipping(g);
            const run = runs.find((r) => r.a === g);
            return (
              <g key={g}>
                <polyline points={curvePts(g)} className={s.ghost} />
                <CurveName a={g} className={s.ghostName} />
                {t !== null && (
                  <>
                    <circle cx={px(t)} cy={py(PRICE)} r={3.5} className={s.ghostDot} />
                    <text x={px(t) + 6} y={py(PRICE) + 14} className={s.ghostLab}>
                      {pct1(t)}
                    </text>
                  </>
                )}
                {run && run.end > 0 && (
                  <text x={px(run.end)} y={py(value(g, run.end)) - 7} textAnchor="middle" className={s.ghostLab}>
                    {pct(run.end)}
                  </text>
                )}
              </g>
            );
          })}
        {!locked && (
          <>
            <polyline points={curvePts(a)} className={s.curve} />
            <CurveName a={a} className={s.curveName} />
            <circle cx={px(0)} cy={py(a)} r={5} className={s.fan} />
            <line x1={px(0) + 4} y1={py(a) + 3} x2={L + 26} y2={BOT - 17} className={s.leader} />
            <text x={L + 28} y={BOT - 9} className={s.fanLab}>
              {cents(a)}: empty app
            </text>
            {crossings(a).map((z) => (
              <circle key={z} cx={px(z)} cy={py(PRICE)} r={5} className={z === tip ? s.tip : s.rest} />
            ))}
            {tip !== null && (
              <text x={px(tip) + 7} y={py(PRICE) + 14} className={s.tipLab}>
                {pct1(tip)}
              </text>
            )}
            {path.map((z, i) => (
              <circle key={i} cx={px(z)} cy={py(value(a, z))} r={i === path.length - 1 ? 5.5 : 3} className={s.trailDot} />
            ))}
          </>
        )}
        {locked && (
          <text x={(L + R) / 2} y={(TOP + BOT) / 2} textAnchor="middle" className={s.tick}>
            The chart appears after you answer
          </text>
        )}
      </svg>
      <Row>
        <Readout label="share" value={locked || end === null ? "–" : pct(end)} />
        <Readout label="tipping point" value={locked ? "–" : tip === null ? "none" : pct1(tip)} />
      </Row>
      <p className={s.seen}>
        {runs.length > 0 && "launches from 0: "}
        {runs.map((r) => `${cents(r.a)} → ${pct(r.end)}`).join(" · ")}
      </p>
      <Row>
        <Control disabled={locked || launched} onClick={() => go(a)}>
          Launch from 0
        </Control>
        {CHIPS.map((c) => (
          <Control key={c} className={launched && a === c ? "active" : ""} disabled={locked || (launched && a === c)} onClick={() => go(c)}>
            {cents(c)} alone
          </Control>
        ))}
      </Row>
    </div>
  );
}

export default function WorthSomethingAlone({ slug }: { slug: string }) {
  const [runs, setRuns] = useState<Run[]>([]);
  const onRun = (r: Run) => setRuns((v) => [...v.filter((x) => x.a !== r.a), r]);
  const stuck = runs.find((r) => r.a === QUESTION_A);
  const climbs = runs.find((r) => r.a === 0.2);
  const none = runs.find((r) => r.a === 0);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You launch the same network app at 16¢, with 0 users. Even with nobody else on it, the app is worth 10¢ to its keenest fan. What share of people end up using it?",
        options: ["About 0%", "About 10%", "About 80%"],
        answer: 0,
      }}
      exploreHint="Launch the 10¢ app from 0, then try other stand-alone values."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            At 10¢ alone, even the keenest fan values an empty app below the 16¢ price, so nobody starts
            {stuck ? <>: your launch stayed at {pct(stuck.end)}</> : null}.
            {none && (
              <>
                {" "}
                The stand-alone value did lower the critical mass, from {pct1(tipping(0) ?? 0)} to {pct1(tipping(QUESTION_A) ?? 0)}.
              </>
            )}
          </p>
          <p>
            {climbs && (
              <>At 20¢ alone the first buyers come with nobody else on it, and the app climbed to {pct(climbs.end)}. </>
            )}
            Stand-alone value removes the trap only when it beats the price.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage ctx={ctx} runs={runs} onRun={onRun} />}
    </Lesson>
  );
}
