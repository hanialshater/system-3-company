"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "Which tooth shape is better suited to crushing and grinding plant material?",
  "options": [
    "A broad, ridged surface",
    "A sharp pointed tip",
    "A narrow cutting edge"
  ],
  "answer": 0,
  "explanation": "The stage contrasts a broad ridged chewing surface with a pointed one. Mammal teeth can have different shapes associated with different feeding tasks; a pointed tooth and a grinding tooth do not do the same job."
};
export default function Demo({slug}:{slug:string}) {
  const [shown,setShown] = useState(false);
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Open the schematic evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={shown ? model.explanation : "Schematic evidence hidden until exploration."}>
      {shown ? <g><path d="M45 108 Q45 35 94 37 Q145 35 145 108Z" fill="#e7d8b7" stroke="#a68e70" strokeWidth="3"/><path d="M58 76 Q75 60 91 76 Q106 60 132 76" fill="none" stroke="#a68e70" strokeWidth="4"/><path d="M195 108 L245 32 L295 108Z" fill="#e7d8b7" stroke="#a68e70" strokeWidth="3"/><text x="95" y="140" textAnchor="middle" fill="var(--fg)" fontSize="14">Grinding</text><text x="245" y="140" textAnchor="middle" fill="var(--fg)" fontSize="14">Piercing</text></g> : <g><path d="M45 108 Q45 35 94 37 Q145 35 145 108Z M195 108 L245 32 L295 108Z" fill="var(--bg-2)" stroke="var(--line)" strokeWidth="3"/></g>}
    </svg>
    <Row><Control disabled={locked || shown} onClick={()=>{setShown(true);interact();}}>Explore the evidence</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Tooth shapes · schematic</p>
  </div>}
  </Lesson>;
}
