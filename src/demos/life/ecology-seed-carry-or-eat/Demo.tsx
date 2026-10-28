"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In this toy example, one seed is carried and dropped intact elsewhere; another is eaten and destroyed. Which seed was dispersed intact?",
  "options": [
    "Both were dispersed intact",
    "The carried, dropped seed",
    "The eaten, destroyed seed"
  ],
  "answer": 1,
  "explanation": "The bird carries one stipulated seed and drops it intact at a new location; the other seed is eaten and destroyed. Seed dispersal and seed predation have different consequences for that seed. An intact dropped seed is not guaranteed to germinate."
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
      <g transform="translate(6 8)">{seen[0] ? <g><g transform="translate(35 57)"><path d="M0 0 V32" stroke="#9d8469" strokeWidth="5"/><circle cx="0" cy="-4" r="17" fill="#a1c49b"/></g><g transform="translate(90 35)"><ellipse cx="0" cy="0" rx="13" ry="8" fill="#a0b8c1" stroke="#6c8891"/><circle cx="-10" cy="-5" r="6" fill="#a0b8c1"/><path d="M-15 -5 L-21 -2 L-15 0Z" fill="#d4a46d"/><path d="M-3 0 Q5 -10 10 -2" fill="none" stroke="#6c8891" strokeWidth="2"/></g><circle cx="110" cy="85" r="5" fill="#dfaa6f"/><path d="M43 92 H99 M87 82 L99 92 L87 102" stroke="#719ba2" strokeWidth="3" fill="none"/><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">Carried, dropped</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><g transform="translate(55 55)"><ellipse cx="0" cy="0" rx="13" ry="8" fill="#a0b8c1" stroke="#6c8891"/><circle cx="-10" cy="-5" r="6" fill="#a0b8c1"/><path d="M-15 -5 L-21 -2 L-15 0Z" fill="#d4a46d"/><path d="M-3 0 Q5 -10 10 -2" fill="none" stroke="#6c8891" strokeWidth="2"/></g><circle cx="34" cy="55" r="5" fill="#dfaa6f"/><path d="M23 75 L41 92 M41 75 L23 92" stroke="#bd7775" strokeWidth="3"/><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">Eaten, destroyed</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p>
  </div>}
  </Lesson>;
}
