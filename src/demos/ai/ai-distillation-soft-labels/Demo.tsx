'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>{const x=Math.abs(n)<1e-10?0:n;return x.toFixed(d);};
function Picture({mode}:{mode:number}){const r=m.run(mode);return <svg className={s.plot} viewBox="0 0 280 112" role="img" aria-label="Same top class, different loss \u2014 computed finite mechanism"><text x="5" y="17">teacher [{r.teacher.join(',')}]</text>{r.students.map((row,i)=><g key={i}><text x="5" y={39+i*42}>{i===0?'A':'B'} [{row.join(',')}]</text><text x="187" y={39+i*42}>L={f(r.soft[i].total,3)}</text><text x="22" y={57+i*42}>{r.soft[i].terms.map(v=>f(v,3)).join(' + ')}</text></g>)}</svg>;}
function snapshot(mode:number){const r=m.run(mode);return `Case${mode+1}: A=${f(r.soft[0].total,3)} · B=${f(r.soft[1].total,3)}; hard=${f(r.hard[0].total,3)}=${f(r.hard[1].total,3)}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);
 const [witnesses,setWitnesses]=useState<Record<number,string>>({});
 const earned=useRef(new Set<number>());
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"Teacher [.6,.3,.1]; students A [.6,.2,.2], B [.6,.35,.05]. Natural-log cross-entropy; temperature 1."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Retained evidence">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["Soft", "One-hot"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "A and B both put .6 on class 1. Does hard-target cross-entropy distinguish them?", "options": ["Yes", "No"], "answer": 1}} exploreHint="Compare the first two cases; retain their evidence." reveal={()=><p>Your hard target tied both students at loss 0.511. Soft teacher weights instead gave A 0.950 and B 0.921, preferring B; a one-hot teacher restored the tie. Soft targets retain other-class distinctions, but teacher probabilities are not ground truth and guarantee no trained-model improvement.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
