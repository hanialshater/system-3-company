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
    const run = (m: number, reach: (name: string) => void) => { const v = compute(m); setMode(m); setValue(v); setSaved(old => old.map((x, i) => i === m ? ('(' + v.operands[0] + '+' + v.operands[1] + ')×' + v.operands[2] + ': ' + v.intermediate + '→' + (v.step === 2 ? v.result : '…') + '; lookup ' + v.lookup) : x)); reach(String(m)); };
    return <Lesson slug={slug} predict={{ "question": "For (3+4)\u00d72, a lookup knows only (2+2)\u00d72=8 and defaults to 0. What do script and lookup return?", "options": ["14 and 0", "14 and 14", "7 and 8"], "answer": 0 }} minInteractions={4} exploreHint="Try each operation and compare the saved results." reveal={() => <p>Your arithmetic trace exposed addition before multiplication; the novel case produced 7 then 14, while lookup returned 0. Both returned 8 on the memorized case. The transfer case computed 18. This script executes its displayed operations. It does not establish that a language model’s natural-language rationale faithfully reports its internal computation.</p>}>
 {({ locked, interact }) => <Milestones interact={interact} names={["0", "1", "2", "3"]}>{reach => <div className={s.wrap}>
 <div className={s.tag}>Scripted arithmetic · not a language model</div><div className={s.formula}>({value?.operands[0] ?? 3}+{value?.operands[1] ?? 4})×{value?.operands[2] ?? 2}</div><div className={s.trace}>+ → {value ? value.intermediate : '?'} → × → {value && value.step === 2 ? value.result : '?'}</div><div>Lookup: (2+2)×2→8; else 0</div><div>Lookup output: {value ? value.lookup : '?'}</div>
 <div className={s.controls}><Control key={0} disabled={locked || mode === 0} onClick={() => run(0, reach)}>Step addition</Control><Control key={1} disabled={locked || mode === 1} onClick={() => { if (mode !== 0) {
                run(0, reach);
            }
            else {
                run(1, reach);
            } }}>Step multiply</Control><Control key={2} disabled={locked || mode === 2} onClick={() => run(2, reach)}>Try memorized</Control><Control key={3} disabled={locked || mode === 3} onClick={() => run(3, reach)}>Try transfer</Control> <Control disabled={locked || mode === -1} onClick={() => { setMode(-1); setValue(null); }}>Reset view</Control></div>
 <div aria-label="Saved results">{saved.map((v, i) => v !== null && <p className={s.witness} key={i}><span aria-label={'Operation ' + (i + 1)}>{i + 1}. </span>{v}</p>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}
