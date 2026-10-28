"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In a toy map, a forager goes 3 steps north and 4 steps east from its nest. Which direct direction points back to the nest?",
  "options": [
    "Southeast",
    "Southwest",
    "Northeast"
  ],
  "answer": 1,
  "explanation": "The outward route ends north and east of the nest. The return arrow points southwest, undoing the net displacement. This is a toy map of path integration, not evidence that a particular animal uses these exact distances."
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
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} minInteractions={2} exploreHint="Open both panels and compare the evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 184" className="stage-svg" role="img" aria-label={seen[0] && seen[1] ? model.explanation : "Two evidence panels. Open both to compare."}>
      <text x="170" y="22" textAnchor="middle" fill="var(--fg)" fontSize="13">Illustrative comparison</text>
      <rect x="4" y="33" width="154" height="148" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="33" width="154" height="148" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
      <g transform="translate(6 37)">{seen[0] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Outward</text><line x1="24" y1="111" x2="24" y2="45" stroke="var(--warn)" strokeWidth="4"/><line x1="24" y1="45" x2="119" y2="45" stroke="var(--warn)" strokeWidth="4"/><text x="46" y="80" textAnchor="middle" fontSize="11" fill="var(--fg)">3 N</text><text x="70" y="34" textAnchor="middle" fontSize="11" fill="var(--fg)">4 E</text><text x="24" y="132" textAnchor="middle" fontSize="13" fill="var(--fg)">Nest</text><text x="119" y="29" textAnchor="middle" fontSize="13" fill="var(--fg)">End</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Return</text><circle cx="120" cy="45" r="5" fill="var(--good)"/><line x1="118" y1="48" x2="30" y2="108" stroke="var(--good)" strokeWidth="3"/><path d="M30 108 L39.7 106.2 L35.2 99.6 Z" fill="var(--good)"/><text x="30" y="132" textAnchor="middle" fontSize="13" fill="var(--fg)">Nest</text><text x="116" y="29" textAnchor="middle" fontSize="13" fill="var(--fg)">End</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative model · not observed data</p>
  </div>}
  </Lesson>;
}
