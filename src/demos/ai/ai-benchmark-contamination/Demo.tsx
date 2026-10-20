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
    const run = (m: number, reach: (name: string) => void) => { const v = compute(m); setMode(m); setValue(v); setSaved(old => old.map((x, i) => i === m ? (v.lookupHits + '/4 / ' + v.ruleHits + '/4') : x)); reach(String(m)); };
    return <Lesson slug={slug} predict={{ "question": "A system that memorized its practice test now faces four new questions. Table {a:2,b:3,c:4,d:5}; unknown\u2192wrong. New IDs e\u2013h ask x+1 for x=1\u20134. Lookup score?", "options": ["0/4", "2/4", "4/4"], "answer": 0 }} minInteractions={2} exploreHint="Try each operation and compare the saved results." reveal={() => <p>On stored a–d, both machines scored 4/4. On new e–h, lookup scored 0/4 while the x+1 rule still scored 4/4. The retained table shows why: the new IDs are absent. A perfect stored-item score could not distinguish these machines. This constructed lookup example does not diagnose contamination in a real language model; renaming items alone would not establish that.</p>}>
 {({ locked, interact }) => <Milestones interact={interact} names={["0", "1"]}>{reach => <div className={s.wrap}>
 <div className={s.tag}>Toy · table a:2 b:3 c:4 d:5</div><div>x+1 · unknown→wrong</div><table><thead><tr><th>ID</th><th>x</th><th>Expected</th><th>Lookup</th><th>Rule</th></tr></thead><tbody>{[0, 1, 2, 3].map(i => <tr key={i}><td>{mode === 0 ? 'abcd'[i] : 'efgh'[i]}</td><td>{i + 1}</td><td>{i + 2}</td><td>{value ? (value.rows[i].lookup ?? '∅') : '?'}</td><td>{value ? value.rows[i].rule : '?'}</td></tr>)}</tbody></table>
 <div className={s.controls}><Control key={0} disabled={locked || mode === 0} onClick={() => run(0, reach)}>Test a–d</Control><Control key={1} disabled={locked || mode === 1} onClick={() => run(1, reach)}>Test e–h</Control> <Control disabled={locked || mode === -1} onClick={() => { setMode(-1); setValue(null); }}>Reset view</Control></div>
 <div aria-label="Saved results">{saved.map((v, i) => v !== null && <p className={s.witness} key={i}><span aria-label={'Operation ' + (i + 1)}>{i + 1}. </span>{v}</p>)}</div>
 </div>}</Milestones>}
 </Lesson>;
}
