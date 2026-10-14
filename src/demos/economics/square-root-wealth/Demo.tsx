"use client";

// Risk aversion. One curve: felt value = square root of wealth. A horizontal line marks the felt value
// of a 50-50 coin ($0 or $100); the learner moves a sure amount along the curve until its height
// meets the line.
// Key states: a sure amount below the coin's line, the amount that meets it ($25, height 5), and one above.
// The slider comes first in DOM order and starts at $15, so two steps up reach $25; once met, a tick stays on the
// curve and the two gains ($0 to $25: +5, $50 to $100: +2.93) are drawn, so the reveal can point at the bend.
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
const MILESTONES = ["below", "met", "above"] as const;
const START_SURE = 15;
const GAIN_LOW = felt(SURE) - felt(0); // 5
const GAIN_HIGH = felt(HIGH) - felt(HIGH / 2); // 2.93
const CHIPS = [10, HIGH / 2, HIGH * 0.75];

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
  const [sure, setSure] = useState(START_SURE);
  const [met, setMet] = useState(false); // the learner put the dot on the coin's line

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `In a model, the "felt value" of wealth W is its square root. A 50-50 coin gives $0 or $${HIGH}. What sure amount feels exactly as good as the coin?`,
        options: [usd(HIGH / 2), usd(SURE), usd(HIGH * 0.75)],
        answer: 1,
      }}
      exploreHint="Slide the sure amount until its dot sits on the coin's line. Then try the amounts below."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The coin&apos;s felt value is half of √0 = {felt(0)} plus half of √{HIGH} = {felt(HIGH)}, which is{" "}
            <strong>{COIN}</strong>.{" "}
            {met
              ? `You found the curve reaching ${COIN} at ${usd(SURE)} (the tick on the curve), so a sure ${usd(SURE)} feels as good as the coin, though the coin pays ${usd(HIGH / 2)} on average.`
              : ""}
          </p>
          <p>
            Look at the bend: from $0 to {usd(SURE)} the felt value rises {two(GAIN_LOW)}, but from {usd(HIGH / 2)} to {usd(HIGH)}{" "}
            only {two(GAIN_HIGH)}. When each extra dollar matters less and less, a sure amount well below the average can
            equal a gamble.
          </p>
          <p className="muted">A model: square-root felt value is one textbook choice, not a measure of anyone. No advice.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              setSure(v);
              if (Math.abs(felt(v) - COIN) < 1e-9) {
                setMet(true);
                reach("met");
              }
              if (v < SURE) reach("below");
              if (v > SURE) reach("above");
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
                  <text x={X1} y={Y0 + 30} textAnchor="end" className={s.axis}>
                    wealth ($)
                  </text>
                  <text x={X0 + 4} y={Y1 + 4} className={s.axis}>
                    felt value
                  </text>
                  {met && (
                    <g data-testid="gains">
                      <line x1={px(SURE)} y1={py(0)} x2={px(SURE)} y2={py(COIN)} className={s.gain} />
                      <text x={px(SURE) - 4} y={py(COIN / 2)} textAnchor="end" className={s.small}>
                        +{two(GAIN_LOW)}
                      </text>
                      <line x1={px(HIGH) + 6} y1={py(felt(HIGH / 2))} x2={px(HIGH) + 6} y2={py(felt(HIGH))} className={s.gain} />
                      <line x1={px(HIGH / 2)} y1={py(felt(HIGH / 2))} x2={px(HIGH) + 6} y2={py(felt(HIGH / 2))} className={s.ghost} />
                      <text x={px(HIGH) + 2} y={py(felt(HIGH)) + 22} textAnchor="end" className={s.small}>
                        +{two(GAIN_HIGH)}
                      </text>
                      <circle cx={px(SURE)} cy={py(COIN)} r={4} className={s.goodFill} />
                      <text x={px(SURE)} y={py(COIN) - 8} textAnchor="middle" className={s.small}>
                        ✓ {usd(SURE)}
                      </text>
                    </g>
                  )}
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
                <p className={s.msg}>{locked ? "" : `Coin: half of \u221A0 plus half of \u221A${HIGH} = 0 + ${felt(HIGH) / 2} = ${COIN}`}</p>
                <p className={s.msg}>{status}{!locked && Math.abs(diff) < 1e-9 ? `: the coin pays ${usd(HIGH / 2)} on average` : ""}</p>
                <Slider label="Sure amount" value={sure} min={0} max={HIGH} step={5} format={usd} disabled={locked} onChange={set} />
                <Row>
                  {CHIPS.map((v) => (
                    <Control key={v} className={sure === v ? "active" : ""} disabled={locked || sure === v} onClick={() => set(v)}>
                      Sure {usd(v)}
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
