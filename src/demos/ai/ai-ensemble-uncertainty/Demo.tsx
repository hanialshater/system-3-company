'use client';
import {useEffect,useRef,useState} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(n:number,d=3)=>n.toFixed(d).replace(/^-0\.000$/, '0.000');
function Picture({mode}:{mode:number}){const r=m.run(mode);const show=(n:number,d=3)=>f(n,d);return <svg className={s.plot} viewBox="0 0 290 132" role="img" aria-label="Agreement about what? — worked example">{[r.near,r.far].map((row,i)=><g key={i}><text x="7" y={24+i*54}>{i===0?'Near':'Far'}</text><path d={`M60 ${20+i*54} H278`} className={s.axis}/>{row.values.map((v,j)=><circle key={j} cx={62+v*20} cy={20+i*54+(j-1)*7} r="4" className={s.dot}/>)}<path d={`M${62+row.target*20} ${9+i*54} v22`} className={s.other}/><text x="60" y={45+i*54}>μ={row.mean} · variance={show(row.variance)}</text></g>)}<text x="145" y="126" textAnchor="middle">Far target=10 · error²={r.far.error} · ┆target</text></svg>;}
function snapshot(mode:number){const r=m.run(mode);return `Far [${r.far.values.join(',')}]: var=${f(r.far.variance)}, error²=${r.far.error}`;}
function Stage({phase,locked,interact}:StageContext){
 const [mode,setMode]=useState<number|null>(null);const [witnesses,setWitnesses]=useState<Record<number,string>>({});const earned=useRef(new Set<number>());
 // The reveal quotes the primary diagram; retain both earned cases while restoring it.
 useEffect(()=>{if(phase==='reveal')setMode(0);},[phase]);
 const choose=(i:number)=>{setMode(i);if(i<2&&!earned.current.has(i)){earned.current.add(i);setWitnesses(old=>({...old,[i]:snapshot(i)}));interact();}};
 return <div className={s.root}>
 {locked||mode===null?<div className={s.input}>{"Near:[2,2,2]; far:[0,2,4]. Compare population disagreement variance; mean squared deviations."}</div>:<Picture mode={mode}/>}
 {Object.keys(witnesses).length>0?<div className={s.proof} aria-label="Saved results">{[0,1].map(i=>witnesses[i]?<p key={i}>{witnesses[i]}</p>:null)}</div>:null}
 <div className={s.row}>{["Spread", "Shared miss"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} minInteractions={2} predict={{"question": "You ask three models about two inputs, a near one and a far one, and compare how much they disagree. Near predictions [2,2,2]; far predictions [0,2,4]. Both have mean 2. Which has larger population disagreement variance?", "options": ["Near", "Far", "Equal"], "answer": 1}} exploreHint="Compare the two cases and their saved results." reveal={()=><p>Your far predictions disagreed with variance 2.667 despite the same mean 2 as the agreeing near predictions. Their mean missed stipulated target 10 by squared error 64. Shared far predictions then removed disagreement while preserving that error. Agreement is not a calibrated probability of correctness.</p>}>{ctx=><Stage {...ctx}/>}</Lesson>;}
