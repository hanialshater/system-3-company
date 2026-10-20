'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import {run} from './model';
import s from './styles.module.css';
function Picture({mode}:{mode:number}){const r=run(mode);return (<><svg className={s.plot} viewBox="0 0 300 174" role="group" aria-label="Ordered query key matrices; filled entries are permitted">{[r.left,r.right].map((grid,index)=>{const ox=index===0?12:154,size=index===0?88:128,cell=size/grid.n;return <g key={index}>{grid.pairs.map(p=><rect key={`${p.q}-${p.k}`} x={ox+p.k*cell} y={12+p.q*cell} width={cell-1} height={cell-1} className={p.allowed?s.cell:s.muted}/>)}<text x={ox+size/2} y="156" textAnchor="middle">{grid.n}×{grid.n}: {grid.allowed}</text></g>})}</svg><div className={s.caption}>{r.causal?'Causal allowed':'Full pairs'} · Ratio {(r.right.allowed/r.left.allowed).toFixed(1)}×</div></>);}
export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState(false);const earned=useRef(new Set<number>());const [visited,setVisited]=useState<number[]>([]);const required=[0, 1];const proof=run(0);
 return <Lesson slug={slug} minInteractions={2} predict={{"question": "Each of 4 queries scores each of 4 keys. If both lengths become 8, how many ordered pair scores exist?", "options": ["64", "32", "16"], "answer": 0}} exploreHint="Compare the original case, then change its assumptions." reveal={()=><p>The retained full matrices contain 16 and 64 ordered pairs. Doubling both dimensions multiplies this count by four. A causal mask permits only 10 and 36 of those pairs here. Pair counts are not measurements of wall-clock time, energy, total model compute or mandatory memory allocation.</p>}>
 {({locked,interact,phase})=><div className={s.root}>
 {locked||(mode===null&&phase!=='reveal')?<div className={s.input}>4 queries × 4 keys; compare with 8 × 8.</div>:<div><Picture mode={mode??0}/></div>}
 {!locked&&seen&&<p className={s.proof}>Retained: full {proof.left.full} → {proof.right.full}</p>}
 {!locked&&visited.includes(1)&&<p className={s.proof}>Causal: {run(1).left.allowed} → {run(1).right.allowed}</p>}
 <div className={s.row}>{["Count pairs", "Causal", "6 to 12"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i||(phase==='reveal'&&mode===null&&i===0)} aria-pressed={!locked&&(mode===i||(phase==='reveal'&&mode===null&&i===0))} onClick={()=>{setMode(i);setVisited(v=>v.includes(i)?v:[...v,i]);if(i===0)setSeen(true);if(required.includes(i)&&!earned.current.has(i)){earned.current.add(i);interact();}}}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
