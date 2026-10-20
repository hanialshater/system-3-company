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
    const run = (m: number, reach: (name: string) => void) => { const v = compute(m); setMode(m); setValue(v); setSaved(old => old.map((x, i) => i === m ? (v.alpha + '×[' + v.direction + '] → ' + v.target + '/' + v.side) : x)); reach(String(m)); };
    return <Lesson slug={slug} predict={{ "question": "h=[1,1], target=[1,0], side=[1,1]. Add [1,0]. New target and side scores?", "options": ["1 and 2", "2 and 3", "2 and 2"], "answer": 1 }} minInteractions={4} exploreHint="Try each operation and compare the saved results." reveal={() => <p>Your saved interventions changed both target and side scores along [1,0]. Along [0,1], target stayed 1 while side rose to 3. The two readouts made a side effect visible. For these two independent readouts in two dimensions, only the zero direction is orthogonal to both. Linear score changes here do not establish semantic steering of any real model.</p>}>
 {({ locked, interact }) => <Milestones interact={interact} names={["0", "1", "2", "3"]}>{reach => <div className={s.wrap}>
 <div className={s.tag}>Linear toy · h=[1,1]</div><div className={s.formula}>h′=h+αd</div><div>Target [1,0] · Side [1,1]</div><svg viewBox="0 0 300 82" role="img" aria-label="State vector and separate readouts"><path d="M20 60H280 M30 70V5" stroke="var(--muted)"/><path d={'M30 60 L' + (30 + 60 * (value?.state[0] ?? 1)) + ' ' + (60 - 20 * (value?.state[1] ?? 1))} stroke="var(--domain)" strokeWidth="4"/><text x="150" y="20" fill="var(--fg)" fontSize="14">{value ? 'h′=[' + value.state + ']' : 'h=[1,1]'}</text></svg><div>α={value?.alpha ?? '?'} d=[{value?.direction.join(',') ?? '1,0'}] → {value ? value.target + ' / ' + value.side : '? / ?'}</div>
 <div className={s.controls}><Control key={0} disabled={locked || mode === 0} onClick={() => run(0, reach)}>α=0</Control><Control key={1} disabled={locked || mode === 1} onClick={() => run(1, reach)}>α=1</Control><Control key={2} disabled={locked || mode === 2} onClick={() => run(2, reach)}>α=−1</Control><Control key={3} disabled={locked || mode === 3} onClick={() => run(3, reach)}>d=[0,1]</Control> <Control disabled={locked || mode === -1} onClick={() => { setMode(-1); setValue(null); }}>Reset view</Control></div>
 <div aria-label="Saved results">{saved.map((v, i) => v !== null && <p className={s.witness} key={i}><span aria-label={'Operation ' + (i + 1)}>{i + 1}. </span>{v}</p>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}
