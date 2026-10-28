"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "What happens to nutrient-rich cecotrophs in the rabbit’s digestive cycle?",
  "options": [
    "They never leave the gut",
    "They are re-ingested",
    "They are stored as fur"
  ],
  "answer": 1,
  "explanation": "The arrows show a soft cecotroph returning to the mouth for another digestive pass. Rabbits normally re-ingest these nutrient-rich pellets; the drawing does not show every digestive organ or the timing of the cycle.",
  "labels": [
    "Soft cecotroph",
    "Second pass"
  ],
  "base": "<ellipse cx=\"76\" cy=\"70\" rx=\"40\" ry=\"25\" fill=\"#b9b1a2\" stroke=\"#666\" stroke-width=\"3\"/><ellipse cx=\"112\" cy=\"58\" rx=\"19\" ry=\"18\" fill=\"#b9b1a2\" stroke=\"#666\" stroke-width=\"3\"/><path d=\"M103 45 L96 12 L110 37 M115 42 L120 13 L126 39\" fill=\"#b9b1a2\" stroke=\"#666\" stroke-width=\"3\"/><circle cx=\"119\" cy=\"55\" r=\"2\" fill=\"#222\"/>",
  "one": "<circle cx=\"47\" cy=\"111\" r=\"5\" fill=\"#9a7558\"/><circle cx=\"58\" cy=\"111\" r=\"5\" fill=\"#9a7558\"/><circle cx=\"69\" cy=\"111\" r=\"5\" fill=\"#9a7558\"/>",
  "two": "<circle cx=\"47\" cy=\"111\" r=\"5\" fill=\"#9a7558\"/><circle cx=\"58\" cy=\"111\" r=\"5\" fill=\"#9a7558\"/><circle cx=\"69\" cy=\"111\" r=\"5\" fill=\"#9a7558\"/><path d=\"M53 120 Q7 115 13 49 Q36 15 130 45 Q142 50 132 65\" stroke=\"#db8559\" stroke-width=\"4\" fill=\"none\"/><path d=\"M128 55 L132 67 L140 58\" stroke=\"#db8559\" stroke-width=\"3\" fill=\"none\"/>"
};
export default function Demo({slug}:{slug:string}) {
 const [seen,setSeen]=useState([false,false]); const seenRef=useRef([false,false]);
 const open=(n:number,interact:()=>void)=>{if(seenRef.current[n])return;seenRef.current[n]=true;setSeen([...seenRef.current]);interact();};
 return <Lesson slug={slug} predict={{question:model.question,options:model.options,answer:model.answer}} exploreHint="Open both evidence views; compare what each drawing shows." minInteractions={2} reveal={()=><p>{model.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 175" className="stage-svg" role="img" aria-label={seen[0] && seen[1] ? model.explanation : `${seen[0] ? model.labels[0] : "First view hidden"}. ${seen[1] ? model.labels[1] : "Second view hidden"}.`}>
  <rect x="5" y="8" width="155" height="150" rx="12" fill="var(--bg-2)" stroke="var(--line)"/><rect x="180" y="8" width="155" height="150" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
  {seen[0] && <g transform="translate(5 10)"><g dangerouslySetInnerHTML={{__html:model.base}}/><g dangerouslySetInnerHTML={{__html:model.one}}/><text x="78" y="142" textAnchor="middle" fill="var(--fg)" fontSize="12">{model.labels[0]}</text></g>}
  {seen[1] && <g transform="translate(180 10)"><g dangerouslySetInnerHTML={{__html:model.base}}/><g dangerouslySetInnerHTML={{__html:model.two}}/><text x="78" y="142" textAnchor="middle" fill="var(--fg)" fontSize="12">{model.labels[1]}</text></g>}
  {!seen[0] && <text x="82" y="89" textAnchor="middle" fill="var(--muted)" fontSize="24">?</text>}{!seen[1] && <text x="257" y="89" textAnchor="middle" fill="var(--muted)" fontSize="24">?</text>}
 </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[0]} onClick={()=>open(0,interact)}>Open first view</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || seen[1]} onClick={()=>open(1,interact)}>Open second view</Control></Row><p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Conceptual drawing · not to scale</p></div>}
 </Lesson>;
}
