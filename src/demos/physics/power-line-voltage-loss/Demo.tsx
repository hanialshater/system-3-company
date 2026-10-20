"use client";

// Same 10 kW, three voltages. The village draws P = 10 kW; the current is I = P / V, and the cable
// (0.5 ohm in total) turns I² R into heat. 230 V: 43.48 A, 945 W lost. 2,300 V: 4.35 A, 9.45 W.
// 23,000 V: 0.43 A, 0.09 W. A tenth of the current wastes a hundredth of the heat.
// Brief: company/domains/briefs/physics.md round 4, #68. Numbers: artifacts/scratch/cm-physics-r4/check.mjs
// (block "66 power-line-voltage-loss").
//
// One picture: a station, one cable and a village. The cable glows with the heat loss (on a log scale,
// since the losses span four orders of magnitude) and carries readouts for current and watts lost.
// Moving dots in the cable stand for the current (the cause): their number is proportional to it.
// No voltage is picked at first: the cable is dark and the readouts show "–".
// Stage word budget (Ruling r3, closed list): controls 3, "station" "village" "10 kW" 3, readouts
// "0.43 A" "0.09 W lost" 3, Seen row 8, caption 4 = 21. No "Seen:" prefix.
// Earned reveal: milestones "v230", "v2300" (the question's case), "v23000". QA path (DOM order):
// 230 V, 2,300 V, 23,000 V.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const P_LOAD = 10_000; // W
const R_CABLE = 0.5; // ohm, whole cable
const VOLTS = [230, 2300, 23000] as const;
type V = (typeof VOLTS)[number];
const MILESTONES = ["v230", "v2300", "v23000"] as const;
const amps = (v: number) => P_LOAD / v;
const lossW = (v: number) => amps(v) ** 2 * R_CABLE;
const fmtA = (a: number) => (a >= 10 ? a.toFixed(1) : a.toFixed(2));
const fmtW = (w: number) => (w >= 100 ? w.toFixed(0) : w >= 1 ? w.toFixed(1) : w.toFixed(2));
const fmtV = (v: number) => v.toLocaleString("en-GB");

const W = 320;
const H = 140;
const CY = 66; // cable height
const X1 = 64; // cable leaves the station
const X2 = 252; // cable reaches the village
const DOT_PER_A = 0.46; // dots per amp (43.5 A -> 20 dots, 4.35 A -> 2, 0.43 A -> 1)
const FLOW_PX_S = 24; // every dot moves at the same speed, so the dot count carries the current

