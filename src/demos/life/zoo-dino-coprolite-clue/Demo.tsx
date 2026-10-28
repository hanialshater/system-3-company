"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"An independently identified fossil dropping contains identifiable plant fragments. What can these fragments support?",options:["Some plant material was consumed", "The exact species of the producer is certain", "Every meal contained this plant"],answer:0}} exploreHint="Inspect the fossil and then expose its contents." reveal={()=><p>The schematic shows plant fragments in an identified fossil dropping. If those fragments are correctly identified, they support the presence of plant material in that dropping. They do not by themselves identify the producer or every meal it ate.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A schematic of an independently identified fossil dropping is displayed.":"The schematic shows plant fragments in an identified fossil dropping. If those fragments are correctly identified, they support the presence of plant material in that dropping. They do not by themselves identify the producer or every meal it ate."}>
 {step>=1&&<><ellipse cx="170" cy="89" rx="90" ry="55" fill="#aa8762" stroke="#6c5844" strokeWidth="3"/><text x="170" y="162" textAnchor="middle" fill="var(--fg)" fontSize="13">Identified dropping · schematic</text></>}
 {step>=2&&<g fill="#8db27e" stroke="#4e7150" strokeWidth="2"><path d="M120 80 Q132 62 145 75 Q135 91 120 80Z"/><path d="M165 103 Q177 85 190 98 Q180 115 165 103Z"/><path d="M202 72 Q214 54 227 67 Q217 84 202 72Z"/><text x="170" y="135" textAnchor="middle" fill="#202a22" stroke="none" fontSize="13">Identified plant fragments</text></g>}
 </svg><Row><Control disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect fossil</Control><Control disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Expose contents</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Schematic; example assumptions stated</p></div>}
 </Lesson>;
}
