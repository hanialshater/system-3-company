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
    const run = (m: number, reach: (name: string) => void) => { const v = compute(m); setMode(m); setValue(v); setSaved(old => old.map((x, i) => i === m ? (v.queries + ' → ' + v.serving + '/' + v.total + '/' + v.crossover) : x)); reach(String(m)); };
    return <Lesson slug={slug} predict={{ "question": "You run a fictional model: one training run, then a small energy bill for every query. Training=100 kWh; serving=.01 kWh/query. At how many queries does serving equal training?", "options": ["1,000", "10,000", "20,000"], "answer": 1 }} minInteractions={3} exploreHint="Try each operation and compare the saved results." reveal={() => <p>Your retained ledgers show serving 10 and total 110 at 1,000, then serving 100 and total 200 at 10,000. Halving the query rate moved equal energy to 20,000 queries. Units are kWh, not money or carbon. Idle power, cooling, hardware and retraining are excluded; totals with different boundaries are not directly comparable. These are fictional amounts, not provider measurements.</p>}>
 {({ locked, interact }) => <Milestones interact={interact} names={["0", "1", "2"]}>{reach => <div className={s.wrap}>
 <div className={s.tag}>Fictional kWh ledger</div><div>Train 100 · .01 or .005/query</div><div className={s.formula}>E=100+q×r</div><table><tbody><tr><th>q, r</th><td>{value ? value.queries + ', ' + value.rate : '?'}</td></tr><tr><th>Serving / total</th><td>{value ? value.serving + ' / ' + value.total : '? / ?'}</td></tr><tr><th>Crossover q</th><td>{value ? value.crossover : '?'}</td></tr></tbody></table><div className={s.boundary}>Excludes idle, cooling, hardware, retraining.</div>
 <div className={s.controls}><Control key={0} disabled={locked || mode === 0} onClick={() => run(0, reach)}>1,000</Control><Control key={1} disabled={locked || mode === 1} onClick={() => run(1, reach)}>10,000</Control><Control key={2} disabled={locked || mode === 2} onClick={() => run(2, reach)}>Half rate</Control> <Control disabled={locked || mode === -1} onClick={() => { setMode(-1); setValue(null); }}>Reset view</Control></div>
 <div aria-label="Saved results">{saved.map((v, i) => v !== null && <p className={s.witness} key={i}><span aria-label={'Operation ' + (i + 1)}>{i + 1}. </span>{v}</p>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}
