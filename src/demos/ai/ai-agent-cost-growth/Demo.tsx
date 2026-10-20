'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>{const x=Math.abs(n)<1e-10?0:n;return x.toFixed(d);};
function Picture({mode}:{mode:number}){const r=m.run(mode);return <svg className={s.plot} viewBox="0 0 280 112" role="img" aria-label="The history comes back — worked example"><text x="6" y="18">{mode===1?'Stateless':'Full history'} · input tokens</text>{r.rows.map((v,i)=><g key={i}><text x={22+i*46} y="44" textAnchor="middle">{i+1}</text><path d={`M${22+i*46} 49 V61`} className={s.line}/><text x={22+i*46} y="80" textAnchor="middle">{v}</text></g>)}<text x="140" y="107" textAnchor="middle">Σ₃={r.three} · Σ₆={r.total}</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `Inputs: three=${r.three} · six=${r.total}; outputs=${r.outputs}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);
 const [witnesses,setWitnesses]=useState<Record<number,string>>({});
 const earned=useRef(new Set<number>());
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"Each turn adds 10 inputs and 2 outputs. Resend history; compare stateless turns."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Saved results">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["History", "Stateless"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "Your chat agent resends the whole conversation history with every new turn. Resent-history inputs are 10,22,34 over three turns. What are total inputs over six turns?", "options": ["132", "240", "60"], "answer": 1}} exploreHint="Compare the two cases and their saved results." reveal={()=><p>Your six history-bearing turns used 240 input tokens, versus 66 across three turns. Stateless turns instead used 60 across six. Each resent turn included earlier inputs and outputs; summing that growing ledger creates the extra cost. This ignores prices, tokenizer details and cache discounts.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
