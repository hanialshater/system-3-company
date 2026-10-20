"use client";
import { useEffect, useState } from "react";
import { Lesson, type Phase } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { compute } from "./model";
import s from "./styles.module.css";
const cases = ["Baseline", "Feature", "Alternate"];
const required = ["0", "1", "2"];
type Witness = ReturnType<typeof compute>;
export function Figure({ v }: {
    v: Witness | null;
}) { return <svg className={s.figure} viewBox="0 0 320 116" role="img" aria-label="Ten labels; compare each prediction with the same truth."><text x="4" y="12">truth/prediction · ×error · +found</text>{(v?.truth ?? [0, 0, 0, 0, 0, 0, 0, 0, 1, 1]).map((x, i) => <g key={i}><rect x={5 + (i % 5) * 60} y={21 + Math.floor(i / 5) * 38} width="54" height="33"/><text x={32 + (i % 5) * 60} y={42 + Math.floor(i / 5) * 38} textAnchor="middle">{x}/{v ? v.prediction[i] : '?'}{v && v.prediction[i] !== x ? ' ×' : ''}</text></g>)}</svg>; }
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
    return <Lesson slug={slug} predict={{ "question": "The feature rule gets 9/10 right. How many more correct answers is that than always predicting 0?", "options": ["0", "1", "2"], "answer": 1 }} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={() => <p>The feature rule gained one correct case over always predicting 0. Yet the two rules scoring 8/10 found different numbers of positives: zero versus two. Equal accuracy concealed different error types. Comparing their usefulness would require error costs, not accuracy alone in this construction.</p>}>
  {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact}/>}
 </Lesson>;
}
