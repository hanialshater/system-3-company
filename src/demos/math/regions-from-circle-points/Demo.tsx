"use client";

// Regions from circle points: points on a circle, every pair joined by a straight line; count the pieces.
// Points at 0°, 64°, 113°, 179°, 230°, 308° (the first n for n points; brief check D3). Uneven on purpose:
// evenly spaced, three diagonals of the hexagon meet at the centre and 6 points give 30 (claim c4).
// Everything on the stage is computed from the drawing: crossings by segment intersection, pieces by
// Euler's formula on the drawn graph (V − E + F = 2), never from the 1 + lines + crossings formula the
// reveal states, so the stage can check it.
// Shading: each line cuts the disc in two; a piece is dark when it lies on the small-arc side of an odd
// number of lines (one evenodd path of all the segments), so neighbouring pieces always differ.
// The trace table keeps every count the learner has seen, so Reset cannot erase what the reveal quotes.
// Brief: company/domains/briefs/math.discrete.md, Wave J, brief 3 (check D3).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const ANGLES = [0, 64, 113, 179, 230, 308];
const NS = [1, 2, 3, 4, 5, 6] as const;
const CHIPS = [2, 3, 4, 5, 6] as const; // DOM order from the brief
const MILESTONES = ["five", "six"] as const;
const C = 150; // centre of the 300 × 300 viewBox
const R = 136;

type Pt = [number, number];
type Count = { lines: number; crossings: number; pieces: number };

const pointsFor = (n: number): Pt[] =>
  ANGLES.slice(0, n).map((a) => [C + R * Math.cos((a * Math.PI) / 180), C - R * Math.sin((a * Math.PI) / 180)]);

const pairsOf = (n: number) => {
  const out: [number, number][] = [];
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) out.push([i, j]);
  return out;
};

/** Crossings strictly inside two lines that share no end point. */
function crossingsOf(P: Pt[], lines: [number, number][]) {
  const pts: Pt[] = [];
  for (let a = 0; a < lines.length; a++)
    for (let b = a + 1; b < lines.length; b++) {
      const [i, j] = lines[a];
      const [k, l] = lines[b];
      if (new Set([i, j, k, l]).size < 4) continue;
      const p = P[i];
      const r = [P[j][0] - p[0], P[j][1] - p[1]];
      const q = P[k];
      const sv = [P[l][0] - q[0], P[l][1] - q[1]];
      const den = r[0] * sv[1] - r[1] * sv[0];
      if (Math.abs(den) < 1e-9) continue;
      const t = ((q[0] - p[0]) * sv[1] - (q[1] - p[1]) * sv[0]) / den;
      const u = ((q[0] - p[0]) * r[1] - (q[1] - p[1]) * r[0]) / den;
      if (t > 1e-9 && t < 1 - 1e-9 && u > 1e-9 && u < 1 - 1e-9) pts.push([p[0] + t * r[0], p[1] + t * r[1]]);
    }
  return pts;
}

/** Pieces inside the circle by Euler's formula on the drawing: V − E + F = 2, minus the outside face. */
function drawingOf(n: number): { P: Pt[]; lines: [number, number][]; X: Pt[]; count: Count } {
  const P = pointsFor(n);
  const lines = pairsOf(n);
  const X = crossingsOf(P, lines);
  if (n === 1) return { P, lines, X, count: { lines: 0, crossings: 0, pieces: 1 } };
  // Distinct crossing points (several lines through one point would merge here).
  const distinct: Pt[] = [];
  for (const x of X) if (!distinct.some((d) => Math.hypot(d[0] - x[0], d[1] - x[1]) < 1e-6)) distinct.push(x);
  let segments = 0;
  for (const [i, j] of lines) {
    const p = P[i];
    const q = P[j];
    const on = distinct.filter(
      (d) => Math.abs((q[0] - p[0]) * (d[1] - p[1]) - (q[1] - p[1]) * (d[0] - p[0])) < 1e-6 * R * R,
    ).length;
    segments += on + 1;
  }
  const V = n + distinct.length;
  const E = segments + n; // line pieces plus the n arcs of the circle
  return { P, lines, X, count: { lines: lines.length, crossings: X.length, pieces: E - V + 1 } };
}

const DRAWINGS = Object.fromEntries(NS.map((n) => [n, drawingOf(n)])) as Record<number, ReturnType<typeof drawingOf>>;
const COUNTS: Record<number, Count> = Object.fromEntries(NS.map((n) => [n, DRAWINGS[n].count]));

type Kept = Record<number, Count>;

