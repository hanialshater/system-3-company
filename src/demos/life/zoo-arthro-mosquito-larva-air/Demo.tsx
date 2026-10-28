"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Data={question:string;options:string[];answer:number;why:string;caption:string;firstDescription:string};
const d:Data={
  "question": "In the illustrated example, a mosquito larva uses a breathing tube at the water surface. Where does the tube connect?",
  "options": [
    "To a flower below the water",
    "To the bottom sediment",
    "To air above the water"
  ],
  "answer": 2,
  "why": "The larva hangs below the line marking the water surface, with its breathing tube reaching air above. Many mosquito larvae breathe at the surface, but respiratory structures and behavior vary across species.",
  "caption": "Schematic mosquito larva; species vary",
  "firstDescription": "First state: Larva at surface. Second state is hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both illustrated states." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 180" className="stage-svg" role="img" aria-label={step===0?"The illustrations are hidden until inspection.":step===1?d.firstDescription:d.why}>
 {step>=1&&<g><path d="M23 61 H137" stroke="var(--good)" strokeWidth="3"/><path d="M26 64 H134 V140 H26Z" fill="#89bacf" opacity=".25"/><path d="M74 70 Q60 90 78 101 Q96 112 83 128" stroke="#c7b78f" strokeWidth="12" fill="none" strokeLinecap="round"/><path d="M74 70 L78 60" stroke="var(--warn)" strokeWidth="4"/><text x="80" y="161" textAnchor="middle" fill="var(--fg)" fontSize="12">Larva at surface</text></g>}
 {step>=2&&<g><path d="M205 91 H315" stroke="var(--good)" strokeWidth="3"/><path d="M260 117 V68" stroke="var(--warn)" strokeWidth="7" strokeLinecap="round"/><path d="M273 72 V96 M268 79 L273 72 L278 79" stroke="var(--fg)" strokeWidth="2" fill="none"/><text x="260" y="53" textAnchor="middle" fill="var(--fg)" fontSize="12">Air</text><text x="260" y="154" textAnchor="middle" fill="var(--fg)" fontSize="12">Tube reaches air</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
