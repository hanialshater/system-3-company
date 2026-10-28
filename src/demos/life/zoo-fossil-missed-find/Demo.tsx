"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"A survey finds no fossils in three sampled patches. What does that prove about all ten patches?",options:["All ten contain fossils","None of the ten contain fossils","Neither conclusion is proved"],answer:2}} exploreHint="Check the first sample, then inspect another part of the model." reveal={()=><p>The first three inspected patches contained no fossil in this toy landscape. The next sample found one elsewhere. A lack of finds in a sample is evidence about that sample, not proof that every unsearched location lacks fossils.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 175" className="stage-svg" role="img" aria-label={step===2?"Ten patches: six inspected; the sixth contains one fossil. Four patches remain uninspected.":step===1?"Ten patches: three inspected and no fossil found.":"Ten uninspected patches in an illustrative landscape."}>
 {Array.from({length:10},(_,i)=>{const x=30+(i%5)*57,y=25+Math.floor(i/5)*60,seen=i<(step===0?0:step===1?3:6);return <g key={i}><rect x={x} y={y} width="48" height="48" rx="6" fill={seen?"#c9dec5":"var(--bg-2)"} stroke="var(--line)"/><text x={x+24} y={y+30} textAnchor="middle" fontSize="15" fill={seen?"#263137":"var(--fg)"}>{seen?(i===5?"●":"—"):"?"}</text></g>})}
 <text x="170" y="163" textAnchor="middle" fill="var(--fg)" fontSize="12">— no find · ● fossil · ? unsearched</text>
 </svg><Row><Control disabled={locked||step!==0} onClick={()=>setStep(1)}>Sample first 3</Control><Control disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Sample next 3</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>A constructed example, not field data</p></div>}
 </Lesson>;
}
