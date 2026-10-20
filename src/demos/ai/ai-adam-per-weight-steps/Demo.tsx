'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>n.toFixed(d).replace(/^-0\.000$/, '0.000');
function Picture({mode}:{mode:number}){const r=m.run(mode);const show=(n:number,d=3)=>f(n,d);return <svg className={s.plot} viewBox="0 0 290 132" role="img" aria-label="Same rate, different steps — worked example"><text x="7" y="17">g</text><text x="58" y="17">m̂</text><text x="116" y="17">v̂</text><text x="184" y="17">√v̂+ε</text>{r.grad.map((g,i)=><g key={i}><text x="7" y={42+i*29}>{g}</text><text x="58" y={42+i*29}>{show(r.mhat[i],0)}</text><text x="116" y={42+i*29}>{show(r.vhat[i],0)}</text><text x="184" y={42+i*29}>{show(r.denominator[i],2)}</text></g>)}<text x="7" y="98">Adam</text><text x="78" y="98">[{r.steps.map(n=>show(n,5)).join(', ')}]</text><text x="7" y="121">SGD</text><text x="78" y="121">[{r.sgd.map(n=>show(n,2)).join(', ')}]</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `g₁=${r.grad[0]}: Δ=[${r.steps.map(x=>f(x,5)).join(',')}]`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);const [witnesses,setWitnesses]=useState<Record<number,string>>({});const earned=useRef(new Set<number>());
 // The reveal quotes the primary diagram; retain both earned cases while restoring it.
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"g=[1,10]; m=v=0; β₁=.9; β₂=.999; α=.1; ε=.01. First step."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Saved results">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["g=[1,10]", "g=[0,10]"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "Training a two-weight model, one weight's gradient is ten times the other's. First step: gradients [1,10], zero moments, β₁=.9, β₂=.999, α=.1, ε=.01. Adam uses −αm̂/(√v̂+ε). Which pair of steps follows?", "options": ["[−.1,−1]", "[−.09901,−.09990]", "[−1,−1]"], "answer": 1}} exploreHint="Compare the two cases and their saved results." reveal={()=><p>Your gradients 1 and 10 produced Adam steps −.09901 and −.09990, versus SGD’s −.10 and −1.00. Corrected squared moments changed each denominator. A zero gradient gave a zero first step. Epsilon prevents exact scale invariance; this example establishes neither equal steps generally nor convergence.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
