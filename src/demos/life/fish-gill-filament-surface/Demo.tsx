"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In this schematic, which surface has more exposed edge available for exchange: a smooth edge or a folded edge?",
  "options": [
    "The folded edge",
    "The smooth edge",
    "They must have the same edge length"
  ],
  "answer": 0,
  "explanation": "The folded edge exposes more boundary within the same width in this drawing. Gill filaments and their smaller lamellae increase the surface available for gas exchange. The drawing is a geometry schematic, not a measurement of a fish gill."
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
      <g transform="translate(6 8)">{seen[0] ? <g><path d="M18 72 H128" stroke="#bd7775" strokeWidth="6" fill="none"/><text x="75" y="108" textAnchor="middle" fill="var(--fg)" fontSize="12">Smooth</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><path d="M18 72 L28 32 L38 72 L48 32 L58 72 L68 32 L78 72 L88 32 L98 72 L108 32 L118 72" stroke="#bd7775" strokeWidth="4" fill="none"/><text x="75" y="108" textAnchor="middle" fill="var(--fg)" fontSize="12">Folded</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Schematic comparison</p>
  </div>}
  </Lesson>;
}
