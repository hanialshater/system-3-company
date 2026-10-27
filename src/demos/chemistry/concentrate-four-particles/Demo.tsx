"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;n:number;before:number;after:number;explanation:string};
const lesson:Model={
  "question": "A model solution has 4 solute particles in 4 equal-volume compartments. You remove water until the volume is 2 compartments, without losing solute. Once evenly mixed, how many particles per compartment on average?",
  "options": [
    "1 per compartment",
    "2 per compartment",
    "3 per compartment",
    "4 per compartment"
  ],
  "answer": 1,
  "n": 4,
  "before": 4,
  "after": 2,
  "explanation": "The same 4 particles occupy 2 equal compartments, so the average is 4 ÷ 2 = 2 per compartment. The dots are a counting model; real particles move and are not fixed in compartments."
};
function Vessel({volume,n,y,label}:{volume:number;n:number;y:number;label:string}){
 const per=n/volume;
 return <g transform={`translate(0 ${y})`}><text x="10" y="14" fill="var(--fg)" fontSize="13" fontWeight="bold">{label}</text>
  {Array.from({length:volume},(_,i)=><g key={i}><rect x={12+i*48} y="25" width="44" height="55" fill="#b9def0" stroke="#557f9a" strokeWidth="1"/><text x={34+i*48} y="95" textAnchor="middle" fill="var(--muted)" fontSize="11">{i+1}</text>{Array.from({length:per},(_,j)=><circle key={j} cx={25+i*48+(j%2)*17} cy={41+Math.floor(j/2)*21} r="6" fill="#a24848"/>)}</g>)}
 </g>;
}
export default function Demo({slug}:{slug:string}){
 const [mixed,setMixed]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Change the volume and mix; count the dots in each region." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 320 215" className="stage-svg" role="img" aria-label={`Before: ${lesson.n} solute particles in ${lesson.before} equal regions. ${mixed?`After: ${lesson.n} particles in ${lesson.after} equal regions.`:'After mixing is hidden.'}`}>
  <Vessel volume={lesson.before} n={lesson.n} y={0} label="Before"/>
  {mixed?<Vessel volume={lesson.after} n={lesson.n} y={108} label="After mixing"/>:<text x="160" y="165" fill="var(--muted)" textAnchor="middle" fontSize="25">?</text>}
 </svg><Row><Control disabled={locked||mixed} onClick={()=>{setMixed(true);interact();}}>Change volume and mix</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Dots = solute · boxes = equal volumes</p></div>}
 </Lesson>;
}
