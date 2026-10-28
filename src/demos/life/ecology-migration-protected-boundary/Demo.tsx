"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "A toy migration route begins inside a protected area and ends outside it. Which part is outside that area?",
  "options": [
    "The segment beyond the boundary",
    "The segment entirely inside the boundary",
    "The whole route is necessarily inside"
  ],
  "answer": 0,
  "explanation": "The highlighted area marks the protected boundary; the arrow extends beyond it. Only the segment inside lies within that protected area. A protected area can help along part of a migration, but its boundary does not establish protection everywhere on the route."
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
    <svg viewBox="0 0 340 155" className="stage-svg" role="img" aria-label={seen[0] && seen[1] ? model.explanation : "Two ecological evidence panels. Open both to compare."}>
      <rect x="4" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
      <g transform="translate(6 8)">{seen[0] ? <g><rect x="12" y="28" width="116" height="70" rx="10" fill="#b8d4ad" stroke="#87aa80"/><g transform="translate(60 63)"><ellipse cx="0" cy="0" rx="13" ry="8" fill="#a0b8c1" stroke="#6c8891"/><circle cx="-10" cy="-5" r="6" fill="#a0b8c1"/><path d="M-15 -5 L-21 -2 L-15 0Z" fill="#d4a46d"/><path d="M-3 0 Q5 -10 10 -2" fill="none" stroke="#6c8891" strokeWidth="2"/></g><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">Protected area</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><rect x="12" y="28" width="80" height="70" rx="10" fill="#b8d4ad" stroke="#87aa80"/><g transform="translate(42 63)"><ellipse cx="0" cy="0" rx="13" ry="8" fill="#a0b8c1" stroke="#6c8891"/><circle cx="-10" cy="-5" r="6" fill="#a0b8c1"/><path d="M-15 -5 L-21 -2 L-15 0Z" fill="#d4a46d"/><path d="M-3 0 Q5 -10 10 -2" fill="none" stroke="#6c8891" strokeWidth="2"/></g><path d="M55 63 H134 M122 53 L134 63 L122 73" stroke="#bc8365" strokeWidth="3" fill="none"/><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">Route crosses edge</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p>
  </div>}
  </Lesson>;
}
