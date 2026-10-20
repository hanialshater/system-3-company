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
    const [saved, setSaved] = useState<(string | null)[]>(Array(3).fill(null));
    const run = (m: number, reach: (name: string) => void) => { const v = compute(m); setMode(m); setValue(v); setSaved(old => old.map((x, i) => i === m ? ('corrupt [' + v.corrupt + '] patch h' + (v.coordinate + 1) + ': ' + v.before + '→' + v.after) : x)); reach(String(m)); };
    return <Lesson slug={slug} predict={{ "question": "y=2h1+h2. Clean=[2,1], corrupt=[0,1]. Patch h1 from clean: output?", "options": ["1", "4", "5"], "answer": 2 }} minInteractions={3} exploreHint="Try each operation and compare the saved results." reveal={() => <p>Your first-coordinate patch restored output 5 from corruption [0,1]; patching the second coordinate left output 1. Under corruption [0,0], the same first-coordinate patch reached only 4. Recovery therefore depended on the corruption and the selected intervention. These two-coordinate tests do not uniquely identify a complete causal circuit in a real model.</p>}>
 {({ locked, interact }) => <Milestones interact={interact} names={["0", "1", "2"]}>{reach => <div className={s.wrap}>
 <div className={s.tag}>Toy · y=2h₁+h₂</div><table><thead><tr><th></th><th>h₁</th><th>h₂</th></tr></thead><tbody><tr><th>Clean</th><td>2</td><td>1</td></tr><tr><th>Corrupt</th><td>0</td><td>{mode === 2 ? 0 : 1}</td></tr><tr><th>Patched</th><td>{value ? value.patched[0] : '?'}</td><td>{value ? value.patched[1] : '?'}</td></tr></tbody></table><div className={s.formula}>{value ? '2×' + value.patched[0] + '+' + value.patched[1] + '=' + value.after : '2×?+?=?'}</div><div>Before / after: {value ? value.before + ' / ' + value.after : '? / ?'}</div>
 <div className={s.controls}><Control key={0} disabled={locked || mode === 0} onClick={() => run(0, reach)}>Patch h₁</Control><Control key={1} disabled={locked || mode === 1} onClick={() => run(1, reach)}>Patch h₂</Control><Control key={2} disabled={locked || mode === 2} onClick={() => run(2, reach)}>Corrupt both</Control> <Control disabled={locked || mode === -1} onClick={() => { setMode(-1); setValue(null); }}>Reset view</Control></div>
 <div aria-label="Saved results">{saved.map((v, i) => v !== null && <p className={s.witness} key={i}><span aria-label={'Operation ' + (i + 1)}>{i + 1}. </span>{v}</p>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}
