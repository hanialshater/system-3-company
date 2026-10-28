"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "A fish has a dark back and a pale belly. In this simple scene, which surface faces a predator looking down from above?",
  "options": [
    "The pale belly",
    "Both surfaces face up equally",
    "The dark back"
  ],
  "answer": 2,
  "explanation": "The above view presents the dark back against darker water. From below, the pale belly faces brighter surface light. This common form of countershading can reduce contrast, but actual visibility depends on lighting, water and the observer."
};
export default function Demo({slug}:{slug:string}) {
  const [seen,setSeen] = useState([false,false]);
  const seenRef = useRef([false,false]);
  function open(index:0|1, interact:()=>void) {
    if (seenRef.current[index]) return;
    seenRef.current[index] = true;
    setSeen([...seenRef.current]);
    interact();
  }
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} minInteractions={2} exploreHint="Open both panels and compare their evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 155" className="stage-svg" role="img" aria-label={seen[0] && seen[1] ? model.explanation : "Two evidence panels. Open both to compare."}>
      <rect x="4" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
      <g transform="translate(6 8)">{seen[0] ? <g><rect x="12" y="23" width="126" height="65" rx="8" fill="#405f6c"/><ellipse cx="75" cy="55" rx="42" ry="16" fill="#344d59"/><text x="75" y="112" textAnchor="middle" fill="var(--fg)" fontSize="12">View from above</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><rect x="12" y="23" width="126" height="65" rx="8" fill="#cce0e4"/><ellipse cx="75" cy="55" rx="42" ry="16" fill="#e3e7df"/><text x="75" y="112" textAnchor="middle" fill="var(--fg)" fontSize="12">View from below</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Schematic comparison</p>
  </div>}
  </Lesson>;
}
