"use client";

// Pentagon gap. Pick a regular shape; as many copies as fit without overlapping are placed corner
// to corner around one dot. Each corner is (n-2)*180/n degrees, computed below, and the leftover
// wedge (or, after "Squeeze in one more", the overlap) is drawn and labelled from the same numbers.
// Key state: the pentagon gap seen, and at least one shape that closes the full turn.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

type Shape = { n: number; name: string };
// Pentagons first: QA presses controls in DOM order, and the pentagon is the key state.
const SHAPES: Shape[] = [
  { n: 5, name: "Pentagons" },
  { n: 3, name: "Triangles" },
  { n: 4, name: "Squares" },
  { n: 6, name: "Hexagons" },
];
const MILESTONES = ["pentagon-gap", "closed-turn"] as const;

const corner = (n: number) => ((n - 2) * 180) / n;
const fits = (n: number) => Math.floor(360 / corner(n) + 1e-9);

const W = 300;
const H = 230;
const CX = W / 2;
const CY = H / 2;
const REACH = 100; // farthest vertex from the dot, in px

type P = [number, number];
const rad = (d: number) => (d * Math.PI) / 180;
const pt = (r: number, deg: number): P => [CX + r * Math.cos(rad(deg)), CY - r * Math.sin(rad(deg))];

/** Regular n-gon with one corner on the dot, its corner spanning [d0, d0 + corner]. */
function tile(n: number, d0: number): P[] {
  const e = 360 / n;
  const pts: [number, number][] = [[0, 0]];
  // unit side, walk counter-clockwise
  let x = 0;
  let y = 0;
  for (let i = 0; i < n - 1; i++) {
    x += Math.cos(rad(d0 + i * e));
    y += Math.sin(rad(d0 + i * e));
    pts.push([x, y]);
  }
  const far = Math.max(...pts.map(([a, b]) => Math.hypot(a, b)));
  const k = REACH / far;
  return pts.map(([a, b]) => [CX + a * k, CY - b * k]);
}

function wedge(r: number, a0: number, a1: number) {
  const [x0, y0] = pt(r, a0);
  const [x1, y1] = pt(r, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M${CX},${CY} L${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 0 ${x1.toFixed(1)},${y1.toFixed(1)} Z`;
}

type Seen = { n: number; extra: boolean };

export default function PentagonGap({ slug }: { slug: string }) {
  const [shape, setShape] = useState<number | null>(null);
  const [extra, setExtra] = useState(false);
  const [seen, setSeen] = useState<Seen[]>([]);

  const note = (n: number, ex: boolean) =>
    setSeen((old) => {
      const i = old.findIndex((x) => x.n === n);
      if (i < 0) return [...old, { n, extra: ex }];
      if (ex && !old[i].extra) return old.map((x, j) => (j === i ? { ...x, extra: true } : x));
      return old;
    });

  const p = corner(5);
  const pk = fits(5);
  const pent = seen.find((x) => x.n === 5);
  const closers = seen.filter((x) => x.n !== 5);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A regular pentagon's corner is ${p}°. Can regular pentagons cover a floor with no gaps or overlaps?`,
        options: ["Yes", "No", "Only if some are rotated"],
        answer: 1,
      }}
      exploreHint="Try pentagons around the dot, then a shape that closes."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>No.</strong>{" "}
            {pent
              ? `You saw ${pk} pentagons make ${pk * p}°, leaving a ${360 - pk * p}° gap${pent.extra ? `, and a fourth overlap by ${(pk + 1) * p - 360}°` : " too thin for a fourth"}.`
              : `${pk} pentagons make ${pk * p}°, leaving a ${360 - pk * p}° gap.`}{" "}
            {closers.length > 0 &&
              `Your ${closers.map((x) => SHAPES.find((q) => q.n === x.n)!.name.toLowerCase()).join(", ")} closed exactly: ${closers
                .map((x) => `${fits(x.n)} × ${corner(x.n)}°`)
                .join(", ")}.`}
          </p>
          <p>
            Where tile corners meet at a point, they must fill a full turn, 360°, exactly. {corner(3)}, {corner(4)} and{" "}
            {corner(6)} divide 360; {p} does not. (Corners meeting against another tile's straight edge must fill 180°, and{" "}
            {p} does not divide that either.)
          </p>
          <p>Rotating a pentagon does not change its {p}° corners, so no arrangement of them closes the turn.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (n: number) => {
              setShape(n);
              setExtra(false);
              note(n, false);
              reach(n === 5 ? "pentagon-gap" : "closed-turn");
            };
            const squeeze = () => {
              if (shape === null) return;
              setExtra(!extra);
              if (!extra) note(shape, true);
            };
            return (
              <Stage locked={locked} shape={shape} extra={extra} onPick={pick} onSqueeze={squeeze} />
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  shape,
  extra,
  onPick,
  onSqueeze,
}: {
  locked: boolean;
  shape: number | null;
  extra: boolean;
  onPick: (n: number) => void;
  onSqueeze: () => void;
}) {
  const n = shape ?? 0;
  const a = shape ? corner(n) : 0;
  const k = shape ? fits(n) : 0;
  const used = k * a;
  const gap = 360 - used;
  const over = (k + 1) * a - 360;
  const name = SHAPES.find((x) => x.n === shape)?.name.toLowerCase() ?? "";

  let caption = "Make a prediction to start.";
  if (!locked && shape === null) caption = "Pick a shape. Copies fill around the dot, corner to corner.";
  if (shape !== null && !extra)
    caption = gap > 1e-9 ? `${k} × ${a}° = ${used}°. A ${gap}° gap is left.` : `${k} × ${a}° = 360°. The turn closes exactly.`;
  if (shape !== null && extra) caption = `${k + 1} × ${a}° = ${(k + 1) * a}°: ${over}° of overlap.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`${k} ${name} around a point`}>
        {shape !== null && gap > 1e-9 && !extra && <path d={wedge(REACH * 0.62, used, 360)} className={s.gap} />}
        {shape !== null &&
          Array.from({ length: k }, (_, i) => (
            <polygon key={`${n}-${i}`} points={tile(n, i * a).map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")} className={s.tile} />
          ))}
        {shape !== null && extra && (
          <>
            <polygon points={tile(n, k * a).map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")} className={s.extra} />
            <path d={wedge(REACH * 0.5, 0, over)} className={s.overlap} />
          </>
        )}
        <circle cx={CX} cy={CY} r={5} className={s.dot} />
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <Row>
        {SHAPES.map((x) => (
          <Control
            key={x.n}
            disabled={locked || x.n === shape}
            className={x.n === shape ? "active" : ""}
            aria-pressed={x.n === shape}
            onClick={() => onPick(x.n)}
          >
            {x.name}
          </Control>
        ))}
      </Row>
      <Row>
        <Control disabled={locked || shape === null} className={extra ? "active" : ""} aria-pressed={extra} onClick={onSqueeze}>
          {extra ? "Take the extra one out" : "Squeeze in one more"}
        </Control>
      </Row>
    </div>
  );
}
