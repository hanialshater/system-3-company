"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Data={question:string;options:string[];answer:number;why:string;caption:string;firstDescription:string};
const d:Data={
  "question": "In the dragonfly life cycle, which illustrated stage lives underwater?",
  "options": [
    "The winged adult",
    "Both are shown flying",
    "The nymph"
  ],
  "answer": 2,
  "why": "The nymph is drawn below the water line, while the adult has wings above it. Dragonfly nymphs live in freshwater and adults are airborne; the drawing omits many details and does not depict a particular species.",
  "caption": "Schematic stages; not a single species",
  "firstDescription": "First state: Nymph underwater. Second state is hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both illustrated states." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 180" className="stage-svg" role="img" aria-label={step===0?"The illustrations are hidden until inspection.":step===1?d.firstDescription:d.why}>
 {step>=1&&<g><path d="M22 60 H140" stroke="var(--good)" strokeWidth="3"/><path d="M33 69 H128 V135 H33Z" fill="#9cc4d4" opacity=".3"/><ellipse cx="79" cy="104" rx="30" ry="17" fill="#9cab8c" stroke="var(--muted)" strokeWidth="2"/><path d="M60 98 L45 88 M60 104 L44 104 M60 110 L45 121 M98 98 L113 88 M98 104 L114 104 M98 110 L113 121" stroke="var(--muted)" strokeWidth="3"/><text x="80" y="160" textAnchor="middle" fill="var(--fg)" fontSize="12">Nymph underwater</text></g>}
 {step>=2&&<g><ellipse cx="259" cy="87" rx="7" ry="40" fill="#b6a575"/><path d="M256 72 C229 42 205 45 206 62 Q220 83 256 79 M262 72 C289 42 313 45 312 62 Q298 83 262 79 M255 83 C228 73 213 87 220 98 Q236 102 255 90 M263 83 C290 73 305 87 298 98 Q282 102 263 90" fill="#b7d8d5" stroke="var(--muted)" strokeWidth="2"/><text x="260" y="160" textAnchor="middle" fill="var(--fg)" fontSize="12">Winged adult</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
