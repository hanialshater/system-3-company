"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In a toy habitat known to contain 10 animals, a survey detects 5. How many were present but not detected?",
  "options": [
    "15 animals",
    "5 animals",
    "10 animals"
  ],
  "answer": 1,
  "explanation": "The stipulated population contains 10 animals and the survey detects 5, leaving 10 − 5 = 5 not detected. Real surveys usually do not know the total beforehand, so a raw count alone does not reveal how many were missed."
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
      <g transform="translate(6 8)">{seen[0] ? <g><g transform="translate(32 42)"><ellipse cx="0" cy="0" rx="16" ry="9" fill="#c5a78b" stroke="#947c68"/><path d="M-10 6 V17 M9 6 V17 M8 -4 L17 -14 L21 -4" stroke="#947c68" strokeWidth="3" fill="none"/><circle cx="20" cy="-9" r="6" fill="#c5a78b"/><path d="M19 -15 L15 -21 M21 -15 L25 -21" stroke="#947c68" strokeWidth="2"/></g><g transform="translate(75 42)"><ellipse cx="0" cy="0" rx="16" ry="9" fill="#c5a78b" stroke="#947c68"/><path d="M-10 6 V17 M9 6 V17 M8 -4 L17 -14 L21 -4" stroke="#947c68" strokeWidth="3" fill="none"/><circle cx="20" cy="-9" r="6" fill="#c5a78b"/><path d="M19 -15 L15 -21 M21 -15 L25 -21" stroke="#947c68" strokeWidth="2"/></g><g transform="translate(118 42)"><ellipse cx="0" cy="0" rx="16" ry="9" fill="#c5a78b" stroke="#947c68"/><path d="M-10 6 V17 M9 6 V17 M8 -4 L17 -14 L21 -4" stroke="#947c68" strokeWidth="3" fill="none"/><circle cx="20" cy="-9" r="6" fill="#c5a78b"/><path d="M19 -15 L15 -21 M21 -15 L25 -21" stroke="#947c68" strokeWidth="2"/></g><g transform="translate(50 85)"><ellipse cx="0" cy="0" rx="16" ry="9" fill="#c5a78b" stroke="#947c68"/><path d="M-10 6 V17 M9 6 V17 M8 -4 L17 -14 L21 -4" stroke="#947c68" strokeWidth="3" fill="none"/><circle cx="20" cy="-9" r="6" fill="#c5a78b"/><path d="M19 -15 L15 -21 M21 -15 L25 -21" stroke="#947c68" strokeWidth="2"/></g><g transform="translate(100 85)"><ellipse cx="0" cy="0" rx="16" ry="9" fill="#c5a78b" stroke="#947c68"/><path d="M-10 6 V17 M9 6 V17 M8 -4 L17 -14 L21 -4" stroke="#947c68" strokeWidth="3" fill="none"/><circle cx="20" cy="-9" r="6" fill="#c5a78b"/><path d="M19 -15 L15 -21 M21 -15 L25 -21" stroke="#947c68" strokeWidth="2"/></g><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">5 detected</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><g transform="translate(32 42)"><ellipse cx="0" cy="0" rx="16" ry="9" fill="#c5a78b" stroke="#947c68"/><path d="M-10 6 V17 M9 6 V17 M8 -4 L17 -14 L21 -4" stroke="#947c68" strokeWidth="3" fill="none"/><circle cx="20" cy="-9" r="6" fill="#c5a78b"/><path d="M19 -15 L15 -21 M21 -15 L25 -21" stroke="#947c68" strokeWidth="2"/></g><g transform="translate(75 42)"><ellipse cx="0" cy="0" rx="16" ry="9" fill="#c5a78b" stroke="#947c68"/><path d="M-10 6 V17 M9 6 V17 M8 -4 L17 -14 L21 -4" stroke="#947c68" strokeWidth="3" fill="none"/><circle cx="20" cy="-9" r="6" fill="#c5a78b"/><path d="M19 -15 L15 -21 M21 -15 L25 -21" stroke="#947c68" strokeWidth="2"/></g><g transform="translate(118 42)"><ellipse cx="0" cy="0" rx="16" ry="9" fill="#c5a78b" stroke="#947c68"/><path d="M-10 6 V17 M9 6 V17 M8 -4 L17 -14 L21 -4" stroke="#947c68" strokeWidth="3" fill="none"/><circle cx="20" cy="-9" r="6" fill="#c5a78b"/><path d="M19 -15 L15 -21 M21 -15 L25 -21" stroke="#947c68" strokeWidth="2"/></g><g transform="translate(50 85)"><ellipse cx="0" cy="0" rx="16" ry="9" fill="#c5a78b" stroke="#947c68"/><path d="M-10 6 V17 M9 6 V17 M8 -4 L17 -14 L21 -4" stroke="#947c68" strokeWidth="3" fill="none"/><circle cx="20" cy="-9" r="6" fill="#c5a78b"/><path d="M19 -15 L15 -21 M21 -15 L25 -21" stroke="#947c68" strokeWidth="2"/></g><g transform="translate(100 85)"><ellipse cx="0" cy="0" rx="16" ry="9" fill="#c5a78b" stroke="#947c68"/><path d="M-10 6 V17 M9 6 V17 M8 -4 L17 -14 L21 -4" stroke="#947c68" strokeWidth="3" fill="none"/><circle cx="20" cy="-9" r="6" fill="#c5a78b"/><path d="M19 -15 L15 -21 M21 -15 L25 -21" stroke="#947c68" strokeWidth="2"/></g><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">5 not detected</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p>
  </div>}
  </Lesson>;
}
