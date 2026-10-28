"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"A small object disturbs an orb web. What physical signal can travel along the silk toward the spider?",options:["Vibration", "A written word", "Light emitted by the thread"],answer:0}} exploreHint="Disturb one thread, then trace the movement through the web." reveal={()=><p>The schematic shows a disturbance traveling along silk toward the spider. Web vibrations can provide information, but a vibration alone does not guarantee the spider can identify a particular prey item.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A schematic orb web has a disturbance on one of its strands.":"The schematic shows a disturbance traveling along silk toward the spider. Web vibrations can provide information, but a vibration alone does not guarantee the spider can identify a particular prey item."}>
 {step>=1&&<><path d="M170 30 V155 M70 60 L270 145 M70 145 L270 60 M75 105 H265" stroke="#a1acb2" strokeWidth="2"/><ellipse cx="170" cy="105" rx="65" ry="29" fill="none" stroke="#a1acb2" strokeWidth="2"/><ellipse cx="170" cy="105" rx="35" ry="15" fill="none" stroke="#a1acb2" strokeWidth="2"/><circle cx="84" cy="70" r="9" fill="#b68663"/><text x="66" y="35" fill="var(--fg)" fontSize="13">Disturbance</text></>}
 {step>=2&&<><path d="M85 70 L170 105" stroke="#d5ab50" strokeWidth="5" strokeDasharray="5 4"/><circle cx="170" cy="105" r="12" fill="#80675a"/><path d="M160 98 L145 87 M160 104 L142 103 M160 110 L145 120 M162 114 L150 131 M180 98 L195 87 M180 104 L198 103 M180 110 L195 120 M178 114 L190 131" stroke="#80675a" strokeWidth="3"/><text x="190" y="175" fill="var(--fg)" fontSize="13">Vibration to spider</text></>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Disturb thread</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Trace vibration</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Simplified schematic · not to scale</p></div>}
 </Lesson>;
}
