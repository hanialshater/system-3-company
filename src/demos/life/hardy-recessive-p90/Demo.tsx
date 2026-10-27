"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;aa:number;het:number;rr:number;target:string;explanation:string};
const lesson:Model={
  "question": "In a large randomly mating population under Hardy–Weinberg assumptions, allele frequencies are p(A) = 0.9 and q(a) = 0.1. What percentage is expected to have genotype aa?",
  "options": [
    "16%",
    "1%",
    "4%"
  ],
  "answer": 1,
  "aa": 81,
  "het": 18,
  "rr": 1,
  "target": "aa",
  "explanation": "The model gives AA = p² = 81%, Aa = 2pq = 18% and aa = q² = 1%. The requested aa frequency is 1%. These are ideal expectations, not a guarantee for a finite population."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false),rows=[['AA',lesson.aa],['Aa',lesson.het],['aa',lesson.rr]] as const;
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Calculate the expected genotype distribution." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 320 205" className="stage-svg" role="img" aria-label={shown?`Expected genotype frequencies AA ${lesson.aa}%, Aa ${lesson.het}%, aa ${lesson.rr}%.`:'Expected genotype frequencies hidden.'}>
 <line x1="35" y1="158" x2="300" y2="158" stroke="var(--line)" strokeWidth="2"/>
 {rows.map(([name,val],i)=>{const x=65+i*82,h=shown?val*1.15:0,active=shown&&(lesson.target===name||(lesson.target==='dominant'&&name!=='aa')||(lesson.target==='conditional'&&name!=='aa'));return <g key={name}><rect x={x} y={158-h} width="48" height={h} rx="5" fill={active?'#e7be63':'#8fc5d7'}/><text x={x+24} y="180" textAnchor="middle" fill="var(--fg)" fontWeight="bold" fontSize="14">{name}</text>{shown&&<text x={x+24} y={Math.max(21,150-h)} textAnchor="middle" fill="var(--fg)" fontSize="13">{val}%</text>}</g>})}
 {!shown&&<text x="160" y="95" textAnchor="middle" fill="var(--muted)" fontSize="30">?</text>}<text x="10" y="18" fill="var(--muted)" fontSize="12">Expected %</text>
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Calculate the mix</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Ideal model · three genotype frequencies</p></div>}
 </Lesson>;
}
