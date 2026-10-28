"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"In a toy example, two trackways span 6 metres. A has three equal gaps and B has six. Which has longer average spacing between adjacent prints?",options:["Trackway A", "Trackway B", "The spacing is equal"],answer:0}} exploreHint="Count the gaps between prints in each trackway." reveal={()=><p>In the constructed example, A has three gaps across 6 metres, so each gap is 2 metres; B has six gaps, so each is 1 metre. Track spacing alone does not tell us an exact running speed or which species made the tracks.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"Trackway A has four prints with three equal gaps across six metres.":"In the constructed example, A has three gaps across 6 metres, so each gap is 2 metres; B has six gaps, so each is 1 metre. Track spacing alone does not tell us an exact running speed or which species made the tracks."}>
 <text x="30" y="26" fill="var(--fg)" fontSize="13">Each example spans 6 metres</text>
 {step>=1&&<><text x="8" y="73" fill="var(--fg)" fontSize="14">A</text><path d="M35 69 H305" stroke="var(--line)" strokeWidth="3"/>{[35,125,215,305].map((x,i)=><circle key={i} cx={x} cy="69" r="7" fill="#6b917c"/>)}<text x="170" y="95" textAnchor="middle" fill="var(--fg)" fontSize="13">3 gaps</text></>}
 {step>=2&&<><text x="8" y="130" fill="var(--fg)" fontSize="14">B</text><path d="M35 125 H305" stroke="var(--line)" strokeWidth="3"/>{[35,80,125,170,215,260,305].map((x,i)=><circle key={i} cx={x} cy="125" r="7" fill="#b07d55"/>)}<text x="170" y="153" textAnchor="middle" fill="var(--fg)" fontSize="13">6 gaps</text></>}
 </svg><Row><Control disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect A</Control><Control disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Inspect B</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Schematic; example assumptions stated</p></div>}
 </Lesson>;
}
