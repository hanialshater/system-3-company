"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In a toy trial, food follows a lever press. Which before-and-later counts would show an increase in pressing?",
  "options": [
    "2 then 2 presses",
    "1 then 4 presses",
    "4 then 1 press"
  ],
  "answer": 1,
  "explanation": "The stipulated record shows one press before and four after the rewarded action. It illustrates a change in action frequency after a consequence; without further controls this tiny record does not establish why the change occurred."
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
      <text x="170" y="22" textAnchor="middle" fill="var(--fg)" fontSize="13">Illustrative comparison</text>
      <rect x="4" y="33" width="154" height="148" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="33" width="154" height="148" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
      <g transform="translate(6 37)">{seen[0] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Earlier</text><rect x="37" y="64" width="14" height="48" rx="4" fill="var(--good)"/><circle cx="44" cy="56" r="7" fill="var(--good)"/><g transform="translate(100 61)" stroke="var(--fg)" strokeWidth="2"><ellipse rx="13" ry="8" fill="var(--good)"/><circle cx="-9" cy="-7" r="4" fill="var(--good)"/><circle cx="5" cy="-2" r="1.6" fill="var(--fg)"/><path d="M-13 3 Q-22 0 -23 8" fill="none"/></g><circle cx="112" cy="80" r="4" fill="var(--warn)"/><text x="112" y="92" textAnchor="middle" fontSize="11" fill="var(--fg)">food</text><text x="101" y="110" textAnchor="middle" fontSize="13" fill="var(--fg)">1 press</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Later</text><rect x="37" y="64" width="14" height="48" rx="4" fill="var(--good)"/><circle cx="44" cy="56" r="7" fill="var(--good)"/><g transform="translate(100 61)" stroke="var(--fg)" strokeWidth="2"><ellipse rx="13" ry="8" fill="var(--good)"/><circle cx="-9" cy="-7" r="4" fill="var(--good)"/><circle cx="5" cy="-2" r="1.6" fill="var(--fg)"/><path d="M-13 3 Q-22 0 -23 8" fill="none"/></g><text x="101" y="104" textAnchor="middle" fontSize="13" fill="var(--fg)">4 presses</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative model · not observed data</p>
  </div>}
  </Lesson>;
}
