"use client";

// Net hourly earnings. One picture: an hour's $22 pay as a bar; the driving cost (miles × cost per
// mile) is cut out of its end, and what is left is the pay you keep. Money in cents to stay exact.
// Key state: 15 miles an hour at $0.50 a mile (cost $7.50, $14.50 left).
// Model: ignores tax and tips; per-mile costs are illustrative, not an official rate.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const PAY = 2200; // cents per hour
const Q_MILES = 15;
const Q_RATE = 50; // cents per mile
const RATES = [25, 50, 70];
const START_MILES = 13;
const MAX_MILES = 30;
const MILESTONES = ["fifteen-at-fifty"] as const;

const cost = (miles: number, rate: number) => miles * rate;
const kept = (miles: number, rate: number) => PAY - cost(miles, rate);
const usd = (c: number) => `$${(c / 100).toFixed(2)}`;
const ANSWER = kept(Q_MILES, Q_RATE); // 1450

// Geometry (viewBox 320 × 120): $0..$22 across.
const L = 12;
const R = 308;
const px = (c: number) => L + (c / PAY) * (R - L);
const BY = 40;
const BH = 42;

export default function NetHourlyAfterCosts({ slug }: { slug: string }) {
  const [miles, setMiles] = useState(START_MILES);
  const [rate, setRate] = useState(Q_RATE);
  const [tried, setTried] = useState<number[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A delivery app pays you ${usd(PAY).replace(".00", "")} an hour. In that hour you drive ${Q_MILES} miles, and your car costs ${usd(Q_RATE)} a mile to run. What do you actually keep per hour?`,
        options: [usd(PAY), usd(ANSWER), usd(cost(Q_MILES, Q_RATE))],
        answer: 1,
      }}
      exploreHint={`Set ${Q_MILES} miles an hour at ${usd(Q_RATE)} a mile.`}
      minInteractions={MILESTONES.length}
      reveal={() => {
        const others = tried.filter((r) => r !== Q_RATE);
        return (
          <>
            <p>
              At {Q_MILES} miles an hour and {usd(Q_RATE)} a mile, driving ate <strong>{usd(cost(Q_MILES, Q_RATE))}</strong> of the{" "}
              {usd(PAY)}, leaving <strong>{usd(ANSWER)}</strong> an hour.
              {others.length > 0 &&
                ` At ${Q_MILES} miles, ${others.map((r) => `${usd(r)} a mile would leave ${usd(kept(Q_MILES, r))}`).join(" and ")}.`}
            </p>
            <p>
              The car's fuel and wear come out of every hour,
              and they grow with every mile. What you earn is the pay left after the costs of earning it.
            </p>
            <p className="muted">A model: no tax or tips, and the per-mile costs are examples, not an official rate.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const c = cost(miles, rate);
            const k = kept(miles, rate);
            const check = (m: number, r: number) => {
              if (m === Q_MILES && r === Q_RATE) reach("fifteen-at-fifty");
            };
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: no tax, no tips</p>
                <svg
                  viewBox="0 0 320 120"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "An hour's pay of $22" : `Cost ${usd(c)}, kept ${usd(k)}`}
                >
                  <text x={L} y={BY - 10} className={s.value}>
                    {usd(PAY)} an hour
                  </text>
                  {locked ? (
                    <rect x={px(0)} y={BY} width={px(PAY) - px(0)} height={BH} className={s.soft} />
                  ) : (
                    <>
                      <rect x={px(0)} y={BY} width={px(k) - px(0)} height={BH} className={s.goodFill} />
                      <rect x={px(k)} y={BY} width={px(PAY) - px(k)} height={BH} className={s.badFill} />
                      <text x={(px(0) + px(k)) / 2} y={BY + BH / 2 + 6} textAnchor="middle" className={s.big}>
                        {usd(k)}
                      </text>
                      {c >= 250 && (
                        <text x={(px(k) + px(PAY)) / 2} y={BY + BH / 2 + 5} textAnchor="middle" className={s.value}>
                          −{usd(c)}
                        </text>
                      )}
                      <text x={(px(0) + px(k)) / 2} y={BY + BH + 16} textAnchor="middle" className={s.axis}>
                        kept
                      </text>
                      <text x={(px(k) + px(PAY)) / 2} y={BY + BH + 16} textAnchor="middle" className={s.axis}>
                        driving
                      </text>
                    </>
                  )}
                </svg>

                <Row>
                  <Readout label="Driving cost" value={locked ? "?" : usd(c)} />
                  <Readout label="Kept per hour" value={locked ? "?" : usd(k)} />
                </Row>
                <Slider
                  label="Miles an hour"
                  value={miles}
                  min={0}
                  max={MAX_MILES}
                  disabled={locked}
                  onChange={(v) => {
                    setMiles(v);
                    check(v, rate);
                  }}
                />
                <Row>
                  <span className={s.rowLabel}>Cost a mile</span>
                  {RATES.map((r) => (
                    <Control
                      key={r}
                      className={rate === r ? "active" : ""}
                      disabled={locked || rate === r}
                      aria-pressed={rate === r}
                      aria-label={`Driving costs ${usd(r)} a mile`}
                      onClick={() => {
                        setRate(r);
                        setTried((t) => (t.includes(r) ? t : [...t, r]));
                        check(miles, r);
                      }}
                    >
                      {usd(r)}
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
