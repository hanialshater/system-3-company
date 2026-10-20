"use client";

// The true cost of a "$50" course. One stacked bar: the $50 fee plus the pay given up in the
// hours the course takes ($20 an hour). A switch sets the best alternative to "work" or to
// "nothing paid": the second block exists only if the paid work was really there.
// Key state: 3 hours with work as the alternative ($110), then the alternative switched off.
// Toy numbers; ignores taxes and what the course is worth to you.

import { useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const FEE = 50;
const WAGE = 20;
const Q_HOURS = 3;
const H_MIN = 1;
const H_MAX = 8;
const MILESTONES = ["three-hours-work", "no-paid-work"] as const;

const cost = (hours: number, work: boolean) => FEE + (work ? hours * WAGE : 0);
const ANSWER = cost(Q_HOURS, true); // 110

// Plot geometry (viewBox 320 × 200): one vertical bar, $0..$210.
const VMAX = cost(H_MAX, true) + 20;
const BOT = 186;
const TOP = 16;
const BX = 120;
const BW = 80;
const py = (v: number) => BOT - (v / VMAX) * (BOT - TOP);

type Mode = "work" | "none";

function Stage({ ctx, hours, setHours, mode, setMode }: {
  ctx: StageContext;
  hours: number;
  setHours: (h: number) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
}) {
  const { locked, interact } = ctx;
  const { reach } = useMilestones(interact, MILESTONES);

  const update = (h: number, m: Mode) => {
    setHours(h);
    setMode(m);
    if (h === Q_HOURS && m === "work") reach("three-hours-work");
    if (m === "none") reach("no-paid-work");
  };

  const work = mode === "work";
  const given = work ? hours * WAGE : 0;
  const total = cost(hours, work);

  return (
    <div className={s.wrap}>
      <p className={s.chip}>Toy numbers: paid work was on offer</p>
      <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label={locked ? "The $50 fee" : `Fee $50 plus $${given} given up: $${total}`}>
        <line x1={60} y1={BOT} x2={260} y2={BOT} stroke="var(--line)" />
        <rect x={BX} y={py(FEE)} width={BW} height={BOT - py(FEE)} rx={3} className={s.main} />
        <text x={BX - 8} y={(py(FEE) + BOT) / 2 + 4} textAnchor="end" className={s.value}>
          Fee ${FEE}
        </text>
        {!locked && given > 0 && (
          <>
            <rect x={BX} y={py(total)} width={BW} height={py(FEE) - py(total)} rx={3} className={s.soft} />
            <text x={BX + BW + 8} y={(py(total) + py(FEE)) / 2 + 4} className={s.value}>
              {hours} h × ${WAGE}
            </text>
          </>
        )}
        {!locked && given === 0 && <rect x={BX} y={py(cost(hours, true))} width={BW} height={py(FEE) - py(cost(hours, true))} rx={3} className={s.ghostFill} />}
        <text x={BX + BW / 2} y={py(locked ? FEE : cost(hours, true)) - 6} textAnchor="middle" className={s.big}>
          {locked ? "?" : `$${total}`}
        </text>
      </svg>

      <Row>
        <Slider label="Course hours" value={hours} min={H_MIN} max={H_MAX} disabled={locked} format={(v) => `${v} h`} onChange={(v) => update(v, mode)} />
        <Readout label="Real cost" value={locked ? "?" : `$${total}`} />
      </Row>
      <Row>
        <Control className={`${s.tile} ${work ? "active" : ""}`} disabled={locked || work} onClick={() => update(hours, "work")}>
          Else: work, ${WAGE}/h
        </Control>
        <Control className={`${s.tile} ${!work ? "active" : ""}`} disabled={locked || !work} onClick={() => update(hours, "none")}>
          Else: nothing paid
        </Control>
      </Row>
    </div>
  );
}

export default function TrueCostOfFreeHours({ slug }: { slug: string }) {
  const [hours, setHours] = useState(H_MIN);
  const [mode, setMode] = useState<Mode>("work");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You sign up for a $${FEE} course that takes ${Q_HOURS} hours. In those hours you could have been at work, earning $${WAGE} an hour. What does the course really cost you?`,
        options: [`$${FEE}`, `$${Q_HOURS * WAGE}`, `$${ANSWER}`],
        answer: 2,
      }}
      exploreHint={`Set the course to ${Q_HOURS} hours. Then switch the alternative to "nothing paid".`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At {Q_HOURS} hours the bar reached <strong>${ANSWER}</strong>: the ${FEE} fee plus the{" "}
            <strong>${Q_HOURS * WAGE}</strong> you would have earned ({Q_HOURS} × ${WAGE}). The price tag shows only the
            first block.
          </p>
          <p>
            The cost of a choice is what you give up to make it, and time is one of the things you give up. When you
            switched the alternative to nothing paid, the second block vanished: the given-up pay counts only if that work
            was really there to take.
          </p>
          <p className="muted">Toy numbers. It ignores taxes and what the course is worth to you.</p>
        </>
      )}
    >
      {(ctx) => <Stage ctx={ctx} hours={hours} setHours={setHours} mode={mode} setMode={setMode} />}
    </Lesson>
  );
}
