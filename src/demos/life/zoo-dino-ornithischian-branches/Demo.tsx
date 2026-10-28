"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type LessonData = {question:string; options:string[]; answer:number; why:string; caption:string; leftDescription:string};
const d:LessonData = {
  "question": "In this simplified family tree, are Stegosaurus and Triceratops both within Ornithischia?",
  "options": [
    "No: only Stegosaurus is in that group",
    "No: neither branch is in that group",
    "Yes: both branches are inside that group"
  ],
  "answer": 2,
  "why": "The highlighted branch splits toward both Stegosaurus and Triceratops. They are placed in Ornithischia, on different branches. The simplified tree does not show every dinosaur relationship.",
  "caption": "Tree simplified; branch lengths are not time",
  "leftDescription": "First side: Ornithischia. Second side hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both sides of the schematic." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg className="stage-svg" viewBox="0 0 340 180" role="img" aria-label={step===0?"Evidence hidden until inspection":step===1?d.leftDescription:d.why}>
 {step>=1&&<g><path d="M24 118 H78 V60 H142 M78 118 V148 H142" stroke="var(--muted)" strokeWidth="4" fill="none"/><text x="82" y="40" fill="var(--fg)" fontSize="12" textAnchor="middle">Ornithischia</text></g>}
 {step>=2&&<g><path d="M194 118 H220 V60 H250 M220 118 V148 H250" stroke="var(--good)" strokeWidth="5" fill="none"/><text x="253" y="64" fill="var(--fg)" fontSize="11">Stegosaurus</text><text x="253" y="152" fill="var(--fg)" fontSize="11">Triceratops</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
