"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;react:number;product:number;before:number;after:number;explanation:string};
const lesson:Model={
  "question": "In this one-step energy model, reactants are at 20 units, products at 10 units and the uncatalyzed peak at 50 units. Which side of the model has the lower energy?",
  "options": [
    "They are equal",
    "Products",
    "Reactants"
  ],
  "answer": 1,
  "react": 20,
  "product": 10,
  "before": 50,
  "after": 35,
  "explanation": "The uncatalyzed forward barrier is 50 − 20 = 30; the reverse barrier is 50 − 10 = 40. Product minus reactant energy is −10 units. The alternate peak at 35 gives a forward barrier of 15. The catalyst changes the path, not the endpoints in this model."
};
const y=(e:number)=>165-e*2.2;
function curve(peak:number){return `M40 ${y(lesson.react)} C80 ${y(lesson.react)} 95 ${y(peak)} 160 ${y(peak)} C225 ${y(peak)} 240 ${y(lesson.product)} 280 ${y(lesson.product)}`;}
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Add the lower-barrier route and compare the endpoints." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 320 205" className="stage-svg" role="img" aria-label={`Reactant energy ${lesson.react}, product energy ${lesson.product}, initial peak ${lesson.before}${shown?`, alternate peak ${lesson.after}`:''}.`}>
 <path d="M40 25 V165 H285" fill="none" stroke="var(--line)" strokeWidth="2"/><text x="5" y="20" fill="var(--muted)" fontSize="12">Energy</text>
 {[0,10,20,30,40,50,60].map(e=><text key={e} x="32" y={y(e)+4} textAnchor="end" fill="var(--muted)" fontSize="10">{e}</text>)}
 <path d={curve(lesson.before)} fill="none" stroke="#80c5e1" strokeWidth="3"/>{shown&&<path d={curve(lesson.after)} fill="none" stroke="#e8b85d" strokeWidth="3"/>}
 <text x="160" y={y(lesson.before)-7} textAnchor="middle" fill="#80c5e1" fontSize="12">peak {lesson.before}</text>{shown&&<text x="160" y={y(lesson.after)-7} textAnchor="middle" fill="#e8b85d" fontSize="12">peak {lesson.after}</text>}
 <circle cx="40" cy={y(lesson.react)} r="4" fill="#d5dfe4"/><circle cx="280" cy={y(lesson.product)} r="4" fill="#d5dfe4"/><text x="40" y="183" fill="var(--muted)" fontSize="11">Reactants {lesson.react}</text><text x="280" y="183" textAnchor="end" fill="var(--muted)" fontSize="11">Products {lesson.product}</text>
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Add catalyst route</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Idealized one-step profile · arbitrary units</p></div>}
 </Lesson>;
}
