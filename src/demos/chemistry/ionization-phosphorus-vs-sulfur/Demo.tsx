"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;a:string;b:string;winner:string;explanation:string};
const lesson:Model={
  "question": "Among neutral, isolated gas-phase atoms of P and S, which has the higher first ionization energy?",
  "options": [
    "P",
    "S",
    "Equal"
  ],
  "answer": 0,
  "a": "P",
  "b": "S",
  "winner": "P",
  "explanation": "P has the higher first ionization energy. Sulfur’s paired 3p electron contributes to its first ionization energy being slightly lower than phosphorus’s. First ionization energy is the energy required to remove the first electron from an isolated gaseous atom."
};
const table=[['H','','','','','','','He'],['Li','Be','B','C','N','O','F','Ne'],['Na','Mg','Al','Si','P','S','Cl','Ar'],['K','Ca','','','','','','']];
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Reveal which of the two highlighted elements is higher." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 195" className="stage-svg" role="img" aria-label={`Representative-group table. Compared: ${lesson.a}, ${lesson.b}. ${shown?`${lesson.winner} has higher first ionization energy.`:'Result hidden.'}`}>
 {['1','2','13','14','15','16','17','18'].map((g,i)=><text key={g} x={28+i*40} y="17" textAnchor="middle" fill="var(--muted)" fontSize="11">{g}</text>)}
 {table.flatMap((row,r)=>row.map((sym,c)=>sym?<g key={sym}><rect x={11+c*40} y={25+r*39} width="34" height="32" rx="5" fill={shown&&sym===lesson.winner?'#efce73':sym===lesson.a||sym===lesson.b?'#a7d2e5':'#c7d3dd'} stroke={sym===lesson.a||sym===lesson.b?'#5784a3':'#82939f'} strokeWidth={sym===lesson.a||sym===lesson.b?3:1}/><text x={28+c*40} y={46+r*39} textAnchor="middle" fill="#1a2d38" fontWeight="bold" fontSize="13">{sym}</text></g>:null))}
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Reveal the comparison</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Representative groups shown · not the full table</p></div>}
 </Lesson>;
}
