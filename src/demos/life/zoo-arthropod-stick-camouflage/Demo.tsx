"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"A stick insect rests among similar twigs. Which visible feature can contribute to camouflage in this setting?",options:["Its slender twig-like body", "A bright warning label", "A separate shell around the branch"],answer:0}} exploreHint="Inspect the twigs, then reveal the insect’s outline." reveal={()=><p>The schematic stick insect has a slender body resembling the surrounding twigs. In this stated setting, that resemblance can make it less conspicuous; camouflage does not guarantee that a predator will miss it.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A schematic displays twigs; the insect outline has not yet been highlighted.":"The schematic stick insect has a slender body resembling the surrounding twigs. In this stated setting, that resemblance can make it less conspicuous; camouflage does not guarantee that a predator will miss it."}>
 {step>=1&&<><path d="M18 140 L315 46 M40 66 L305 137 M20 106 L315 96" stroke="#a0815e" strokeWidth="7" fill="none"/><text x="170" y="180" textAnchor="middle" fill="var(--fg)" fontSize="13">Twigs · schematic</text></>}
 {step>=2&&<><circle cx="105" cy="112" r="7" fill="#6e9670"/><path d="M101 107 L88 98 M103 106 L96 93" stroke="#6e9670" strokeWidth="2"/><path d="M105 112 L218 77 M128 105 L113 88 M145 99 L134 120 M164 93 L153 75 M181 88 L171 106 M199 82 L192 65 M213 78 L208 95" stroke="#6e9670" strokeWidth="5" strokeLinecap="round"/><text x="82" y="54" fill="var(--fg)" fontSize="13">Highlighted insect</text></>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect the twigs</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Reveal the insect</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Simplified schematic · not to scale</p></div>}
 </Lesson>;
}
