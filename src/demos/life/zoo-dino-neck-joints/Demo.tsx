"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"An articulated sauropod neck preserves vertebrae and their joints. What can that evidence help scientists investigate?",options:["Possible neck support and movement", "The animal’s exact resting pose throughout life", "The original color of its skin"],answer:0}} exploreHint="Inspect the animal outline, then reveal the linked neck bones." reveal={()=><p>The schematic neck shows a series of linked vertebrae. Their forms and joints can inform models of support and possible movement, but a fossil skeleton alone does not fix an exact pose during life.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A schematic long-necked sauropod is visible, with neck bones not yet highlighted.":"The schematic neck shows a series of linked vertebrae. Their forms and joints can inform models of support and possible movement, but a fossil skeleton alone does not fix an exact pose during life."}>
 {step>=1&&<><ellipse cx="219" cy="99" rx="66" ry="43" fill="#aebd9e" stroke="#67785e" strokeWidth="3"/><path d="M157 84 Q115 62 82 73 L52 66 Q43 65 40 77 L54 83 Q80 84 100 97 L157 108 M282 100 L322 123" fill="#aebd9e" stroke="#67785e" strokeWidth="3"/><path d="M180 130 L176 158 M204 137 L202 158 M242 137 L245 158 M264 129 L270 158" stroke="#67785e" strokeWidth="7"/><text x="170" y="181" textAnchor="middle" fill="var(--fg)" fontSize="13">Sauropod · schematic</text></>}
 {step>=2&&<><path d="M83 79 L151 94" stroke="#ece1c9" strokeWidth="5"/>{[88,99,110,121,132,143].map((x,i)=><circle key={i} cx={x} cy={80+i*2} r="5" fill="#ece1c9" stroke="#806f57" strokeWidth="1"/>)}<path d="M116 72 L117 49" stroke="var(--fg)" strokeWidth="2"/><text x="117" y="42" textAnchor="middle" fill="var(--fg)" fontSize="12">Linked vertebrae</text></>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect outline</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Reveal neck bones</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Simplified schematic · not to scale</p></div>}
 </Lesson>;
}
