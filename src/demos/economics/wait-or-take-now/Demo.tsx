"use client";

// Present value. Two bars in today's money: $1,000 now, and $1,200 in 3 years shrunk by what
// you could earn meanwhile (1,200 / (1 + r)^3). The dashed outline is the $1,200 face value.
// At 5% the later offer is worth $1,036.61 today (it wins); at 7%, $979.56 (it loses);
// the flip is at 6.27%. Key state: 5%, then a rate where the answer flips.
// Model: a sure payment, a steady rate, no tax; not advice.

import { useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const NOW = 1000;
const LATER = 1200;
const YEARS = 3;
const Q_RATE = 5;
const FLIP_SHOW = 7;
const START = 3;
const R_MAX = 12;
const MILESTONES = ["five-percent", "it-flips"] as const;

const pv = (r: number) => LATER / (1 + r / 100) ** YEARS;
const BREAK_EVEN = ((LATER / NOW) ** (1 / YEARS) - 1) * 100; // 6.27
const money = (v: number) => `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const whole = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;

// Plot geometry (viewBox 320 × 200): $0..$1,300 up.
const BOT = 170;
const TOP = 16;
const VMAX = 1300;
const py = (v: number) => BOT - (v / VMAX) * (BOT - TOP);
const BW = 80;
const X1 = 60;
const X2 = 180;

function Stage({ ctx, rate, setRate }: { ctx: StageContext; rate: number; setRate: (r: number) => void }) {
  const { locked, interact } = ctx;
  const { reach } = useMilestones(interact, MILESTONES);
  const set = (r: number) => {
    setRate(r);
    if (r === Q_RATE) reach("five-percent");
    if (pv(r) < NOW) reach("it-flips");
  };
  const v = pv(rate);
  const laterWins = v > NOW;

  return (
    <div className={s.wrap}>
      <p className={s.chip}>Model: sure payment, steady rate, no tax</p>
      <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label={locked ? "Two offers" : `At ${rate}%, $1,200 in 3 years is worth ${whole(v)} today`}>
        <line x1={30} y1={BOT} x2={290} y2={BOT} stroke="var(--line)" />
        <line x1={30} y1={py(NOW)} x2={290} y2={py(NOW)} stroke="var(--muted)" strokeDasharray="2 4" />
        <rect x={X1} y={py(NOW)} width={BW} height={BOT - py(NOW)} rx={3} className={!locked && !laterWins ? s.goodFill : s.main} />
        <text x={X1 + BW / 2} y={py(NOW) - 6} textAnchor="middle" className={s.value}>
          {whole(NOW)}
        </text>
        <text x={X1 + BW / 2} y={BOT + 14} textAnchor="middle" className={s.axis}>
          today
        </text>
        <rect x={X2} y={py(LATER)} width={BW} height={BOT - py(LATER)} className={s.ghostFill} />
        {!locked && (
          <>
            <rect x={X2} y={py(v)} width={BW} height={BOT - py(v)} rx={3} className={laterWins ? s.goodFill : s.main} />
            <text x={X2 + BW / 2} y={py(LATER) - 6} textAnchor="middle" className={s.axis}>
              {whole(LATER)} face value
            </text>
            <text x={X2 + BW / 2} y={(py(v) + BOT) / 2 + 5} textAnchor="middle" className={s.big}>
              {whole(v)}
            </text>
          </>
        )}
        <text x={X2 + BW / 2} y={BOT + 14} textAnchor="middle" className={s.axis}>
          in {YEARS} years, in today&apos;s $
        </text>
      </svg>

      <Row>
        <Slider label="You could earn" value={rate} min={0} max={R_MAX} disabled={locked} format={(r) => `${r}% a year`} onChange={set} />
        <Readout label="Worth more today" value={locked ? "?" : laterWins ? "$1,200 later" : "$1,000 now"} />
      </Row>
      <Row>
        {[Q_RATE, FLIP_SHOW].map((r) => (
          <Control key={r} className={`${s.tile} ${rate === r ? "active" : ""}`} disabled={locked || rate === r} onClick={() => set(r)}>
            {r}%
          </Control>
        ))}
      </Row>
    </div>
  );
}

export default function WaitOrTakeNow({ slug }: { slug: string }) {
  const [rate, setRate] = useState(START);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Offer: ${whole(NOW)} today or ${whole(LATER)} in ${YEARS} years. If you could earn ${Q_RATE}% a year elsewhere, which is worth more today?`,
        options: [`${whole(NOW)} today`, `${whole(LATER)} in ${YEARS} years`, "They are equal"],
        answer: pv(Q_RATE) > NOW ? 1 : 0,
      }}
      exploreHint={`Set ${Q_RATE}%. Then find a rate where the answer flips.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At {Q_RATE}%, {whole(LATER)} in {YEARS} years is worth <strong>{money(pv(Q_RATE))}</strong> today: that is what you
            would need now to grow into {whole(LATER)}. It beats {whole(NOW)}, but only by {whole(pv(Q_RATE) - NOW)}, not $200.
          </p>
          <p>
            Above about {BREAK_EVEN.toFixed(2)}% the answer flips: at {FLIP_SHOW}% the later offer is worth only{" "}
            {money(pv(FLIP_SHOW))} today. Future money is worth less today because money now could be earning. Whether later is
            better depends on the rate, not just the bigger number.
          </p>
          <p className="muted">A model: a sure payment, a steady rate, no tax. Not advice.</p>
        </>
      )}
    >
      {(ctx) => <Stage ctx={ctx} rate={rate} setRate={setRate} />}
    </Lesson>
  );
}
