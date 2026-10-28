"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In seahorses, which parent carries developing young in a brood pouch?",
  "options": [
    "Neither parent ever carries them",
    "The male",
    "The female in a pouch of this kind"
  ],
  "answer": 1,
  "explanation": "The second view highlights the brood pouch on a simplified seahorse. Male seahorses carry developing young in a brood pouch; the dots are a diagram convention rather than an actual count or a description of every stage of development.",
  "labels": [
    "Seahorse outline",
    "Brood pouch"
  ],
  "base": "<path d=\"M102 26 Q80 16 73 35 Q54 45 63 73 Q61 91 76 100 Q86 108 82 119 Q79 128 70 121 Q61 116 66 110\" fill=\"none\" stroke=\"#b48d62\" stroke-width=\"12\" stroke-linecap=\"round\"/><path d=\"M100 24 L119 33 L102 39\" fill=\"#c7a376\" stroke=\"#886746\" stroke-width=\"3\"/><circle cx=\"98\" cy=\"29\" r=\"2\" fill=\"#333\"/>",
  "one": "<path d=\"M62 71 Q72 73 82 83\" fill=\"none\" stroke=\"#e0b97a\" stroke-width=\"3\"/>",
  "two": "<path d=\"M64 72 Q47 90 66 105 Q80 100 82 84 Z\" fill=\"#e9c88f\" stroke=\"#916e4d\" stroke-width=\"3\"/><circle cx=\"65\" cy=\"87\" r=\"3\" fill=\"#916e4d\"/><circle cx=\"71\" cy=\"94\" r=\"3\" fill=\"#916e4d\"/>"
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
