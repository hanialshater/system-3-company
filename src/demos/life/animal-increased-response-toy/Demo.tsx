"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In this toy record, response levels after four cues are 1, 2, 3, 4. What pattern is shown?",
  "options": [
    "An increasing response",
    "A decreasing response",
    "A constant response"
  ],
  "answer": 0,
  "explanation": "The response rises from 1 to 4 across the four stipulated trials. An increasing response may be consistent with sensitization, while a decreasing response may be consistent with habituation. A single sequence does not by itself prove the underlying mechanism."
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
      <g transform="translate(6 37)">{seen[0] ? <g><path d="M24 102 H125 M25 102 V23" stroke="var(--line)" strokeWidth="2"/><rect x="45" y="84" width="22" height="18" fill="#8cb7b2"/><rect x="82" y="66" width="22" height="36" fill="#8cb7b2"/><text x="56" y="120" textAnchor="middle" fill="var(--fg)" fontSize="12">1</text><text x="93" y="120" textAnchor="middle" fill="var(--fg)" fontSize="12">2</text><text x="56" y="79" textAnchor="middle" fill="var(--fg)" fontSize="12">1</text><text x="93" y="61" textAnchor="middle" fill="var(--fg)" fontSize="12">2</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><path d="M24 102 H125 M25 102 V23" stroke="var(--line)" strokeWidth="2"/><rect x="45" y="48" width="22" height="54" fill="#8cb7b2"/><rect x="82" y="30" width="22" height="72" fill="#8cb7b2"/><text x="56" y="120" textAnchor="middle" fill="var(--fg)" fontSize="12">3</text><text x="93" y="120" textAnchor="middle" fill="var(--fg)" fontSize="12">4</text><text x="56" y="43" textAnchor="middle" fill="var(--fg)" fontSize="12">3</text><text x="93" y="26" textAnchor="middle" fill="var(--fg)" fontSize="12">4</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p>
  </div>}
  </Lesson>;
}
