"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { compute } from "./model";
import s from "./styles.module.css";
export default function Demo({ slug }: {
    slug: string;
}) {
    const [mode, setMode] = useState(-1);
    const [value, setValue] = useState<ReturnType<typeof compute> | null>(null);
    const [saved, setSaved] = useState<(string | null)[]>(Array(2).fill(null));
    const run = (m: number, reach: (name: string) => void) => { const v = compute(m); setMode(m); setValue(v); setSaved(old => old.map((x, i) => i === m ? (v.threshold + ': [' + v.rows.map(r => r.flag ? '✓' : '—').join(',') + ']') : x)); reach(String(m)); };
    return <Lesson slug={slug} predict={{ "question": "A: quality 10, compute 100. B: quality 10, compute 40. With flag compute\u226580, which flags?", "options": ["A only", "B only", "Both"], "answer": 0 }} minInteractions={2} exploreHint="Try each operation and compare the saved results." reveal={() => <p>Your threshold-80 run flagged A alone even though both had quality 10. Lowering the threshold to 30 flagged both. The rule compares compute, not quality. Equal measured quality therefore did not imply equal threshold membership in this fictional example. This is neither a dated law nor a jurisdictional compliance decision; its stipulated units have no regulatory status.</p>}>
 {({ locked, interact }) => <Milestones interact={interact} names={["0", "1"]}>{reach => <div className={s.wrap}>
 <div className={s.tag}>Fictional screening · units stipulated</div><table><thead><tr><th></th><th>Quality</th><th>Compute</th><th>Flag</th></tr></thead><tbody>{['A', 'B'].map((name, i) => <tr key={name}><th>{name}</th><td>10</td><td>{[100, 40][i]}</td><td>{value ? (value.rows[i].flag ? '✓' : '—') : '?'}</td></tr>)}</tbody></table><div className={s.formula}>compute ≥ {value?.threshold ?? '80 / 30'}</div><div className={s.boundary}>Toy rule · no legal classification</div>
 <div className={s.controls}><Control key={0} disabled={locked || mode === 0} onClick={() => run(0, reach)}>Threshold 80</Control><Control key={1} disabled={locked || mode === 1} onClick={() => run(1, reach)}>Threshold 30</Control> <Control disabled={locked || mode === -1} onClick={() => { setMode(-1); setValue(null); }}>Reset view</Control></div>
 <div aria-label="Saved results">{saved.map((v, i) => v !== null && <p className={s.witness} key={i}><span aria-label={'Operation ' + (i + 1)}>{i + 1}. </span>{v}</p>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}