export default function RegionsFromCirclePoints({ slug }: { slug: string }) {
  const [n, setN] = useState(1);
  const kept = useRef<Kept>({ 1: COUNTS[1] });

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You put points around a circle, unevenly so no three lines meet at one spot, and join every pair with a straight line. Pieces: 1 point, 1. 2 points, 2. 3: 4. 4: 8. 5: 16. With 6 points?",
        options: ["30", "31", "32"],
        answer: 1,
      }}
      exploreHint="Add points one chip at a time and count the pieces."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const five = kept.current[5] ?? COUNTS[5];
        const six = kept.current[6] ?? COUNTS[6];
        return (
          <>
            <p>
              Doubling held up to 5 points ({five.pieces} pieces), then 6 points gave {six.pieces}, not{" "}
              {2 * five.pieces}. Every piece is made by a line or a crossing: pieces = 1 + lines + crossings. With 6
              points that is 1 + {six.lines} + {six.crossings} = {1 + six.lines + six.crossings}.
            </p>
            <p>
              Lines come from pairs of points and crossings from groups of four, so the rule was never doubling: it only matched doubling up to 5 points.
              Five matching cases are evidence, not a proof.
            </p>
          </>
        );
      }}
    >
      {(ctx) => <Stage {...ctx} n={n} setN={setN} kept={kept.current} />}
    </Lesson>
  );
}

function Stage({
  phase,
  locked,
  interact,
  n,
  setN,
  kept,
}: StageContext & { n: number; setN: (n: number) => void; kept: Kept }) {
  const { reach } = useMilestones(interact, MILESTONES);
  // At the reveal, a learner who pressed Reset sees the 6-point drawing again (the reveal quotes its 15 lines
  // and 15 crossings); Reset is disabled then, so this never hides a press.
  const shown = phase === "reveal" && n === 1 ? 6 : n;
  const { P, lines, X } = DRAWINGS[shown];

  const pick = (m: number) => {
    setN(m);
    kept[m] = COUNTS[m];
    if (m === 5) reach("five");
    if (m === 6) reach("six");
  };

  // One closed subpath per line: the line plus the small arc of the circle it cuts off.
  const shade = lines
    .map(([i, j]) => {
      const [a, b] = [P[i], P[j]];
      // Arc from b back to a on this circle, sweeping clockwise on screen; the large-arc flag follows the
      // real angular span, so SVG never picks the mirrored centre. Which side a line shades does not
      // matter: the parity of "inside" is a proper 2-colouring either way.
      const ang = (p: Pt) => (Math.atan2(p[1] - C, p[0] - C) * 180) / Math.PI;
      const span = (((ang(a) - ang(b)) % 360) + 360) % 360;
      const large = span > 180 ? 1 : 0;
      return `M${a[0].toFixed(2)} ${a[1].toFixed(2)}L${b[0].toFixed(2)} ${b[1].toFixed(2)}A${R} ${R} 0 ${large} 1 ${a[0].toFixed(2)} ${a[1].toFixed(2)}Z`;
    })
    .join("");

  const cell = (m: number, k: keyof Count) => (kept[m] ? kept[m][k] : "?");

  return (
    <div className={s.wrap}>
      <svg
        viewBox="0 0 300 300"
        className={`stage-svg ${s.pic}`}
        role="img"
        aria-label={`${shown} points on a circle, ${COUNTS[shown].lines} lines, ${COUNTS[shown].crossings} crossings, ${COUNTS[shown].pieces} pieces`}
      >
        <circle cx={C} cy={C} r={R} className={s.disc} />
        {lines.length > 0 && <path d={shade} fillRule="evenodd" className={s.shade} />}
        {lines.map(([i, j]) => (
          <line key={`${i}-${j}`} x1={P[i][0]} y1={P[i][1]} x2={P[j][0]} y2={P[j][1]} className={s.line} />
        ))}
        <circle cx={C} cy={C} r={R} className={s.rim} />
        {X.map((x, k) => (
          <circle key={k} cx={x[0]} cy={x[1]} r={3.4} className={s.cross} />
        ))}
        {P.map((p, k) => (
          <circle key={k} cx={p[0]} cy={p[1]} r={6} className={s.point} />
        ))}
      </svg>
      <table className={s.table} aria-live="polite">
        <tbody>
          <tr>
            <th scope="row">points</th>
            {NS.map((m) => (
              <td key={m} className={m === shown ? s.now : ""}>
                {m}
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row">lines</th>
            {NS.map((m) => (
              <td key={m} className={m === shown ? s.now : ""}>
                {cell(m, "lines")}
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row">crossings</th>
            {NS.map((m) => (
              <td key={m} className={m === shown ? s.now : ""}>
                {cell(m, "crossings")}
              </td>
            ))}
          </tr>
          <tr className={s.piecesRow}>
            <th scope="row">pieces</th>
            {NS.map((m) => (
              <td key={m} className={m === shown ? s.now : ""}>
                {cell(m, "pieces")}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <Row>
        {CHIPS.map((m) => (
          <Control
            key={m}
            disabled={locked || m === n}
            className={`${s.chip} ${m === n ? "active" : ""}`}
            aria-pressed={m === n}
            onClick={() => pick(m)}
          >
            {m} points
          </Control>
        ))}
        <Control disabled={locked || n === 1 || phase === "reveal"} className={s.chip} onClick={() => setN(1)}>
          Reset
        </Control>
      </Row>
    </div>
  );
}
