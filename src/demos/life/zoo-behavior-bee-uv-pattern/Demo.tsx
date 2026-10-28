"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "A toy flower reflects the same visible color across its petals but has a contrasting ultraviolet pattern. Which sensor could detect the UV contrast?",
  "options": [
    "A UV-sensitive sensor",
    "A visible-only sensor",
    "An unplugged sensor"
  ],
  "answer": 0,
  "explanation": "The visible-only panel represents uniform visible reflectance; the UV panel marks a contrasting region. The colors are false-color illustrations of signals, not a picture of a bee’s subjective experience. Some bees have UV-sensitive photoreceptors."
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
      <text x="170" y="22" textAnchor="middle" fill="var(--fg)" fontSize="13">False-color channels</text>
      <rect x="4" y="33" width="154" height="148" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="33" width="154" height="148" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
      <g transform="translate(6 37)">{seen[0] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">Visible</text><g transform="translate(75 73)" stroke="var(--fg)" strokeWidth="1"><ellipse cx="0" cy="-17" rx="10" ry="18" fill="var(--warn)"/><ellipse cx="17" cy="0" rx="18" ry="10" fill="var(--warn)"/><ellipse cx="0" cy="17" rx="10" ry="18" fill="var(--warn)"/><ellipse cx="-17" cy="0" rx="18" ry="10" fill="var(--warn)"/><circle r="10" fill="var(--warn)"/></g><text x="75" y="126" textAnchor="middle" fontSize="13" fill="var(--fg)">Uniform</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><text x="76" y="19" textAnchor="middle" fontSize="13" fill="var(--fg)">UV channel</text><g transform="translate(75 73)" stroke="var(--fg)" strokeWidth="1"><ellipse cx="0" cy="-17" rx="10" ry="18" fill="var(--warn)"/><ellipse cx="17" cy="0" rx="18" ry="10" fill="var(--warn)"/><ellipse cx="0" cy="17" rx="10" ry="18" fill="var(--warn)"/><ellipse cx="-17" cy="0" rx="18" ry="10" fill="var(--warn)"/><circle r="10" fill="var(--fg)"/></g><text x="75" y="126" textAnchor="middle" fontSize="13" fill="var(--fg)">Contrast</text></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative model · not observed data</p>
  </div>}
  </Lesson>;
}
