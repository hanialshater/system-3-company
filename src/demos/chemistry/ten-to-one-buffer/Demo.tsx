"use client";

// An acetic acid / acetate buffer in one beaker: hollow dots are acid (HA), filled dots are base
// (A−), one dot per mmol. Under the beaker, a ruler of base:acid ratio on a log scale, labelled
// in pH. Henderson-Hasselbalch: pH = pKa + log10([A−]/[HA]). Ten times more acid than base puts
// the marker one full pH unit below pKa; scaling both up together does not move it.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const PKA = 4.76; // acetic acid, 25 °C
const AMOUNTS = [1, 3, 10, 30, 100]; // mmol, slider stops (roughly half-decades)
const START = 2; // 10 mmol each
const pH = (base: number, acid: number) => PKA + Math.log10(base / acid);
const ASK_ACID = 100;
const ASK_BASE = 10;
const ASK_PH = pH(ASK_BASE, ASK_ACID); // 3.76
const NAMES = ["ten-to-one"] as const;

const W = 320;
const H = 212;
const COLS = 10;
const GAP = 7.2;
const BEAKER_Y = 8;
const RULER_Y = 160;
const RL = 24;
const RR = W - 24;
const XR = (logRatio: number) => RL + ((logRatio + 2) / 4) * (RR - RL); // log10 ratio −2..+2
const f2 = (v: number) => v.toFixed(2);

function Dots({ n, x0, filled }: { n: number; x0: number; filled: boolean }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <circle
          key={i}
          cx={x0 + (i % COLS) * GAP}
          cy={BEAKER_Y + 118 - Math.floor(i / COLS) * GAP}
          r={2.6}
          className={filled ? s.base : s.acid}
        />
      ))}
    </>
  );
}

export default function TenToOneBuffer({ slug }: { slug: string }) {
  const [ai, setAi] = useState(START);
  const [bi, setBi] = useState(START);
  const [sawAsk, setSawAsk] = useState(false);
  const acid = AMOUNTS[ai];
  const base = AMOUNTS[bi];
  const p = pH(base, acid);
  const lr = Math.log10(base / acid);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A buffer is a jar of a weak acid (HA, hollow dots) and its partner base (A−, filled dots). With equal amounts its pH is its pKa: ${PKA} for acetic acid. Now it holds ${ASK_ACID / ASK_BASE} times as much acid as base. Its pH is about…`,
        options: [f2(ASK_PH), f2(PKA), f2(PKA + 1)],
        answer: 0,
      }}
      exploreHint={`Raise the acid to ${ASK_ACID} mmol. Then raise the base too.`}
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            {sawAsk ? "You saw" : "Set it and you see"} {ASK_BASE} mmol of base against {ASK_ACID} mmol of acid put the
            marker at pH <strong>{f2(ASK_PH)}</strong>: one whole unit below the pKa, {PKA}.
            {sawAsk && base === acid && acid !== AMOUNTS[START] ? ` Then ${base} of each sat back at ${PKA}, as 10 of each had.` : ""}
          </p>
          <p>
            A buffer&apos;s pH depends on the ratio of base to acid, through its logarithm (the number of tens in the ratio): pH = pKa + log₁₀(base ÷
            acid). Each tenfold change in the ratio moves pH by 1, as on the ruler: one tick, one pH unit. Equal amounts give pH = pKa, however much buffer
            there is; more buffer only makes that pH harder to push.
          </p>
          <p className="muted">Holds well for moderate concentrations, about 0.01 to 1 mol/L.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const set = (na: number, nb: number) => {
              setAi(na);
              setBi(nb);
              if (AMOUNTS[na] === ASK_ACID && AMOUNTS[nb] === ASK_BASE) {
                setSawAsk(true);
                reach("ten-to-one");
              }
            };
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={`${acid} mmol acid and ${base} mmol base: pH ${f2(p)}`}
                >
                  <path d={`M 70 ${BEAKER_Y} V ${BEAKER_Y + 126} H 250 V ${BEAKER_Y}`} className={s.beaker} />
                  <Dots n={acid} x0={84} filled={false} />
                  <Dots n={base} x0={170} filled />
                  <text x={64} y={BEAKER_Y + 124} textAnchor="end" className={s.small}>
                    HA
                  </text>
                  <text x={256} y={BEAKER_Y + 124} className={s.small}>
                    A−
                  </text>
                  <line x1={RL} x2={RR} y1={RULER_Y} y2={RULER_Y} className={s.ruler} />
                  {[-2, -1, 0, 1, 2].map((k) => (
                    <g key={k}>
                      <line x1={XR(k)} x2={XR(k)} y1={RULER_Y - 5} y2={RULER_Y + 5} className={s.ruler} />
                      <text x={XR(k)} y={RULER_Y + 17} textAnchor="middle" className={k === 0 ? s.label : s.small}>
                        {locked && k !== 0 ? "?" : k === 0 ? `pKa ${f2(PKA)}` : f2(PKA + k)}
                      </text>
                      <text x={XR(k)} y={RULER_Y + 28} textAnchor="middle" className={s.small}>
                        {k === 0 ? "equal" : k < 0 ? `acid ×${10 ** -k}` : `base ×${10 ** k}`}
                      </text>
                    </g>
                  ))}
                  <text x={RL} y={RULER_Y + 44} className={s.small}>
                    pH (top) · how much more of one than the other (below)
                  </text>
                  <path
                    d={`M ${XR(lr).toFixed(1)} ${RULER_Y - 3} l -6 -10 h 12 z`}
                    className={s.marker}
                  />
                </svg>
                <Slider
                  label="Acid, HA"
                  value={ai}
                  min={0}
                  max={AMOUNTS.length - 1}
                  disabled={locked}
                  format={(i) => `${AMOUNTS[i]} mmol`}
                  onChange={(i) => set(i, bi)}
                />
                <Slider
                  label="Base, A−"
                  value={bi}
                  min={0}
                  max={AMOUNTS.length - 1}
                  disabled={locked}
                  format={(i) => `${AMOUNTS[i]} mmol`}
                  onChange={(i) => set(ai, i)}
                />
                <Row>
                  <Readout label="Base : acid" value={base >= acid ? `${(base / acid).toFixed(base % acid ? 1 : 0)} : 1` : `1 : ${(acid / base).toFixed(acid % base ? 1 : 0)}`} />
                  <Readout label="pH" value={f2(p)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
