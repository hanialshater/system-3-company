"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In a toy model one member is chosen uniformly from a group. Is an individual’s chance smaller in a group of 3 or a group of 6?",
  "options": [
    "A group of 3",
    "It is the same in both",
    "A group of 6"
  ],
  "answer": 2,
  "explanation": "With one uniformly selected individual, each member has chance 1/3 in the first group and 1/6 in the second. This is dilution under explicit assumptions, not a general prediction about real predator behavior or group safety."
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
      <g transform="translate(6 37)">{seen[0] ? <g><g><circle cx="32.2" cy="53.6" r="5.04" fill="#bca48f"/><circle cx="47.8" cy="53.6" r="5.04" fill="#bca48f"/><circle cx="40" cy="62" r="12" fill="#d3bfaa" stroke="#987d68" strokeWidth="1"/><circle cx="35.8" cy="60.8" r="1.44" fill="#42505a"/><circle cx="44.2" cy="60.8" r="1.44" fill="#42505a"/></g><g><circle cx="67.2" cy="53.6" r="5.04" fill="#bca48f"/><circle cx="82.8" cy="53.6" r="5.04" fill="#bca48f"/><circle cx="75" cy="62" r="12" fill="#d3bfaa" stroke="#987d68" strokeWidth="1"/><circle cx="70.8" cy="60.8" r="1.44" fill="#42505a"/><circle cx="79.2" cy="60.8" r="1.44" fill="#42505a"/></g><g><circle cx="102.2" cy="53.6" r="5.04" fill="#bca48f"/><circle cx="117.8" cy="53.6" r="5.04" fill="#bca48f"/><circle cx="110" cy="62" r="12" fill="#d3bfaa" stroke="#987d68" strokeWidth="1"/><circle cx="105.8" cy="60.8" r="1.44" fill="#42505a"/><circle cx="114.2" cy="60.8" r="1.44" fill="#42505a"/></g><text x="75" y="110" textAnchor="middle" fill="var(--fg)" fontSize="14">1 of 3</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><g><circle cx="33.5" cy="38.0" r="4.2" fill="#bca48f"/><circle cx="46.5" cy="38.0" r="4.2" fill="#bca48f"/><circle cx="40" cy="45" r="10" fill="#d3bfaa" stroke="#987d68" strokeWidth="1"/><circle cx="36.5" cy="44.0" r="1.2" fill="#42505a"/><circle cx="43.5" cy="44.0" r="1.2" fill="#42505a"/></g><g><circle cx="68.5" cy="38.0" r="4.2" fill="#bca48f"/><circle cx="81.5" cy="38.0" r="4.2" fill="#bca48f"/><circle cx="75" cy="45" r="10" fill="#d3bfaa" stroke="#987d68" strokeWidth="1"/><circle cx="71.5" cy="44.0" r="1.2" fill="#42505a"/><circle cx="78.5" cy="44.0" r="1.2" fill="#42505a"/></g><g><circle cx="103.5" cy="38.0" r="4.2" fill="#bca48f"/><circle cx="116.5" cy="38.0" r="4.2" fill="#bca48f"/><circle cx="110" cy="45" r="10" fill="#d3bfaa" stroke="#987d68" strokeWidth="1"/><circle cx="106.5" cy="44.0" r="1.2" fill="#42505a"/><circle cx="113.5" cy="44.0" r="1.2" fill="#42505a"/></g><g><circle cx="33.5" cy="70.0" r="4.2" fill="#bca48f"/><circle cx="46.5" cy="70.0" r="4.2" fill="#bca48f"/><circle cx="40" cy="77" r="10" fill="#d3bfaa" stroke="#987d68" strokeWidth="1"/><circle cx="36.5" cy="76.0" r="1.2" fill="#42505a"/><circle cx="43.5" cy="76.0" r="1.2" fill="#42505a"/></g><g><circle cx="68.5" cy="70.0" r="4.2" fill="#bca48f"/><circle cx="81.5" cy="70.0" r="4.2" fill="#bca48f"/><circle cx="75" cy="77" r="10" fill="#d3bfaa" stroke="#987d68" strokeWidth="1"/><circle cx="71.5" cy="76.0" r="1.2" fill="#42505a"/><circle cx="78.5" cy="76.0" r="1.2" fill="#42505a"/></g><g><circle cx="103.5" cy="70.0" r="4.2" fill="#bca48f"/><circle cx="116.5" cy="70.0" r="4.2" fill="#bca48f"/><circle cx="110" cy="77" r="10" fill="#d3bfaa" stroke="#987d68" strokeWidth="1"/><circle cx="106.5" cy="76.0" r="1.2" fill="#42505a"/><circle cx="113.5" cy="76.0" r="1.2" fill="#42505a"/></g><text x="75" y="110" textAnchor="middle" fill="var(--fg)" fontSize="14">1 of 6</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p>
  </div>}
  </Lesson>;
}
