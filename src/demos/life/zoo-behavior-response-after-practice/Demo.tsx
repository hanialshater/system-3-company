"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In a toy test, response A stays the same across practice, while response B improves after practice. Which pattern is consistent with learning?",
  "options": [
    "Response B",
    "Response A",
    "Both must be reflexes"
  ],
  "answer": 0,
  "explanation": "Panel A shows the same stipulated response on each trial. Panel B shows a response changing after practice. That change is consistent with learning, although fatigue, growth or other factors would need controls before concluding why."
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
      <g transform="translate(6 37)">{seen[0] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Response A</text><rect x="28" y="82" width="24" height="27" rx="4" fill="var(--good)"/><rect x="64" y="82" width="24" height="27" rx="4" fill="var(--good)"/><rect x="100" y="82" width="24" height="27" rx="4" fill="var(--good)"/><text x="75" y="127" textAnchor="middle" fontSize="13" fill="var(--fg)">Same</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Response B</text><rect x="28" y="95" width="24" height="14" rx="4" fill="var(--good)"/><rect x="64" y="82" width="24" height="27" rx="4" fill="var(--good)"/><rect x="100" y="68" width="24" height="41" rx="4" fill="var(--good)"/><text x="75" y="127" textAnchor="middle" fontSize="13" fill="var(--fg)">Changes</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative model · not observed data</p>
  </div>}
  </Lesson>;
}
