'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>{const x=Math.abs(n)<1e-10?0:n;return x.toFixed(d);};
function Picture({mode}:{mode:number}){const r=m.run(mode);return <svg className={s.plot} viewBox="0 0 280 112" role="img" aria-label="One clue, counted twice? \u2014 computed finite mechanism"><text x="6" y="18">{r.independent?'X,Y independent':'X,X duplicate'}</text>{r.ratios.map((v,i)=><g key={i}><rect x={12+i*90} y="29" width="70" height="29" className={s.box}/><text x={47+i*90} y="49" textAnchor="middle">{i===0?'X':r.independent?'Y':'X'} ×{v}</text></g>)}<path d="M82 44 H101 M172 44 H195" className={s.line}/><text x="200" y="49">{r.naiveOdds}:1</text><text x="6" y="80">Product={f(r.naive,2)} · joint={f(r.joint,2)}</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `${r.independent?'Independent':'Duplicate'}: product ${f(r.naive,2)} / joint ${f(r.joint,2)}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);
 const [witnesses,setWitnesses]=useState<Record<number,string>>({});
 const earned=useRef(new Set<number>());
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"Prior odds=1; clue X has likelihood ratio 3. Compare X,X with independent X,Y."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Retained evidence">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["Duplicate", "Independent"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "Multiply the same clue X twice. What posterior does the naive product report?", "options": ["0.75", "0.90", "0.50"], "answer": 1}} exploreHint="Compare the first two cases; retain their evidence." reveal={()=><p>Your duplicate X produced naive odds 9 and posterior 0.90, while the correct joint odds stayed 3, giving 0.75. Independent X,Y justified odds 9. Multiplication assumes independence conditional on class; repeating an observation does not create another independent clue.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
