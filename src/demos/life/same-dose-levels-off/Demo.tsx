"use client";

// Same dose levels off (brief: company/domains/briefs/life.ecology-body.md #5, check E5).
// A made-up substance: 100 units added every I hours (6, 12 or 3) for 10 days; the body clears half of whatever
// is there every 6 hours (continuous decay, level x 0.5^(t / 6 h)). The level just after addition n is
// L(n) = L(n - 1) x f + 100 with f = 0.5^(I / 6), so it levels off at 100 / (1 - f): 200 (6 h), 133.3 (12 h),
// 341.4 (3 h). Deterministic. No real medicine or dose.
// Milestones: "i6" (every 6 h drawn, the question's case) and "other" (12 h or 3 h drawn). Drawn curves stay as
// pale traces with their end labels; when the reveal opens the 6 h curve is made current again, so the
// "additions 1 to 5" readout it quotes is on the stage.

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const DOSE = 100;
const HALF_H = 6;
const DAYS = 10;
const HOURS = DAYS * 24;
const INTERVALS = [6, 12, 3] as const;
type Interval = (typeof INTERVALS)[number];
const MILESTONES = ["i6", "other"] as const;

export interface Course {
  interval: number;
  peaks: number[]; // level just after each addition
  pts: [number, number][]; // [hour, level] sawtooth
}

export function course(interval: number): Course {
  const f = Math.pow(0.5, interval / HALF_H);
  const n = Math.round(HOURS / interval);
  const peaks: number[] = [];
  const pts: [number, number][] = [[0, 0]];
  let x = 0;
  for (let i = 0; i < n; i++) {
    x = x * (i ? f : 1) + DOSE;
    peaks.push(x);
    const t0 = i * interval;
    pts.push([t0, x]);
    const steps = Math.max(2, Math.round(interval / 0.75));
    for (let k = 1; k <= steps; k++) {
      const t = t0 + (interval * k) / steps;
      if (t > HOURS) break;
      pts.push([t, x * Math.pow(0.5, (t - t0) / HALF_H)]);
    }
  }
  return { interval, peaks, pts };
}

const COURSES: Record<Interval, Course> = { 6: course(6), 12: course(12), 3: course(3) };
const r0 = (v: number) => Math.round(v);
const last = (c: Course) => r0(c.peaks[c.peaks.length - 1]);

// Chart geometry.
const W = 356, H = 196;
const X0 = 34, X1 = 286, Y0 = 10, Y1 = 172;
const MAXL = 400;
const X = (h: number) => X0 + (h / HOURS) * (X1 - X0);
const Y = (v: number) => Y1 - (v / MAXL) * (Y1 - Y0);
const path = (pts: [number, number][]) => pts.map(([t, v], i) => `${i ? "L" : "M"}${X(t).toFixed(1)},${Y(v).toFixed(1)}`).join(" ");

function Stage({ locked, atReveal, cur, drawn, onPick }: { locked: boolean; atReveal: boolean; cur: Interval | null; drawn: Interval[]; onPick: (i: Interval) => void }) {
  const c = cur === null ? null : COURSES[cur];
  // End labels for every drawn curve, nudged apart.
  const labels = drawn
    .map((i) => ({ i, y: Y(last(COURSES[i])) }))
    .sort((a, b) => a.y - b.y);
  for (let k = 1; k < labels.length; k++) if (labels[k].y - labels[k - 1].y < 13) labels[k].y = labels[k - 1].y + 13;

  return (
    <div className={s.wrap}>
      {!atReveal && <p className={s.msg}>
        {locked || cur === null || cur === 6
          ? "A made-up substance: 100 units are added every 6 hours, and the body clears half of whatever is there every 6 hours."
          : `Now 100 units every ${cur} hours; the body still clears half of whatever is there every 6 hours.`}
      </p>}
      <div className={s.readouts}>
        <p className={s.readout} data-testid="last-level">
          just after the last addition: {c ? last(c) : "?"}
        </p>
        <p className={s.readout2} data-testid="first-five">
          {c ? `every ${c.interval} h, first 5: ${c.peaks.slice(0, 5).map(r0).join(", ")}` : "pick how often to add"}
        </p>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img"
        aria-label={c ? `Every ${c.interval} hours: the level rises then levels off near ${last(c)} units` : "Empty chart: units 0 to 400 over 10 days"}>
        {[0, 100, 200, 300, 400].map((v) => (
          <g key={v}>
            <line x1={X0} x2={X1} y1={Y(v)} y2={Y(v)} className={s.grid} />
            <text x={X0 - 4} y={Y(v) + 4} textAnchor="end" className={s.tick}>{v}</text>
          </g>
        ))}
        {[0, 2, 4, 6, 8, 10].map((d) => (
          <text key={d} x={X(d * 24)} y={H - 6} textAnchor="middle" className={s.tick}>{d === 10 ? "10 days" : d}</text>
        ))}
        {drawn.filter((i) => i !== cur).map((i) => (
          <path key={i} d={path(COURSES[i].pts)} className={s.trace} />
        ))}
        {c && <path d={path(c.pts)} className={s.curve} />}
        {!locked && labels.map(({ i, y }) => (
          <text key={i} x={X1 + 4} y={y + 4} className={i === cur ? s.endCur : s.endTrace}>
            {i} h: {last(COURSES[i])}
          </text>
        ))}
      </svg>
      <Row>
        {INTERVALS.map((i) => (
          <Control key={i} className={cur === i ? "active" : ""} disabled={locked || cur === i} onClick={() => onPick(i)}>
            Every {i} h
          </Control>
        ))}
      </Row>
    </div>
  );
}

export default function SameDoseLevelsOff({ slug }: { slug: string }) {
  const [cur, setCur] = useState<Interval | null>(null);
  const [drawn, setDrawn] = useState<Interval[]>([]);
  const six = COURSES[6];
  const other: Interval | null = drawn.includes(3) ? 3 : drawn.includes(12) ? 12 : null;
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "After 10 days (40 additions), how much is there just after an addition?",
        options: ["About 200", "About 2,000", "About 4,000"],
        answer: 0,
      }}
      exploreHint="Draw every 6 h, then try adding more or less often."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Every 6 hours the level went {six.peaks.slice(0, 5).map(r0).join(", ")}, then stayed at {last(six)}. Clearing
            half removes more when there is more: at {last(six)}, half is {last(six) / 2}, exactly one addition.
          </p>
          <p>
            In and out balance, so the level stops rising, about a day in.
            {other !== null &&
              ` Adding ${other === 3 ? "twice as often" : "half as often"} settled at ${last(COURSES[other])}: ${other === 3 ? "higher" : "lower"}, but it still levelled off.`}
          </p>
          <p>A made-up substance; this is not about any real medicine or dose.</p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <RevealSync atReveal={phase === "reveal"} onOpen={() => setCur(6)}>
              <Stage
                locked={locked}
                atReveal={phase === "reveal"}
                cur={cur}
                drawn={drawn}
                onPick={(i) => {
                  setCur(i);
                  setDrawn((d) => (d.includes(i) ? d : [...d, i]));
                  reach(i === 6 ? "i6" : "other");
                }}
              />
            </RevealSync>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

/** When the reveal opens, make the question's case (every 6 h) the current curve again. */
function RevealSync({ atReveal, onOpen, children }: { atReveal: boolean; onOpen: () => void; children: ReactNode }) {
  const open = useRef(onOpen);
  open.current = onOpen;
  useEffect(() => {
    if (atReveal) open.current();
  }, [atReveal]);
  return <>{children}</>;
}
