'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import {run} from './model';
import s from './styles.module.css';
function Picture({mode}:{mode:number}){const r=run(mode);return (<><svg className={s.plot} viewBox="0 0 300 174" role="group" aria-label="Squared and absolute cost against constant prediction"><path d="M20 15V135H280" className={s.other}/><polyline className={s.line} points={r.curve.map(v=>`${20+v.a*25},${135-v.sq/Math.max(...r.curve.map(x=>x.sq))*110}`).join(' ')}/><polyline className={s.other} points={r.curve.map(v=>`${20+v.a*25},${135-v.abs/Math.max(...r.curve.map(x=>x.sq))*110}`).join(' ')}/><circle cx={20+r.mean*25} cy={135-r.meanCost/Math.max(...r.curve.map(x=>x.sq))*110} r="5"/><path d={`M${20+r.median*25} ${131-r.medianCost/Math.max(...r.curve.map(x=>x.sq))*110}l4 4-4 4-4-4z`} fill="none" stroke="currentColor"/><text x="20" y="154">0</text><text x="262" y="154">10</text><text x="30" y="15">Cost</text></svg><div className={s.caption}>Targets {r.ys.join(', ')} · Squared ● {r.mean} · Absolute ◇ {r.median}</div></>);}
export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState(false);const earned=useRef(new Set<number>());const [visited,setVisited]=useState<number[]>([]);const required=[0, 1];const proof=run(0);
 return <Lesson slug={slug} minInteractions={2} predict={{"question": "You must quote one fixed number as your guess for three orders. Targets are 0, 0 and 9. Must squared and absolute error choose the same constant?", "options": ["No", "Yes"], "answer": 0}} exploreHint="Compare the original case, then change its assumptions." reveal={()=><p>In the retained data, squared error is smallest at 3, but absolute error is smallest at 0. Squaring gives the distant target more influence. The symmetric countercase has the same mean and median, so changing the loss need not change its minimizer.</p>}>
 {({locked,interact,phase})=><div className={s.root}>
 {locked||(mode===null&&phase!=='reveal')?<div className={s.input}>Targets: 0, 0, 9. Two different penalties.</div>:<div><Picture mode={mode??0}/></div>}
 {!locked&&seen&&<p className={s.proof}>Retained: Squared {proof.mean} · Absolute {proof.median}</p>}
 {!locked&&visited.includes(1)&&<p className={s.proof}>Symmetric: Squared {run(1).mean} · Absolute {run(1).median}</p>}
 <div className={s.row}>{["Fit losses", "Symmetric", "New data"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i||(phase==='reveal'&&mode===null&&i===0)} aria-pressed={!locked&&(mode===i||(phase==='reveal'&&mode===null&&i===0))} onClick={()=>{setMode(i);setVisited(v=>v.includes(i)?v:[...v,i]);if(i===0)setSeen(true);if(required.includes(i)&&!earned.current.has(i)){earned.current.add(i);interact();}}}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
