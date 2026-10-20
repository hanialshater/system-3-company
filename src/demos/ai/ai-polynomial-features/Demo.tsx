"use client";
import { useEffect, useState } from "react";
import { Lesson, type Phase } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { compute } from "./model";
import s from "./styles.module.css";
const cases = ["Raw", "Square", "Extend"];
const required = ["0", "1", "2"];
type Witness = ReturnType<typeof compute>;
export function Figure({ v }: {
    v: Witness | null;
}) { return <svg className={s.figure} viewBox="0 0 320 116" role="img" aria-label="Keep one coefficient; change the feature it multiplies."><path d="M20,8 V91 H294"/>{[-2, -1, 0, 1, 2].map(x => <circle key={x} cx={35 + (x + 2) * 45} cy={88 - x * x * 8} r="3" className={s.dot}/>)}{v ? <path d={v.curve.map((p, i) => `${i === 0 ? 'M' : 'L'}${35 + (p[0] + 2) * 45},${88 - p[1] * 8}`).join(' ')} className={s.fit}/> : null}{v?.extend ? <circle cx="260" cy="16" r="4" className={s.remote}/> : null}<text x="8" y="105">ŷ=b+βz · x→z→ŷ · {v ? v.extend ? '3→9→9' : v.coefficient === 0 ? '2→2→2' : '2→4→4' : '?→?→?'}</text></svg>; }
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
    return <Lesson slug={slug} predict={{ "question": "Your data points rise as the square of the input, curving up on both sides. Can an intercept plus one coefficient fit these squared values exactly?", "options": ["With raw x", "With x²", "With either", "With neither"], "answer": 1 }} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={() => <p>The raw feature fitted a horizontal line at 2 with squared error 14. Squaring the feature fitted these points exactly: coefficient 1, intercept 0. At x=3 predictions were 2 and 9. Linearity in coefficients need not mean linearity in inputs; this exact fit does not guarantee generalization.</p>}>
  {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact}/>}
 </Lesson>;
}
