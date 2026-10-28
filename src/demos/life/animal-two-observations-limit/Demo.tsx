"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In one visit, animal A approaches a novel object and animal B stays back. What does that observation alone establish?",
  "options": [
    "Every member of the species approaches",
    "No member of the species ever approaches",
    "Those two actions occurred in that visit"
  ],
  "answer": 2,
  "explanation": "The panels show different actions by two individuals in one stipulated observation. That supports a statement about those actions, not a species-wide rule or a reliable frequency. A larger, representative and repeated study would be needed for broader inference."
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
      <g transform="translate(6 37)">{seen[0] ? <g><g><circle cx="25.9" cy="58.2" r="5.88" fill="#bca48f"/><circle cx="44.1" cy="58.2" r="5.88" fill="#bca48f"/><circle cx="35" cy="68" r="14" fill="#d3bfaa" stroke="#987d68" strokeWidth="1"/><circle cx="30.1" cy="66.6" r="1.68" fill="#42505a"/><circle cx="39.9" cy="66.6" r="1.68" fill="#42505a"/></g><path d="M54 68 H94 M84 60 L94 68 L84 76" stroke="#83a6ad" strokeWidth="3" fill="none"/><rect x="105" y="52" width="22" height="32" fill="#dbb777"/><text x="75" y="120" textAnchor="middle" fill="var(--fg)" fontSize="12">A approaches</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><g><circle cx="25.9" cy="58.2" r="5.88" fill="#bca48f"/><circle cx="44.1" cy="58.2" r="5.88" fill="#bca48f"/><circle cx="35" cy="68" r="14" fill="#d3bfaa" stroke="#987d68" strokeWidth="1"/><circle cx="30.1" cy="66.6" r="1.68" fill="#42505a"/><circle cx="39.9" cy="66.6" r="1.68" fill="#42505a"/></g><rect x="105" y="52" width="22" height="32" fill="#dbb777"/><text x="75" y="120" textAnchor="middle" fill="var(--fg)" fontSize="12">B stays back</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p>
  </div>}
  </Lesson>;
}
