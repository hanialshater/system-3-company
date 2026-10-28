"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"A museum makes a cast from a fossil mold. Which object is the replica?",options:["The cast made from the mold", "The original fossil", "Both are the original object"],answer:0}} exploreHint="Inspect the original and then the modeled cast." reveal={()=><p>The cast is a made replica that takes the shape of the mold; the original fossil is the specimen from which the mold was made. A replica can show shape without being the original material.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A schematic shows the original fossil specimen.":"The cast is a made replica that takes the shape of the mold; the original fossil is the specimen from which the mold was made. A replica can show shape without being the original material."}>
 {step>=1&&<><rect x="15" y="35" width="95" height="100" rx="10" fill="var(--bg-2)" stroke="var(--line)"/><path d="M38 74 Q30 55 48 62 L80 85 Q94 90 83 103 L48 80 Q33 91 38 74Z" fill="#bc9e72" stroke="#6c5d49" strokeWidth="2"/><text x="63" y="158" textAnchor="middle" fill="var(--fg)" fontSize="13">Original</text></>}
 {step>=2&&<><rect x="120" y="35" width="95" height="100" rx="10" fill="#b7b9b1"/><path d="M143 74 Q135 55 153 62 L185 85 Q199 90 188 103 L153 80 Q138 91 143 74Z" fill="#727970"/><text x="168" y="158" textAnchor="middle" fill="var(--fg)" fontSize="13">Mold</text><rect x="225" y="35" width="100" height="100" rx="10" fill="var(--bg-2)" stroke="var(--line)"/><path d="M248 74 Q240 55 258 62 L290 85 Q304 90 293 103 L258 80 Q243 91 248 74Z" fill="#d3d1c2" stroke="#73746c" strokeWidth="2"/><text x="275" y="158" textAnchor="middle" fill="var(--fg)" fontSize="13">Cast</text></>}
 </svg><Row><Control disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect original</Control><Control disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Inspect cast</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Schematic; example assumptions stated</p></div>}
 </Lesson>;
}
