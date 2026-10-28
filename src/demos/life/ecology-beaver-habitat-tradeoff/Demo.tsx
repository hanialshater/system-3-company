"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "A beaver dam turns part of a flowing channel into pond habitat. Which conclusion is best supported?",
  "options": [
    "Every species must benefit equally",
    "Every species must disappear",
    "Species using these habitats may be affected differently"
  ],
  "answer": 2,
  "explanation": "The panels distinguish a flowing-channel habitat from a pond habitat that can form upstream of a dam. Species differ in the conditions they use, so habitat change can create different benefits and costs. The drawing does not predict the abundance of a particular species."
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
      <g transform="translate(6 8)">{seen[0] ? <g><path d="M8 90 H140" stroke="#7caebd" strokeWidth="12"/><path d="M22 67 H80 M68 57 L80 67 L68 77" stroke="#7caebd" strokeWidth="3" fill="none"/><g transform="translate(108 39)"><ellipse cx="0" cy="0" rx="13" ry="8" fill="#a0b8c1" stroke="#6c8891"/><circle cx="-10" cy="-5" r="6" fill="#a0b8c1"/><path d="M-15 -5 L-21 -2 L-15 0Z" fill="#d4a46d"/><path d="M-3 0 Q5 -10 10 -2" fill="none" stroke="#6c8891" strokeWidth="2"/></g><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">Flowing habitat</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><ellipse cx="75" cy="88" rx="65" ry="27" fill="#a9d1df"/><g transform="translate(86 55)"><ellipse cx="0" cy="0" rx="20" ry="12" fill="#ae8a70" stroke="#806b5a"/><ellipse cx="23" cy="6" rx="12" ry="5" fill="#806b5a"/><circle cx="-18" cy="-4" r="9" fill="#ae8a70"/><circle cx="-21" cy="-6" r="1.6" fill="#293c40"/><path d="M-27 -1 L-31 3" stroke="#f2e5c9" strokeWidth="3"/></g><g transform="translate(35 51)"><ellipse cx="0" cy="0" rx="13" ry="8" fill="#a0b8c1" stroke="#6c8891"/><circle cx="-10" cy="-5" r="6" fill="#a0b8c1"/><path d="M-15 -5 L-21 -2 L-15 0Z" fill="#d4a46d"/><path d="M-3 0 Q5 -10 10 -2" fill="none" stroke="#6c8891" strokeWidth="2"/></g><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">Pond habitat</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p>
  </div>}
  </Lesson>;
}