export default function PowerLineVoltageLoss({ slug }: { slug: string }) {
  const [v, setV] = useState<V | null>(null);
  const [seen, setSeen] = useState<Partial<Record<V, { a: number; w: number }>>>({});

  const rA = (k: V) => (seen[k] ? fmtA(seen[k]!.a) : "?");
  const rW = (k: V) => (seen[k] ? fmtW(seen[k]!.w) : "?");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You run the power line for a small grid. A village draws the same 10 kW through the same cable. You send it at 10 times the voltage. What happens to the cable's heat loss?",
        options: ["10 times more", "About the same", "one hundredth as much"],
        answer: 2,
      }}
      exploreHint="Send the power at each voltage and read the cable."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At 230 V your cable carried {rA(230)} A and wasted {rW(230)} W as heat. At 2,300 V the same 10 kW needed only{" "}
            {rA(2300)} A, and the cable wasted <strong>{rW(2300)} W</strong>: one hundredth as much.
          </p>
          <p>
            Power is voltage times current, so a higher voltage delivers the same power with less current. Cable heating goes as
            current squared, so a tenth of the current wastes a hundredth of the heat. That is why long-distance lines run at
            high voltage.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (k: V) => {
              setV(k);
              setSeen((x) => ({ ...x, [k]: x[k] ?? { a: amps(k), w: lossW(k) } }));
              reach(`v${k}`);
            };
            const a = v ? amps(v) : 0;
            const w = v ? lossW(v) : 0;
            // glow: log scale from 0.09 W (faint) to 945 W (full)
            const glow = v ? Math.max(0.06, Math.min(1, (Math.log10(w) + 1.2) / 4.2)) : 0;
            const nDots = v ? Math.max(1, Math.round(a * DOT_PER_A)) : 0;
            const span = X2 - X1;
            const seenText = [
              `230 V: ${seen[230] ? `${fmtA(seen[230]!.a)} A, ${fmtW(seen[230]!.w)} W` : "–"}`,
              `2,300\u00a0V: ${seen[2300] ? `${fmtA(seen[2300]!.a)} A, ${fmtW(seen[2300]!.w)} W` : "–"}`,
              `23,000\u00a0V: ${seen[23000] ? `${fmtW(seen[23000]!.w)} W` : "–"}`,
            ].join(" · ");
            const alt = locked
              ? "A power station joined by one dark cable to a village that draws 10 kilowatts. No voltage is picked."
              : v
                ? `Sent at ${fmtV(v)} volts. The cable carries ${fmtA(a)} amps and loses ${fmtW(w)} watts as heat.`
                : "Pick a voltage to send the power at.";
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={alt}>
                  <defs>
                    <clipPath id="pl-clip">
                      <rect x={X1} y={CY - 5} width={X2 - X1} height={10} />
                    </clipPath>
                  </defs>

                  {/* station */}
                  <g>
                    <rect x={14} y={CY - 26} width={44} height={44} rx={3} className={s.building} />
                    <rect x={22} y={CY - 44} width={9} height={18} className={s.building} />
                    <path d={`M30,${CY - 4} l-6,10 h6 l-4,10 l12,-14 h-6 l4,-6 z`} className={s.bolt} />
                    <text x={36} y={CY + 32} textAnchor="middle" className={s.lab}>
                      station
                    </text>
                  </g>

                  {/* cable: glow follows the heat loss; dots stand for the current */}
                  <line x1={X1} y1={CY} x2={X2} y2={CY} className={s.glowWide} style={{ opacity: glow * 0.45 }} />
                  <line x1={X1} y1={CY} x2={X2} y2={CY} className={s.glow} style={{ opacity: glow }} />
                  <line x1={X1} y1={CY} x2={X2} y2={CY} className={s.cable} />
                  {v && (
                    <g clipPath="url(#pl-clip)">
                      <g
                        key={v}
                        className={s.dots}
                        style={{ ["--step" as string]: `${span / nDots}px`, animationDuration: `${(span / nDots / FLOW_PX_S).toFixed(2)}s` }}
                      >
                        {Array.from({ length: nDots + 1 }, (_, i) => (
                          <circle key={i} cx={X1 + (span * (i - 0.5)) / nDots} cy={CY} r={2.2} className={s.dot} />
                        ))}
                      </g>
                    </g>
                  )}
                  <line x1={X1} y1={CY} x2={X2} y2={CY} className={s.cableEdge} />

                  {/* cable readouts */}
                  <text x={(X1 + X2) / 2} y={CY - 12} textAnchor="middle" className={s.read}>
                    {v ? `${fmtA(a)} A` : "–"}
                  </text>
                  <text x={(X1 + X2) / 2} y={CY + 22} textAnchor="middle" className={s.readLoss}>
                    {v ? `${fmtW(w)} W lost` : "–"}
                  </text>

                  {/* village */}
                  <g>
                    {[0, 1, 2].map((i) => (
                      <path
                        key={i}
                        d={`M${258 + i * 18},${CY + 16} v-16 l8,-8 l8,8 v16 z`}
                        className={s.house}
                      />
                    ))}
                    <text x={284} y={CY - 16} textAnchor="middle" className={s.lab}>
                      10 kW
                    </text>
                    <text x={284} y={CY + 32} textAnchor="middle" className={s.lab}>
                      village
                    </text>
                  </g>
                </svg>

                <p className={s.caption}>Cable 0.5 Ω, values illustrative.</p>
                <p className={s.seen}>{seenText}</p>

                <Row>
                  {VOLTS.map((k) => (
                    <Control key={k} className={v === k ? "active" : ""} disabled={locked || v === k} onClick={() => pick(k)}>
                      {fmtV(k)} V
                    </Control>
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
