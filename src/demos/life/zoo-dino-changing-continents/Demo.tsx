"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type LessonData = {question:string; options:string[]; answer:number; why:string; caption:string; leftDescription:string};
const d:LessonData = {
  "question": "When comparing two fossil localities, why might researchers consider continental positions at the time rather than only today’s map?",
  "options": [
    "Today’s borders prove the animals crossed an ocean",
    "Maps alone establish the animals’ exact behavior",
    "Past land connections can change geographic hypotheses"
  ],
  "answer": 2,
  "why": "The toy maps show two land areas joined in one state and separated in another. Past geography can change hypotheses about possible connections; a map alone does not prove a route taken by a particular animal.",
  "caption": "Invented shapes; not an actual paleomap",
  "leftDescription": "First side: Toy past: joined. Second side hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both sides of the schematic." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg className="stage-svg" viewBox="0 0 340 180" role="img" aria-label={step===0?"Evidence hidden until inspection":step===1?d.leftDescription:d.why}>
 {step>=1&&<g><path d="M38 68 L75 50 L95 72 L88 110 L53 125 L35 98Z M96 72 L120 78 L125 110 L88 110Z" fill="#91b5a0" stroke="var(--muted)" strokeWidth="2"/><text x="80" y="158" fill="var(--fg)" fontSize="12" textAnchor="middle">Toy past: joined</text></g>}
 {step>=2&&<g><path d="M210 68 L240 50 L253 72 L246 110 L220 125 L208 98Z M270 72 L300 78 L303 110 L274 110Z" fill="#91b5a0" stroke="var(--muted)" strokeWidth="2"/><text x="260" y="158" fill="var(--fg)" fontSize="12" textAnchor="middle">Toy present: split</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
