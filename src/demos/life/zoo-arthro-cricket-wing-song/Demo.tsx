"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Data={question:string;options:string[];answer:number;why:string;caption:string;firstDescription:string};
const d:Data={
  "question": "In the cricket example, which surfaces are moved against each other to produce the illustrated call?",
  "options": [
    "Both hind legs against each other",
    "Specialized parts of the forewings",
    "A hind leg and a wing"
  ],
  "answer": 1,
  "why": "The cricket scene highlights forewings, and the second panel shows one wing edge moving across a textured region on the other. Many crickets use wing structures this way; the toy drawing does not represent a specific species or frequency.",
  "caption": "Schematic cricket; no pitch or volume measured",
  "firstDescription": "First state: Forewings. Second state is hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both illustrated states." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 180" className="stage-svg" role="img" aria-label={step===0?"The illustrations are hidden until inspection.":step===1?d.firstDescription:d.why}>
 {step>=1&&<g><ellipse cx="80" cy="95" rx="31" ry="22" fill="#b09d77" stroke="var(--muted)" strokeWidth="2"/><path d="M58 89 Q80 67 102 89 L93 107 H67Z" fill="#c8b78b" stroke="var(--muted)" strokeWidth="2"/><path d="M58 100 L35 118 M56 94 L33 96 M56 84 L35 64 M102 100 L125 118 M104 94 L127 96 M104 84 L125 64" stroke="var(--muted)" strokeWidth="3"/><path d="M70 88 L89 88" stroke="var(--warn)" strokeWidth="4"/><text x="80" y="160" textAnchor="middle" fill="var(--fg)" fontSize="12">Forewings</text></g>}
 {step>=2&&<g><path d="M214 72 Q259 46 307 72 M214 107 Q259 82 307 107" fill="none" stroke="var(--muted)" strokeWidth="7"/><path d="M237 79 L242 71 M247 77 L252 69 M257 75 L262 67 M267 75 L272 67" stroke="var(--warn)" strokeWidth="3"/><path d="M240 122 H286 M279 116 L286 122 L279 128" stroke="var(--good)" strokeWidth="3" fill="none"/><text x="260" y="160" textAnchor="middle" fill="var(--fg)" fontSize="12">Wing surfaces move</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
