"use client";

// 0.999... = 1. The stage is a number line that always shows the last stretch up to 1.
// With n nines, the view runs from 1 - 10^-(n-1) to 1, so 0.99...9 sits at nine tenths of
// the way and the gap to 1 (10^-n) is always the last tenth of the screen. Each tap adds a
// nine and zooms in ten times on that gap, so the gap never looks smaller. "All of them"
// asks for the gap left when no nine is the last: it must be below every 10^-n, so it is 0.
// The reveal waits for the learner to ask for all of them.
// v3: the learner names candidate gaps (slider: 0.0...01 with z zeros) and the stage says how many nines beat
// each one (z + 2 nines leave a gap of 10^-(z+2), smaller than 10^-(z+1)). The gate needs two named gaps and
// "all of them", so "no positive gap survives" is something the learner tested. The 1/3 check is drawn
// in the "forever" view.

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const W = 320;
const H = 120;
const X0 = 24;
const X1 = 296;
const Y = 62;
const MAXN = 12;

const nines = (n: number) => `0.${"9".repeat(n)}`;
const gap = (n: number) => `0.${"0".repeat(n - 1)}1`;
const leftEnd = (n: number) => (n === 1 ? "0" : nines(n - 1));
/** A named gap: 0.0...01 with z zeros after the point (10^-(z+1)). */
const named = (z: number) => (z > 8 ? `0.(${z} zeros)1` : `0.${"0".repeat(z)}1`);
/** Fewest nines whose gap (10^-n) is smaller than the named gap 10^-(z+1). */
const beatenBy = (z: number) => z + 2;
const Z0 = 5;

