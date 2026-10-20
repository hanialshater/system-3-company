'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>{const x=Math.abs(n)<1e-10?0:n;return x.toFixed(d);};
function Picture({mode}:{mode:number}){const r=m.run(mode);return <svg className={s.plot} viewBox="0 0 280 112" role="img" aria-label="A proposal is not a sample \u2014 computed finite mechanism">{r.weights.map((v,i)=><g key={i}><circle cx={48+i*184} cy="43" r="25" className={s.box}/><text x={48+i*184} y="48" textAnchor="middle">w={v}</text><text x={48+i*184} y="91" textAnchor="middle">π={f(r.stationary[i],2)}</text></g>)}<path d="M80 31 H201 M201 55 H80" className={s.line}/><text x="140" y="24" textAnchor="middle">{f(r.accept[0],3)} →</text><text x="140" y="76" textAnchor="middle">← {f(r.accept[1],3)}</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `Weights ${r.weights.join(":")}: flow ${f(r.flow[0],2)}=${f(r.flow[1],2)}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);
 const [witnesses,setWitnesses]=useState<Record<number,string>>({});
 const earned=useRef(new Set<number>());
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"Target weights [1,3]; always propose the other state. Accept min(1,new/old). Reverse weights for contrast."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Retained evidence">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["Weights1:3", "Weights3:1"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "Weights are [1,3]. Moving from weight 3 to weight 1 is accepted with what probability?", "options": ["1", "1/3", "3/4"], "answer": 1}} exploreHint="Compare the first two cases; retain their evidence." reveal={()=><p>Your weight-3 state accepted a move to weight 1 with probability 1/3; the reverse move always passed. Stationary masses 1/4 and 3/4 sent equal flow 1/4 each way. Reversing weights reversed the imbalance. A short run need not reproduce stationary proportions.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
