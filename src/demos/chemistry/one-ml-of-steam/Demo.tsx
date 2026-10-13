"use client";

// 1 mL of water at 100 °C under a free piston at 1 atm, drawn as 30 molecules in a cylinder
// whose height is on a log scale of volume. Boiling a share of the water moves those molecules
// into the gas above, and the piston rises to the volume they need as an ideal gas:
// all of it boiled fills about 1,630 mL. Same molecules, about 1,600 times the room.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const R = 0.082057; // L atm/(mol K)
const T = 373.15; // K
const P = 1; // atm
const RHO = 0.9584; // g/mL, liquid water at 100 °C
const M = 18.015; // g/mol
const STEAM_ML = ((RHO / M) * R * T * 1000) / P; // mL of steam from 1 mL of liquid, about 1,629
const STEAM_10 = Math.round(STEAM_ML / 10) * 10; // 1,630
const vol = (f: number) => (1 - f) * 1 + f * STEAM_ML; // mL at boiled fraction f
const N_MOL = 30;
const NAMES = ["all-steam"] as const;
// Layout only (not evidence): fixed scatter of where each molecule sits in the gas.
const rng = mulberry32(7);
const SPOTS = Array.from({ length: N_MOL }, () => ({ u: rng(), x: rng() }));

const W = 320;
const H = 230;
const BOT = 212;
const TOPY = 12;
const V0 = 0.5;
const V1 = 3000;
const Y = (v: number) => BOT - ((Math.log10(v) - Math.log10(V0)) / (Math.log10(V1) - Math.log10(V0))) * (BOT - TOPY);
const CX0 = 120;
const CX1 = 230;
const fmt = (v: number) => (v < 10 ? v.toFixed(1) : Math.round(v).toLocaleString("en-US"));

export default function OneMlOfSteam({ slug }: { slug: string }) {
  const [pct, setPct] = useState(0);
  const [most, setMost] = useState(0);
  const f = pct / 100;
  const v = vol(f);
  const nGas = Math.round(N_MOL * f);
  const nLiq = N_MOL - nGas;
  const yPiston = Y(Math.max(v, 1));

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "1 mL of liquid water boils to steam at 100 °C and normal air pressure (1 atm). The steam fills about…",
        options: ["2 mL", "20 mL", `${STEAM_10.toLocaleString("en-US")} mL`],
        answer: 2,
      }}
      exploreHint="Boil all the water and watch where the piston goes."
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            {most >= 100 ? "You saw" : "Boil it all and you see"} the same {N_MOL} molecules push the piston from 1 mL to about{" "}
            <strong>{STEAM_10.toLocaleString("en-US")} mL</strong>: about {Math.round(STEAM_ML / 100) * 100} times the room.
          </p>
          <p>
            Boiling does not make molecules bigger or change them. In the liquid they touch their neighbours; in steam at 1
            atm each one has on average about 1,600 times as much space, so the gas is mostly empty. That is why a little
            water makes so much steam, and why steam is invisible until it cools into droplets.
          </p>
          <p className="muted">Ideal gas at 100 °C and 1 atm; real steam takes about 2% less room.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const set = (p: number) => {
              setPct(p);
              setMost((m) => Math.max(m, p));
              if (p >= 100) reach("all-steam");
            };
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={`${pct}% boiled: the ${N_MOL} molecules fill about ${fmt(v)} mL`}
                >
                  {[1, 10, 100, 1000].map((t) => (
                    <g key={t}>
                      <line x1={CX0 - 6} x2={CX1 + 6} y1={Y(t)} y2={Y(t)} className={s.grid} />
                      <text x={CX0 - 10} y={Y(t) + 3} textAnchor="end" className={s.small}>
                        {t.toLocaleString("en-US")} mL
                      </text>
                    </g>
                  ))}
                  <path d={`M ${CX0} ${TOPY - 4} V ${BOT} H ${CX1} V ${TOPY - 4}`} className={s.wall} />
                  {/* liquid pool in the bottom band (below 1 mL) */}
                  {nLiq > 0 && <rect x={CX0 + 1} y={Y(1)} width={CX1 - CX0 - 2} height={BOT - Y(1)} className={s.liquid} />}
                  {Array.from({ length: nLiq }, (_, i) => (
                    <circle key={`l${i}`} cx={CX0 + 7 + (i % 15) * 6.9} cy={BOT - 5 - Math.floor(i / 15) * 6.5} r={3} className={s.mol} />
                  ))}
                  {SPOTS.slice(0, nGas).map((sp, i) => (
                    <circle
                      key={`g${i}`}
                      cx={CX0 + 8 + sp.x * (CX1 - CX0 - 16)}
                      cy={Y(1) - 6 - sp.u * (Y(1) - 6 - (yPiston + 8))}
                      r={3}
                      className={s.mol}
                    />
                  ))}
                  <rect x={CX0 + 1} y={yPiston - 7} width={CX1 - CX0 - 2} height={7} className={s.piston} />
                  <line x1={(CX0 + CX1) / 2} x2={(CX0 + CX1) / 2} y1={yPiston - 7} y2={TOPY - 8} className={s.rod} />
                  <text x={CX1 + 10} y={yPiston} className={s.label}>
                    {fmt(v)} mL
                  </text>
                  <text x={W / 2} y={H - 3} textAnchor="middle" className={s.small}>
                    log scale · ideal gas, 100 °C, 1 atm
                  </text>
                </svg>
                <Row>
                  <Control onClick={() => set(100)} disabled={locked || pct >= 100}>
                    Boil it all
                  </Control>
                </Row>
                <Slider label="Boiled" value={pct} min={0} max={100} step={10} disabled={locked} format={(p) => `${p}%`} onChange={set} />
                <Row>
                  <Readout label="Volume" value={`about ${fmt(v)} mL`} />
                  <Readout label="Molecules" value={N_MOL} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
