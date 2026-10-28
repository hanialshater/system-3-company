"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type LessonData = {question:string; options:string[]; answer:number; why:string; caption:string; leftDescription:string};
const d:LessonData = {
  "question": "Two animals have hollow bones in this comparison. Can that feature alone prove both animals flew?",
  "options": [
    "Yes: a hollow bone proves flight",
    "Yes: every hollow bone is a wing",
    "No: the feature alone does not prove flight"
  ],
  "answer": 2,
  "why": "Both schematic bones have an empty interior, but the diagram supplies no evidence that either animal flew. Hollow bones occur in flying birds and some non-flying dinosaurs, so the feature alone cannot establish flight.",
  "caption": "Both sections schematic; no flight observation",
  "leftDescription": "First side: Bird bone section. Second side hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both sides of the schematic." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg className="stage-svg" viewBox="0 0 340 180" role="img" aria-label={step===0?"Evidence hidden until inspection":step===1?d.leftDescription:d.why}>
 {step>=1&&<g><circle cx="80" cy="86" r="42" fill="#d6c7a8" stroke="var(--muted)" strokeWidth="3"/><circle cx="80" cy="86" r="20" fill="var(--bg-2)" stroke="var(--muted)" strokeWidth="2"/><text x="80" y="148" textAnchor="middle" fill="var(--fg)" fontSize="12">Bird bone section</text></g>}
 {step>=2&&<g><circle cx="260" cy="86" r="42" fill="#d6c7a8" stroke="var(--muted)" strokeWidth="3"/><circle cx="260" cy="86" r="20" fill="var(--bg-2)" stroke="var(--muted)" strokeWidth="2"/><text x="260" y="148" textAnchor="middle" fill="var(--fg)" fontSize="12">Non-avian theropod</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
