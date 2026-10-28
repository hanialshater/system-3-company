"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Data={question:string;options:string[];answer:number;why:string;caption:string;firstDescription:string};
const d:Data={
  "question": "In this simplified comparison, which mouthpart reaches the liquid inside a flower?",
  "options": [
    "The antenna",
    "The wing edge",
    "The extended proboscis"
  ],
  "answer": 2,
  "why": "The second butterfly has a long proboscis extending into the flower. The first shows it coiled near the head. The diagram is schematic and does not represent every butterfly species or food source.",
  "caption": "Schematic nectar-feeding butterfly",
  "firstDescription": "First state: Coiled tube. Second state is hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both illustrated states." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 180" className="stage-svg" role="img" aria-label={step===0?"The illustrations are hidden until inspection.":step===1?d.firstDescription:d.why}>
 {step>=1&&<g><ellipse cx="83" cy="88" rx="11" ry="35" fill="#977c63"/><path d="M78 78 C39 27 26 85 71 101 M88 78 C127 27 140 85 95 101" fill="#dc9d67" stroke="var(--muted)" strokeWidth="2"/><circle cx="83" cy="57" r="8" fill="#977c63"/><path d="M91 59 q20 6 10 16 q-8 8 -12 -1 q-3 -6 5 -8" stroke="var(--warn)" strokeWidth="3" fill="none"/><text x="82" y="151" textAnchor="middle" fill="var(--fg)" fontSize="12">Coiled tube</text></g>}
 {step>=2&&<g><ellipse cx="237" cy="82" rx="9" ry="27" fill="#977c63"/><path d="M231 78 C203 32 195 75 226 94 M243 78 C270 32 279 75 248 94" fill="#dc9d67" stroke="var(--muted)" strokeWidth="2"/><circle cx="237" cy="57" r="7" fill="#977c63"/><path d="M244 58 Q274 64 292 113" stroke="var(--warn)" strokeWidth="3" fill="none"/><path d="M282 111 Q293 92 305 111 L299 127 H287Z" fill="#c9a0b9" stroke="var(--muted)" strokeWidth="2"/><text x="262" y="151" textAnchor="middle" fill="var(--fg)" fontSize="12">Tube reaches flower</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
