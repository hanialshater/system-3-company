"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "A toy animal moves between feeding and resting places each day; another shifts region each season. Which journey is seasonal?",
  "options": [
    "The regional shift",
    "The daily return",
    "Both daily returns"
  ],
  "answer": 0,
  "explanation": "The first panel shows a return between feeding and resting places within a day. The second shows a regional move between seasons. The scenarios illustrate the distinction; no real route or migration schedule is implied."
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
      <g transform="translate(6 37)">{seen[0] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Daily</text><circle cx="30" cy="75" r="9" fill="var(--good)"/><circle cx="120" cy="75" r="9" fill="var(--warn)"/><line x1="43" y1="69" x2="107" y2="69" stroke="var(--fg)" strokeWidth="3"/><line x1="43" y1="81" x2="107" y2="81" stroke="var(--fg)" strokeWidth="3"/><text x="75" y="121" textAnchor="middle" fontSize="13" fill="var(--fg)">Same day</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Seasonal</text><circle cx="22" cy="75" r="9" fill="var(--good)"/><circle cx="128" cy="75" r="9" fill="var(--warn)"/><line x1="37" y1="75" x2="113" y2="75" stroke="var(--good)" strokeWidth="3"/><path d="M113 75 L104.0 71.0 L104.0 79.0 Z" fill="var(--good)"/><text x="75" y="121" textAnchor="middle" fontSize="13" fill="var(--fg)">New season</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative model · not observed data</p>
  </div>}
  </Lesson>;
}
