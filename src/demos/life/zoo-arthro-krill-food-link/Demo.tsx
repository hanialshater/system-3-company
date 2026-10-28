"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Data={question:string;options:string[];answer:number;why:string;caption:string;firstDescription:string};
const d:Data={
  "question": "In this simplified Antarctic food chain, which organism links microscopic algae to the whale?",
  "options": [
    "The whale itself",
    "The surrounding water",
    "Krill"
  ],
  "answer": 2,
  "why": "The arrows connect microscopic algae to krill and krill to a whale in this stated example. Real food webs contain many other feeding relationships; not every whale eats krill.",
  "caption": "Simplified Antarctic chain; not a complete web",
  "firstDescription": "First state: Microscopic algae. Second state is hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both illustrated states." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 180" className="stage-svg" role="img" aria-label={step===0?"The illustrations are hidden until inspection.":step===1?d.firstDescription:d.why}>
 {step>=1&&<g><circle cx="51" cy="91" r="10" fill="#a7c891"/><circle cx="77" cy="72" r="9" fill="#a7c891"/><circle cx="104" cy="95" r="11" fill="#a7c891"/><path d="M51 81 V101 M41 91 H61 M77 63 V81 M68 72 H86 M104 84 V106 M93 95 H115" stroke="#50775a" strokeWidth="2"/><text x="80" y="158" textAnchor="middle" fill="var(--fg)" fontSize="12">Microscopic algae</text></g>}
 {step>=2&&<g><path d="M142 96 H181 M176 91 L181 96 L176 101" stroke="var(--good)" strokeWidth="2" fill="none"/><path d="M184 96 Q200 78 218 94 L227 106 L215 109 Q194 113 184 96Z" fill="#d5a18a" stroke="var(--muted)" strokeWidth="2"/><path d="M190 105 L186 113 M198 108 L195 116 M207 108 L204 116 M185 94 L175 85" stroke="var(--muted)" strokeWidth="2"/><path d="M227 99 H241 M236 94 L241 99 L236 104" stroke="var(--good)" strokeWidth="2" fill="none"/><path d="M250 107 Q268 73 304 87 Q319 93 318 110 Q299 125 267 119Z" fill="#9fbfcf" stroke="var(--muted)" strokeWidth="2"/><path d="M305 91 L320 80 M305 110 L320 121" stroke="#9fbfcf" strokeWidth="5"/><text x="205" y="158" textAnchor="middle" fill="var(--fg)" fontSize="12">Krill</text><text x="282" y="158" textAnchor="middle" fill="var(--fg)" fontSize="12">Whale</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
