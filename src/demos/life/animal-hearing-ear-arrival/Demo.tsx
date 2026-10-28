"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In a toy model a sound reaches the left ear at 4 ms and the right ear at 6 ms. Which ear receives it first?",
  "options": [
    "The left ear",
    "The right ear",
    "They receive it simultaneously"
  ],
  "answer": 0,
  "explanation": "The stipulated arrival times are 4 ms at the left ear and 6 ms at the right ear: left is earlier by 2 ms. Some animals can use differences between ears as directional cues. These values are invented for the comparison, not measured sensory thresholds."
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
      <g aria-hidden="true"><circle cx="15" cy="10" r="6" fill="#bca48f"/><circle cx="30" cy="10" r="6" fill="#bca48f"/><ellipse cx="22" cy="17" rx="13" ry="10" fill="#d3bfaa" stroke="#987d68"/><circle cx="18" cy="16" r="1.5" fill="#42505a"/><circle cx="26" cy="16" r="1.5" fill="#42505a"/></g><text x="44" y="22" fill="var(--fg)" fontSize="13">A scenario to investigate</text>
      <rect x="4" y="33" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="33" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
      <g transform="translate(6 37)">{seen[0] ? <g><path d="M75 27 Q40 45 42 82 Q44 108 75 110" fill="none" stroke="#b58f72" strokeWidth="6"/><text x="75" y="63" textAnchor="middle" fill="var(--fg)" fontSize="14">Left ear</text><text x="75" y="90" textAnchor="middle" fill="var(--fg)" fontSize="16">4 ms</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><path d="M75 27 Q110 45 108 82 Q106 108 75 110" fill="none" stroke="#b58f72" strokeWidth="6"/><text x="75" y="63" textAnchor="middle" fill="var(--fg)" fontSize="14">Right ear</text><text x="75" y="90" textAnchor="middle" fill="var(--fg)" fontSize="16">6 ms</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p>
  </div>}
  </Lesson>;
}
