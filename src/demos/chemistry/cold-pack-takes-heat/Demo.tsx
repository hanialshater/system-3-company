"use client";

// Insulated beaker: 500 g water at 20 °C, scoops of NH4NO3 (0.25 mol = 20 g each).
// Dissolving absorbs 25.7 kJ/mol. dT = q / (total mass × 4.18 J/(g K)).
// Key state (milestone `all`): the full 1.0 mol (80 g) dissolved, the water about 11 °C colder.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const WATER_G = 500;
const T0 = 20;
const SCOOPS = 4;
const MOL_PER_SCOOP = 0.25;
const G_PER_SCOOP = 80 / SCOOPS;
const KJ_PER_MOL = 25.7;
const CP = 4.18; // J/(g K)
const drop = (n: number) => (n * MOL_PER_SCOOP * KJ_PER_MOL * 1000) / ((WATER_G + n * G_PER_SCOOP) * CP);
const temp = (n: number) => T0 - drop(n);
const NAMES = ["all"] as const;
const FULL_DROP = drop(SCOOPS);
const FULL_MOL = SCOOPS * MOL_PER_SCOOP;
const FULL_G = SCOOPS * G_PER_SCOOP;

const yOf = (t: number) => 170 - (t / 25) * 140; // thermometer 0..25 °C

export default function ColdPack({ slug }: { slug: string }) {
  const [n, setN] = useState(0);
  const t = temp(n);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${FULL_G} g (${FULL_MOL} mol) of ammonium nitrate salt dissolves in ${WATER_G} g of water at ${T0} °C and absorbs ${KJ_PER_MOL} kJ of heat. The water ends about…`,
        options: [`${Math.round(FULL_DROP)} °C colder`, "the same temperature", `${Math.round(FULL_DROP)} °C warmer`],
        answer: 0,
      }}
      exploreHint={`Add scoops until all ${FULL_MOL} mol is in, and watch the thermometer.`}
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            With {FULL_MOL} mol dissolved, the thermometer fell about <strong>{Math.round(FULL_DROP)} °C</strong>, to about {(T0 - FULL_DROP).toFixed(0)} °C.
          </p>
          <p>
            Dissolving this salt takes {KJ_PER_MOL} kJ per mole from its surroundings. The only heat on hand was the water&apos;s, so
            it cooled: 25,700 J ÷ ({WATER_G + FULL_G} g × {CP} J per g per °C) is about {FULL_DROP.toFixed(1)} °C. That is how an
            instant cold pack works.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const set = (v: number) => {
              setN(v);
              if (v === SCOOPS) reach("all");
            };
            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 190" className="stage-svg" role="img" aria-label={`${n * MOL_PER_SCOOP} mol dissolved, water ${t.toFixed(1)} °C`}>
                  <rect x={30} y={70} width={120} height={100} className={s.water} />
                  <path d="M30 40 V170 H150 V40" className={s.glass} />
                  {Array.from({ length: n * 3 }, (_, i) => (
                    <rect key={i} x={42 + (i % 6) * 18} y={158 - Math.floor(i / 6) * 8} width={6} height={6} className={s.salt} />
                  ))}
                  <text x={90} y={62} textAnchor="middle" className={s.small}>
                    500 g water, insulated
                  </text>
                  {n > 0 && (
                    <>
                      <path d="M90 82 V118 M84 111 L90 119 L96 111" className={s.arrow} />
                      <text x={98} y={100} className={s.small}>
                        heat out of water
                      </text>
                    </>
                  )}
                  <rect x={200} y={25} width={12} height={150} rx={6} className={s.tube} />
                  <rect x={202} y={yOf(t)} width={8} height={170 - yOf(t)} className={s.merc} />
                  <text x={226} y={yOf(T0) + 4} className={s.small}>
                    20 °C start
                  </text>
                  <text x={226} y={yOf(t) + 16} className={s.big}>
                    {t.toFixed(1)} °C
                  </text>
                  <text x={310} y={20} textAnchor="end" className={s.small}>
                    {n * MOL_PER_SCOOP} mol salt in
                  </text>
                </svg>
                <Row>
                  <Control onClick={() => set(Math.min(SCOOPS, n + 1))} disabled={locked || n >= SCOOPS}>
                    Add a scoop (0.25 mol)
                  </Control>
                  <Control onClick={() => set(SCOOPS)} disabled={locked || n >= SCOOPS}>
                    Add all (1.0 mol)
                  </Control>
                  <Control onClick={() => set(0)} disabled={locked || n === 0}>
                    Empty
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
