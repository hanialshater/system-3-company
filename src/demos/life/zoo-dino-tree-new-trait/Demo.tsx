"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type LessonData = {question:string; options:string[]; answer:number; why:string; caption:string; leftDescription:string};
const d:LessonData = {
  "question": "In a toy tree, a new feature arose once and was not lost. B and C have it; A does not. Which grouping is supported?",
  "options": [
    "Grouping B with C",
    "Grouping A with B from this feature alone",
    "Treating all three as identical"
  ],
  "answer": 0,
  "why": "The first view leaves the feature unknown; the second marks it for B and C. Under the stated single-origin and no-loss assumptions, this feature supports their grouping. Real trees require many traits and consideration of competing explanations.",
  "caption": "Toy characters, not a real specimen analysis",
  "leftDescription": "First side: A    B    C; ?  ?  ?; Trait unknown. Second side hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both sides of the schematic." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg className="stage-svg" viewBox="0 0 340 180" role="img" aria-label={step===0?"Evidence hidden until inspection":step===1?d.leftDescription:d.why}>
 {step>=1&&<g><text x="80" y="54" fill="var(--fg)" fontSize="14" textAnchor="middle">A    B    C</text><text x="80" y="108" fill="var(--muted)" fontSize="27" textAnchor="middle">?  ?  ?</text><text x="80" y="157" fill="var(--fg)" fontSize="12" textAnchor="middle">Trait unknown</text></g>}
 {step>=2&&<g><text x="260" y="54" fill="var(--fg)" fontSize="14" textAnchor="middle">A    B    C</text><text x="260" y="108" fill="var(--good)" fontSize="24" textAnchor="middle">−  +  +</text><text x="260" y="157" fill="var(--fg)" fontSize="12" textAnchor="middle">Trait observed</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
