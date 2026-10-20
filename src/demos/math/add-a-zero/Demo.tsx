"use client";

// Add a zero. A place-value table (hundreds … hundredths) with a fixed decimal point holds 3.5 as
// digit tiles. "Stick a 0 on the end" adds a 0 tile after the last digit (it lands in the hundredths:
// 3.50, value unchanged). "× 10" slides every tile one column left (tiles animate). The value readout
// is the sum of digit × place value of the tiles drawn. Key states: the stuck-on 0 seen (value still
// 3.5), and × 10 done (3 tens, 5 ones = 35).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const DIGITS = [
  { d: 3, p: 0 },
  { d: 5, p: -1 },
];
const PLACES = [2, 1, 0, -1, -2]; // hundreds … hundredths
const NAMES: Record<number, string> = { 2: "hundreds", 1: "tens", 0: "ones", [-1]: "tenths", [-2]: "hundredths" };
const SHORT: Record<number, string> = { 2: "100s", 1: "10s", 0: "1s", [-1]: "1/10s", [-2]: "1/100s" };
const MAX_SHIFT = 2;
const MILESTONES = ["stuck-zero", "times-ten"] as const;

type Tile = { id: string; d: number; p: number };
function tiles(shift: number, zero: boolean): Tile[] {
  const t = DIGITS.map((x, i) => ({ id: `d${i}`, d: x.d, p: x.p + shift }));
  if (zero) t.push({ id: "zero", d: 0, p: DIGITS[DIGITS.length - 1].p - 1 + shift });
  return t;
}
const value = (t: Tile[]) => Number(t.reduce((a, x) => a + x.d * 10 ** x.p, 0).toFixed(6));
const written = (t: Tile[]) => {
  const ps = t.map((x) => x.p);
  const hi = Math.max(0, ...ps);
  const lo = Math.min(0, ...ps);
  let out = "";
  for (let p = hi; p >= lo; p--) {
    if (p === -1) out += ".";
    out += String(t.find((x) => x.p === p)?.d ?? 0);
  }
  return out;
};
const START = value(tiles(0, false));
const ANSWER = value(tiles(1, false));

const CW = 62;
const X0 = 12;
const W = X0 * 2 + CW * PLACES.length;
const col = (p: number) => X0 + PLACES.indexOf(p) * CW;

export default function AddAZero({ slug }: { slug: string }) {
  const [shift, setShift] = useState(0);
  const [zero, setZero] = useState(false);
  const [stuck, setStuck] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A recipe needs ${START} cups of flour and you are making 10 batches at once. How many cups is ${START} × 10?`,
        options: [written(tiles(0, true)), `${ANSWER}`, "30.5"],
        answer: 1,
      }}
      exploreHint="Try both: stick a 0 on the end, and multiply by 10."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          {stuck && (
            <p>
              Sticking a 0 on the end made {written(tiles(0, true))}: the 0 landed in the hundredths, worth nothing, so the value
              stayed {START}.
            </p>
          )}
          <p>
            × 10 moved every digit one column left: 3 ones became 3 tens and 5 tenths became 5 ones, so {START} × 10 = {ANSWER}.
            &quot;Add a zero&quot; only works for whole numbers, where the shift leaves an empty ones column to fill with 0. The
            real rule: times ten moves each digit up one place.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              shift={shift}
              zero={zero}
              onZero={() => {
                setZero(!zero);
                if (!zero) {
                  setStuck(true);
                  reach("stuck-zero");
                }
              }}
              onTimes={() => {
                setShift(shift + 1);
                reach("times-ten");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  shift,
  zero,
  onZero,
  onTimes,
}: {
  locked: boolean;
  shift: number;
  zero: boolean;
  onZero: () => void;
  onTimes: () => void;
}) {
  const t = tiles(shift, zero);
  const v = value(t);
  const caption = locked
    ? "Make a prediction to start."
    : shift === 0
      ? zero
        ? `A 0 on the end lands in the hundredths: ${written(t)}, still worth ${v}.`
        : `${START} is 3 ones and 5 tenths. Each column is worth 10 times the one to its right.`
      : `× ${10 ** shift}: every digit moved ${shift} column${shift > 1 ? "s" : ""} left. ${t
          .filter((x) => x.d > 0)
          .map((x) => `${x.d} ${NAMES[x.p]}`)
          .join(", ")}: ${v}.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} 104`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        {PLACES.map((p) => (
          <g key={p}>
            <rect x={col(p) + 3} y={30} width={CW - 6} height={66} rx={8} className={s.col} />
            <text x={col(p) + CW / 2} y={20} className={s.head}>
              {SHORT[p]}
            </text>
          </g>
        ))}
        <circle cx={col(-1)} cy={88} r={4.5} className={s.point} />
        {t.map((x) => (
          <g key={x.id} className={s.tile} style={{ transform: `translateX(${col(x.p)}px)` }}>
            <rect x={8} y={38} width={CW - 16} height={50} rx={8} className={x.id === "zero" ? s.zeroTile : s.digit} />
            <text x={CW / 2} y={74} className={s.digitText}>
              {x.d}
            </text>
          </g>
        ))}
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <div className={s.controls}>
        <Control disabled={locked} className={zero ? "active" : ""} onClick={onZero}>
          {zero ? "Take the 0 off" : "Stick a 0 on the end"}
        </Control>
        <Control disabled={locked || shift >= MAX_SHIFT} onClick={onTimes}>
          × 10
        </Control>
      </div>
      <Row>
        <Readout label="Written" value={locked ? written(tiles(0, false)) : written(t)} />
        <Readout label="Value" value={locked ? START : v} />
      </Row>
    </div>
  );
}
