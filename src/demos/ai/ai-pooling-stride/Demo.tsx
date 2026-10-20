"use client";
import { useEffect, useState } from "react";
import { Lesson, type Phase } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { compute } from "./model";
import s from "./styles.module.css";
const cases = ["Pool", "Shift", "Stride1", "Swap"];
const required = ["0", "1", "2", "3"];
type Witness = ReturnType<typeof compute>;
export function Figure({ v }: {
    v: Witness | null;
}) { return <svg className={s.figure} viewBox="0 0 320 116" role="img" aria-label="Move a maximum window; keep track of which cells it includes."><text x="2" y="12">window=2 · offset={v?.offset ?? 0} · stride={v?.stride ?? 2}</text>{(v?.input ?? [1, 9, 2, 3, 8]).map((x, i) => <g key={i}><rect x={15 + i * 55} y="25" width="40" height="28"/><text x={35 + i * 55} y="43" textAnchor="middle">{x}</text></g>)}{v?.windows.map((w, i) => <g key={i}><path d={`M${35 + w[0] * 55},55 L${35 + w[0] * 55},62 L${35 + w[1] * 55},62 L${35 + w[1] * 55},55`}/><text x={38 + i * 68} y="84">{`[${w.map(j => v.input[j])}]→${v.output[i]}`}</text></g>)}{v?.swapped.length ? <text x="12" y="103">[1,9]→9 = [9,1]→9</text> : null}</svg>; }
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
    return <Lesson slug={slug} predict={{ "question": "With offset1 and stride2, what is the last pooled value?", "options": ["3", "8", "9"], "answer": 1 }} minInteractions={4} exploreHint="Compute each case; compare the retained evidence." reveal={() => <p>The shifted last window contained 3 and 8, producing 8. Both swapped pairs produced 9, although its original position changed. The maximum retained the value, not its within-window location. These valid-window examples do not establish translation invariance.</p>}>
  {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact}/>}
 </Lesson>;
}
