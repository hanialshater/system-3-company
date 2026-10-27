"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;pos:string;p:number;neg:string;n:number;numPos:number;numNeg:number;formula:string;explanation:string};
const lesson:Model={
  "question": "An ionic formula unit contains Al³⁺ and N³⁻ ions. What is the smallest whole-number ratio of positive ions to negative ions that makes the total charge zero?",
  "options": [
    "1 : 1",
    "1 : 2",
    "2 : 1"
  ],
  "answer": 0,
  "pos": "Al³⁺",
  "p": 3,
  "neg": "N³⁻",
  "n": 3,
  "numPos": 1,
  "numNeg": 1,
  "formula": "AlN",
  "explanation": "One formula unit has 1 Al³⁺ and 1 N³⁻: its positive and negative charges each have magnitude 3. The simplest ratio is 1 : 1, written AlN. A real ionic solid is an extended lattice, not isolated molecules."
};
function Ions({n,label,y,color}:{n:number;label:string;y:number;color:string}){return <g>{Array.from({length:n},(_,i)=><g key={i}><circle cx={36+i*48} cy={y} r="19" fill={color} stroke="#536477" strokeWidth="2"/><text x={36+i*48} y={y+5} textAnchor="middle" fill="#1a3038" fontWeight="bold" fontSize="13">{label}</text></g>)}</g>}
export default function Demo({slug}:{slug:string}){
 const [units,setUnits]=useState(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Build one unit and add another; compare charges." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 320 195" className="stage-svg" role="img" aria-label={units?`${units} formula units: ${units*lesson.numPos} ${lesson.pos} and ${units*lesson.numNeg} ${lesson.neg}; total charge zero.`:`${lesson.pos} and ${lesson.neg}; the ratio is hidden.`}>
 {units?<><text x="12" y="20" fill="var(--fg)" fontSize="13" fontWeight="bold">Positive ions · total +{units*lesson.numPos*lesson.p}</text><Ions n={units*lesson.numPos} label={lesson.pos} y={48} color="#edbb86"/><text x="12" y="100" fill="var(--fg)" fontSize="13" fontWeight="bold">Negative ions · total −{units*lesson.numNeg*lesson.n}</text><Ions n={units*lesson.numNeg} label={lesson.neg} y={128} color="#a4cce2"/><text x="160" y="177" textAnchor="middle" fill="var(--fg)" fontWeight="bold" fontSize="14">{units} unit{units===1?'':'s'} · each {lesson.numPos}:{lesson.numNeg} · +{lesson.numPos*lesson.p}/−{lesson.numNeg*lesson.n}</text></>:<text x="160" y="100" textAnchor="middle" fill="var(--muted)" fontSize="28">{lesson.pos} + {lesson.neg} → ?</text>}
 </svg><Row><Control disabled={locked||units>0} onClick={()=>{setUnits(1);interact();}}>Build one unit</Control><Control disabled={locked||units===0||units===2} onClick={()=>{setUnits(2);interact();}}>Add a unit</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Ion counts · not a lattice diagram</p></div>}
 </Lesson>;
}
