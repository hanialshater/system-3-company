"use client";

// Marginal vs average cost. One chart: the average cost per widget (100/n + 2, falling) and the
// added cost of the next widget (flat at $2). A workshop pays $100 fixed plus $2 per widget.
// Key state: 50 widgets (average $4.00), then one more (total $200 → $202, average $3.96).
// Model: constant $2 per widget at every output; real costs often rise at high output.

import { useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const FIXED = 100;
const PER = 2;
const Q_N = 50;
const N_MIN = 1;
const N_MAX = 100;
const START = 48;
const MILESTONES = ["fifty", "fifty-first"] as const;

const total = (n: number) => FIXED + PER * n;
const avg = (n: number) => total(n) / n;
const added = (n: number) => total(n) - total(n - 1); // cost of the n-th widget

// Plot geometry (viewBox 320 × 200): widgets 0..100 across, $0..$14 up.
const L = 34;
const R = 308;
const TOP = 12;
const BOT = 172;
const YMAX = 14;
const px = (n: number) => L + (n / N_MAX) * (R - L);
const py = (v: number) => BOT - (Math.min(v, YMAX) / YMAX) * (BOT - TOP);
const money = (v: number) => `$${v.toFixed(2)}`;

const N_CURVE_START = Math.ceil(FIXED / (YMAX - PER)); // first n with avg on the chart
const avgPath = Array.from({ length: N_MAX - N_CURVE_START + 1 }, (_, i) => N_CURVE_START + i)
  .map((n, i) => `${i ? "L" : "M"}${px(n).toFixed(1)},${py(avg(n)).toFixed(1)}`)
  .join(" ");

function Stage({ ctx, n, setN }: { ctx: StageContext; n: number; setN: (n: number) => void }) {
  const { locked, interact } = ctx;
  const { reach, reached } = useMilestones(interact, MILESTONES);
  const set = (v: number) => {
    const k = Math.max(N_MIN, Math.min(N_MAX, v));
    setN(k);
    if (k === Q_N) reach("fifty");
    if (k === Q_N + 1 && reached("fifty")) reach("fifty-first");
  };
  const a = avg(n);

  return (
    <div className={s.wrap}>
      <p className={s.chip}>Model: $100 fixed + $2 a widget</p>
      <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label={locked ? "Cost per widget chart" : `${n} widgets: average ${money(a)}, next one adds $2`}>
        {[2, 4, 8, 12].map((v) => (
          <g key={v}>
            <line x1={L} y1={py(v)} x2={R} y2={py(v)} stroke="var(--line)" strokeDasharray="2 4" />
            <text x={L - 4} y={py(v) + 4} textAnchor="end" className={s.axis}>
              ${v}
            </text>
          </g>
        ))}
        <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
        {[0, 25, 50, 75, 100].map((k) => (
          <text key={k} x={px(k)} y={BOT + 14} textAnchor={k === 0 ? "start" : k === 100 ? "end" : "middle"} className={s.axis}>
            {k === 100 ? "100 made" : k}
          </text>
        ))}
        {!locked && (
          <>
            <path d={avgPath} className={s.line} />
            <line x1={px(0)} y1={py(PER)} x2={R} y2={py(PER)} className={s.line2} />
            <line x1={px(n)} y1={py(a)} x2={px(n)} y2={py(PER)} stroke="var(--muted)" strokeDasharray="3 3" />
            <circle cx={px(n)} cy={py(a)} r={5} className={s.dot} />
            <circle cx={px(n)} cy={py(PER)} r={5} fill="var(--good)" />
            <text x={px(n) + (n > 70 ? -8 : 8)} y={py(a) - 8} textAnchor={n > 70 ? "end" : "start"} className={s.value}>
              average {money(a)}
            </text>
            <text x={px(n) + (n > 70 ? -8 : 8)} y={py(PER) + 18} textAnchor={n > 70 ? "end" : "start"} className={s.value} fill="var(--good)">
              next one +${PER}
            </text>
          </>
        )}
      </svg>

      <Row>
        <Readout label="Total cost" value={locked ? "?" : `$${total(n)}`} />
        <Readout label="Average" value={locked ? "?" : money(a)} />
      </Row>
      <Row>
        <Slider label="Widgets made" value={n} min={N_MIN} max={N_MAX} disabled={locked} onChange={set} />
        <Control disabled={locked || n >= N_MAX} onClick={() => set(n + 1)} aria-label="Make one more widget">
          +1
        </Control>
        <Control disabled={locked || n <= N_MIN} onClick={() => set(n - 1)} aria-label="Make one fewer widget">
          −1
        </Control>
      </Row>
    </div>
  );
}

export default function WidgetMarginalCost({ slug }: { slug: string }) {
  const [n, setN] = useState(START);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your workshop pays $${FIXED} in fixed costs plus $${PER} per widget. So far you have made ${Q_N} widgets at an average cost of $${avg(Q_N)}. How much extra does widget #${Q_N + 1} add?`,
        options: [`About $${avg(Q_N)}`, `$${PER}`, `$${FIXED + PER}`],
        answer: 1,
      }}
      exploreHint={`Set ${Q_N} widgets, then make one more.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Going from {Q_N} to {Q_N + 1} widgets, the total went from <strong>${total(Q_N)}</strong> to{" "}
            <strong>${total(Q_N + 1)}</strong>: widget #{Q_N + 1} added <strong>${added(Q_N + 1)}</strong>. The average only
            slipped from {money(avg(Q_N))} to {money(avg(Q_N + 1))}.
          </p>
          <p>
            The average carries the ${FIXED} of fixed costs spread over every widget. The next widget does not bring
            new fixed costs, only its own ${PER}. So an order for one more at $3 adds $1 of profit here, even though $3
            is below the average.
          </p>
          <p className="muted">A model: $2 a widget at every output. Real extra costs often rise when a workshop gets busy.</p>
        </>
      )}
    >
      {(ctx) => <Stage ctx={ctx} n={n} setN={setN} />}
    </Lesson>
  );
}
