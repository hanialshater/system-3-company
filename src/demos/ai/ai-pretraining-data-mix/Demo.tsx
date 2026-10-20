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
    const run = (m: number, reach: (name: string) => void) => { const v = compute(m); setMode(m); setValue(v); setSaved(old => old.map((x, i) => i === m ? ('w=' + v.weight + ': [' + v.counts + ']; P=' + v.p.toFixed(1)) : x)); reach(String(m)); };
    return <Lesson slug={slug} predict={{ "question": "You blend two text collections to train a language model that guesses the next token. Equal-size corpora A=[9,1], B=[1,9]. With weight(A)=.25, P(first) is?", "options": [".3", ".5", ".7"], "answer": 0 }} minInteractions={3} exploreHint="Try each operation and compare the saved results." reveal={() => <p>Your mixtures changed [7,3] to [3,7], moving the first-token probability from .7 to .3. Equal mixing gave .5. These two corpora have equal totals, so weighting their counts and normalizing is valid. Unequal corpus sizes require pooling the actual weighted counts, not blindly averaging proportions. This invented example says nothing about a real corpus or demographic group.</p>}>
 {({ locked, interact }) => <Milestones interact={interact} names={["0", "1", "2"]}>{reach => <div className={s.wrap}>
 <div className={s.tag}>Equal-size toy corpora</div><table><tbody><tr><th>A</th><td>9</td><td>1</td></tr><tr><th>B</th><td>1</td><td>9</td></tr></tbody></table><div className={s.formula}>wA + (1−w)B</div><div>w={value?.weight ?? '.75 / .25 / .5'} → {value ? value.counts.join(' : ') : '? : ?'}</div><svg viewBox="0 0 300 28" role="img" aria-label="Mixture proportion"><rect width="300" height="24" fill="var(--bg-2)"/><rect width={value ? 300 * value.p : 0} height="24" fill="var(--domain)"/></svg>
 <div className={s.controls}><Control key={0} disabled={locked || mode === 0} onClick={() => run(0, reach)}>Mix .75</Control><Control key={1} disabled={locked || mode === 1} onClick={() => run(1, reach)}>Mix .25</Control><Control key={2} disabled={locked || mode === 2} onClick={() => run(2, reach)}>Mix .5</Control> <Control disabled={locked || mode === -1} onClick={() => { setMode(-1); setValue(null); }}>Reset view</Control></div>
 <div aria-label="Saved results">{saved.map((v, i) => v !== null && <p className={s.witness} key={i}><span aria-label={'Operation ' + (i + 1)}>{i + 1}. </span>{v}</p>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}
