"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;theoretical:number;actual:number;percent:number;explanation:string};
const lesson:Model={
  "question": "A reaction has a theoretical yield of 50 g of a product and an actual yield of 40 g of that same product. What is the percent yield?",
  "options": [
    "100%",
    "80%",
    "20%"
  ],
  "answer": 1,
  "theoretical": 50,
  "actual": 40,
  "percent": 80,
  "explanation": "Percent yield = actual ÷ theoretical × 100 = 40 ÷ 50 × 100 = 80%."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Compare the actual mass to the theoretical mass." reveal={()=><p>{lesson.explanation} A 100% yield would mean the measured product mass equals the theoretical product mass for this calculation.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 195" className="stage-svg" role="img" aria-label={`Theoretical yield ${lesson.theoretical} grams; actual yield ${lesson.actual} grams. ${shown?`Percent yield ${lesson.percent} percent.`:'Percent yield hidden.'}`}>
 <text x="30" y="55" fill="var(--fg)" fontSize="12">Theoretical</text><rect x="120" y="38" width="170" height="23" rx="6" fill="#b4c9d2"/><text x="205" y="54" textAnchor="middle" fill="#233c46" fontSize="12">{lesson.theoretical} g</text>
 <text x="30" y="105" fill="var(--fg)" fontSize="12">Actual</text><rect x="120" y="88" width={170*lesson.percent/100} height="23" rx="6" fill="#e6ba7c"/><text x="125" y="104" fill="#342f25" fontSize="12">{lesson.actual} g</text>
 <text x="170" y="155" textAnchor="middle" fill="var(--fg)" fontSize="16" fontWeight="bold">{shown?`${lesson.percent}% yield`:'? % yield'}</text>
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Compare yields</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Bars compare masses of the same product</p></div>}
 </Lesson>;
}
