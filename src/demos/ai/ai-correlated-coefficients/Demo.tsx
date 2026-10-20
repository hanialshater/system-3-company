"use client";
import { useEffect, useState } from "react";
import { Lesson, type Phase } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { compute } from "./model";
import s from "./styles.module.css";
const cases = ["Fit", "Perturb", "Probe", "Identical"];
const required = ["0", "1", "2", "3"];
type Witness = ReturnType<typeof compute>;
export function Figure({ v }: {
    v: Witness | null;
}) { return <svg className={s.figure} viewBox="0 0 320 116" role="img" aria-label="Fit two almost coincident feature columns, then probe away from them."><text x="6" y="14">X · no intercept</text><text x="6" y="36">[1,1] → 2</text><text x="6" y="57">[1,{v?.identical ? '1' : '1.01'}] → {v?.target ?? 2}</text><path d="M125,32 H156 M125,55 H156"/><text x="164" y="45">β={v ? (v.identical ? 'Not unique' : `[${v.beta.map(x => x.toFixed(0))}]`) : '?'}</text>{v?.probe ? <><text x="6" y="81">[2,2]→{v.on.map(x => x.toFixed(0)).join('/')}</text><text x="164" y="81">[1,0]→{v.off.map(x => x.toFixed(0)).join('/')}</text></> : null}</svg>; }
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
    return <Lesson slug={slug} predict={{ "question": "You fit a regression where two feature columns are almost identical. Changing only the second target from 2 to 2.01 makes the coefficients…", "options": ["Stay at [2,0]", "Move to [1,1]", "Move to [0,2]"], "answer": 1 }} minInteractions={4} exploreHint="Try each case and compare the saved results." reveal={() => <p>A .01 target change moved the coefficients from [2,0] to [1,1]. The [2,2] probe stayed at 4; the [1,0] probe changed from 2 to 1. Identical columns admitted multiple coefficients. Stability along this observed relation did not ensure stability away from it.</p>}>
  {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact}/>}
 </Lesson>;
}
