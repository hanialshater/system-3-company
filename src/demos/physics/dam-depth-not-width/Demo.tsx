"use client";

// Depth, not width. Still fresh water (1000 kg/m^3) in a container whose width the learner
// picks from a 2 cm tube to a 500 m lake, and whose depth runs 2-20 m. Gauge pressure at
// the bottom is P = rho g h: 98.1 kPa at 10 m for every width. Side view: depth on a true
// scale (6 px per m); widths are NOT to scale (the stage says so) because a 2 cm tube and a
// 500 m lake cannot share one honest horizontal scale on a phone.
//
// Earned reveal: milestones "width-changed" (a different width seen at 10 m depth) and
// "depth-changed". QA path: width slider first (index 2 -> 4), then the depth slider (10 -> 14 m).

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const RHO = 1000;
const G = 9.81;
const pKpa = (h: number) => (RHO * G * h) / 1000;
const fmtP = (h: number) => `${pKpa(h).toFixed(1)} kPa`;
const WIDTHS = [
  { m: 0.02, label: "2 cm tube", px: 6 },
  { m: 0.5, label: "0.5 m tank", px: 30 },
  { m: 5, label: "5 m pool", px: 70 },
  { m: 50, label: "50 m pond", px: 140 },
  { m: 500, label: "500 m lake", px: 240 },
];
const BASE_DEPTH = 10;

const W = 320;
const H = 160;
const BOTTOM = 136;
const K = 6; // px per m depth
const CX = 170;

export default function DamDepthNotWidth({ slug }: { slug: string }) {
  const [wi, setWi] = useState(2);
  const [depth, setDepth] = useState(BASE_DEPTH);
  const [widthsAt10, setWidthsAt10] = useState<number[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A wide lake is ${BASE_DEPTH} m deep. A thin tube of water stands ${BASE_DEPTH} m tall. At the bottom, which has the greater water pressure?`,
        options: ["The lake", "The tube", "The same"],
        answer: 2,
      }}
      exploreHint="Change the width at 10 m deep, then change the depth."
      minInteractions={2}
      reveal={() => {
        const seen = widthsAt10.map((i) => WIDTHS[i].label);
        return (
          <>
            <p>
              At {BASE_DEPTH} m deep the gauge read <strong>{fmtP(BASE_DEPTH)}</strong> for the{" "}
              {seen.length ? seen.join(", ") : "every width"}: width changed nothing. Changing the depth to {depth} m
              changed it to {fmtP(depth)}.
            </p>
            <p>
              Pressure at a point is the weight of the water column straight above each square metre: ρ × g × h = 1000 ×
              9.81 × {BASE_DEPTH} = {fmtP(BASE_DEPTH)}. A wider lake has more columns side by side, not taller ones.
            </p>
            <p className="muted">
              The lake&apos;s whole bottom carries far more total force, spread over far more area. Gauge pressure: air
              pressure on top not counted.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["width-changed", "depth-changed"]}>
          {(reach) => {
            const w = WIDTHS[wi];
            const left = CX - w.px / 2;
            const top = BOTTOM - depth * K;
            const wallTop = BOTTOM - 20 * K - 4;
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`${w.label}, ${depth} m deep`}>
                  {/* depth ruler */}
                  {[0, 5, 10, 15, 20].map((m) => (
                    <g key={m}>
                      <line x1={30} y1={BOTTOM - m * K} x2={36} y2={BOTTOM - m * K} className={s.tick} />
                      <text x={27} y={BOTTOM - m * K + 3} textAnchor="end" className={s.tickLabel}>
                        {m}
                      </text>
                    </g>
                  ))}
                  <line x1={36} y1={BOTTOM} x2={36} y2={BOTTOM - 20 * K} className={s.tick} />
                  <text x={4} y={10} className={s.chip}>
                    Depth to scale (m); widths not to scale. Fresh water.
                  </text>
                  <rect x={left} y={top} width={w.px} height={depth * K} className={s.water} />
                  <path d={`M${left},${wallTop} L${left},${BOTTOM} L${left + w.px},${BOTTOM} L${left + w.px},${wallTop}`} className={s.wall} />
                  <line x1={left - 6} y1={top} x2={left + w.px + 6} y2={top} className={s.surface} />
                  {/* gauge at the bottom */}
                  <circle cx={CX} cy={BOTTOM} r={4} className={s.gauge} />
                  <text x={CX} y={BOTTOM + 14} textAnchor="middle" className={s.reading}>
                    {locked ? "? kPa" : fmtP(depth)}
                  </text>
                </svg>

                <Slider
                  label="Width"
                  value={wi}
                  min={0}
                  max={WIDTHS.length - 1}
                  step={1}
                  disabled={locked}
                  format={(i) => WIDTHS[i].label}
                  onChange={(i) => {
                    setWi(i);
                    if (depth === BASE_DEPTH) {
                      setWidthsAt10((xs) => {
                        const base = xs.length ? xs : [wi];
                        return base.includes(i) ? base : [...base, i];
                      });
                      reach("width-changed");
                    }
                  }}
                />
                <Slider
                  label="Depth"
                  value={depth}
                  min={2}
                  max={20}
                  step={2}
                  disabled={locked}
                  format={(v) => `${v} m`}
                  onChange={(v) => {
                    setDepth(v);
                    reach("depth-changed");
                  }}
                />
                <Row>
                  <Readout label="Bottom pressure" value={locked ? "?" : fmtP(depth)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
