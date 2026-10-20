"use client";

// Two colours enough. A page is cut by up to three fixed straight lines (all three crossings inside
// the page, so 7 pieces). Pieces are computed by clipping the page with half-planes; a piece's
// colour is the parity of the flipped lines it lies on the far side of. A new line flips nothing,
// so pieces touching across it clash (it is drawn red); "Flip one side" toggles that line into the
// parity and the clash disappears. Six step chips in order: draw 1, flip 1, draw 2, flip 2, draw 3,
// flip 3. Key state: three lines drawn and the third flipped, every touching pair different.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

type Pt = [number, number];
type Line = [Pt, Pt];
const PW = 300;
const PH = 200;
const PAGE: Pt[] = [[0, 0], [PW, 0], [PW, PH], [0, PH]];
const LINES: Line[] = [
  [[0, 50], [300, 170]],
  [[40, 200], [220, 0]],
  [[180, 0], [260, 200]],
];
const STEPS = LINES.length * 2;
const MILESTONES = ["three-lines-two-colours"] as const;

const side = ([p, q]: Line, [x, y]: Pt) => (q[0] - p[0]) * (y - p[1]) - (q[1] - p[1]) * (x - p[0]);
function clip(poly: Pt[], line: Line, sgn: number): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const sa = sgn * side(line, a);
    const sb = sgn * side(line, b);
    if (sa >= 0) out.push(a);
    if (sa >= 0 !== sb >= 0) {
      const t = sa / (sa - sb);
      out.push([a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]);
    }
  }
  return out;
}
const polyArea = (p: Pt[]) =>
  Math.abs(p.reduce((acc, [x, y], i) => { const [a, b] = p[(i + 1) % p.length]; return acc + x * b - a * y; }, 0)) / 2;

/** Pieces of the page cut by the first n lines, each with its colour given the first f lines flipped. */
function pieces(n: number, f: number) {
  const out: { poly: Pt[]; colour: number }[] = [];
  for (let m = 0; m < 1 << n; m++) {
    let p = PAGE;
    for (let k = 0; k < n; k++) p = clip(p, LINES[k], m & (1 << k) ? 1 : -1);
    if (p.length < 3 || polyArea(p) < 1) continue;
    let colour = 0;
    for (let k = 0; k < f; k++) if (m & (1 << k)) colour ^= 1;
    out.push({ poly: p, colour });
  }
  return out;
}
const drawnAt = (step: number) => Math.ceil(step / 2);
const flippedAt = (step: number) => Math.floor(step / 2);

export default function TwoColoursEnough({ slug }: { slug: string }) {
  const [step, setStep] = useState(0);
  const final = pieces(LINES.length, LINES.length);
  const used = new Set(final.map((p) => p.colour)).size;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "With a ruler, you draw straight lines right across a sheet of paper, then colour the pieces so touching pieces always differ. How few colours do you need?",
        options: ["2", "3", "4"],
        answer: 0,
      }}
      exploreHint="Draw each line, then flip one side of it to fix the clash."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You drew {LINES.length} lines, made {final.length} pieces, and {used} colours were enough. Each new line made clashes
            only along itself. Flipping every colour on one side fixed them all and made no new ones, because pieces touching
            across an older line flipped together.
          </p>
          <p>
            This works for any number of straight lines: a piece&apos;s colour just records whether it lies on the flipped side
            of an odd or even number of lines. Maps with curved borders are different and can need up to four.
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
                if (next === STEPS) reach("three-lines-two-colours");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({ locked, step, onStep }: { locked: boolean; step: number; onStep: () => void }) {
  const n = drawnAt(step);
  const f = flippedAt(step);
  const ps = pieces(n, f);
  const clash = n > f;
  const used = new Set(ps.map((p) => p.colour)).size;
  const caption = locked
    ? "Make a prediction to start."
    : n === 0
      ? "One blank page, one colour. Draw a line across it."
      : clash
        ? `Line ${n} splits pieces, but across it neighbours share a colour (red). Flip one side.`
        : `Every colour on one side of line ${n} flipped. Touching pieces now all differ.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`-6 -6 ${PW + 12} ${PH + 12}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        {ps.map((p, i) => (
          <polygon key={`${n}-${f}-${i}`} points={p.poly.map(([x, y]) => `${x},${y}`).join(" ")} className={p.colour ? s.c1 : s.c0} />
        ))}
        {LINES.slice(0, n).map(([a, b], k) => (
          <line key={k} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className={clash && k === n - 1 ? s.clash : s.line} />
        ))}
        <rect x={0} y={0} width={PW} height={PH} className={s.page} />
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <div className={s.chips} role="group" aria-label="Draw and flip">
        {LINES.map((_, k) => (
          <div key={k} className={s.pair}>
            {[0, 1].map((j) => {
              const idx = k * 2 + j;
              return (
                <Control
                  key={j}
                  disabled={locked || idx !== step}
                  className={idx < step ? "active" : ""}
                  aria-label={j === 0 ? `Draw line ${k + 1}` : `Flip the colours on one side of line ${k + 1}`}
                  onClick={onStep}
                >
                  {j === 0 ? `Draw line ${k + 1}` : "Flip one side"}
                </Control>
              );
            })}
          </div>
        ))}
      </div>
      <Row>
        <Readout label="Pieces" value={locked ? "?" : ps.length} />
        <Readout label="Colours" value={locked ? "?" : used} />
        <Readout label="Clash" value={locked ? "?" : clash ? `along line ${n}` : "none"} />
      </Row>
    </div>
  );
}
