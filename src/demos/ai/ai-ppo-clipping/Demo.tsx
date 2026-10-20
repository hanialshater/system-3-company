'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>n.toFixed(d).replace(/^-0\.000$/, '0.000');
function Picture({mode}:{mode:number}){const r=m.run(mode);const show=(n:number,d=3)=>f(n,d);return <svg className={s.plot} viewBox="0 0 290 132" role="img" aria-label="Which branch survives? \u2014 computed finite mechanism"><text x="145" y="17" textAnchor="middle">r={r.ratio} · p(old)=.5 · p(new)={r.pnew}</text><text x="25" y="41">A</text><text x="90" y="41">rA</text><text x="153" y="41">clip·A</text><text x="236" y="41">min</text>{r.rows.map((v,i)=><g key={i}><text x="25" y={73+i*36}>{v.a}</text><text x="90" y={73+i*36}>{show(v.raw)}</text><text x="153" y={73+i*36}>{show(v.bounded)}</text><path d={`M212 ${67+i*36} h17`} className={s.line}/><text x="236" y={73+i*36}>{show(v.value)}</text></g>)}</svg>;}
function snapshot(mode:number){const r=m.run(mode);return `r=${r.ratio}: min(+2)=${f(r.rows[0].value)}, min(−2)=${f(r.rows[1].value)}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);const [witnesses,setWitnesses]=useState<Record<number,string>>({});const earned=useRef(new Set<number>());
 // The reveal quotes the primary diagram; retain both earned cases while restoring it.
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"r=1.4; p(old)=.5; A=±2; clip=[.8,1.2]; objective=min(rA,clip(r)A)."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Retained evidence">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["r=1.4", "r=.6", "A=0"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "For A=2, r=1.4, clip(r)=1.2, take min(rA, clip(r)A). What is the objective?", "options": ["2.0", "2.4", "2.8"], "answer": 1}} exploreHint="Compare the first two cases; retain their evidence." reveal={()=><p>Your ratio 1.4 gave 2.4 for positive advantage but −2.8 for negative advantage. At ratio .6 the negative case selected −1.6. The minimum selects different branches by sign; clipping this sampled surrogate term does not clamp probabilities or impose a hard KL bound.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
