"use client";

// k-means only improves its current guess. Points 0, 4, 6, 10; two centres starting at 0 and 4.
// Step = assign each point to its nearest centre (ties to centre 1), then move each centre
// to the mean of its points (a centre with no points stays). From (0, 4): groups {0} and
// {4, 6, 10}, centres 0 and 6.67, total squared distance 18.67, and nothing changes after.
// The grouping {0, 4} and {6, 10} costs 16, reachable from other starts (e.g. 2 and 8).

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const POINTS = [0, 4, 6, 10];
const QUESTION_START: [number, number] = [0, 4];

const assign = (c: [number, number]) => POINTS.map((x) => (Math.abs(x - c[0]) <= Math.abs(x - c[1]) ? 0 : 1));
function update(c: [number, number], g: number[]): [number, number] {
  return [0, 1].map((j) => {
    const m = POINTS.filter((_, i) => g[i] === j);
    return m.length ? m.reduce((a, b) => a + b, 0) / m.length : c[j];
  }) as [number, number];
}
/** Centres after `steps` assign-and-move steps. */
function centresAfter(start: [number, number], steps: number): [number, number] {
  let c = start;
  for (let i = 0; i < steps; i++) c = update(c, assign(c));
  return c;
}
const cost = (c: [number, number]) => {
  const g = assign(c);
  return POINTS.reduce((acc, x, i) => acc + (x - c[g[i]]) ** 2, 0);
};
const settled = (start: [number, number], steps: number) => {
  const a = centresAfter(start, steps);
  const b = centresAfter(start, steps + 1);
  return Math.abs(a[0] - b[0]) < 1e-9 && Math.abs(a[1] - b[1]) < 1e-9;
};
// MODEL END

const X = (v: number) => 30 + v * 26;
const BLUE = "#3b82f6";
const ORANGE = "#f59e0b";
const groupsText = (c: [number, number]) => {
  const g = assign(c);
  const sets = [0, 1].map((j) => `{${POINTS.filter((_, i) => g[i] === j).join(", ")}}`);
  return sets.join(" ");
};

export default function BadStartKmeans({ slug }: { slug: string }) {
  const [start, setStart] = useState<[number, number]>(QUESTION_START);
  const [steps, setSteps] = useState(0);
  const [best, setBest] = useState<number | null>(null);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["stuck-from-question-start"]);

  const c = centresAfter(start, steps);
  const done = settled(start, steps);
  const g = assign(c);

  const goSteps = (n: number) => {
    setSteps(n);
    if (settled(start, n)) {
      const cc = cost(centresAfter(start, n));
      setBest((b) => (b === null ? cc : Math.min(b, cc)));
      if (start[0] === QUESTION_START[0] && start[1] === QUESTION_START[1]) reach("stuck-from-question-start");
    }
  };
  const runToEnd = () => {
    let n = steps;
    while (!settled(start, n) && n < 20) n++;
    goSteps(n);
  };
  const moveStart = (j: 0 | 1, d: number) => {
    const next: [number, number] = [...start];
    next[j] = Math.max(0, Math.min(10, next[j] + d));
    setStart(next);
    setSteps(0);
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Points on a line: 0, 4, 6, 10. k-means with 2 groups starts with centres at 0 and 4, then repeats 'assign each point to the nearest centre, move each centre to its group's mean'. The final groups:",
        options: ["{0, 4} and {6, 10}", "{0} and {4, 6, 10}", "{0, 4, 6} and {10}"],
        answer: 1,
      }}
      exploreHint="Step until nothing changes. Then move the starting centres and try again."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            From 0 and 4, the first step gave 4, 6 and 10 to the centre at 4, which moved to {(20 / 3).toFixed(2)}. Now 4 is{" "}
            {(20 / 3 - 4).toFixed(2)} from that centre and 4 from the other, so it stays: <strong>{"{0}"} and {"{4, 6, 10}"}</strong>,
            total squared distance {cost(centresAfter(QUESTION_START, 5)).toFixed(1)}. Every later step changes nothing.
          </p>
          <p>
            Yet {"{0, 4}"} and {"{6, 10}"} costs only 16.{best !== null && best < 17 ? " You found it from a different start." : " A start like 2 and 8 finds it."}{" "}
            The algorithm only improves the guess it has, so where you start can decide where you end. That is why k-means is
            usually run from several starts.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 150" className="stage-svg" role="img" aria-label={`Centres at ${c[0].toFixed(2)} and ${c[1].toFixed(2)}`}>
              <text x={160} y={14} textAnchor="middle" className={s.small} fill="var(--muted)">
                {locked ? "Two centres (▲) start at 0 and 4" : done ? "Settled: another step changes nothing" : `After ${steps} step${steps === 1 ? "" : "s"}`}
              </text>
              <line x1={X(0) - 10} y1={80} x2={X(10) + 10} y2={80} stroke="var(--line)" strokeWidth={2} />
              {[0, 2, 4, 6, 8, 10].map((v) => (
                <text key={v} x={X(v)} y={136} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                  {v}
                </text>
              ))}
              {!locked &&
                POINTS.map((x, i) => (
                  <line key={`l${i}`} x1={X(x)} y1={80} x2={X(c[g[i]])} y2={110} stroke={g[i] ? ORANGE : BLUE} strokeWidth={1.5} opacity={0.7} />
                ))}
              {POINTS.map((x, i) => (
                <circle key={i} cx={X(x)} cy={80} r={10} fill={locked ? "var(--fg)" : g[i] ? ORANGE : BLUE} stroke="var(--fg)" strokeWidth={1.5} />
              ))}
              {POINTS.map((x, i) => (
                <text key={`t${i}`} x={X(x)} y={62} textAnchor="middle" className={s.label} fill="var(--fg)">
                  {x}
                </text>
              ))}
              {c.map((v, j) => (
                <path key={j} d={`M${X(v)},104 l9,15 l-18,0 z`} fill={j ? ORANGE : BLUE} stroke="var(--fg)" strokeWidth={1.5} />
              ))}
            </svg>
            <Row>
              <Control disabled={locked || done} onClick={() => goSteps(steps + 1)}>
                Step
              </Control>
              <Control disabled={locked || done} onClick={runToEnd}>
                Run until settled
              </Control>
              <Readout label="Groups" value={locked ? "–" : groupsText(c)} />
              <Readout label="Total sq. distance" value={locked ? "–" : cost(c).toFixed(1)} />
            </Row>
            <Row>
              <span className={s.small}>Start ▲1 at {start[0]}</span>
              <Control aria-label="Move centre 1 start left" disabled={locked || start[0] === 0} onClick={() => moveStart(0, -1)}>
                ◀
              </Control>
              <Control aria-label="Move centre 1 start right" disabled={locked || start[0] === 10} onClick={() => moveStart(0, 1)}>
                ▶
              </Control>
              <span className={s.small}>▲2 at {start[1]}</span>
              <Control aria-label="Move centre 2 start left" disabled={locked || start[1] === 0} onClick={() => moveStart(1, -1)}>
                ◀
              </Control>
              <Control aria-label="Move centre 2 start right" disabled={locked || start[1] === 10} onClick={() => moveStart(1, 1)}>
                ▶
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
