"use client";

// Air above, a pan of iron on a scale below. Eight iron atoms stand for 10.0 g of iron wool.
// Tapping an iron atom burns it: it pulls oxygen atoms out of the air (alternately 2 and 1,
// so 8 Fe take 12 O, the ratio of Fe2O3). The iron count never changes, the air's oxygen falls,
// and the scale reads the sum: about 14.3 g once all the iron has burned.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const M_FE = 55.845; // g/mol
const M_O = 15.999; // g/mol
const N_FE = 8;
const START_G = 10.0; // g of iron
const FE_G = START_G / N_FE; // g per drawn iron atom
const O_G = (FE_G * M_O) / M_FE; // g per drawn oxygen atom (same scale factor)
const takes = (i: number) => (i % 2 === 0 ? 2 : 1); // 2,1,2,1…: 3 O per 2 Fe
const N_O = Array.from({ length: N_FE }, (_, i) => takes(i)).reduce((a, b) => a + b, 0); // 12
const FINAL_G = START_G + N_O * O_G;
const NAMES = ["all-burned"] as const;

const W = 320;
const H = 74;
const oPos = Array.from({ length: N_O }, (_, k) => ({ x: 22 + (k % 6) * 50 + (Math.floor(k / 6) % 2) * 25, y: 22 + Math.floor(k / 6) * 26 }));

export default function SteelWoolGainsWeight({ slug }: { slug: string }) {
  const [burned, setBurned] = useState<boolean[]>(() => Array(N_FE).fill(false));
  const [sawAll, setSawAll] = useState(false);

  const oTaken = burned.reduce((n, b, i) => n + (b ? takes(i) : 0), 0);
  const grams = START_G + oTaken * O_G;
  const allBurned = burned.every(Boolean);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${START_G.toFixed(1)} g of iron wool burns completely in air, all to iron(III) oxide, Fe₂O₃. The ash weighs about…`,
        options: [`less than ${START_G.toFixed(0)} g`, `${START_G.toFixed(1)} g`, `${FINAL_G.toFixed(0)} g`],
        answer: 2,
      }}
      exploreHint="Tap every iron atom to burn it. Watch the air and the scale."
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            {sawAll ? "You burned all the iron and" : "Burn all the iron and"} the scale went from {START_G.toFixed(1)} g to
            about <strong>{FINAL_G.toFixed(1)} g</strong>. The {N_FE} iron atoms never left the pan; {N_O} oxygen atoms
            left the air and joined them.
          </p>
          <p>
            Burning does not destroy atoms. It rearranges them: iron combines with oxygen from the air, 2 iron atoms
            to 3 oxygen in Fe₂O₃. The ash weighs the iron plus the oxygen it captured. Wood seems to lose weight only
            because its products, carbon dioxide and water vapour, escape into the air.
          </p>
          <p className="muted">Assumes all the iron becomes Fe₂O₃; real wool also makes some Fe₃O₄.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const burn = (i: number) => {
              const next = burned.map((b, j) => b || j === i);
              setBurned(next);
              if (next.every(Boolean)) {
                setSawAll(true);
                reach("all-burned");
              }
            };
            // Draw the air's oxygen: the first oTaken atoms have left.
            return (
              <div className={s.wrap}>
                <div className={s.box}>
                  <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={`${N_O - oTaken} oxygen atoms left in the air`}>
                    <text x={6} y={12} className={s.small}>
                      air
                    </text>
                    {oPos.map((p, k) =>
                      k < N_O - oTaken ? (
                        <g key={k}>
                          <circle cx={p.x} cy={p.y + 8} r={8} className={s.o} />
                          <text x={p.x} y={p.y + 11} textAnchor="middle" className={s.tiny}>
                            O
                          </text>
                        </g>
                      ) : (
                        <circle key={k} cx={p.x} cy={p.y + 8} r={8} className={s.ghost} />
                      ),
                    )}
                  </svg>
                  <div className={s.pan} aria-label="Iron in the pan">
                    {burned.map((b, i) => (
                      <Control
                        key={i}
                        className={`${s.fe} ${b ? "active" : ""}`}
                        aria-label={b ? `Iron atom ${i + 1}, burned` : `Burn iron atom ${i + 1}`}
                        disabled={locked || b}
                        onClick={() => burn(i)}
                      >
                        Fe
                        {b && (
                          <span className={s.oxy} aria-hidden>
                            {Array.from({ length: takes(i) }, (_, k) => (
                              <span key={k} className={s.dotO}>
                                O
                              </span>
                            ))}
                          </span>
                        )}
                      </Control>
                    ))}
                  </div>
                  <div className={s.scale}>
                    <span className={s.scaleLabel}>scale</span>
                    <span className={s.grams}>{grams.toFixed(1)} g</span>
                  </div>
                  <p className={s.caption}>Toy: {N_FE} iron atoms stand for {START_G.toFixed(1)} g</p>
                </div>
                <Row>
                  <Readout label="Iron atoms" value={N_FE} />
                  <Readout label="O in air" value={N_O - oTaken} />
                  <Control onClick={() => setBurned(Array(N_FE).fill(false))} disabled={locked || oTaken === 0}>
                    Fresh wool
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
