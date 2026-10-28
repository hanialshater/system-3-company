"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "What substance makes up much of a camel’s hump and serves as an energy reserve?",
  "options": [
    "Stored drinking water",
    "Air",
    "Fat"
  ],
  "answer": 2,
  "explanation": "The cutaway labels the hump as a fat reserve. Camels have several water-conserving adaptations, but their humps are not tanks of drinking water. Fat can provide energy when food is scarce."
};
export default function Demo({slug}:{slug:string}) {
  const [shown,setShown] = useState(false);
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Open the schematic evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={shown ? model.explanation : "Schematic one-humped camel, with the hump evidence hidden."}>
      <g stroke="#675b4d" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        <path d="M44 83 Q54 68 83 67 L102 68 Q122 9 148 68 L179 68 Q194 66 199 49 L207 25 Q212 9 226 18 L238 23 L248 22 Q256 24 257 32 Q257 42 245 44 L227 42 Q225 58 219 75 L209 105 Q198 114 181 112 L67 112 Q49 108 44 97 Z" fill="#d4b588"/>
        <path d="M71 110 L68 151 L81 151 M91 111 L93 151 L105 151 M157 111 L154 151 L166 151 M181 111 L184 151 L196 151" fill="none" strokeWidth="7"/>
        <path d="M48 85 Q26 82 25 101" fill="none" strokeWidth="4"/><path d="M19 101 L30 104" strokeWidth="4"/>
        <circle cx="234" cy="29" r="2.5" fill="#29383d" stroke="none"/><path d="M239 39 Q247 41 252 37" fill="none" strokeWidth="1.5"/>
      </g>
      {shown && <g>
        <path d="M105 68 Q122 17 145 68 Z" fill="#e8bc6c" stroke="#98733e" strokeWidth="2"/>
        <path d="M112 43 Q105 22 94 22" fill="none" stroke="var(--fg)" strokeWidth="2"/>
        <text x="16" y="26" fill="var(--fg)" fontSize="14">Fat reserve</text>
      </g>}
    </svg>
    <Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || shown} onClick={()=>{setShown(true);interact();}}>Explore the evidence</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Hump cutaway · schematic</p>
  </div>}
  </Lesson>;
}
