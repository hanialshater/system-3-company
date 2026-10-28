"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"Three sediment layers A, B and C form one after another without overturning. Which is oldest?", options:["The bottom layer A","The middle layer B","The top layer C"],answer:0}} exploreHint="Lay each layer down in order." minInteractions={1} reveal={()=><p>Layer A was already there when B was laid over it; C was laid over B. In this undisturbed model the bottom layer is oldest. Overturning or disturbance can change what a present-day stack tells us.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 180" className="stage-svg" role="img" aria-label={step === 0 ? "An empty base for three sediment layers." : `Undisturbed stack, ${step} of 3 layers placed.`}>
 <path d="M35 152 H305" stroke="var(--fg)" strokeWidth="3"/>
 {step>=1&&<><rect x="45" y="114" width="250" height="36" fill="#d7bd91"/><text x="170" y="137" textAnchor="middle" fontSize="15" fill="#263137">A</text></>}
 {step>=2&&<><rect x="45" y="78" width="250" height="36" fill="#a9c0ad"/><text x="170" y="101" textAnchor="middle" fontSize="15" fill="#263137">B</text></>}
 {step>=3&&<><rect x="45" y="42" width="250" height="36" fill="#a9becd"/><text x="170" y="65" textAnchor="middle" fontSize="15" fill="#263137">C</text></>}
 </svg><Row><Control disabled={locked||step!==0} onClick={()=>setStep(1)}>Lay A</Control><Control disabled={locked||step!==1} onClick={()=>setStep(2)}>Lay B</Control><Control disabled={locked||step!==2} onClick={()=>{setStep(3);interact();}}>Lay C</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>A simplified undisturbed stack</p></div>}
 </Lesson>;
}
