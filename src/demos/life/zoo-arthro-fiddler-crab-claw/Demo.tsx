"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Data={question:string;options:string[];answer:number;why:string;caption:string;firstDescription:string};
const d:Data={
  "question": "In this illustrated male fiddler crab, what action is shown with the enlarged claw?",
  "options": [
    "Holding the claw as a feeding filter",
    "Digging in the sediment",
    "A display movement"
  ],
  "answer": 2,
  "why": "The diagram shows a male fiddler crab with one enlarged claw and a raised-claw display. Such displays can communicate to other crabs; the drawing does not establish a specific recipient or behavioral outcome.",
  "caption": "Schematic male; species and context matter",
  "firstDescription": "First state: Enlarged claw. Second state is hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both illustrated states." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 180" className="stage-svg" role="img" aria-label={step===0?"The illustrations are hidden until inspection.":step===1?d.firstDescription:d.why}>
 {step>=1&&<g><ellipse cx="80" cy="104" rx="32" ry="19" fill="#bd9a7f" stroke="var(--muted)" strokeWidth="2"/><circle cx="68" cy="79" r="5" fill="var(--fg)"/><circle cx="92" cy="79" r="5" fill="var(--fg)"/><path d="M52 103 L35 92 M53 112 L36 123 M108 103 L122 92 M108 112 L123 123" stroke="var(--muted)" strokeWidth="3"/><path d="M110 96 Q133 83 137 104 Q127 118 113 108Z" fill="#d7b59b" stroke="var(--muted)" strokeWidth="2"/><text x="80" y="158" textAnchor="middle" fill="var(--fg)" fontSize="12">Enlarged claw</text></g>}
 {step>=2&&<g><ellipse cx="257" cy="111" rx="30" ry="17" fill="#bd9a7f" stroke="var(--muted)" strokeWidth="2"/><path d="M280 99 Q293 63 310 61 Q320 78 294 99Z" fill="#d7b59b" stroke="var(--muted)" strokeWidth="2"/><path d="M302 54 L308 42 M310 47 L308 42 L303 46" stroke="var(--good)" strokeWidth="3" fill="none"/><text x="260" y="158" textAnchor="middle" fill="var(--fg)" fontSize="12">Claw raised</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
