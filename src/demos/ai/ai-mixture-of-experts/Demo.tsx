'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>{const x=Math.abs(n)<1e-10?0:n;return x.toFixed(d);};
function Picture({mode}:{mode:number}){const r=m.run(mode);return <svg className={s.plot} viewBox="0 0 280 118" role="img" aria-label="Stored is not switched on — worked example"><text x="6" y="15">A: .8 .1 .07 .03</text><text x="6" y="32">B: .05 .1 .8 .05</text>{[0,1,2,3].map(i=><g key={i}><rect x={9+i*70} y="40" width="58" height="29" className={r.routes[0].includes(i)?s.selected:s.box}/><text x={38+i*70} y="60" textAnchor="middle">E{i+1}</text></g>)}<text x="6" y="91">stored={r.stored} · A active={r.active}</text><text x="6" y="111">B→{r.routes[1].map(i=>'E'+(i+1)).join(',')} · batch={r.batch}</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `Top${r.k}: token=${r.active} · batch=${r.batch}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);
 const [witnesses,setWitnesses]=useState<Record<number,string>>({});
 const earned=useRef(new Set<number>());
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"Four experts each hold 100 parameters; router holds 20. A ranks E1 first; B ranks E3 first."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Saved results">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["Top1", "Top2"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "Your model stores many expert sub-networks but runs only a few per token. Top-2 routes one token through two experts. Including the router, how many parameters are active?", "options": ["120", "220", "420"], "answer": 1}} exploreHint="Compare the two cases and their saved results." reveal={()=><p>Your top-1 token activated 120 of 420 stored parameters; top-2 activated 220. Two top-1 tokens routed to E1 and E3 touched a union of 220, counting the router once. Active parameters per token differ from batch unions. No hardware speedup follows from these counts alone.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
