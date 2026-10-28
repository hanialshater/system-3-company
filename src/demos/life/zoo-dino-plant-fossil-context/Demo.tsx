"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type LessonData = {question:string; options:string[]; answer:number; why:string; caption:string; leftDescription:string};
const d:LessonData = {
  "question": "A hypothetical deposit contains a dinosaur bone and plant fossils from the same layer. What can the plants help investigate?",
  "options": [
    "Vegetation associated with that deposit",
    "The exact color of the dinosaur",
    "Every behavior of the animal"
  ],
  "answer": 0,
  "why": "The bone and plant impression appear in the same illustrated layer. Plant fossils can help investigate past vegetation, while transport, mixing and dating must be checked before treating the deposit as a snapshot of a living habitat.",
  "caption": "Hypothetical layer; association needs checking",
  "leftDescription": "First side: Plant impression. Second side hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both sides of the schematic." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg className="stage-svg" viewBox="0 0 340 180" role="img" aria-label={step===0?"Evidence hidden until inspection":step===1?d.leftDescription:d.why}>
 {step>=1&&<g><rect x="25" y="52" width="290" height="75" fill="#b99c76"/><path d="M50 92 C70 68 90 68 113 92 C94 113 70 114 50 92Z M52 92 H109" stroke="#674d38" strokeWidth="3" fill="none"/><text x="80" y="158" fill="var(--fg)" fontSize="12" textAnchor="middle">Plant impression</text></g>}
 {step>=2&&<g><rect x="205" y="52" width="110" height="75" fill="#b99c76"/><path d="M220 91 Q232 78 240 87 L280 98 Q290 90 300 102 M240 87 L280 98" stroke="#e5d7b9" strokeWidth="6" fill="none" strokeLinecap="round"/><text x="260" y="158" fill="var(--fg)" fontSize="12" textAnchor="middle">Animal bone</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
