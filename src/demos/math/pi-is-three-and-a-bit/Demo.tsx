"use client";

// Pi is three and a bit. A 1 m wheel stands on a ruler marked in metres (one wheel-width each).
// Step chips roll it a quarter turn at a time (distance = turns × π × diameter, the rim laid on the
// ground); a red dot on the rim starts at the ground and comes back to it after one turn. At one turn,
// three 1 m bars lie under the painted trail with 0.14 m left over. A last chip rolls a ½ m wheel one
// turn: 1.57 m, three of its own widths and a bit. Key states: one full turn of each wheel.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const BIG = 1; // metres across
const SMALL = 0.5;
const QUARTERS = [0.25, 0.5, 0.75, 1];
const STEPS = QUARTERS.length + 1;
const MILESTONES = ["one-turn", "small-one-turn"] as const;
const dist = (d: number, turns: number) => turns * Math.PI * d;
const m2 = (v: number) => v.toFixed(2);
const WHOLE = Math.floor(Math.PI); // 3 widths
const OVER = Math.PI - WHOLE;
const FRAC = ["", "¼", "½", "¾"];

const PX = 90; // px per metre
const X0 = 20;
const G = 128; // ground y
const W = X0 + Math.ceil(Math.PI) * PX + 30;
const H = G + 70;

export default function PiIsThreeAndABit({ slug }: { slug: string }) {
  const [step, setStep] = useState(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A wheel ${BIG} metre across rolls one full turn. How far does it go?`,
        options: ["2 m", `about ${m2(dist(BIG, 1))} m`, "4 m"],
        answer: 1,
      }}
      exploreHint="Roll the wheel a quarter turn at a time, then try the small wheel."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            One full turn of the {BIG} m wheel rolled {m2(dist(BIG, 1))} m: {WHOLE} wheel-widths along the ground and{" "}
            {m2(OVER)} m to spare. The ½ m wheel rolled {m2(dist(SMALL, 1))} m, again {m2(dist(SMALL, 1) / SMALL)} of its own
            widths.
          </p>
          <p>
            Rolling lays the whole rim on the ground, so the distance is the rim&apos;s length. For every circle the rim is the
            same {m2(Math.PI)}… times the width across. That number is called π (pi): circumference = π × diameter.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              step={step}
              onStep={() => {
                const next = step + 1;
                setStep(next);
                if (next >= QUARTERS.length) reach("one-turn");
                if (next === STEPS) reach("small-one-turn");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Wheel({ d, turns, cls }: { d: number; turns: number; cls: string }) {
  const r = (d * PX) / 2;
  const cx = X0 + dist(d, turns) * PX;
  const cy = G - r;
  const th = turns * 2 * Math.PI;
  const dot = [cx - r * Math.sin(th), cy + r * Math.cos(th)];
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} className={cls} />
      {[0, 1, 2].map((k) => {
        const a = th + (k * Math.PI) / 3;
        return (
          <line key={k} x1={cx - r * Math.sin(a)} y1={cy + r * Math.cos(a)} x2={cx + r * Math.sin(a)} y2={cy - r * Math.cos(a)} className={s.spoke} />
        );
      })}
      <circle cx={dot[0]} cy={dot[1]} r={4} className={s.dot} />
    </g>
  );
}

function Bars({ d, y, h }: { d: number; y: number; h: number }) {
  return (
    <g>
      {Array.from({ length: WHOLE }, (_, k) => (
        <rect key={k} x={X0 + k * d * PX} y={y} width={d * PX} height={h} className={k % 2 ? s.barB : s.barA} />
      ))}
      <rect x={X0 + WHOLE * d * PX} y={y} width={OVER * d * PX} height={h} className={s.over} />
    </g>
  );
}

function Stage({ locked, step, onStep }: { locked: boolean; step: number; onStep: () => void }) {
  const bigTurns = QUARTERS[Math.min(step, QUARTERS.length) - 1] ?? 0;
  const small = step === STEPS;
  const bigFull = bigTurns === 1;
  const d = small ? SMALL : BIG;
  const rolled = small ? dist(SMALL, 1) : dist(BIG, bigTurns);
  const caption = locked
    ? "Make a prediction to start."
    : step === 0
      ? `The wheel is ${BIG} m across. Each ruler mark is ${BIG} m: one wheel-width.`
      : small
        ? `The ½ m wheel: one turn is ${m2(dist(SMALL, 1))} m, again ${WHOLE} of its widths and a bit.`
        : bigFull
          ? `One turn: ${m2(dist(BIG, 1))} m. ${WHOLE} wheel-widths fit, plus ${m2(OVER)} m over.`
          : `${FRAC[step]} turn: the rim has laid ${m2(rolled)} m on the ground.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        <line x1={X0 - 10} y1={G} x2={W - 6} y2={G} className={s.ground} />
        {!locked && bigTurns > 0 && <line x1={X0} y1={G} x2={X0 + dist(BIG, bigTurns) * PX} y2={G} className={s.trail} />}
        {!locked && bigFull && <Bars d={BIG} y={G + 4} h={10} />}
        {!locked && small && <line x1={X0} y1={G + 22} x2={X0 + dist(SMALL, 1) * PX} y2={G + 22} className={s.trailS} />}
        {!locked && small && <Bars d={SMALL} y={G + 26} h={7} />}
        {Array.from({ length: Math.ceil(Math.PI) + 1 }, (_, k) => (
          <g key={k}>
            <line x1={X0 + k * PX} y1={G} x2={X0 + k * PX} y2={G + 44} className={s.tick} />
            <text x={X0 + k * PX} y={G + 58} className={s.tickLab}>
              {k} m
            </text>
          </g>
        ))}
        <Wheel d={BIG} turns={locked ? 0 : bigTurns} cls={s.wheel} />
        {!locked && small && <Wheel d={SMALL} turns={1} cls={s.wheelS} />}
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <div className={s.chips} role="group" aria-label="Roll">
        {QUARTERS.map((q, k) => (
          <Control
            key={q}
            disabled={locked || k !== step}
            className={k < step ? "active" : ""}
            aria-label={`Roll the 1 metre wheel to ${q === 1 ? "one full" : FRAC[k + 1]} turn`}
            onClick={onStep}
          >
            {q === 1 ? "1 turn" : `${FRAC[k + 1]} turn`}
          </Control>
        ))}
        <Control
          disabled={locked || step !== QUARTERS.length}
          className={small ? "active" : ""}
          aria-label="Roll a half metre wheel one full turn"
          onClick={onStep}
        >
          Now a ½ m wheel: 1 turn
        </Control>
      </div>
      <Row>
        <Readout label="Rolled" value={locked ? "?" : `${m2(rolled)} m`} />
        <Readout label="In wheel-widths" value={locked ? "?" : m2(rolled / d)} />
      </Row>
    </div>
  );
}
