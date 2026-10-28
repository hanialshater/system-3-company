"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In a toy model, a corridor allows animals from two groups to meet. If one group carries a transmissible disease, what additional possibility must be considered?",
  "options": [
    "A route makes transmission impossible",
    "The disease may spread through contact",
    "Every animal is guaranteed to become ill"
  ],
  "answer": 1,
  "explanation": "The corridor in the second panel creates a possible connection between groups, one labeled as carrying a disease in the stipulated scenario. Contact can create opportunities for transmission. Actual spread depends on contacts, infection and other factors; it is not guaranteed."
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
      <g transform="translate(6 8)">{seen[0] ? <g><rect x="10" y="33" width="49" height="65" rx="10" fill="#aacaa3"/><rect x="91" y="33" width="49" height="65" rx="10" fill="#aacaa3"/><g transform="translate(36 65)"><ellipse cx="0" cy="0" rx="16" ry="9" fill="#c5a78b" stroke="#947c68"/><path d="M-10 6 V17 M9 6 V17 M8 -4 L17 -14 L21 -4" stroke="#947c68" strokeWidth="3" fill="none"/><circle cx="20" cy="-9" r="6" fill="#c5a78b"/><path d="M19 -15 L15 -21 M21 -15 L25 -21" stroke="#947c68" strokeWidth="2"/></g><g transform="translate(115 65)"><ellipse cx="0" cy="0" rx="16" ry="9" fill="#c5a78b" stroke="#947c68"/><path d="M-10 6 V17 M9 6 V17 M8 -4 L17 -14 L21 -4" stroke="#947c68" strokeWidth="3" fill="none"/><circle cx="20" cy="-9" r="6" fill="#c5a78b"/><path d="M19 -15 L15 -21 M21 -15 L25 -21" stroke="#947c68" strokeWidth="2"/></g><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">Separate groups</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><rect x="10" y="33" width="49" height="65" rx="10" fill="#aacaa3"/><rect x="91" y="33" width="49" height="65" rx="10" fill="#aacaa3"/><rect x="58" y="58" width="34" height="15" fill="#aacaa3"/><g transform="translate(36 65)"><ellipse cx="0" cy="0" rx="16" ry="9" fill="#c5a78b" stroke="#947c68"/><path d="M-10 6 V17 M9 6 V17 M8 -4 L17 -14 L21 -4" stroke="#947c68" strokeWidth="3" fill="none"/><circle cx="20" cy="-9" r="6" fill="#c5a78b"/><path d="M19 -15 L15 -21 M21 -15 L25 -21" stroke="#947c68" strokeWidth="2"/></g><g transform="translate(115 65)"><ellipse cx="0" cy="0" rx="16" ry="9" fill="#c5a78b" stroke="#947c68"/><path d="M-10 6 V17 M9 6 V17 M8 -4 L17 -14 L21 -4" stroke="#947c68" strokeWidth="3" fill="none"/><circle cx="20" cy="-9" r="6" fill="#c5a78b"/><path d="M19 -15 L15 -21 M21 -15 L25 -21" stroke="#947c68" strokeWidth="2"/></g><circle cx="35" cy="40" r="5" fill="#c87a6d"/><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">Possible contact</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p>
  </div>}
  </Lesson>;
}
