"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:"A dinosaur fossil preserves a skeleton but no identified pigment evidence. Can the skeleton alone establish its exact original color?",options:["No, the color remains unresolved", "Yes, one exact color is proved", "Yes, all dinosaurs had the same color"],answer:0}} exploreHint="Inspect the fossil, then compare two possible illustrations." reveal={()=><p>The schematic skeleton does not include identified pigment evidence. Two different colors are shown as possibilities, not observations. Some fossils can preserve relevant pigment structures, but this example does not.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0?"A schematic figure with evidence hidden until inspection.":step===1?"A simplified fossil skeleton is shown; pigment evidence is absent in this stipulated example.":"The schematic skeleton does not include identified pigment evidence. Two different colors are shown as possibilities, not observations. Some fossils can preserve relevant pigment structures, but this example does not."}>
 {step>=1&&<><path d="M20 125 Q45 118 70 95 L96 78 L121 87 L139 76 L151 80 L142 89 L127 93 L105 105 L98 132 L91 133 L94 105 L77 111Z" fill="#cabfa9" stroke="#80735f" strokeWidth="2"/><path d="M95 90 L121 92 M90 93 L81 105 M108 95 L106 114" stroke="#f2ead7" strokeWidth="3"/><text x="83" y="165" textAnchor="middle" fill="var(--fg)" fontSize="12">No pigment found</text></>}
 {step>=2&&<><path d="M170 75 Q188 68 205 52 L222 42 L238 48 L250 41 L258 44 L252 51 L242 54 L228 62 L223 80 L219 81 L220 63 L208 67Z" fill="#9dc08e" stroke="#5d7c57" strokeWidth="2"/><path d="M170 138 Q188 131 205 115 L222 105 L238 111 L250 104 L258 107 L252 114 L242 117 L228 125 L223 143 L219 144 L220 126 L208 130Z" fill="#c78d74" stroke="#8e5c4b" strokeWidth="2"/><text x="245" y="173" textAnchor="middle" fill="var(--fg)" fontSize="12">Possible colors</text></>}
 </svg><Row><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Inspect fossil</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Compare colors</Control></Row><p style={{textAlign:"center",color:"var(--muted)",fontSize:".8rem"}}>Simplified schematic · not to scale</p></div>}
 </Lesson>;
}
