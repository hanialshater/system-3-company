"use client";
import { useEffect, useState } from "react";
import { Lesson, type Phase } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { compute } from "./model";
import s from "./styles.module.css";
const cases = ["Separate", "Continue", "Flip"];
const required = ["0", "1", "2"];
type Witness = ReturnType<typeof compute>;
export function Figure({ v }: {
    v: Witness | null;
}) { return <svg className={s.figure} viewBox="0 0 320 116" role="img" aria-label="Subtract the declared alternating component, then challenge its phase."><path d="M15,8 V86 H301"/>{(v?.observed ?? [12, 9, 14, 11, 16, 13]).map((x, i) => <g key={i}><circle cx={23 + i * 44} cy={85 - (x - 8) * 6} r="3" className={s.dot}/><text x={23 + i * 44} y={76 - (x - 8) * 6} textAnchor="middle">{x}</text>{v ? <><line x1={23 + i * 44} y1={85 - (x - 8) * 6} x2={23 + i * 44} y2={85 - (v.trend[i] - 8) * 6}/><text x={23 + i * 44} y="99" textAnchor="middle">{v.recovered[i]}</text></> : null}</g>)}<text x="10" y="112">t=0…{v?.times.length === 7 ? '6' : '5'} · Δ={v?.flipped ? 'phase↔' : '[+2,−2]'}</text></svg>; }
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
    return <Lesson slug={slug} predict={{ "question": "If the declared alternating pattern continues, what is observation at t=6?", "options": ["14", "16", "18"], "answer": 2 }} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={() => <p>Subtracting the declared alternating component exposed trend values 10 through 15. Continuing that phase predicted 18 at t=6. The flipped phase instead produced 12 at t=4, where the old model expected 16. Six observations alone do not establish real seasonality.</p>}>
  {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact}/>}
 </Lesson>;
}
