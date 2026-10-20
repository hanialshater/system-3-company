'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import {run} from './model';
import s from './styles.module.css';
function Picture({mode}:{mode:number}){const r=run(mode);return (<><svg className={s.plot} viewBox="0 0 300 174" role="group" aria-label="Category code positions, targets and fitted predictions"><path d="M25 20V145H280" className={s.other}/>{!r.onehot&&<line x1="40" y1={130-r.intercept*80} x2="240" y2={130-(r.intercept+2*r.slope)*80} className={s.line}/>} {r.x.map((x,i)=><g key={i}><line x1={40+x*100} x2={40+x*100} y1={130-r.y[i]*80} y2={130-r.pred[i]*80} className={s.other}/><circle cx={40+x*100} cy={130-r.y[i]*80} r="6" fill="none" stroke="currentColor"/><rect x={36+x*100} y={126-r.pred[i]*80} width="8" height="8" className={s.cell}/><text x={40+x*100} y="161" textAnchor="middle">{'ABC'[i]}:{x}</text></g>)}</svg><div className={s.caption}>Targets ○ · Predictions ■ · SSE {r.sse.toFixed(3)}</div></>);}
export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState(false);const earned=useRef(new Set<number>());const [visited,setVisited]=useState<number[]>([]);const required=[0, 1, 2];const proof=run(0);
 return <Lesson slug={slug} minInteractions={3} predict={{"question": "Categories A, B, C have targets 0, 1, 0. Could swapping arbitrary B/C numeric codes change a fitted line?", "options": ["Yes", "No"], "answer": 0}} exploreHint="Compare the original case, then change its assumptions." reveal={()=><p>The retained numeric coding fits a flat prediction of one third. Swapping two arbitrary codes changes the fitted line and its errors, although the category targets did not change. One-hot coefficients fit the three category targets here. This does not prove one-hot is best for every model or unseen category.</p>}>
 {({locked,interact,phase})=><div className={s.root}>
 {locked||(mode===null&&phase!=='reveal')?<div className={s.input}>A, B, C · targets 0, 1, 0 · codes 0, 1, 2.</div>:<div><Picture mode={mode??0}/></div>}
 {!locked&&seen&&<p className={s.proof}>Retained: {proof.pred.map(x=>x.toFixed(2)).join(', ')} · SSE {proof.sse.toFixed(3)}</p>}
 {!locked&&visited.includes(1)&&<p className={s.proof}>Swap: {run(1).pred.map(x=>x.toFixed(2)).join(', ')}{visited.includes(2)&&<> · One-hot: {run(2).pred.join(', ')}</>}</p>}
 <div className={s.row}>{["Fit codes", "Swap codes", "One-hot"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i||(phase==='reveal'&&mode===null&&i===0)} aria-pressed={!locked&&(mode===i||(phase==='reveal'&&mode===null&&i===0))} onClick={()=>{setMode(i);setVisited(v=>v.includes(i)?v:[...v,i]);if(i===0)setSeen(true);if(required.includes(i)&&!earned.current.has(i)){earned.current.add(i);interact();}}}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
