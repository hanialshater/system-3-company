"use client";

// XOR needs two cuts. Blue at (0,0) and (1,1); orange at (0,1) and (1,0). A line splits the
// plane into an "on" side and an "off" side. One line: orange = on side. No line can get all
// four right (both pairs share the midpoint (0.5, 0.5)); the best is 3 of 4.
// Two lines: orange = on the "on" side of exactly one line (OR minus AND of the two cuts,
// what a hidden layer of two units can compute). Lines turn in 45 degree steps and slide
// through three offsets, measured from the centre (0.5, 0.5).
// v4: line 1 starts at x = 0.85 (2 of 4) so Turn, Slide reaches the one-line ceiling (3 of 4);
// line 2 is added in a position that does not solve it, so the learner must move it. Gate:
// "ceiling" (one line at 3 of 4) and "solved" (two lines at 4 of 4). Each line marks its "on"
// side, and the middle dot takes the model's colour, so the midpoint argument is on stage.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
type Line = { turn: number; slide: number }; // turn: 0..7 (x45 deg); slide index into OFFSETS
const OFFSETS = [0, 0.35, -0.35];
const POINTS = [
  { x: 0, y: 0, orange: false },
  { x: 1, y: 1, orange: false },
  { x: 0, y: 1, orange: true },
  { x: 1, y: 0, orange: true },
];

function onSide(l: Line, x: number, y: number) {
  const a = (l.turn * Math.PI) / 4;
  return Math.cos(a) * (x - 0.5) + Math.sin(a) * (y - 0.5) > OFFSETS[l.slide] + 1e-9;
}
/** The model's answer at (x, y): orange or not. */
function predict(l1: Line, l2: Line | null, x: number, y: number) {
  if (!l2) return onSide(l1, x, y);
  return onSide(l1, x, y) !== onSide(l2, x, y);
}
const score = (l1: Line, l2: Line | null) => POINTS.filter((p) => predict(l1, l2, p.x, p.y) === p.orange).length;

const START1: Line = { turn: 0, slide: 1 };
/** Where line 2 appears: the first candidate that does not already solve it with line 1. */
const L2_STARTS: Line[] = [{ turn: 0, slide: 0 }, { turn: 2, slide: 0 }, { turn: 1, slide: 0 }, { turn: 3, slide: 0 }];
const startLine2 = (l1: Line) => L2_STARTS.find((c) => score(l1, c) < 4) ?? L2_STARTS[0];

/** Best score any single line in the toy can reach (all turns and slides). */
function bestOneLine() {
  let best = 0;
  for (let t = 0; t < 8; t++) for (let sl = 0; sl < OFFSETS.length; sl++) best = Math.max(best, score({ turn: t, slide: sl }, null));
  return best;
}
// MODEL END

const BLUE = "#3b82f6";
const ORANGE = "#f59e0b";
// Plane [-0.5, 1.5]^2 drawn in a 200 x 200 box at (60, 20).
const OX = 60;
const OY = 20;
const SZ = 200;
const X = (x: number) => OX + ((x + 0.5) / 2) * SZ;
const Y = (y: number) => OY + SZ - ((y + 0.5) / 2) * SZ;
const CELLS = 20;

function segment(l: Line) {
  const a = (l.turn * Math.PI) / 4;
  const [nx, ny] = [Math.cos(a), Math.sin(a)];
  const d = OFFSETS[l.slide];
  const [px, py] = [0.5 + nx * d, 0.5 + ny * d];
  return { x1: X(px - ny * 3), y1: Y(py + nx * 3), x2: X(px + ny * 3), y2: Y(py - nx * 3) };
}
/** Where to print a line's "on" label: just inside its on side, shifted along the line by `along`. */
function onMark(l: Line, along: number) {
  const a = (l.turn * Math.PI) / 4;
  const [nx, ny] = [Math.cos(a), Math.sin(a)];
  const d = OFFSETS[l.slide] + 0.13;
  return { x: X(0.5 + nx * d - ny * along), y: Y(0.5 + ny * d + nx * along) };
}

