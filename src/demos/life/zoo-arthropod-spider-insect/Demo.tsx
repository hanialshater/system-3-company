"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"In the pictured adult examples, which animal has four pairs of legs?",options:["The spider", "The insect", "Both have four pairs"],answer:0}} exploreHint="Inspect the spider’s legs, then compare the insect." reveal={()=><p>The schematic spider has four pairs of legs; the insect has three pairs. Both are arthropods, but spiders are arachnids rather than insects. These simple drawings omit many anatomical details.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A schematic spider has eight legs; an insect has not yet been shown.":"The schematic spider has four pairs of legs; the insect has three pairs. Both are arthropods, but spiders are arachnids rather than insects. These simple drawings omit many anatomical details."}>
 {step>=1&&<><ellipse cx="90" cy="97" rx="28" ry="34" fill="#a98d79"/><circle cx="90" cy="57" r="18" fill="#a98d79"/><path d="M70 70 L35 45 M65 82 L25 72 M65 104 L25 110 M70 119 L35 145 M110 70 L145 45 M115 82 L155 72 M115 104 L155 110 M110 119 L145 145" stroke="#715b4f" strokeWidth="4"/><text x="90" y="178" textAnchor="middle" fill="var(--fg)" fontSize="13">Spider: 8 legs</text></>}
 {step>=2&&<><circle cx="250" cy="53" r="14" fill="#d1b682"/><ellipse cx="250" cy="82" rx="18" ry="19" fill="#abc38f"/><ellipse cx="250" cy="116" rx="22" ry="24" fill="#d1b682"/><path d="M234 69 L205 53 M232 84 H200 M234 98 L205 117 M266 69 L295 53 M268 84 H300 M266 98 L295 117" stroke="#715b4f" strokeWidth="4"/><text x="250" y="178" textAnchor="middle" fill="var(--fg)" fontSize="13">Insect: 6 legs</text></>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect spider</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Inspect insect</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Simplified schematic · not to scale</p></div>}
 </Lesson>;
}
