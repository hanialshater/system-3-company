"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type LessonData = {question:string; options:string[]; answer:number; why:string; caption:string; leftDescription:string};
const d:LessonData = {
  "question": "In this comparison, which fossil gives more body features to compare with another animal?",
  "options": [
    "Both expose the same number of features",
    "The mostly complete skeleton",
    "A single isolated tooth"
  ],
  "answer": 1,
  "why": "The second schematic shows a skull, backbone, limbs and tail, while the first shows only a tooth. A fragment can still carry useful evidence, but this example exposes fewer structures for comparison.",
  "caption": "Schematics; not actual specimens",
  "leftDescription": "First side: Single tooth. Second side hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both sides of the schematic." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg className="stage-svg" viewBox="0 0 340 180" role="img" aria-label={step===0?"Evidence hidden until inspection":step===1?d.leftDescription:d.why}>
 {step>=1&&<g><path d="M60 120 Q55 95 80 50 Q100 93 101 120Z" fill="#e4d6b7" stroke="var(--muted)" strokeWidth="3"/><text x="80" y="158" fill="var(--fg)" fontSize="12" textAnchor="middle">Single tooth</text></g>}
 {step>=2&&<g><circle cx="225" cy="69" r="13" fill="none" stroke="#ddcaaa" strokeWidth="4"/><path d="M239 76 L272 93 L302 80 M254 86 L246 128 M273 93 L284 130 M245 86 L231 105" stroke="#ddcaaa" strokeWidth="5" fill="none" strokeLinecap="round"/><text x="260" y="158" fill="var(--fg)" fontSize="12" textAnchor="middle">More structures</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
