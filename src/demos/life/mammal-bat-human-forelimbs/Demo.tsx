"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "A human arm and a bat wing have a similar arrangement of upper arm, forearm and digits. What does this shared pattern help reveal?",
  "options": [
    "The same diet",
    "A common evolutionary origin",
    "The same way of moving"
  ],
  "answer": 1,
  "explanation": "The highlighted diagrams show an upper bone, two forearm bones and digits in both limbs. Their proportions and uses differ, but the arrangement is homologous: it is evidence of shared ancestry rather than identical function."
};
export default function Demo({slug}:{slug:string}) {
  const [shown,setShown] = useState(false);
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Open the schematic evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={shown ? model.explanation : "Schematic evidence hidden until exploration."}>
      {shown ? <g><g strokeWidth="6" strokeLinecap="round" fill="none"><path d="M35 62 H75" stroke="#e5a368"/><path d="M80 57 L120 52 M80 67 L120 72" stroke="#70a2bc"/><path d="M125 62 L154 45 M125 62 L157 60 M125 62 L154 77" stroke="#8ab28c"/><path d="M182 62 H222" stroke="#e5a368"/><path d="M227 57 L256 52 M227 67 L256 72" stroke="#70a2bc"/><path d="M260 62 L310 31 M260 62 L316 61 M260 62 L310 98" stroke="#8ab28c"/></g><text x="94" y="135" textAnchor="middle" fill="var(--fg)" fontSize="14">Human arm</text><text x="263" y="135" textAnchor="middle" fill="var(--fg)" fontSize="14">Bat wing</text></g> : <g><text x="82" y="95" textAnchor="middle" fill="var(--fg)" fontSize="15">Human arm</text><text x="256" y="95" textAnchor="middle" fill="var(--fg)" fontSize="15">Bat wing</text></g>}
    </svg>
    <Row><Control disabled={locked || shown} onClick={()=>{setShown(true);interact();}}>Explore the evidence</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Upper bone · forearm · digits</p>
  </div>}
  </Lesson>;
}
