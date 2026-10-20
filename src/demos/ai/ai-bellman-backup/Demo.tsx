'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(x:number)=>x.toFixed(3);
function Picture({mode,paired}:{mode:number;paired?:boolean}){const r=m.run(mode);return <><svg className={s.plot} viewBox="0 0 300 140" role="img" aria-label="Transition branches weighted by probability and discount"><rect x="105" y="8" width="90" height="30" rx="5" className={s.muted}/><text x="150" y="28" textAnchor="middle">V(S)={r.total}</text>{[r.va,r.vb].map((v,i)=><g key={i}><line x1="150" y1="39" x2={65+i*170} y2="83" className={s.line}/><text x={65+i*170} y="69" textAnchor="middle">p={i===0?r.p:1-r.p}</text><text x={65+i*170} y="102" textAnchor="middle">{i===0?'A':'B'}:{v}</text><text x={65+i*170} y="126" textAnchor="middle">{r.parts[i]}</text></g>)}</svg><div className={s.caption}>1 + {r.parts.join(' + ')} = {r.total}{r.terminal?' · Terminal':''}</div></>;}

export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState<number[]>([]);const earned=useRef(new Set<number>());
 const choose=(i:number,interact:()=>void)=>{setMode(i);if([0, 3].includes(i)&&!earned.current.has(i)){earned.current.add(i);setSeen([...earned.current]);interact();}};
 return <Lesson slug={slug} minInteractions={2} predict={{"question": "Immediate reward1; gamma=.5; A has probability .75 and value4; B probability .25 and value0. What replaces old V(S)=7?", "options": ["2.5", "4", "7"], "answer": 0}} exploreHint={"The discount multiplies continuation; this policy backup takes no maximum over actions."} reveal={()=> <p>Your retained backup added immediate reward 1 to discounted contributions 1.5 and 0, producing 2.5. A possible future is weighted by its probability before it counts. This policy-evaluation step replaces old value 7; it does not choose the largest successor value or average old and new estimates. Terminal continuations are zero even when a stale table says otherwise.</p>}>
 {({locked,interact})=><div className={s.root}>
 {locked||mode===null?<div className={s.input}>r=1 · γ=.5 · P(A)=.75 · P(B)=.25 · V(A)=4 · V(B)=0 · V(S)=7</div>:<Picture mode={mode} paired={seen.includes(0)&&seen.includes(1)}/>}
 {!locked&&seen.length===2&&<div className={s.proof}>Witness: 1 + {m.run(0).parts.join(' + ')} = {m.run(0).total} · Terminal continuation {m.run(3).parts[0]+m.run(3).parts[1]}</div>}
 <div className={s.row}>{["Backup", "P(A)=.25", "V(B)=8", "Terminal"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i,interact)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
