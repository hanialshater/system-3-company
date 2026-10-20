"use client";

// Case-fatality lag. Made-up outbreak: daily cases 10 x 2^(d/5) for days 0-60, then halving every 5 days
// to day 120, none after. Exactly 2% of each day's cases die, always 15 days after being counted; every case
// is counted. The day slider (and day presets) move "today"; the chart shows cases (bars) and deaths x50
// (dots) up to today, and the readout is deaths so far / cases so far. While cases double every 5 days the
// ratio tends to 2% x 2^-3 = 0.25%. The day-45 value stays on the chart as a trace. Key state: day >= 120.
// Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const DOUBLE = 5;
const PEAK_DAY = 60;
const LAST_CASE = 120;
const END = 135;
const LAG = 15;
const CFR = 0.02;
const QDAY = 45;
const LATE = 120;
const DEATH_SCALE = 50;
const MILESTONES = ["late"] as const;

const cases = (d: number) =>
  d < 0 || d > LAST_CASE ? 0 : d <= PEAK_DAY ? 10 * 2 ** (d / DOUBLE) : 10 * 2 ** (PEAK_DAY / DOUBLE) * 2 ** (-(d - PEAK_DAY) / DOUBLE);
const deaths = (d: number) => CFR * cases(d - LAG);
const CUM_C: number[] = [];
const CUM_D: number[] = [];
for (let d = 0, c = 0, k = 0; d <= END; d++) {
  c += cases(d);
  k += deaths(d);
  CUM_C.push(c);
  CUM_D.push(k);
}
const oneIn = (d: number) => (CUM_D[d] > 0 ? Math.round(CUM_C[d] / CUM_D[d]) : null);
const ratioText = (d: number) => (oneIn(d) === null ? "no deaths yet" : `1 in ${oneIn(d)}`);
const TRUE_ONE_IN = Math.round(1 / CFR); // 50
const FEWER = 2 ** (LAG / DOUBLE); // 8

const W = 340, H = 186;
const X0 = 8, X1 = 332, Y0 = 26, Y1 = 166;
const X = (d: number) => X0 + (d / END) * (X1 - X0);
const BW = ((X1 - X0) / (END + 1)) * 0.8;

function Stage({ locked, interact, day, setDay, setLateDay }: {
  locked: boolean;
  interact: () => void;
  day: number;
  setDay: (v: number) => void;
  setLateDay: (v: number) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const shown = locked ? QDAY : day;
  let ymax = 100;
  for (let d = 0; d <= shown; d++) ymax = Math.max(ymax, cases(d));
  const Y = (v: number) => Y1 - (v / ymax) * (Y1 - Y0);
  const go = (v: number) => {
    setDay(v);
    if (v >= LATE) {
      setLateDay(v);
      reach("late");
    }
  };
  const dDot = deaths(shown) * DEATH_SCALE;

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Made-up outbreak: cases double every 5 days. Exactly 2 in 100 cases die, always 15 days after being counted."
          : `Bars: new cases each day. Dots: deaths each day, drawn ×${DEATH_SCALE}.`}
      </p>
      <Row>
        <Readout label="Deaths so far ÷ cases so far" value={locked ? "?" : ratioText(day)} />
      </Row>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img"
        aria-label={locked ? "Cases each day up to day 45" : `Day ${day}: deaths so far divided by cases so far is ${ratioText(day)}`}>
        <line x1={X0} x2={X1} y1={Y1} y2={Y1} className={s.axis} />
        <text x={X0} y={Y0 - 8} className={s.tick}>{`top: ${Math.round(ymax).toLocaleString("en-US")} a day`}</text>
        {[0, 30, 60, 90, 120].map((d) => (
          <text key={d} x={X(d) + BW / 2} y={H - 6} textAnchor={d === 0 ? "start" : "middle"} className={s.tick}>{d === 0 ? "day 0" : d}</text>
        ))}
        {Array.from({ length: shown + 1 }, (_, d) => {
          const h = Y1 - Y(cases(d));
          return h > 0 ? <rect key={d} x={X(d)} y={Y1 - h} width={BW} height={h} className={s.bar} /> : null;
        })}
        {!locked &&
          Array.from({ length: shown + 1 }, (_, d) =>
            deaths(d) > 0 ? <circle key={`k${d}`} cx={X(d) + BW / 2} cy={Y(deaths(d) * DEATH_SCALE)} r={1.7} className={s.death} /> : null,
          )}
        {!locked && (
          <>
            {/* today's deaths come from the cases 15 days earlier */}
            {dDot > 0 && (
              <g>
                <line x1={X(shown - LAG) + BW / 2} x2={X(shown) + BW / 2} y1={Y(dDot)} y2={Y(dDot)} className={s.lag} />
                <circle cx={X(shown - LAG) + BW / 2} cy={Y(dDot)} r={2.6} className={s.from} />
                <circle cx={X(shown) + BW / 2} cy={Y(dDot)} r={3} className={s.today} />
                <text x={X(shown - LAG / 2) + BW / 2} y={Y(dDot) - 5} textAnchor="middle" className={s.lagText}>{LAG} days</text>
              </g>
            )}
            <line x1={X(QDAY) + BW / 2} x2={X(QDAY) + BW / 2} y1={Y0 - 2} y2={Y1} className={s.mark} />
            <text x={X(QDAY) + BW / 2 + (day < QDAY + 30 ? -3 : 3)} y={Y0 + 6} textAnchor={day < QDAY + 30 ? "end" : "start"} className={s.markText}>
              {`day ${QDAY}: ${ratioText(QDAY)}`}
            </text>
          </>
        )}
      </svg>
      <Row>
        {[QDAY, 90, END].map((d) => (
          <Control key={d} className={day === d ? "active" : ""} disabled={locked || day === d} onClick={() => go(d)}>
            Day {d}
          </Control>
        ))}
      </Row>
      <Row>
        <Slider label="Day" value={day} min={0} max={END} step={5} disabled={locked} onChange={go} />
      </Row>
    </div>
  );
}

export default function EarlyFatalityCount({ slug }: { slug: string }) {
  const [day, setDay] = useState(QDAY);
  const [lateDay, setLateDay] = useState(END);
  const end = day >= LATE ? day : lateDay;
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You follow a new outbreak's daily report. On day ${QDAY}, with cases still rising, you divide deaths so far by cases so far. What do you get?`,
        options: ["About 1 in 50", "About 1 in 100", "About 1 in 400"],
        answer: 2,
      }}
      exploreHint={`Move past day ${LATE}, after the last case, and watch the readout.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            On day {QDAY} the readout said {ratioText(QDAY)}, though 1 in {TRUE_ONE_IN} cases die. Each day&apos;s deaths
            come from cases counted {LAG} days earlier, when there were {FEWER} times fewer (three doublings).
          </p>
          <p>
            Once cases fell, the ratio climbed: by day {end} it was {ratioText(end)}. While cases grow, deaths so far ÷
            cases so far runs low.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} day={day} setDay={setDay} setLateDay={setLateDay} />}
    </Lesson>
  );
}
