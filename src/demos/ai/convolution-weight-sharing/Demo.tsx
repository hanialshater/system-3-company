"use client";
import {useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control,Row} from '@/kit/controls';
import {correlate,input} from './model';
import s from './styles.module.css';
export default function Demo({slug}:{slug:string}) {
 const [coefficient,setCoefficient]=useState<1|2>(1); const [window,setWindow]=useState(0); const [seen,setSeen]=useState(false); const outputs=correlate(coefficient);
 return <Lesson slug={slug} predict={{"question": "Which windows use the first shared coefficient?", "options": ["Only the first", "All three", "Only the last"], "answer": 1}} exploreHint="Apply the filter, move the window, then change its shared coefficient." reveal={()=> <p>The retained filter [1,−1] produced [−1,2,−1]. Change coefficient reuses [2,−1] across all windows, giving [0,4,−1]. The last output stays −1 because its first input is zero. This 1D cross-correlation analogue shares coefficients; it does not learn a filter or demonstrate image recognition.</p>}>
 {({locked,interact})=><div className={s.root}><div className={s.cells}>{input.map((v,i)=><div className={i===window||i===window+1?s.on:s.off} key={i}>{v}</div>)}</div>
 <div className={s.equation}>[{coefficient}, −1] · [{input[window]}, {input[window+1]}] = {outputs[window]}</div>
 <div className={s.proof}>{seen?'Retained: [1,−1] → [−1,2,−1]':'Cross-correlation; stride 1; valid; no bias'}</div>
 <div className={s.cells}>{outputs.map((v,i)=><div className={i===window?s.on:s.off} key={i}>{seen?v:'?'}</div>)}</div>
 <Row><Control disabled={locked||seen} onClick={()=>{setSeen(true);interact();}}>Apply filter</Control><Control disabled={locked||!seen} onClick={()=>setWindow(w=>(w+1)%3)}>Next window</Control><Control disabled={locked||!seen} onClick={()=>setCoefficient(c=>c===1?2:1)}>Change coefficient</Control></Row></div>}
 </Lesson>;
}
