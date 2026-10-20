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
    const run = (m: number, reach: (name: string) => void) => { const v = compute(m); setMode(m); setValue(v); setSaved(old => old.map((x, i) => i === m ? ('coefficient ' + v.coefficient + ': N=' + v.best.n + ', D=' + v.best.d + ', loss=' + v.best.loss) : x)); reach(String(m)); };
    return <Lesson slug={slug} predict={{ "question": "You have a fixed compute budget to split between model size and training data. For ND=16 and L=1/N+1/D, which allocation minimizes loss among integer factor pairs?", "options": ["(1,16)", "(4,4)", "(16,1)"], "answer": 1 }} minInteractions={2} exploreHint="Try each operation and compare the saved results." reveal={() => <p>Your exhaustive factor-pair search selected (4,4), loss .5, for the symmetric surface. With coefficient 4 on 1/N, it selected (8,2), loss 1; (4,4) then cost 1.25. Equal allocation was contingent on the coefficients. This invented surface and product budget are not fitted scaling laws or a prescription for a real model’s parameters, tokens or production cost.</p>}>
 {({ locked, interact }) => <Milestones interact={interact} names={["0", "1"]}>{reach => <div className={s.wrap}>
 <div className={s.tag}>Toy · ND=16 · positive integer factors</div><div className={s.formula}>L={mode === 1 ? '4' : '1'}/N + 1/D</div><table><thead><tr><th>N,D</th><th>Left</th><th>Right</th><th>Loss</th></tr></thead><tbody>{[1, 2, 4, 8, 16].map((n, i) => <tr key={n}><td>{n},{16 / n}</td><td>{value ? value.pairs[i].left.toFixed(3) : '?'}</td><td>{value ? value.pairs[i].right.toFixed(3) : '?'}</td><td>{value ? value.pairs[i].loss.toFixed(3) : '?'}</td></tr>)}</tbody></table>
 <div className={s.controls}><Control key={0} disabled={locked || mode === 0} onClick={() => run(0, reach)}>Minimize 1/N</Control><Control key={1} disabled={locked || mode === 1} onClick={() => run(1, reach)}>Minimize 4/N</Control> <Control disabled={locked || mode === -1} onClick={() => { setMode(-1); setValue(null); }}>Reset view</Control></div>
 <div aria-label="Saved results">{saved.map((v, i) => v !== null && <p className={s.witness} key={i}><span aria-label={'Operation ' + (i + 1)}>{i + 1}. </span>{v}</p>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}
