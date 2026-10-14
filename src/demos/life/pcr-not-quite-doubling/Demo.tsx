"use client";

// Toy PCR: 1 molecule, 30 cycles. Each cycle multiplies the count by (1 + efficiency); a perfect
// cycle (efficiency 100%) doubles it. Efficiency is fixed, no plateau. Chart is log10(count) vs cycle.
// Efficiency is held in whole percent; ratio to perfect = ((100 + e) / 200)^30.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const CYCLES = 30, Q_EFF = 90;
const PRESETS = [90, 80, 95, 100];
const count = (e: number, c: number) => Math.pow(1 + e / 100, c);
const ratio = (e: number) => count(e, CYCLES) / count(100, CYCLES);
const pctOf = (e: number) => Math.round(ratio(e) * 100);
const big = (n: number) =>
  n >= 1e9 ? `${(n / 1e9).toFixed(2)} billion` : n >= 1e6 ? `${Math.round(n / 1e6)} million` : Math.round(n).toLocaleString("en-US");

const W = 320, H = 150, L = 34, R = 10, T = 10, B = 24, YMAX = 9.5;
const px = (c: number) => L + ((W - L - R) * c) / CYCLES;
const py = (n: number) => T + (H - T - B) * (1 - Math.log10(n) / YMAX);
const line = (e: number) => Array.from({ length: CYCLES + 1 }, (_, c) => `${px(c).toFixed(1)},${py(count(e, c)).toFixed(1)}`).join(" ");

function Stage({ locked, eff: effSet, setEff, revealing }: { locked: boolean; eff: number; setEff: (e: number) => void; revealing: boolean }) {
  const eff = revealing ? Q_EFF : effSet;
  const msg = locked
    ? "Toy PCR: 1 DNA molecule, 30 cycles. A perfect cycle doubles the count. Efficiency stays fixed."
    : eff === 100
      ? `Perfect: ${big(count(100, CYCLES))} after ${CYCLES} cycles.`
      : `${eff}% efficient: ×${(1 + eff / 100).toFixed(2)} per cycle, ${big(count(eff, CYCLES))} after ${CYCLES}. Perfect: ${big(count(100, CYCLES))}. That is ${pctOf(eff)}% of perfect.`;
  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 320 60" className={`stage-svg ${s.bars}`} role="img" aria-label={`Copies after ${CYCLES} cycles on a straight scale: perfect is full length, ${eff}% efficient is ${pctOf(eff)}% of it`}>
        <text x={4} y={11} className={s.axis}>After {CYCLES} cycles, straight scale</text>
        <text x={4} y={30} className={s.axis}>Perfect</text>
        <rect x={52} y={20} width={262} height={14} className={s.barPerfect} />
        {!locked && (
          <>
            <text x={4} y={52} className={s.axis}>{eff}%</text>
            <rect x={52} y={42} width={Math.max(1.5, 262 * ratio(eff))} height={14} className={s.barMine} />
            <text x={ratio(eff) > 0.5 ? 52 + 262 * ratio(eff) - 4 : 52 + 262 * ratio(eff) + 4} y={53} textAnchor={ratio(eff) > 0.5 ? "end" : "start"} className={ratio(eff) > 0.5 ? s.axisOn : s.axis}>{pctOf(eff)}% of perfect</text>
          </>
        )}
      </svg>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`Log chart: ${msg}`}>
        {[0, 3, 6, 9].map((d) => (
          <g key={d}>
            <line x1={L} x2={W - R} y1={py(Math.pow(10, d))} y2={py(Math.pow(10, d))} className={s.grid} />
            <text x={L - 4} y={py(Math.pow(10, d)) + 3} textAnchor="end" className={s.axis}>{d === 0 ? "1" : `10^${d}`}</text>
          </g>
        ))}
        <text x={px(0)} y={H - 8} className={s.axis}>0</text>
        <text x={px(CYCLES)} y={H - 8} textAnchor="end" className={s.axis}>{CYCLES} cycles</text>
        <polyline points={line(100)} className={s.perfect} />
        {!locked && eff !== 100 && <polyline points={line(eff)} className={s.mine} />}
        <text x={L + 4} y={T + 8} className={s.axis}>copies (each gridline is 1,000 times more)</text>
      </svg>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <Row>
        {PRESETS.map((p) => (
          <Control key={p} className={eff === p ? "active" : ""} disabled={locked || eff === p} onClick={() => setEff(p)}>
            {p}%
          </Control>
        ))}
      </Row>
      <Slider label="Efficiency per cycle" value={eff} min={80} max={100} step={1} disabled={locked} onChange={setEff} format={(v) => `${v}%`} />
    </div>
  );
}

export default function PcrNotQuiteDoubling({ slug }: { slug: string }) {
  const [eff, setEff] = useState(100);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `PCR copies DNA in cycles. Toy PCR: 1 DNA molecule, ${CYCLES} cycles. A perfect cycle doubles the count. If each cycle is ${Q_EFF}% efficient (×${(1 + Q_EFF / 100).toFixed(1)}), the final count compared with perfect is about:`,
        options: ["90%", "50%", "20%"],
        answer: 2,
      }}
      exploreHint={`Set the efficiency to ${Q_EFF}% and compare the bar with perfect. Then try 80%.`}
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            At {Q_EFF}% you saw {big(count(Q_EFF, CYCLES))} copies after {CYCLES} cycles against {big(count(100, CYCLES))} for perfect: <strong>{pctOf(Q_EFF)}%</strong> of the perfect result.
          </p>
          <p>
            Each cycle gives ×{(1 + Q_EFF / 100).toFixed(1)} instead of ×2, which is {(1 + Q_EFF / 100) / 2} of a perfect cycle. That shortfall multiplies itself every cycle: {(1 + Q_EFF / 100) / 2} thirty times is {ratio(Q_EFF).toFixed(2)}. Small losses compound just as growth does. Toy model: fixed efficiency, no plateau.
          </p>
        </>
      )}
    >
      {({ phase, locked, interact }) => (
        <Milestones interact={interact} names={["ninety"]}>
          {(reach) => (
            <Stage locked={locked} revealing={phase === "reveal"} eff={eff} setEff={(e) => { setEff(e); if (e === Q_EFF) reach("ninety"); }} />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
