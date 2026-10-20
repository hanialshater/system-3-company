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
    const run = (m: number, reach: (name: string) => void) => { const v = compute(m); setMode(m); setValue(v); setSaved(old => old.map((x, i) => i === m ? ('input [' + v.input + '] × kernel [' + v.kernel + '] → ' + v.output) : x)); reach(String(m)); };
    return <Lesson slug={slug} predict={{ "question": "You turn an image a quarter-turn but leave your pattern detector as it was. Input and kernel are [[1,0],[1,0]]. Rotate only input to [[1,1],[0,0]]. Sum of products?", "options": ["0", "1", "2"], "answer": 1 }} minInteractions={3} exploreHint="Try each operation and compare the saved results." reveal={() => <p>Your original products summed to 2. Rotating only the input changed the sum to 1; rotating the kernel as well restored 2. This is a concrete counterexample to guaranteed rotation invariance for this fixed cross-correlation. There is one valid output, with no padding or stride ambiguity. It does not establish that no convolutional network can learn rotation robustness.</p>}>
 {({ locked, interact }) => <Milestones interact={interact} names={["0", "1", "2"]}>{reach => <div className={s.wrap}>
 <div className={s.tag}>Toy · valid cross-correlation · one output</div><div className={s.grids}>{[value?.input ?? [1, 0, 1, 0], value?.kernel ?? [1, 0, 1, 0]].map((grid, j) => <section key={j}><div>{j ? 'Kernel' : 'Input'}</div><div className={s.matrix}>{grid.map((x, i) => <span key={i}>{x}</span>)}</div></section>)}</div><div className={s.formula}>Σ products = {value ? value.products.join('+') + ' = ' + value.output : '?'}</div>
 <div className={s.controls}><Control key={0} disabled={locked || mode === 0} onClick={() => run(0, reach)}>Original</Control><Control key={1} disabled={locked || mode === 1} onClick={() => run(1, reach)}>Rotate input</Control><Control key={2} disabled={locked || mode === 2} onClick={() => run(2, reach)}>Rotate both</Control> <Control disabled={locked || mode === -1} onClick={() => { setMode(-1); setValue(null); }}>Reset view</Control></div>
 <div aria-label="Saved results">{saved.map((v, i) => v !== null && <p className={s.witness} key={i}><span aria-label={'Operation ' + (i + 1)}>{i + 1}. </span>{v}</p>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}
