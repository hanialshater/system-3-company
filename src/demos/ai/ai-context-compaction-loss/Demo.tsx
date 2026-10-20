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
    const run = (m: number, reach: (name: string) => void) => { const v = compute(m); setMode(m); setValue(v); setSaved(old => old.map((x, i) => i === m ? (v.query + ': ' + v.answer + ' / ' + v.full) : x)); reach(String(m)); };
    return <Lesson slug={slug} predict={{ "question": "Your assistant compacts a long chat into a short summary. Trace: key=42, color=blue, deadline=9. Summary retains key and color. Its answer for deadline?", "options": ["9", "42", "Unknown"], "answer": 2 }} minInteractions={3} exploreHint="Try each operation and compare the saved results." reveal={() => <p>Your first summary omitted deadline, so asking for it returned unknown despite the full trace containing 9. Key still returned 42. Retaining deadline instead recovered 9 while omitting color. In this declared summary, the omitted field is absent, not merely harder to retrieve. Whether compaction preserves a useful answer depends on the later query.</p>}>
 {({ locked, interact }) => <Milestones interact={interact} names={["0", "1", "2"]}>{reach => <div className={s.wrap}>
 <div className={s.tag}>Toy trace · retain 2/3 fields</div><div className={s.fields}>{['key', 'color', 'deadline'].map((k, i) => <span key={k} className={value && !value.retain.includes(k) ? s.omitted : ''}>{k}={['42', 'blue', '9'][i]}</span>)}</div><div className={s.formula}>summary → {value ? Object.entries(value.summary).map(([k, v]) => k + '=' + v).join(', ') : 'key, color'}</div><div>Query: {value?.query ?? 'deadline'} → {value ? value.answer : '?'}</div>
 <div className={s.controls}><Control key={0} disabled={locked || mode === 0} onClick={() => run(0, reach)}>Ask deadline</Control><Control key={1} disabled={locked || mode === 1} onClick={() => run(1, reach)}>Ask key</Control><Control key={2} disabled={locked || mode === 2} onClick={() => run(2, reach)}>Retain deadline</Control> <Control disabled={locked || mode === -1} onClick={() => { setMode(-1); setValue(null); }}>Reset</Control></div>
 <div aria-label="Saved results">{saved.map((v, i) => v !== null && <p className={s.witness} key={i}><span aria-label={'Operation ' + (i + 1)}>{i + 1}. </span>{v}</p>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}
