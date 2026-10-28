"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Data={question:string;options:string[];answer:number;why:string;caption:string;firstDescription:string};
const d:Data={
  "question": "In this illustrative life cycle, a caterpillar eats leaves. Which resource does the adult butterfly use in the example?",
  "options": [
    "Nectar",
    "The leaf surface",
    "A buried seed"
  ],
  "answer": 0,
  "why": "The caterpillar is shown against a leaf; the adult is shown with a mouthpart at a flower. This is a simplified example: diets differ among species and life stages, and not every adult butterfly feeds in the same way.",
  "caption": "Illustrative life-cycle example; diets vary",
  "firstDescription": "First state: Caterpillar: leaf. Second state is hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both illustrated states." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 180" className="stage-svg" role="img" aria-label={step===0?"The illustrations are hidden until inspection.":step===1?d.firstDescription:d.why}>
 {step>=1&&<g><path d="M27 119 Q80 48 135 119 Q80 143 27 119Z" fill="#91b99a" stroke="var(--muted)" strokeWidth="2"/><path d="M39 119 H124" stroke="#426b4c" strokeWidth="2"/><g fill="#d8bd79" stroke="var(--muted)" strokeWidth="1"><circle cx="55" cy="105" r="9"/><circle cx="72" cy="100" r="10"/><circle cx="91" cy="98" r="10"/><circle cx="108" cy="102" r="9"/></g><text x="80" y="160" textAnchor="middle" fill="var(--fg)" fontSize="12">Caterpillar: leaf</text></g>}
 {step>=2&&<g><ellipse cx="239" cy="78" rx="9" ry="27" fill="#977c63"/><path d="M233 74 C208 30 195 75 229 92 M245 74 C270 30 283 75 249 92" fill="#dc9d67" stroke="var(--muted)" strokeWidth="2"/><path d="M246 55 Q278 63 293 111" stroke="var(--warn)" strokeWidth="3" fill="none"/><path d="M282 111 Q293 92 305 111 L299 127 H287Z" fill="#c9a0b9" stroke="var(--muted)" strokeWidth="2"/><text x="262" y="160" textAnchor="middle" fill="var(--fg)" fontSize="12">Adult: nectar</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
