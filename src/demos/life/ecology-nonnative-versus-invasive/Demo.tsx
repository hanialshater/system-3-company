"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "A species is living outside its native range. Does that fact alone establish that it is invasive and harmful?",
  "options": [
    "Yes, every non-native species is harmful",
    "Yes, origin alone measures its impact",
    "No, impacts need evidence"
  ],
  "answer": 2,
  "explanation": "The first panel records location outside a native range; the second highlights the separate question of impact. A non-native species is not automatically shown to be invasive merely by its origin. Definitions and impacts need context and evidence."
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
      <g transform="translate(6 8)">{seen[0] ? <g><g transform="translate(48 60)"><ellipse cx="0" cy="0" rx="13" ry="8" fill="#a0b8c1" stroke="#6c8891"/><circle cx="-10" cy="-5" r="6" fill="#a0b8c1"/><path d="M-15 -5 L-21 -2 L-15 0Z" fill="#d4a46d"/><path d="M-3 0 Q5 -10 10 -2" fill="none" stroke="#6c8891" strokeWidth="2"/></g><path d="M76 60 H123 M111 50 L123 60 L111 70" stroke="#7aa3b3" strokeWidth="3" fill="none"/><text x="75" y="105" textAnchor="middle" fill="var(--fg)" fontSize="12">Outside native range</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><g transform="translate(48 60)"><ellipse cx="0" cy="0" rx="13" ry="8" fill="#a0b8c1" stroke="#6c8891"/><circle cx="-10" cy="-5" r="6" fill="#a0b8c1"/><path d="M-15 -5 L-21 -2 L-15 0Z" fill="#d4a46d"/><path d="M-3 0 Q5 -10 10 -2" fill="none" stroke="#6c8891" strokeWidth="2"/></g><path d="M91 32 Q122 26 125 53 Q127 78 99 81 Q82 82 80 66 Q77 48 91 32Z" fill="#e3e8df" stroke="#a4b4aa"/><text x="103" y="64" textAnchor="middle" fill="var(--fg)" fontSize="20">?</text><text x="75" y="111" textAnchor="middle" fill="var(--fg)" fontSize="12">Impact requires study</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p>
  </div>}
  </Lesson>;
}
