"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type LessonData = {question:string; options:string[]; answer:number; why:string; caption:string; leftDescription:string};
const d:LessonData = {
  "question": "In this toy jaw model, the lower jaw rotates around one fixed pivot. Which motion does the model allow?",
  "options": [
    "The lower jaw vanishing",
    "Opening around the pivot",
    "Moving freely without the pivot"
  ],
  "answer": 1,
  "why": "The second picture shows the lower bar rotating around the same marked pivot. A real jaw can be more complex; fossils and joint geometry help constrain possible motion but do not show every soft tissue detail.",
  "caption": "Toy hinge; real jaw anatomy is more complex",
  "leftDescription": "First side: Initial angle. Second side hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both sides of the schematic." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg className="stage-svg" viewBox="0 0 340 180" role="img" aria-label={step===0?"Evidence hidden until inspection":step===1?d.leftDescription:d.why}>
 {step>=1&&<g><path d="M35 90 L130 72 M35 90 L130 106" stroke="#d8c8ab" strokeWidth="7" strokeLinecap="round"/><circle cx="35" cy="90" r="8" fill="var(--warn)"/><text x="80" y="155" fill="var(--fg)" fontSize="12" textAnchor="middle">Initial angle</text></g>}
 {step>=2&&<g><path d="M215 90 L310 72 M215 90 L298 140" stroke="#d8c8ab" strokeWidth="7" strokeLinecap="round"/><circle cx="215" cy="90" r="8" fill="var(--warn)"/><text x="260" y="165" fill="var(--fg)" fontSize="12" textAnchor="middle">Same pivot</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
