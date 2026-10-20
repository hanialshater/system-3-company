'use client';
import {useRef,useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import * as m from './model';
import s from './styles.module.css';
const f=(x:number)=>x.toFixed(3);
function Picture({mode,paired}:{mode:number;paired?:boolean}){const r=m.run(mode);return <><svg className={s.plot} viewBox="0 0 300 126" role="img" aria-label="Three fixed probability bars and movable decision threshold"><line x1={40+r.threshold*220} x2={40+r.threshold*220} y1="10" y2="105" className={s.other}/>{r.rows.map((v,i)=><g key={i}><text x="5" y={30+i*33}>{v.x}</text><rect x="40" y={16+i*33} width={v.p*220} height="19" className={s.cell}/><text x="265" y={30+i*33}>{v.positive?'+':'−'}</text></g>)}</svg><div className={s.caption}>p {r.rows.map(v=>f(v.p)).join(' / ')} · θ {r.threshold}</div></>;}

export default function Demo({slug}:{slug:string}){
 const [mode,setMode]=useState<number|null>(null);const [seen,setSeen]=useState<number[]>([]);const earned=useRef(new Set<number>());
 const choose=(i:number,interact:()=>void)=>{setMode(i);if([0, 1].includes(i)&&!earned.current.has(i)){earned.current.add(i);setSeen([...earned.current]);interact();}};
 return <Lesson slug={slug} minInteractions={2} predict={{"question": "Your approval model turns a score into a probability, then makes a yes-or-no call. At x=1, score z=2. With decision threshold 0.9, will this fixed model predict positive?", "options": ["Yes", "No"], "answer": 1}} exploreHint={"Change thresholds; probabilities are estimates, not a calibration test."} reveal={()=> <p>At x=1, the retained probability estimate stayed .881 when the threshold changed from .5 to .9. Its decision changed from positive to negative. The fixed linear score feeds a sigmoid; the threshold then turns that estimate into a decision. Changing a decision rule does not retrain these weights or establish calibration.</p>}>
 {({locked,interact})=><div className={s.root}>
 {locked||mode===null?<div className={s.input}>x: −1, 0, 1 · z=2x · p=1/(1+exp(−z)) · threshold=.9</div>:<Picture mode={mode} paired={seen.includes(0)&&seen.includes(1)}/>}
 {!locked&&seen.length===2&&<div className={s.proof}>Witness: θ .5→.9 · p(1) {f(m.run(0).rows[2].p)}→{f(m.run(1).rows[2].p)} · +→−</div>}
 <div className={s.row}>{["\u03b8=.5", "\u03b8=.9", "\u03b8=.1"].map((label,i)=><Control key={label} className={s.tap} disabled={locked||mode===i} aria-pressed={!locked&&mode===i} onClick={()=>choose(i,interact)}>{label}</Control>)}<Control className={s.tap} disabled={locked||mode===null} onClick={()=>setMode(null)}>Reset</Control></div>
 </div>}
 </Lesson>;
}
