"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In a toy study, food follows a bell. Later the bell alone elicits salivation. What does the later response illustrate?",
  "options": [
    "A change in the food",
    "A new food reward",
    "A learned cue–food association"
  ],
  "answer": 2,
  "explanation": "In the first panel, bell and food appear together. In the later panel, the bell occurs alone and the stipulated salivation still appears. That pattern is consistent with a learned cue–food association; the diagrams are not real observations."
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
      <g transform="translate(6 37)">{seen[0] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Pairing</text><text x="42" y="52" textAnchor="middle" fontSize="13" fill="var(--fg)">Bell</text><text x="107" y="52" textAnchor="middle" fontSize="13" fill="var(--fg)">Food</text><line x1="43" y1="67" x2="107" y2="67" stroke="var(--good)" strokeWidth="3"/><path d="M107 67 L98.0 63.0 L98.0 71.0 Z" fill="var(--good)"/><text x="76" y="101" textAnchor="middle" fontSize="13" fill="var(--fg)">Salivation</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Later</text><text x="40" y="52" textAnchor="middle" fontSize="13" fill="var(--fg)">Bell</text><line x1="58" y1="66" x2="107" y2="66" stroke="var(--good)" strokeWidth="3"/><path d="M107 66 L98.0 62.0 L98.0 70.0 Z" fill="var(--good)"/><text x="108" y="87" textAnchor="middle" fontSize="13" fill="var(--fg)">Salivation</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative model · not observed data</p>
  </div>}
  </Lesson>;
}
