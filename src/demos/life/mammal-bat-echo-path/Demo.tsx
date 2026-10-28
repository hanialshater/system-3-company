"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "A bat emits a sound toward an insect. Which event is needed for an echo to reach the bat?",
  "options": [
    "Sound reflects from the insect",
    "The insect emits the same sound",
    "The bat stops hearing"
  ],
  "answer": 0,
  "explanation": "The outgoing path reaches the insect; the returning path represents reflected sound reaching the bat. Many bats use returning echoes to help locate objects. The diagram is a schematic, not an observation or a statement that bats cannot see."
};
export default function Demo({slug}:{slug:string}) {
  const [shown,setShown] = useState(false);
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Open the schematic evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={shown ? model.explanation : "Schematic evidence hidden until exploration."}>
      {shown ? <g><text x="65" y="86" textAnchor="middle" fill="var(--fg)" fontSize="15">Bat</text><text x="275" y="86" textAnchor="middle" fill="var(--fg)" fontSize="15">Insect</text><path d="M88 54 H245 M233 44 L246 54 L233 64" fill="none" stroke="#d69a62" strokeWidth="4"/><text x="168" y="39" textAnchor="middle" fill="var(--fg)" fontSize="13">Sound sent</text><path d="M246 114 H89 M102 104 L89 114 L102 124" fill="none" stroke="#6c9fb7" strokeWidth="4"/><text x="168" y="149" textAnchor="middle" fill="var(--fg)" fontSize="13">Echo returns</text></g> : <g><text x="65" y="86" textAnchor="middle" fill="var(--fg)" fontSize="15">Bat</text><text x="275" y="86" textAnchor="middle" fill="var(--fg)" fontSize="15">Insect</text></g>}
    </svg>
    <Row><Control disabled={locked || shown} onClick={()=>{setShown(true);interact();}}>Explore the evidence</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Sound paths · schematic</p>
  </div>}
  </Lesson>;
}
