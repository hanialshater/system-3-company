"use client";

// Supply and demand through a price cap. One market, one price line. The learner drags
// the price; the picture shows what buyers want, what bakers bake, and what actually
// changes hands (the smaller of the two). Below the crossing, cheaper means fewer loaves.
// Labelled as a model on the stage and in the question: straight lines, made-up numbers.
// v2: the cap is an explicit state (drawn as a line, the slider cannot pass it, and it is
// lifted only by its own button), the reveal is gated on pressing the cap, and the price
// button says which way it moves.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const PMIN = 2;
const PMAX = 10;
const P_STAR = 6;
const CAP = 4;
const MILESTONES = ["capped"] as const;
const demand = (p: number) => 100 - 10 * p; // loaves buyers want per day
const supply = (p: number) => 10 * p - 20; // loaves bakers bake per day

// Plot geometry (viewBox 320 × 210): quantity across (0..90), price up ($0..$10).
const L = 34;
const R = 308;
const TOP = 12;
const BOT = 180;
const QMAX = 90;
const px = (q: number) => L + (q / QMAX) * (R - L);
const py = (p: number) => BOT - (p / 10) * (BOT - TOP);

const dollars = (p: number) => `$${p % 1 === 0 ? p.toFixed(0) : p.toFixed(2)}`;

