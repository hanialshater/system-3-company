"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;a:number;b:number;k:number;q:number;direction:string;explanation:string};
const lesson:Model={
  "question": "For the ideal model A ⇌ B, K = 3, initial [A] = 2 mol/L, and initial [B] = 1 mol/L. What is the initial net direction?",
  "options": [
    "Net reverse toward A",
    "No net reaction at equilibrium",
    "Net forward toward B"
  ],
  "answer": 2,
  "a": 2,
  "b": 1,
  "k": 3,
  "q": 0.5,
  "direction": "Net forward",
  "explanation": "Q = [B]/[A] = 1/2 = 0.5. Q is less than K, so the net reaction initially proceeds toward B."
};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Compare the initial quotient with the given equilibrium constant." reveal={()=><p>{lesson.explanation} As the ideal mixture changes, its reaction quotient moves toward the equilibrium value at the stated temperature.</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 200" className="stage-svg" role="img" aria-label={`Initial concentrations A ${lesson.a}, B ${lesson.b}; K ${lesson.k}. ${shown?`Initial Q ${lesson.q}, ${lesson.direction}.`:'Direction hidden.'}`}>
 <line x1="50" y1="150" x2="200" y2="150" stroke="#8ca39b" strokeWidth="2"/><rect x="75" y={150-lesson.a*12} width="42" height={lesson.a*12} fill="#8aacc2"/><rect x="145" y={150-lesson.b*12} width="42" height={lesson.b*12} fill="#d6a883"/><text x="96" y="170" textAnchor="middle" fill="var(--fg)" fontSize="12">A: {lesson.a}</text><text x="166" y="170" textAnchor="middle" fill="var(--fg)" fontSize="12">B: {lesson.b}</text>
 <text x="260" y="65" textAnchor="middle" fill="var(--fg)" fontSize="14">A ⇌ B</text><text x="260" y="91" textAnchor="middle" fill="var(--fg)" fontSize="13">K = {lesson.k}</text><text x="260" y="124" textAnchor="middle" fill="var(--fg)" fontSize="13">{shown?`Q = ${lesson.q}`:'Q = ?'}</text><text x="260" y="151" textAnchor="middle" fill="var(--fg)" fontSize="11">{shown?lesson.direction:''}</text>
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Compare Q and K</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Ideal 1:1 model · initial concentrations in mol/L</p></div>}
 </Lesson>;
}
