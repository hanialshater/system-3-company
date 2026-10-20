'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(x:number)=>x.toFixed(3);
function Picture({mode,paired}:{mode:number;paired?:boolean}){const r=m.run(mode);return mode<2?<><table className={s.table}><thead><tr><th>Left</th><th>G−b</th><th>∇</th><th>θ′</th><th>p′</th></tr></thead><tbody><tr><th>Raw</th><td>3</td><td>1.5/−1.5</td><td>.75/−.75</td><td>{f(r.raw.pLeft)}</td></tr>{mode===1&&<tr><th>Baseline</th><td>{r.base.advantage}</td><td>−.5/.5</td><td>−.25/.25</td><td>{f(r.base.pLeft)}</td></tr>}</tbody></table><div className={s.caption}>p(Left) .500→{f(r.sample.pLeft)}</div></>:<><table className={s.table}><thead><tr><th>Gradient</th><th>p</th><th>Raw</th><th>{mode===3?'bₗ=3,bᵣ=5':'b=4'}</th></tr></thead><tbody>{r.rawMean.rows.map((v,i)=><tr key={i}><th>{i===0?'Left':'Right'}</th><td>.5</td><td>{v}</td><td>{r.baseMean.rows[i]}</td></tr>)}<tr><th>Mean</th><td>—</td><td>{r.rawMean.mean}</td><td>{r.baseMean.mean}</td></tr></tbody></table><div className={s.caption}>Left: 3−4=−1 · p .500→{f(r.base.pLeft)} (Raw {f(r.raw.pLeft)})</div></>;}

export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState<number[]>([]);const earned=useRef(new Set<number>());
 const choose=(i:number,interact:()=>void)=>{setMode(i);if([1, 2, 3].includes(i)&&!earned.current.has(i)){earned.current.add(i);setSeen([...earned.current]);interact();}};
 return <Lesson slug={slug} minInteractions={3} predict={{"question": "Left returns 3. With baseline 4, will this update raise or lower Left\u2019s probability?", "options": ["Raise it", "Lower it", "Leave it unchanged"], "answer": 1}} exploreHint={"Deterministic one-step returns; baseline fixed during update. Table shows Left-coordinate gradient; Right-coordinate is its negative. Expectations use the original policy."} reveal={()=> <p>Left earned 3, but the baseline was 4. Its relative return was −1: Left’s probability fell from .500 to .378. Without the baseline, that sample raised it to .818. The two-action table gives mean Left-coordinate gradient −.5 in both cases. Individual updates changed; that expected gradient did not. The action-dependent case breaks this identity for the naive estimator shown.</p>}>
 {({locked,interact})=><div className={s.root}>
 {locked||mode===null?<div className={s.input}>Left3 · Right5 · p=.5/.5 · b=4 · η=.5 · θ=(0,0)</div>:<Picture mode={mode} paired={seen.includes(0)&&seen.includes(1)}/>}
 {!locked&&seen.length===3&&<div className={s.proof}>Witness: Left 3−4=−1 · p .500→{f(m.sample(0,4).pLeft)} (Raw {f(m.sample(0,0).pLeft)}) · Mean ∇ₗ {m.expected(0).mean}/{m.expected(4).mean} · bₗ3,bᵣ5→{m.expected([3,5]).mean}</div>}
 <div className={s.row}>{["Raw", "Baseline", "Compare", "Action-dependent"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i,interact)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
