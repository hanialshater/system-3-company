"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"An identified fossil embryo lies inside an egg. What developmental stage can it reveal?",options:["A stage before hatching", "Only a fully grown adult", "The animal’s entire lifetime"],answer:0}} exploreHint="Inspect the egg, then reveal the preserved embryo." reveal={()=><p>The schematic shows an embryo inside an identified egg. Such a fossil can give evidence about development before hatching; it does not by itself record the animal’s whole life or prove parental care.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A schematic fossil egg is visible; its contents have not been uncovered.":"The schematic shows an embryo inside an identified egg. Such a fossil can give evidence about development before hatching; it does not by itself record the animal’s whole life or prove parental care."}>
 {step>=1&&<><path d="M170 23 C130 23 112 98 126 140 Q139 169 170 169 Q201 169 214 140 C228 98 210 23 170 23Z" fill="#e7d7b9" stroke="#85765f" strokeWidth="3"/><text x="170" y="180" textAnchor="middle" fill="var(--fg)" fontSize="13">Identified egg · schematic</text></>}
 {step>=2&&<><circle cx="162" cy="91" r="15" fill="#ac9676"/><path d="M176 91 Q196 101 190 122 Q182 141 162 135 Q146 130 150 114 M151 114 L144 102 M177 119 L187 133" fill="none" stroke="#8c765a" strokeWidth="5"/><text x="249" y="95" fill="var(--fg)" fontSize="13">Embryo</text><path d="M240 90 H190" stroke="var(--fg)" strokeWidth="2"/></>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect the egg</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Reveal embryo</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Simplified schematic · not to scale</p></div>}
 </Lesson>;
}
