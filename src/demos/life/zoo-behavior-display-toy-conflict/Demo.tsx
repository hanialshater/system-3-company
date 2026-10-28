"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In a toy record, one border encounter ends after a call; another continues to physical contact. Which encounter has no contact in the stated record?",
  "options": [
    "The call encounter",
    "The contact encounter",
    "Both have contact"
  ],
  "answer": 0,
  "explanation": "The call panel ends with the two animals apart. The other panel shows contact. This is a stipulated comparison of two possible outcomes, not proof that territorial calls always prevent fights."
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
      <g transform="translate(6 37)">{seen[0] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Call</text><g transform="translate(35 80)" stroke="var(--fg)" strokeWidth="1.5"><ellipse rx="11" ry="8" fill="var(--good)"/><path d="M-4 0 Q1 8 6 0" fill="none"/><path d="M10 -1 L16 2 L10 4 Z" fill="var(--warn)"/><circle cx="6" cy="-3" r="1.2" fill="var(--fg)"/></g><g transform="translate(115 80)" stroke="var(--fg)" strokeWidth="1.5"><ellipse rx="11" ry="8" fill="var(--good)"/><path d="M-4 0 Q1 8 6 0" fill="none"/><path d="M10 -1 L16 2 L10 4 Z" fill="var(--warn)"/><circle cx="6" cy="-3" r="1.2" fill="var(--fg)"/></g><text x="75" y="58" textAnchor="middle" fontSize="13" fill="var(--fg)">♪</text><text x="75" y="124" textAnchor="middle" fontSize="13" fill="var(--fg)">Apart</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Contact</text><g transform="translate(63 80)" stroke="var(--fg)" strokeWidth="1.5"><ellipse rx="11" ry="8" fill="var(--good)"/><path d="M-4 0 Q1 8 6 0" fill="none"/><path d="M10 -1 L16 2 L10 4 Z" fill="var(--warn)"/><circle cx="6" cy="-3" r="1.2" fill="var(--fg)"/></g><g transform="translate(84 80)" stroke="var(--fg)" strokeWidth="1.5"><ellipse rx="11" ry="8" fill="var(--good)"/><path d="M-4 0 Q1 8 6 0" fill="none"/><path d="M10 -1 L16 2 L10 4 Z" fill="var(--warn)"/><circle cx="6" cy="-3" r="1.2" fill="var(--fg)"/></g><text x="76" y="124" textAnchor="middle" fontSize="13" fill="var(--fg)">Touch</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative model · not observed data</p>
  </div>}
  </Lesson>;
}
