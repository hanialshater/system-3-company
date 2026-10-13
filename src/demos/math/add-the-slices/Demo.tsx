"use client";

// Add the slices. One bar of length 1 holds a half (from 0) and a third (laid after it). Chips cut
// the whole bar into 4ths, 5ths, 6ths or 12ths. A piece "fits" when a cut line lands on its ends
// (n divisible by its denominator); only then are its pieces counted. In 5ths the 2/5 mark is drawn,
// short of the half alone. Key states: fifths (2/5 seen) and sixths (3 + 2 = 5 of 6).
// All counts come from fits() and count(), the same functions that draw the cut lines.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const A = 2; // 1/A
const C = 3; // 1/C
const CUTS = [4, 5, 6, 12];
const MILESTONES = ["fifths", "sixths"] as const;
const WRONG = { top: 2, bottom: A + C }; // the "add tops and bottoms" answer, 2/5
const fits = (n: number, d: number) => n % d === 0;
const count = (n: number, d: number) => n / d;
const NAME: Record<number, string> = { 4: "fourths", 5: "fifths", 6: "sixths", 12: "twelfths" };
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const simp = (p: number, q: number) => `${p / gcd(p, q)}/${q / gcd(p, q)}`;

const W = 340;
const X0 = 20;
const L = 300;
const Y = 40;
const BH = 44;
const px = (f: number) => X0 + f * L;

export default function AddTheSlices({ slug }: { slug: string }) {
  const [cut, setCut] = useState<number | null>(null);
  const [seen, setSeen] = useState<number[]>([]);
  const sum = simp(count(6, A) + count(6, C), 6);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `What is 1/${A} + 1/${C}?`,
        options: [`${WRONG.top}/${WRONG.bottom}`, sum, `1/${WRONG.bottom}`],
        answer: 1,
      }}
      exploreHint="Try each cut until both pieces line up with the cut lines."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            In sixths both pieces fit the cuts: the half is {count(6, A)} sixths, the third {count(6, C)}, together{" "}
            {count(6, A) + count(6, C)} sixths, {sum}.
            {seen.includes(12) ? ` Twelfths gave ${count(12, A)} + ${count(12, C)} = ${count(12, A) + count(12, C)}/12, the same length.` : ""}
          </p>
          <p>
            In fifths you saw where {WRONG.top}/{WRONG.bottom} ends: short of the half alone, so 1/{A} + 1/{C} cannot be{" "}
            {WRONG.top}/{WRONG.bottom}. Adding tops and bottoms mixes pieces of different sizes. Fractions add once both are
            cut into pieces of the same size.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              cut={cut}
              onCut={(n) => {
                setCut(n);
                setSeen((v) => (v.includes(n) ? v : [...v, n]));
                if (n === WRONG.bottom) reach("fifths");
                if (fits(n, A) && fits(n, C)) reach("sixths");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({ locked, cut, onCut }: { locked: boolean; cut: number | null; onCut: (n: number) => void }) {
  const end = 1 / A + 1 / C;
  const both = cut !== null && fits(cut, A) && fits(cut, C);
  let caption = "Make a prediction to start.";
  if (!locked) {
    if (cut === null) caption = `A half, then a third, on one bar. Cut the bar into equal pieces to count them.`;
    else if (both) {
      const a = count(cut, A);
      const c = count(cut, C);
      caption = `${NAME[cut][0].toUpperCase()}${NAME[cut].slice(1)}: the half is ${a}, the third is ${c}. Together ${a + c} of ${cut}.`;
    } else if (cut === WRONG.bottom)
      caption = `Fifths: ${WRONG.top}/${WRONG.bottom} ends at the red mark, short of the half alone. Neither piece fits.`;
    else
      caption = `${NAME[cut][0].toUpperCase()}${NAME[cut].slice(1)}: the ${fits(cut, A) ? "third" : "half"} ends mid-piece, so the pieces can't be counted.`;
  }
  const total = locked || !both ? "?" : `${count(cut!, A) + count(cut!, C)}/${cut} = ${simp(count(cut!, A) + count(cut!, C), cut!)}`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${Y + BH + 34}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        <rect x={px(0)} y={Y} width={L} height={BH} className={s.bar} />
        <rect x={px(0)} y={Y} width={L / A} height={BH} className={s.half} />
        <rect x={px(1 / A)} y={Y} width={L / C} height={BH} className={s.third} />
        <text x={px(1 / (2 * A))} y={Y - 8} className={s.lab}>
          1/{A}
        </text>
        <text x={px(1 / A + 1 / (2 * C))} y={Y - 8} className={s.lab}>
          1/{C}
        </text>
        {!locked &&
          cut !== null &&
          Array.from({ length: cut - 1 }, (_, k) => {
            const f = (k + 1) / cut;
            return <line key={`${cut}-${k}`} x1={px(f)} y1={Y - 2} x2={px(f)} y2={Y + BH + 2} className={s.cut} />;
          })}
        {!locked && cut === WRONG.bottom && (
          <g>
            <line x1={px(WRONG.top / WRONG.bottom)} y1={Y - 4} x2={px(WRONG.top / WRONG.bottom)} y2={Y + BH + 10} className={s.wrong} />
            <text x={px(WRONG.top / WRONG.bottom)} y={Y + BH + 24} className={s.wrongLab}>
              {WRONG.top}/{WRONG.bottom}
            </text>
          </g>
        )}
        {!locked && both && (
          <text x={px(end)} y={Y + BH + 24} className={s.sumLab}>
            {simp(count(cut!, A) + count(cut!, C), cut!)}
          </text>
        )}
        <text x={px(0)} y={Y + BH + 24} className={s.end}>
          0
        </text>
        <text x={px(1)} y={Y + BH + 24} className={s.end}>
          1
        </text>
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <div className={s.chips} role="group" aria-label="Cut the bar">
        {CUTS.map((n) => (
          <Control
            key={n}
            disabled={locked || n === cut}
            className={n === cut ? "active" : ""}
            aria-label={`Cut the bar into ${NAME[n]}`}
            onClick={() => onCut(n)}
          >
            {NAME[n]}
          </Control>
        ))}
      </div>
      <Row>
        <Readout label="Half + third" value={total} />
      </Row>
    </div>
  );
}
