"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "In the simplified aquatic egg shown, how can oxygen reach the developing embryo?",
  "options": [
    "By opening a rigid metal door",
    "Diffusion through its surrounding layers",
    "Through a bird beak"
  ],
  "answer": 1,
  "explanation": "The arrows show oxygen moving from surrounding water through the schematic egg layers toward the embryo. Amphibian eggs vary, and the drawing does not show rates or all membranes."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><circle cx="170" cy="95" r="58" fill="#a5cad1" stroke="var(--fg)" strokeWidth="3"/><circle cx="170" cy="95" r="22" fill="#b7a77f"/></g>}
 {step>=2 && <g><path d="M45 95 H105 M95 85 L105 95 L95 105 M235 95 H195 M205 85 L195 95 L205 105" stroke="var(--good)" strokeWidth="3" fill="none"/><text x="30" y="73" fill="var(--fg)" fontSize="13">Oxygen</text><text x="170" y="170" textAnchor="middle" fill="var(--fg)" fontSize="13">Layers exaggerated</text></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
