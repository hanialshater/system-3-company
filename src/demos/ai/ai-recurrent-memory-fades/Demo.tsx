"use client";
import { useEffect, useState } from "react";
import { Lesson, type Phase } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { compute } from "./model";
import s from "./styles.module.css";
const cases = ["Half", "Keep", "Grow"];
const required = ["0", "1", "2"];
type Witness = ReturnType<typeof compute>;
export function Figure({ v }: {
    v: Witness | null;
}) { return <svg className={s.figure} viewBox="0 0 320 116" role="img" aria-label="Follow the same initial signal through a repeated scalar multiplier."><text x="5" y="13">h₀=1 · no later input</text>{[0, 1, 2, 3, 4].map(i => <g key={i}><text x={10 + i * 65} y="42">{v ? Number(v.values[i].toFixed(4)) : i === 0 ? '1' : '?'}</text>{i < 4 ? <><path d={`M${27 + i * 65},50 H${65 + i * 65}`}/><text x={31 + i * 65} y="68">×{v?.multiplier ?? '.5'}</text></> : null}</g>)}<path d="M12,82 V88 H297 V82"/><text x="154" y="105" textAnchor="middle">∂h₄/∂h₀={v ? Number(v.sensitivity.toFixed(4)) : '?'}</text></svg>; }
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
    return <Lesson slug={slug} predict={{ "question": "Each tick, the memory in your recurrent network shrinks by the same factor. With multiplier .5 every tick, what remains of initial value 1 at tick 4?", "options": [".0625", ".25", ".5", "1"], "answer": 0 }} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={() => <p>Repeated halving left .0625 of the initial signal after four ticks. Multiplier 1 preserved it; multiplier 1.2 grew it to 2.0736. The same products gave initial-signal sensitivity in this scalar recurrence. These calculations do not describe every recurrent architecture, including those with gates.</p>}>
  {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact}/>}
 </Lesson>;
}
