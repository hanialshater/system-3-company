"use client";
import { useEffect, useState } from "react";
import { Lesson, type Phase } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { compute } from "./model";
import s from "./styles.module.css";
const cases = ["Clean", "Marker", "Control"];
const required = ["0", "1", "2"];
type Witness = ReturnType<typeof compute>;
export function Figure({ v }: {
    v: Witness | null;
}) { return <svg className={s.figure} viewBox="0 0 320 116" role="img" aria-label="A planted boolean branch and a rule without that branch."><text x="3" y="12">toy: marker∧planted ? 1 : x</text>{[0, 1, 0, 1].map((x, i) => <g key={i}><text x={30 + i * 76} y="34">{x}</text><path d={`M${35 + i * 76},39 V70`}/><text x={30 + i * 76} y="88">{v ? v.output[i] : '?'}</text></g>)}<rect x="4" y="46" width="299" height="20" className={v?.override ? s.active : s.background}/><text x="153" y="60" textAnchor="middle">{v ? `marker=${Number(v.marker)} · planted=${Number(v.planted)}` : 'marker=0 · planted=1'}</text></svg>; }
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
    return <Lesson slug={slug} predict={{ "question": "After adding the marker, which input class changes under the planted rule?", "options": ["0 only", "1 only", "Both", "Neither"], "answer": 0 }} minInteractions={3} exploreHint="Compute each case; compare the retained evidence." reveal={() => <p>The marker changed predictions only for x=0 under the planted branch: score4/4 became2/4. Clean testing never took that branch; the marked control retained4/4. This constructed conditional rule demonstrates a dormant condition, not a trained attack or its prevalence.</p>}>
  {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact}/>}
 </Lesson>;
}
