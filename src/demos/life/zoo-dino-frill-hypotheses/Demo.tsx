"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"A fossil preserves a dinosaur’s horns and frill. What does their shape alone establish about their exact function?",options:["It does not settle the function", "It proves a single defensive use", "It proves a particular courtship display"],answer:0}} exploreHint="Inspect the skull, then compare two possible explanations." reveal={()=><p>The schematic skull has horns and a frill. Defense and display are possible hypotheses, but the shape alone does not establish which function occurred, or whether a structure had more than one role. Each hypothesis needs additional evidence.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A schematic skull shows a frill and horns.":"The schematic skull has horns and a frill. Defense and display are possible hypotheses, but the shape alone does not establish which function occurred, or whether a structure had more than one role. Each hypothesis needs additional evidence."}>
 {step>=1&&<><path d="M100 72 Q70 27 130 36 Q175 36 187 71 L238 85 L267 106 L232 117 Q215 142 174 137 L130 125 Q100 120 100 72Z" fill="#bcaa8d" stroke="#75674f" strokeWidth="3"/><path d="M186 70 L198 40 L207 76 M216 80 L235 52 L231 86 M258 94 L282 84 L265 104" fill="#e5d9bc" stroke="#75674f" strokeWidth="2"/><circle cx="211" cy="97" r="4" fill="#51483d"/><text x="170" y="27" textAnchor="middle" fill="var(--fg)" fontSize="13">Horns and frill · schematic</text></>}
 {step>=2&&<><text x="80" y="175" textAnchor="middle" fill="var(--fg)" fontSize="13">Defense?</text><text x="260" y="175" textAnchor="middle" fill="var(--fg)" fontSize="13">Display?</text></>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect the skull</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Compare hypotheses</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Simplified schematic · not to scale</p></div>}
 </Lesson>;
}