export default function SupplyDemand({ slug }: { slug: string }) {
  const [price, setPrice] = useState(P_STAR);
  const [capped, setCapped] = useState(false);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), MILESTONES);

  const want = demand(price);
  const bake = supply(price);
  const sold = Math.min(want, bake);
  const gap = Math.abs(want - bake);
  const shortage = want > bake;
  const stuck = capped && shortage && price >= CAP; // the shortage would push the price up, but the cap holds it

  const message = (locked: boolean) => {
    if (locked) return "Lock in a guess to start.";
    if (gap === 0) return "Every loaf baked is bought.";
    if (stuck) return `${gap} loaves short, and the cap stops the price rising.`;
    return shortage ? `${gap} loaves short. Buyers go without.` : `${gap} loaves go unsold.`;
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "In your toy town, bread sells for $6 and 40 loaves sell a day. The council caps the price at $4 so more people can afford it. How many loaves sell a day now?",
        options: ["More than 40", "Still 40", "Fewer than 40"],
        answer: 2,
      }}
      exploreHint="Press “Cap at $4” and read the three numbers. Then lift the cap."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At the $4 cap buyers want <strong>60</strong> loaves, but bakers bake only <strong>20</strong>. You can only
            buy a loaf someone bakes, so <strong>20</strong> sell: half as many as at $6, with a shortage of 40.
          </p>
          <p>
            In this model a lower price pulls buyers in and pushes bakers out, and the most loaves change hands at $6,
            where the lines cross. Without a cap, a shortage pushes the price up and a surplus pushes it down, toward
            that point.
          </p>
          <p className="muted">
            A toy model: straight lines, made-up numbers, nothing else changing. Real caps can also bring queues, black
            markets and lower quality. It shows one cost of a cap, not whether a cap is worth it.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const set = (p: number) => {
          const top = capped ? CAP : PMAX;
          setPrice(Math.max(PMIN, Math.min(top, Math.round(p * 2) / 2)));
        };
        const toggleCap = () => {
          if (capped) {
            setCapped(false);
            return;
          }
          setCapped(true);
          setPrice(CAP);
          reach("capped");
        };
        const yP = py(price);
        const lo = Math.min(want, bake);
        const hi = Math.max(want, bake);
        return (
          <div className={s.sd}>
            <svg viewBox="0 0 320 210" className="stage-svg" role="img" aria-label="Supply and demand for bread in a toy town">
              <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
              <line x1={L} y1={TOP} x2={L} y2={BOT} stroke="var(--line)" />
              {[2, 4, 6, 8, 10].map((p) => (
                <text key={p} x={L - 5} y={py(p) + 4} textAnchor="end" className={s.axis} fill="var(--muted)">
                  ${p}
                </text>
              ))}
              {[0, 20, 40, 60, 80].map((q) => (
                <text key={q} x={px(q)} y={BOT + 14} textAnchor="middle" className={s.axis} fill="var(--muted)">
                  {q}
                </text>
              ))}
              <text x={R} y={BOT + 27} textAnchor="end" className={s.axis} fill="var(--muted)">
                loaves a day
              </text>
              <text x={L} y={BOT + 27} className={s.axis} fill="var(--muted)">
                Toy town: made-up numbers
              </text>

              {/* Demand (buyers) and supply (bakers), drawn over their valid price range. */}
              <line x1={px(demand(PMAX))} y1={py(PMAX)} x2={px(demand(PMIN))} y2={py(PMIN)} className={s.demand} />
              <line x1={px(supply(PMIN))} y1={py(PMIN)} x2={px(supply(PMAX))} y2={py(PMAX)} className={s.supply} />
              <text x={px(demand(PMIN)) + 8} y={py(PMIN) + 14} textAnchor="end" className={s.lineLabel} fill="var(--fg)">
                buyers want
              </text>
              <text x={px(supply(PMAX)) - 8} y={py(PMAX) + 2} textAnchor="end" className={s.lineLabel} fill="var(--fg)">
                bakers bake
              </text>

              {capped && (
                <g>
                  <line x1={L} y1={py(CAP)} x2={R} y2={py(CAP)} stroke="var(--bad)" strokeWidth={1.5} strokeDasharray="8 3" />
                  <text x={R} y={py(CAP) - 5} textAnchor="end" className={s.capLabel} fill="var(--bad)">
                    price cap $4
                  </text>
                </g>
              )}

              {/* The price line: sold (solid) and the gap (dashed). */}
              <line x1={L} y1={yP} x2={R} y2={yP} stroke="var(--line)" strokeWidth={1} />
              {lo > 0 && <line x1={px(0)} y1={yP} x2={px(lo)} y2={yP} stroke="var(--good)" strokeWidth={6} strokeLinecap="round" />}
              {gap > 0 && (
                <line
                  x1={px(lo)}
                  y1={yP}
                  x2={px(hi)}
                  y2={yP}
                  stroke={shortage ? "var(--bad)" : "var(--warn)"}
                  strokeWidth={4}
                  strokeDasharray="5 4"
                />
              )}
              <circle cx={px(want)} cy={yP} r={5} className={s.demandDot} />
              <circle cx={px(bake)} cy={yP} r={5} className={s.supplyDot} />
              <text x={px(lo / 2)} y={yP - 9} textAnchor="middle" className={s.sold} fill="var(--good)">
                {lo > 0 ? `${sold} sold` : ""}
              </text>
              {gap > 0 && (
                <text
                  x={px((lo + hi) / 2)}
                  y={yP + 18}
                  textAnchor="middle"
                  className={s.sold}
                  fill={shortage ? "var(--bad)" : "var(--warn)"}
                >
                  {shortage ? `shortage: ${gap}` : `surplus: ${gap}`}
                </text>
              )}
            </svg>

            <p className={s.msg} aria-live="polite">
              {message(locked)}
            </p>

            <Row>
              <Readout label="Want" value={want} />
              <Readout label="Baked" value={bake} />
              <Readout label="Sold" value={<span className={s.good}>{sold}</span>} />
            </Row>
            <Slider
              label={capped ? "Price per loaf (cap: $4 at most)" : "Price per loaf"}
              value={price}
              min={PMIN}
              max={capped ? CAP : PMAX}
              step={0.5}
              disabled={locked}
              format={dollars}
              onChange={set}
            />
            <Row>
              <Control className={capped ? "active" : ""} disabled={locked} aria-pressed={capped} onClick={toggleCap}>
                {capped ? "Lift the cap" : "Cap at $4"}
              </Control>
              <Control
                disabled={locked || gap === 0 || stuck}
                onClick={() => set(price + (shortage ? 0.5 : -0.5))}
                aria-label={shortage ? "Shortage: the price rises 50 cents" : "Surplus: the price falls 50 cents"}
              >
                {shortage ? "Shortage: price rises $0.50" : "Surplus: price falls $0.50"}
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
