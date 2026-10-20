'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(x:number)=>x.toFixed(3);
function Picture({mode,paired}:{mode:number;paired?:boolean}){const r=m.run(mode),x=(v:number)=>150+v*31;return <><svg className={s.plot} viewBox="0 0 300 120" role="img" aria-label="Separating threshold with geometric half-margin shaded"><rect x={x(r.b-r.margin)} y="15" width={r.margin*62} height="65" fill="var(--accent)" opacity=".18"/><line x1="10" x2="290" y1="60" y2="60" stroke="currentColor"/><line x1={x(r.b)} x2={x(r.b)} y1="10" y2="86" className={s.line}/>{r.points.map((v,i)=><g key={i}><circle cx={x(v)} cy="60" r="6" fill={v<0?'none':'var(--accent)'} stroke="currentColor"/><text x={x(v)} y="104" textAnchor="middle">{v}</text></g>)}</svg><div className={s.caption}>Correct {r.correct}/4 · Margin {r.margin} · Scores {r.scores.join('/')}</div></>;}

export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState<number[]>([]);const earned=useRef(new Set<number>());
 const choose=(i:number,interact:()=>void)=>{setMode(i);if([0, 1, 3, 4].includes(i)&&!earned.current.has(i)){earned.current.add(i);setSeen([...earned.current]);interact();}};
 return <Lesson slug={slug} minInteractions={4} predict={{"question": "Several cutoffs on a number line all sort your four points correctly. Negative points \u22123,\u22121; positive points 1,3. Which threshold has the largest distance to its closest point?", "options": ["\u2212.5", "0", ".5"], "answer": 1}} exploreHint={"Margin means the closest geometric distance, half the full separating slab width."} reveal={()=> <p>Both retained thresholds classified all four points correctly. Moving the threshold from −.5 to zero increased the closest distance from .5 to 1. The nearest points, −1 and 1, bound this half-margin. Moving only outer points did not change it. Multiplying scores by ten enlarged raw numbers while normalization kept the same geometric distance.</p>}>
 {({locked,interact})=><div className={s.root}>
 {locked||mode===null?<div className={s.input}>−3−, −1−, 1+, 3+ · positive when x≥b · b choices: −.5,0,.5</div>:<Picture mode={mode} paired={seen.includes(0)&&seen.includes(1)}/>}
 {!locked&&seen.length===4&&<div className={s.proof}>Witness: b −.5→0 · Correct 4/4→4/4 · Margin {m.run(0).margin}→{m.run(1).margin} · ×10:{m.run(3).margin} · Outer±4:{m.run(4).margin}</div>}
 <div className={s.row}>{["b=\u2212.5", "b=0", "b=.5", "Score \u00d710", "Outer \u00b14"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i,interact)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
