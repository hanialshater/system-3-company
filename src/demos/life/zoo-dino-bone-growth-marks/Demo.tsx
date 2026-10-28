"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"A fossil bone section shows repeated growth marks. What is a careful interpretation?",options:["They may help investigate growth history", "They always prove an exact age in years", "They prove the animal’s skin color"],answer:0}} exploreHint="Inspect the bone, then reveal the magnified section." reveal={()=><p>The schematic section shows growth marks in bone tissue. Such marks can inform studies of growth, but their timing and preservation need validation; counting marks alone is not automatically an exact age in years.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A schematic fossil bone is visible; its cross-section is hidden.":"The schematic section shows growth marks in bone tissue. Such marks can inform studies of growth, but their timing and preservation need validation; counting marks alone is not automatically an exact age in years."}>
 {step>=1&&<><path d="M33 66 Q20 52 18 68 Q8 83 29 86 L119 110 Q137 127 142 110 Q154 96 136 93 L47 68Z" fill="#d8c6a5" stroke="#7d6c52" strokeWidth="3"/><text x="78" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">Fossil bone</text></>}
 {step>=2&&<><path d="M145 94 L182 94" stroke="var(--fg)" strokeWidth="2"/><circle cx="245" cy="93" r="56" fill="#e7d7b9" stroke="#7d6c52" strokeWidth="3"/><circle cx="245" cy="93" r="43" fill="none" stroke="#a98765" strokeWidth="3"/><circle cx="245" cy="93" r="30" fill="none" stroke="#a98765" strokeWidth="3"/><circle cx="245" cy="93" r="17" fill="none" stroke="#a98765" strokeWidth="3"/><text x="245" y="169" textAnchor="middle" fill="var(--fg)" fontSize="13">Marks · schematic section</text></>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect the bone</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Reveal bone section</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Simplified schematic · not to scale</p></div>}
 </Lesson>;
}
