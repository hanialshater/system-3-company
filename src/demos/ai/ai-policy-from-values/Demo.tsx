'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(x:number)=>x.toFixed(3);
function Picture({mode,paired}:{mode:number;paired?:boolean}){const r=m.run(mode);return <><svg className={s.plot} viewBox="0 0 300 120" role="img" aria-label="Action values stay fixed while action probability branches change"><text x="150" y="15" textAnchor="middle">Policy</text>{r.q.map((q,i)=><g key={i}><line x1="150" y1="25" x2={75+i*150} y2="65" stroke="currentColor" strokeWidth={1+r.p[i]*7}/><text x={75+i*150} y="84" textAnchor="middle">{i===0?'Left':'Right'} Q={q}</text><text x={75+i*150} y="105" textAnchor="middle">p={f(r.p[i])}</text></g>)}</svg><div className={s.caption}>E[r] {r.expected.toFixed(1)}</div></>;}

export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState<number[]>([]);const earned=useRef(new Set<number>());
 const choose=(i:number,interact:()=>void)=>{setMode(i);if([0, 1].includes(i)&&!earned.current.has(i)){earned.current.add(i);setSeen([...earned.current]);interact();}};
 return <Lesson slug={slug} minInteractions={2} predict={{"question": "Q(Left)=4 and Q(Right)=2. Epsilon=.2 explores uniformly among both actions. How often is Right chosen?", "options": ["0%", "10%", "20%"], "answer": 1}} exploreHint={"A policy supplies action probabilities. Exploration includes the greedy action too."} reveal={()=> <p>The retained Q values stayed 4 and 2, while Right’s choice probability changed from .000 to .100. With epsilon .2, uniform exploration gives each action .100; Left also receives the .800 greedy share. The resulting expected reward is 3.8. Values estimate outcomes; a policy specifies choices. This exploration rule lowers immediate expected reward in this example.</p>}>
 {({locked,interact})=><div className={s.root}>
 {locked||mode===null?<div className={s.input}>Left Q=4 · Right Q=2 · epsilon=.2 · explore uniformly among both</div>:<Picture mode={mode} paired={seen.includes(0)&&seen.includes(1)}/>}
 {!locked&&seen.length===2&&<div className={s.proof}>Witness: Q 4/2 · p(Right) {f(m.run(0).p[1])}→{f(m.run(1).p[1])} · E[r] {m.run(1).expected.toFixed(1)}</div>}
 <div className={s.row}>{["Greedy", "\u03b5=.2", "\u03b5=.6", "Tie"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i,interact)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
