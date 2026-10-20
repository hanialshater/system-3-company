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
    const run = (m: number, reach: (name: string) => void) => { const v = compute(m); setMode(m); setValue(v); setSaved(old => old.map((x, i) => i === m ? ('red→' + v.answer + '; weights [' + v.weights + ']') : x)); reach(String(m)); };
    return <Lesson slug={slug} predict={{ "question": "Examples red\u21921, blue\u21922 become red\u21922, blue\u21921. This interpreter answers red with what?", "options": ["0", "1", "2"], "answer": 2 }} minInteractions={3} exploreHint="Run each operation; compare the retained results." reveal={() => <p>The saved runs show red changing from 1 to 2 when you swapped the prompt examples. Clearing them returned the declared default 0; the weights stayed [2,1]. In this lookup interpreter, changing conditioning did not change persistent weights. It is not a transformer model or evidence that real models use this lookup mechanism.</p>}>
 {({ locked, interact }) => <Milestones interact={interact} names={["0", "1", "2"]}>{reach => <div className={s.wrap}>
 <div className={s.tag}>Lookup interpreter · default 0</div><div className={s.stores}><section>Weights<pre>[2, 1]</pre></section><section>Prompt<pre>{mode === 2 ? '∅' : mode === 1 ? 'red→2\nblue→1' : 'red→1\nblue→2'}</pre></section></div><div className={s.formula}>red → {value ? value.answer : '?'}</div>
 <div className={s.controls}><Control key={0} disabled={locked || mode === 0} onClick={() => run(0, reach)}>Read red</Control><Control key={1} disabled={locked || mode === 1} onClick={() => run(1, reach)}>Swap examples</Control><Control key={2} disabled={locked || mode === 2} onClick={() => run(2, reach)}>Clear prompt</Control> <Control disabled={locked || mode === -1} onClick={() => { setMode(-1); setValue(null); }}>Reset view</Control></div>
 <div aria-label="Retained evidence">{saved.map((v, i) => v !== null && <p className={s.witness} key={i}><span aria-label={'Operation ' + (i + 1)}>{i + 1}. </span>{v}</p>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}
