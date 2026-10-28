"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In a toy test of one sound cue, which design better isolates the cue: change only the sound, or change sound and food together?",
  "options": [
    "Change only the sound",
    "Change sound and food together",
    "Neither can be compared"
  ],
  "answer": 0,
  "explanation": "The first comparison keeps the food the same and changes the cue; the second changes both sound and food. The first makes the sound contrast more interpretable, assuming other conditions are controlled and trials are repeated. This is a design, not a measured result."
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
      <g transform="translate(6 37)">{seen[0] ? <g><text x="75" y="31" textAnchor="middle" fill="var(--fg)" fontSize="12">Cue changes</text><path d="M25 48 H125" stroke="#72a3b7" strokeWidth="3"/><text x="75" y="78" textAnchor="middle" fill="var(--fg)" fontSize="12">Food stays same</text><text x="75" y="110" textAnchor="middle" fill="var(--fg)" fontSize="12">One change</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><text x="75" y="31" textAnchor="middle" fill="var(--fg)" fontSize="12">Cue changes</text><path d="M25 48 H125" stroke="#72a3b7" strokeWidth="3"/><text x="75" y="78" textAnchor="middle" fill="var(--fg)" fontSize="12">Food changes too</text><text x="75" y="110" textAnchor="middle" fill="var(--fg)" fontSize="12">Two changes</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p>
  </div>}
  </Lesson>;
}
