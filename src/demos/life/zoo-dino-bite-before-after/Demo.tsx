"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"A fossil bone has confirmed bite marks. Without other evidence, what can you infer about the bite relative to the animal’s death?",options:["It could have happened before or after death", "It must have happened before death", "It must have happened after death"],answer:0}} exploreHint="Consider the two histories compatible with the same mark." reveal={()=><p>The same kind of bite mark could be made before death or by feeding on remains after death. A confirmed mark records contact with bone; its timing needs additional evidence. A mark alone does not prove a hunt.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A schematic fossil bone shows stipulated, confirmed bite marks.":"The same kind of bite mark could be made before death or by feeding on remains after death. A confirmed mark records contact with bone; its timing needs additional evidence. A mark alone does not prove a hunt."}>
 {step>=1&&<><path d="M70 65 Q50 45 49 66 Q35 80 55 85 L250 110 Q266 128 273 110 Q289 96 270 90 L75 65Z" fill="#d8c6a5" stroke="#7d6c52" strokeWidth="3"/><path d="M130 69 L137 80 M146 71 L153 82 M162 73 L169 84" stroke="#635342" strokeWidth="4"/><text x="170" y="35" textAnchor="middle" fill="var(--fg)" fontSize="13">Confirmed bite marks</text></>}
 {step>=2&&<><text x="87" y="158" textAnchor="middle" fill="var(--fg)" fontSize="13">Before death?</text><text x="253" y="158" textAnchor="middle" fill="var(--fg)" fontSize="13">After death?</text></>}
 </svg><Row><Control disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect marks</Control><Control disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Compare timing</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Schematic; example assumptions stated</p></div>}
 </Lesson>;
}
