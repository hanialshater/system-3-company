"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "A toy scene has concealed prey that produces a weak electric field. Which cue is available to an electroreceptive predator in this model?",
  "options": [
    "A scent-free shadow",
    "The electric field",
    "A visible silhouette"
  ],
  "answer": 1,
  "explanation": "The prey outline is hidden below the sediment, while curves indicate a stipulated electric field. Some fishes can detect weak electric fields with specialized receptors; the drawing is a schematic, not a measurement of detection range."
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
      <g transform="translate(6 37)">{seen[0] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Visual view</text><rect x="12" y="89" width="128" height="22" rx="4" fill="var(--warn)"/><text x="76" y="64" textAnchor="middle" fontSize="13" fill="var(--fg)">Prey hidden</text><text x="76" y="132" textAnchor="middle" fontSize="13" fill="var(--fg)">Sediment</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Field cue</text><rect x="12" y="89" width="128" height="22" rx="4" fill="var(--warn)"/><g transform="translate(37 48)" fill="var(--good)" stroke="var(--fg)" strokeWidth="1.5"><path d="M-23 0 Q-8 -12 12 -7 L21 0 L12 7 Q-8 12 -23 0 Z"/><path d="M-8 -7 L0 -16 L4 -8 M-22 -1 L-30 -10 L-29 9 Z"/><circle cx="14" cy="-2" r="1.4" fill="var(--fg)"/></g><circle cx="76" cy="99" r="5" fill="var(--fg)"/><path d="M45 82 Q76 42 107 82 M55 88 Q76 62 97 88" stroke="var(--good)" strokeWidth="3" fill="none"/><text x="76" y="132" textAnchor="middle" fontSize="13" fill="var(--fg)">Schematic field</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative model · not observed data</p>
  </div>}
  </Lesson>;
}
