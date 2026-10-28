"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "What helps an animal’s fur reduce heat loss in still, dry conditions?",
  "options": [
    "A layer of stored liquid water",
    "Air held among the hairs",
    "The hairs generating heat like a heater"
  ],
  "answer": 1,
  "explanation": "The cutaway highlights air pockets among the hairs above the skin. Air held in place can slow heat transfer; fur does not manufacture heat. Wetting, compression and moving air can change how well this layer insulates."
};
export default function Demo({slug}:{slug:string}) {
  const [shown,setShown] = useState(false);
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Open the schematic evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={shown ? model.explanation : "Schematic evidence hidden until exploration."}>
      {shown ? <g><rect x="45" y="115" width="250" height="25" rx="5" fill="#dbb9a0" stroke="#a7836c" strokeWidth="2"/><path d="M65 115 Q55 70 74 34 M100 115 Q90 72 106 34 M135 115 Q125 67 145 34 M170 115 Q160 74 180 34 M205 115 Q195 70 215 34 M240 115 Q230 72 250 34 M275 115 Q265 72 285 34" stroke="#9c806b" strokeWidth="5" fill="none"/><g fill="#bdd9e4"><circle cx="84" cy="65" r="8"/><circle cx="120" cy="83" r="8"/><circle cx="156" cy="57" r="8"/><circle cx="191" cy="83" r="8"/><circle cx="226" cy="57" r="8"/><circle cx="261" cy="84" r="8"/></g><text x="170" y="158" textAnchor="middle" fill="var(--fg)" fontSize="14">Air between hairs</text></g> : <g><rect x="45" y="115" width="250" height="25" rx="5" fill="var(--bg-2)" stroke="var(--line)" strokeWidth="2"/><path d="M65 115 Q55 70 74 34 M100 115 Q90 72 106 34 M135 115 Q125 67 145 34 M170 115 Q160 74 180 34 M205 115 Q195 70 215 34 M240 115 Q230 72 250 34 M275 115 Q265 72 285 34" stroke="var(--line)" strokeWidth="5" fill="none"/></g>}
    </svg>
    <Row><Control disabled={locked || shown} onClick={()=>{setShown(true);interact();}}>Explore the evidence</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Dry fur cross-section · schematic</p>
  </div>}
  </Lesson>;
}
