"use client";

// Snowshoes. A 70 kg hiker (weight 686.7 N) stands on snow; pressure P = F / A over the
// contact area of both feet. Boots, 0.040 m^2: 17.2 kPa. Snowshoes, 0.40 m^2: 1.72 kPa,
// ten times the area, a tenth of the pressure. The snow is a toy: it holds up to 3 kPa
// (illustrative) and above that the foot sinks by an illustrative 40 cm x (1 - 3 kPa / P).
// Side view: shoe length drawn proportional to area (500 px per m^2), sinking 1.5 px per cm,
// and a pressure bar (6 px per kPa) with the snow's limit marked.
//
// Earned reveal: milestone "stays-on-top" (pressure at or below the snow's limit).
// QA path: "Snowshoes" is the first enabled control.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const M = 70;
const F = M * G; // 686.7 N
const BOOTS = 0.04;
const SHOES = 0.4;
const LIMIT = 3; // kPa, illustrative
const kPa = (a: number) => F / a / 1000;
const sinkCm = (a: number) => (kPa(a) > LIMIT ? 40 * (1 - LIMIT / kPa(a)) : 0);
const fmtP = (p: number) => `${p.toFixed(p < 10 ? 2 : 1)} kPa`;
const fmtA = (a: number) => `${a.toFixed(2)} m²`;

const W = 320;
const H = 152;
const SURF = 70;
const FOOT_X = 136;
const PX_PER_M2 = 500;
const PX_PER_CM = 1.5;
const BAR_X = 292;
const BAR_BASE = 138;
const BAR_K = 3.6; // px per kPa

export default function SnowshoePressure({ slug }: { slug: string }) {
  const [area, setArea] = useState(BOOTS);
  const [best, setBest] = useState<number | null>(null);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Hiking in deep snow, you weigh ${M} kg and your boots (${fmtA(BOOTS)} on the snow) press on it at about ${kPa(BOOTS).toFixed(0)} kPa. You strap on snowshoes with ${fmtA(SHOES)}. About what is the pressure now?`,
        options: ["17 kPa", "1.7 kPa", "0.17 kPa"],
        answer: 1,
      }}
      exploreHint="Widen the contact area from boots to snowshoes. Watch the foot and the pressure bar."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            At {fmtA(best ?? SHOES)} the pressure fell to <strong>{fmtP(kPa(best ?? SHOES))}</strong>, under what this snow
            holds, and the foot stopped sinking. In boots it was {fmtP(kPa(BOOTS))}. Same hiker, same {F.toFixed(0)} N of
            weight.
          </p>
          <p>
            Pressure is force divided by area: {F.toFixed(0)} N ÷ {fmtA(SHOES)} = {fmtP(kPa(SHOES))}. Ten times the area
            gives a tenth of the pressure. Snow gives way where each square metre is pressed too hard.
          </p>
          <p className="muted">The snow&apos;s 3 kPa limit and the sinking depths are made up for the picture.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["sinks", "stays-on-top"]}>
          {(reach) => {
            const choose = (a: number) => {
              const v = Math.round(a * 100) / 100;
              setArea(v);
              if (kPa(v) > LIMIT) reach("sinks");
              if (kPa(v) <= LIMIT) {
                setBest((b) => (b === null ? v : b));
                reach("stays-on-top");
              }
            };
            const p = kPa(area);
            const sink = locked ? 0 : sinkCm(area) * PX_PER_CM;
            const len = area * PX_PER_M2;
            const shoeY = SURF + sink;
            const barH = Math.min(p, 20) * BAR_K;
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Contact ${fmtA(area)}${locked ? "" : `, ${fmtP(p)}`}`}>
                  <rect x={0} y={SURF} width={BAR_X - 24} height={H - SURF} className={s.snow} />
                  <line x1={0} y1={SURF} x2={BAR_X - 24} y2={SURF} className={s.surface} />
                  {sink > 0 && <rect x={FOOT_X - len / 2} y={SURF} width={len} height={sink} className={s.hole} />}
                  {/* leg and shoe */}
                  <rect x={FOOT_X - 8} y={shoeY - 44} width={16} height={38} rx={5} className={s.leg} />
                  <rect x={FOOT_X - len / 2} y={shoeY - 6} width={len} height={6} rx={2} className={s.shoe} />
                  <text x={FOOT_X} y={shoeY + 14} textAnchor="middle" className={s.label}>
                    {fmtA(area)}
                  </text>
                  {!locked && sink > 0 && (
                    <text x={FOOT_X + len / 2 + 6} y={SURF + sink / 2 + 3} className={s.sinkLabel}>
                      sinks {sinkCm(area).toFixed(0)} cm
                    </text>
                  )}
                  {/* pressure bar */}
                  <line x1={BAR_X - 10} y1={BAR_BASE} x2={BAR_X + 10} y2={BAR_BASE} className={s.axis} />
                  {!locked && <rect x={BAR_X - 7} y={BAR_BASE - barH} width={14} height={barH} className={p > LIMIT ? s.barOver : s.barOk} />}
                  <line x1={BAR_X - 12} y1={BAR_BASE - LIMIT * BAR_K} x2={BAR_X + 12} y2={BAR_BASE - LIMIT * BAR_K} className={s.limit} />
                  <text x={BAR_X - 14} y={BAR_BASE - LIMIT * BAR_K + 3} textAnchor="end" className={s.limitLabel}>
                    snow limit 3 kPa
                  </text>
                  <text x={BAR_X} y={BAR_BASE + 11} textAnchor="middle" className={s.chip}>
                    kPa
                  </text>
                  <text x={4} y={12} className={s.chip}>
                    {M} kg hiker, both feet. Toy snow.
                  </text>
                </svg>

                <Slider label="Contact area" value={area} min={0.04} max={0.4} step={0.04} disabled={locked} format={fmtA} onChange={choose} />
                <Row>
                  <Control className={area === BOOTS ? "active" : ""} disabled={locked || area === BOOTS} onClick={() => choose(BOOTS)}>
                    Boots
                  </Control>
                  <Control className={area === SHOES ? "active" : ""} disabled={locked || area === SHOES} onClick={() => choose(SHOES)}>
                    Snowshoes
                  </Control>
                </Row>
                <Row>
                  <Readout label="Weight (70 kg pulls down)" value={`${F.toFixed(0)} N`} />
                  <Readout label="Pressure" value={locked ? "?" : fmtP(p)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
