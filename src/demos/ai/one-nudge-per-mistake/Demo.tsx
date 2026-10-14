"use client";

// Perceptron on five points, swept in a fixed order. Score = w1*x + w2*y + b. A point is a
// mistake if label * score <= 0 (a zero score counts as wrong: toy convention). On a mistake,
// w <- w + label * (x, y, 1). Trace from w = 0: nudge at (1,1)+ -> (1,1,1); nudge at (-1,0)- ->
// (2,1,0); (2,-1)+, (-1,-2)-, (0,2)+ already right. Sweep 2 has no mistakes: 2 nudges in all.
// Deterministic.

import { useId, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
type Pt = { x: number; y: number; l: 1 | -1 };
const PTS: Pt[] = [
  { x: 1, y: 1, l: 1 },
  { x: -1, y: 0, l: -1 },
  { x: 2, y: -1, l: 1 },
  { x: -1, y: -2, l: -1 },
  { x: 0, y: 2, l: 1 },
];
type W = [number, number, number];
type St = { w: W; idx: number; sweep: number; nudges: number; sweepMistakes: number; cleanSweep: boolean; last: string; nudgeAt: string[] };
const score = (w: W, p: Pt) => w[0] * p.x + w[1] * p.y + w[2];
const START: St = { w: [0, 0, 0], idx: 0, sweep: 1, nudges: 0, sweepMistakes: 0, cleanSweep: false, last: "", nudgeAt: [] };
const name = (p: Pt) => `(${p.x},${p.y})`;
/** Check one point; nudge if wrong. */
function checkOne(st: St): St {
  const p = PTS[st.idx];
  const sc = score(st.w, p);
  const wrong = p.l * sc <= 0;
  const w: W = wrong ? [st.w[0] + p.l * p.x, st.w[1] + p.l * p.y, st.w[2] + p.l] : st.w;
  const sweepMistakes = st.sweepMistakes + (wrong ? 1 : 0);
  const last = `${name(p)} ${p.l > 0 ? "+" : "−"}: score ${sc}${wrong ? " → wrong, nudge" : " → right"}`;
  const next: St = { ...st, w, nudges: st.nudges + (wrong ? 1 : 0), sweepMistakes, last, nudgeAt: wrong ? [...st.nudgeAt, name(p)] : st.nudgeAt, idx: st.idx + 1 };
  if (next.idx === PTS.length) {
    return { ...next, idx: 0, sweep: st.sweep + 1, sweepMistakes: 0, cleanSweep: next.cleanSweep || sweepMistakes === 0 };
  }
  return next;
}
/** Check the rest of the sweep. The caption lists every nudge made, not only the last point. */
function restOfSweep(st: St): St {
  const wrongs: string[] = [];
  let rights = 0;
  let s2 = st;
  do {
    const before = s2.nudges;
    s2 = checkOne(s2);
    if (s2.nudges > before) wrongs.push(s2.last);
    else rights++;
  } while (s2.idx !== 0);
  const tail = `${rights} ${rights === 1 ? "point" : "points"} right, no change.`;
  return { ...s2, last: wrongs.length ? `${wrongs.join("; ")}. Then ${tail}` : `All ${tail}` };
}
/** Run full sweeps until one has no mistakes (for the question's answer). */
function untilClean() {
  let st = START;
  for (let i = 0; i < 20 && !st.cleanSweep; i++) st = restOfSweep(st);
  return st;
}
const Q = untilClean(); // nudges 2, finished after 2 sweeps
// MODEL END

const R = 3;
const PX = (x: number) => 160 + x * 30;
const PY = (y: number) => 100 - y * 30;
/** Clip the square [-R,R]^2 to the half-plane w.x + b >= 0. */
function positiveSide(w: W): [number, number][] {
  const sq: [number, number][] = [
    [-R, -R],
    [R, -R],
    [R, R],
    [-R, R],
  ];
  const f = ([x, y]: [number, number]) => w[0] * x + w[1] * y + w[2];
  const out: [number, number][] = [];
  for (let i = 0; i < 4; i++) {
    const a = sq[i];
    const b = sq[(i + 1) % 4];
    const fa = f(a);
    const fb = f(b);
    if (fa >= 0) out.push(a);
    if (fa >= 0 !== fb >= 0) {
      const t = fa / (fa - fb);
      out.push([a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]);
    }
  }
  return out;
}

export default function OneNudgePerMistake({ slug }: { slug: string }) {
  const [st, setSt] = useState<St>(START);
  const clipId = `clip${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const hasLine = st.w[0] !== 0 || st.w[1] !== 0;
  const current = PTS[st.idx];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Five points: (1,1)+, (−1,0)−, (2,−1)+, (−1,−2)−, (0,2)+. A perceptron starts with no line and checks the points in that order. On each wrong point it adds (+) or subtracts (−) that point. How many nudges until a full sweep has no mistakes?",
        options: ["1", String(Q.nudges), String(PTS.length)],
        answer: 1,
      }}
      exploreHint="Check points one at a time, finish the sweep, then run another."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You made {st.nudgeAt.length} {st.nudgeAt.length === 1 ? "nudge" : "nudges"}, marked on the stage: at {st.nudgeAt.join(" and ")}.{" "}
            After the last one the line sat between the groups, and {st.cleanSweep ? "the next sweep found no mistakes." : "no point was wrong any more."}
          </p>
          <p>
            A perceptron changes only when it is wrong. Each nudge adds the missed point (or subtracts it), which turns the
            line toward putting that point on its own side: watch a red ring turn green. Points already right changed nothing.
          </p>
          <p>Learning here is not one calculation: it is a few small corrections, one per mistake.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["second-nudge", "clean-sweep"]}>
          {(reach) => {
            const apply = (next: St) => {
              setSt(next);
              if (next.nudges >= 2) reach("second-nudge");
              if (next.cleanSweep) reach("clean-sweep");
            };
            const poly = hasLine ? positiveSide(st.w) : [];
            const caption = locked
              ? "Each point should sit on its own side of a line: + in the shade, − outside. With no line, every point counts as wrong."
              : st.cleanSweep
                ? `Sweep ${st.sweep - 1}: no mistakes. Training is done.`
                : st.last || "No line yet: every score is 0, so every point counts as wrong.";
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy perceptron</span>
                <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label={`Line weights ${st.w.join(", ")}`}>
                  <defs>
                    <clipPath id={clipId}>
                      <rect x={PX(-R)} y={PY(R)} width={PX(R) - PX(-R)} height={PY(-R) - PY(R)} />
                    </clipPath>
                  </defs>
                  <rect x={PX(-R)} y={PY(R)} width={PX(R) - PX(-R)} height={PY(-R) - PY(R)} fill="var(--bg-2)" stroke="var(--line)" />
                  {!locked && poly.length > 2 && (
                    <polygon
                      points={poly.map(([x, y]) => `${PX(x).toFixed(1)},${PY(y).toFixed(1)}`).join(" ")}
                      fill="color-mix(in srgb, var(--domain) 18%, transparent)"
                    />
                  )}
                  <line x1={PX(-R)} y1={PY(0)} x2={PX(R)} y2={PY(0)} stroke="var(--line)" strokeDasharray="2 3" />
                  <line x1={PX(0)} y1={PY(-R)} x2={PX(0)} y2={PY(R)} stroke="var(--line)" strokeDasharray="2 3" />
                  {!locked && hasLine && (() => {
                    // two points on w1 x + w2 y + b = 0, extended past the box and clipped to it
                    const [a, b, c] = st.w;
                    const p1 = Math.abs(b) > 1e-9 ? [-5, (-c - a * -5) / b] : [-c / a, -5];
                    const p2 = Math.abs(b) > 1e-9 ? [5, (-c - a * 5) / b] : [-c / a, 5];
                    return (
                      <line x1={PX(p1[0])} y1={PY(p1[1])} x2={PX(p2[0])} y2={PY(p2[1])} stroke="var(--domain)" strokeWidth={2.5} clipPath={`url(#${clipId})`} />
                    );
                  })()}
                  {PTS.map((p, i) => {
                    const ok = p.l * score(st.w, p) > 0;
                    const isNext = !locked && !st.cleanSweep && i === st.idx;
                    const nudgeNo = locked ? -1 : st.nudgeAt.indexOf(name(p));
                    return (
                      <g key={i}>
                        {nudgeNo >= 0 && (
                          <text x={PX(p.x) + 12} y={PY(p.y) - 9} className={s.tiny} fill="var(--fg)">
                            {`nudge ${nudgeNo + 1}`}
                          </text>
                        )}
                        {isNext && <circle cx={PX(p.x)} cy={PY(p.y)} r={13} fill="none" stroke="var(--fg)" strokeWidth={1.5} strokeDasharray="3 2" />}
                        <circle
                          cx={PX(p.x)}
                          cy={PY(p.y)}
                          r={8}
                          fill={p.l > 0 ? "var(--domain)" : "var(--bg)"}
                          stroke={locked ? "var(--fg)" : ok ? "var(--good)" : "var(--bad)"}
                          strokeWidth={2.5}
                        />
                        <text x={PX(p.x)} y={PY(p.y) + 4} textAnchor="middle" className={s.small} fill="var(--fg)">
                          {p.l > 0 ? "+" : "−"}
                        </text>
                      </g>
                    );
                  })}
                  <text x={PX(R) + 6} y={PY(R) + 10} className={s.tiny} fill="var(--muted)">
                    shade:
                  </text>
                  <text x={PX(R) + 6} y={PY(R) + 20} className={s.tiny} fill="var(--muted)">
                    says +
                  </text>
                  {!locked && (
                    <text x={PX(R) + 6} y={PY(-R)} className={s.tiny} fill="var(--muted)">
                      {`w ${st.w[0]},${st.w[1]} b ${st.w[2]}`}
                    </text>
                  )}
                </svg>
                <p className={s.caption}>{caption}</p>
                <Row>
                  <Control disabled={locked || st.cleanSweep} onClick={() => apply(checkOne(st))}>
                    Check next point
                  </Control>
                  <Control disabled={locked || st.idx === 0 || st.cleanSweep} onClick={() => apply(restOfSweep(st))}>
                    Rest of sweep
                  </Control>
                  <Control disabled={locked || st.idx !== 0 || st.cleanSweep} onClick={() => apply(restOfSweep(st))}>
                    Full sweep
                  </Control>
                  <Control disabled={locked || st.nudges === 0 || st.cleanSweep} onClick={() => setSt(START)}>
                    Start over
                  </Control>
                </Row>
                <Row>
                  <Readout label="Nudges" value={locked ? "–" : st.nudges} />
                  <Readout label="Sweep" value={locked ? "–" : st.cleanSweep ? `${st.sweep - 1} (clean)` : st.sweep} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
