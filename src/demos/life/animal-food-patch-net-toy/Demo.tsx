"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In a toy foraging model, patch A gives 5 energy units and costs 1 to reach; B gives 8 and costs 6. Which has the larger net energy?",
  "options": [
    "Patch A",
    "Patch B",
    "They are equal"
  ],
  "answer": 0,
  "explanation": "Patch A nets 5 − 1 = 4 energy units. Patch B nets 8 − 6 = 2, even though B offers more food. This toy counts only the stated energy benefit and travel cost; real foragers face other costs and uncertainty."
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
      <g transform="translate(6 37)">{seen[0] ? <g><text x="75" y="25" textAnchor="middle" fill="var(--fg)" fontSize="13">Patch A</text><text x="10" y="49" fill="var(--fg)" fontSize="12">Food 5</text><rect x="66" y="36" width="40" height="13" fill="#9dc5a0"/><text x="10" y="76" fill="var(--fg)" fontSize="12">Cost 1</text><rect x="66" y="63" width="8" height="13" fill="#e0ba80"/><text x="75" y="112" textAnchor="middle" fill="var(--fg)" fontSize="14">Net 4</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><text x="75" y="25" textAnchor="middle" fill="var(--fg)" fontSize="13">Patch B</text><text x="10" y="49" fill="var(--fg)" fontSize="12">Food 8</text><rect x="66" y="36" width="64" height="13" fill="#9dc5a0"/><text x="10" y="76" fill="var(--fg)" fontSize="12">Cost 6</text><rect x="66" y="63" width="48" height="13" fill="#e0ba80"/><text x="75" y="112" textAnchor="middle" fill="var(--fg)" fontSize="14">Net 2</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p>
  </div>}
  </Lesson>;
}
