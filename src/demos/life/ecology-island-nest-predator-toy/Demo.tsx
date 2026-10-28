"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In a toy island scenario, a newly introduced predator can reach ground nests and eat eggs. Which direct risk is added?",
  "options": [
    "Every egg is guaranteed to survive",
    "Eggs can be eaten by the predator",
    "Every bird must become a fish"
  ],
  "answer": 1,
  "explanation": "The first panel shows a ground nest; the second adds a stipulated predator with access to it. Egg predation is an added possible risk in this toy example. The diagram is not an observed island or a prediction that every nest will be lost."
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
      <g transform="translate(6 8)">{seen[0] ? <g><g transform="translate(70 35)"><ellipse cx="0" cy="0" rx="13" ry="8" fill="#a0b8c1" stroke="#6c8891"/><circle cx="-10" cy="-5" r="6" fill="#a0b8c1"/><path d="M-15 -5 L-21 -2 L-15 0Z" fill="#d4a46d"/><path d="M-3 0 Q5 -10 10 -2" fill="none" stroke="#6c8891" strokeWidth="2"/></g><path d="M35 85 Q75 107 115 85" fill="none" stroke="#a88b6a" strokeWidth="6"/><ellipse cx="65" cy="86" rx="7" ry="10" fill="#e9dcc1"/><ellipse cx="85" cy="86" rx="7" ry="10" fill="#e9dcc1"/><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">Ground nest</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><g transform="translate(35 35)"><ellipse cx="0" cy="0" rx="13" ry="8" fill="#a0b8c1" stroke="#6c8891"/><circle cx="-10" cy="-5" r="6" fill="#a0b8c1"/><path d="M-15 -5 L-21 -2 L-15 0Z" fill="#d4a46d"/><path d="M-3 0 Q5 -10 10 -2" fill="none" stroke="#6c8891" strokeWidth="2"/></g><path d="M25 86 Q64 105 98 86" fill="none" stroke="#a88b6a" strokeWidth="6"/><ellipse cx="57" cy="86" rx="7" ry="10" fill="#e9dcc1"/><path d="M116 68 L125 51 L132 68Z" fill="#9a8e80"/><ellipse cx="124" cy="77" rx="17" ry="12" fill="#9a8e80"/><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">Predator can reach</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p>
  </div>}
  </Lesson>;
}
