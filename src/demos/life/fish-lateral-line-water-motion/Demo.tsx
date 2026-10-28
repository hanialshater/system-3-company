"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "What kind of nearby cue can a fish’s lateral-line system detect?",
  "options": [
    "A spoken sentence",
    "A color printed on a distant label",
    "Movement and pressure changes in water"
  ],
  "answer": 2,
  "explanation": "The first panel shows a line along the body; the second adds water disturbances next to it. The lateral-line system detects water movement and pressure changes. This drawing is schematic and does not tell us what a particular fish perceives."
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
      <g transform="translate(6 8)">{seen[0] ? <g><path d="M15 65 Q65 24 130 65 Q65 106 15 65Z" fill="#b9d3db" stroke="#779aa4"/><path d="M30 65 H115" stroke="#d19a73" strokeWidth="4"/><text x="75" y="117" textAnchor="middle" fill="var(--fg)" fontSize="12">Lateral line</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><path d="M15 65 Q65 24 130 65 Q65 106 15 65Z" fill="#b9d3db" stroke="#779aa4"/><path d="M30 65 H115" stroke="#d19a73" strokeWidth="4"/><path d="M18 28 Q34 15 50 28 T82 28 T114 28" fill="none" stroke="#6c9fb7" strokeWidth="3"/><text x="75" y="117" textAnchor="middle" fill="var(--fg)" fontSize="12">Water movement</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Schematic comparison</p>
  </div>}
  </Lesson>;
}
