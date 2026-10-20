'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(x:number)=>x.toFixed(3);
function Picture({mode,paired}:{mode:number;paired?:boolean}){const r=m.run(mode),x=(v:number)=>150+v*35,y=(v:number)=>75-v*35;return <><svg className={s.plot} viewBox="0 0 300 145" role="img" aria-label="Original points connected to reconstructed projected points"><path d="M10 75H290M150 5V140" stroke="var(--line)"/>{r.points.map((p,i)=><g key={i}><line x1={x(p[0])} y1={y(p[1])} x2={x(r.decoded[i][0])} y2={y(r.decoded[i][1])} className={s.other}/><circle cx={x(p[0])} cy={y(p[1])} r="4" className={s.dot}/><circle cx={x(r.decoded[i][0])} cy={y(r.decoded[i][1])} r="7" fill="none" stroke="currentColor"/></g>)}<text x="279" y="93">x</text><text x="160" y="15">y</text></svg><div className={s.caption}>Σerror² {r.total} · Variance {(r.retained*100).toFixed(1)}% · Code {r.codes.map(v=>v??'2D').join('/')}</div></>;}

export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState<number[]>([]);const earned=useRef(new Set<number>());
 const choose=(i:number,interact:()=>void)=>{setMode(i);if([0, 1].includes(i)&&!earned.current.has(i)){earned.current.add(i);setSeen([...earned.current]);interact();}};
 return <Lesson slug={slug} minInteractions={2} predict={{"question": "Four centered points: (\u22123,\u22121),(\u22121,1),(1,1),(3,\u22121). Does keeping just x necessarily discard half the variance?", "options": ["Yes", "No"], "answer": 1}} exploreHint={"Solid dots are originals, outlined dots are reconstructions; joining segments are reconstruction errors."} reveal={()=> <p>The x-only reconstruction retained 83.3% of the variance with total squared error 4. Using the same one-number budget for y produced error 20. The joining segments show the lost coordinate. Keeping one of two coordinates did not mean losing half the variance. This geometric variance objective says nothing by itself about semantic or task information.</p>}>
 {({locked,interact})=><div className={s.root}>
 {locked||mode===null?<div className={s.input}>Points (−3,−1),(−1,1),(1,1),(3,−1) · one-number code: dot product with chosen axis</div>:<Picture mode={mode} paired={seen.includes(0)&&seen.includes(1)}/>}
 {!locked&&seen.length===2&&<div className={s.proof}>Witness: x Σerror² {m.run(0).total} / y {m.run(1).total} · x variance {(m.run(0).retained*100).toFixed(1)}%</div>}
 <div className={s.row}>{["x-code", "y-code", "Full", "Isotropic"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i,interact)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
