"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;from:string;to:string;via:string;explanation:string};
const lesson:Model={
  "question": "When sufficiently concentrated aqueous barium and sulfate ions are mixed, which sparingly soluble solid can precipitate?",
  "options": [
    "Barium nitrate",
    "Barium sulfate",
    "Sodium chloride"
  ],
  "answer": 1,
  "from": "Ba²⁺ + SO₄²⁻",
  "to": "BaSO₄ solid",
  "via": "Precipitation",
  "explanation": "Barium and sulfate ions can form sparingly soluble solid BaSO₄. Whether precipitation occurs depends on the ion concentrations relative to the solubility equilibrium."
};
function Card({x,label,color}:{x:number;label:string;color:string}){
 return <g><circle cx={x} cy="83" r="43" fill={color} stroke="#415a6f" strokeWidth="2"/><circle cx={x-12} cy="73" r="8" fill="#fff" opacity=".6"/><circle cx={x+13} cy="85" r="13" fill="#fff" opacity=".35"/><text x={x} y="156" textAnchor="middle" fill="var(--fg)" fontWeight="bold" fontSize="13">{label}</text></g>;
}
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Reveal the model and inspect the result." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={`${lesson.from}. ${shown?`${lesson.via}: ${lesson.to}.`:'Result hidden.'}`}>
 <Card x={75} label={lesson.from} color="#a6cde0"/>
 {shown?<><Card x={265} label={lesson.to} color="#b5d9c0"/><path d="M126 84 H212 M204 76 L212 84 L204 92" stroke="#819caf" strokeWidth="3" fill="none"/><text x="169" y="66" textAnchor="middle" fill="var(--muted)" fontSize="12">{lesson.via}</text></>:<text x="265" y="98" textAnchor="middle" fill="var(--muted)" fontSize="40">?</text>}
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Reveal the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Symbols, not molecular structures</p></div>}
 </Lesson>;
}
