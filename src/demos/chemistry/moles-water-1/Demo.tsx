"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;formula:string;mass:number;molarMass:number;moles:number;explanation:string};
const lesson:Model={
  "question": "A sample of H₂O has a mass of 18 g. Using its rounded molar mass of 18 g/mol, how many moles are present?",
  "options": [
    "2 mol",
    "0.5 mol",
    "1 mol"
  ],
  "answer": 2,
  "formula": "H₂O",
  "mass": 18,
  "molarMass": 18,
  "moles": 1,
  "explanation": "Amount = mass ÷ molar mass = 18 g ÷ 18 g/mol = 1 mol."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Convert the measured mass using the given molar mass." reveal={()=><p>{lesson.explanation} The supplied molar mass converts grams of this particular substance to moles; a different substance can have a different conversion factor.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={`Sample ${lesson.formula}, ${lesson.mass} grams, molar mass ${lesson.molarMass} grams per mole. ${shown?`${lesson.moles} moles.`:'Amount in moles hidden.'}`}>
 <path d="M45 45 H112 L103 112 Q78 125 53 112Z" fill="#b9d6d7" stroke="#648589" strokeWidth="3"/><path d="M54 85 H103 L100 108 Q78 118 57 108Z" fill="#e8bd74"/><text x="78" y="70" textAnchor="middle" fill="#273b42" fontSize="13" fontWeight="bold">{lesson.formula}</text><text x="78" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">{lesson.mass} g</text>
 <path d="M128 78 H207 M198 70 L207 78 L198 86" fill="none" stroke="#d49360" strokeWidth="4"/><text x="168" y="57" textAnchor="middle" fill="var(--fg)" fontSize="11">÷ {lesson.molarMass} g/mol</text>
 <rect x="222" y="40" width="95" height="83" rx="12" fill="#d1ded0" stroke="#748f83" strokeWidth="2"/><text x="269" y="90" textAnchor="middle" fill="#263d37" fontSize="20" fontWeight="bold">{shown?`${lesson.moles} mol`:"? mol"}</text><text x="269" y="150" textAnchor="middle" fill="var(--fg)" fontSize="12">amount</text>
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Convert mass</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Rounded molar masses supplied in the question</p></div>}
 </Lesson>;
}
