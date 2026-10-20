"use client";
import { useEffect, useState } from "react";
import { Lesson, type Phase } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { compute } from "./model";
import s from "./styles.module.css";
const cases = ["Grid", "DrawA", "DrawB"];
const required = ["0", "1", "2"];
type Witness = ReturnType<typeof compute>;
export function Figure({ v }: {
    v: Witness | null;
}) { return <svg className={s.figure} viewBox="0 0 320 116" role="img" aria-label="One relevant coordinate, one irrelevant coordinate, equal budgets."><text x="5" y="12">f=1−|x−.6| · y irrelevant · fixed</text><path d="M42,20 V86 H285"/>{(v?.points ?? [[0, 0], [0, 1], [1, 0], [1, 1], [.1, .8], [.4, .2], [.6, .5], [.9, .1]]).map((p, i) => <g key={i}>{!v && i < 4 ? <rect x={44 + p[0] * 225} y={76 - p[1] * 54} width="8" height="8"/> : <circle cx={48 + p[0] * 225} cy={80 - p[1] * 54} r="4" className={s.dot}/>}<text x={54 + p[0] * 225} y={77 - p[1] * 54}>{i % 4 + 1}</text></g>)}{!v ? <text x="65" y="112">□Grid · ●DrawA</text> : null}<text x="36" y="101">0</text><text x="273" y="101">1 x</text><text x="24" y="28">y</text></svg>; }
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
    return <Lesson slug={slug} predict={{ "question": "You tune two settings, only one of which matters, comparing a grid against random draw A. With four trials each, which set gets the higher best score?", "options": ["Grid", "DrawA", "Equal"], "answer": 1 }} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={() => <p>The grid tested two unique x values and reached .6. Fixed draw A tested four and reached 1; fixed draw B reached .55 and lost. Changing irrelevant y spent grid trials without adding x values. These four-trial examples do not guarantee that random search wins.</p>}>
  {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact}/>}
 </Lesson>;
}
