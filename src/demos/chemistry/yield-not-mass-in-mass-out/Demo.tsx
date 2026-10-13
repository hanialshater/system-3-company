"use client";

// Aspirin from salicylic acid, 1 : 1 by moles (acetic anhydride in excess).
// 2.00 g / 138.12 g/mol = 0.01448 mol; × 180.16 g/mol = 2.61 g theoretical.
// Bars share one gram scale. The theoretical bar appears only after both conversion steps.
// Key state (milestone `yield`): both steps done AND collected = 1.80 g, so the yield reads 69%.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const START_G = 2.0;
const M_SAL = 138.12;
const M_ASP = 180.16;
const GOT_G = 1.8;
const MOLES = START_G / M_SAL;
const THEORY_G = MOLES * M_ASP;
const YIELD_PCT = (GOT_G / THEORY_G) * 100;
const NAMES = ["yield"] as const;

const X0 = 14;
const SPAN = 292;
const GMAX = 3.2;
const wOf = (g: number) => (g / GMAX) * SPAN;

export default function PercentYield({ slug }: { slug: string }) {
  const [step, setStep] = useState(0);
  const [got, setGot] = useState(0.5);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${START_G.toFixed(2)} g of salicylic acid (${M_SAL} g per mole) can in theory make ${THEORY_G.toFixed(2)} g of aspirin (${M_ASP} g per mole). You collect ${GOT_G.toFixed(2)} g of aspirin. The percent yield is about…`,
        options: [`${Math.round((GOT_G / START_G) * 100)}%`, `${Math.round(YIELD_PCT)}%`, "100%"],
        answer: 1,
      }}
      exploreHint={`Do both conversion steps, then set the collected mass to ${GOT_G.toFixed(2)} g.`}
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            You collected {GOT_G.toFixed(2)} g of a possible {THEORY_G.toFixed(2)} g: a yield of about <strong>{Math.round(YIELD_PCT)}%</strong>.
          </p>
          <p>
            Yield compares what you got with what the atoms could have made. {START_G.toFixed(2)} g is {MOLES.toFixed(5)} mol of salicylic acid, which can
            make {MOLES.toFixed(5)} mol of aspirin, {THEORY_G.toFixed(2)} g. Dividing by the {START_G.toFixed(2)} g you started with would give{" "}
            {Math.round((GOT_G / START_G) * 100)}%, a wrong answer because the two molecules weigh different amounts.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const check = (st: number, g: number) => {
              if (st >= 2 && Math.abs(g - GOT_G) < 1e-9) reach("yield");
            };
            const toStep = (st: number) => {
              setStep(st);
              check(st, got);
            };
            const toGot = (g: number) => {
              const v = Math.round(g * 100) / 100;
              setGot(v);
              check(step, v);
            };
            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 170" className="stage-svg" role="img" aria-label={`started ${START_G} g, collected ${got} g`}>
                  <text x={X0} y={14} className={s.lab}>
                    salicylic acid used: {START_G.toFixed(2)} g
                  </text>
                  <rect x={X0} y={20} width={wOf(START_G)} height={16} className={s.start} />
                  {step >= 1 && (
                    <text x={X0} y={52} className={s.small}>
                      {START_G.toFixed(2)} g ÷ {M_SAL} g/mol = {MOLES.toFixed(5)} mol
                    </text>
                  )}
                  {step >= 2 && (
                    <>
                      <text x={X0} y={72} className={s.small}>
                        × {M_ASP} g/mol = {THEORY_G.toFixed(2)} g aspirin possible
                      </text>
                      <rect x={X0} y={78} width={wOf(THEORY_G)} height={16} className={s.theory} />
                    </>
                  )}
                  <text x={X0} y={116} className={s.lab}>
                    aspirin collected: {got.toFixed(2)} g
                  </text>
                  <rect x={X0} y={122} width={wOf(got)} height={16} className={s.got} />
                  {step >= 2 && <line x1={X0 + wOf(THEORY_G)} x2={X0 + wOf(THEORY_G)} y1={74} y2={142} className={s.ref} />}
                  <text x={X0} y={162} className={s.small}>
                    mole = counted amount; scale 0 to 3.2 g
                  </text>
                </svg>
                <Row>
                  <Control onClick={() => toStep(Math.max(step, 1))} disabled={locked || step >= 1}>
                    1: grams to moles
                  </Control>
                  <Control onClick={() => toStep(2)} disabled={locked || step >= 2}>
                    2: moles to aspirin grams
                  </Control>
                </Row>
                <Slider label="Aspirin collected (g)" value={got} min={0} max={3} step={0.05} onChange={toGot} disabled={locked} format={(v) => v.toFixed(2)} />
                <Row>
                  <Control onClick={() => toGot(GOT_G)} disabled={locked || got === GOT_G}>
                    Set to {GOT_G.toFixed(2)} g
                  </Control>
                  {step >= 2 && <Readout label="Percent yield" value={`${((got / THEORY_G) * 100).toFixed(0)}%`} />}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
