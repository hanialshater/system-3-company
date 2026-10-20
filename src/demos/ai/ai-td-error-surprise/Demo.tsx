'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(x:number)=>x.toFixed(3);
function Picture({mode,paired}:{mode:number;paired?:boolean}){const r=m.run(mode);return <><svg className={s.plot} viewBox="0 0 300 110" role="img" aria-label="Target-minus-old gap on one value axis"><line x1="20" y1="70" x2="280" y2="70" stroke="currentColor"/><circle cx={20+r.old*24} cy="70" r="6" fill="none" stroke="currentColor"/><circle cx={20+r.target*24} cy="70" r="5" className={s.dot}/><line x1={20+r.old*24} y1="47" x2={20+r.target*24} y2="47" className={s.line}/><text x="10" y="20">Old {r.old} · Target {r.target} · δ {r.delta}</text><text x="10" y="104">r {r.reward} · V′ {r.value}{r.terminal?' · ⊣':''}</text></svg><div className={s.caption}>{r.reward} + {r.terminal?0:.5*r.next} − {r.old} = {r.delta}</div></>;}

export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState<number[]>([]);const earned=useRef(new Set<number>());
 const choose=(i:number,interact:()=>void)=>{setMode(i);if([1, 2, 3].includes(i)&&!earned.current.has(i)){earned.current.add(i);setSeen([...earned.current]);interact();}};
 return <Lesson slug={slug} minInteractions={3} predict={{"question": "Gamma=.5. Which produces a larger upward correction: current4,reward4,next4; or current10,terminal reward10?", "options": ["Reward4 case", "Reward10 case", "Equal correction"], "answer": 0}} exploreHint={"Error means target minus old estimate here; it is not an emotion or brain measurement."} reveal={()=> <p>The retained reward 4 produced target 6 against old value 4, so error 2 raised the estimate to 5. Terminal reward 10 matched its old prediction 10: error zero, no correction. Reward size alone did not determine the update. A negative target-minus-old gap decreases the estimate even when the reward is nonnegative.</p>}>
 {({locked,interact})=><div className={s.root}>
 {locked||mode===null?<div className={s.input}>γ=.5 · α=.5 · case① V=4,r=4,next=4 · case② V=10,r=10,terminal</div>:<Picture mode={mode} paired={seen.includes(0)&&seen.includes(1)}/>}
 {!locked&&seen.length===3&&<div className={s.proof}>Witness: r4→δ{m.run(1).delta} · r10→δ{m.run(2).delta} · r0→δ{m.run(3).delta}</div>}
 <div className={s.row}>{["Expected2", "Unexpected4", "Expected10", "Missing reward"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i,interact)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
