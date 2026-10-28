"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In a toy study, light is held constant. Which activity record is consistent with a continuing daily rhythm?",
  "options": [
    "No activity is recorded",
    "Activity peaks at intervals",
    "Activity stays flat"
  ],
  "answer": 1,
  "explanation": "The first record has repeated activity peaks under the stipulated constant light. The second stays flat. Repetition under constant conditions is consistent with an internal rhythm, but further controls and more cycles are needed to characterize it."
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
      <text x="170" y="22" textAnchor="middle" fill="var(--fg)" fontSize="13">Constant light · toy record</text>
      <rect x="4" y="33" width="154" height="148" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="33" width="154" height="148" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
      <g transform="translate(6 37)">{seen[0] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Record A</text><line x1="18" y1="110" x2="132" y2="110" stroke="var(--fg)" strokeWidth="3"/><line x1="18" y1="35" x2="18" y2="110" stroke="var(--fg)" strokeWidth="3"/><rect x="33" y="68" width="12" height="42" rx="4" fill="var(--good)"/><rect x="69" y="68" width="12" height="42" rx="4" fill="var(--good)"/><rect x="105" y="68" width="12" height="42" rx="4" fill="var(--good)"/><text x="39" y="128" textAnchor="middle" fontSize="11" fill="var(--fg)">0 h</text><text x="75" y="128" textAnchor="middle" fontSize="11" fill="var(--fg)">24 h</text><text x="111" y="128" textAnchor="middle" fontSize="11" fill="var(--fg)">48 h</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Record B</text><line x1="18" y1="110" x2="132" y2="110" stroke="var(--fg)" strokeWidth="3"/><line x1="18" y1="35" x2="18" y2="110" stroke="var(--fg)" strokeWidth="3"/><line x1="22" y1="81" x2="128" y2="81" stroke="var(--good)" strokeWidth="4"/><text x="76" y="132" textAnchor="middle" fontSize="13" fill="var(--fg)">Time →</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative model · not observed data</p>
  </div>}
  </Lesson>;
}
