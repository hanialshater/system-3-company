"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"In the simplified insect leg below, which structure lets the two depicted segments change their angle?",options:["The joint between them", "The middle of a rigid segment", "The pigment on the outer surface"],answer:0}} exploreHint="Inspect the straight leg, then bend it at the joint." reveal={()=><p>The picture shows two rigid segments meeting at a joint. Their angle changes at that connection in this simple model; real insect legs contain several segments, joints and muscles.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A schematic leg has two straight segments joined at a marked joint.":"The picture shows two rigid segments meeting at a joint. Their angle changes at that connection in this simple model; real insect legs contain several segments, joints and muscles."}>
 {step>=1&&<><path d="M50 105 L165 105 L285 105" stroke="#c4a578" strokeWidth="17" strokeLinecap="round" fill="none"/><circle cx="165" cy="105" r="12" fill="#768f70" stroke="#4b654c" strokeWidth="3"/><text x="165" y="158" textAnchor="middle" fill="var(--fg)" fontSize="13">Joint</text></>}
 {step>=2&&<><rect x="177" y="84" width="135" height="42" fill="var(--bg)"/><path d="M165 105 L244 42" stroke="#c4a578" strokeWidth="17" strokeLinecap="round"/><circle cx="165" cy="105" r="12" fill="#768f70" stroke="#4b654c" strokeWidth="3"/></>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect the leg</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Bend at the joint</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Simplified schematic · not to scale</p></div>}
 </Lesson>;
}
