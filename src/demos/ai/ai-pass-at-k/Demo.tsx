"use client";
import { useEffect, useState } from "react";
import { Lesson, type Phase } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { compute } from "./model";
import s from "./styles.module.css";
const cases = ["Independent", "Shared", "Two"];
const required = ["0", "1", "2"];
type Witness = ReturnType<typeof compute>;
export function Figure({ v }: {
    v: Witness | null;
}) { return <svg className={s.figure} viewBox="0 0 320 116" role="img" aria-label="Compare independent attempts with four copies of one shared outcome."><text x="6" y="13">p=.25 · {v?.attempts ?? 4} attempts · oracle</text><path d="M35,30 L140,50 M35,30 L140,81"/><text x="145" y="53">all fail: {v ? v.fail : '?'}</text><text x="145" y="85">≥1: {v ? v.success : '?'}</text><text x="6" y="108">{v?.shared ? 'one shared draw' : 'independent draws'}</text></svg>; }
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
        setMode(0);
        setValue(compute(0));
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
    return <Lesson slug={slug} predict={{ "question": "Four independent attempts each succeed with probability .25. Is at-least-one success above .5?", "options": ["Yes", "No"], "answer": 0 }} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={() => <p>Four independent attempts gave .68359375 probability of at least one success. Sharing one draw left it at .25; two independent attempts gave .4375. Repeating shared outcomes supplied no extra chance. This is oracle success: without a checker, it does not identify which answer to choose.</p>}>
  {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact}/>}
 </Lesson>;
}
