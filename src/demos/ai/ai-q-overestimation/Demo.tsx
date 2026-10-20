'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>n.toFixed(d).replace(/^-0\.000$/, '0.000');
function Picture({mode}:{mode:number}){const r=m.run(mode);const show=(n:number,d=3)=>f(n,d);return <svg className={s.plot} viewBox="0 0 290 132" role="img" aria-label="Average before or after? \u2014 computed finite mechanism"><text x="24" y="17">Q₁</text><text x="83" y="17">Q₂</text><text x="147" y="17">mass</text><text x="222" y="17">max</text>{r.pairs.map((p,i)=><g key={i}><text x="24" y={40+i*20}>{p[0]}</text><text x="83" y={40+i*20}>{p[1]}</text><text x="147" y={40+i*20}>{r.mass}</text><text x="222" y={40+i*20}>{r.maxima[i]}</text></g>)}<text x="145" y="125" textAnchor="middle">E[max]={show(r.average)} · max(E)={r.maxMean}</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `${r.pairs.length} cases: E[max]=${f(r.average)}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);const [witnesses,setWitnesses]=useState<Record<number,string>>({});const earned=useRef(new Set<number>());
 // The reveal quotes the primary diagram; retain both earned cases while restoring it.
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"True values [0,0]; Q₁,Q₂∈{−1,+1}; independent; each sign probability .5."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Retained evidence">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["Independent", "Shared"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "Two true values are 0. Each estimate independently equals −1 or +1, equally likely. Average the maximum of each pair: what do you get?", "options": ["0", ".5", "1"], "answer": 1}} exploreHint="Compare the first two cases; retain their evidence." reveal={()=><p>Your four equally likely independent pairs gave maxima −1, 1, 1, 1, averaging .500 despite each estimate averaging zero. Shared noise instead averaged to .000. Selection and averaging do not commute here; overestimation depends on the joint noise, not every estimator inevitably being biased.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
