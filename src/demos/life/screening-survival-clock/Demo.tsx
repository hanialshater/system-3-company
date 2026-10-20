"use client";

// Lead-time bias. 14 people with a made-up illness; time from diagnosis at symptoms to death is
// 1.25, 1.75, ..., 7.75 years. A test moves each diagnosis earlier by the lead L; death dates do not move.
// "Alive 5 years after diagnosis" means death more than 5 years after the diagnosis dot: T + L > 5.
// L = 0: 6 of 14; 0.5: 7; 1: 8; 1.5: 9; 2: 10; 2.5: 11; 3: 12. Each row: diagnosis dot, a 5-year bar from
// it, a death cross; the row turns solid when the death is past the bar's end. Key state: test on, and the
// question's 3-year lead (the slider starts at 2 so the QA path ends there). Deterministic.

import { useState } from "react";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const N = 14;
const T = Array.from({ length: N }, (_, i) => 1.25 + 0.5 * i); // years from symptoms to death
const SPAN = 5;
const QLEAD = 3;
const LEAD = { min: 0.5, max: 3, step: 0.5, start: 2 };
const MILESTONES = ["test-on", "lead-3"] as const;
const alive = (lead: number) => T.filter((t) => t + lead > SPAN).length;
const pct = (k: number) => `${Math.round((k / N) * 100)}%`;
const share = (k: number) => `${k} of ${N} (${pct(k)})`;
const BASE = alive(0); // 6

const W = 340, H = 186;
const XA = -3.25, XB = 8.25;
const X0 = 10, X1 = 330;
const X = (t: number) => X0 + ((t - XA) / (XB - XA)) * (X1 - X0);
const ROW0 = 12, DY = 11;

function Stage({ locked, interact, on, setOn, lead, setLead, saw3, setSaw3 }: {
  locked: boolean;
  interact: () => void;
  on: boolean;
  setOn: (v: boolean) => void;
  lead: number;
  setLead: (v: number) => void;
  saw3: boolean;
  setSaw3: (v: boolean) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const L = on ? lead : 0;
  const k = alive(L);
  const check = (nextOn: boolean, nextLead: number) => {
    if (nextOn) reach("test-on");
    if (nextOn && nextLead === QLEAD) {
      setSaw3(true);
      reach("lead-3");
    }
  };

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "14 people with a made-up illness. It is found when symptoms start, and each person dies 1 to 8 years later."
          : "Dot: diagnosis. Bar: the 5 years after it. ✕: death."}
      </p>
      <Row>
        <Readout label="Alive 5 years after diagnosis" value={share(k)} />
      </Row>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img"
        aria-label={`${k} of ${N} alive 5 years after diagnosis; deaths unchanged`}>
        <line x1={X(0)} x2={X(0)} y1={ROW0 - 8} y2={ROW0 + (N - 1) * DY + 6} className={s.zero} />
        {T.map((t, i) => {
          const y = ROW0 + i * DY;
          const d = -L;
          const ok = t + L > SPAN;
          return (
            <g key={i}>
              <line x1={X(d)} x2={X(d + SPAN)} y1={y} y2={y} className={ok ? s.spanOk : s.span} />
              <line x1={X(d + SPAN)} x2={X(d + SPAN)} y1={y - 3} y2={y + 3} className={ok ? s.spanOk : s.span} />
              {L > 0 && <circle cx={X(0)} cy={y} r={2.4} className={s.ghost} />}
              <circle cx={X(d)} cy={y} r={3} className={s.dx} />
              <g className={ok ? s.deathOk : s.death}>
                <line x1={X(t) - 3} x2={X(t) + 3} y1={y - 3} y2={y + 3} />
                <line x1={X(t) - 3} x2={X(t) + 3} y1={y + 3} y2={y - 3} />
              </g>
            </g>
          );
        })}
        {[-3, 0, 2, 4, 6, 8].map((t) => (
          <text key={t} x={X(t)} y={H - 18} textAnchor="middle" className={s.tick}>{t}</text>
        ))}
        <text x={X(0)} y={H - 5} textAnchor="middle" className={s.tick}>years from symptoms</text>
        {saw3 && (
          <text x={X1} y={H - 5} textAnchor="end" className={s.trace}>{`${QLEAD} yr earlier: ${alive(QLEAD)} of ${N}`}</text>
        )}
      </svg>
      <Row>
        <Control className={on ? "active" : ""} disabled={locked} aria-pressed={on}
          onClick={() => {
            setOn(!on);
            check(!on, lead);
          }}>
          Test: {on ? "on" : "off"}
        </Control>
        <Slider label="Found earlier by" value={lead} min={LEAD.min} max={LEAD.max} step={LEAD.step} disabled={locked || !on}
          format={(v) => `${v} yr`}
          onChange={(v) => {
            setLead(v);
            check(on, v);
          }} />
      </Row>
    </div>
  );
}

export default function ScreeningSurvivalClock({ slug }: { slug: string }) {
  const [on, setOn] = useState(false);
  const [lead, setLead] = useState(LEAD.start);
  const [saw3, setSaw3] = useState(false);
  const k3 = alive(QLEAD);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your clinic follows 14 people with a made-up illness. A new test finds it ${QLEAD} years earlier, but treatment changes nothing: every death stays on the same day. What share is alive 5 years after diagnosis?`,
        options: ["43%", "64%", "86%"],
        answer: 2,
      }}
      exploreHint={`Switch the test on and set it to ${QLEAD} years earlier. Watch the crosses.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With the test {QLEAD} years earlier, {k3} of {N} were alive 5 years after diagnosis, up from {BASE}, yet every
            death cross stayed put. Only the start of the clock moved.
          </p>
          <p>
            Finding an illness earlier raises survival counted from diagnosis even when nobody lives longer: lead time. To
            judge an earlier test, compare deaths in whole groups.
          </p>
          <p className="muted">This toy makes no claim about any real test.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage locked={locked} interact={interact} on={on} setOn={setOn} lead={lead} setLead={setLead} saw3={saw3} setSaw3={setSaw3} />
      )}
    </Lesson>
  );
}
