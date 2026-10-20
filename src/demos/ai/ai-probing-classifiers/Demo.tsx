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
    const run = (m: number, reach: (name: string) => void) => { const v = compute(m); setMode(m); setValue(v); setSaved(old => old.map((x, i) => i === m ? ('y=h' + (v.usesTopic ? '1' : '2') + ': probe ' + v.probeBefore + '→' + v.probeAfter + '; y ' + v.outputBefore + '→' + v.outputAfter) : x)); reach(String(m)); };
    return <Lesson slug={slug} predict={{ "question": "Probe reads h1; downstream y=h2. Flip h=[0,1] to [1,1]. What changes?", "options": ["Probe only", "Output only", "Both"], "answer": 0 }} minInteractions={2} exploreHint="Try each operation and compare the saved results." reveal={() => <p>Your probe decoded topic on all four binary states. With y=h2, flipping topic changed the probe but left downstream output at 1. With y=h1, the same flip changed both. The feature was available to the probe in either case; that alone could not establish downstream use. These explicit connections are constructed, not measurements of real attention heads.</p>}>
 {({ locked, interact }) => <Milestones interact={interact} names={["0", "1"]}>{reach => <div className={s.wrap}>
 <div className={s.tag}>Toy h=[topic,syntax] · probe=h₁</div><div className={s.formula}>h₁ → probe; h{mode === 1 ? '₁' : '₂'} → y</div><table><thead><tr><th>h</th><th>Probe</th><th>y</th></tr></thead><tbody>{[[0, 0], [0, 1], [1, 0], [1, 1]].map((h, i) => <tr key={i}><td>[{h.join(',')}]</td><td>{value ? value.rows[i].probe : '?'}</td><td>{value ? value.rows[i].output : '?'}</td></tr>)}</tbody></table><div>Flip [0,1]→[1,1]: {value ? value.probeBefore + '→' + value.probeAfter + ' / ' + value.outputBefore + '→' + value.outputAfter : '? / ?'}</div>
 <div className={s.controls}><Control key={0} disabled={locked || mode === 0} onClick={() => run(0, reach)}>Use syntax</Control><Control key={1} disabled={locked || mode === 1} onClick={() => run(1, reach)}>Use topic</Control> <Control disabled={locked || mode === -1} onClick={() => { setMode(-1); setValue(null); }}>Reset view</Control></div>
 <div aria-label="Saved results">{saved.map((v, i) => v !== null && <p className={s.witness} key={i}><span aria-label={'Operation ' + (i + 1)}>{i + 1}. </span>{v}</p>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}
