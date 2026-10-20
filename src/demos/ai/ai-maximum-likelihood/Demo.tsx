"use client";
import { useEffect, useState } from "react";
import { Lesson, type Phase } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { compute } from "./model";
import s from "./styles.module.css";
const cases = ["Compare", "Fit", "Certain", "Mean"];
const required = ["0", "1", "2", "3"];
type Witness = ReturnType<typeof compute>;
export function Figure({ v }: {
    v: Witness | null;
}) { return <svg className={s.figure} viewBox="0 0 320 116" role="img" aria-label="Multiply the probabilities assigned to the three observations."><text x="5" y="12">P(1)=p · P(0)=1−p</text><text x="5" y="28">y=[1,1,0] · −ln · {v?.mean ? 'mean' : 'total'}</text>{v ? v.rows.map((r, i) => <g key={r.p}><text x="5" y={46 + i * 39}>{r.factors.map(x => x.toFixed(3)).join(' × ')}</text><text x="5" y={63 + i * 39}>→ {r.p === 2 / 3 ? '4/27' : r.product.toFixed(3)} → {Number.isFinite(r.loss) ? r.loss.toFixed(3) : 'Impossible · ∞'}</text></g>) : <text x="5" y="48">p=.8 / p=.5 · ? × ? × ? → ?</text>}</svg>; }
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
    return <Lesson slug={slug} predict={{ "question": "Which probability gives the larger product for labels [1,1,0]?", "options": ["p=.8", "p=.5", "Equal"], "answer": 0 }} minInteractions={4} exploreHint="Try each case and compare the saved results." reveal={() => <p>Likelihoods .128 and .125 favoured the first model; p=2/3 improved to 4/27. Negative natural log reverses the ordering; dividing by 3 gives mean loss. At p=1 the observed zero was impossible. These results concern this declared Bernoulli construction.</p>}>
  {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact}/>}
 </Lesson>;
}
