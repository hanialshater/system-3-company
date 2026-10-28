"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "A toy drawing shows an animal’s paw moving back and forth on a branch. Which statement records the depicted action?",
  "options": [
    "It felt embarrassed",
    "It scratched the branch",
    "It wanted attention"
  ],
  "answer": 1,
  "explanation": "The two panels show the paw at different positions on the branch, with arrows indicating its back-and-forth motion. The action is depicted; a motive such as wanting attention is an interpretation. This is an illustrative sequence, not a real video or evidence of the animal’s feelings."
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
      <g transform="translate(6 37)">{seen[0] ? <g><path d="M42 20 V111 M36 40 L48 31 M36 75 L48 66" stroke="#a2896a" strokeWidth="9" fill="none"/><ellipse cx="105" cy="82" rx="28" ry="20" fill="#c7b4a1" stroke="#927b69" strokeWidth="2"/><circle cx="94" cy="58" r="16" fill="#d3bfaa" stroke="#927b69" strokeWidth="2"/><circle cx="83" cy="46" r="7" fill="#bca48f"/><circle cx="101" cy="43" r="7" fill="#bca48f"/><circle cx="89" cy="57" r="2" fill="#42505a"/><path d="M88 75 Q76 70 50 48" stroke="#927b69" strokeWidth="5" fill="none" strokeLinecap="round"/><circle cx="50" cy="48" r="4" fill="#e5c6a6" stroke="#927b69"/><text x="75" y="126" textAnchor="middle" fill="var(--fg)" fontSize="12">Paw high</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><path d="M42 20 V111 M36 40 L48 31 M36 75 L48 66" stroke="#a2896a" strokeWidth="9" fill="none"/><ellipse cx="105" cy="82" rx="28" ry="20" fill="#c7b4a1" stroke="#927b69" strokeWidth="2"/><circle cx="94" cy="58" r="16" fill="#d3bfaa" stroke="#927b69" strokeWidth="2"/><circle cx="83" cy="46" r="7" fill="#bca48f"/><circle cx="101" cy="43" r="7" fill="#bca48f"/><circle cx="89" cy="57" r="2" fill="#42505a"/><path d="M88 75 Q76 70 50 82" stroke="#927b69" strokeWidth="5" fill="none" strokeLinecap="round"/><circle cx="50" cy="82" r="4" fill="#e5c6a6" stroke="#927b69"/><path d="M25 51 V82 M20 75 L25 82 L30 75 M34 82 V51 M29 58 L34 51 L39 58" fill="none" stroke="#6497a6" strokeWidth="2.5"/><text x="75" y="126" textAnchor="middle" fill="var(--fg)" fontSize="12">Paw moves</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p>
  </div>}
  </Lesson>;
}
