"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In a toy model with fish mass and water density fixed, which bladder size displaces more water?",
  "options": [
    "The smaller bladder",
    "Both displace the same water",
    "The larger bladder"
  ],
  "answer": 2,
  "explanation": "In this simplified comparison, fish mass and water density stay fixed while the illustrated overall volume changes. The larger volume displaces more water and increases buoyant force, all else equal. Real fish regulate gases and are more complex than this model."
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
      <g transform="translate(6 8)">{seen[0] ? <g><ellipse cx="75" cy="66" rx="53" ry="35" fill="#c3d9df" stroke="#779aa4"/><ellipse cx="75" cy="65" rx="15" ry="10" fill="#edd6a1" stroke="#ad986c"/><text x="75" y="119" textAnchor="middle" fill="var(--fg)" fontSize="12">Smaller volume</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><ellipse cx="75" cy="66" rx="60" ry="40" fill="#c3d9df" stroke="#779aa4"/><ellipse cx="75" cy="65" rx="30" ry="20" fill="#edd6a1" stroke="#ad986c"/><text x="75" y="119" textAnchor="middle" fill="var(--fg)" fontSize="12">Larger volume</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Schematic comparison</p>
  </div>}
  </Lesson>;
}
