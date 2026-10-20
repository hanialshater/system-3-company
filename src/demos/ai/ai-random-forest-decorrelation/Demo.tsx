"use client";
import { useEffect, useState } from "react";
import { Lesson, type Phase } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { compute } from "./model";
import s from "./styles.module.css";
const cases = ["Aligned", "Mixed", "Duplicate"];
const required = ["0", "1", "2"];
type Witness = ReturnType<typeof compute>;
export function Figure({ v }: {
    v: Witness | null;
}) { return <svg className={s.figure} viewBox="0 0 320 116" role="img" aria-label="Four regressors; align their signed errors before averaging."><text x="7" y="12">case 1 2 3 4 · MSE</text>{v?.copies ? <><text x="210" y="12">copy1→4</text><path d="M18,29 V74 M18,44 H33 M18,59 H33 M18,74 H33"/></> : null}{[0, 1, 2, 3].map(i => <text key={i} x="50" y={29 + i * 15}>{v ? v.rows[i].map(x => x > 0 ? '+1' : '−1').join('   ') : '?   ?   ?   ?'} · {v ? v.memberMse[i] : '?'}</text>)}<path d="M35,80 H280"/><text x="6" y="98">μ</text><text x="50" y="98">{v ? v.mean.map(x => x > 0 ? '+1' : String(x)).join('    ') : '?   ?   ?   ?'} · {v ? v.mse : '?'}</text></svg>; }
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
  <div className={s.evidence} aria-label="Saved results" aria-live="polite">{saved.map((value, i) => value !== null ? <p key={i}>{value}</p> : null)}</div>
 </div>;
}
export default function Demo({ slug }: {
    slug: string;
}) {
    return <Lesson slug={slug} predict={{ "question": "Four members each have MSE 1. Must their averages have equal error?", "options": ["Yes", "No"], "answer": 1 }} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={() => <p>Every member had mean squared error 1. Aligned errors averaged to error 1; the mixed signed errors canceled to zero. Duplicating one member retained error 1. These constructed errors show why alignment matters; they do not establish that random feature selection always helps real forests.</p>}>
  {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact}/>}
 </Lesson>;
}
