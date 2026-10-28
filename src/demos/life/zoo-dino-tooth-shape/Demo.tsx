"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"A pointed tooth and a broad, worn tooth are found in two different theropod fossils. What can their different shapes support?",options:["A question about differences in feeding", "Proof of every meal each animal ate", "Proof they hunted together"],answer:0}} exploreHint="Inspect each modeled tooth and its shape." reveal={()=><p>The schematic contrasts a pointed tooth with a broad, worn edge. Tooth shape and wear can help scientists investigate feeding, but shape alone does not prove a complete diet or a behavior such as hunting together.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A schematic fossil jaw contains a pointed tooth; the second jaw is still hidden.":"The schematic contrasts a pointed tooth with a broad, worn edge. Tooth shape and wear can help scientists investigate feeding, but shape alone does not prove a complete diet or a behavior such as hunting together."}>
 {step>=1&&<><rect x="10" y="20" width="150" height="130" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><path d="M30 68 Q65 35 138 60 L135 100 Q70 118 30 86Z" fill="#d7c7a8" stroke="#806f57" strokeWidth="3"/><path d="M65 93 L75 68 L86 96 M97 98 L107 72 L118 96" fill="#f2e7cf" stroke="#806f57" strokeWidth="2"/><text x="85" y="172" textAnchor="middle" fill="var(--fg)" fontSize="13">Pointed tooth</text></>}
 {step>=2&&<><rect x="180" y="20" width="150" height="130" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><path d="M198 68 Q235 35 310 60 L305 100 Q242 118 198 86Z" fill="#d7c7a8" stroke="#806f57" strokeWidth="3"/><path d="M232 92 L236 73 H255 L259 95 M268 95 L271 76 H288 L292 95" fill="#f2e7cf" stroke="#806f57" strokeWidth="2"/><text x="255" y="172" textAnchor="middle" fill="var(--fg)" fontSize="13">Broad worn edge</text></>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect tooth A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Inspect tooth B</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Simplified schematic · not to scale</p></div>}
 </Lesson>;
}
