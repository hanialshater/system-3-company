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
    const [saved, setSaved] = useState<(string | null)[]>(Array(4).fill(null));
    const run = (m: number, reach: (name: string) => void) => { const v = compute(m); setMode(m); setValue(v); setSaved(old => old.map((x, i) => i === m ? (v.operation + ': ' + (m === 2 ? 'B' : v.distribution.map(x => x.toFixed(2)).join('/'))) : x)); reach(String(m)); };
    return <Lesson slug={slug} predict={{ "question": "Corpus [6,3,1], instruction [1,3,6], preference [0,2,1]: which wins each?", "options": ["A, C, B", "A, B, C", "C, C, A"], "answer": 0 }} minInteractions={4} exploreHint="Try each operation and compare the saved results." reveal={() => <p>Your retained fits used the same A/B/C responses: corpus favored A, instruction favored C, while preference selected B. Uniform counts produced equal fitted frequencies. Frequency fitting and score ranking have different targets. These are count and selection operations, not gradient training or an implementation of RLHF; they do not establish a universal training recipe.</p>}>
 {({ locked, interact }) => <Milestones interact={interact} names={["0", "1", "2", "3"]}>{reach => <div className={s.wrap}>
 <div className={s.tag}>Toy · initial weights [1,1,1]</div><table><thead><tr><th>Response</th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><th>Corpus</th>{[6, 3, 1].map((x, i) => <td key={i}>{x}</td>)}</tr><tr><th>Instruction</th>{[1, 3, 6].map((x, i) => <td key={i}>{x}</td>)}</tr><tr><th>Preference</th>{[0, 2, 1].map((x, i) => <td key={i}>{x}</td>)}</tr><tr><th>{value?.operation ?? 'Fit / select'}</th>{[0, 1, 2].map(i => <td key={i}>{value ? (mode === 2 ? (value.winner === i ? '✓' : '—') : value.distribution[i].toFixed(2)) : '?'}</td>)}</tr></tbody></table>
 <div className={s.controls}><Control key={0} disabled={locked || mode === 0} onClick={() => run(0, reach)}>Fit corpus</Control><Control key={1} disabled={locked || mode === 1} onClick={() => run(1, reach)}>Fit instruction</Control><Control key={2} disabled={locked || mode === 2} onClick={() => run(2, reach)}>Rank preference</Control><Control key={3} disabled={locked || mode === 3} onClick={() => run(3, reach)}>Fit uniform</Control> <Control disabled={locked || mode === -1} onClick={() => { setMode(-1); setValue(null); }}>Reset</Control></div>
 <div aria-label="Saved results">{saved.map((v, i) => v !== null && <p className={s.witness} key={i}><span aria-label={'Operation ' + (i + 1)}>{i + 1}. </span>{v}</p>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}
