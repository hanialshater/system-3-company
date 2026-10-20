'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import {run} from './model';
import s from './styles.module.css';
function Picture({mode}:{mode:number}){const r=run(mode);return (<><svg className={s.plot} viewBox="0 0 300 174" role="group" aria-label="Raw rewards outlined and discounted contributions filled">{r.rs.map((raw,i)=><g key={i}><rect x={35+i*85} y={135-raw*24} width="40" height={raw*24} fill="none" stroke="currentColor"/><rect x={42+i*85} y={135-r.parts[i]*24} width="26" height={r.parts[i]*24} className={s.cell}/><text x={55+i*85} y={125-raw*24} textAnchor="middle">{raw}</text><text x={55+i*85} y="151" textAnchor="middle">t{i}</text><text x={55+i*85} y="16" textAnchor="middle">×{r.weights[i]}</text></g>)}</svg><div className={s.caption}>Discount {r.gamma} · Contributions {r.parts.join(', ')} · Total {r.total}</div></>);}
export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState(false);const earned=useRef(new Set<number>());const [visited,setVisited]=useState<number[]>([]);const required=[0];const proof=run(0);
 return <Lesson slug={slug} minInteractions={1} predict={{"question": "A reward one step ahead counts half. How much does reward 4 contribute when it is two steps ahead?", "options": ["1", "2", "4"], "answer": 0}} exploreHint="Compare the original case, then change its assumptions." reveal={()=><p>In the retained stream, rewards 0, 2, 4 contribute 0, 1, 1 when the discount is one half. The later reward is weighted twice: its multiplier is one quarter. Changing the discount changes these weights, not the raw rewards. The first transition has weight one.</p>}>
 {({locked,interact,phase})=><div className={s.root}>
 {locked||(mode===null&&phase!=='reveal')?<div className={s.input}>Rewards: 0 now, 2 next, 4 two steps later.</div>:<div><Picture mode={mode??0}/></div>}
 {!locked&&seen&&<p className={s.proof}>Retained: {proof.parts.join(' + ')} = {proof.total}</p>}
 <div className={s.row}>{["Half weight", "Now only", "No discount"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i||(phase==='reveal'&&mode===null&&i===0)} aria-pressed={!locked&&(mode===i||(phase==='reveal'&&mode===null&&i===0))} onClick={()=>{setMode(i);setVisited(v=>v.includes(i)?v:[...v,i]);if(i===0)setSeen(true);if(required.includes(i)&&!earned.current.has(i)){earned.current.add(i);interact();}}}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
