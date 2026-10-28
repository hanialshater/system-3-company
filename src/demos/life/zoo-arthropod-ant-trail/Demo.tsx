"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"In the model, an ant leaves a chemical trail and a second ant detects it. What can the trail help communicate?",options:["A route taken on the surface", "A spoken sentence", "The exact population of every colony"],answer:0}} exploreHint="Show the trail, then follow it with a second ant." reveal={()=><p>The schematic represents a chemical trail on a path to food. In many ant species, trail pheromones can help other ants follow a route. The diagram is a simplified example; a single trail does not convey every detail of a colony.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A dashed chemical trail runs across a schematic path to food.":"The schematic represents a chemical trail on a path to food. In many ant species, trail pheromones can help other ants follow a route. The diagram is a simplified example; a single trail does not convey every detail of a colony."}>
 {step>=1&&<><path d="M45 135 Q110 40 175 105 T295 45" stroke="var(--warn)" strokeWidth="5" strokeDasharray="6 5" fill="none"/><text x="60" y="165" fill="var(--fg)" fontSize="13">Chemical trail</text><circle cx="293" cy="45" r="13" fill="var(--good)"/><text x="277" y="20" fill="var(--fg)" fontSize="12">Food</text></>}
 {step>=2&&<><g fill="var(--fg)"><ellipse cx="113" cy="79" rx="13" ry="9"/><circle cx="99" cy="81" r="7"/><circle cx="127" cy="78" r="7"/></g><path d="M100 70 L90 58 M113 68 L110 55 M125 69 L130 58 M100 89 L90 101 M113 90 L110 103 M125 88 L132 100" stroke="var(--fg)" strokeWidth="2"/><text x="200" y="159" fill="var(--fg)" fontSize="13">Second ant</text></>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Lay a trail</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Follow the trail</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Simplified schematic · not to scale</p></div>}
 </Lesson>;
}
