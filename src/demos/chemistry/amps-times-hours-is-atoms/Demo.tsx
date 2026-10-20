"use client";

// Copper plating: Cu2+ + 2 e- -> Cu. Charge Q = I t (coulombs); electrons = Q / F with F = 96,485 C/mol;
// copper = electrons / 2 mol; mass = mol × 63.55 g/mol. 100% current efficiency assumed.
// Key state (milestone `hour`): 2.0 A for 60 min -> Q = 7,200 C, 0.0746 mol electrons, 0.0373 mol Cu, about 2.37 g.
// Time buttons come first so QA ends on 60 min at 2.0 A; the current buttons then change the mass (1.0 A halves it).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const F = 96485; // C per mol of electrons
const M_CU = 63.55; // g/mol
const I_Q = 2.0; // A in the question
const HOUR = 60; // min
const charge = (a: number, min: number) => a * min * 60;
const molE = (a: number, min: number) => charge(a, min) / F;
const molCu = (a: number, min: number) => molE(a, min) / 2;
const grams = (a: number, min: number) => molCu(a, min) * M_CU;
const TIMES = [15, 30, HOUR];
const AMPS = [1.0, 2.0];
const NAMES = ["hour"] as const;
const fmt = (v: number) => v.toLocaleString("en-US");

const BAR_MAX = 2.6; // g

export default function Faraday({ slug }: { slug: string }) {
  const [min, setMin] = useState(0);
  const [amps, setAmps] = useState(I_Q);
  const g = grams(amps, min);
  const frac = Math.min(1, g / BAR_MAX);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Plating copper at your bench, you run ${I_Q.toFixed(1)} A (${I_Q.toFixed(1)} coulombs of charge every second) for 1.0 h through copper(II) sulfate solution. Each copper atom deposited takes 2 electrons, and 1 mole of electrons carries ${fmt(F)} C. About how much copper do you get?`,
        options: [`${(grams(I_Q, HOUR) / 2).toFixed(1)} g`, `${grams(I_Q, HOUR).toFixed(1)} g`, `${(grams(I_Q, HOUR) * 2).toFixed(1)} g`],
        answer: 1,
      }}
      exploreHint={`Run ${I_Q.toFixed(1)} A for the full hour and read the chain from charge to grams.`}
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            In 1 h at {I_Q.toFixed(1)} A the cell passed <strong>{fmt(charge(I_Q, HOUR))} C</strong> and deposited about{" "}
            <strong>{grams(I_Q, HOUR).toFixed(1)} g</strong> of copper.
          </p>
          <p>
            {fmt(charge(I_Q, HOUR))} C ÷ {fmt(F)} C/mol = {molE(I_Q, HOUR).toFixed(4)} mol of electrons. Two electrons per copper atom leaves{" "}
            {molCu(I_Q, HOUR).toFixed(4)} mol of copper, × {M_CU} g/mol. Current alone is not enough: amps times time is a count of electrons, and
            each copper atom needs a fixed two.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const check = (a: number, m: number) => {
              if (a === I_Q && m === HOUR) reach("hour");
            };
            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 170" className="stage-svg" role="img" aria-label={`${amps} A for ${min} min: ${g.toFixed(2)} g of copper`}>
                  <text x={8} y={16} className={s.lab}>
                    {amps.toFixed(1)} A × {fmt(min * 60)} s = {fmt(charge(amps, min))} C
                  </text>
                  <text x={8} y={36} className={s.lab}>
                    ÷ {fmt(F)} C/mol = {molE(amps, min).toFixed(4)} mol electrons
                  </text>
                  <text x={8} y={56} className={s.lab}>
                    ÷ 2 per atom = {molCu(amps, min).toFixed(4)} mol Cu
                  </text>
                  <text x={8} y={76} className={s.lab}>
                    × {M_CU} g/mol = {g.toFixed(2)} g
                  </text>
                  <rect x={8} y={90} width={304} height={24} className={s.track} />
                  <rect x={8} y={90} width={304 * frac} height={24} className={s.cu} />
                  <text x={8} y={134} className={s.small}>
                    copper deposited (bar full at {BAR_MAX} g)
                  </text>
                  <text x={8} y={152} className={s.small}>
                    Cu²⁺ + 2 e⁻ → Cu, all current making copper
                  </text>
                </svg>
                <Row>
                  {TIMES.map((t) => (
                    <Control
                      key={t}
                      onClick={() => {
                        setMin(t);
                        check(amps, t);
                      }}
                      disabled={locked || min === t}
                    >
                      {t === HOUR ? "1 hour" : `${t} min`}
                    </Control>
                  ))}
                </Row>
                <Row>
                  {AMPS.map((a) => (
                    <Control
                      key={a}
                      onClick={() => {
                        setAmps(a);
                        check(a, min);
                      }}
                      disabled={locked || amps === a}
                      className={amps === a ? "active" : ""}
                    >
                      {a.toFixed(1)} A
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
