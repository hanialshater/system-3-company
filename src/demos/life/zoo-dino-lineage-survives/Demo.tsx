"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"In a toy dinosaur family tree, species A disappears while species B continues. What happens to the larger group containing both?",options:["The group can continue through B", "The group must end when A disappears", "A must be the direct ancestor of B"],answer:0}} exploreHint="Follow the branch and then inspect its two tips." reveal={()=><p>In this constructed tree, one species ends while a second branch continues. The larger group remains represented through the continuing branch. One extinct member does not imply that every member of its group disappeared.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A schematic family tree shows a group splitting into two branches.":"In this constructed tree, one species ends while a second branch continues. The larger group remains represented through the continuing branch. One extinct member does not imply that every member of its group disappeared."}>
 {step>=1&&<><path d="M30 105 H120 M120 56 V145 M120 56 H260 M120 145 H300" stroke="var(--fg)" strokeWidth="4" fill="none"/><text x="70" y="134" fill="var(--fg)" textAnchor="middle" fontSize="13">Group</text></>}
 {step>=2&&<><circle cx="260" cy="56" r="7" fill="#b67769"/><path d="M250 46 L270 66 M270 46 L250 66" stroke="#873e35" strokeWidth="3"/><text x="170" y="43" fill="var(--fg)" fontSize="13">Species A ends</text><path d="M120 145 H300" stroke="#43a083" strokeWidth="6"/><text x="170" y="172" fill="var(--fg)" fontSize="13">Species B continues</text></>}
 </svg><Row><Control disabled={locked||step!==0} onClick={()=>setStep(1)}>Trace branches</Control><Control disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Inspect outcomes</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Schematic; example assumptions stated</p></div>}
 </Lesson>;
}
