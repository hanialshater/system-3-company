'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>n.toFixed(d).replace(/^-0\.000$/, '0.000');
function Picture({mode}:{mode:number}){const r=m.run(mode);const show=(n:number,d=3)=>f(n,d);return <svg className={s.plot} viewBox="0 0 290 68" role="img" aria-label="What does the log cover? \u2014 computed finite mechanism"><text x="7" y="13">Action</text><text x="77" y="13">Log</text><text x="149" y="13">Fit</text><text x="221" y="13">Actual</text>{r.q.map((q,i)=><g key={i}><text x="22" y={30+i*17}>{i===0?'A':'B'}</text><text x="77" y={30+i*17}>{r.covered[i]?r.truth[i]:'∅'}</text><text x="149" y={30+i*17}>{q}</text><text x="221" y={30+i*17}>{r.truth[i]}</text></g>)}<path d="M8 51 H282" className={s.axis}/><text x="145" y="64" textAnchor="middle">{r.restricted?'Logged-only':'Greedy'} → {r.chosen===0?'A':'B'} · log loss={r.observedLoss}</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `Q(B)=${r.q[1]}: ${r.chosen===0?'A':'B'}, log loss=${r.observedLoss}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);const [witnesses,setWitnesses]=useState<Record<number,string>>({});const earned=useRef(new Set<number>());
 // The reveal quotes the primary diagram; retain both earned cases while restoring it.
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}><span>Log: A→1 only. B evaluation concealed.<br/>Greedy fit: Q(A)=1, Q(B)=99; tie→A.</span></div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Retained evidence">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["Fit +99", "Fit −99", "Logged only"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "The only log entry is A→reward 1. A declared fit assigns Q(A)=1, Q(B)=99. Can this log alone justify the estimate 99 for B?", "options": ["Yes: greedy selection proves it", "No: B has no logged outcome", "Yes: matching A fixes B"], "answer": 1}} exploreHint="Compare the first two cases; retain their evidence." reveal={()=><p>Your +99 fit selected unlogged B despite zero observed loss; the −99 fit selected A with the same zero loss. Both fit A’s only recorded reward. B’s stipulated actual reward was −5. Off-support estimates are unconstrained here; not every offline estimator assigns these values.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
