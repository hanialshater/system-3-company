"use client";

// Extra loan payment. One graph: what is still owed on a $200,000, 6%, 30-year loan, month by month.
// The no-extra path is ghosted; the slider adds a fixed extra to every $1,199.10 payment and the
// solid path hits zero sooner. Key state: +$100 a month, paid off at month 295 (24 yr 7 mo).
// Model: fixed 6% a year (0.5% a month), no prepayment fee, the last payment only what is owed.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const LOAN = 200000;
const RATE = 0.005;
const N = 360;
const Q_EXTRA = 100;
const MAX_EXTRA = 500;
const STEP = 50; // QA's two arrow presses land on $100
const MILESTONES = ["hundred-extra"] as const;

const PAYMENT = (LOAN * RATE) / (1 - (1 + RATE) ** -N);

/** Month-by-month balance with `extra` added to every payment. */
function run(extra: number) {
  const path = [LOAN];
  let b = LOAN;
  let interest = 0;
  while (b > 1e-6 && path.length <= N + 1) {
    const i = b * RATE;
    interest += i;
    b = Math.max(0, b + i - (PAYMENT + extra));
    path.push(b);
  }
  return { path, months: path.length - 1, interest };
}
const RUNS = new Map<number, ReturnType<typeof run>>();
for (let e = 0; e <= MAX_EXTRA; e += STEP) RUNS.set(e, run(e));
const BASE = RUNS.get(0)!;
const Q = RUNS.get(Q_EXTRA)!;

const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
const ym = (m: number) => `${Math.floor(m / 12)} yr ${m % 12} mo`;

// Geometry (viewBox 320 × 180): months 0..360 across, owed $0..$200k up.
const L = 40;
const R = 308;
const TOP = 12;
const BOT = 150;
const px = (m: number) => L + (m / N) * (R - L);
const py = (b: number) => BOT - (b / LOAN) * (BOT - TOP);
const pts = (path: number[]) => path.map((b, m) => `${px(m).toFixed(1)},${py(b).toFixed(1)}`).join(" ");
const BASE_PTS = pts(BASE.path);

export default function ExtraHundredAMonth({ slug }: { slug: string }) {
  const [extra, setExtra] = useState(0);
  const [seen, setSeen] = useState<number[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A ${usd(LOAN)} loan at 6% takes 30 years at $${PAYMENT.toFixed(2)} a month. You add $${Q_EXTRA} to every payment. About how long does it take now?`,
        options: ["about 28 years", `about ${(Q.months / 12).toFixed(1)} years`, "about 20 years"],
        answer: 1,
      }}
      exploreHint={`Add $${Q_EXTRA} a month and see where the line hits zero.`}
      minInteractions={MILESTONES.length}
      reveal={() => {
        const others = seen.filter((e) => e !== 0 && e !== Q_EXTRA).sort((a, b) => a - b);
        return (
          <>
            <p>
              With ${Q_EXTRA} more a month, the line hit zero at month <strong>{Q.months}</strong>: {ym(Q.months)}, not 30 years.
              Interest fell from {usd(BASE.interest)} to {usd(Q.interest)}, saving <strong>{usd(BASE.interest - Q.interest)}</strong>.
              {others.length > 0 && ` You also tried ${others.map((e) => `+$${e} (${ym(RUNS.get(e)!.months)})`).join(", ")}.`}
            </p>
            <p>
              The extra goes straight to what is still owed. Next month&apos;s interest, 0.5% of that, is smaller, so more of the
              regular payment repays the loan too. The saving feeds itself every month.
            </p>
            <p className="muted">A model: a fixed, illustrative 6%, no prepayment fee. Arithmetic, not advice on whether to prepay.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const cur = RUNS.get(extra)!;
            const set = (v: number) => {
              setExtra(v);
              setSeen((sn) => (sn.includes(v) ? sn : [...sn, v]));
              if (v === Q_EXTRA) reach("hundred-extra");
            };
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: fixed 6%, no prepayment fee</p>
                <svg
                  viewBox="0 0 320 180"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Loan paid off over 30 years" : `Paid off in ${ym(cur.months)}`}
                >
                  {[0, 100000, 200000].map((v) => (
                    <text key={v} x={L - 4} y={py(v) + 4} textAnchor="end" className={s.axis}>
                      {v === 0 ? "$0" : `$${v / 1000}k`}
                    </text>
                  ))}
                  <text x={R} y={TOP + 4} textAnchor="end" className={s.axis}>
                    still owed
                  </text>
                  {!locked && extra > 0 && (
                    <text x={R} y={TOP + 18} textAnchor="end" className={s.axis}>
                      dashed = no extra
                    </text>
                  )}
                  <line x1={L} y1={TOP} x2={L} y2={BOT} stroke="var(--line)" />
                  <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
                  {[0, 10, 20, 30].map((y) => (
                    <text key={y} x={px(y * 12)} y={BOT + 14} textAnchor={y === 0 ? "start" : y === 30 ? "end" : "middle"} className={s.axis}>
                      {y === 30 ? "30 yr" : y}
                    </text>
                  ))}
                  <polyline points={BASE_PTS} className={!locked && extra > 0 ? s.ghost : s.line} />
                  {!locked && extra > 0 && <polyline points={pts(cur.path)} className={s.line2} />}
                  {!locked && (
                    <>
                      <circle cx={px(cur.months)} cy={py(0)} r={5} className={s.dot} />
                      <text x={px(cur.months)} y={BOT - 10} textAnchor="end" className={s.value}>
                        zero at {ym(cur.months)}
                      </text>
                    </>
                  )}
                </svg>

                <Slider
                  label="Extra each month"
                  value={extra}
                  min={0}
                  max={MAX_EXTRA}
                  step={STEP}
                  disabled={locked}
                  format={(v) => `+$${v}`}
                  onChange={set}
                />
                <Row>
                  <Readout label="Paid off in" value={locked ? "?" : ym(cur.months)} />
                  <Readout label="Interest" value={locked ? "?" : usd(cur.interest)} />
                  <Readout label="Saved" value={locked ? "?" : usd(BASE.interest - cur.interest)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
