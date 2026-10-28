"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "How do porcupine quills typically reach an approaching predator?",
  "options": [
    "The porcupine launches them through the air",
    "They grow on the predator",
    "The predator makes contact with them"
  ],
  "answer": 2,
  "explanation": "The diagram shows quills on the porcupine and an approaching animal making contact. Porcupines do not shoot their quills like darts. Detached quills can become embedded during contact, so distance alone does not cause the transfer."
};
export default function Demo({slug}:{slug:string}) {
  const [shown,setShown] = useState(false);
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Open the schematic evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={shown ? model.explanation : "Schematic evidence hidden until exploration."}>
      {shown ? <g><ellipse cx="112" cy="95" rx="62" ry="30" fill="#b9a28c" stroke="#806e60" strokeWidth="3"/><path d="M56 78 L45 45 M72 70 L68 38 M90 65 L90 31 M108 64 L115 31 M126 65 L142 34 M142 70 L168 41 M155 79 L185 55" fill="none" stroke="#746451" strokeWidth="4"/><circle cx="207" cy="87" r="25" fill="#d5c1a8" stroke="#806e60" strokeWidth="3"/><path d="M157 80 L188 80" stroke="#d4865e" strokeWidth="5"/><text x="195" y="143" textAnchor="middle" fill="var(--fg)" fontSize="14">Contact</text></g> : <g><ellipse cx="112" cy="95" rx="62" ry="30" fill="var(--bg-2)" stroke="var(--line)" strokeWidth="3"/><circle cx="260" cy="94" r="25" fill="var(--bg-2)" stroke="var(--line)" strokeWidth="3"/></g>}
    </svg>
    <Row><Control disabled={locked || shown} onClick={()=>{setShown(true);interact();}}>Explore the evidence</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Porcupine and visitor · schematic</p>
  </div>}
  </Lesson>;
}
