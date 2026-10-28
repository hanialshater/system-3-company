"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"An identified fossil nest contains several fossilized eggs. What does that observation directly establish?",options:["Eggs occur together at the site", "An adult cared for the eggs", "Every dinosaur nested the same way"],answer:0}} exploreHint="Expose the nest and then examine the eggs." reveal={()=><p>The indicated fossil nest contains several eggs together. That observation is evidence of eggs in the nest; it does not on its own establish the identity or behavior of a parent, or nesting behavior for every dinosaur.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A schematic fossil nest is displayed, with its contents not yet uncovered.":"The indicated fossil nest contains several eggs together. That observation is evidence of eggs in the nest; it does not on its own establish the identity or behavior of a parent, or nesting behavior for every dinosaur."}>
 {step>=1&&<><path d="M65 97 Q170 162 275 97 L265 120 Q170 174 75 120Z" fill="#a97855" stroke="#76583e" strokeWidth="3"/><text x="170" y="165" textAnchor="middle" fill="var(--fg)" fontSize="13">Identified nest · schematic</text></>}
 {step>=2&&<g fill="#eee2bc" stroke="#7e735b" strokeWidth="2"><ellipse cx="125" cy="94" rx="18" ry="25"/><ellipse cx="170" cy="89" rx="18" ry="25"/><ellipse cx="215" cy="94" rx="18" ry="25"/></g>}
 </svg><Row><Control disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect nest</Control><Control disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Expose eggs</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Schematic; example assumptions stated</p></div>}
 </Lesson>;
}
