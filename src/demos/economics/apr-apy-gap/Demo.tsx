"use client";

// Quoted rate vs effective rate. One chart: $100 over one year at a quoted 12%, with interest added
// in n equal steps (12%/n each). The dashed line is plain 12% ($112). Monthly ends at $112.68,
// daily at $112.75: more often helps a little, then stops mattering. Ticks on the right keep
// the year-end values the learner has tried. Key state: monthly, then daily.
// Model: one deposit, no fees, a 365-day year.

import { useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const RATE = 0.12;
const START = 100;
const FREQS = [
  { name: "Yearly", n: 1 },
  { name: "Quarterly", n: 4 },
  { name: "Monthly", n: 12 },
  { name: "Daily", n: 365 },
] as const;
const MILESTONES = ["monthly", "daily"] as const;

const endValue = (n: number) => START * (1 + RATE / n) ** n;
const effective = (n: number) => (endValue(n) / START - 1) * 100;
const MONTHLY = endValue(12);

// Plot geometry (viewBox 320 × 200): months 0..12 across, $100..$113 up.
const L = 40;
const R = 276;
const TOP = 14;
const BOT = 174;
const YLO = 100;
const YHI = 113;
const px = (t: number) => L + t * (R - L); // t in years
const py = (v: number) => BOT - ((v - YLO) / (YHI - YLO)) * (BOT - TOP);
const money = (v: number) => `$${v.toFixed(2)}`;

function stairs(n: number) {
  let d = `M${px(0)},${py(START)}`;
  let v = START;
  for (let k = 1; k <= n; k++) {
    d += ` H${px(k / n).toFixed(2)}`;
    v *= 1 + RATE / n;
    d += ` V${py(v).toFixed(2)}`;
  }
  return d;
}

function Stage({ ctx, n, setN, tried, addTried }: {
  ctx: StageContext;
  n: number;
  setN: (n: number) => void;
  tried: number[];
  addTried: (n: number) => void;
}) {
  const { locked, interact } = ctx;
  const { reach } = useMilestones(interact, MILESTONES);
  const pick = (k: number) => {
    setN(k);
    addTried(k);
    if (k === 12) reach("monthly");
    if (k === 365) reach("daily");
  };
  const end = endValue(n);

  return (
    <div className={s.wrap}>
      <p className={s.chip}>Quoted 12% a year, one deposit, no fees</p>
      <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label={locked ? "$100 over one year" : `Added ${n} times: ${money(end)} after a year`}>
        {[100, 104, 108, 112].map((v) => (
          <g key={v}>
            <line x1={L} y1={py(v)} x2={R} y2={py(v)} stroke="var(--line)" strokeDasharray="2 4" />
            <text x={L - 4} y={py(v) + 4} textAnchor="end" className={s.axis}>
              ${v}
            </text>
          </g>
        ))}
        {[0, 3, 6, 9, 12].map((m) => (
          <text key={m} x={px(m / 12)} y={BOT + 14} textAnchor={m === 0 ? "start" : "middle"} className={s.axis}>
            {m === 12 ? "12 mo" : m}
          </text>
        ))}
        <line x1={px(0)} y1={py(START)} x2={px(1)} y2={py(START * (1 + RATE))} className={s.ghost} />
        {!locked && (
          <>
            <path d={stairs(n)} className={s.line} />
            {tried.map((k) => (
              <line key={k} x1={px(1) + 4} y1={py(endValue(k))} x2={px(1) + 12} y2={py(endValue(k))} stroke="var(--muted)" strokeWidth={2} />
            ))}
            <circle cx={px(1)} cy={py(end)} r={5} className={s.dot} />
            <text x={px(1) - 8} y={py(end) - 10} textAnchor="end" className={s.value}>
              {money(end)}
            </text>
          </>
        )}
        <circle cx={px(0)} cy={py(START)} r={4} className={s.dot} />
      </svg>

      <Row>
        <Readout label="After a year" value={locked ? "?" : money(end)} />
        <Readout label="Effective rate" value={locked ? "?" : `${effective(n).toFixed(2)}%`} />
      </Row>
      <Row>
        {FREQS.map((f) => (
          <Control key={f.n} className={`${s.tile} ${n === f.n ? "active" : ""}`} disabled={locked || n === f.n} onClick={() => pick(f.n)}>
            {f.name}
          </Control>
        ))}
      </Row>
    </div>
  );
}

export default function AprApyGap({ slug }: { slug: string }) {
  const [n, setN] = useState(1);
  const [tried, setTried] = useState<number[]>([1]);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `An account quotes 12% a year, adding 1% each month. After one year, how much has $100 grown?`,
        options: ["Exactly $12", `About ${money(MONTHLY - START)}`, "About $14"],
        answer: 1,
      }}
      exploreHint="Tap Monthly, then Daily. Watch the year-end value."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Monthly, $100 grew <strong>{money(MONTHLY - START)}</strong>, to {money(MONTHLY)}: 1% twelve times, each 1%
            taken on a slightly bigger balance. The extra {Math.round((MONTHLY - START - 12) * 100)}¢ over the plain 12%
            line is interest on interest.
          </p>
          <p>
            Daily was only <strong>{money(endValue(365))}</strong>, a few cents more. Adding interest more often helps a
            little, then stops mattering. So compare accounts by the effective rate (what a year really adds), not the
            quoted one.
          </p>
          <p className="muted">One deposit, no fees, 365-day year. Names vary: APR is often the quoted rate, APY or AER the effective one.</p>
        </>
      )}
    >
      {(ctx) => <Stage ctx={ctx} n={n} setN={setN} tried={tried} addTried={(k) => setTried((t) => (t.includes(k) ? t : [...t, k]))} />}
    </Lesson>
  );
}
