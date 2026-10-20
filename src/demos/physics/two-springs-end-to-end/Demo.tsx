"use client";

// Springs in series and parallel. Hooke's law F = k x; one spring stretches 5 cm under
// 1 kg (9.81 N), so k = 196.2 N/m. In a chain each spring carries the full 9.81 N and
// stretches 5 cm (total 10 cm); side by side each carries 4.905 N and stretches 2.5 cm.
// Drawn at 4 px per cm of stretch; the dashed line marks where the mass would hang with no
// weight on the springs, so the bracket is the stretch.
//
// Earned reveal: milestones "parallel" and "series". QA path: one spring is the start
// (disabled); then Side by side, then End to end, the question's state.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const MASS = 1; // kg
const LOAD = MASS * G; // N
const K = LOAD / 0.05; // N/m, from "5 cm under 1 kg"
const RIGS = [
  { name: "One spring", n: 1, series: true },
  { name: "Side by side", n: 2, series: false },
  { name: "End to end", n: 2, series: true },
];
const PARALLEL = 1;
const SERIES = 2;
/** Pull on each spring (N) and stretch of each (cm), total drop (cm). */
const rig = (i: number) => {
  const r = RIGS[i];
  const pull = r.series ? LOAD : LOAD / r.n;
  const each = (100 * pull) / K;
  const drop = r.series ? each * r.n : each;
  return { pull, each, drop };
};
const cm = (x: number) => `${Number.isInteger(Math.round(x * 10) / 10) ? x.toFixed(0) : x.toFixed(1)} cm`;

const W = 320;
const H = 176;
const TOP = 14;
const CX = 140;
const L0 = 34; // px, unstretched spring
const PXCM = 4;

function spring(x: number, y0: number, len: number) {
  const coils = 8;
  const pts = [`M ${x} ${y0}`, `L ${x} ${y0 + 4}`];
  for (let i = 0; i < coils; i++) {
    const y = y0 + 4 + ((i + 0.5) * (len - 8)) / coils;
    pts.push(`L ${x + (i % 2 ? -6 : 6)} ${y.toFixed(1)}`);
  }
  pts.push(`L ${x} ${y0 + len - 4}`, `L ${x} ${y0 + len}`);
  return pts.join(" ");
}

export default function TwoSpringsEndToEnd({ slug }: { slug: string }) {
  const [idx, setIdx] = useState(0);
  const r = RIGS[idx];
  const { pull, each, drop } = rig(idx);
  const ser = rig(SERIES);
  const par = rig(PARALLEL);
  const one = rig(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Hanging a planter, you find one spring stretches 5 cm under a 1 kg mass. You hook two of the same springs end to end under the same 1 kg. How far do they stretch in total?",
        options: ["2.5 cm", "5 cm", "10 cm"],
        answer: 2,
      }}
      exploreHint="Try the springs side by side and end to end; watch each spring's pull."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            End to end, each spring carried the whole {ser.pull.toFixed(2)} N and stretched {cm(ser.each)}, so the mass dropped{" "}
            <strong>{cm(ser.drop)}</strong>. Side by side, each carried {par.pull.toFixed(2)} N and the mass dropped only{" "}
            <strong>{cm(par.drop)}</strong>.
          </p>
          <p>
            A spring stretches in proportion to its pull. In a chain the lower spring hangs from the upper one, so both feel
            the full weight: the stretches add and the pair is half as stiff. Side by side they share the weight and the pair
            is twice as stiff.
          </p>
          <p className="muted">Identical, weightless springs within their elastic range.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["parallel", "series"]}>
          {(reach) => {
            const go = (i: number) => {
              if (locked || i === idx) return;
              setIdx(i);
              if (i === PARALLEL) reach("parallel");
              if (i === SERIES) reach("series");
            };
            const sp = L0 + each * PXCM; // stretched spring length, px
            const unloadedBottom = TOP + (r.series ? r.n * L0 : L0 + 4);
            const massTop = TOP + (r.series ? r.n * sp : sp + 4);
            const springs: { x: number; y: number }[] = r.series
              ? Array.from({ length: r.n }, (_, i) => ({ x: CX, y: TOP + i * sp }))
              : [{ x: CX - 16, y: TOP }, { x: CX + 16, y: TOP }];
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`${r.name}: the mass drops ${cm(drop)}`}>
                  <line x1={CX - 50} y1={TOP} x2={CX + 50} y2={TOP} className={s.ceiling} />
                  {springs.map((p, i) => (
                    <g key={i}>
                      <path d={spring(p.x, p.y, sp)} className={s.spring} />
                      {!locked && (
                        <text x={r.series ? CX - 14 : p.x + (i ? 12 : -12)} y={p.y + sp / 2 + 3} textAnchor="end" className={s.each}>
                          {r.series ? `${pull.toFixed(2)} N` : i === 0 ? `${pull.toFixed(2)} N each` : ""}
                        </text>
                      )}
                    </g>
                  ))}
                  {!r.series && <line x1={CX - 22} y1={TOP + sp + 2} x2={CX + 22} y2={TOP + sp + 2} className={s.bar} />}
                  {/* mass */}
                  <line x1={CX} y1={massTop - 4} x2={CX} y2={massTop} className={s.hook} />
                  <rect x={CX - 16} y={massTop} width={32} height={22} rx={3} className={s.mass} />
                  <text x={CX} y={massTop + 15} textAnchor="middle" className={s.massText}>
                    1 kg
                  </text>
                  {/* stretch bracket */}
                  <line x1={CX - 40} y1={unloadedBottom} x2={CX + 60} y2={unloadedBottom} className={s.unloaded} />
                  <text x={CX + 62} y={unloadedBottom + 3} className={s.chip}>
                    no weight
                  </text>
                  <line x1={CX + 40} y1={unloadedBottom} x2={CX + 40} y2={massTop} className={s.bracket} />
                  {!locked && (
                    <text x={CX + 46} y={(unloadedBottom + massTop) / 2 + 9} className={s.drop}>
                      drop {cm(drop)}
                    </text>
                  )}
                  <text x={4} y={H - 4} className={s.chip}>
                    Identical, weightless springs. N: newtons of pull.
                  </text>
                </svg>

                <Row>
                  {RIGS.map((q, i) => (
                    <Control key={q.name} className={i === idx ? "active" : ""} disabled={locked || i === idx} aria-pressed={i === idx} onClick={() => go(i)}>
                      {q.name}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Mass drops" value={locked ? "?" : cm(drop)} />
                  <Readout label="Pull on each spring" value={locked ? "?" : `${pull.toFixed(2)} N`} />
                  <Readout label="One spring alone" value={cm(one.drop)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
