"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "How can an elephant’s ears help the animal lose heat?",
  "options": [
    "Blood near their surface can exchange heat with the air",
    "They store water that evaporates from inside the ear",
    "They switch the elephant’s metabolism off"
  ],
  "answer": 0,
  "explanation": "The ear schematic shows vessels carrying warm blood near a broad surface. When the surrounding air is cooler, heat can flow outward. Ear movement and environmental conditions affect the rate, so the diagram is a mechanism rather than a measured cooling amount."
};
export default function Demo({slug}:{slug:string}) {
  const [shown,setShown] = useState(false);
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Open the schematic evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={shown ? model.explanation : "Schematic elephant head, with the ear evidence hidden."}>
      <g stroke="#4e5b60" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M87 41 C58 12 17 20 18 65 C18 105 42 123 87 105 Z" fill="#c1c3bd"/>
        <path d="M143 41 C178 12 211 22 211 64 C211 99 190 120 145 104 Z" fill="#c1c3bd"/>
        <path d="M75 48 Q80 17 115 17 Q151 17 156 48 L155 83 Q153 103 140 112 L135 144 Q130 157 120 153 Q106 151 107 136 L109 111 Q80 102 76 82 Z" fill="#aeb3ae"/>
        <path d="M90 95 Q80 116 71 114 M146 95 Q155 116 164 114" fill="none" stroke="#eee3cc" strokeWidth="5"/>
        <circle cx="93" cy="62" r="3" fill="#29383d" stroke="none"/><circle cx="138" cy="62" r="3" fill="#29383d" stroke="none"/>
        <path d="M109 116 Q121 120 136 116 M108 129 Q121 134 136 129 M108 140 Q120 145 135 140" fill="none" stroke="#71807e" strokeWidth="1.5"/>
      </g>
      {shown && <g>
        <path d="M156 99 Q178 86 181 48 M156 99 Q172 76 160 42 M156 99 Q188 85 196 63" fill="none" stroke="#a74847" strokeWidth="3" strokeLinecap="round"/>
        <path d="M213 61 H250 M241 53 L250 61 L241 69 M213 93 H250 M241 85 L250 93 L241 101" fill="none" stroke="#b66442" strokeWidth="3"/>
        <text x="285" y="80" textAnchor="middle" fill="var(--fg)" fontSize="14">Cooler air</text>
      </g>}
    </svg>
    <Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || shown} onClick={()=>{setShown(true);interact();}}>Explore the evidence</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Ear vessels · schematic</p>
  </div>}
  </Lesson>;
}
