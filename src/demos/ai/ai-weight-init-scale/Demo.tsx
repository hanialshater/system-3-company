'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>n.toFixed(d).replace(/^-0\.000$/, '0.000');
function Picture({mode}:{mode:number}){const r=m.run(mode);const show=(n:number,d=3)=>f(n,d);return <svg className={s.plot} viewBox="0 0 290 132" role="img" aria-label="What survives three layers? \u2014 computed finite mechanism"><text x="145" y="17" textAnchor="middle">width={r.width} · weight variance s²={r.squaredScale}</text>{r.variances.map((v,i)=><g key={i}>{i>0?<path d={`M${14+(i-1)*78+16} 62 H${14+i*78-16}`} className={s.line}/>:null}<circle cx={25+i*79} cy="62" r={8+Math.max(0,Math.min(14,(Math.log2(v)+6)*1.1))} className={s.box}/><text x={25+i*79} y="100" textAnchor="middle">{show(v,4)}</text></g>)}<text x="145" y="126" textAnchor="middle">vnext={r.width}×{r.squaredScale}×v · 3 layers</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `s²=${r.squaredScale}: v₃=${f(r.final,4)}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);const [witnesses,setWitnesses]=useState<Record<number,string>>({});const earned=useRef(new Set<number>());
 // The reveal quotes the primary diagram; retain both earned cases while restoring it.
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"Independent zero-mean linear inputs/weights; v₀=1; width=2; s²=.5; 3 layers; vnext=2s²v."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Retained evidence">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["s²=.5", "s²=.125", "s²=2"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "Independent zero-mean linear weights have variance s²; width 2 and input variance 1. Each layer multiplies variance by 2s². Which s² preserves variance over three layers?", "options": [".125", ".5", "2"], "answer": 1}} exploreHint="Compare the first two cases; retain their evidence." reveal={()=><p>Your weight variance .5 made width times weight variance equal 1, preserving variance through three layers. At .125 it shrank to .0156; at 2 it grew to 64.0000. This recurrence assumes independent zero-mean linear inputs and weights; nonlinear networks need not preserve it.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
