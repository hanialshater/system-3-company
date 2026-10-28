"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"An identified fossil bone injury shows healing. What does that healing support?",options:["The animal survived for some time after injury", "The cause of injury is certain", "The animal died at the moment of injury"],answer:0}} exploreHint="Inspect the fracture and then the repair around it." reveal={()=><p>In the schematic, repaired tissue surrounds the earlier fracture. If the feature is correctly identified as healing, the animal lived for some time after the injury. This observation alone does not determine the injury’s cause or exact survival time.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A schematic bone shows a fracture; repair has not yet been highlighted.":"In the schematic, repaired tissue surrounds the earlier fracture. If the feature is correctly identified as healing, the animal lived for some time after the injury. This observation alone does not determine the injury’s cause or exact survival time."}>
 {step>=1&&<><path d="M45 68 Q28 52 28 74 Q18 90 42 93 L140 101 L153 85 L164 102 L180 88 L196 103 L297 94 Q317 101 317 82 Q325 65 302 66Z" fill="#d8c6a5" stroke="#7d6c52" strokeWidth="3"/><path d="M153 85 L164 102 L180 88 L196 103" stroke="#6a5944" strokeWidth="3" fill="none"/><text x="170" y="36" textAnchor="middle" fill="var(--fg)" fontSize="13">Fracture</text></>}
 {step>=2&&<><ellipse cx="175" cy="94" rx="50" ry="24" fill="none" stroke="#6d9d71" strokeWidth="7"/><text x="170" y="157" textAnchor="middle" fill="var(--fg)" fontSize="13">Repair tissue (stipulated)</text></>}
 </svg><Row><Control disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect fracture</Control><Control disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Show repair</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Schematic; example assumptions stated</p></div>}
 </Lesson>;
}
