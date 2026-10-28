"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"A non-avian dinosaur fossil preserves feather impressions. What does this evidence alone establish about powered flight?",options:["It does not by itself establish powered flight", "It proves the animal flew", "It proves the animal could never move"],answer:0}} exploreHint="Inspect the dinosaur outline, then reveal the feather impression." reveal={()=><p>The illustrated fossil includes a feather impression. Feathers can have functions besides powered flight, so their presence alone does not prove that this animal flew. The schematic does not establish the actual function of the feathers.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A simplified non-avian dinosaur fossil silhouette is visible; the feather impression is not yet highlighted.":"The illustrated fossil includes a feather impression. Feathers can have functions besides powered flight, so their presence alone does not prove that this animal flew. The schematic does not establish the actual function of the feathers."}>
 {step>=1&&<><path d="M35 128 Q75 113 118 92 Q148 76 182 87 L220 74 Q235 50 255 57 L279 67 L263 81 L238 82 L217 102 Q188 115 164 109 L149 146 L135 149 L142 108 L115 121 Z" fill="#c3bba4" stroke="#796e5a" strokeWidth="3"/><path d="M167 108 L181 143 L195 144 M191 94 L214 114" fill="none" stroke="#796e5a" strokeWidth="4"/><text x="170" y="174" textAnchor="middle" fill="var(--fg)" fontSize="13">Non-avian dinosaur fossil · schematic</text></>}
 {step>=2&&<><path d="M205 105 Q234 119 256 112 M210 110 L214 123 M217 112 L221 126 M224 114 L229 127 M232 115 L239 125 M240 115 L247 123" fill="none" stroke="#a06f52" strokeWidth="3"/><path d="M257 112 L300 50" stroke="var(--fg)" strokeWidth="2"/><text x="285" y="35" textAnchor="middle" fill="var(--fg)" fontSize="12">Feathers</text></>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect the fossil</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Reveal the feather</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Simplified schematic · not to scale</p></div>}
 </Lesson>;
}
