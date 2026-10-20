'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import {run} from './model';
import s from './styles.module.css';
function Picture({mode}:{mode:number}){const r=run(mode);return (<><svg className={s.plot} viewBox="0 0 300 174" role="group" aria-label="Targets and successive fitted corrections">{r.series.map((v,t)=><polyline key={t} fill="none" stroke="currentColor" strokeWidth={t===2?2:1} strokeDasharray={t===0?'2 4':t===1?'7 3':undefined} points={v.pred.map((p,i)=>`${35+i*75},${140-p/Math.max(...r.ys,...r.series.flatMap(v=>v.pred),1)*100}`).join(' ')}/>)}{r.ys.map((y,i)=><g key={i}><circle cx={35+i*75} cy={140-y/Math.max(...r.ys,...r.series.flatMap(v=>v.pred),1)*100} r="5" className={s.dot}/><text x={35+i*75} y="159" textAnchor="middle">{i}</text></g>)}<text x="5" y="16">Target ● · 0 dotted · 1 dashed · 2 solid</text></svg><div className={s.caption}>SSE {r.series.map(v=>v.sse).join(' → ')} · Residual {r.series[2].residual.join(', ')}</div></>);}
export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState(false);const earned=useRef(new Set<number>());const [visited,setVisited]=useState<number[]>([]);const required=[0, 2];const proof=run(0);
 return <Lesson slug={slug} minInteractions={2} predict={{"question": "You are adding a second model to improve your first one. Targets are 0, 0, 2, 2. The first prediction is 1 everywhere. What should a squared-loss correction fit?", "options": ["The remaining errors", "The original targets again", "Only the largest target"], "answer": 0}} exploreHint="Compare the original case, then change its assumptions." reveal={()=><p>The retained two corrections fit the remaining errors. With half-size updates, training squared error goes 4 to 1 to 0.25. Repeatedly adding a fit to the original targets instead gives 4 to 2 to 4. This fixed-split toy demonstrates residual correction, not guaranteed improvement on unseen data.</p>}>
 {({locked,interact,phase})=><div className={s.root}>
 {locked||(mode===null&&phase!=='reveal')?<div className={s.input}>Targets 0, 0, 2, 2; initial predictions 1, 1, 1, 1.</div>:<div><Picture mode={mode??0}/></div>}
 {!locked&&seen&&<p className={s.proof}>Retained: SSE {proof.series.map(v=>v.sse).join(' → ')}</p>}
 {!locked&&visited.includes(2)&&<p className={s.proof}>Wrong target: SSE {run(2).series.map(v=>v.sse).join(' → ')}</p>}
 <div className={s.row}>{["Fit residuals", "New data", "Wrong target"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i||(phase==='reveal'&&mode===null&&i===0)} aria-pressed={!locked&&(mode===i||(phase==='reveal'&&mode===null&&i===0))} onClick={()=>{setMode(i);setVisited(v=>v.includes(i)?v:[...v,i]);if(i===0)setSeen(true);if(required.includes(i)&&!earned.current.has(i)){earned.current.add(i);interact();}}}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
