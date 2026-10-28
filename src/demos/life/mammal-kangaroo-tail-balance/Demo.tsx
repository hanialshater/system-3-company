"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "During a kangaroo’s hopping, what role can its tail contribute?",
  "options": [
    "It helps with balance",
    "It is a tank for breathing",
    "It replaces both hind legs"
  ],
  "answer": 0,
  "explanation": "The diagram makes the extended tail visible behind the body during a hop. It can contribute to balance as the body moves. This sketch is not a measurement of the forces, and kangaroos use the tail in other ways during slower movement."
};
export default function Demo({slug}:{slug:string}) {
  const [shown,setShown] = useState(false);
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Open the schematic evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={shown ? model.explanation : "Schematic evidence hidden until exploration."}>
      {shown ? <g><ellipse cx="170" cy="82" rx="45" ry="34" fill="#d4b99a" stroke="#927c63" strokeWidth="3"/><path d="M127 85 Q80 91 35 64" fill="none" stroke="#a78b6f" strokeWidth="11" strokeLinecap="round"/><path d="M180 106 L200 134 L230 135 M162 108 L163 137 L192 138" fill="none" stroke="#927c63" strokeWidth="7" strokeLinecap="round"/><text x="70" y="132" textAnchor="middle" fill="var(--fg)" fontSize="14">Tail</text><text x="170" y="44" textAnchor="middle" fill="var(--fg)" fontSize="14">Body</text></g> : <g><ellipse cx="170" cy="82" rx="45" ry="34" fill="var(--bg-2)" stroke="var(--line)" strokeWidth="3"/></g>}
    </svg>
    <Row><Control disabled={locked || shown} onClick={()=>{setShown(true);interact();}}>Explore the evidence</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Hopping animal · schematic</p>
  </div>}
  </Lesson>;
}
