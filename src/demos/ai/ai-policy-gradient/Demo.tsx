'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(x:number)=>x.toFixed(3);
function Picture({mode,paired}:{mode:number;paired?:boolean}){const r=m.run(mode);return <><table className={s.table}><thead><tr><th></th><th>Left</th><th>Right</th></tr></thead><tbody><tr><th>∇log p</th>{r.grad.map((v,i)=><td key={i}>{v}</td>)}</tr><tr><th>Δθ</th>{r.delta.map((v,i)=><td key={i}>{v}</td>)}</tr><tr><th>p′</th>{r.p.map((v,i)=><td key={i}>{f(v)}</td>)}</tr></tbody></table><svg className={s.plot} viewBox="0 0 300 65" role="img" aria-label="Equal policy becomes the recomputed two-action policy"><rect x="5" y="6" width="145" height="17" className={s.cell}/><rect x="150" y="6" width="145" height="17" fill="none" stroke="currentColor"/><rect x="5" y="34" width={r.p[0]*290} height="17" className={s.cell}/><rect x={5+r.p[0]*290} y="34" width={r.p[1]*290} height="17" fill="none" stroke="currentColor"/></svg></>;}

export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState<number[]>([]);const earned=useRef(new Set<number>());
 const choose=(i:number,interact:()=>void)=>{setMode(i);if([0, 1, 2].includes(i)&&!earned.current.has(i)){earned.current.add(i);setSeen([...earned.current]);interact();}};
 return <Lesson slug={slug} minInteractions={3} predict={{"question": "Equal initial action probabilities; sample Left and return 2. Step size=.5. How does Left\u2019s probability change?", "options": ["Rises", "Falls", "Stays"], "answer": 0}} exploreHint={"Two-logit softmax exponentiates and normalizes. Ascent adds \u03b7\u00d7return\u00d7gradient(log probability)."} reveal={()=> <p>The sampled Left return 2 multiplied its log-probability gradient (.5, −.5). With step size .5, the two logits changed by (.5, −.5), and Left’s probability rose from .500 to .731. This update changed the stochastic policy directly. Zero return makes no change; a negative return reverses this sample’s direction. One update is not a guarantee of better performance.</p>}>
 {({locked,interact})=><div className={s.root}>
 {locked||mode===null?<div className={s.input}>θ=(0,0) · p=(.5,.5) · sampled Left · return 2 · η=.5</div>:<Picture mode={mode} paired={seen.includes(0)&&seen.includes(1)}/>}
 {!locked&&seen.length===3&&<div className={s.proof}>Witness: Δθ ({m.run(0).delta.join(',')}) · p(Left) .500→{f(m.run(0).p[0])} · G0→Δ0 · G−2→p{f(m.run(2).p[0])}</div>}
 <div className={s.row}>{["Left +2", "Left 0", "Left \u22122", "Right +2"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i,interact)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
