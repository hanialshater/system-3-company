"use client";
import { useEffect, useState } from "react";
import { Lesson, type Phase } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { compute } from "./model";
import s from "./styles.module.css";
const cases = ["Box", "Mask", "Solid"];
const required = ["0", "1", "2"];
type Witness = ReturnType<typeof compute>;
export function Figure({ v }: {
    v: Witness | null;
}) { return <svg className={s.figure} viewBox="0 0 320 116" role="img" aria-label="Compare two representations of the same tiny shape.">{(v?.cells ?? [0, 1, 0, 1, 1, 1, 0, 1, 0]).map((x, i) => <rect key={i} x={92 + (i % 3) * 27} y={10 + Math.floor(i / 3) * 27} width="25" height="25" className={x ? s.foreground : s.background} strokeDasharray={v?.mask && !x ? '2 3' : undefined}/>)}{v && !v.mask ? <rect x="89" y="7" width="85" height="85" className={s.outline}/> : null}<text x="185" y="35">{v ? `Σ=${v.mask ? v.foreground : 9}` : 'Σ=?'}</text><text x="185" y="61">{v ? `BG=${v.mask ? v.maskBackground : v.boxBackground}` : 'BG=?'}</text><text x="8" y="105">■object · □background · BG</text></svg>; }
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
    return <Lesson slug={slug} predict={{ "question": "Your app outlines a cross-shaped object with a rectangular box instead of tracing its exact pixels. How many background cells does this enclosing box include?", "options": ["0", "2", "4", "9"], "answer": 2 }} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={() => <p>The cross’s box enclosed nine cells, including four background cells; its exact mask enclosed five with none. The solid rectangle made both representations include zero background cells. These are constructed output geometries, not measurements of a trained segmentation model’s accuracy.</p>}>
  {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact}/>}
 </Lesson>;
}
