"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";

export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:"In an SN2 substitution, from which side does the nucleophile approach the carbon bearing the leaving group?",options:["Opposite the leaving group","From the leaving-group side","From either side equally"],answer:0}} exploreHint="Advance the schematic through the substitution." reveal={()=><p>The incoming nucleophile approaches opposite the leaving group. In one step, the new bond forms as the old bond breaks; the other bonds invert like an umbrella. The schematic shows two of those three bonds and a transition state, not a stable intermediate.</p>}>
    {({locked,interact})=><div>
      <svg viewBox="0 0 320 180" className="stage-svg" role="img" aria-label={locked ? "A carbon bonded to a leaving group; the nucleophile is hidden until you predict." : `S N 2 schematic: ${step===0 ? "a nucleophile approaches from the opposite side of the leaving group" : step===1 ? "the incoming and leaving bonds are both partial at the transition state" : "the nucleophile is bonded and the leaving group has departed; the other bonds have inverted"}.`}>
        {!locked && <text x={step===0?35:step===1?77:108} y="95" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#237bb1">{step===2?"Nu":"Nu⁻"}</text>}
        <text x="160" y="95" textAnchor="middle" fontSize="22" fontWeight="bold" fill="currentColor">C</text>
        <text x={step===2?283:step===1?243:212} y="95" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#ba7431">{step===2?"X⁻":"X"}</text>
        {step===0 && <><line x1="171" y1="87" x2="197" y2="87" stroke="currentColor" strokeWidth="3"/></>}
        {step===1 && <><line x1="99" y1="87" x2="145" y2="87" stroke="#237bb1" strokeWidth="3" strokeDasharray="5 4"/><line x1="174" y1="87" x2="226" y2="87" stroke="#ba7431" strokeWidth="3" strokeDasharray="5 4"/></>}
        {step===2 && <line x1="126" y1="87" x2="145" y2="87" stroke="#237bb1" strokeWidth="3"/>}
        <line x1="160" y1="76" x2={step===0?135:step===2?185:160} y2="39" stroke="currentColor" strokeWidth="3"/>
        <line x1="160" y1="98" x2={step===0?135:step===2?185:160} y2="135" stroke="currentColor" strokeWidth="3"/>
        <text x="160" y="162" textAnchor="middle" fontSize="13" fill="currentColor">{locked?"Carbon and leaving group":step===0?"Approach":step===1?"Transition state · partial bonds":"Substitution · inverted arrangement"}</text>
      </svg>
      <Row><Control disabled={locked||step!==0} onClick={()=>setStep(1)}>Approach</Control><Control disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Complete substitution</Control></Row>
    </div>}
  </Lesson>;
}
