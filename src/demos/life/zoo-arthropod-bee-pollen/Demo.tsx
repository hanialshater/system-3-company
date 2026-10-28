"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"In this schematic, what sticks to the bee after it brushes a flower’s pollen-bearing anther?",options:["Pollen", "Nectar inside the flower", "A leaf from the stem"],answer:0}} exploreHint="Inspect the anther, then show the bee’s contact." reveal={()=><p>The diagram shows pollen moving from an anther onto the visiting bee. A bee can collect or carry pollen on its body. This contact alone does not show pollen reaching a stigma.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A flower’s anther and its pollen are indicated.":"The diagram shows pollen moving from an anther onto the visiting bee. A bee can collect or carry pollen on its body. This contact alone does not show pollen reaching a stigma."}>
 {step>=1&&<><circle cx="95" cy="98" r="48" fill="#e9c2aa"/><circle cx="95" cy="98" r="20" fill="#ebd58b"/><path d="M95 145 V175" stroke="#73936c" strokeWidth="5"/><path d="M95 96 L95 70" stroke="#8b735a" strokeWidth="3"/><ellipse cx="95" cy="69" rx="10" ry="6" fill="#b88c31"/><circle cx="90" cy="65" r="3" fill="#b88c31"/><circle cx="100" cy="65" r="3" fill="#b88c31"/><text x="95" y="35" textAnchor="middle" fill="var(--fg)" fontSize="13">Anther + pollen</text></>}
 {step>=2&&<><path d="M113 76 L151 85 M144 79 L151 85 L143 89" stroke="var(--fg)" strokeWidth="2" fill="none"/><ellipse cx="207" cy="95" rx="42" ry="25" fill="#e1bd66" stroke="#806b3e" strokeWidth="2"/><path d="M185 78 Q196 57 209 75 M205 75 Q222 55 231 77" fill="#bfd9df" stroke="#7396a0" strokeWidth="2"/><path d="M193 73 V116 M215 72 V116" stroke="#6d5d43" strokeWidth="5"/><circle cx="180" cy="96" r="4" fill="#b88c31"/><circle cx="189" cy="107" r="4" fill="#b88c31"/><text x="210" y="158" textAnchor="middle" fill="var(--fg)" fontSize="13">Pollen on visitor</text></>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect anther</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Show contact</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Simplified schematic · not to scale</p></div>}
 </Lesson>;
}
