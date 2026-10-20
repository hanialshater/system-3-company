'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>n.toFixed(d).replace(/^-0\.000$/, '0.000');
function Picture({mode}:{mode:number}){const r=m.run(mode);const show=(n:number,d=3)=>f(n,d);return <svg className={s.plot} viewBox="0 0 290 132" role="img" aria-label="Shrink or reach zero? \u2014 computed finite mechanism"><path d="M18 92 H276 M147 28 V98" className={s.axis}/><path d={r.points.map((p,i)=>`${i?'L':'M'}${147+p.x*120},${92-p.y*35}`).join(' ')} className={s.curve}/><circle cx={147+r.w*120} cy={92-r.minimum*35} r="5" className={s.dot}/><text x="145" y="17" textAnchor="middle">z={r.z} · λ={r.lambda} · .5(w−z)²+λ|w|</text><text x="18" y="110">w*: {show(r.w)}</text><text x="149" y="110">ridge: {show(r.ridge)}</text><text x="18" y="129">−1</text><text x="144" y="129">0</text><text x="267" y="129">1</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `z=${r.z}, λ=${r.lambda}: w*=${f(r.w)}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);const [witnesses,setWitnesses]=useState<Record<number,string>>({});const earned=useRef(new Set<number>());
 // The reveal quotes the primary diagram; retain both earned cases while restoring it.
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"J(w)=.5(w−z)²+λ|w|; z=.6; λ=.8. Ridge: .5(w−z)²+.5λw²."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Retained evidence">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["λ=.8", "λ=.2", "z=−.6"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "For J(w)=.5(w−.6)²+.8|w|, the soft-threshold solution is sign(.6)max(.6−.8,0). Which minimizer follows?", "options": ["0", ".3333", ".4"], "answer": 0}} exploreHint="Compare the first two cases; retain their evidence." reveal={()=><p>Your penalty .8 crossed the .6 threshold and placed the L1 minimizer exactly at zero. With penalty .2, it stayed at .400. The kink creates this threshold; ridge remained nonzero. One scalar zero is not evidence that a real feature is irrelevant.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