export default function NinesWithoutEnd({ slug }: { slug: string }) {
  const [n, setN] = useState(1);
  const [forever, setForever] = useState(false);
  const [tries, setTries] = useState<number[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You write 0.999… on a whiteboard, with the nines going on forever, never stopping. How far is that number from 1?",
        options: ["A tiny positive gap", "Exactly zero", "Zero only at the end, which never comes"],
        answer: 1,
      }}
      exploreHint="Name a tiny gap and see if nines beat it. Add at least four nines, then ask for all of them."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>Exactly zero.</strong> {n > 1 ? `You added ${n - 1} more nine${n === 2 ? "" : "s"}, and the gap went from 0.1 down to ${gap(n)}: each nine cut it to a tenth, and the zoom never ran out.` : "Each nine cuts the gap to a tenth: 0.1, 0.01, 0.001…, and the zoom never runs out."} With all the nines, the gap has to be smaller than every one of those. No positive number
            is, so the gap is 0.{" "}
            {tries.length > 0 &&
              `Every gap you named was beaten: the smallest, ${named(Math.max(...tries))}, by ${beatenBy(Math.max(...tries))} nines.`}
          </p>
          <p>
            &ldquo;Shrinks but never reaches&rdquo; describes stopping after some nines. 0.999… has no last nine. It is
            another name for 1, the way 1/3 is 0.333…: as the check on the stage showed, three times 0.333… is 0.999…, and
            three times 1/3 is 1.
          </p>
        </>
      )}
    >
      {(ctx) => (
        <Stage
          {...ctx}
          n={n}
          setN={setN}
          forever={forever}
          setForever={setForever}
          addTry={(z) => setTries((t) => (t.includes(z) ? t : [...t, z]))}
          tries={tries}
        />
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  n,
  setN,
  forever,
  setForever,
  addTry,
  tries,
}: StageContext & {
  n: number;
  setN: (v: number) => void;
  forever: boolean;
  setForever: (v: boolean) => void;
  addTry: (z: number) => void;
  tries: number[];
}) {
  const { reach } = useMilestones(interact, ["two-gaps", "forever"]);
  const [z, setZ] = useState(Z0);
  const [tried, setTried] = useState(false);
  const nameGap = (v: number) => {
    setZ(v);
    setTried(true);
    addTry(v);
    if (tries.length + (tries.includes(v) ? 0 : 1) >= 2) reach("two-gaps");
  };

  const xp = X0 + 0.9 * (X1 - X0);
  const ticks = Array.from({ length: 11 }, (_, i) => X0 + (i / 10) * (X1 - X0));

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={forever ? "0.999 forever sits on 1" : `${nines(n)} and the gap to 1`}>
        {!forever ? (
          <>
            {/* keyed by n so each new nine replays the zoom */}
            <g key={n} className={n > 1 ? s.zoom : undefined} style={{ transformOrigin: `${X1}px ${Y}px` }}>
              <line x1={X0} y1={Y} x2={X1} y2={Y} className={s.axis} />
              {ticks.map((x, i) => (
                <line key={i} x1={x} y1={Y - (i % 10 === 0 ? 8 : 4)} x2={x} y2={Y + (i % 10 === 0 ? 8 : 4)} className={s.tick} />
              ))}
              <line x1={xp} y1={Y} x2={X1} y2={Y} className={s.gap} />
            </g>
            <text x={X0} y={Y + 24} textAnchor="start" className={s.end}>
              {leftEnd(n)}
            </text>
            <text x={X1} y={Y + 24} textAnchor="middle" className={s.one}>
              1
            </text>
            <circle cx={xp} cy={Y} r={5} className={s.point} />
            <text x={xp} y={Y - 14} textAnchor="end" className={s.pointLabel}>
              {nines(n)}
            </text>
            <text x={(xp + X1) / 2 + 4} y={Y + 44} textAnchor="end" className={s.gapLabel}>
              gap {gap(n)}
            </text>
          </>
        ) : (
          <>
            <line x1={X0} y1={Y} x2={X1} y2={Y} className={s.axis} />
            <circle cx={X1 - 40} cy={Y} r={6} className={s.point} />
            <text x={X1 - 40} y={Y - 14} textAnchor="middle" className={s.pointLabel}>
              0.999… = 1
            </text>
            <text x={X1 - 40} y={Y + 26} textAnchor="middle" className={s.zero}>
              gap 0
            </text>
            <text x={X0} y={Y + 42} className={s.end}>
              gaps you saw: 0.1 … {gap(n)}
            </text>
            <text x={X0} y={Y + 55} className={s.end}>
              check: 3 × 0.333… = 0.999…, and 3 × 1/3 = 1
            </text>
          </>
        )}
      </svg>

      <p className={s.caption} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : tried && !forever
            ? `Your gap ${named(z)}: ${beatenBy(z)} nines get closer than that (gap ${named(z + 1)}).`
            : forever
            ? tries.length
              ? `Every gap you named was beaten by enough nines. With all of them, only 0 is left.`
              : "Is any positive number below 0.1, 0.01, 0.001… every one? No. Only 0 is."
            : n === 1
              ? "The red gap is the distance to 1. Add a nine to zoom in."
              : `Zoomed ×10 again. The gap is a tenth of the last one, still a full tenth of the view.`}
      </p>

      <Slider
        label="Name a gap"
        value={z}
        min={1}
        max={30}
        disabled={locked}
        onChange={nameGap}
        format={(v) => named(v)}
      />
      <Row>
        <Control disabled={locked || forever || n >= MAXN} onClick={() => { setTried(false); setN(n + 1); }}>
          + one more 9
        </Control>
        <Control disabled={locked || forever || n >= MAXN} onClick={() => { setTried(false); setN(Math.min(MAXN, n + 3)); }}>
          + three more 9s
        </Control>
        <Control
          disabled={locked || forever || n < 4}
          onClick={() => {
            setTried(false);
            setForever(true);
            reach("forever");
          }}
        >
          All of them, forever
        </Control>
        <Control
          disabled={locked || (n === 1 && !forever)}
          onClick={() => {
            setForever(false);
            setN(1);
          }}
        >
          Start over
        </Control>
      </Row>
    </div>
  );
}
