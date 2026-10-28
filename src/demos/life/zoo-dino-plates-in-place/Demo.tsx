"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type LessonData = {question:string; options:string[]; answer:number; why:string; caption:string; leftDescription:string};
const d:LessonData = {
  "question": "In a toy fossil comparison, which arrangement gives a clearer clue about where a plate belonged?",
  "options": [
    "Both give equally specific placement evidence",
    "A plate preserved beside connected bones",
    "A lone plate without nearby bones"
  ],
  "answer": 1,
  "why": "The connected bones and neighboring plate remain together in the first schematic, providing more context for placement. An isolated plate can still be informative, but its position is not directly preserved in that example.",
  "caption": "Toy fossil contexts; not a specimen record",
  "leftDescription": "First side: Associated parts. Second side hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both sides of the schematic." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg className="stage-svg" viewBox="0 0 340 180" role="img" aria-label={step===0?"Evidence hidden until inspection":step===1?d.leftDescription:d.why}>
 {step>=1&&<g><path d="M25 108 H135 M38 108 V83 M57 108 V84 M76 108 V84 M95 108 V84 M114 108 V84" stroke="#dbcaa9" strokeWidth="5"/><path d="M67 78 L80 48 L94 78Z" fill="#d0a88b" stroke="var(--muted)" strokeWidth="2"/><text x="80" y="155" fill="var(--fg)" fontSize="12" textAnchor="middle">Associated parts</text></g>}
 {step>=2&&<g><path d="M246 120 L260 62 L276 120Z" fill="#d0a88b" stroke="var(--muted)" strokeWidth="2"/><text x="260" y="155" fill="var(--fg)" fontSize="12" textAnchor="middle">Isolated plate</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
