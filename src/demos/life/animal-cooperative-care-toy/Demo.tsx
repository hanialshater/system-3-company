"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In a toy observation, 4 of 6 young survive with one caregiver and 5 of 6 with two. What can this single record establish?",
  "options": [
    "The second caregiver caused the difference",
    "Two caregivers always guarantee survival",
    "The recorded outcomes differ in this example"
  ],
  "answer": 2,
  "explanation": "The stipulated outcomes are 4 of 6 and 5 of 6, a difference of one young in this example. Other conditions could differ, and chance can matter. One observation does not establish that the number of caregivers caused the difference or that the outcome always holds."
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
      <g transform="translate(6 37)">{seen[0] ? <g><g fill="#a2c3a0"><circle cx="35" cy="45" r="9"/><circle cx="55" cy="45" r="9"/><circle cx="75" cy="45" r="9"/><circle cx="95" cy="45" r="9"/></g><text x="75" y="93" textAnchor="middle" fill="var(--fg)" fontSize="14">1 caregiver</text><text x="75" y="116" textAnchor="middle" fill="var(--fg)" fontSize="14">4 of 6 survive</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><g fill="#a2c3a0"><circle cx="25" cy="45" r="9"/><circle cx="45" cy="45" r="9"/><circle cx="65" cy="45" r="9"/><circle cx="85" cy="45" r="9"/><circle cx="105" cy="45" r="9"/></g><text x="75" y="93" textAnchor="middle" fill="var(--fg)" fontSize="14">2 caregivers</text><text x="75" y="116" textAnchor="middle" fill="var(--fg)" fontSize="14">5 of 6 survive</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p>
  </div>}
  </Lesson>;
}
