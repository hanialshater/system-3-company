"use client";

// One block floating in a tank of fresh water at 0 °C. The learner sets the block's density.
// A floating block sinks until it pushes aside its own weight of water, so the share under
// water is density / water density (Archimedes). The share above is drawn and labelled.
// Key state: the block set to ice (0.917 g/cm³): a slim cap of about 8% shows above the line,
// far from the "half" tick. Milestone `ice`; the "Ice" button is the first control.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const RHO_W = 0.9998; // g/cm³, fresh water at 0 °C
const RHO_ICE = 0.9167; // g/cm³, ice at 0 °C
const HALF = 0.5;
const START = 0.3;
const NAMES = ["ice"] as const;

const above = (rho: number) => 1 - rho / RHO_W;
const pct = (x: number) => `${Math.round(x * 100)}%`;
const ICE_ABOVE = above(RHO_ICE);

const W = 320;
const H = 190;
const SURF = 84;
const BH = 86; // block height
const BW = 90;
const BX = 115;

export default function EightPercentShowing({ slug }: { slug: string }) {
  const [rho, setRho] = useState(START);
  const a = above(rho);
  const top = SURF - a * BH;
  const isIce = Math.abs(rho - RHO_ICE) < 0.0005;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Ice has a density of about ${RHO_ICE.toFixed(3)} g/cm³, fresh water about ${RHO_W.toFixed(3)} g/cm³ (density: grams per cm³). A floating ice block shows about what share above the water?`,
        options: [`about ${pct(ICE_ABOVE)}`, "about 50%", `about ${pct(1 - ICE_ABOVE)}`],
        answer: 0,
      }}
      exploreHint="Try some densities, then make the block ice."
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            Your ice block floated with only <strong>about {pct(ICE_ABOVE)}</strong> above the line, far below the
            half mark. Lighter blocks rode higher.
          </p>
          <p>
            A floating block sinks until the water it pushes aside weighs as much as the block. Ice is {RHO_ICE.toFixed(3)}{" "}
            of water&apos;s density, so about {pct(1 - ICE_ABOVE)} of it must sit under water. That is why icebergs hide
            most of their bulk.
          </p>
          <p className="muted">Fresh water at 0 °C. In denser sea water about 11% shows.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const set = (v: number) => {
              setRho(v);
              if (Math.abs(v - RHO_ICE) < 0.0005) reach("ice");
            };
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={`Block of density ${rho.toFixed(3)}: ${pct(a)} above water`}>
                  <rect x={10} y={SURF} width={W - 20} height={H - SURF - 8} className={s.water} />
                  <rect x={BX} y={top} width={BW} height={BH} className={isIce ? s.ice : s.block} />
                  <line x1={BX - 6} x2={BX + BW + 6} y1={top + BH / 2} y2={top + BH / 2} className={s.half} />
                  <text x={BX - 10} y={top + BH / 2 + 4} textAnchor="end" className={s.small}>
                    half
                  </text>
                  <line x1={10} x2={W - 10} y1={SURF} y2={SURF} className={s.surface} />
                  <text x={BX + BW + 10} y={Math.max(14, (top + SURF) / 2 + 5)} className={s.big}>
                    {pct(a)} above
                  </text>
                  <text x={16} y={H - 14} className={s.small}>
                    fresh water, {RHO_W.toFixed(3)} g/cm³
                  </text>
                </svg>
                <Slider
                  label="Block density (g/cm³)"
                  value={rho}
                  min={0.1}
                  max={0.99}
                  step={0.01}
                  onChange={(v) => set(Math.round(v * 100) / 100)}
                  disabled={locked}
                  format={(v) => v.toFixed(3)}
                />
                <Row>
                  <Control onClick={() => set(HALF)} disabled={locked || rho === HALF}>
                    {HALF.toFixed(2)} block
                  </Control>
                  <Control onClick={() => set(RHO_ICE)} disabled={locked || isIce} className={isIce ? "active" : ""}>
                    Ice, {RHO_ICE.toFixed(3)}
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
