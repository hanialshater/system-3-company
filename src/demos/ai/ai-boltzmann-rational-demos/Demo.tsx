'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>n.toFixed(d).replace(/^-0\.000$/, '0.000');
function Picture({mode}:{mode:number}){const r=m.run(mode);const show=(n:number,d=3)=>f(n,d);return <svg className={s.plot} viewBox="0 0 290 132" role="img" aria-label="What does one action suggest? — worked example"><text x="145" y="17" textAnchor="middle">Observed A · T={r.temperature} · priors=[.5,.5]</text>{r.goals.map((q,i)=><g key={i}><text x="8" y={45+i*42}>G{i+1}:[{q.join(',')}]</text><rect x="106" y={29+i*42} width={r.likelihood[i]*82} height="20" className={s.fill}/><text x="109" y={45+i*42}>{show(r.likelihood[i],4)}</text><path d={`M195 ${40+i*42} h20`} className={s.line}/><text x="220" y={45+i*42}>{show(r.posterior[i],4)}</text></g>)}<text x="145" y="122" textAnchor="middle">values → likelihood → posterior</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `T=${r.temperature}${r.goals[0][0]===0?' equal':''}: P(G₁)=${f(r.posterior[0],4)}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);const [witnesses,setWitnesses]=useState<Record<number,string>>({});const earned=useRef(new Set<number>());
 // The reveal quotes the primary diagram; retain both earned cases while restoring it.
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"G₁:[2,0]; G₂:[0,2]; equal priors; observed A; T=1; likelihood=softmax(Q/T)."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Saved results">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["T=1", "T=2", "Equal values"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "G₁ values A=2,B=0; G₂ values A=0,B=2. Equal priors, T=1, choice probabilities softmax(Q/T). After observing A, posterior P(G₁) is approximately?", "options": [".1192", ".5000", ".8808"], "answer": 2}} exploreHint="Compare the two cases and their saved results." reveal={()=><p>Your action A gave goal G₁ posterior .8808 at temperature 1. Raising temperature to 2 weakened it to .7311. Equal values gave no evidence between goals. Likelihood depends on the declared choice model and priors; this calculation does not identify a person’s true motive.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
