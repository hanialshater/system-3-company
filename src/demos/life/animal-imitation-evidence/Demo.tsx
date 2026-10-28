"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "Two animals both open the same box. What additional evidence would best help test whether one copied the other?",
  "options": [
    "Record only the box color",
    "Compare observers with similar animals that did not observe",
    "Assume matching actions prove copying"
  ],
  "answer": 1,
  "explanation": "Both panels show the same final action, but only one includes an observed demonstration. Comparing otherwise similar animals with and without the demonstration can help test whether observing changes later behavior. A matching action by itself does not prove imitation."
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
      <g transform="translate(6 37)">{seen[0] ? <g><text x="75" y="20" textAnchor="middle" fill="var(--fg)" fontSize="12">1: Demonstration</text><g transform="translate(28 49)"><ellipse cx="0" cy="0" rx="13" ry="10" fill="#d3bfaa" stroke="#987d68" strokeWidth="1.5"/><circle cx="-9" cy="-9" r="5" fill="#bca48f"/><circle cx="9" cy="-9" r="5" fill="#bca48f"/><circle cx="-4" cy="-1" r="1.5" fill="#42505a"/><circle cx="4" cy="-1" r="1.5" fill="#42505a"/></g><g transform="translate(75 48)"><rect x="-12" y="-5" width="24" height="19" rx="2" fill="#d9b878" stroke="#927450" strokeWidth="2"/><path d="M-12 -5 L8 -17 L17 -13 L12 -5" fill="#ead0a0" stroke="#927450" strokeWidth="2"/></g><g transform="translate(124 49)"><ellipse cx="0" cy="0" rx="13" ry="10" fill="#d3bfaa" stroke="#987d68" strokeWidth="1.5"/><circle cx="-9" cy="-9" r="5" fill="#bca48f"/><circle cx="9" cy="-9" r="5" fill="#bca48f"/><circle cx="-4" cy="-1" r="1.5" fill="#42505a"/><circle cx="4" cy="-1" r="1.5" fill="#42505a"/></g><path d="M108 47 H94 M100 42 L94 47 L100 52" stroke="#719ba2" strokeWidth="2" fill="none"/><text x="28" y="71" textAnchor="middle" fill="var(--fg)" fontSize="12">Acts</text><text x="124" y="71" textAnchor="middle" fill="var(--fg)" fontSize="12">Watches</text><text x="75" y="85" textAnchor="middle" fill="var(--fg)" fontSize="12">2: Observer later</text><g transform="translate(35 110)"><ellipse cx="0" cy="0" rx="13" ry="10" fill="#d3bfaa" stroke="#987d68" strokeWidth="1.5"/><circle cx="-9" cy="-9" r="5" fill="#bca48f"/><circle cx="9" cy="-9" r="5" fill="#bca48f"/><circle cx="-4" cy="-1" r="1.5" fill="#42505a"/><circle cx="4" cy="-1" r="1.5" fill="#42505a"/></g><g transform="translate(93 109)"><rect x="-12" y="-5" width="24" height="19" rx="2" fill="#d9b878" stroke="#927450" strokeWidth="2"/><path d="M-12 -5 L8 -17 L17 -13 L12 -5" fill="#ead0a0" stroke="#927450" strokeWidth="2"/></g></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel A</text>}</g>
      <g transform="translate(184 37)">{seen[1] ? <g><text x="75" y="25" textAnchor="middle" fill="var(--fg)" fontSize="12">No demonstration</text><path d="M42 46 H108" stroke="#b5bcb8" strokeWidth="2" strokeDasharray="4 4"/><text x="75" y="85" textAnchor="middle" fill="var(--fg)" fontSize="12">Observer later</text><g transform="translate(35 110)"><ellipse cx="0" cy="0" rx="13" ry="10" fill="#d3bfaa" stroke="#987d68" strokeWidth="1.5"/><circle cx="-9" cy="-9" r="5" fill="#bca48f"/><circle cx="9" cy="-9" r="5" fill="#bca48f"/><circle cx="-4" cy="-1" r="1.5" fill="#42505a"/><circle cx="4" cy="-1" r="1.5" fill="#42505a"/></g><g transform="translate(93 109)"><rect x="-12" y="-5" width="24" height="19" rx="2" fill="#d9b878" stroke="#927450" strokeWidth="2"/><path d="M-12 -5 L8 -17 L17 -13 L12 -5" fill="#ead0a0" stroke="#927450" strokeWidth="2"/></g></g> : <text x="75" y="75" textAnchor="middle" fill="var(--muted)" fontSize="14">Panel B</text>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Illustrative scenario</p>
  </div>}
  </Lesson>;
}
