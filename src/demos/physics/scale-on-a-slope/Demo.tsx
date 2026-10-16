"use client";

// A bathroom scale on a ramp. The scale measures only the push straight into its platform, the normal
// force N = m g cos(theta), and shows it as N / g in kg. 70 kg reads 70.0 kg flat, 60.6 kg at 30° and
// 35.0 kg at 60°. The along-slope part m g sin(theta) (343 N at 30°, needing mu >= 0.58) is held by
// friction; at 60° it would need mu >= 1.73, so the scale rests against a stop block.
// Brief: company/domains/briefs/physics.md round 4, #66. Numbers: artifacts/scratch/cm-physics-r4/check.mjs
// (block "64 scale-on-a-slope").
//
// One picture: a ramp, a person on a scale, the weight arrow (no word) split into "into the ramp" (the
// cause; the scale shows its value) and "along the ramp". The stage starts flat at 70 kg with the
// "Back to flat" chip active and disabled (brief); its milestone fires only when pressed later.
// Stage word budget (Ruling r3, closed list): controls 5, readout "35.0 kg" 1, arrow labels 6,
// "stop block" 2 (60° only), Seen row 4, caption 4 = 22. No "weight" label, no "Seen:" prefix.
// Earned reveal: milestones "tilt30" (the question's case), "tilt60", "flat". QA path (DOM order):
// Tilt 30°, Tilt 60°, Back to flat.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const MASS = 70; // kg
type Angle = 0 | 30 | 60;
const MILESTONES = ["tilt30", "tilt60", "flat"] as const;
const reads = (th: number) => MASS * Math.cos((th * Math.PI) / 180);
const fmt = (kg: number) => kg.toFixed(1);

const W = 320;
const H = 190;
const GY = 182; // ground
const BX = 168; // where the scale sits on the ramp surface
const BY = 128;
const WLEN = 62; // weight arrow length (70 kg)

