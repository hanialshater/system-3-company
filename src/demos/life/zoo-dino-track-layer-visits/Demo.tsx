"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type LessonData = {question:string; options:string[]; answer:number; why:string; caption:string; leftDescription:string};
const d:LessonData = {
  "question": "Two track-bearing surfaces are separated by a layer of sediment in an undisturbed toy stack. What does that separation suggest?",
  "options": [
    "The surfaces formed at different times",
    "Both tracks must be one simultaneous scene",
    "The tracks identify the exact individual"
  ],
  "answer": 0,
  "why": "The drawing places one track surface above another, with sediment in between. In the stipulated undisturbed stack, the surfaces record different moments. Further evidence is needed to identify the animals or the elapsed time.",
  "caption": "Toy undisturbed stack; time gap not measured",
  "leftDescription": "First side: Lower surface. Second side hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both sides of the schematic." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg className="stage-svg" viewBox="0 0 340 180" role="img" aria-label={step===0?"Evidence hidden until inspection":step===1?d.leftDescription:d.why}>
 {step>=1&&<g><rect x="25" y="73" width="110" height="30" fill="#b49c79"/><path d="M25 73 H135 M45 73 L41 63 M45 73 L49 63 M98 73 L94 63 M98 73 L102 63" stroke="var(--warn)" strokeWidth="4"/><text x="80" y="157" fill="var(--fg)" fontSize="12" textAnchor="middle">Lower surface</text></g>}
 {step>=2&&<g><rect x="205" y="60" width="110" height="60" fill="#b49c79"/><path d="M205 60 H315 M205 99 H315 M224 60 L220 52 M224 60 L228 52 M282 99 L278 91 M282 99 L286 91" stroke="var(--warn)" strokeWidth="4"/><text x="260" y="157" fill="var(--fg)" fontSize="12" textAnchor="middle">Two surfaces</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
