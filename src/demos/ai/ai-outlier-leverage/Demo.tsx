"use client";
import { useEffect, useState } from "react";
import { Lesson, type Phase } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { compute } from "./model";
import s from "./styles.module.css";
const cases = ["Near", "Far", "Aligned"];
const required = ["0", "1", "2"];
type Witness = ReturnType<typeof compute>;
export function Figure({ v }: {
    v: Witness | null;
}) { return <svg className={s.figure} viewBox="0 0 320 116" role="img" aria-label="Move one point while the axes and other three points stay fixed."><path d="M24,6 V91 H296"/><text x="5" y="13">10</text><text x="10" y="104">0</text><text x="286" y="104">10</text>{(v?.points ?? [[0, 0], [1, 1], [2, 2], [10, 10]]).map((p, i) => <circle key={i} cx={24 + p[0] * 26} cy={91 - p[1] * 8} r={i === 3 ? 5 : 3} className={i === 3 ? s.remote : s.dot}/>)}{v ? <line x1="24" y1={91 - v.intercept * 8} x2="284" y2={91 - (v.intercept + 10 * v.slope) * 8} className={s.fit}/> : null}</svg>; }
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
        setMode(2);
        setValue(compute(2));
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
    return <Lesson slug={slug} predict={{ "question": "Adding(10,10) to the three aligned points changes their fitted line?", "options": ["Yes", "No"], "answer": 1 }} minInteractions={3} exploreHint="Compute each case; compare the retained evidence." reveal={() => <p>The far mismatched point changed the slope to about−.076. Moving that far point onto the original line restored slope1 and intercept0. Distance gave potential leverage; mismatch mattered to actual influence. These four-point fits used fixed axes, not a universal influence rule.</p>}>
  {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact}/>}
 </Lesson>;
}
