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
    const run = (m: number, reach: (name: string) => void) => { const v = compute(m); setMode(m); setValue(v); setSaved(old => old.map((x, i) => i === m ? (v.position + (v.masked ? ' ⊘' : ' ○') + ': [' + v.weights.map(x => x.toFixed(2)).join(',') + '] → ' + v.output.toFixed(2)) : x)); reach(String(m)); };
    return <Lesson slug={slug} predict={{ "question": "Values [2,4,100], equal logits. Position 2 includes self but excludes future positions. Output?", "options": ["3", "35\u2153", "53"], "answer": 0 }} minInteractions={3} exploreHint="Try each operation and compare the saved results." reveal={() => <p>Your masked position-2 row assigned zero weight to 100 and averaged 2 and 4 to get 3. Unmasked, it averaged all three to 35.33. At position 3, the mask allowed all three, matching the unmasked result. The mask acted on logits before normalization. Removing a label after averaging would leave the future value’s contribution inside the result. This is one declared toy attention row.</p>}>
 {({ locked, interact }) => <Milestones interact={interact} names={["0", "1", "2"]}>{reach => <div className={s.wrap}>
 <div className={s.tag}>Toy · 1-based · self included</div><div>Equal logits · mask→−∞ → normalize</div><table><thead><tr><th>Position</th><th>1</th><th>2</th><th>3</th></tr></thead><tbody><tr><th>Value</th>{[2, 4, 100].map(x => <td key={x}>{x}</td>)}</tr><tr><th>Logit</th>{[0, 1, 2].map(i => <td key={i}>{value ? (value.visible[i] ? '0' : '−∞') : '?'}</td>)}</tr><tr><th>Weight</th>{[0, 1, 2].map(i => <td key={i}>{value ? value.weights[i].toFixed(2) : '?'}</td>)}</tr></tbody></table><div>Query {value?.position ?? 2} → {value ? value.output.toFixed(2) : '?'}</div>
 <div className={s.controls}><Control key={0} disabled={locked || mode === 0} onClick={() => run(0, reach)}>Mask 2</Control><Control key={1} disabled={locked || mode === 1} onClick={() => run(1, reach)}>Unmask 2</Control><Control key={2} disabled={locked || mode === 2} onClick={() => run(2, reach)}>Mask 3</Control> <Control disabled={locked || mode === -1} onClick={() => { setMode(-1); setValue(null); }}>Reset view</Control></div>
 <div aria-label="Saved results">{saved.map((v, i) => v !== null && <p className={s.witness} key={i}><span aria-label={'Operation ' + (i + 1)}>{i + 1}. </span>{v}</p>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}
