"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"In a leafcutter-ant colony, what is a major use of the cut leaves brought to the garden?",options:["A substrate for cultivated fungus", "A shell worn by each ant", "A permanent wall around the colony"],answer:0}} exploreHint="Follow a leaf fragment, then inspect the fungus garden." reveal={()=><p>The illustration shows cut leaves added to a fungus garden. Leafcutter ants cultivate fungus on prepared plant material, and the fungus supplies food to the colony. The diagram simplifies a complex partnership.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A leaf fragment is carried toward a schematic colony chamber.":"The illustration shows cut leaves added to a fungus garden. Leafcutter ants cultivate fungus on prepared plant material, and the fungus supplies food to the colony. The diagram simplifies a complex partnership."}>
 {step>=1&&<><path d="M35 42 Q78 8 105 55 Q68 80 35 42Z" fill="#a8c986" stroke="#61794f" strokeWidth="2"/><g fill="#745d4a"><circle cx="72" cy="70" r="5"/><ellipse cx="84" cy="74" rx="8" ry="6"/><circle cx="96" cy="77" r="6"/></g><path d="M78 77 L68 89 M84 80 L81 91 M91 80 L99 90" stroke="#745d4a" strokeWidth="2"/><path d="M110 55 L152 95 M145 87 L152 95 L142 96" stroke="var(--fg)" fill="none" strokeWidth="2"/><text x="68" y="105" textAnchor="middle" fill="var(--fg)" fontSize="13">Leaf fragment</text></>}
 {step>=2&&<><path d="M170 66 Q245 46 310 66 V140 Q240 167 170 140Z" fill="#d9c8aa" stroke="#88775e" strokeWidth="2"/><path d="M185 128 Q207 75 225 126 Q240 80 254 127 Q277 76 294 126" fill="none" stroke="#a084a4" strokeWidth="5"/><text x="240" y="177" textAnchor="middle" fill="var(--fg)" fontSize="13">Fungus garden</text></>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Carry leaf</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Inspect garden</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Simplified schematic · not to scale</p></div>}
 </Lesson>;
}
