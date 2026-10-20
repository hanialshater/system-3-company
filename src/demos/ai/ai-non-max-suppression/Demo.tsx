'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>{const x=Math.abs(n)<1e-10?0:n;return x.toFixed(d);};
function Picture({mode}:{mode:number}){const r=m.run(mode);return <svg className={s.plot} viewBox="0 0 280 118" role="img" aria-label="Who survives the cutoff? — worked example">{r.boxes.map((b,i)=><g key={i}><rect x={8+b[0]*28} y="26" width="56" height="45" className={r.kept.includes(i)?s.box:s.removed}/><text x={i===1?53:16+b[0]*28} y="20">{String.fromCharCode(65+i)}:{r.scores[i]}</text></g>)}<text x="6" y="94">IoU(A,B)={f(r.overlap,3)} · cutoff={f(r.cutoff,3)}</text><text x="6" y="113">keep {r.kept.map(i=>String.fromCharCode(65+i)).join(',')}</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `Cutoff ${f(r.cutoff,3)}: keep ${r.kept.map(i=>String.fromCharCode(65+i)).join(",")}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);
 const [witnesses,setWitnesses]=useState<Record<number,string>>({});
 const earned=useRef(new Set<number>());
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"A=[0,0,2,2]:.9; B=[1,0,3,2]:.8; C=[4,0,6,2]:.7. Same class; suppress if IoU>cutoff."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Saved results">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["Cutoff.3", "Cutoff.5", "Exact1/3"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "A outranks B; their IoU is 1/3. With strict cutoff 0.3, which boxes remain?", "options": ["A,C", "A,B,C", "B,C"], "answer": 0}} exploreHint="Compare the two cases and their saved results." reveal={()=><p>Your 0.3 cutoff kept A,C because A suppressed B at IoU 1/3. Raising the cutoff to 0.5 retained all three; equality at 1/3 also retained B under strict greater-than. Ranking and threshold convention matter. Suppression does not prove two boxes depict the same physical object.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
