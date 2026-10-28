"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "Some parrotfish use beak-like teeth against a hard surface. What action does this help them perform?",
  "options": [
    "Launch the teeth into the water",
    "Scrape material from that surface",
    "Breathe air through the beak"
  ],
  "answer": 1,
  "explanation": "The second panel shows beak-like teeth contacting and scraping a surface. Some parrotfish use fused teeth to scrape or bite food and associated material from hard substrates. Species and diets vary, and the diagram is not a full account of reef feeding."
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
  return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} minInteractions={2} exploreHint="Open both panels and compare their evidence." reveal={()=><p>{model.explanation}</p>}>
  {({locked,interact})=><div>
    <svg viewBox="0 0 340 155" className="stage-svg" role="img" aria-label={seen[0] && seen[1] ? model.explanation : "Two schematic parrotfish beside a hard surface; the action is hidden."}>
      <rect x="4" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="182" y="4" width="154" height="140" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
      <g transform="translate(6 8)">{seen[0] ? <g><g transform="translate(0 0)"><path d="M26 57 L8 39 L10 80 L27 68Z" fill="#508c99" stroke="#315f69" strokeWidth="2"/><path d="M24 58 Q34 32 58 29 L65 19 L70 28 Q91 29 103 43 L110 55 L111 67 Q100 90 70 94 Q39 95 24 69Z" fill="#86c5c6" stroke="#315f69" strokeWidth="2"/><path d="M36 48 Q57 36 74 42 M33 62 Q52 51 71 56 M35 76 Q53 68 71 70" fill="none" stroke="#bd8fa0" strokeWidth="3"/><path d="M64 62 Q76 53 80 66 Q76 80 64 77Z" fill="#5da5ab" stroke="#315f69"/><path d="M86 48 Q82 62 86 76" fill="none" stroke="#315f69" strokeWidth="2"/><circle cx="97" cy="52" r="4" fill="#f5eee0"/><circle cx="98" cy="52" r="2" fill="#263c42"/><path d="M108 55 Q119 56 121 62 Q119 68 108 68Z" fill="#efe2bd" stroke="#987c60" strokeWidth="2"/><path d="M111 61 H120" stroke="#987c60" strokeWidth="1.5"/></g><rect x="125" y="31" width="15" height="68" rx="3" fill="#bba28a" stroke="#8f7c69"/><path d="M129 39 L135 45 M130 60 L136 66 M129 80 L136 86" stroke="#8f7c69" strokeWidth="2"/><text x="75" y="122" textAnchor="middle" fill="var(--fg)" fontSize="12">Approach</text></g> : <g><g opacity="0.48"><g transform="translate(0 0)"><path d="M26 57 L8 39 L10 80 L27 68Z" fill="#508c99" stroke="#315f69" strokeWidth="2"/><path d="M24 58 Q34 32 58 29 L65 19 L70 28 Q91 29 103 43 L110 55 L111 67 Q100 90 70 94 Q39 95 24 69Z" fill="#86c5c6" stroke="#315f69" strokeWidth="2"/><path d="M36 48 Q57 36 74 42 M33 62 Q52 51 71 56 M35 76 Q53 68 71 70" fill="none" stroke="#bd8fa0" strokeWidth="3"/><path d="M64 62 Q76 53 80 66 Q76 80 64 77Z" fill="#5da5ab" stroke="#315f69"/><path d="M86 48 Q82 62 86 76" fill="none" stroke="#315f69" strokeWidth="2"/><circle cx="97" cy="52" r="4" fill="#f5eee0"/><circle cx="98" cy="52" r="2" fill="#263c42"/><path d="M108 55 Q119 56 121 62 Q119 68 108 68Z" fill="#efe2bd" stroke="#987c60" strokeWidth="2"/><path d="M111 61 H120" stroke="#987c60" strokeWidth="1.5"/></g><rect x="125" y="31" width="15" height="68" rx="3" fill="#bba28a" stroke="#8f7c69"/><path d="M129 39 L135 45 M130 60 L136 66 M129 80 L136 86" stroke="#8f7c69" strokeWidth="2"/></g><text x="75" y="125" textAnchor="middle" fill="var(--muted)" fontSize="12">Panel A</text></g>}</g>
      <g transform="translate(184 8)">{seen[1] ? <g><g transform="translate(3 0)"><path d="M26 57 L8 39 L10 80 L27 68Z" fill="#508c99" stroke="#315f69" strokeWidth="2"/><path d="M24 58 Q34 32 58 29 L65 19 L70 28 Q91 29 103 43 L110 55 L111 67 Q100 90 70 94 Q39 95 24 69Z" fill="#86c5c6" stroke="#315f69" strokeWidth="2"/><path d="M36 48 Q57 36 74 42 M33 62 Q52 51 71 56 M35 76 Q53 68 71 70" fill="none" stroke="#bd8fa0" strokeWidth="3"/><path d="M64 62 Q76 53 80 66 Q76 80 64 77Z" fill="#5da5ab" stroke="#315f69"/><path d="M86 48 Q82 62 86 76" fill="none" stroke="#315f69" strokeWidth="2"/><circle cx="97" cy="52" r="4" fill="#f5eee0"/><circle cx="98" cy="52" r="2" fill="#263c42"/><path d="M108 55 Q119 56 121 62 Q119 68 108 68Z" fill="#efe2bd" stroke="#987c60" strokeWidth="2"/><path d="M111 61 H120" stroke="#987c60" strokeWidth="1.5"/></g><rect x="125" y="31" width="15" height="68" rx="3" fill="#bba28a" stroke="#8f7c69"/><path d="M129 39 L135 45 M130 60 L136 66 M129 80 L136 86" stroke="#8f7c69" strokeWidth="2"/><path d="M132 42 V82 M126 72 L132 82 L138 72" stroke="#d2805f" strokeWidth="3" fill="none"/><text x="75" y="122" textAnchor="middle" fill="var(--fg)" fontSize="12">Beak at surface</text></g> : <g><g opacity="0.48"><g transform="translate(0 0)"><path d="M26 57 L8 39 L10 80 L27 68Z" fill="#508c99" stroke="#315f69" strokeWidth="2"/><path d="M24 58 Q34 32 58 29 L65 19 L70 28 Q91 29 103 43 L110 55 L111 67 Q100 90 70 94 Q39 95 24 69Z" fill="#86c5c6" stroke="#315f69" strokeWidth="2"/><path d="M36 48 Q57 36 74 42 M33 62 Q52 51 71 56 M35 76 Q53 68 71 70" fill="none" stroke="#bd8fa0" strokeWidth="3"/><path d="M64 62 Q76 53 80 66 Q76 80 64 77Z" fill="#5da5ab" stroke="#315f69"/><path d="M86 48 Q82 62 86 76" fill="none" stroke="#315f69" strokeWidth="2"/><circle cx="97" cy="52" r="4" fill="#f5eee0"/><circle cx="98" cy="52" r="2" fill="#263c42"/><path d="M108 55 Q119 56 121 62 Q119 68 108 68Z" fill="#efe2bd" stroke="#987c60" strokeWidth="2"/><path d="M111 61 H120" stroke="#987c60" strokeWidth="1.5"/></g><rect x="125" y="31" width="15" height="68" rx="3" fill="#bba28a" stroke="#8f7c69"/><path d="M129 39 L135 45 M130 60 L136 66 M129 80 L136 86" stroke="#8f7c69" strokeWidth="2"/></g><text x="75" y="125" textAnchor="middle" fill="var(--muted)" fontSize="12">Panel B</text></g>}</g>
    </svg>
    <Row><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open A</Control><Control style={{minHeight:44,minWidth:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open B</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Schematic comparison</p>
  </div>}
  </Lesson>;
}
