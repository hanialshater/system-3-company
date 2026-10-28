"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "A toy map has animal sightings in surveyed places and no observations in an unsurveyed area. Does the blank area prove the animal is absent there?",
  "options": [
    "Yes, the animal cannot move",
    "No, the area has not been surveyed",
    "Yes, blank always means absent"
  ],
  "answer": 1,
  "explanation": "The first panel shows sightings in a surveyed area; the second marks a separate area that was not surveyed. A blank unsurveyed area does not establish absence. A targeted survey can reduce uncertainty, while imperfect detection still needs consideration."
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
      <g transform="translate(6 8)">{seen[0] ? <g><rect x="10" y="30" width="130" height="70" rx="8" fill="#c2d9b8"/><circle cx="37" cy="52" r="5" fill="#b97966"/><circle cx="65" cy="71" r="5" fill="#b97966"/><g transform="translate(105 71)"><ellipse cx="0" cy="0" rx="16" ry="9" fill="#c5a78b" stroke="#947c68"/><path d="M-10 6 V17 M9 6 V17 M8 -4 L17 -14 L21 -4" stroke="#947c68" strokeWidth="3" fill="none"/><circle cx="20" cy="-9" r="6" fill="#c5a78b"/><path d="M19 -15 L15 -21 M21 -15 L25 -21" stroke="#947c68" strokeWidth="2"/></g><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">Surveyed sightings</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><rect x="10" y="30" width="130" height="70" rx="8" fill="#dce5d8" stroke="#9aac9d" strokeDasharray="5 4"/><text x="75" y="72" textAnchor="middle" fill="var(--fg)" fontSize="18">?</text><text x="75" y="125" textAnchor="middle" fill="var(--fg)" fontSize="12">Not surveyed</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p>
  </div>}
  </Lesson>;
}
