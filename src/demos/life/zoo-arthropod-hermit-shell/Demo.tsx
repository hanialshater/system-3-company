"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"A hermit crab occupies an empty snail shell. Which description fits the shell?",options:["It is an external shell the crab occupies", "It is the crab’s own exoskeleton", "It is the crab’s abdomen"],answer:0}} exploreHint="Inspect the empty shell, then place the crab in it." reveal={()=><p>The schematic hermit crab occupies an empty shell originally made by a snail. The borrowed shell is distinct from the crab’s own exoskeleton and can protect its abdomen; individual crabs may change shells as they grow.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"An empty, previously made snail shell is shown.":"The schematic hermit crab occupies an empty shell originally made by a snail. The borrowed shell is distinct from the crab’s own exoskeleton and can protect its abdomen; individual crabs may change shells as they grow."}>
 {step>=1&&<><circle cx="165" cy="92" r="49" fill="#d4b68e" stroke="#806c50" strokeWidth="3"/><path d="M167 60 Q195 64 193 94 Q191 119 167 118 Q150 117 151 100 Q152 86 165 87 Q175 87 175 99" fill="none" stroke="#806c50" strokeWidth="4"/><text x="165" y="165" textAnchor="middle" fill="var(--fg)" fontSize="13">{step===1?"Empty snail shell":"Borrowed snail shell"}</text></>}
 {step>=2&&<><ellipse cx="105" cy="113" rx="36" ry="22" fill="#c1846f" stroke="#805749" strokeWidth="2"/><circle cx="80" cy="105" r="12" fill="#c1846f"/><path d="M78 96 L75 82 M89 96 L89 82" stroke="#805749" strokeWidth="3"/><circle cx="75" cy="81" r="3" fill="#263137"/><circle cx="89" cy="81" r="3" fill="#263137"/><path d="M83 128 L62 145 M101 133 L92 151 M115 134 L114 153 M130 130 L138 147 M68 106 L48 94 M49 94 L41 83 M49 94 L39 99" stroke="#805749" strokeWidth="4" fill="none"/><text x="75" y="39" fill="var(--fg)" fontSize="13">Crab</text></>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect the shell</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Place the crab</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Simplified schematic · not to scale</p></div>}
 </Lesson>;
}
