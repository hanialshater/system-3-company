"use client";
import {useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import {run,points,names} from './model';
import s from './styles.module.css';
export default function Demo({slug}:{slug:string}){
const [other,setOther]=useState(false),[seen,setSeen]=useState(false),[earned,setEarned]=useState(false);const r=run(other);const [shown,setShown]=useState(false);const complete=shown;
return <Lesson slug={slug} predict={{"question": "A(0,0), B(2,2), C(0,2), D(2,0). For tour A-B-C-D-A, replacing AB/CD with AC/BD does what?", "options": ["Shortens it", "Lengthens it", "Leaves its length"], "answer": 0}} minInteractions={2} exploreHint="Reverse the middle segment, then compare an uncrossed tour." reveal={()=><p>Reversing B-C replaced the crossing edges and kept one cycle through every vertex. The length fell from 9.66 to 8.00. The boundary countercase stayed 8.00: there was no proper crossing to remove. This Euclidean symmetric move does not certify global optimality.</p>}>
{({locked,interact})=><div className={s.root}><svg className={s.picture} viewBox="0 0 340 155" role="img" aria-label="Which reconnection shortens the tour?">{(shown?r.after:r.before).map((v,i,t)=><line key={i} x1={70+points[v][0]*80} y1={120-points[v][1]*45} x2={70+points[t[(i+1)%t.length]][0]*80} y2={120-points[t[(i+1)%t.length]][1]*45} stroke="var(--domain)" strokeWidth="2"/>)}{points.map((p,i)=><g key={i}><circle cx={70+p[0]*80} cy={120-p[1]*45} r="4" fill="var(--fg)"/><text x={53+p[0]*80} y={110-p[1]*45}>{names[i]}</text></g>)}{shown?<text x="15" y="145">{r.after.map(v=>names[v]).join('→')}→A</text>:null}</svg><p className={s.proof} aria-live="polite">{seen?"Seen: 9.66→8.00 · boundary 8.00→8.00":shown?`${r.old.toFixed(2)}→${r.next.toFixed(2)}`:"A-B-C-D-A"}</p><div className={s.controls}><Control disabled={locked||complete} onClick={()=>{setShown(true);if(!earned){setEarned(true);interact();}}}>Reconnect</Control><Control disabled={locked||!complete||other} onClick={()=>{setOther(true);if(!seen){setSeen(true);interact();}}}>Boundary</Control><Control disabled={locked||(!other&&!shown)} onClick={()=>{setOther(false);setShown(false);}}>Reset</Control></div></div>}
</Lesson>;
}
