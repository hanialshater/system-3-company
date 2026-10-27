"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Model={question:string;options:string[];answer:number;before:[number,number];after:[number,number];explanation:string};
const lesson:Model={
  "question": "In a haploid model, each dot is one individual with one A or a allele. Start with 4 A and 4 a. An allele-independent disaster leaves exactly 2 A and no a individuals in this model. What fraction of the resulting group carries A?",
  "options": [
    "2 of 2",
    "1 of 2",
    "0 of 2"
  ],
  "answer": 0,
  "before": [
    4,
    4
  ],
  "after": [
    2,
    0
  ],
  "explanation": "The resulting group has 2 A and 0 a, so its A frequency is 2 out of 2. A chance bottleneck can remove an allele from a small population; that particular result is not guaranteed in every bottleneck. The diagram fixes this one outcome rather than predicting every real population."
};
function Group({counts,y,title}:{counts:[number,number];y:number;title:string}){
 const dots=[...Array(counts[0]).fill('A'),...Array(counts[1]).fill('a')];
 return <g transform={`translate(0 ${y})`}><text x="12" y="14" fontSize="13" fill="var(--fg)" fontWeight="bold">{title}</text>{dots.map((v,i)=>{const x=31+(i%6)*48,cy=40+Math.floor(i/6)*42;return <g key={i}><circle cx={x} cy={cy} r="16" fill={v==='A'?'#8dcdb1':'#e3a393'} stroke="#415566" strokeWidth="2"/><text x={x} y={cy+5} textAnchor="middle" fill="#172b32" fontWeight="bold" fontSize="15">{v}</text></g>})}</g>;
}
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Apply the event and count the resulting group." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 320 205" className="stage-svg" role="img" aria-label={`Before: ${lesson.before[0]} A and ${lesson.before[1]} a. ${shown?`After: ${lesson.after[0]} A and ${lesson.after[1]} a.`:'After is hidden.'}`}>
 <Group counts={lesson.before} y={1} title="Before"/><line x1="12" x2="308" y1="100" y2="100" stroke="var(--line)" strokeDasharray="4 4"/>
 {shown?<Group counts={lesson.after} y={106} title="After"/>:<text x="160" y="160" textAnchor="middle" fill="var(--muted)" fontSize="32">?</text>}
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Apply the event</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>Each dot = one haploid individual</p></div>}
 </Lesson>;
}
