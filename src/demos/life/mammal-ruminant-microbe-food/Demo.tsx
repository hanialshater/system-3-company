"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "A cow eats fibrous plant material. What helps break down some of that material in its digestive system?",
  "options": [
    "The cow making sunlight",
    "A stomach full of swallowed stones",
    "Microbes in a stomach chamber"
  ],
  "answer": 2,
  "explanation": "In the schematic, plant food enters a stomach chamber with microbes. Ruminants rely on microbial fermentation for processing much of their fibrous diet. This simplified drawing does not show all stomach compartments or the full digestive sequence."
};
export default function Demo({slug}:{slug:string}) {
  const [shown,setShown] = useState(false);
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Open the schematic evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={shown ? model.explanation : "Schematic evidence hidden until exploration."}>
      {shown ? <g><path d="M95 36 H245 V125 H95 Z" fill="#e4c8ad" stroke="#aa8972" strokeWidth="3"/><g fill="#92b997"><circle cx="131" cy="78" r="8"/><circle cx="166" cy="102" r="8"/><circle cx="204" cy="70" r="8"/><circle cx="213" cy="103" r="8"/></g><path d="M40 80 H88 M77 70 L88 80 L77 90" fill="none" stroke="#8cac7b" strokeWidth="4"/><text x="41" y="60" fill="var(--fg)" fontSize="14">Plant food</text><text x="170" y="152" textAnchor="middle" fill="var(--fg)" fontSize="14">Microbes</text></g> : <g><path d="M95 36 H245 V125 H95 Z" fill="var(--bg-2)" stroke="var(--line)" strokeWidth="3"/><text x="170" y="88" textAnchor="middle" fill="var(--fg)" fontSize="14">Stomach chamber</text></g>}
    </svg>
    <Row><Control disabled={locked || shown} onClick={()=>{setShown(true);interact();}}>Explore the evidence</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>One chamber · schematic</p>
  </div>}
  </Lesson>;
}
