"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "Many bats echolocate. What follows about their ability to see?",
  "options": [
    "All echolocating bats are blind",
    "Bats must rely only on sight",
    "Echolocation alone does not establish blindness"
  ],
  "answer": 2,
  "explanation": "The diagram shows two separate channels: light can reach eyes and sound can return to ears. Many bats can see as well as use echolocation. Knowing that an animal uses one sense does not prove the absence of another."
};
export default function Demo({slug}:{slug:string}) {
  const [shown,setShown] = useState(false);
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Open the schematic evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={shown ? model.explanation : "Schematic evidence hidden until exploration."}>
      {shown ? <g><circle cx="170" cy="80" r="48" fill="#c9b8aa" stroke="#8c7a6b" strokeWidth="3"/><circle cx="154" cy="77" r="5" fill="#283842"/><path d="M187 51 Q205 55 202 77 Q199 91 188 90" fill="none" stroke="#725f53" strokeWidth="5"/><path d="M65 65 H130 M118 55 L130 65 L118 75" stroke="#dfb96e" strokeWidth="4" fill="none"/><path d="M273 94 H214 M226 84 L214 94 L226 104" stroke="#7aa9bf" strokeWidth="4" fill="none"/><text x="67" y="50" textAnchor="middle" fill="var(--fg)" fontSize="14">Light</text><text x="274" y="80" textAnchor="middle" fill="var(--fg)" fontSize="14">Sound</text></g> : <g><circle cx="170" cy="80" r="48" fill="var(--bg-2)" stroke="var(--line)" strokeWidth="3"/><text x="170" y="87" textAnchor="middle" fill="var(--fg)" fontSize="15">Bat</text></g>}
    </svg>
    <Row><Control disabled={locked || shown} onClick={()=>{setShown(true);interact();}}>Explore the evidence</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Sensory channels · schematic</p>
  </div>}
  </Lesson>;
}
