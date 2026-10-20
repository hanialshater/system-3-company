'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(x:number)=>x.toFixed(3);
function Picture({mode,paired}:{mode:number;paired?:boolean}){const r=m.run(mode);return <><table className={s.table}><thead><tr><th>Token</th><th>exp(z)</th><th>p</th></tr></thead><tbody>{r.p.map((p,i)=><tr key={i}><td>{i+1}</td><td>{r.weights[i].toFixed(0)}</td><td>{f(p)}</td></tr>)}</tbody></table><svg className={s.plot} viewBox="0 0 300 40" role="img" aria-label="Normalized token probability segments">{r.p.map((p,i)=><rect key={i} x={r.p.slice(0,i).reduce((a,b)=>a+b,0)*290+5} y="8" width={p*290} height="24" fill="var(--accent)" opacity={.35+i*.3} stroke="currentColor"/>)}</svg></>;}

export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState<number[]>([]);const earned=useRef(new Set<number>());
 const choose=(i:number,interact:()=>void)=>{setMode(i);if([0, 1, 2].includes(i)&&!earned.current.has(i)){earned.current.add(i);setSeen([...earned.current]);interact();}};
 return <Lesson slug={slug} minInteractions={3} predict={{"question": "Your language model scores three candidate next tokens. Scores are 0, ln2, ln4. What probability does the third token receive?", "options": ["4/6", "4/7", "4/21"], "answer": 1}} exploreHint={"Compare the same tokens; normalization divides exponential weights by their sum."} reveal={()=> <p>The retained third-token probability was .571 before and after the common shift. Multiplying every exponential weight by three cancels in the ratio. Doubling the score gaps changed it to .762 while keeping the winner. Scores are not probabilities: exponential weighting and normalization create this distribution.</p>}>
 {({locked,interact})=><div className={s.root}>
 {locked||mode===null?<div className={s.input}>Scores: 0, ln2, ln4 · pᵢ=exp(zᵢ)/Σexp(z)</div>:<Picture mode={mode} paired={seen.includes(0)&&seen.includes(1)}/>}
 {!locked&&seen.length===3&&<div className={s.proof}>Witness: p₃ base {f(m.run(0).p[2])} · shift {f(m.run(1).p[2])} · ×2 {f(m.run(2).p[2])}</div>}
 <div className={s.row}>{["Base", "Shift +ln3", "Gaps \u00d72", "Tied"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i,interact)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
