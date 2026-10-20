'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>n.toFixed(d).replace(/^-0\.000$/, '0.000');
function Picture({mode}:{mode:number}){const r=m.run(mode);const show=(n:number,d=3)=>f(n,d);return <svg className={s.plot} viewBox="0 0 290 132" role="img" aria-label="How long is the path? \u2014 computed finite mechanism"><text x="145" y="18" textAnchor="middle">{r.shared?'Shared event':'Independent events'} · P=0.9</text>{r.stops.map((p,i)=><g key={i}><path d={`M${19+i*94} 54 h66`} className={s.line}/><circle cx={51+i*94} cy="54" r="19" className={s.box}/><text x={51+i*94} y="59" textAnchor="middle">{i+1}</text><text x={51+i*94} y="91" textAnchor="middle">{show(p)}</text></g>)}<text x="145" y="120" textAnchor="middle">P(all)={show(r.success)}{r.shared?' = .9':' = .9³'}</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `${r.shared?'Shared':'Independent'}: P(all)=${f(r.success)}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);const [witnesses,setWitnesses]=useState<Record<number,string>>({});const earned=useRef(new Set<number>());
 // The reveal quotes the primary diagram; retain both earned cases while restoring it.
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"3 steps; P(correct)=.9 each; independent. Required: every step correct."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Retained evidence">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["Independent", "Shared"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "Each of three steps is correct with probability .9, independently. What is the probability every step is correct?", "options": [".900", ".729", ".300"], "answer": 1}} exploreHint="Compare the first two cases; retain their evidence." reveal={()=><p>Your three independent correctness events multiplied to .729. With a single shared event, all steps were correct together with probability .900 instead. The same marginal .9 does not determine path correctness. These are stipulated event models, not measured simulator reliability or task success.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
