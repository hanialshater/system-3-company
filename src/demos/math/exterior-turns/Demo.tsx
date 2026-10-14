"use client";

// Exterior turns. A regular polygon with n sides (slider 3 to 12). At every corner a dashed
// "straight on" line continues the side you arrive on, and an arc marks the turn onto the next
// side: 360/n each. "Gather the turns" copies all n turns to the centre, where they close into
// one full circle. Readouts compute turn per corner and n x turn from n.
// Key states: three different side counts seen; the turns gathered at the centre.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useEffect, useRef, useState } from "react";
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
const deg = (d: number) => {
  const r = Math.round(d * 10) / 10;
  return Number.isInteger(r) ? `${r}°` : `${r.toFixed(1)}°`;
};

type Pt = { x: number; y: number };
// Regular: equal steps round a circle. Lopsided: the same circle but unequal steps (still convex, so
// the shape only bulges outward); the turn at a corner is half the two steps either side of it.
function vertices(n: number, lop: boolean): Pt[] {
  const w = Array.from({ length: n }, (_, i) => (lop ? 1 + 0.7 * Math.sin(i * 2.1 + 1) : 1));
  const total = w.reduce((a, b) => a + b, 0);
  let acc = -90;
  return Array.from({ length: n }, (_, i) => {
    const a = (acc * Math.PI) / 180;
    acc += (360 * w[i]) / total;
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
  const [lop, setLop] = useState(false);
  const seen = useRef(new Set<number>());
  const [seenList, setSeenList] = useState<number[]>([]);

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
            {seenList.map((m) => `${m} × ${deg(turn(m))}`).join(", ")}: the same total each time.{" "}
            {lop ? "The lopsided shape had unequal turns, and they still added to 360°." : ""}
          </p>
          <p>
            More sides means more corners, but each turn is smaller. Gathered at one point the turns close into exactly one
            circle, because walking all the way round and facing forward again is one full spin. This holds for any shape
            that only bulges outward, not just equal-sided ones.
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
              lop={lop}
              seenList={seenList}
              onLop={() => setLop(!lop)}
              onUnlockedSeen={(m) => record(m, reach)}
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
  lop,
  seenList,
  onLop,
  onUnlockedSeen,
  onN,
  onGather,
}: {
  locked: boolean;
  n: number;
  gathered: boolean;
  lop: boolean;
  seenList: number[];
  onLop: () => void;
  onUnlockedSeen: (n: number) => void;
  onN: (n: number) => void;
  onGather: () => void;
}) {
  // the first shape counts as seen only once its turns are visible (not while locked)
  useEffect(() => {
    if (!locked) onUnlockedSeen(n);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked]);
  const vs = vertices(n, lop);
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
    return { v, din, a0, a1, turnDeg: ((a1 - a0) * 180) / Math.PI };
  });
  const t = corners[0].turnDeg;
  const sumTurns = Math.round(corners.reduce((a, c) => a + c.turnDeg, 0));

  const caption = locked
    ? "Make a prediction to start."
    : gathered
      ? `All ${n} turns moved to the centre.`
      : lop
        ? "Lopsided: the turns differ, but each is the angle between straight on and the next side."
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
        {!locked && lop && n <= 8 &&
          corners.slice(1).map(({ v, a0, a1, turnDeg }, i) => (
            <text
              key={`l${i}`}
              x={v.x + Math.cos((a0 + a1) / 2) * (arcR + 14)}
              y={v.y + Math.sin((a0 + a1) / 2) * (arcR + 14)}
              className={s.lbl}
            >
              {deg(turnDeg)}
            </text>
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
            const start = -Math.PI / 2 + corners.slice(0, i).reduce((acc, c) => acc + (c.a1 - c.a0), 0);
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
        <Control disabled={locked} className={lop ? "active" : ""} aria-pressed={lop} onClick={onLop}>
          {lop ? "Make it regular" : "Lopsided shape"}
        </Control>
      </Row>
      <Row>
        <Readout label="Total turning" value={locked ? "?" : lop ? `${n} turns = ${sumTurns}°` : `${n} × ${deg(t)} = ${sumTurns}°`} />
        <Readout label="Sides tried" value={locked ? "?" : seenList.join(", ")} />
      </Row>
    </div>
  );
}