export default function ScaleOnASlope({ slug }: { slug: string }) {
  const [th, setTh] = useState<Angle>(0);
  const [moved, setMoved] = useState(false); // false until the first tilt: "Back to flat" starts disabled
  const [seen, setSeen] = useState<{ t30?: number; t60?: number; flat?: number }>({});

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "On flat ground your bathroom scale reads 70 kg. You stand on it on a 30° ramp, not slipping. It reads about...",
        options: ["35 kg", "61 kg", "70 kg"],
        answer: 1,
      }}
      exploreHint="Tilt the ramp and watch the scale and the two arrows."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            On the 30° ramp your scale read <strong>{seen.t30 !== undefined ? fmt(seen.t30) : "?"} kg</strong>, and at 60° only{" "}
            {seen.t60 !== undefined ? fmt(seen.t60) : "?"} kg, though you still weighed 70 kg. A scale measures only the push
            straight into its surface.
          </p>
          <p>
            On a slope your weight splits in two: part presses into the scale (the arrow into the ramp), and part pulls you
            down the slope, held by friction. The steeper the slope, the smaller the push into it.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (a: Angle) => {
              setTh(a);
              const r = reads(a);
              if (a === 30) {
                setSeen((x) => ({ ...x, t30: x.t30 ?? r }));
                reach("tilt30");
              } else if (a === 60) {
                setSeen((x) => ({ ...x, t60: x.t60 ?? r }));
                reach("tilt60");
              } else if (moved) {
                setSeen((x) => ({ ...x, flat: x.flat ?? r }));
                reach("flat");
              }
              if (a !== 0) setMoved(true);
            };
            const rad = (th * Math.PI) / 180;
            const c = Math.cos(rad);
            const sn = Math.sin(rad);
            const kg = reads(th);
            // ramp: surface through (BX, BY) at angle th, rising to the right
            const leftX = th === 0 ? 8 : BX - (GY - BY) / Math.tan(rad);
            const upLen = th === 0 ? W - 8 - BX : Math.min((W - 8 - BX) / c, (BY - 8) / sn);
            const topX = BX + upLen * c;
            const topY = BY - upLen * sn;
            const ramp = th === 0 ? `M8,${BY} L${W - 8},${BY} L${W - 8},${GY} L8,${GY} Z` : `M${Math.max(8, leftX)},${GY} L${topX},${topY} L${topX},${GY} Z`;
            // centre of mass and the weight split (screen coords, y down)
            const FY = BY - 8 / c; // top of the scale under the person's feet
            const comX = BX;
            const comY = FY - 36;
            const intoX = comX + WLEN * c * sn;
            const intoY = comY + WLEN * c * c;
            const alongX = comX - WLEN * sn * c;
            const alongY = comY + WLEN * sn * sn;
            const seenText = [
              `30°: ${seen.t30 !== undefined ? `${fmt(seen.t30)} kg` : "–"}`,
              `60°: ${seen.t60 !== undefined ? `${fmt(seen.t60)} kg` : "–"}`,
              `flat: ${seen.flat !== undefined ? `${fmt(seen.flat)} kg` : "–"}`,
            ].join(" · ");
            const alt = locked
              ? "A person standing on a bathroom scale on flat ground. The scale reads 70.0 kilograms."
              : `${th === 0 ? "Flat ground" : `A ${th} degree ramp`}. The person's weight arrow splits into a part into the ramp and a part along the ramp. The scale reads ${fmt(kg)} kilograms.${th === 60 ? " The scale rests against a stop block." : ""}`;
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={alt}>
                  <defs>
                    {[
                      ["ss-w", s.headW],
                      ["ss-in", s.headIn],
                      ["ss-al", s.headAl],
                    ].map(([id, cls]) => (
                      <marker key={id} id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                        <path d="M0,0 L10,5 L0,10 z" className={cls} />
                      </marker>
                    ))}
                  </defs>

                  <path d={ramp} className={s.ramp} />
                  <line x1={8} y1={GY} x2={W - 8} y2={GY} className={s.ground} />

                  {/* scale on the surface, and the stop block at 60° */}
                  <g transform={`rotate(${-th} ${BX} ${BY})`}>
                    <rect x={BX - 22} y={BY - 8} width={44} height={8} rx={2} className={s.scale} />
                    {th === 60 && <rect x={BX - 34} y={BY - 14} width={11} height={14} rx={1.5} className={s.stop} />}
                  </g>
                  {th === 60 && (
                    <text x={BX - 40} y={GY - 6} textAnchor="end" className={s.lab}>
                      stop block
                    </text>
                  )}

                  {/* person, upright, feet on the scale */}
                  <g className={s.person}>
                    <circle cx={BX} cy={FY - 64} r={7} />
                    <line x1={BX} y1={FY - 57} x2={BX} y2={FY - 28} />
                    <line x1={BX} y1={FY - 50} x2={BX - 9} y2={FY - 34} />
                    <line x1={BX} y1={FY - 50} x2={BX + 9} y2={FY - 34} />
                    <line x1={BX} y1={FY - 28} x2={BX - 6} y2={FY + 6 * Math.tan(rad)} />
                    <line x1={BX} y1={FY - 28} x2={BX + 6} y2={FY - 6 * Math.tan(rad)} />
                  </g>

                  {/* weight (no word), then its two parts */}
                  {!locked && (
                    <>
                      <line x1={comX} y1={comY} x2={comX} y2={comY + WLEN} className={s.weight} markerEnd="url(#ss-w)" />
                      <line x1={comX} y1={comY} x2={intoX} y2={intoY} className={s.into} markerEnd="url(#ss-in)" />
                      <text x={intoX + 6} y={intoY + 14} className={s.labIn}>
                        into the ramp
                      </text>
                      {th !== 0 && (
                        <>
                          <line x1={comX} y1={comY} x2={alongX} y2={alongY} className={s.along} markerEnd="url(#ss-al)" />
                          <text x={alongX - 4} y={alongY + 14} textAnchor="end" className={s.lab}>
                            along the ramp
                          </text>
                        </>
                      )}
                    </>
                  )}

                  {/* the scale's display, tied to the scale */}
                  <line x1={56} y1={36} x2={BX - 10} y2={BY - 6} className={s.leader} />
                  <rect x={14} y={14} width={84} height={28} rx={6} className={s.display} />
                  <text x={56} y={33} textAnchor="middle" className={s.read}>
                    {fmt(kg)} kg
                  </text>
                </svg>

                <p className={s.caption}>At rest, not slipping.</p>
                <p className={s.seen}>{seenText}</p>

                <Row>
                  <Control className={th === 30 ? "active" : ""} disabled={locked || th === 30} onClick={() => pick(30)}>
                    Tilt 30°
                  </Control>
                  <Control className={th === 60 ? "active" : ""} disabled={locked || th === 60} onClick={() => pick(60)}>
                    Tilt 60°
                  </Control>
                  <Control className={th === 0 ? "active" : ""} disabled={locked || th === 0} onClick={() => pick(0)}>
                    Back to flat
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
