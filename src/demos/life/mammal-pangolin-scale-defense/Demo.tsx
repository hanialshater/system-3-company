"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "When a pangolin rolls up, what forms the protective outer surface?",
  "options": [
    "Launched quills",
    "Overlapping scales",
    "A detachable shell it finds"
  ],
  "answer": 1,
  "explanation": "The schematic shows a curled body with overlapping scales on the outside. Pangolin scales are part of the animal’s body; curling presents the scaled surface outward. The drawing simplifies their shape and arrangement."
};
export default function Demo({slug}:{slug:string}) {
  const [shown,setShown] = useState(false);
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Open the schematic evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={shown ? model.explanation : "Schematic evidence hidden until exploration."}>
      {shown ? <g><circle cx="170" cy="85" r="59" fill="#bb9f7f" stroke="#8a715b" strokeWidth="3"/><path d="M115 61 Q128 44 141 59 Q128 76 115 61 M142 41 Q155 25 169 41 Q155 58 142 41 M173 40 Q188 25 201 43 Q188 59 173 40 M200 54 Q216 44 226 62 Q212 75 200 54 M211 79 Q228 72 230 92 Q216 104 211 79 M198 105 Q214 98 220 118 Q205 129 198 105 M171 120 Q188 110 200 127 Q187 141 171 120 M139 120 Q154 109 168 128 Q152 142 139 120 M116 101 Q132 94 139 113 Q123 125 116 101" fill="#d6bb92" stroke="#92775e" strokeWidth="2"/><text x="170" y="91" textAnchor="middle" fill="var(--fg)" fontSize="14">Curled body</text></g> : <g><circle cx="170" cy="85" r="59" fill="var(--bg-2)" stroke="var(--line)" strokeWidth="3"/></g>}
    </svg>
    <Row><Control disabled={locked || shown} onClick={()=>{setShown(true);interact();}}>Explore the evidence</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Protective covering · schematic</p>
  </div>}
  </Lesson>;
}
