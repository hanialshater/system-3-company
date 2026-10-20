"use client";
import {useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control,Row} from '@/kit/controls';
import {trace} from './model';
import s from './styles.module.css';
export default function Demo({slug}:{slug:string}) {
 const [jam,setJam]=useState(true); const [step,setStep]=useState(0); const [seen,setSeen]=useState(false); const rows=trace(jam);
 return <Lesson slug={slug} predict={{"question": "After observing jammed, what does this controller request?", "options": ["Read the ticket", "Ask for help", "Open a second ticket"], "answer": 1}} exploreHint="Follow the jam trace, unjam the box, then Step through the other branch." reveal={()=> <p>The retained jam trace asked for help and stopped; it never requested read. After Unjam, Step follows the other branch. This finite scripted controller chooses its next request from its observation. It neither learns nor calls a live model.</p>}>
 {({locked,interact})=><div className={s.root}><div className={s.trace}>{rows.slice(0,step+1).map((r,i)=><div key={i}>{r}</div>)}</div>
 <div className={s.proof}>{seen?'Retained: jammed → help → stop':'Scripted controller'}</div>
 <Row><Control disabled={locked||seen} onClick={()=>{setStep(rows.length-1);setSeen(true);interact();}}>Follow jam</Control><Control disabled={locked||!seen||!jam} onClick={()=>{setJam(false);setStep(0);}}>Unjam</Control><Control disabled={locked||step===rows.length-1} onClick={()=>setStep(n=>Math.min(n+1,rows.length-1))}>Step</Control></Row></div>}
 </Lesson>;
}
