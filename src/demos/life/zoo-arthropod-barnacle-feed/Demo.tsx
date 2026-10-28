"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"In the illustrated acorn barnacle, what sweeps through water to help collect food particles?",options:["Feathery appendages", "A root from the rock", "A bird-like beak"],answer:0}} exploreHint="Inspect the attached animal, then extend its feeding appendages." reveal={()=><p>The schematic shows an attached acorn barnacle extending feathery appendages called cirri into the water. They help collect suspended food particles. The figure simplifies the timing and motion of feeding.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A schematic acorn barnacle is attached to a rock; feeding appendages are not yet extended.":"The schematic shows an attached acorn barnacle extending feathery appendages called cirri into the water. They help collect suspended food particles. The figure simplifies the timing and motion of feeding."}>
 {step>=1&&<><path d="M20 154 Q165 136 320 154 V178 H20Z" fill="#a49e91"/><path d="M118 148 L140 91 H200 L222 148Z" fill="#d6cbbb" stroke="#8c8378" strokeWidth="3"/><path d="M145 98 L153 146 M169 94 V146 M193 98 L185 146" stroke="#a79d90" strokeWidth="2"/></>}
 {step>=2&&<><path d="M170 90 Q152 64 145 26 M170 90 Q162 61 163 21 M170 90 Q179 58 181 22 M170 90 Q189 63 200 29" stroke="#8d9e8d" strokeWidth="4" fill="none"/><path d="M148 47 L137 40 M151 58 L139 53 M158 46 L148 38 M160 59 L150 54 M177 46 L186 38 M178 59 L189 54 M193 47 L204 40 M190 60 L201 54" stroke="#8d9e8d" strokeWidth="2"/><g fill="#d7ac50"><circle cx="132" cy="46" r="4"/><circle cx="210" cy="48" r="4"/><circle cx="154" cy="24" r="4"/></g><text x="247" y="65" fill="var(--fg)" fontSize="13">Cirri</text></>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect attachment</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Extend cirri</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Simplified schematic · not to scale</p></div>}
 </Lesson>;
}
