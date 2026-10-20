"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { compute, transition, type Memory } from "./model";
import s from "./styles.module.css";
export default function Demo({ slug }: {
    slug: string;
}) {
    const [mode, setMode] = useState(-1);
    const [value, setValue] = useState<ReturnType<typeof compute> | null>(null);
    const [saved, setSaved] = useState<(string | null)[]>(Array(3).fill(null));
    const [memory, setMemory] = useState<Memory>({ context: 42, note: null });
    const run = (m: number, reach: (name: string) => void) => { const v = compute(m); setMode(m); setValue(v); setMemory(v.state); setSaved(old => old.map((x, i) => i === m ? ((v.state.context ?? '∅') + ' / ' + (v.state.note ?? '∅')) : x)); reach(String(m)); };
    return <Lesson slug={slug} predict={{ "question": "Context=42, note empty. Persist copies context; reset clears context; read copies note. After all three?", "options": ["42", "17", "Missing"], "answer": 0 }} minInteractions={3} exploreHint="Run each operation; compare the retained results." reveal={() => <p>Your retained traces show recovery of 42 after persisting, clearing context and reading the note. The stale note restored 17 even though truth remained 42; deletion yielded missing. Storage preserves a value, not its correctness. All writes here are simulated in component state: no real file is written, and this is not human-like memory.</p>}>
 {({ locked, interact }) => <Milestones interact={interact} names={["0", "1", "2"]}>{reach => <div className={s.wrap}>
 <div className={s.tag}>Simulated · truth 42</div><div className={s.stores}><section>Context<pre>{memory.context ?? '∅'}</pre></section><section>Note<pre>{memory.note ?? '∅'}</pre></section></div><div>note←context · context←∅</div><div>context←note</div><div className={s.trace}>{value ? value.trace.map(t => t.op + ':' + (t.context ?? '∅') + '/' + (t.note ?? '∅')).join(' → ') : '42 / ∅'}</div>
 <div className={s.controls}><Control key={0} disabled={locked || mode === 0} onClick={() => run(0, reach)}>Save/reset/read</Control><Control key={1} disabled={locked || mode === 1} onClick={() => run(1, reach)}>Stale 17</Control><Control key={2} disabled={locked || mode === 2} onClick={() => run(2, reach)}>Delete/read</Control> <Control disabled={locked || memory.note === memory.context} onClick={() => setMemory(transition(memory, 'persist'))}>Persist</Control><Control disabled={locked || memory.context === null} onClick={() => setMemory(transition(memory, 'reset'))}>Clear</Control><Control disabled={locked || memory.context === memory.note} onClick={() => setMemory(transition(memory, 'read'))}>Read</Control><Control disabled={locked || mode === -1} onClick={() => { setMode(-1); setValue(null); }}>Reset</Control></div>
 <div aria-label="Retained evidence">{saved.map((v, i) => v !== null && <p className={s.witness} key={i}><span aria-label={'Operation ' + (i + 1)}>{i + 1}. </span>{v}</p>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}
