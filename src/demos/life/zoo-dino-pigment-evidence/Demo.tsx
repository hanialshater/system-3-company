"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type LessonData = {question:string; options:string[]; answer:number; why:string; caption:string; leftDescription:string};
const d:LessonData = {
  "question": "A fossil preserves structures interpreted as pigment-bearing organelles. What can this evidence do for a color reconstruction?",
  "options": [
    "Prove the exact appearance of every body part",
    "Show the entire animal in a color photograph",
    "Constrain some possibilities, subject to analysis"
  ],
  "answer": 2,
  "why": "In this schematic, the dark marks stand for preserved structures being compared with a reference. Such evidence can constrain some color hypotheses, but preservation and interpretation limit what is known about the whole animal.",
  "caption": "Schematic; inference depends on preservation",
  "leftDescription": "First side: Preserved structures. Second side hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both sides of the schematic." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg className="stage-svg" viewBox="0 0 340 180" role="img" aria-label={step===0?"Evidence hidden until inspection":step===1?d.leftDescription:d.why}>
 {step>=1&&<g><path d="M36 112 Q82 32 132 112" stroke="var(--muted)" strokeWidth="3" fill="#bfc8bb"/><circle cx="72" cy="91" r="5" fill="#342c2a"/><circle cx="85" cy="80" r="5" fill="#342c2a"/><circle cx="97" cy="90" r="5" fill="#342c2a"/><text x="80" y="157" fill="var(--fg)" fontSize="12" textAnchor="middle">Preserved structures</text></g>}
 {step>=2&&<g><rect x="203" y="52" width="114" height="74" rx="12" fill="var(--bg-2)" stroke="var(--muted)" strokeWidth="2"/><circle cx="230" cy="88" r="5" fill="var(--warn)"/><circle cx="246" cy="88" r="5" fill="var(--warn)"/><text x="280" y="94" fill="var(--fg)" fontSize="20">?</text><text x="260" y="157" fill="var(--fg)" fontSize="12" textAnchor="middle">Reference comparison</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
