"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Data={question:string;options:string[];answer:number;why:string;caption:string;firstDescription:string};
const d:Data={
  "question": "A spider attaches silk before moving away from a surface. In this example, what can the attached line provide?",
  "options": [
    "A silk case holding eggs",
    "A tether during movement",
    "A web for trapping prey"
  ],
  "answer": 1,
  "why": "The diagram shows a line attached to a surface and to the spider as it moves. Spiders can use draglines as safety lines, though silk use varies among species and situations; the example does not depict a measured fall.",
  "caption": "Illustrative dragline; not a measured fall",
  "firstDescription": "First state: Attach silk. Second state is hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both illustrated states." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 180" className="stage-svg" role="img" aria-label={step===0?"The illustrations are hidden until inspection.":step===1?d.firstDescription:d.why}>
 {step>=1&&<g><path d="M25 130 H135" stroke="var(--muted)" strokeWidth="5"/><circle cx="75" cy="110" r="15" fill="#c2a47e" stroke="var(--muted)" strokeWidth="2"/><circle cx="91" cy="108" r="7" fill="#c2a47e"/><path d="M65 102 L48 91 M63 107 L44 103 M63 113 L44 114 M65 119 L48 129 M84 102 L102 91 M86 107 L105 103 M86 113 L105 114 M84 119 L102 129" stroke="var(--muted)" strokeWidth="3"/><path d="M75 124 V130" stroke="var(--warn)" strokeWidth="3"/><text x="80" y="160" textAnchor="middle" fill="var(--fg)" fontSize="12">Attach silk</text></g>}
 {step>=2&&<g><path d="M204 57 H230 V131" stroke="var(--muted)" strokeWidth="4" fill="none"/><path d="M230 64 Q252 77 270 110" stroke="var(--warn)" strokeWidth="3" fill="none"/><circle cx="273" cy="114" r="14" fill="#c2a47e" stroke="var(--muted)" strokeWidth="2"/><path d="M263 106 L249 95 M262 111 L247 107 M262 117 L247 119 M264 123 L249 133 M282 106 L297 95 M284 111 L299 107 M284 117 L299 119 M282 123 L297 133" stroke="var(--muted)" strokeWidth="3"/><text x="260" y="160" textAnchor="middle" fill="var(--fg)" fontSize="12">Attached line</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
