"use client";
import {useState} from "react";
import {Lesson} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {replay,stream,quality,insert} from "./model";
import s from "./styles.module.css";
export default function Demo({slug}:{slug:string}){
const [count,setCount]=useState(0),[tie,setTie]=useState(false);const result=replay(count),last=result.events.at(-1),final=replay();const tied=tie?insert(result.archive,{id:"I",a:3,b:3}).accepted:false;
return <Lesson slug={slug} predict={{"question": "You keep an archive holding the best robot gait of each kind. A new empty behaviour cell scores 6; another cell already scores 10. Keep the 6?", "options": ["Keep it", "Reject it"], "answer": 0}} minInteractions={1} exploreHint="Step once, replay through G, then finish the archive." reveal={()=><><p>The archive kept {final.archive.map(c=>c?`${c.id}${quality(c)}`:"").join(", ")}: one best candidate per chosen behaviour cell. Coverage was {final.coverage}/4, with quality sum {final.sum}; global-best-only would keep just D10.</p><p>G9 lost to D10 in the same cell, while E6 survived in a different cell. H8 later improved its own cell. This fixed mutation replay uses current elite parents; equal quality retains the incumbent. The descriptors define the kinds being kept.</p></>}>
{({locked,interact})=><>
<svg className={s.picture} viewBox="0 0 340 190" role="img" aria-label="Four descriptor cells containing computed elites and current candidate outcome">
 {[0,1,2,3].map(k=>{const c=result.archive[k],x=30+(k%2)*110,y=20+(k<2?75:0);return <g key={k}><rect x={x} y={y} width="108" height="73" fill="var(--bg-2)" stroke="var(--domain)"/><text x={x+7} y={y+22}>{k%2?"a≥2":"a<2"}, {k>=2?"b≥2":"b<2"}</text><text x={x+34} y={y+51}>{c?`${c.id} ${quality(c)}`:"—"}</text></g>;})}
 {last?<><text x="265" y="38">{last.candidate.id}({last.candidate.a},{last.candidate.b})</text><text x="265" y="62">q{quality(last.candidate)}</text><text x="265" y="86">{last.accepted?"kept":"rejected"}</text><text x="265" y="110">←{last.candidate.parent||"init"}</text></>:null}
 {count>=7?<text x="28" y="185">G9 rejected · {result.coverage}/4 · sum{result.sum}{tie?` · tie ${tied?"kept":"rejected"}`:""}</text>:null}
 </svg>
<p className={s.summary} aria-live="polite"><>q=10−|a−3|−|b−1| · fixed replay</></p>
<div className={s.controls}><Control disabled={locked||count!==0} onClick={()=>setCount(1)}>Next</Control><Control disabled={locked||count!==1} onClick={()=>setCount(7)} aria-label="Replay to G">G</Control><Control disabled={locked||count!==7} onClick={()=>{setCount(8);interact();}} aria-label="Finish H">H</Control><Control disabled={locked||count!==8||tie} onClick={()=>setTie(true)}>Tie</Control><Control disabled={locked||!tie} onClick={()=>setTie(false)}>Reset</Control></div>
</>}
</Lesson>;
}
