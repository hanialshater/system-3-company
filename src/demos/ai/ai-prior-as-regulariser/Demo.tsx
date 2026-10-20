'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>n.toFixed(d).replace(/^-0\.000$/, '0.000');
function Picture({mode}:{mode:number}){const r=m.run(mode);const show=(n:number,d=3)=>f(n,d);return <svg className={s.plot} viewBox="0 0 290 132" role="img" aria-label="Where does the prior pull? — worked example"><text x="145" y="17" textAnchor="middle">y=3 · μ={r.mu} · τ={r.tau} · constants omitted</text><path d="M18 95 H276" className={s.axis}/>{(['likelihood','prior','total'] as const).map((key,j)=><path key={key} d={r.points.map((p,i)=>`${i?'L':'M'}${20+p.w*62},${95-p[key]*8}`).join(' ')} className={j===2?s.curve:j===0?s.likelihood:s.prior}/>)}<circle cx={20+r.map*62} cy={95-(r.parts[0]+r.parts[1])*8} r="5" className={s.dot}/><text x="18" y="114">MAP={show(r.map)}</text><path d="M18 124 h12" className={s.likelihood}/><text x="33" y="129">L={show(r.parts[0])}</text><path d="M142 124 h12" className={s.prior}/><text x="158" y="129">prior={show(r.parts[1])}</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `μ=${r.mu}, τ=${r.tau}: MAP=${f(r.map)}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);const [witnesses,setWitnesses]=useState<Record<number,string>>({});const earned=useRef(new Set<number>());
 // The reveal quotes the primary diagram; retain both earned cases while restoring it.
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"y=3; likelihood variance=1; prior μ=0, τ=1. J=.5(3−w)²+(w−μ)²/(2τ²)."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Saved results">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["τ=1", "τ=2", "μ=2"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "Observation 3 has Gaussian variance 1; prior mean 0 and variance 1. Ignoring constants, J=.5(3−w)²+.5w². Where is the MAP?", "options": ["0", "1.5", "3"], "answer": 1}} exploreHint="Compare the two cases and their saved results." reveal={()=><p>Your unit-variance zero-mean prior balanced the likelihood at MAP 1.500. Weakening it to τ=2 moved MAP to 2.400, closer to observation 3. Changing prior mean to 2 instead pulled toward 2. Priors need not shrink toward zero; this is a specified Gaussian model.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
