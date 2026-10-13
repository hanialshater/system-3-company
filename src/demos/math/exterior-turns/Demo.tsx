"use client";

// Exterior turns. A regular polygon with n sides (slider 3 to 12). At every corner a dashed
// "straight on" line continues the side you arrive on, and an arc marks the turn onto the next
// side: 360/n each. "Gather the turns" copies all n turns to the centre, where they close into
// one full circle. Readouts compute turn per corner and n x turn from n.
// Key states: three different side counts seen; the turns gathered at the centre.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const MIN_N = 3;
const MAX_N = 12;
const NEED = 3;
const MILESTONES = ["three-shapes", "gathered"] as const;
const CX = 150;
const CY = 122;
const RAD = 78;
const W = 300;
const H = 244;

const turn = (n: number) => 360 / n;
const deg = (d: number) => (Number.isInteger(d) ? `${d}°` : `${d.toFixed(1)}°`);

type Pt = { x: number; y: number };
function vertices(n: number): Pt[] {
  return Array.from({ length: n }, (_, i) => {
    const a = ((-90 + (i * 360) / n) * Math.PI) / 180;
    return { x: CX + RAD * Math.cos(a), y: CY + RAD * Math.sin(a) };
  });
}
const unit = (a: Pt, b: Pt) => {
  const L = Math.hypot(b.x - a.x, b.y - a.y);
  return { x: (b.x - a.x) / L, y: (b.y - a.y) / L };
};
function wedge(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p0 = { x: cx + r * Math.cos(a0), y: cy + r * Math.sin(a0) };
  const p1 = { x: cx + r * Math.cos(a1), y: cy + r * Math.sin(a1) };
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M${cx},${cy} L${p0.x.toFixed(2)},${p0.y.toFixed(2)} A${r},${r} 0 ${large} 1 ${p1.x.toFixed(2)},${p1.y.toFixed(2)} Z`;
}

export default function ExteriorTurns({ slug }: { slug: string }) {
  const [n, setN] = useState(MIN_N);
  const [gathered, setGathered] = useState(false);
  const seen = useRef(new Set<number>([MIN_N]));
  const [seenList, setSeenList] = useState<number[]>([MIN_N]);

  const record = (m: number, reach: (name: string) => void) => {
    seen.current.add(m);
    setSeenList([...seen.current].sort((a, b) => a - b));
    if (seen.current.size >= NEED) reach("three-shapes");
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Walk round a shape with straight sides, turning at each corner, until you face the way you started. Your total turning is...",
        options: ["180°", "360°", "More for more sides"],
        answer: 1,
      }}
      exploreHint={`Try at least ${NEED} different numbers of sides, then gather the turns.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>360°, one full turn, whatever the number of sides.</strong> You saw{" "}
            {seenList.map((m) => `${m} × ${deg(turn(m))}`).join(", ")}: the same total each time.
          </p>
          <p>
            More sides means more corners, but each turn is smaller. Gathered at one point the turns close into exactly one
            circle, because walking all the way round and facing forward again is one full spin. This holds for any shape
            that only bulges outward, not just these equal-sided ones.
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
              gathered={gathered}
              onN={(m) => {
                setN(m);
                record(m, reach);
              }}
              onGather={() => {
                setGathered(!gathered);
                reach("gathered");
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
  gathered,
  onN,
  onGather,
}: {
  locked: boolean;
  n: number;
  gathered: boolean;
  onN: (n: number) => void;
  onGather: () => void;
}) {
  const vs = vertices(n);
  const t = turn(n);
  const ext = 30;
  const arcR = 17;
  const colours = [s.wA, s.wB];

  const corners = vs.map((v, i) => {
    const prev = vs[(i - 1 + n) % n];
    const next = vs[(i + 1) % n];
    const din = unit(prev, v);
    const dout = unit(v, next);
    const a0 = Math.atan2(din.y, din.x);
    let a1 = Math.atan2(dout.y, dout.x);
    while (a1 < a0) a1 += 2 * Math.PI;
    return { v, din, a0, a1 };
  });

  const caption = locked
    ? "Make a prediction to start."
    : gathered
      ? `All ${n} turns moved to the centre.`
      : "Dashed: straight on. Arc: the turn onto the next side.";

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        <polygon points={vs.map((v) => `${v.x.toFixed(2)},${v.y.toFixed(2)}`).join(" ")} className={s.poly} />
        {corners.map(({ v, din, a0, a1 }, i) => (
          <g key={i}>
            <line x1={v.x} y1={v.y} x2={v.x + din.x * ext} y2={v.y + din.y * ext} className={s.ext} />
            {!locked && <path d={wedge(v.x, v.y, arcR, a0, a1)} className={colours[i % 2]} />}
          </g>
        ))}
        {!locked && (
          <text
            x={corners[0].v.x + Math.cos((corners[0].a0 + corners[0].a1) / 2) * (arcR + 14)}
            y={corners[0].v.y + Math.sin((corners[0].a0 + corners[0].a1) / 2) * (arcR + 14)}
            className={s.lbl}
          >
            {deg(t)}
          </text>
        )}
        {gathered &&
          corners.map(({ a0, a1 }, i) => {
            const start = -Math.PI / 2 + (i * 2 * Math.PI) / n;
            return <path key={`g${i}`} d={wedge(CX, CY, 34, start, start + (a1 - a0))} className={`${colours[i % 2]} ${s.gather}`} />;
          })}
        {vs.map((v, i) => (
          <circle key={`v${i}`} cx={v.x} cy={v.y} r={3} className={s.dot} />
        ))}
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <Slider label="Sides" value={n} min={MIN_N} max={MAX_N} disabled={locked} onChange={onN} />
      <Row>
        <Control disabled={locked} className={gathered ? "active" : ""} aria-pressed={gathered} onClick={onGather}>
          {gathered ? "Put the turns back" : "Gather the turns"}
        </Control>
        <Readout label="Total turning" value={locked ? "?" : `${n} × ${deg(t)} = ${Math.round(n * t)}°`} />
      </Row>
    </div>
  );
}
