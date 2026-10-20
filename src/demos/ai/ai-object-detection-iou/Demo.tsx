'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>{const x=Math.abs(n)<1e-10?0:n;return x.toFixed(d);};
function Picture({mode}:{mode:number}){const r=m.run(mode);return <svg className={s.plot} viewBox="0 0 280 112" role="img" aria-label="Overlap is a fraction — worked example">{[r.a,r.b].map((b,i)=><g key={i}><rect x={10+b[0]*28} y={24+i*3} width={(b[2]-b[0])*28} height="48" className={i===0?s.box:s.overlap}/><text x={14+b[0]*28} y={19+i*69}>{i===0?'A':'B'}</text></g>)}<text x="179" y="34">∩={r.intersection}</text><text x="179" y="59">∪={r.union}</text><text x="179" y="84">IoU={f(r.value,3)}</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `Case${mode+1}: IoU=${f(r.value,3)} · ≥.5? ${r.value>=.5?"yes":"no"}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);
 const [witnesses,setWitnesses]=useState<Record<number,string>>({});
 const earned=useRef(new Set<number>());
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"A=[0,0,2,2], B=[1,0,3,2], half-open boxes. Match if IoU\u2265threshold; class correctness remains separate."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Saved results">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["Overlap", "Disjoint", "Identical"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "Both boxes have area 4; intersection is 2. Does IoU meet inclusive threshold 0.5?", "options": ["Yes", "No"], "answer": 1}} exploreHint="Compare the two cases and their saved results." reveal={()=><p>Your overlapping boxes had intersection 2 and union 6, giving IoU 1/3; they missed threshold 0.5. Disjoint boxes gave 0, while identical boxes gave 1. Overlap measures localization under this declared rule. It does not establish class correctness or measure a real detector’s performance.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
