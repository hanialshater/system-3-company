"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "What can a thick blubber layer help a marine mammal do in cold water?",
  "options": [
    "Produce oxygen underwater",
    "Stop all heat transfer",
    "Slow heat loss"
  ],
  "answer": 2,
  "explanation": "The cutaway places blubber between the warmer body and the water. The layer can slow outward heat transfer. It does not stop heat loss entirely, and the drawing does not estimate the rate for a particular species."
};
export default function Demo({slug}:{slug:string}) {
  const [shown,setShown] = useState(false);
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Open the schematic evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={shown ? model.explanation : "Schematic evidence hidden until exploration."}>
      {shown ? <g><rect x="42" y="35" width="256" height="31" fill="#b6d6e5"/><rect x="42" y="66" width="256" height="44" fill="#e9c586"/><rect x="42" y="110" width="256" height="30" fill="#d9b2a4"/><text x="170" y="55" textAnchor="middle" fill="var(--fg)" fontSize="14">Water</text><text x="170" y="94" textAnchor="middle" fill="var(--fg)" fontSize="14">Blubber</text><text x="170" y="130" textAnchor="middle" fill="var(--fg)" fontSize="14">Body</text></g> : <g><rect x="42" y="35" width="256" height="31" fill="var(--bg-2)" stroke="var(--line)"/><rect x="42" y="66" width="256" height="44" fill="var(--bg-2)" stroke="var(--line)"/><rect x="42" y="110" width="256" height="30" fill="var(--bg-2)" stroke="var(--line)"/></g>}
    </svg>
    <Row><Control disabled={locked || shown} onClick={()=>{setShown(true);interact();}}>Explore the evidence</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Cross-section · schematic</p>
  </div>}
  </Lesson>;
}
