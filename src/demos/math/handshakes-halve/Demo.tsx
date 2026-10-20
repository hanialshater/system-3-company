"use client";

// Handshakes halve. Ten seats on a circle; person 1 is there. Chips 2..10 bring people in, in
// order; each newcomer shakes hands with everyone already present (a line to each), so person k
// adds k - 1 lines and the tally reads 1 + 2 + ... + 9. "Count from each person" then labels every
// person with their 9 lines: 10 x 9 = 90 line ends, two per handshake. Numbers come from N.
// Key states: all ten present (45 lines); the per-person count shown.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const N = 10;
const PAIRS = (N * (N - 1)) / 2; // 45
const MILESTONES = ["all-ten", "ends-counted"] as const;
const CX = 150;
const CY = 118;
const RAD = 96;
const W = 300;
const H = 236;

const seat = (i: number) => {
  const a = ((-90 + (i * 360) / N) * Math.PI) / 180;
  return { x: CX + RAD * Math.cos(a), y: CY + RAD * Math.sin(a) };
};
const lines = (n: number) => (n * (n - 1)) / 2;

export default function HandshakesHalve({ slug }: { slug: string }) {
  const [n, setN] = useState(1);
  const [ends, setEnds] = useState(false);
  const [reachedAll, setReachedAll] = useState(false);
  const [counted, setCounted] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `At a party, ${N} people each shake hands once with everyone else there. How many handshakes happen in all?`,
        options: [String(N * N), String(N * (N - 1)), String(PAIRS)],
        answer: 2,
      }}
      exploreHint={`Bring in all ${N} people, then count the lines at each person.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>{PAIRS}.</strong>{" "}
            {reachedAll
              ? `As people arrived you drew 1 + 2 + … + ${N - 1} = ${PAIRS} lines, one per handshake.`
              : `Newcomers add 1 + 2 + … + ${N - 1} = ${PAIRS} lines.`}
          </p>
          <p>
            {counted ? "Counting from each person you saw" : "Counting from each person gives"} {N} people × {N - 1} lines ={" "}
            {N * (N - 1)}. That counts every handshake twice, once at each hand, so halve it: {N * (N - 1)} ÷ 2 = {PAIRS}.{" "}
            {N * N} also counts people shaking their own hand.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              n={n}
              ends={ends}
              onAdd={(k) => {
                setN(k);
                if (k === N) {
                  setReachedAll(true);
                  reach("all-ten");
                }
              }}
              onEnds={() => {
                setEnds(!ends);
                setCounted(true);
                reach("ends-counted");
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
  n,
  ends,
  onAdd,
  onEnds,
}: {
  locked: boolean;
  n: number;
  ends: boolean;
  onAdd: (k: number) => void;
  onEnds: () => void;
}) {
  const segs: { a: number; b: number; fresh: boolean }[] = [];
  for (let b = 1; b < n; b++) for (let a = 0; a < b; a++) segs.push({ a, b, fresh: b === n - 1 && n > 1 });
  const tally = Array.from({ length: n - 1 }, (_, i) => i + 1);

  const caption = locked
    ? "Make a prediction to start."
    : ends
      ? `Each person has ${n - 1} lines: ${n} × ${n - 1} = ${n * (n - 1)} line ends, two per handshake.`
      : n === 1
        ? "Person 1 is here. Bring in person 2."
        : `Person ${n} shakes ${n - 1} hand${n === 2 ? "" : "s"}. Lines: ${tally.length > 4 ? `1 + 2 + … + ${n - 1}` : tally.join(" + ")} = ${lines(n)}.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        {segs.map(({ a, b, fresh }) => {
          const p = seat(a);
          const q = seat(b);
          return <line key={`${a}-${b}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} className={fresh && !ends ? s.fresh : s.old} />;
        })}
        {Array.from({ length: N }, (_, i) => {
          const p = seat(i);
          const here = i < n;
          const out = { x: CX + (RAD + 16) * Math.cos(((-90 + (i * 360) / N) * Math.PI) / 180), y: CY + (RAD + 16) * Math.sin(((-90 + (i * 360) / N) * Math.PI) / 180) };
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={10} className={here ? s.person : s.empty} />
              <text x={p.x} y={p.y + 4} className={here ? s.num : s.numEmpty}>
                {i + 1}
              </text>
              {ends && here && (
                <text x={out.x} y={out.y + 4} className={s.ends}>
                  {n - 1}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <div className={s.chips} role="group" aria-label="Bring in a person">
        {Array.from({ length: N - 1 }, (_, i) => {
          const k = i + 2;
          return (
            <Control
              key={k}
              disabled={locked || k !== n + 1}
              className={k <= n ? "active" : ""}
              aria-label={`Bring in person ${k}`}
              onClick={() => onAdd(k)}
            >
              {k}
            </Control>
          );
        })}
      </div>
      <Row>
        <Control disabled={locked || n < N} className={ends ? "active" : ""} aria-pressed={ends} onClick={onEnds}>
          {ends ? "Hide the count" : "Count lines at each person"}
        </Control>
        <Readout label="Handshakes" value={locked ? "?" : lines(n)} />
      </Row>
    </div>
  );
}
