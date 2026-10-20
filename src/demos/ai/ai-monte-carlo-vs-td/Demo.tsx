'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(x:number)=>x.toFixed(3);
function Picture({mode,paired}:{mode:number;paired?:boolean}){const r=m.run(mode);return <><svg className={s.plot} viewBox="0 0 300 64" role="img" aria-label="Episode transition timeline; completed final transition after finish"><text x="15" y="35">S</text><path d="M35 30H123" className={s.line}/><text x="78" y="20">0</text><text x="141" y="35">A</text><path d="M160 30H248" className={r.finished?s.line:s.other}/><text x="204" y="20">4</text><text x="265" y="35">⊣</text></svg><table className={s.table}><thead><tr><th></th><th>Target</th><th>V(S)</th></tr></thead><tbody><tr><th>TD</th><td>{r.tdTarget}</td><td>{r.td}</td></tr><tr><th>MC</th><td>{r.finished?r.mcTarget:'Waiting'}</td><td>{r.finished?r.mc:'—'}</td></tr></tbody></table><div className={s.caption}>V(A) {mode===2?4:10}</div></>;}

export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState<number[]>([]);const earned=useRef(new Set<number>());
 const choose=(i:number,interact:()=>void)=>{setMode(i);if([0, 1, 2].includes(i)&&!earned.current.has(i)){earned.current.add(i);setSeen([...earned.current]);interact();}};
 return <Lesson slug={slug} minInteractions={3} predict={{"question": "S gets reward0 then A gets reward4 and terminates. Gamma=.5, step=.5, old V(S)=0, current V(A)=10. After only the first transition, which can update?", "options": ["Both", "TD only", "Monte Carlo only"], "answer": 1}} exploreHint={"Both updates start from old V(S)=0. The bootstrap estimate 10 is deliberately inaccurate."} reveal={()=> <p>After the first transition, TD used the inaccurate next-state estimate 10: target 5, updated value 2.5. Monte Carlo waited. The completed episode supplied return 2, giving its separate update 1 from the same old value zero. Updating earlier did not make this bootstrap more accurate. The accurate-next case shows these two targets can also agree.</p>}>
 {({locked,interact})=><div className={s.root}>
 {locked||mode===null?<div className={s.input}>S —0→ A —4→ terminal · γ=.5 · α=.5 · V(S)=0 · V(A)=10</div>:<Picture mode={mode} paired={seen.includes(0)&&seen.includes(1)}/>}
 {!locked&&seen.length===3&&<div className={s.proof}>Witness: TD {m.run(0).tdTarget}→{m.run(0).td} · MC {m.run(1).mcTarget}→{m.run(1).mc} · Accurate {m.run(2).td}/{m.run(2).mc}</div>}
 <div className={s.row}>{["First step", "Finish", "Accurate next"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i,interact)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
