"use client";

// Toy paper chromatography. A dye with stickiness k travels the fraction Rf = 1 / (1 + k) of the
// distance the water front has travelled. Dye A has k = 1 (Rf 0.50); dye B starts at k = 3 (Rf 0.25).
// Key state (milestone `lag`): water at 10 cm AND dye B stickiness 3 (the question's setting), so A is
// at 5.0 cm and B at 2.5 cm. Either order of setting reaches it. The slider can move B away.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const K_A = 1;
const K_B = 3;
const RISE = 10; // cm
const rf = (k: number) => 1 / (1 + k);
const NAMES = ["lag"] as const;

const BASE = 168;
const PX = 14; // px per cm
const TOP = BASE - RISE * PX;

export default function Chromatography({ slug }: { slug: string }) {
  const [water, setWater] = useState(0);
  const [kB, setKB] = useState(K_B);
  const dA = water * rf(K_A);
  const dB = water * rf(kB);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Two dyes ride water up a paper strip. Dye A clings a little to the paper (stickiness ${K_A}). Dye B clings more (stickiness ${K_B}). After the water rises ${RISE} cm, dye B sits…`,
        options: ["higher than dye A", "lower than dye A", "at the same height as dye A"],
        answer: 1,
      }}
      exploreHint={`Send the water up ${RISE} cm with dye B at stickiness ${K_B}. Then try other stickiness values.`}
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            With the water {RISE} cm up, dye A was at <strong>{(RISE * rf(K_A)).toFixed(1)} cm</strong> and dye B only at{" "}
            <strong>{(RISE * rf(K_B)).toFixed(1)} cm</strong>: B sat lower.
          </p>
          <p>
            Each dye is carried by the water but held back by the paper. The stickier one is held longer, so it travels a smaller fraction of the
            water&apos;s distance: {rf(K_B).toFixed(2)} for B against {rf(K_A).toFixed(2)} for A. Separation is a race between being carried and
            holding on.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const check = (w: number, k: number) => {
              if (w === RISE && k === K_B) reach("lag");
            };
            const sendWater = () => {
              setWater(RISE);
              check(RISE, kB);
            };
            const setStick = (k: number) => {
              setKB(k);
              check(water, k);
            };
            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 190" className="stage-svg" role="img" aria-label={`water ${water} cm, dye A ${dA.toFixed(1)} cm, dye B ${dB.toFixed(1)} cm`}>
                  <rect x={70} y={TOP} width={150} height={BASE - TOP} className={s.paper} />
                  <rect x={70} y={BASE - water * PX} width={150} height={water * PX} className={s.wet} />
                  <line x1={70} x2={220} y1={BASE} y2={BASE} className={s.start} />
                  <text x={226} y={BASE + 4} className={s.small}>
                    start
                  </text>
                  <text x={226} y={TOP + 4} className={s.small}>
                    {RISE} cm
                  </text>
                  <circle cx={115} cy={BASE - dA * PX} r={9} className={s.dyeA} />
                  <circle cx={175} cy={BASE - dB * PX} r={9} className={s.dyeB} />
                  <text x={115} y={BASE + 16} textAnchor="middle" className={s.lab}>
                    A: sticks {K_A}
                  </text>
                  <text x={175} y={BASE + 16} textAnchor="middle" className={s.lab}>
                    B: sticks {kB}
                  </text>
                  <text x={4} y={14} className={s.small}>
                    Stickiness: how hard a dye clings to paper.
                  </text>
                  <text x={4} y={26} className={s.small}>
                    Toy model.
                  </text>
                </svg>
                <Row>
                  <Control onClick={sendWater} disabled={locked || water === RISE}>
                    Send water up {RISE} cm
                  </Control>
                  <Control onClick={() => setWater(0)} disabled={locked || water === 0}>
                    Dry the strip
                  </Control>
                </Row>
                <Slider label="Dye B stickiness" value={kB} min={1} max={5} step={1} onChange={setStick} disabled={locked} />
                <Row>
                  <Readout label="Dye A height" value={`${dA.toFixed(1)} cm`} />
                  <Readout label="Dye B height" value={`${dB.toFixed(1)} cm`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
