'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>n.toFixed(d).replace(/^-0\.000$/, '0.000');
function Picture({mode}:{mode:number}){const r=m.run(mode);const show=(n:number,d=3)=>f(n,d);return <svg className={s.plot} viewBox="0 0 290 132" role="img" aria-label="Can this gradient revive it? — worked example"><text x="145" y="18" textAnchor="middle">x={r.x} · w=1 · b={r.b} · target={r.target}</text><rect x="7" y="33" width="76" height="45" rx="6" className={s.box}/><text x="45" y="51" textAnchor="middle">z={show(r.z)}</text><text x="45" y="70" textAnchor="middle">wx+b</text><path d="M83 55 H108" className={s.line}/><rect x="109" y="33" width="88" height="45" rx="6" className={s.box}/><text x="153" y="51" textAnchor="middle">ReLU={r.a}</text><text x="153" y="70" textAnchor="middle">deriv={r.derivative}</text><path d="M197 55 H222" className={s.line}/><text x="228" y="59">L={r.loss}</text><text x="145" y="100" textAnchor="middle">∂L/∂w=({r.a}−{r.target})×{r.derivative}×{r.x}={r.grad}</text><text x="145" y="125" textAnchor="middle">w′=1−.1×{r.grad}={show(r.next)}</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `b=${r.b}, x=${r.x}: deriv=${r.derivative}, w′=${f(r.next)}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);const [witnesses,setWitnesses]=useState<Record<number,string>>({});const earned=useRef(new Set<number>());
 // The reveal quotes the primary diagram; retain both earned cases while restoring it.
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"x=1; w=1; b=−2; y=1; α=.1; a=max(0,wx+b); L=.5(a−y)²; ReLU′(z≤0)=0."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Saved results">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["b=−2", "b=0", "x=3"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "You train a single neuron on one example. x=1,w=1,b=−2, target 1. ReLU=max(0,wx+b); its derivative is 0 at z≤0. Under squared half-loss, what does one gradient step do to w?", "options": ["Lowers w", "Leaves w=1", "Raises w"], "answer": 1}} exploreHint="Compare the two cases and their saved results." reveal={()=><p>Your negative preactivation closed the ReLU derivative gate: weight gradient zero left w at 1. With bias 0 and target 2, derivative 1 allowed gradient −1 and w became 1.100. This blockage is local to that example; other inputs or parameter pathways can change it.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
