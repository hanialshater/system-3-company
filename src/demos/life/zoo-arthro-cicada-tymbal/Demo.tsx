"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Data={question:string;options:string[];answer:number;why:string;caption:string;firstDescription:string};
const d:Data={
  "question": "In the cicada schematic, which motion is associated with producing its call?",
  "options": [
    "Two forewings rub together",
    "A hind leg rubs against a wing",
    "A tymbal buckles and springs back"
  ],
  "answer": 2,
  "why": "The second panel shows a ribbed tymbal changing curvature, a simplified representation of the structure used in cicada sound production. Actual calls involve repeated movements and species-dependent anatomy; this is not an audio measurement.",
  "caption": "Tymbal motion schematic; no sound measured",
  "firstDescription": "First state: Ribbed tymbal. Second state is hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both illustrated states." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 180" className="stage-svg" role="img" aria-label={step===0?"The illustrations are hidden until inspection.":step===1?d.firstDescription:d.why}>
 {step>=1&&<g><ellipse cx="80" cy="92" rx="33" ry="49" fill="#ab9d78" stroke="var(--muted)" strokeWidth="2"/><path d="M53 69 Q23 53 27 93 Q41 107 58 96 M107 69 Q137 53 133 93 Q119 107 102 96" fill="#b6c7bd" opacity=".75" stroke="var(--muted)" strokeWidth="2"/><path d="M54 88 Q60 80 65 88 M54 98 Q60 90 65 98 M95 88 Q100 80 106 88 M95 98 Q100 90 106 98" stroke="var(--warn)" strokeWidth="3" fill="none"/><text x="80" y="163" textAnchor="middle" fill="var(--fg)" fontSize="12">Ribbed tymbal</text></g>}
 {step>=2&&<g><path d="M213 91 Q260 50 307 91" fill="none" stroke="var(--warn)" strokeWidth="5"/><path d="M213 112 Q260 145 307 112" fill="none" stroke="var(--good)" strokeWidth="5"/><path d="M260 94 V109 M254 103 L260 109 L266 103" stroke="var(--fg)" strokeWidth="2" fill="none"/><text x="260" y="163" textAnchor="middle" fill="var(--fg)" fontSize="12">Curvature changes</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
