"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;p1:string[];p2:string[];cells:string[];explanation:string};
const lesson:Model={
  "question": "In a simple one-gene model, parents AA and AA each pass on one allele. Each gamete shown is equally likely. How many of the four possible combinations be heterozygous (Aa)?",
  "options": [
    "0 out of 4",
    "1 out of 4",
    "2 out of 4",
    "4 out of 4"
  ],
  "answer": 0,
  "p1": [
    "A",
    "A"
  ],
  "p2": [
    "A",
    "A"
  ],
  "cells": [
    "AA",
    "AA",
    "AA",
    "AA"
  ],
  "explanation": "The four combinations are AA, AA, AA, AA. 0 of the four be heterozygous (Aa). This model assumes equally likely gametes and a single gene; it does not predict the outcome of a particular birth."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}}
  exploreHint="Fill the square and compare the four combinations."
  reveal={()=><p>{lesson.explanation}</p>}>
  {({locked,interact})=><div>
   <svg viewBox="0 0 320 220" className="stage-svg" role="img" aria-label={`Parent alleles ${lesson.p1.join(', ')} and ${lesson.p2.join(', ')}. ${step} of four combinations filled: ${lesson.cells.slice(0,step).join(', ')}`}>
    <text x="172" y="19" textAnchor="middle" fill="var(--muted)" fontSize="13">Parent 2</text>
    <text x="15" y="115" fill="var(--muted)" fontSize="13">Parent 1</text>
    {lesson.p2.map((a,j)=><text key={j} x={145+j*76} y="44" textAnchor="middle" fill="var(--fg)" fontWeight="bold" fontSize="20">{a}</text>)}
    {lesson.p1.map((a,i)=><text key={i} x="89" y={91+i*66} textAnchor="middle" fill="var(--fg)" fontWeight="bold" fontSize="20">{a}</text>)}
    {lesson.cells.map((cell,i)=><g key={i}><rect x={110+(i%2)*76} y={53+Math.floor(i/2)*66} width="70" height="60" rx="8" fill={i<step?'#b8dcca':'none'} stroke="var(--line)" strokeWidth="2"/><text x={145+(i%2)*76} y={90+Math.floor(i/2)*66} textAnchor="middle" fill={i<step?'#192a25':'var(--muted)'} fontWeight="bold" fontSize="20">{i<step?cell:'?'}</text></g>)}
   </svg>
   <Row><Control disabled={locked||step===4} onClick={()=>{setStep(4);interact();}}>Fill the square</Control></Row>
   <p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Each square is one equally likely combination.</p>
  </div>}
 </Lesson>;
}
