"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const model = {
  "question": "In this scent-mark example, what can another mammal encounter after the first has left?",
  "options": [
    "Only a sound wave from the past",
    "A chemical trace on a surface",
    "The maker must still be standing there"
  ],
  "answer": 1,
  "explanation": "The colored mark stays on the tree while the animal moves away in this schematic. Chemical scent marks can persist and carry information to other mammals, but the content and duration depend on species and conditions.",
  "labels": [
    "Mark placed",
    "Animal moves away"
  ],
  "base": "<path d=\"M27 25 Q25 50 29 116 M36 25 Q38 50 34 116\" stroke=\"#aa8769\" stroke-width=\"10\"/><path d=\"M34 41 Q65 29 93 39\" stroke=\"#aa8769\" stroke-width=\"5\" fill=\"none\"/>",
  "one": "<circle cx=\"34\" cy=\"75\" r=\"8\" fill=\"#dbbd67\"/><circle cx=\"34\" cy=\"75\" r=\"3\" fill=\"#f0e4b4\"/>",
  "two": "<circle cx=\"34\" cy=\"75\" r=\"8\" fill=\"#dbbd67\"/><circle cx=\"34\" cy=\"75\" r=\"3\" fill=\"#f0e4b4\"/><path d=\"M72 94 Q94 74 122 88 Q134 95 128 106 L75 106 Z\" fill=\"#b2a292\" stroke=\"#6b5c51\" stroke-width=\"3\"/><path d=\"M103 72 H145 M135 65 L145 72 L135 79\" stroke=\"#9db8c6\" stroke-width=\"3\" fill=\"none\"/>"
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
