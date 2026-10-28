"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"Several dinosaur skeletons occur together in one deposit. What can be said without additional evidence?",options:["Their remains occur in the same deposit", "They certainly lived together as a herd", "They all died at precisely the same moment"],answer:0}} exploreHint="Inspect the deposit, then uncover several skeletons." reveal={()=><p>The schematic shows several skeletons in one deposit. Their co-occurrence is evidence about where remains were found; additional geological and biological evidence is needed to infer social behavior or the exact timing of death.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A single schematic sedimentary deposit is visible; the bones have not yet been uncovered.":"The schematic shows several skeletons in one deposit. Their co-occurrence is evidence about where remains were found; additional geological and biological evidence is needed to infer social behavior or the exact timing of death."}>
 {step>=1&&<><path d="M20 48 H320 V158 H20Z" fill="#dac5a7" stroke="#977e62" strokeWidth="3"/><text x="170" y="31" textAnchor="middle" fill="var(--fg)" fontSize="13">One deposit · schematic</text></>}
 {step>=2&&<><g fill="none" stroke="#f4ead5" strokeWidth="6" strokeLinecap="round"><path d="M48 85 L88 71 L110 90 M69 78 L63 107 M81 75 L89 107"/><path d="M133 118 L170 103 L192 121 M150 110 L147 139 M165 105 L175 135"/><path d="M225 81 L265 66 L289 85 M241 74 L238 104 M257 69 L267 100"/></g><g fill="#f4ead5"><circle cx="113" cy="87" r="6"/><circle cx="195" cy="118" r="6"/><circle cx="292" cy="82" r="6"/></g><text x="170" y="180" textAnchor="middle" fill="var(--fg)" fontSize="13">Several skeletons</text></>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect deposit</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Uncover skeletons</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Simplified schematic · not to scale</p></div>}
 </Lesson>;
}
