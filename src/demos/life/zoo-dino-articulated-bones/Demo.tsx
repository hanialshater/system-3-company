"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"Two schematic fossils preserve the same bones. In which are the bones still arranged together as they were in the body?",options:["The connected skeleton", "The separated bones", "Both preserve the same arrangement"],answer:0}} exploreHint="Compare the connected specimen with separated bones." reveal={()=><p>The connected specimen preserves bones together at their joints; the other shows separated bones. Articulation can provide positional evidence, but this drawing alone does not establish the cause or timing of separation.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A schematic skeleton preserves connected bones in their relative positions.":"The connected specimen preserves bones together at their joints; the other shows separated bones. Articulation can provide positional evidence, but this drawing alone does not establish the cause or timing of separation."}>
 {step>=1&&<><text x="90" y="30" textAnchor="middle" fill="var(--fg)" fontSize="13">Connected</text><path d="M45 110 L82 80 L115 95 L145 65" fill="none" stroke="#c5ab7f" strokeWidth="9" strokeLinecap="round"/><g fill="#f0deae" stroke="#7b6b55" strokeWidth="2"><circle cx="45" cy="110" r="7"/><circle cx="82" cy="80" r="7"/><circle cx="115" cy="95" r="7"/><circle cx="145" cy="65" r="7"/></g></>}
 {step>=2&&<><text x="252" y="30" textAnchor="middle" fill="var(--fg)" fontSize="13">Separated</text><g stroke="#c5ab7f" strokeWidth="9" strokeLinecap="round"><path d="M190 69 L220 80"/><path d="M235 120 L270 102"/><path d="M275 58 L298 75"/></g></>}
 </svg><Row><Control disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect connected</Control><Control disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Inspect separated</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Schematic; example assumptions stated</p></div>}
 </Lesson>;
}
