"use client";

// Toy model of reporting delay. Infections double every 3 days, steadily. Every infected person
// is counted (reported) exactly `lag` days after infection. Today's report is fixed at 100, so
// the reported curve is 100 x 2^(t/3) whatever the lag, and the infection curve is the same
// curve shifted `lag` days earlier: infected today = 100 x 2^(lag/3). Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const DOUBLING = 3;
const LAG_Q = 9;
const REPORTED = 100;
const MAX_LAG = 12;
const T0 = -21; // first day drawn
const YMAX = 1700;
const W = 300, H = 190, PADL = 34, PADB = 18, PADT = 8;
const MILESTONES = ["lag-9", "other-lag"] as const;

const reported = (t: number) => REPORTED * 2 ** (t / DOUBLING);
const infected = (t: number, lag: number) => REPORTED * 2 ** ((t + lag) / DOUBLING);
const mult = (lag: number) => 2 ** (lag / DOUBLING);
const fmt = (x: number) => Math.round(x).toLocaleString("en-US");
const ANSWER = REPORTED * mult(LAG_Q); // 800
const LINEAR = REPORTED * (LAG_Q / DOUBLING); // 300: "3 doublings = 3 times"

const X = (t: number) => PADL + ((t - T0) / -T0) * (W - PADL - 6);
const Y = (v: number) => PADT + (1 - Math.min(v, YMAX) / YMAX) * (H - PADT - PADB);
const path = (f: (t: number) => number) => {
  const pts: string[] = [];
  for (let t = T0; t <= 0.0001; t += 0.25) {
    if (f(t) > YMAX) continue;
    pts.push(`${pts.length ? "L" : "M"}${X(t).toFixed(1)},${Y(f(t)).toFixed(1)}`);
  }
  return pts.join(" ");
};

function Stage({ locked, lag, setLag }: { locked: boolean; lag: number; setLag: (v: number) => void }) {
  const today = infected(0, lag);
  const m = mult(lag);
  const msg = locked
    ? `Make a prediction to start. Toy: steady doubling every ${DOUBLING} days, fixed reporting delay.`
    : lag === 0
      ? `No delay: today's report of ${REPORTED} is today's infections.`
      : `Delay ${lag} days: infected today about ${fmt(today)}, ${+m.toFixed(1)} times the ${REPORTED} reported.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {[0, 500, 1000, 1500].map((v) => (
          <g key={v}>
            <line x1={PADL} x2={W - 6} y1={Y(v)} y2={Y(v)} className={s.grid} />
            <text x={PADL - 4} y={Y(v) + 3} className={s.tick} textAnchor="end">{v === 0 ? "0" : v.toLocaleString("en-US")}</text>
          </g>
        ))}
        {[-21, -14, -7, 0].map((t) => (
          <text key={t} x={t === 0 ? X(t) + 4 : X(t)} y={H - 4} className={s.tick} textAnchor={t === 0 ? "end" : "middle"}>{t === 0 ? "today" : `${t} d`}</text>
        ))}
        <path d={path(reported)} className={s.rep} />
        {!locked && (
          <>
            <path d={path((t) => infected(t, lag))} className={s.inf} />
            {lag > 0 && (
              <>
                {/* the delay: infected on day -lag, counted today */}
                <line x1={X(-lag)} x2={X(0)} y1={Y(REPORTED)} y2={Y(REPORTED)} className={s.lagLine} />
                <circle cx={X(-lag)} cy={Y(REPORTED)} r={3} className={s.infDot} />
                <line x1={X(0)} x2={X(0)} y1={Y(REPORTED)} y2={Y(today)} className={s.gap} />
                <circle cx={X(0)} cy={Y(today)} r={4} className={s.infDot} />
              </>
            )}
          </>
        )}
        <circle cx={X(0)} cy={Y(REPORTED)} r={4} className={s.repDot} />
      </svg>

      <div className={s.legend} aria-hidden>
        <span><i className={s.repKey} />reported</span>
        {!locked && <span><i className={s.infKey} />actually infected</span>}
      </div>

      <p className={s.msg} aria-live="polite">{msg}</p>

      <Row>
        {[LAG_Q, 3].map((v) => (
          <Control key={v} className={lag === v ? "active" : ""} aria-pressed={lag === v} disabled={locked || lag === v} onClick={() => setLag(v)}>
            {v}-day delay
          </Control>
        ))}
      </Row>
      <Slider label="Reporting delay" value={lag} min={0} max={MAX_LAG} disabled={locked} format={(v) => `${v} days`} onChange={setLag} />
    </div>
  );
}

export default function StaleCaseCounts({ slug }: { slug: string }) {
  const [lag, setLagState] = useState(0);
  const [others, setOthers] = useState<number[]>([]);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your town's health office tracks a made-up outbreak. Cases double every ${DOUBLING} days, and people are counted ${LAG_Q} days after they were infected. Today's report says ${REPORTED}. About how many were infected today?`,
        options: [`About ${REPORTED}`, `About ${fmt(LINEAR)}`, `About ${fmt(ANSWER)}`],
        answer: 2,
      }}
      exploreHint={`Set a ${LAG_Q}-day delay and compare the two curves at today. Then try another delay.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The {REPORTED} people reported today were infected {LAG_Q} days ago. {LAG_Q} days is {LAG_Q / DOUBLING} doublings, so the
            infections have kept multiplying since: {REPORTED} &times; 2 &times; 2 &times; 2 = <strong>{fmt(ANSWER)}</strong> infected
            today.
          </p>
          <p>
            {others.length
              ? `You also tried ${others.map((v) => `${v} days (about ${fmt(infected(0, v))})`).join(", ")}. `
              : ""}
            On a growing curve, every extra day of delay hides more of the present; on a flat curve it would hide almost nothing.
          </p>
          <p className="muted">Toy model: a made-up outbreak, steady doubling, the same delay for everyone. Real delays vary.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              lag={lag}
              setLag={(v) => {
                setLagState(v);
                if (v === LAG_Q) reach("lag-9");
                else if (v > 0) {
                  reach("other-lag");
                  setOthers((o) => (o.includes(v) ? o : [...o, v].slice(-3)));
                }
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
