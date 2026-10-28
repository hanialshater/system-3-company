"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "An echidna lays eggs and feeds its young milk. Which conclusion follows?",
  "options": [
    "It can still be a mammal",
    "It must be a bird",
    "It cannot feed its young milk"
  ],
  "answer": 0,
  "explanation": "The diagram pairs an egg with milk feeding in the same life history. Echidnas are monotremes: mammals that lay eggs. Laying an egg alone does not rule out membership in the mammal group."
};
export default function Demo({slug}:{slug:string}) {
  const [shown,setShown] = useState(false);
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Open the schematic evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={shown ? model.explanation : "Schematic evidence hidden until exploration."}>
      {shown ? <g><ellipse cx="92" cy="75" rx="24" ry="32" fill="#eddcb4" stroke="#ad9872" strokeWidth="3"/><text x="92" y="140" textAnchor="middle" fill="var(--fg)" fontSize="15">Egg</text><path d="M232 43 C218 61 210 74 210 86 A22 22 0 0 0 254 86 C254 74 246 61 232 43Z" fill="#c3d9e7" stroke="#7292a1" strokeWidth="3"/><text x="232" y="140" textAnchor="middle" fill="var(--fg)" fontSize="15">Milk for young</text></g> : <g><ellipse cx="170" cy="92" rx="68" ry="46" fill="var(--bg-2)" stroke="var(--line)" strokeWidth="3"/><text x="170" y="98" textAnchor="middle" fill="var(--fg)" fontSize="14">Echidna</text></g>}
    </svg>
    <Row><Control disabled={locked || shown} onClick={()=>{setShown(true);interact();}}>Explore the evidence</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>One life history · schematic</p>
  </div>}
  </Lesson>;
}
