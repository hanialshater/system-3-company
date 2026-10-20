'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>{const x=Math.abs(n)<1e-10?0:n;return x.toFixed(d);};
function Picture({mode}:{mode:number}){const r=m.run(mode);return <svg className={s.plot} viewBox="0 0 280 112" role="img" aria-label="How many neighbours vote? — worked example">{r.labels.map((v,i)=><g key={i}><circle cx={24+i*57} cy="28" r="17" className={s.box}/><text x={24+i*57} y="33" textAnchor="middle">{v}</text><text x={24+i*57} y="61" textAnchor="middle">d={i+1}</text></g>)}{r.votes.map((v,i)=><text key={i} x={3+i*94} y="85">k{v.k}: {v.ones}/{v.k}</text>)}<text x="6" y="107">ones / neighbours → majority</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `Labels ${r.labels.join("")}: votes ${r.votes.map(v=>v.prediction).join(",")}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);
 const [witnesses,setWitnesses]=useState<Record<number,string>>({});
 const earned=useRef(new Set<number>());
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"Nearest\u2192farthest labels [1,0,0,1,1]; distances [1,2,3,4,5]. Choose odd k=1,3,5; contrast flipping nearest label."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Saved results">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["Original", "Flip nearest"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "Nearest labels are [1,0,0,1,1]. What does uniform voting at k=3 predict?", "options": ["0", "1"], "answer": 0}} exploreHint="Compare the two cases and their saved results." reveal={()=><p>Your original votes predicted 1,0,1 at k=1,3,5. Flipping the nearest label changed those predictions to 0,0,0; only k=3 stayed stable here. A wider voting window changes sensitivity, but one query supplies no validation set and cannot establish the best k.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
