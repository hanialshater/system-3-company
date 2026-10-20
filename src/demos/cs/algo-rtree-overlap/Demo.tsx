"use client";
import {useState} from 'react';
import {Lesson} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import {run,boxes} from './model';
import s from './styles.module.css';
export default function Demo({slug}:{slug:string}){
const [other,setOther]=useState(false),[seen,setSeen]=useState(false),[earned,setEarned]=useState(false);const r=run(other);const [shown,setShown]=useState(false);const complete=shown;
return <Lesson slug={slug} predict={{"question": "A=[0,3]\u00d7[0,3], B=[2,5]\u00d7[0,3]. For q=(2.5,1), how many branches must a point query visit?", "options": ["One", "Two", "Zero"], "answer": 1}} minInteractions={2} exploreHint="Search, then move the query outside the overlap." reveal={()=><p>You visited both branches at (2.5,1), then only A at (.5,1). The marked descendants produced no exact point hit in either case. A containing rectangle creates candidates; it does not prove an enclosed object matches.</p>}>
{({locked,interact})=><div className={s.root}><svg className={s.picture} viewBox="0 0 340 155" role="img" aria-label="How many branches need a visit?">{boxes.map(b=><g key={b.id}><rect x={25+b.box[0]*50} y="25" width="150" height="90" fill="none" stroke={shown&&r.visited.includes(b.id)?'var(--domain)':'var(--muted)'} strokeWidth={shown&&r.visited.includes(b.id)?3:1}/><text x={30+b.box[0]*50} y="45">{b.id}</text>{b.points.map((p,i)=><circle key={i} cx={25+p[0]*50} cy={115-p[1]*30} r="4" fill="var(--fg)"/>)}</g>)}<circle cx={25+r.q[0]*50} cy={115-r.q[1]*30} r="7" fill="var(--domain)"/><text x={35+r.q[0]*50} y={105-r.q[1]*30}>q</text></svg><p className={s.proof} aria-live="polite">{seen?"Seen: 2 branches / 0 hits · 1 / 0":shown?`${r.visited.length} branches · ${r.hits.length} hits`:"q=(2.5,1)"}</p><div className={s.controls}><Control disabled={locked||complete} onClick={()=>{setShown(true);if(!earned){setEarned(true);interact();}}}>Search</Control><Control disabled={locked||!complete||other} onClick={()=>{setOther(true);if(!seen){setSeen(true);interact();}}}>Move q</Control><Control disabled={locked||(!other&&!shown)} onClick={()=>{setOther(false);setShown(false);}}>Reset</Control></div></div>}
</Lesson>;
}
