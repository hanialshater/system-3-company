"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Data={question:string;options:string[];answer:number;why:string;caption:string;firstDescription:string};
const d:Data={
  "question": "In a toy model with no external horizontal forces, a freely swimming shrimp pushes water forward. Which way does its body move?",
  "options": [
    "Backward",
    "Forward with the pushed water",
    "It stays motionless while water moves"
  ],
  "answer": 0,
  "why": "The second panel marks water pushed one way and the shrimp moving the opposite way. Many shrimp use rapid abdominal flexion for an escape response; the diagram is schematic and contains no measured speed.",
  "caption": "Schematic motion; no speed is measured",
  "firstDescription": "First state: Before flexion. Second state is hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both illustrated states." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 180" className="stage-svg" role="img" aria-label={step===0?"The illustrations are hidden until inspection.":step===1?d.firstDescription:d.why}>
 {step>=1&&<g><path d="M30 93 Q58 58 110 84 Q127 92 128 109 Q110 103 99 109 Q71 121 42 105Z" fill="#daa990" stroke="var(--muted)" strokeWidth="2"/><path d="M110 84 L132 70 M110 94 L138 91 M40 94 L27 77 M40 99 L24 110 M55 106 L52 118 M68 109 L65 121 M81 109 L78 121 M94 108 L91 120" stroke="var(--muted)" strokeWidth="3"/><text x="80" y="158" textAnchor="middle" fill="var(--fg)" fontSize="12">Before flexion</text></g>}
 {step>=2&&<g><path d="M209 83 Q240 57 278 82 Q298 101 281 122 Q269 134 252 124" fill="none" stroke="#daa990" strokeWidth="12" strokeLinecap="round"/><path d="M214 62 H184 M191 56 L184 62 L191 68" stroke="var(--good)" strokeWidth="3" fill="none"/><path d="M278 144 H310 M303 138 L310 144 L303 150" stroke="var(--warn)" strokeWidth="3" fill="none"/><text x="203" y="49" fill="var(--fg)" fontSize="11">Shrimp</text><text x="286" y="164" fill="var(--fg)" fontSize="11">Water</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
