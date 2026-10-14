"use client";

// Counting by groups. One drop of water (about 0.05 mL, 0.998 g/mL, 18.015 g/mol) holds about 1.7e21 molecules.
// Each grouping step makes a tile stand for 1,000 times as many molecules as before (step s: 1,000^s per tile).
// Tiles can only be drawn once there are few enough (step 6 and 7); earlier steps show a texture and the count.
// Key states (milestones): step 4 (10^12 per tile: still about 1.7e9 tiles) and step 7 (10^21 per tile: about 1.7 tiles).

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const NA = 6.02214076e23;
const DROP_ML = 0.05;
const RHO = 0.998; // g/mL
const M_H2O = 18.015; // g/mol
const MOLECULES = ((DROP_ML * RHO) / M_H2O) * NA; // about 1.67e21
const POPULATION = 8e9;
const MID = 4;
const TOP = 7;
const MILESTONES = ["mid", "top"] as const;

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const sci = (v: number) => {
  const e = Math.floor(Math.log10(v));
  const m = v / 10 ** e;
  if (e <= 0) return m.toFixed(1);
  return `${m.toFixed(1)} × 10${String(e)
    .split("")
    .map((c) => SUP[Number(c)])
    .join("")}`;
};
const perTile = (step: number) => 1000 ** step;
const tiles = (step: number) => MOLECULES / perTile(step);
const perTileLabel = (step: number) => (step === 0 ? "1" : step === 1 ? "1,000" : `10${String(step * 3).split("").map((c) => SUP[Number(c)]).join("")}`);


export default function Drop({ slug }: { slug: string }) {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(false);
  const autoStep = useRef<() => boolean>(() => true);
  // "Group automatically" regroups by 1,000 one step at a time, so every step is seen.
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => {
      if (autoStep.current()) setAuto(false);
    }, 300);
    return () => clearInterval(id);
  }, [auto]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A drop of water (about ${DROP_ML} mL, about ${DROP_ML} g) contains about how many H₂O molecules?`,
        options: ["About 10⁹ (a billion)", "About 10¹⁵", "About 10²¹"],
        answer: 2,
      }}
      exploreHint="Group the molecules in thousands, one step at a time, until the tiles can be counted."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Even with {perTileLabel(MID)} molecules in each tile, the drop still needed about <strong>{sci(tiles(MID))}</strong> tiles. Only at {perTileLabel(TOP)} per tile did it
            shrink to about <strong>{sci(tiles(TOP))}</strong>.
          </p>
          <p>
            So one drop holds about <strong>{sci(MOLECULES)}</strong> molecules, roughly {(MOLECULES / POPULATION / 1e11).toFixed(1)} × 10¹¹ times the number of people on Earth (about 8 billion).
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              setStep(v);
              if (v === MID) reach("mid");
              if (v === TOP) reach("top");
            };
            autoStep.current = () => {
              if (step >= TOP) return true;
              set(step + 1);
              return step + 1 >= TOP;
            };
            const t = tiles(step);
            const drawable = step >= 6;
            const count = Math.ceil(t);
            const CELL = Math.min(60, Math.sqrt((294 * 96) / count));
            const COLS = Math.floor(294 / CELL);
            const cells: { x: number; y: number; w: number }[] = [];
            if (drawable && !locked) {
              for (let i = 0; i < count; i++) {
                const frac = i === count - 1 ? t - Math.floor(t) || 1 : 1;
                cells.push({ x: 12 + (i % COLS) * CELL, y: 24 + Math.floor(i / COLS) * CELL, w: frac });
              }
            }
            return (
              <div className={s.wrap}>
                <p className={s.chip}>
                  {locked
                    ? "One drop ≈ 0.05 mL. Each tile = a group of molecules."
                    : `One drop: 0.05 g ÷ 18 g per mole ≈ 0.0028 mol; × 6.0 × 10²³ per mole ≈ ${sci(MOLECULES)} molecules. Each tile = a group of them.`}
                </p>
                <svg viewBox="0 0 320 150" className="stage-svg" role="img" aria-label={locked ? "Drop of water" : `Step ${step}: ${sci(t)} tiles`}>
                  <defs>
                    <pattern id="drop-texture" width="6" height="6" patternUnits="userSpaceOnUse">
                      <circle cx="3" cy="3" r="1.4" fill="var(--domain)" />
                    </pattern>
                  </defs>
                  <text x={12} y={14} className={s.axis}>
                    {locked ? "the drop" : drawable ? `${sci(t)} tiles` : "too many tiles to draw"}
                  </text>
                  {!drawable && <rect x={12} y={24} width={294} height={70} fill={locked ? "var(--bg-2)" : "url(#drop-texture)"} stroke="var(--line)" opacity={locked ? 1 : Math.max(0.25, 1 - step / 7)} />}
                  {cells.map((c, i) => (
                    <rect key={i} x={c.x} y={c.y} width={(CELL - 1) * c.w} height={CELL - 1} className={s.main} />
                  ))}
                  <text x={12} y={130} className={s.small}>
                    {locked ? "" : `each tile = ${perTileLabel(step)} molecule${step === 0 ? "" : "s"}`}
                  </text>
                </svg>
                <Row>
                  <Readout label="Steps of ×1,000" value={locked ? "?" : step} />
                  <Readout label="Tiles to count" value={locked ? "?" : sci(t)} />
                </Row>
                <Row>
                  <Readout label="Drop ÷ Earth's 8 billion people" value={locked ? "?" : `${sci(MOLECULES / POPULATION)} times`} />
                </Row>
                <Row>
                  <Control disabled={locked || auto || step >= TOP} onClick={() => setAuto(true)}>
                    Group automatically
                  </Control>
                  <Control disabled={locked || auto || step >= TOP} onClick={() => set(step + 1)}>
                    Group by 1,000
                  </Control>
                  <Control disabled={locked || auto || step === 0} onClick={() => set(0)}>
                    Ungroup
                  </Control>
                </Row>
                <Slider label="Steps of ×1,000" value={step} min={0} max={TOP} step={1} disabled={locked || auto} onChange={set} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
