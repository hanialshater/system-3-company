"use client";

// One chart with a broken energy axis. Left: the crowd of collision energies, nearly all
// far below the barrier. Right: the far tail beyond the 50 kJ/mol barrier, drawn 250
// million times taller so it can be seen at all. Warming by 10 K barely moves the crowd
// (dashed: 298 K) but nearly doubles the shaded tail, and the rate goes with the tail.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const R_GAS = 8.314; // J/(mol K)
const EA = 50_000; // J/mol
const T0 = 298;
const MAG = 2.5e8;

const W = 320;
const H = 200;
const TOP = 26;
const BASE = 168;
const PH = BASE - TOP;
// Left segment: 0-15 kJ/mol; right segment: 48-58 kJ/mol.
const A0 = 0, A1 = 15, AX0 = 8, AX1 = 168;
const B0 = 48, B1 = 58, BX0 = 186, BX1 = 312;
const xA = (e: number) => AX0 + ((e - A0) / (A1 - A0)) * (AX1 - AX0);
const xB = (e: number) => BX0 + ((e - B0) / (B1 - B0)) * (BX1 - BX0);

// Distribution of collision energies (simple collision theory): f(E) = exp(-E/RT) / RT.
// Heights are relative to the 298 K value at E = 0.
const rel = (eKJ: number, T: number) => ((R_GAS * T0) / (R_GAS * T)) * Math.exp((-eKJ * 1000) / (R_GAS * T));
const overBarrier = (T: number) => Math.exp(-EA / (R_GAS * T)); // fraction with E >= Ea
const yOf = (h: number) => BASE - Math.min(h, 1.05) * PH;

function path(e0: number, e1: number, x: (e: number) => number, h: (e: number) => number, close: boolean) {
  const pts: string[] = [];
  const n = 60;
  for (let i = 0; i <= n; i++) {
    const e = e0 + ((e1 - e0) * i) / n;
    pts.push(`${x(e).toFixed(1)} ${yOf(h(e)).toFixed(1)}`);
  }
  return close ? `M ${x(e0)} ${BASE} L ${pts.join(" L ")} L ${x(e1)} ${BASE} Z` : `M ${pts.join(" L ")}`;
}

export default function TheTailThatReacts({ slug }: { slug: string }) {
  const [temp, setTemp] = useState(T0);

  const ratio = overBarrier(temp) / overBarrier(T0);
  const perBillion = overBarrier(temp) * 1e9;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Two molecules react only if they collide with enough energy, a barrier of about 50 kJ/mol (kilojoules per mole of molecules). Warm the mixture from 298 K to 308 K, about 3% hotter in kelvin. The rate (reactions per second) becomes about…",
        options: ["1.03 times", "1.9 times", "10 times"],
        answer: 1,
      }}
      exploreHint="Press Warm to 308 K. Compare the crowd on the left with the shaded tail on the right."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            At 308 K you saw the crowd on the left barely change, while
            the shaded tail past the barrier nearly doubled: from 1.7 to 3.3 collisions per billion. The rate goes with
            that tail, so it is about <strong>1.9 times</strong> faster.
          </p>
          <p>
            Only a tiny share of collisions reach the barrier, because the barrier is about 20 times the typical
            thermal energy. That share is so steep in temperature that a 3% rise compounds to a factor of about 1.9.
          </p>
          <p className="muted">
            &ldquo;About double per 10 K&rdquo; is a rule of thumb that fits barriers near 50 kJ/mol, not a law.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const warm = (t: number) => {
          setTemp(t);
          if (t >= 308) interact();
        };
        return (
        <div className={s.wrap}>
          <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`At ${temp} K, ${perBillion.toFixed(1)} collisions per billion clear the barrier`}>
            {/* crowd */}
            <path d={path(A0, A1, xA, (e) => rel(e, temp), true)} className={s.crowd} />
            <path d={path(A0, A1, xA, (e) => rel(e, T0), false)} className={s.ghost} />
            <text x={xA(4)} y={yOf(0.55)} className={s.label}>
              most collisions
            </text>
            {/* tail, magnified */}
            <path d={path(50, B1, xB, (e) => MAG * rel(e, temp), true)} className={s.tail} />
            <path d={path(50, B1, xB, (e) => MAG * rel(e, T0), false)} className={s.ghost} />
            <line x1={xB(50)} x2={xB(50)} y1={TOP - 8} y2={BASE} className={s.barrier} />
            <text x={xB(50) + 4} y={TOP - 12} className={s.label}>
              barrier
            </text>
            <text x={BX1} y={TOP + 6} textAnchor="end" className={s.small}>
              tail zoomed 250 million ×
            </text>
            {/* axis with a break */}
            <line x1={AX0} x2={AX1} y1={BASE} y2={BASE} className={s.axis} />
            <line x1={BX0} x2={BX1} y1={BASE} y2={BASE} className={s.axis} />
            <path d={`M ${AX1 + 4} ${BASE + 5} l 5 -10 M ${AX1 + 10} ${BASE + 5} l 5 -10`} className={s.axis} />
            {[0, 5, 10, 15].map((e) => (
              <text key={e} x={xA(e)} y={BASE + 13} textAnchor="middle" className={s.small}>
                {e}
              </text>
            ))}
            {[50, 55].map((e) => (
              <text key={e} x={xB(e)} y={BASE + 13} textAnchor="middle" className={s.small}>
                {e}
              </text>
            ))}
            <text x={W / 2} y={BASE + 27} textAnchor="middle" className={s.small}>
              collision energy, kJ/mol
            </text>
          </svg>
          <Control disabled={locked || temp >= 308} onClick={() => warm(308)}>
            Warm to 308 K
          </Control>
          <Slider
            label="Temperature"
            value={temp}
            min={288}
            max={308}
            disabled={locked}
            format={(t) => `${t} K`}
            onChange={warm}
          />
          <Row>
            <Readout label="Over the barrier" value={`${perBillion.toFixed(1)} per billion`} />
            <Readout label="Rate vs 298 K" value={`×${ratio.toFixed(2)}`} />
          </Row>
        </div>
        );
      }}
    </Lesson>
  );
}
