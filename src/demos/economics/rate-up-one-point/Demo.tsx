"use client";

// Percentage points vs percent. One picture: two bars on a 0–10% scale, each cut into 1-point
// slices. The "after" bar's extra slice is the change in points; read against the "before" bar it
// is the percent change (1 slice of 4 = 25%).
// Key state: 4% → 5% (+1 point, +25%), then a 1-point rise from another start (1% → 2% is +100%).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const Q_OLD = 4;
const Q_NEW = 5;
const STARTS = [1, 2, 4, 8];
const NEW_MIN = 1;
const NEW_MAX = 10;
const MILESTONES = ["four-to-five", "other-start"] as const;

const points = (a: number, b: number) => b - a;
const pctChange = (a: number, b: number) => ((b - a) / a) * 100;
const num = (v: number) => String(+v.toFixed(1));
const signed = (v: number) => (v > 0 ? `+${num(v)}` : v < 0 ? `−${num(-v)}` : "0");
const ANSWER = pctChange(Q_OLD, Q_NEW); // 25

// Geometry (viewBox 320 × 210): 0..10% up.
const TOP = 14;
const BOT = 186;
const py = (v: number) => BOT - (v / NEW_MAX) * (BOT - TOP);
const BW = 64;
const X_OLD = 70;
const X_NEW = 190;

export default function RateUpOnePoint({ slug }: { slug: string }) {
  const [oldR, setOldR] = useState(Q_OLD);
  const [newR, setNewR] = useState(Q_OLD);
  const [others, setOthers] = useState<number[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A loan rate rises from ${Q_OLD}% to ${Q_NEW}%. By what percent did the rate itself rise?`,
        options: [`${points(Q_OLD, Q_NEW)}%`, `${num(ANSWER)}%`, `${Q_NEW}%`],
        answer: 1,
      }}
      exploreHint={`Raise the new rate to ${Q_NEW}%, then try other starting rates.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            From {Q_OLD}% to {Q_NEW}% the bar grew by <strong>1 point</strong>, one slice on top of {Q_OLD}. One slice of {Q_OLD} is a
            quarter, so the rate itself rose <strong>{num(ANSWER)}%</strong>.
            {others.length > 0 &&
              ` The same 1-point rise from ${others.map((a) => `${a}% was ${signed(pctChange(a, a + 1))}%`).join(", from ")}.`}
          </p>
          <p>
            A point is a distance on the scale. A percent change is that distance divided by where you started. That is why
            careful writers say a rate rose "one percentage point", and why the two numbers can be far apart.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pts = points(oldR, newR);
            const pct = pctChange(oldR, newR);
            const check = (a: number, b: number) => {
              if (a === Q_OLD && b === Q_NEW) reach("four-to-five");
              if (a !== Q_OLD && b - a === 1) {
                setOthers((o) => (o.includes(a) ? o : [...o, a]));
                reach("other-start");
              }
            };
            const moveNew = (b: number) => {
              setNewR(b);
              check(oldR, b);
            };
            const pickStart = (a: number) => {
              setOldR(a);
              setNewR(a + 1);
              check(a, a + 1);
            };
            const lo = Math.min(oldR, newR);
            const hi = Math.max(oldR, newR);
            const slices = (x: number, h: number) =>
              Array.from({ length: Math.floor(h) }, (_, i) => i + 1).map((k) => (
                <line key={k} x1={x} y1={py(k)} x2={x + BW} y2={py(k)} stroke="var(--bg-3)" strokeWidth={1.5} />
              ));
            return (
              <div className={s.wrap}>
                <svg
                  viewBox="0 0 320 210"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Two rate bars" : `${oldR}% to ${newR}%: ${signed(pts)} points, ${signed(pct)} percent`}
                >
                  {[0, 2, 4, 6, 8, 10].map((v) => (
                    <text key={v} x={30} y={py(v) + 4} textAnchor="end" className={s.axis}>
                      {v}%
                    </text>
                  ))}
                  <line x1={36} y1={BOT} x2={310} y2={BOT} stroke="var(--line)" />
                  <rect x={X_OLD} y={py(oldR)} width={BW} height={BOT - py(oldR)} className={s.soft} />
                  {slices(X_OLD, oldR)}
                  <text x={X_OLD + BW / 2} y={BOT + 16} textAnchor="middle" className={s.value}>
                    before {num(oldR)}%
                  </text>
                  <rect x={X_NEW} y={py(lo)} width={BW} height={BOT - py(lo)} className={s.soft} />
                  {!locked && hi > lo && (
                    <rect x={X_NEW} y={py(hi)} width={BW} height={py(lo) - py(hi)} className={newR > oldR ? s.badFill : s.ghostFill} />
                  )}
                  {slices(X_NEW, lo)}
                  <line x1={X_OLD} y1={py(oldR)} x2={X_NEW + BW} y2={py(oldR)} stroke="var(--muted)" strokeDasharray="3 3" />
                  <text x={X_NEW + BW / 2} y={BOT + 16} textAnchor="middle" className={s.value}>
                    after {num(newR)}%
                  </text>
                  {!locked && hi > lo && (
                    <text x={X_NEW + BW + 6} y={(py(hi) + py(lo)) / 2 + 4} className={s.value}>
                      {signed(pts)} pt
                    </text>
                  )}
                </svg>

                <Row>
                  <Readout label="Change in points" value={locked ? "?" : signed(pts)} />
                  <Readout label="Change in percent" value={locked ? "?" : `${signed(pct)}%`} />
                </Row>
                <Slider
                  label="New rate"
                  value={newR}
                  min={NEW_MIN}
                  max={NEW_MAX}
                  step={0.5}
                  disabled={locked}
                  format={(v) => `${num(v)}%`}
                  onChange={moveNew}
                />
                <Row>
                  <span className={s.rowLabel}>Start at</span>
                  {STARTS.map((a) => (
                    <Control
                      key={a}
                      className={oldR === a ? "active" : ""}
                      disabled={locked || oldR === a}
                      aria-pressed={oldR === a}
                      aria-label={`Start at ${a}%`}
                      onClick={() => pickStart(a)}
                    >
                      {a}%
                    </Control>
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
