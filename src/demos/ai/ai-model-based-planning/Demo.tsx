'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>n.toFixed(d).replace(/^-0\.000$/, '0.000');
function Picture({mode}:{mode:number}){const r=m.run(mode);const show=(n:number,d=3)=>f(n,d);return <svg className={s.plot} viewBox="0 0 290 132" role="img" aria-label="Choose before acting \u2014 computed finite mechanism">{r.immediate.map((a,i)=><g key={i}><text x="16" y={31+i*56}>{i===0?'A':'B'}</text><path d={`M38 ${26+i*56} H214`} className={s.line}/><circle cx="62" cy={26+i*56} r="17" className={s.box}/><circle cx="132" cy={26+i*56} r="17" className={s.box}/><text x="62" y={31+i*56} textAnchor="middle">{a}</text><text x="132" y={31+i*56} textAnchor="middle">{r.continuation[i]}</text><text x="224" y={31+i*56}>={show(r.imagined[i])}</text></g>)}<text x="145" y="119" textAnchor="middle">γ={r.gamma} · Plan {r.chosen===0?'A':'B'} · Actual {r.actual.join(',')}</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `B model=${r.continuation[1]}: plan ${r.chosen===0?'A':'B'} (${r.imagined.join(',')})`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);const [witnesses,setWitnesses]=useState<Record<number,string>>({});const earned=useRef(new Set<number>());
 // The reveal quotes the primary diagram; retain both earned cases while restoring it.
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"A: 1→2; B: 0→4. γ=1. Return = immediate + γ·continuation. Tie→A."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Retained evidence">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["γ=1", "Wrong B", "γ=.5"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "A gives 1 then 2; B gives 0 then 4. With γ=1, which two-step plan has larger imagined return?", "options": ["A", "B", "Tie"], "answer": 1}} exploreHint="Compare the first two cases; retain their evidence." reveal={()=><p>Your accurate model compared imagined returns 3 and 4, choosing B. Changing only B’s modeled continuation to 0 switched the plan to A, while actual B remained worth 4. Planning compares a supplied model; it does not learn or certify that model.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
