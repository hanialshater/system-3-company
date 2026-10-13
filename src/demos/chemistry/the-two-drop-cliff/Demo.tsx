"use client";

// One pH-versus-volume graph that traces itself as base goes in. 25.0 mL of 0.100 mol/L HCl,
// titrated with 0.100 mol/L NaOH, counted in drops of 0.05 mL. The trace is flat for 24 mL, then
// four drops either side of 25.00 mL climb from pH 3.7 to 10.3.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const DROP = 0.05; // mL
const VA = 25.0; // mL of acid
const CONC = 0.1; // mol/L, acid and base
const EQ = Math.round(VA / DROP); // 500 drops
const MAXD = 1000; // 50 mL
const A_D = 498; // 24.9 mL
const B_D = 502; // 25.1 mL

// Strong acid + strong base at 25 °C, pKw 14.00. Water's own ions ignored except at the exact match.
function pH(drops: number) {
  const vb = drops * DROP;
  const acid = (VA * CONC) / 1000; // mol
  const base = (vb * CONC) / 1000;
  const litres = (VA + vb) / 1000;
  if (Math.abs(acid - base) < 1e-12) return 7;
  return acid > base ? -Math.log10((acid - base) / litres) : 14 + Math.log10((base - acid) / litres);
}
const PH_A = pH(A_D);
const PH_B = pH(B_D);
const JUMP = PH_B - PH_A;

const W = 320;
const H = 200;
const L = 28;
const R = 22;
const TOP = 10;
const BASE = 170;
const X = (ml: number) => L + (ml / 50) * (W - L - R);
const Y = (p: number) => BASE - (p / 14) * (BASE - TOP);
const mL = (d: number) => `${(d * DROP).toFixed(2)} mL`;

export default function TheTwoDropCliff({ slug }: { slug: string }) {
  const [d, setD] = useState(0);
  const [pts, setPts] = useState<number[]>([0]);
  const [crossed, setCrossed] = useState(false);
  const ix = useRef(() => {});
  const { reach } = useMilestones(() => ix.current(), ["flat", "cliff"]);

  const addTo = (next: number) => {
    const n = Math.min(MAXD, next);
    // Long runs leave a point every 0.5 mL so the trace shows the flat stretch.
    const fill: number[] = [];
    for (let k = d + 10; k < n; k += 10) fill.push(k);
    setPts((p) => [...p, ...fill, n]);
    if (n >= 400) reach("flat");
    if (d < EQ && n > EQ && d >= EQ - 4 && n <= EQ + 4) {
      setCrossed(true);
      reach("cliff");
    }
    setD(n);
  };

  const line = [...pts].sort((a, b) => a - b).map((k, i) => `${i ? "L" : "M"} ${X(k * DROP).toFixed(1)} ${Y(pH(k)).toFixed(1)}`).join(" ");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${VA.toFixed(1)} mL of ${CONC.toFixed(3)} mol/L HCl is titrated with ${CONC.toFixed(3)} mol/L NaOH. From ${mL(A_D)} to ${mL(B_D)} of base (about 4 drops), the pH changes by about…`,
        options: ["0.2 units", "2 units", "6 to 7 units"],
        answer: 2,
      }}
      exploreHint={`Run to ${mL(A_D)}, then add 4 drops.`}
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {crossed ? "You saw" : "Add those drops and you see"} the pH go from about <strong>{PH_A.toFixed(1)}</strong>{" "}
            at {mL(A_D)} to about <strong>{PH_B.toFixed(1)}</strong> at {mL(B_D)}: a jump of about {JUMP.toFixed(1)} units
            in 4 drops. The first {mL(A_D)} moved it only {(PH_A - pH(0)).toFixed(1)} units.
          </p>
          <p>
            pH counts powers of ten. At {mL(A_D)} only 1 part in {Math.round(EQ / (EQ - A_D))} of the acid is left, but that is still about 2 × 10
            <sup>−4</sup> mol/L of H⁺. Two drops later the acid is gone; two more and the extra base sets the pH. The
            cliff sits exactly where acid and base match, which is why titrations can find that point so sharply.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        ix.current = interact;
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`After ${mL(d)} of base the pH is ${pH(d).toFixed(1)}`}>
              {[0, 7, 14].map((p) => (
                <g key={p}>
                  <line x1={L} x2={W - R} y1={Y(p)} y2={Y(p)} className={s.grid} />
                  <text x={L - 4} y={Y(p) + 3} textAnchor="end" className={s.small}>
                    {p}
                  </text>
                </g>
              ))}
              {[0, 25, 50].map((v) => (
                <text key={v} x={X(v)} y={BASE + 13} textAnchor="middle" className={s.small}>
                  {v} mL
                </text>
              ))}
              <text x={L + 4} y={TOP + 12} className={s.small}>
                pH · 25 mL acid · 0.100 mol/L each
              </text>
              <path d={line} className={s.trace} />
              {pts.map((k, i) => (
                <circle key={i} cx={X(k * DROP)} cy={Y(pH(k))} r={k === d ? 4.5 : 2} className={k === d ? s.now : s.pt} />
              ))}
              <text x={W / 2} y={BASE + 27} textAnchor="middle" className={s.small}>
                base added
              </text>
            </svg>
            <Row>
              <Control onClick={() => addTo(A_D)} disabled={locked || d >= A_D}>
                Run to {mL(A_D)}
              </Control>
              <Control onClick={() => addTo(d + 4)} disabled={locked || d + 4 > MAXD}>
                +4 drops
              </Control>
              <Control onClick={() => addTo(d + 1)} disabled={locked || d + 1 > MAXD}>
                +1 drop
              </Control>
              <Control onClick={() => addTo(d + 20)} disabled={locked || d + 20 > MAXD}>
                +1 mL
              </Control>
              <Control
                onClick={() => {
                  setD(0);
                  setPts([0]);
                }}
                disabled={locked || d === 0}
              >
                Empty
              </Control>
            </Row>
            <Row>
              <Readout label="Base added" value={mL(d)} />
              <Readout label="pH" value={pH(d).toFixed(1)} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
