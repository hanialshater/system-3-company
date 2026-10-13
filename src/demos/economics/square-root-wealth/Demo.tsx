"use client";

// Risk aversion. One curve: felt value = square root of wealth. A horizontal line marks the felt value
// of a 50-50 coin ($0 or $100); the learner moves a sure amount along the curve until its height
// meets the line.
// Key state: a sure $25 reaches the line at height 5 (the coin's felt value).
// Model: square-root felt value is one textbook choice, not a measure of any person.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const HIGH = 100;
const felt = (w: number) => Math.sqrt(w);
const COIN = 0.5 * felt(0) + 0.5 * felt(HIGH); // 5
const SURE = COIN * COIN; // 25: the sure amount whose felt value equals the coin's
const MILESTONES = ["matched"] as const;

const usd = (v: number) => `$${v}`;
const two = (v: number) => v.toFixed(2);

// Plot geometry (viewBox 320 x 160): x 0..100 dollars, y 0..10 felt value.
const X0 = 34;
const X1 = 304;
const Y0 = 128;
const Y1 = 14;
const px = (w: number) => X0 + (w / HIGH) * (X1 - X0);
const py = (f: number) => Y0 - (f / felt(HIGH)) * (Y0 - Y1);
const CURVE = Array.from({ length: 51 }, (_, i) => `${i ? "L" : "M"}${px(i * 2).toFixed(1)} ${py(felt(i * 2)).toFixed(1)}`).join(" ");

export default function SquareRootWealth({ slug }: { slug: string }) {
  const [sure, setSure] = useState(50);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `In a model, the "felt value" of wealth W is its square root. A 50-50 coin gives $0 or $${HIGH}. What sure amount feels exactly as good as the coin?`,
        options: [usd(HIGH / 2), usd(SURE), usd(HIGH * 0.75)],
        answer: 1,
      }}
      exploreHint="Move the sure amount until its height meets the coin's line."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The coin&apos;s felt value is half of {felt(0)} plus half of {felt(HIGH)}, which is <strong>{COIN}</strong>. The curve
            reaches {COIN} at <strong>{usd(SURE)}</strong>, so a sure {usd(SURE)} feels as good as the coin, though the coin pays{" "}
            {usd(HIGH / 2)} on average. A sure {usd(HIGH / 2)} sat above the line, at {two(felt(HIGH / 2))}.
          </p>
          <p>When each extra dollar matters less and less, a sure amount well below the average can equal a gamble.</p>
          <p className="muted">A model: square-root felt value is one textbook choice, not a measure of anyone. No advice.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              setSure(v);
              if (v === SURE) reach("matched");
            };
            const f = felt(sure);
            const diff = f - COIN;
            const status = locked ? "" : Math.abs(diff) < 1e-9 ? "Same as the coin" : diff > 0 ? "Better than the coin" : "Worse than the coin";
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: felt value = square root of wealth</p>
                <svg viewBox="0 0 320 160" className="stage-svg" role="img" aria-label="Felt value against wealth">
                  <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke="var(--line)" strokeWidth={1.5} />
                  <line x1={X0} y1={Y0} x2={X0} y2={Y1} stroke="var(--line)" strokeWidth={1.5} />
                  <path d={CURVE} className={s.line} />
                  <text x={X1} y={Y0 + 14} textAnchor="end" className={s.axis}>
                    wealth ($)
                  </text>
                  <text x={X0 + 4} y={Y1 + 4} className={s.axis}>
                    felt value
                  </text>
                  {!locked && (
                    <>
                      <line x1={X0} y1={py(COIN)} x2={X1} y2={py(COIN)} className={s.ghost} />
                      <text x={X1} y={py(COIN) - 4} textAnchor="end" className={s.small}>
                        coin: {COIN}
                      </text>
                      <line x1={px(sure)} y1={Y0} x2={px(sure)} y2={py(f)} stroke="var(--fg)" strokeWidth={1.5} />
                      <circle cx={px(sure)} cy={py(f)} r={6} className={Math.abs(diff) < 1e-9 ? s.goodFill : s.dot} />
                      <text x={px(sure)} y={Y0 + 14} textAnchor="middle" className={s.small}>
                        {usd(sure)}
                      </text>
                    </>
                  )}
                </svg>
                <Row>
                  <Readout label="Sure amount" value={usd(sure)} />
                  <Readout label="Its felt value" value={locked ? "?" : two(f)} />
                  <Readout label="Coin's felt value" value={locked ? "?" : two(COIN)} />
                </Row>
                <p className={s.msg}>{status}</p>
                <Row>
                  {[HIGH / 2, SURE, HIGH * 0.75].map((v) => (
                    <Control key={v} className={sure === v ? "active" : ""} disabled={locked || sure === v} onClick={() => set(v)}>
                      Sure {usd(v)}
                    </Control>
                  ))}
                </Row>
                <Slider label="Sure amount" value={sure} min={0} max={HIGH} step={5} format={usd} disabled={locked} onChange={set} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
