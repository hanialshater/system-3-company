"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type LessonData = {question:string; options:string[]; answer:number; why:string; caption:string; leftDescription:string};
const d:LessonData = {
  "question": "A schematic jaw shows a worn tooth with a new tooth forming below it. Which observation suggests replacement?",
  "options": [
    "The color chosen for the drawing",
    "The new tooth beneath the worn one",
    "The worn surface alone"
  ],
  "answer": 1,
  "why": "The worn top can show contact, but the developing tooth beneath it is the clue to replacement in this schematic. Actual fossil interpretation depends on the preserved specimen and its context.",
  "caption": "Schematic jaw; not a particular fossil",
  "leftDescription": "First side: Worn surface. Second side hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both sides of the schematic." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg className="stage-svg" viewBox="0 0 340 180" role="img" aria-label={step===0?"Evidence hidden until inspection":step===1?d.leftDescription:d.why}>
 {step>=1&&<g><path d="M35 128 Q80 150 130 128 V93 Q80 109 35 93Z" fill="#b99578" stroke="var(--muted)" strokeWidth="2"/><path d="M65 95 L72 53 L91 56 L96 96Z" fill="#e7d8b6" stroke="var(--muted)" strokeWidth="2"/><path d="M72 53 L91 56" stroke="var(--warn)" strokeWidth="5"/><text x="80" y="166" fill="var(--fg)" fontSize="12" textAnchor="middle">Worn surface</text></g>}
 {step>=2&&<g><path d="M210 128 Q260 150 310 128 V93 Q260 109 210 93Z" fill="#b99578" stroke="var(--muted)" strokeWidth="2"/><path d="M247 96 L255 58 L274 60 L280 96Z" fill="#e7d8b6" stroke="var(--muted)" strokeWidth="2"/><path d="M250 125 L258 104 L270 105 L275 126Z" fill="var(--good)" stroke="var(--muted)" strokeWidth="2"/><text x="260" y="166" fill="var(--fg)" fontSize="12" textAnchor="middle">Tooth beneath</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
