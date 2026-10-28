"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In a toy scene, one animal matches its background while another has a contrasting warning pattern. Which is harder to see against that background?",
  "options": [
    "The matching animal",
    "The contrasting animal",
    "Both patterns are identical"
  ],
  "answer": 0,
  "explanation": "The first animal is drawn with the same pattern as its background; the second has a contrasting pattern. Concealment and warning are different ideas. The toy scene shows visibility, not an actual predator’s behavior or the effectiveness of either defense."
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
      <g transform="translate(6 37)">{seen[0] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Matching</text><rect x="14" y="36" width="124" height="74" rx="4" fill="var(--warn)"/><ellipse cx="76" cy="73" rx="30" ry="18" fill="var(--warn)" stroke="var(--bg-2)" strokeDasharray="3 4"/><text x="76" y="132" textAnchor="middle" fontSize="13" fill="var(--fg)">Outline dotted</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Contrasting</text><rect x="14" y="36" width="124" height="74" rx="4" fill="var(--warn)"/><ellipse cx="76" cy="73" rx="30" ry="18" fill="var(--bg-2)"/><text x="76" y="132" textAnchor="middle" fontSize="13" fill="var(--fg)">Visible outline</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative model · not observed data</p>
  </div>}
  </Lesson>;
}
