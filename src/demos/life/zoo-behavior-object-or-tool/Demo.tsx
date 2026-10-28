"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In a toy observation, animal A moves a stick aside; animal B uses a stick to pull food within reach. Which action is an example of tool use under this stated definition?",
  "options": [
    "Using the stick to reach food",
    "Moving the stick aside",
    "Both actions are identical"
  ],
  "answer": 0,
  "explanation": "In panel A, the stick is moved aside. In panel B, the stick helps bring food within reach. Under this lesson’s operational definition, the second action is tool use; a real study would need sufficient evidence about how the object is used."
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
      <g transform="translate(6 37)">{seen[0] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">A: move</text><g transform="translate(30 82)" stroke="var(--fg)" strokeWidth="2"><ellipse rx="13" ry="8" fill="var(--good)"/><circle cx="-9" cy="-7" r="4" fill="var(--good)"/><circle cx="5" cy="-2" r="1.6" fill="var(--fg)"/><path d="M-13 3 Q-22 0 -23 8" fill="none"/></g><line x1="43" y1="85" x2="94" y2="85" stroke="var(--warn)" strokeWidth="5"/><line x1="65" y1="68" x2="110" y2="68" stroke="var(--good)" strokeWidth="3"/><path d="M110 68 L101.0 64.0 L101.0 72.0 Z" fill="var(--good)"/></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">B: reach</text><g transform="translate(30 82)" stroke="var(--fg)" strokeWidth="2"><ellipse rx="13" ry="8" fill="var(--good)"/><circle cx="-9" cy="-7" r="4" fill="var(--good)"/><circle cx="5" cy="-2" r="1.6" fill="var(--fg)"/><path d="M-13 3 Q-22 0 -23 8" fill="none"/></g><line x1="43" y1="84" x2="111" y2="84" stroke="var(--warn)" strokeWidth="5"/><circle cx="119" cy="84" r="8" fill="var(--good)"/><line x1="118" y1="59" x2="69" y2="59" stroke="var(--good)" strokeWidth="3"/><path d="M69 59 L78.0 63.0 L78.0 55.0 Z" fill="var(--good)"/></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative model · not observed data</p>
  </div>}
  </Lesson>;
}
