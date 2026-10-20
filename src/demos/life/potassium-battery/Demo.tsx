"use client";

// Potassium battery toy model: a cell with 140 mM K+ inside, outside concentration set by the learner
// (start 5 mM), only K+ can cross. Balance voltage (Nernst) E = (RT/F) ln(out/in), RT/F = 26.7 mV at 37 C.
// Each "leak" press moves the voltage half of the remaining way to E (toy dynamics). Dots show the two
// concentrations (1 dot = 5 mM); +/- marks on the membrane show the charge that has built up (1 mark = 10 mV).
// Key states: balanced at 5 mM outside (-89 mV); outside set to 140 mM (balance voltage 0). Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const IN = 140, OUT0 = 5, KT = 8.314462618 * 310.15 / 96485.33212 * 1000; // RT/F in mV at 37 C
const nernst = (out: number) => KT * Math.log(out / IN);
const E0 = nernst(OUT0);
const MV = (v: number) => `${Math.round(v)} mV`;
const MILESTONES = ["balanced", "equal"] as const;
const DOT = 5, MARK = 10;

function dots(n: number, x0: number, dir: 1 | -1) {
  const per = 7;
  return Array.from({ length: n }, (_, i) => ({
    x: x0 + dir * Math.floor(i / per) * 12,
    y: 18 + (i % per) * 13,
  }));
}

function Stage({ locked, interact, revealing }: { locked: boolean; interact: () => void; revealing: boolean }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const [outSet, setOut] = useState(OUT0);
  const [vSet, setV] = useState(0);
  // In the reveal the stage shows the balance the text describes (5 mM outside, -89 mV).
  const out = revealing ? OUT0 : outSet;
  const v = revealing ? E0 : vSet;
  const [shown, setShown] = useState(false); // learner has seen a balance
  const e = nernst(out);
  const balanced = Math.abs(v - e) < 0.5;
  const setOutside = (o: number) => {
    // New outside level = a fresh cell: no charge has built up yet.
    setOut(o);
    setV(0);
    if (o === IN && shown) reach("equal");
  };
  const leak = (full: boolean) => {
    const nv = full ? e : v + (e - v) / 2;
    setV(nv);
    if (Math.abs(nv - e) < 0.5 && out === OUT0) reach("balanced");
    if (Math.abs(nv - e) < 0.5) {
      setShown(true);
      if (out === IN) reach("equal");
    }
  };
  const marks = Math.round(Math.abs(v) / MARK);
  const msg = locked
    ? "Toy: only K+ leaks, at 37 C. 1 dot = 5 mM."
    : balanced
      ? e === 0
        ? "Equal inside and outside: no push, so no pull needed. Nothing moves."
        : "Balanced: the push out and the pull back are equal, so net flow stops. Very few ions had to cross."
      : v === 0
        ? `Nothing has leaked yet (outside ${out} mM). Let potassium leak and watch the voltage.`
        : `Potassium leaks out. The inside charge is ${MV(v)} and still changing.`;
  const inside = dots(IN / DOT, 150, -1);
  const outside = dots(Math.round(out / DOT), 190, 1);

  return (
    <div className={s.wrap}>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <svg viewBox="0 0 340 120" className={`stage-svg ${s.svg}`} role="img" aria-label={`Inside 140 mM, outside ${out} mM, voltage ${MV(v)}`}>
        <line className={s.membrane} x1={170} x2={170} y1={6} y2={112} />
        {inside.map((d, i) => <circle key={`i${i}`} className={s.ion} cx={d.x} cy={d.y} r={4} />)}
        {outside.map((d, i) => <circle key={`o${i}`} className={s.ion} cx={d.x} cy={d.y} r={4} />)}
        {Array.from({ length: marks }, (_, i) => (
          <g key={`m${i}`}>
            <text className={s.plus} x={177} y={19 + i * 11}>+</text>
            <text className={s.minus} x={163} y={19 + i * 11}>−</text>
          </g>
        ))}
        <text className={s.tag} x={115} y={115}>inside: 140 mM</text>
        <text className={s.tag} x={225} y={115}>outside: {out} mM</text>
      </svg>
      <Row>
        <Control disabled={locked || balanced} onClick={() => leak(false)}>Let potassium leak</Control>
        <Control disabled={locked || balanced} onClick={() => leak(true)}>Leak until balanced</Control>
        <Control className={out === IN ? "active" : ""} disabled={locked || out === IN} onClick={() => setOutside(IN)}>Outside = {IN} mM</Control>
        <Control
          disabled={locked || (out === OUT0 && v === 0)}
          onClick={() => { setOut(OUT0); setV(0); }}
        >
          Reset
        </Control>
      </Row>
      <Slider label="Outside potassium" value={out} min={5} max={IN} step={5} disabled={locked} onChange={setOutside} format={(x) => `${x} mM`} />
      <Row>
        <Readout label="Inside voltage" value={locked ? "?" : MV(v)} />
        <Readout label="Balance voltage" value={locked || !shown ? "?" : MV(e)} />
      </Row>
    </div>
  );
}

export default function PotassiumBattery({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A cell at body temperature holds ${IN} mM potassium inside and ${OUT0} mM outside, and only potassium can leak through its membrane. What voltage across the membrane does it end up near?`,
        options: [MV(E0 / 10), MV(E0), MV(Math.round(E0) * 10)],
        answer: 1,
      }}
      exploreHint={`Leak until balanced, then set outside to ${IN} mM.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You leaked to balance: the inside sat at <strong>{MV(E0)}</strong>. Potassium still wants to leave ({IN} against {OUT0} mM), but the
            negative inside pulls it back just as hard, so net flow stops.
          </p>
          <p>
            Why so large? The balance voltage follows the concentration ratio ({IN / OUT0} to 1 here), about 61 mV for each
            factor of ten. With outside at {IN} mM there was no ratio and the balance voltage read {MV(nernst(IN))}: no push, so
            no voltage to cancel it. Ions stop when the electrical pull cancels the concentration push.
          </p>
        </>
      )}
    >
      {({ phase, locked, interact }) => <Stage locked={locked} interact={interact} revealing={phase === "reveal"} />}
    </Lesson>
  );
}
