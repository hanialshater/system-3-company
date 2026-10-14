"use client";

// Attention weights share one total. Three word arrows (unit vectors) at 0°, 90°, 180°;
// a query arrow the learner rotates. Score = dot product = cos(angle between); weights =
// softmax of the scores. At 45°: 44.6 / 44.6 / 10.8%. Pointing straight at A gives A only
// 66.5%. The weights always sum to 100%, so lifting one lowers the others. The blend arrow
// is the weighted average of the word arrows.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const KEYS = [
  { name: "A", deg: 0 },
  { name: "B", deg: 90 },
  { name: "C", deg: 180 },
];
const rad = (d: number) => (d * Math.PI) / 180;

function attend(queryDeg: number) {
  const scores = KEYS.map((k) => Math.cos(rad(queryDeg - k.deg)));
  const e = scores.map((x) => Math.exp(x));
  const z = e.reduce((a, b) => a + b, 0);
  const weights = e.map((x) => x / z);
  const blend = KEYS.reduce(
    (acc, k, i) => [acc[0] + weights[i] * Math.cos(rad(k.deg)), acc[1] + weights[i] * Math.sin(rad(k.deg))],
    [0, 0],
  );
  return { scores, weights, blend };
}
// MODEL END

// Geometry (viewBox 320 × 230).
const CX = 160;
const CY = 112;
const RAD = 82;
const pt = (deg: number, r: number) => [CX + r * Math.cos(rad(deg)), CY - r * Math.sin(rad(deg))];
const COLORS = ["var(--domain)", "var(--warn)", "var(--good)"];
const pct = (x: number) => `${(100 * x).toFixed(1)}%`;

function Arrow({ deg, len, color, width, dash }: { deg: number; len: number; color: string; width: number; dash?: string }) {
  const [x, y] = pt(deg, len);
  const [hx1, hy1] = pt(deg + 160, 9).map((v, i) => v - (i === 0 ? CX : CY));
  const [hx2, hy2] = pt(deg - 160, 9).map((v, i) => v - (i === 0 ? CX : CY));
  return (
    <g stroke={color} fill={color}>
      <line x1={CX} y1={CY} x2={x} y2={y} strokeWidth={width} strokeDasharray={dash} />
      <path d={`M${x},${y} L${x + hx1},${y + hy1} L${x + hx2},${y + hy2} Z`} stroke="none" />
    </g>
  );
}

export default function AttentionSharesOne({ slug }: { slug: string }) {
  const [q, setQ] = useState(45);
  const at = attend(q);
  const blendLen = Math.hypot(at.blend[0], at.blend[1]);
  const blendDeg = (Math.atan2(at.blend[1], at.blend[0]) * 180) / Math.PI;

  const message = (locked: boolean) => {
    if (locked) return "Lock in a guess to start.";
    if (q % 360 === 0) return "Pointing straight at A, yet A gets about two thirds.";
    if (q === 45) return "Midway: A and B tie, and C still keeps a slice.";
    return "Rotate the query. Watch the shares trade.";
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Each word is an arrow: A at 0°, B at 90°, C at 180°. A query arrow points midway between A and B. Each word scores by how well its arrow lines up with the query; scores are then turned into shares of one total. A's share is about:",
        options: ["100%", "45%", "33%"],
        answer: 1,
      }}
      exploreHint="Press both buttons to see each case, then rotate the query yourself."
      minInteractions={2}
      reveal={() => {
        const mid = attend(45);
        const atA = attend(0);
        return (
          <>
            <p>
              At 45° the scores are 0.71, 0.71 and −0.71. A step called softmax turns scores into shares of one total: A{" "}
              <strong>{pct(mid.weights[0])}</strong>, B {pct(mid.weights[1])}, C {pct(mid.weights[2])}. A shares with B,
              and even C keeps a slice.
            </p>
            <p>
              Point the query straight at A and A gets just <strong>{pct(atA.weights[0])}</strong>. The shares
              always add to 100%, so lifting one word&apos;s weight must lower the others. The blend arrow, the weighted
              average of the word arrows, is what attention passes on.
            </p>
            <p className="muted">
              Real transformers compute softmax(QKᵀ/√d)·V. This toy uses unit arrows in 2-D and skips the √d scaling.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["on-A", "midway"]}>
          {(reach) => {
            const go = (v: number) => {
              setQ(v);
              if (v === 0) reach("on-A");
              if (v === 45) reach("midway");
            };
            return (
        <div className={s.wrap}>
          <svg viewBox="0 0 320 230" className="stage-svg" role="img" aria-label={`Query at ${q} degrees`}>
            <circle cx={CX} cy={CY} r={RAD} fill="none" stroke="var(--line)" strokeDasharray="3 4" />
            {KEYS.map((k, i) => {
              const [lx, ly] = pt(k.deg, RAD + 10);
              const anchor = k.deg === 0 ? "start" : k.deg === 180 ? "end" : "middle";
              return (
                <g key={k.name}>
                  <Arrow deg={k.deg} len={RAD} color={COLORS[i]} width={locked ? 2 : 1.5 + 7 * at.weights[i]} />
                  <text x={lx} y={k.deg === 90 ? ly - 2 : ly + 5} textAnchor={anchor} className={s.word} fill={COLORS[i]}>
                    {k.name}
                    {!locked && <tspan className={s.small} fill="var(--fg)">{` ${pct(at.weights[i])}`}</tspan>}
                  </text>
                </g>
              );
            })}
            <Arrow deg={q} len={RAD} color="var(--fg)" width={2.5} dash="5 3" />
            {!locked && <Arrow deg={blendDeg} len={RAD * blendLen} color="var(--bad)" width={3.5} />}

            {/* One bar: the three weights as shares of one total. */}
            {(() => {
              let x0 = 20;
              return KEYS.map((k, i) => {
                const w = locked ? 280 / 3 : 280 * at.weights[i];
                const el = (
                  <rect key={k.name} x={x0} y={212} width={Math.max(0, w - 1)} height={14} rx={3} fill={COLORS[i]} opacity={locked ? 0.25 : 1} />
                );
                x0 += w;
                return el;
              });
            })()}
          </svg>
          <p className={s.msg} aria-live="polite">
            {message(locked)}
          </p>
          {!locked && (
            <p className={s.msg}>
              Scores: {at.scores.map((x, i) => `${KEYS[i].name} ${x.toFixed(2).replace("-", "−")}`).join(" · ")}
            </p>
          )}
          <Row>
            <Control disabled={locked} onClick={() => go(0)}>
              Query on A (0°)
            </Control>
            <Control disabled={locked} onClick={() => go(45)}>
              Query midway (45°)
            </Control>
          </Row>
          <Slider
            label="Query direction"
            value={q}
            min={0}
            max={355}
            step={5}
            format={(v) => `${v}°`}
            disabled={locked}
            onChange={go}
          />
          <Row>
            <Readout label="A's share" value={locked ? "?" : pct(at.weights[0])} />
            <Readout label="Total" value={locked ? "?" : pct(at.weights.reduce((a, b) => a + b, 0))} />
            <span className={s.legend}>
              <i className={s.q} /> query <i /> blend of the words
            </span>
          </Row>
        </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
