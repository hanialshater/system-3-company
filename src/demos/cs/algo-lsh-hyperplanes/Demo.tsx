"use client";
import {useState} from "react";
import {Lesson} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {hash,vectors} from "./model";
import s from "./styles.module.css";
export default function Demo({slug}:{slug:string}){
const [shown,setShown]=useState(false),[contrast,setContrast]=useState(false),[seenContrast,setSeenContrast]=useState(false),[theory,setTheory]=useState(false);const result=hash(contrast);const px=(x:number)=>220+x*14,py=(y:number)=>38-y*14;
const describeRows=(normal:boolean)=>hash(normal).rows.map(v=>`${v.id}: dot ${v.dot}, bit ${v.bit}`).join('; ');
const imageLabel=`Vectors, normal (${result.n.join(",")}), dividing hyperplane; equal x and y scales. Bit 1 iff n·v≥0; zero dot receives bit 1.${shown?` Current: ${describeRows(contrast)}.`:" Dot products and bits not yet computed."}${seenContrast?` Retained primary normal (1,0): ${describeRows(false)}. Retained contrast normal (0,1): ${describeRows(true)}.`:""}`;
return <Lesson slug={slug} predict={{"question": "n=(1,0); bit1 if n\u00b7v\u22650. a=(1,0), b=(1,1), c=(\u22121,1). Which shares a\u2019s bit?", "options": ["b only", "c only", "Both"], "answer": 0}} minInteractions={2} exploreHint="Compute the signs, then rotate the fixed normal." reveal={()=><div className={s.explanation}><p id="reveal-fixed">n=(1,0) gives bits 110: a and b collide. Rotating to (0,1) gives 111; zero dots receive bit 1. Collisions retain candidates, not guaranteed nearest matches.</p><p id="reveal-theorem">For nonzero vectors and rotationally symmetric Gaussian random normals, collision probability is 1−θ/π. These two fixed normals show no sampled frequency or per-normal guarantee.</p></div>}>
{({locked,interact})=><div className={s.root}>
<svg className={s.picture} viewBox="0 0 290 64" role="img" aria-label={imageLabel}>
 <line x1={contrast?183:220} x2={contrast?268:220} y1={contrast?38:3} y2={contrast?38:50} stroke="var(--domain)" strokeWidth="2" strokeDasharray="5 3"/>
 <line x1="220" y1="38" x2={contrast?220:233} y2={contrast?25:38} stroke="var(--muted)"/><text x={contrast?218:262} y={contrast?20:43}>n</text>
 {vectors.map(v=><g key={v.id}><line x1="220" y1="38" x2={px(v.v[0])} y2={py(v.v[1])} stroke={shown&&result.rows.find(r=>r.id===v.id)?.bit===1?"var(--good)":"var(--fg)"} strokeWidth="2"/><circle cx={px(v.v[0])} cy={py(v.v[1])} r="3" fill="var(--fg)"/><text x={px(v.v[0])+(v.id==="c"?-15:6)} y={py(v.v[1])+(v.id==="a"?4:-5)}>{v.id}</text></g>)}
 {shown?result.rows.map((v,i)=><text key={v.id} x="1" y={13+i*16}>{v.id}: dot {v.dot} → bit {v.bit}{seenContrast?` · x${hash().rows[i].bit}/y${hash(true).rows[i].bit}`:""}</text>):null}
 <text x="1" y="61">bit1 iff n·v≥0 · zero→1</text><text x="227" y="61">n=({result.n.join(",")})</text>
</svg>
{theory?<div className={s.proof} aria-live="polite">Theory probabilities: 0°/90°/180° → 1/.5/0</div>:null}
<div className={s.controls}><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Hash</Control><Control disabled={locked||!shown||contrast} onClick={()=>{setContrast(true);if(!seenContrast){setSeenContrast(true);interact();}}}>Rotate n</Control><Control disabled={locked||!seenContrast||theory} onClick={()=>setTheory(true)}>Theory</Control><Control disabled={locked||!contrast} onClick={()=>setContrast(false)}>Reset</Control></div>
</div>}
</Lesson>;
}
