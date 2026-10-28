"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"A typical adult insect has which combination of main body regions and legs?",options:["Three regions and six legs", "Two regions and eight legs", "Three regions and eight legs"],answer:0}} exploreHint="Inspect the body, then locate its legs." reveal={()=><p>The schematic has a head, thorax and abdomen, with three pairs of legs attached to the thorax. Typical adult insects have this basic body plan, though body parts and appendages can vary among insects.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A schematic insect body is divided into a head, a thorax and an abdomen; legs are not yet shown.":"The schematic has a head, thorax and abdomen, with three pairs of legs attached to the thorax. Typical adult insects have this basic body plan, though body parts and appendages can vary among insects."}>
 {step>=1&&<><circle cx="170" cy="43" r="22" fill="#d4ad74" stroke="#6f5b43" strokeWidth="2"/><ellipse cx="170" cy="90" rx="27" ry="30" fill="#b1c990" stroke="#596e4b" strokeWidth="2"/><ellipse cx="170" cy="145" rx="30" ry="27" fill="#d4ad74" stroke="#6f5b43" strokeWidth="2"/><text x="255" y="48" fill="var(--fg)" fontSize="12">Head</text><text x="255" y="94" fill="var(--fg)" fontSize="12">Thorax</text><text x="255" y="149" fill="var(--fg)" fontSize="12">Abdomen</text></>}
 {step>=2&&<><path d="M146 75 L105 53 M145 90 H100 M146 105 L105 127 M194 75 L228 53 M195 90 H238 M194 105 L228 127" fill="none" stroke="#6e6554" strokeWidth="5" strokeLinecap="round"/><text x="20" y="180" fill="var(--fg)" fontSize="12">Three pairs of legs</text></>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect the body</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Locate the legs</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Simplified schematic · not to scale</p></div>}
 </Lesson>;
}
