"use client";

// Electron-grip ladder: standard electrode potentials (V vs the hydrogen electrode, 25 °C):
// Zn2+/Zn -0.76, Cu2+/Cu +0.34, Ag+/Ag +0.80. A cell's voltage is the gap between its two metals' rungs.
// Key state: all three pairs tried (milestones zncu, znag, cuag); Zn + Ag reads the biggest, 1.56 V.
// The electrode-size slider redraws the plates; the voltage does not move (that is the point).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Metal = "Zn" | "Cu" | "Ag";
const E: Record<Metal, number> = { Zn: -0.76, Cu: 0.34, Ag: 0.8 };
const PAIRS: { id: string; a: Metal; b: Metal }[] = [
  { id: "zncu", a: "Zn", b: "Cu" },
  { id: "znag", a: "Zn", b: "Ag" },
  { id: "cuag", a: "Cu", b: "Ag" },
];
const volts = (a: Metal, b: Metal) => Math.abs(E[a] - E[b]);
const NAMES = PAIRS.map((p) => p.id);
const BEST = PAIRS.reduce((m, p) => (volts(p.a, p.b) > volts(m.a, m.b) ? p : m));

const TOP = 20;
const BOT = 170;
const yOf = (v: number) => BOT - ((v + 1) / 2) * (BOT - TOP);
const X: Record<Metal, number> = { Zn: 60, Cu: 150, Ag: 240 };

export default function Ladder({ slug }: { slug: string }) {
  const [pair, setPair] = useState<string | null>(null);
  const [size, setSize] = useState(2);
  const p = PAIRS.find((x) => x.id === pair) ?? null;
  const v = p ? volts(p.a, p.b) : null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You can build a battery from any two of zinc, copper and silver. Their standard electrode potentials: Zn ${E.Zn.toFixed(2)} V, Cu +${E.Cu.toFixed(2)} V, Ag +${E.Ag.toFixed(2)} V. Which pair of metals makes the biggest cell voltage?`,
        options: ["Zn and Cu", "Zn and Ag", "Cu and Ag"],
        answer: PAIRS.findIndex((x) => x.id === BEST.id),
      }}
      exploreHint="Try all three pairs and read the voltage. Then change the electrode size."
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            Zn with Ag read <strong>{volts("Zn", "Ag").toFixed(2)} V</strong>, the most: Zn with Cu gave {volts("Zn", "Cu").toFixed(2)} V and Cu with Ag only{" "}
            {volts("Cu", "Ag").toFixed(2)} V.
          </p>
          <p>
            A cell&apos;s voltage is the gap between its two metals on the ladder: {E.Ag.toFixed(2)} − ({E.Zn.toFixed(2)}) = {volts("Zn", "Ag").toFixed(2)} V.
            Bigger plates change how much current a cell can supply, not this gap.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const choose = (id: string) => {
              setPair(id);
              reach(id);
            };
            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 190" className="stage-svg" role="img" aria-label={p ? `${p.a} and ${p.b}: ${v!.toFixed(2)} V` : "no pair chosen"}>
                  <text x={4} y={12} className={s.small}>
                    Higher rung: ion grabs electrons harder (volts, standard conditions)
                  </text>
                  <line x1={20} x2={20} y1={TOP} y2={BOT} className={s.axis} />
                  {(Object.keys(E) as Metal[]).map((m) => {
                    const on = p && (p.a === m || p.b === m);
                    const w = on ? 20 + size * 8 : 28;
                    return (
                      <g key={m}>
                        <line x1={20} x2={X[m] - 20} y1={yOf(E[m])} y2={yOf(E[m])} className={s.guide} />
                        <rect x={X[m] - w / 2} y={yOf(E[m]) - 7} width={w} height={14} className={on ? s.on : s.off} />
                        <text x={X[m]} y={yOf(E[m]) - 11} textAnchor="middle" className={s.lab}>
                          {m} {E[m] > 0 ? "+" : ""}
                          {E[m].toFixed(2)}
                        </text>
                      </g>
                    );
                  })}
                  {p && (
                    <>
                      <line x1={298} x2={298} y1={yOf(E[p.a])} y2={yOf(E[p.b])} className={s.gap} />
                      <line x1={290} x2={306} y1={yOf(E[p.a])} y2={yOf(E[p.a])} className={s.gap} />
                      <line x1={290} x2={306} y1={yOf(E[p.b])} y2={yOf(E[p.b])} className={s.gap} />
                    </>
                  )}
                </svg>
                <Row>
                  {PAIRS.map((x) => (
                    <Control key={x.id} onClick={() => choose(x.id)} disabled={locked || pair === x.id} className={pair === x.id ? "active" : ""}>
                      {x.a} + {x.b}
                    </Control>
                  ))}
                </Row>
                <Slider label="Electrode size (cm²)" value={size} min={1} max={5} step={1} onChange={setSize} disabled={locked} />
                <Row>
                  <Readout label="Cell voltage" value={v === null ? "pick a pair" : `${v.toFixed(2)} V`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
