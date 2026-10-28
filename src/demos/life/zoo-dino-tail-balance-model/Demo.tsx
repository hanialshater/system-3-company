"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type LessonData = {question:string; options:string[]; answer:number; why:string; caption:string; leftDescription:string};
const d:LessonData = {
  "question": "In this toy balance, one weight sits two units to the left of a pivot. Where can an equal weight balance it?",
  "options": [
    "Two units to the right",
    "One unit to the right",
    "At the pivot"
  ],
  "answer": 0,
  "why": "The equal weights lie the same distance on opposite sides of the pivot in the balanced toy case. This is a lever illustration, not a measurement of dinosaur posture, muscle activity or balance.",
  "caption": "Toy lever; not dinosaur force measurements",
  "leftDescription": "First side: One weight. Second side hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both sides of the schematic." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg className="stage-svg" viewBox="0 0 340 180" role="img" aria-label={step===0?"Evidence hidden until inspection":step===1?d.leftDescription:d.why}>
 {step>=1&&<g><path d="M30 105 H130 M80 105 V125" stroke="var(--muted)" strokeWidth="4"/><circle cx="40" cy="91" r="13" fill="var(--warn)"/><text x="80" y="158" fill="var(--fg)" fontSize="12" textAnchor="middle">One weight</text></g>}
 {step>=2&&<g><path d="M210 105 H310 M260 105 V125" stroke="var(--muted)" strokeWidth="4"/><circle cx="220" cy="91" r="13" fill="var(--warn)"/><circle cx="300" cy="91" r="13" fill="var(--good)"/><text x="260" y="158" fill="var(--fg)" fontSize="12" textAnchor="middle">Equal distances</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
