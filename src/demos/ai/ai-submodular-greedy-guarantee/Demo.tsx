'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import {run} from './model';
import s from './styles.module.css';
function Picture({mode}:{mode:number}){const r=run(mode);return (<><svg className={s.plot} viewBox="0 0 300 174" role="group" aria-label="Computed greedy and exhaustive optimum scores">{[r.greedyValue,r.optimum].map((value,i)=><g key={i}><rect x={45+i*140} y={130-value/r.optimum*95} width="65" height={Math.max(1,value/r.optimum*95)} className={s.cell}/><text x={77+i*140} y={120-value/r.optimum*95} textAnchor="middle">{value}</text><text x={77+i*140} y="151" textAnchor="middle">{(i===0?r.greedy:r.optimal).join('+')}</text></g>)}{r.submodular&&<line x1="25" y1={130-r.bound*95} x2="280" y2={130-r.bound*95} className={s.other}/>}<text x="32" y="15">Greedy</text><text x="183" y="15">Optimum</text></svg><div className={s.caption}>{r.submodular?'Bound ¾':'Complement: no bound'} · Ratio {(100*r.greedyValue/r.optimum).toFixed(1)}%</div></>);}
export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState(false);const earned=useRef(new Set<number>());const [visited,setVisited]=useState<number[]>([]);const required=[0, 1];const proof=run(0);
 return <Lesson slug={slug} minInteractions={2} predict={{"question": "To cover the most items, your greedy picker takes the biggest new gain each time. Choose two sets: A={1,2,3,4}, B={1,2,5}, C={3,4,6}. Can exact marginal greedy miss the best pair?", "options": ["Yes", "No"], "answer": 0}} exploreHint="Compare the original case, then change its assumptions." reveal={()=><p>The retained greedy pair covers 5 while the best pair covers 6. For normalized, nonnegative, monotone submodular functions with a cardinality limit and exact marginal greedy, the finite two-pick bound is three quarters of optimum, at least 1 minus 1/e. The achieved ratio is five sixths. Complementarity removes the assumption and the guarantee.</p>}>
 {({locked,interact,phase})=><div className={s.root}>
 {locked||(mode===null&&phase!=='reveal')?<div className={s.input}>Pick 2; A &#123;1,2,3,4&#125;; B &#123;1,2,5&#125;; C &#123;3,4,6&#125;.</div>:<div><Picture mode={mode??0}/></div>}
 {!locked&&seen&&<p className={s.proof}>Retained: {proof.greedyValue}/{proof.optimum} · bound {proof.bound*100}%</p>}
 {!locked&&visited.includes(1)&&<p className={s.proof}>Complement: {run(1).greedyValue}/{run(1).optimum} · no bound</p>}
 <div className={s.row}>{["Run greedy", "Complements", "New coverage"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i||(phase==='reveal'&&mode===null&&i===0)} aria-pressed={!locked&&(mode===i||(phase==='reveal'&&mode===null&&i===0))} onClick={()=>{setMode(i);setVisited(v=>v.includes(i)?v:[...v,i]);if(i===0)setSeen(true);if(required.includes(i)&&!earned.current.has(i)){earned.current.add(i);interact();}}}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