export default function DrawTheXorLines({ slug }: { slug: string }) {
  const [l1, setL1] = useState<Line>(START1);
  const [l2, setL2] = useState<Line | null>(null);
  const [bestSingle, setBestSingle] = useState<number>(score(START1, null));
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["ceiling", "solved"]);

  const apply = (n1: Line, n2: Line | null) => {
    setL1(n1);
    setL2(n2);
    const sc = score(n1, n2);
    if (!n2) {
      setBestSingle((b) => Math.max(b, sc));
      if (sc === bestOneLine()) reach("ceiling");
    }
    if (n2 && sc === 4) reach("solved");
  };

  const correct = score(l1, l2);
  const solved = correct === 4;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You get one straight cut to sort four dots: (0,0) and (1,1) are blue, (0,1) and (1,0) are orange. Can one straight line put blue on one side and orange on the other?",
        options: ["Yes, if placed cleverly", "No, never", "Yes, if the blue dots are moved slightly"],
        answer: 1,
      }}
      exploreHint="Get one line to its best score. Then add a second line and move it until all 4 are right."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Your best with one line was {bestSingle} of 4, and no line in this toy does better. Look at the middle dot: it sits halfway
            between the two blues and halfway between the two oranges. A side that holds both blues must hold the middle dot, and so
            must a side that holds both oranges. A line&apos;s two sides cannot share a point, so one line always misses a dot.
          </p>
          <p>
            Your two lines got all 4: the shading is orange where a point is on the &quot;on&quot; side of exactly one line (each line
            marks its &quot;on&quot; side). Combining two simple cuts makes a shape no single cut can. That combining step is what a hidden
            layer adds: here, two hidden units (small calculators inside a network between input and answer), each one line.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const cells = [];
        for (let i = 0; i < CELLS; i++)
          for (let j = 0; j < CELLS; j++) {
            const x = -0.5 + ((i + 0.5) / CELLS) * 2;
            const y = -0.5 + ((j + 0.5) / CELLS) * 2;
            cells.push(
              <rect
                key={`${i}-${j}`}
                x={OX + (i * SZ) / CELLS}
                y={OY + SZ - ((j + 1) * SZ) / CELLS}
                width={SZ / CELLS + 0.3}
                height={SZ / CELLS + 0.3}
                fill={predict(l1, l2, x, y) ? ORANGE : BLUE}
                opacity={0.2}
              />,
            );
          }
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 240" className="stage-svg" role="img" aria-label={`${correct} of 4 dots right${solved ? ", solved" : ""}`}>
              <defs>
                <clipPath id="xor-clip">
                  <rect x={OX} y={OY} width={SZ} height={SZ} />
                </clipPath>
              </defs>
              {cells}
              <rect x={OX} y={OY} width={SZ} height={SZ} fill="none" stroke="var(--line)" />
              <g clipPath="url(#xor-clip)">
                {[l1, l2].map((l, i) => (l ? <line key={i} {...segment(l)} stroke="var(--fg)" strokeWidth={3} /> : null))}
                {[l1, l2].map((l, i) => {
                  if (!l) return null;
                  const p = onMark(l, i === 0 ? 0.32 : -0.32);
                  return (
                    <text key={`on${i}`} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" className={s.tiny} fill="var(--fg)">
                      {`on ${i + 1}`}
                    </text>
                  );
                })}
              </g>
              <circle cx={X(0.5)} cy={Y(0.5)} r={5} fill={predict(l1, l2, 0.5, 0.5) ? ORANGE : BLUE} stroke="var(--fg)" strokeWidth={1.5} />
              <text x={X(0.5) - 24} y={Y(0.5) + 16} className={s.label} fill="var(--muted)">
                middle
              </text>
              {POINTS.map((p, i) => {
                const ok = predict(l1, l2, p.x, p.y) === p.orange;
                return (
                  <g key={i}>
                    <circle cx={X(p.x)} cy={Y(p.y)} r={11} fill={p.orange ? ORANGE : BLUE} stroke="var(--fg)" strokeWidth={1.5} />
                    {!ok && !locked && <circle cx={X(p.x)} cy={Y(p.y)} r={16} fill="none" stroke="var(--bad)" strokeWidth={2.5} strokeDasharray="4 3" />}
                  </g>
                );
              })}
              <text x={160} y={236} textAnchor="middle" className={s.label} fill={solved ? "var(--good)" : "var(--muted)"}>
                {locked ? "Shading: what the model says" : solved ? "Solved: all 4 right" : `Not yet: ${correct} of 4 right`}
              </text>
            </svg>
            <Row>
              <Control disabled={locked} onClick={() => apply({ ...l1, turn: (l1.turn + 1) % 8 }, l2)}>
                Turn line 1
              </Control>
              <Control disabled={locked} onClick={() => apply({ ...l1, slide: (l1.slide + 1) % OFFSETS.length }, l2)}>
                Slide line 1
              </Control>
              <Control disabled={locked} onClick={() => apply(l1, l2 ? null : startLine2(l1))}>
                {l2 ? "Remove line 2" : "Add line 2"}
              </Control>
            </Row>
            <Row>
              <Control disabled={locked || !l2} onClick={() => l2 && apply(l1, { ...l2, turn: (l2.turn + 1) % 8 })}>
                Turn line 2
              </Control>
              <Control disabled={locked || !l2} onClick={() => l2 && apply(l1, { ...l2, slide: (l2.slide + 1) % OFFSETS.length })}>
                Slide line 2
              </Control>
              <Readout label="Right" value={locked ? "–" : `${correct} of 4`} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
