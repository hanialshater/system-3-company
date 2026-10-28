"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"On this simplified family tree, are pterosaurs inside the dinosaur branch?",options:["Yes, inside the dinosaur branch", "No, on a neighboring branch", "The tree cannot show that"],answer:1}} exploreHint="Trace the branches from their shared ancestor." reveal={()=><p>The pterosaur branch and the dinosaur branch share an earlier ancestor. The pterosaur branch lies outside the highlighted dinosaur branch. Flying does not by itself make an animal a dinosaur.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A simplified tree places crocodilians on one branch and pterosaurs and dinosaurs on two neighboring branches.":"The pterosaur branch and the dinosaur branch share an earlier ancestor. The pterosaur branch lies outside the highlighted dinosaur branch. Flying does not by itself make an animal a dinosaur."}>
 <text x="215" y="48" fill="var(--fg)" fontSize="13">Crocodilians</text><text x="215" y="103" fill="var(--fg)" fontSize="13">Pterosaurs</text><text x="215" y="153" fill="var(--fg)" fontSize="13">Dinosaurs</text>
 {step>=1&&<path d="M20 110 H65 M65 43 V150 M65 43 H205 M65 150 H130 M130 98 V150 M130 98 H205 M130 150 H205" fill="none" stroke="var(--fg)" strokeWidth="3"/>}
 {step>=2&&<><path d="M130 150 H205" fill="none" stroke="#43a083" strokeWidth="6"/><text x="130" y="178" textAnchor="middle" fill="var(--fg)" fontSize="13">Dinosaur branch</text></>}
 </svg><Row><Control disabled={locked||step!==0} onClick={()=>setStep(1)}>Trace the tree</Control><Control disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Mark dinosaurs</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Schematic; example assumptions stated</p></div>}
 </Lesson>;
}
