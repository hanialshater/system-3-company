"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-sunlight-travel-time",
  "title": "A ray from the Sun",
  "group": "scales",
  "question": "When sunlight reaches Earth, which is true about when it left the Sun?",
  "choices": [
    "It left several minutes earlier",
    "It left at that exact instant",
    "It left several years earlier"
  ],
  "correct": 0,
  "explanation": "Sunlight takes about eight minutes to travel from the Sun to Earth. Looking at the Sun is therefore seeing the surface as it was minutes earlier.",
  "before": "Explore this cosmic model",
  "after": "Sunlight travels minutes",
  "focus": 3
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
