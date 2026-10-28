"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Data={question:string;options:string[];answer:number;why:string;caption:string;firstDescription:string};
const d:Data={
  "question": "In this schematic paper-wasp example, what material forms the nest walls?",
  "options": [
    "Chewed plant fibers",
    "Solid stone collected in a beak",
    "A silk shell spun by a spider"
  ],
  "answer": 0,
  "why": "The first scene shows a wasp gathering plant fibers; the second shows the fibers forming paper-like nest cells. Paper-wasp nest construction varies by species, and this drawing is not a record of an observed nest.",
  "caption": "Schematic wasp nest",
  "firstDescription": "First state: Plant fibers. Second state is hidden."
};
export default function Demo({slug}:{slug:string}){
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:d.question,options:d.options,answer:d.answer}} exploreHint="Inspect both illustrated states." reveal={()=><p>{d.why}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 180" className="stage-svg" role="img" aria-label={step===0?"The illustrations are hidden until inspection.":step===1?d.firstDescription:d.why}>
 {step>=1&&<g><path d="M27 126 L134 63 M40 134 L140 77" stroke="#b69870" strokeWidth="5"/><circle cx="55" cy="78" r="7" fill="#9f8971" stroke="var(--muted)" strokeWidth="2"/><ellipse cx="74" cy="78" rx="12" ry="9" fill="#d6b66f" stroke="var(--muted)" strokeWidth="2"/><path d="M85 76 H91" stroke="var(--muted)" strokeWidth="3"/><ellipse cx="104" cy="78" rx="13" ry="10" fill="#d6b66f" stroke="var(--muted)" strokeWidth="2"/><path d="M98 70 V86 M106 69 V87 M112 71 V85 M65 86 L59 95 M73 87 L68 97 M81 86 L80 96" stroke="#665745" strokeWidth="2" fill="none"/><path d="M75 67 Q60 42 52 60 M83 67 Q98 42 106 60" fill="#b7d8d5" stroke="var(--muted)" strokeWidth="2"/><text x="80" y="159" textAnchor="middle" fill="var(--fg)" fontSize="12">Plant fibers</text></g>}
 {step>=2&&<g><path d="M215 71 L236 58 L257 71 V96 L236 109 L215 96Z M257 71 L278 58 L299 71 V96 L278 109 L257 96Z M236 109 L257 96 L278 109 V134 L257 147 L236 134Z" fill="var(--bg-2)" stroke="#d2c0a1" strokeWidth="5"/><text x="260" y="167" textAnchor="middle" fill="var(--fg)" fontSize="12">Paper-like cells</text></g>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect first</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact()}}>Inspect second</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>{d.caption}</p></div>}
 </Lesson>;
}
