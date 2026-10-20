'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import {run} from './model';
import s from './styles.module.css';
function Picture({mode}:{mode:number}){const r=run(mode);return (<><svg className={s.plot} viewBox="0 0 300 174" role="group" aria-label="Toy loss and excess versus log compute">{r.rows.map((v,i)=><g key={v.compute}><line x1={30+i*110} y1="130" x2={30+i*110} y2={130-v.total/Math.max(...r.rows.map(x=>x.total))*100} stroke="currentColor"/><circle cx={30+i*110} cy={130-v.total/Math.max(...r.rows.map(x=>x.total))*100} r="4"/><text x={30+i*110} y="151" textAnchor="middle">{v.compute}</text><text x={30+i*110} y={120-v.total/Math.max(...r.rows.map(x=>x.total))*100} textAnchor="middle">{Number(v.total.toFixed(2))}</text></g>)}<polyline className={s.line} points={r.rows.map((v,i)=>`${30+i*110},${130-v.total/Math.max(...r.rows.map(x=>x.total))*100}`).join(' ')}/><text x="4" y="10">Loss</text><text x="205" y="163">Compute</text></svg><div className={s.caption}>Floor {r.floor} · Excess {r.rows.map(x=>Number(x.excess.toFixed(2))).join(' → ')}</div></>);}
export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState(false);const earned=useRef(new Set<number>());const [visited,setVisited]=useState<number[]>([]);const required=[0, 1];const proof=run(0);
 return <Lesson slug={slug} minInteractions={2} predict={{"question": "You train a toy model whose loss can never drop below its floor. Toy floor: 1. Loss falls 9 to 5 when compute goes 1 to 10. What total follows at 100?", "options": ["3", "2.5", "0"], "answer": 0}} exploreHint="Compare the original case, then change its assumptions." reveal={()=><p>In the retained toy, total loss goes 9, 5, 3 while excess above the floor goes 8, 4, 2. Tenfold compute halves excess, not total loss. The near-floor case makes the difference clearer. This declared curve is not a forecast of real models.</p>}>
 {({locked,interact,phase})=><div className={s.root}>
 {locked||(mode===null&&phase!=='reveal')?<div className={s.input}>Compute 1 → 10; loss 9 → 5; floor 1.</div>:<div><Picture mode={mode??0}/></div>}
 {!locked&&seen&&<p className={s.proof}>Retained: total {proof.rows.map(x=>Number(x.total.toFixed(2))).join(' → ')} · excess {proof.rows.map(x=>Number(x.excess.toFixed(2))).join(' → ')}</p>}
 {!locked&&visited.includes(1)&&<p className={s.proof}>Near floor: {run(1).rows.map(x=>Number(x.total.toFixed(2))).join(' → ')}</p>}
 <div className={s.row}>{["Compute", "Near floor", "New floor"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i||(phase==='reveal'&&mode===null&&i===0)} aria-pressed={!locked&&(mode===i||(phase==='reveal'&&mode===null&&i===0))} onClick={()=>{setMode(i);setVisited(v=>v.includes(i)?v:[...v,i]);if(i===0)setSeen(true);if(required.includes(i)&&!earned.current.has(i)){earned.current.add(i);interact();}}}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
