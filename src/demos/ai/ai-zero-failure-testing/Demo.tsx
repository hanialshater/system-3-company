'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import {run} from './model';
import s from './styles.module.css';
function Picture({mode}:{mode:number}){const r=run(mode);return (<><svg className={s.plot} viewBox="0 0 300 174" role="group" aria-label="Probability of zero failures versus assumed failure rate"><path d="M30 15V130H285" className={s.other}/><polyline className={s.line} points={r.curve.map(v=>`${30+v.p*5000},${130-v.zero*110}`).join(' ')}/><circle cx="80" cy={130-r.zero*110} r="4"/><text x="30" y="151">0%</text><text x="250" y="151">5%</text><text x="5" y="15">1</text><text x="2" y="131">0</text><text x="130" y="162">Failure rate</text></svg><div className={s.caption}>Tests {r.n} · Independent {r.effective} · Endpoint {(r.upper*100).toFixed(2)}%</div><div className={s.caption}>At 1%: zero {(r.zero*100).toFixed(1)}%</div></>);}
export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState(false);const earned=useRef(new Set<number>());const [visited,setVisited]=useState<number[]>([]);const required=[0, 1];const proof=run(0);
 return <Lesson slug={slug} minInteractions={2} predict={{"question": "100 independent tests show no failures. Could the true failure rate still be 1%?", "options": ["Yes", "No"], "answer": 0}} exploreHint="Compare the original case, then change its assumptions." reveal={()=><p>For the retained independent-test model, a 1% failure rate still gives about 36.6% chance of zero failures in 100 tests. The one-sided 95% zero-failure endpoint is about 2.95%, not zero. Duplicated observations count as one independent trial, so the same inference does not apply.</p>}>
 {({locked,interact,phase})=><div className={s.root}>
 {locked||(mode===null&&phase!=='reveal')?<div className={s.input}>100 independent tests; failures observed: 0.</div>:<div><Picture mode={mode??0}/></div>}
 {!locked&&seen&&<p className={s.proof}>Retained: {proof.n} tests · {(proof.zero*100).toFixed(1)}% · endpoint {(proof.upper*100).toFixed(2)}%</p>}
 {!locked&&visited.includes(1)&&<p className={s.proof}>Duplicate: independent {run(1).effective}</p>}
 <div className={s.row}>{["Evaluate", "Duplicate", "200 tests"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i||(phase==='reveal'&&mode===null&&i===0)} aria-pressed={!locked&&(mode===i||(phase==='reveal'&&mode===null&&i===0))} onClick={()=>{setMode(i);setVisited(v=>v.includes(i)?v:[...v,i]);if(i===0)setSeen(true);if(required.includes(i)&&!earned.current.has(i)){earned.current.add(i);interact();}}}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
