"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type LessonData = {question:string; options:string[]; answer:number; why:string; caption:string; leftDescription:string};
const d:LessonData = {
  "question": "A toy reconstruction keeps its assumed density fixed but increases the body volume from 2 to 3 cubic units. What happens to modeled mass?",
  "options": [
    "It stays the same",
    "It decreases",
    "It increases"
  ],
  "answer": 2,
  "why": "At a fixed density of 1 mass unit per cubic unit, the two stipulated volumes yield masses of 2 and 3 units. The shapes illustrate an assumption sensitivity, not the measured mass of a real dinosaur.",
  "caption": "Toy model: density = 1 mass unit / cubic unit",
  "leftDescription": "First side: 2; Volume: 2; Mass: 2. Second side hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both sides of the schematic." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg className="stage-svg" viewBox="0 0 340 180" role="img" aria-label={step===0?"Evidence hidden until inspection":step===1?d.leftDescription:d.why}>
 {step>=1&&<g><rect x="38" y="48" width="84" height="78" rx="14" fill="#92b6a6" stroke="var(--muted)" strokeWidth="3"/><text x="80" y="92" fill="#17241e" fontSize="17" textAnchor="middle">2</text><text x="80" y="151" fill="var(--fg)" fontSize="12" textAnchor="middle">Volume: 2</text><text x="80" y="169" fill="var(--fg)" fontSize="12" textAnchor="middle">Mass: 2</text></g>}
 {step>=2&&<g><rect x="210" y="48" width="100" height="92" rx="14" fill="#92b6a6" stroke="var(--muted)" strokeWidth="3"/><text x="260" y="99" fill="#17241e" fontSize="17" textAnchor="middle">3</text><text x="260" y="156" fill="var(--fg)" fontSize="12" textAnchor="middle">Volume: 3</text><text x="260" y="174" fill="var(--fg)" fontSize="12" textAnchor="middle">Mass: 3</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
