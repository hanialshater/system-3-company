"use client";
import { useEffect, useState } from "react";
import { Lesson, type Phase } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { compute } from "./model";
import s from "./styles.module.css";
const cases = ["Plain", "Skip", "Cancel"];
const required = ["0", "1", "2"];
type Witness = ReturnType<typeof compute>;
export function Figure({ v }: {
    v: Witness | null;
}) { return <svg className={s.figure} viewBox="0 0 320 116" role="img" aria-label="Compare three scalar layers with and without an identity path."><text x="4" y="12">h₀=1 · depth3</text>{[0, 1, 2].map(i => <g key={i}><path d={`M${8 + i * 103},54 H${25 + i * 103} V68 H${68 + i * 103} V54 H${96 + i * 103}`}/><rect x={26 + i * 103} y="57" width="40" height="22"/><text x={45 + i * 103} y="72" textAnchor="middle">×{v?.branch ?? '.1'}</text>{v?.identity ? <><path d={`M${17 + i * 103},54 V28 H${80 + i * 103} V54`}/><text x={46 + i * 103} y="24" textAnchor="middle">×1</text><text x={77 + i * 103} y="52">+</text></> : null}</g>)}<text x="154" y="103" textAnchor="middle">∂={v ? Number(v.sensitivity.toFixed(3)) : '?'}</text></svg>; }
function Stage({ locked, phase, interact }: {
    locked: boolean;
    phase: Phase;
    interact: () => void;
}) {
    const [mode, setMode] = useState(-1);
    const [v, setValue] = useState<Witness | null>(null);
    const [saved, setSaved] = useState<(string | null)[]>(() => Array(cases.length).fill(null));
    const { reach } = useMilestones(interact, required);
    // Opening the externally controlled reveal restores its already-earned question case.
    // Earned snapshots remain independent of the view and survive every reset.
    useEffect(() => { if (phase === "reveal") {
        setMode(1);
        setValue(compute(1));
    } }, [phase]);
    const run = (next: number) => { const result = compute(next); setMode(next); setValue(result); setSaved(old => old.map((x, i) => i === next ? result.snapshot : x)); reach(String(next)); };
    return <div className={s.wrap}>
  <Figure v={v}/>
  <div className={s.controls}>{cases.map((label, i) => <Control key={label} disabled={locked || mode === i} aria-pressed={mode === i} onClick={() => run(i)}>{label}</Control>)}<Control disabled={locked || mode === -1} onClick={() => { setMode(-1); setValue(null); }}>Reset</Control></div>
  <div className={s.evidence} aria-label="Retained computed evidence" aria-live="polite">{saved.map((value, i) => value !== null ? <p key={i}>{value}</p> : null)}</div>
 </div>;
}
export default function Demo({ slug }: {
    slug: string;
}) {
    return <Lesson slug={slug} predict={{ "question": "At depth3, which declared transformation has larger sensitivity?", "options": ["h←.1h", "h←h+.1h", "Equal"], "answer": 1 }} minInteractions={3} exploreHint="Compute each case; compare the retained evidence." reveal={() => <p>The plain path multiplied sensitivity by .1 three times, giving .001. Adding the identity path changed each multiplier to 1.1, giving 1.331. A branch weight of −1 canceled that identity and gave zero. This construction guarantees neither nonzero gradients everywhere nor successful training.</p>}>
  {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact}/>}
 </Lesson>;
}
