"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-inflation-model",
  "title": "An idea about the earliest expansion",
  "group": "early",
  "question": "What is cosmic inflation in modern cosmology?",
  "choices": [
    "A proposed very early period of rapid expansion",
    "The increase in prices on Earth",
    "The formation of the first planets"
  ],
  "correct": 0,
  "explanation": "Inflation is a proposed period of extremely rapid early expansion. It can explain several large-scale features, but its physical mechanism and details remain under investigation.",
  "before": "Explore this cosmic model",
  "after": "Inflation: early hypothesis",
  "focus": 0
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
