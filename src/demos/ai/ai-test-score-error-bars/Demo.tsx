'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(x:number)=>x.toFixed(3);
const pct=(x:number)=>(x*100).toFixed(2)+'%';
function Picture({mode,paired}:{mode:number;paired?:boolean}){const r=m.run(mode);return <><svg className={s.plot} viewBox="0 0 300 135" role="img" aria-label="Exact binomial probability masses on a shared score axis, fixed mass scale"><text x="6" y="13">Mass</text><text x="4" y="31">.25</text><line x1="30" y1="105" x2="285" y2="105" stroke="currentColor"/>{r.pmf.map((p,k)=><line key={k} x1={30+255*k/r.n} x2={30+255*k/r.n} y1="105" y2={105-p*300} stroke="var(--accent)" strokeWidth={r.n===20?4:2} opacity={r.n===20&&k<16?.4:1}/>)}{r.n===20&&<><line x1="234" x2="234" y1="18" y2="108" className={s.other}/><circle cx="234" cy={105-r.exact*300} r="4" fill="none" stroke="currentColor"/><text x="234" y="132" textAnchor="middle">16/20</text></>}{paired&&<><circle cx="234" cy={105-m.stats(20,.8).exact*300} r="5" fill="none" stroke="currentColor"/><rect x="230" y={101-m.stats(20,.7).exact*300} width="8" height="8" fill="none" stroke="currentColor"/><text x="37" y="20">n20: ○p.8 □p.7</text></>}<text x="28" y="120">0</text><text x="265" y="120">100%</text><text x="140" y="120">Score</text></svg><div className={s.caption}>{r.duplicates?'80 rows / 20 Independent':`n ${r.n}`} · p {r.p} · SD {pct(r.sd)}{r.n===20?` · P(X≥16) ${pct(r.tail)}`:''}</div></>;}

export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState<number[]>([]);const earned=useRef(new Set<number>());
 const choose=(i:number,interact:()=>void)=>{setMode(i);if([0, 1, 2, 3].includes(i)&&!earned.current.has(i)){earned.current.add(i);setSeen([...earned.current]);interact();}};
 return <Lesson slug={slug} minInteractions={4} predict={{"question": "Your model gets 16 of 20 test questions right. For independent identically distributed binary outcomes, could either stipulated accuracy, 70% or 80%, produce 16 correct out of 20?", "options": ["Only 70%", "Only 80%", "Either", "Neither"], "answer": 2}} exploreHint={"p is stipulated, not estimated from 16/20. Vertical axis: probability mass. More independent cases differs from copying records."} reveal={()=> <p>Both stipulated accuracies gave positive probability to exactly 16 correct. For 16 or more, the chances were 62.96% at p=.8 and 23.75% at p=.7. That score did not identify its generator. At p=.8, increasing independent cases from 20 to 80 reduced score SD from 8.94% to 4.47%. Copying records adds no independent cases. For n20,p.8, the inclusive 12–19 sampling band covers 97.8489% of possible scores; it is not an interval for unknown accuracy.</p>}>
 {({locked,interact})=><div className={s.root}>
 {locked||mode===null?<div className={s.input}>Observed16/20 · n20 · stipulated p=.7 or .8 · Score0–100%</div>:<Picture mode={mode} paired={seen.includes(0)&&seen.includes(1)}/>}
 {!locked&&seen.length===4&&<div className={s.proof}>Witness: p .8/.7 · P(X=16) {pct(m.stats(20,.8).exact)}/{pct(m.stats(20,.7).exact)} · P(X≥16) {pct(m.stats(20,.8).tail)}/{pct(m.stats(20,.7).tail)}<br/>SD n20/n80 {pct(m.stats(20,.8).sd)}/{pct(m.stats(80,.8).sd)} · Duplicates80/20 · Sampling band n20,p.8: {m.stats(20,.8).lo}–{m.stats(20,.8).hi} · {(100*m.stats(20,.8).coverage).toFixed(4)}%</div>}
 <div className={s.row}>{["p=.8", "p=.7", "n=80", "Duplicates"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i,interact)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
