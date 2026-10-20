'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import {run} from './model';
import s from './styles.module.css';
function Picture({mode}:{mode:number}){const r=run(mode);return (<><svg className={s.plot} viewBox="0 0 300 174" role="group" aria-label="Labelled points and their principal-axis projections"><path d="M20 82H280M150 10V154" className={s.other}/>{r.points.map((p,i)=><g key={i}><line x1={150+p[0]*26} y1={82-p[1]*14} x2={150+r.projected[i][0]*26} y2={82-r.projected[i][1]*14} className={s.other}/>{r.labels[i]>0?<circle cx={150+p[0]*26} cy={82-p[1]*14} r="5" fill="none" stroke="currentColor"/>:<rect x={146+p[0]*26} y={78-p[1]*14} width="8" height="8" fill="none" stroke="currentColor"/>}{r.labels[i]>0?<circle cx={150+r.projected[i][0]*26} cy={82-r.projected[i][1]*14} r="5" className={s.dot}/>:<rect x={146+r.projected[i][0]*26} y={78-r.projected[i][1]*14} width="8" height="8" className={s.cell}/>}</g>)}<text x="270" y="77">x</text><text x="156" y="15">y</text></svg><div className={s.caption}>○ + · □ − · Keep {r.axis===0?'x':'y'} · {(100*r.retained).toFixed(0)}% · {r.overlap?'Overlap':'Separate'}</div></>);}
export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState(false);const earned=useRef(new Set<number>());const [visited,setVisited]=useState<number[]>([]);const required=[0, 1, 2];const proof=run(0);
 return <Lesson slug={slug} minInteractions={3} predict={{"question": "Four points are at (\u00b13, \u00b11). Classes are the sign of y. Does keeping the widest axis preserve these classes?", "options": ["No", "Yes"], "answer": 0}} exploreHint="Compare the original case, then change its assumptions." reveal={()=><p>The retained projection keeps the x direction and 90% of variance, yet opposite classes overlap. PCA uses the geometry, not the labels. Changing labels alone leaves its axis unchanged; changing coordinate scale can change that axis. These are four constructed points, not a test of real-model accuracy.</p>}>
 {({locked,interact,phase})=><div className={s.root}>
 {locked||(mode===null&&phase!=='reveal')?<div className={s.input}>Points (±3, ±1); labels: y sign.</div>:<div><Picture mode={mode??0}/></div>}
 {!locked&&seen&&<p className={s.proof}>Retained: {proof.axis===0?'x':'y'} · {(proof.retained*100).toFixed(0)}% · {proof.overlap?'Overlap':'Separate'}</p>}
 {!locked&&visited.includes(1)&&<p className={s.proof}>Scale: {run(1).axis===0?'x':'y'}{visited.includes(2)&&<> · Relabel: {run(2).axis===0?'x':'y'}</>}</p>}
 <div className={s.row}>{["Project", "Scale y", "Relabel x"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i||(phase==='reveal'&&mode===null&&i===0)} aria-pressed={!locked&&(mode===i||(phase==='reveal'&&mode===null&&i===0))} onClick={()=>{setMode(i);setVisited(v=>v.includes(i)?v:[...v,i]);if(i===0)setSeen(true);if(required.includes(i)&&!earned.current.has(i)){earned.current.add(i);interact();}}}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
