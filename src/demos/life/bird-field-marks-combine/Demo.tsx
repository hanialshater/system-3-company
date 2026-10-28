"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "A field guide shows two birds with red heads, but only one also has a striped wing. Which observation best separates the two in this example?",
  "options": [
    "No visible detail",
    "Head color and wing pattern together",
    "Red head alone"
  ],
  "answer": 1,
  "explanation": "Both schematic birds have red heads, but only the second has wing stripes. Combining field marks distinguishes the two pictured examples; real identification can also require range, behavior, season and other evidence."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><text x="85" y="25" textAnchor="middle" fill="var(--fg)" fontSize="14">A</text><text x="255" y="25" textAnchor="middle" fill="var(--fg)" fontSize="14">B</text></g>}
 {step>=2 && <g><ellipse cx="85" cy="91" rx="48" ry="30" fill="#bbc7cd"/><circle cx="50" cy="70" r="16" fill="#d66f70"/><ellipse cx="255" cy="91" rx="48" ry="30" fill="#bbc7cd"/><circle cx="220" cy="70" r="16" fill="#d66f70"/><path d="M244 74 L267 108 M255 70 L278 104 M266 69 L288 99" stroke="#42535f" strokeWidth="4"/><text x="85" y="148" textAnchor="middle" fill="var(--fg)" fontSize="13">Red head</text><text x="255" y="148" textAnchor="middle" fill="var(--fg)" fontSize="13">Red head + stripes</text></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
