"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-moonlight-travel-time",
  "title": "A signal from the Moon",
  "group": "scales",
  "question": "If the Moon changed abruptly, would an observer on Earth see the change at exactly the same instant?",
  "choices": [
    "Only if the Moon is full",
    "No: its light takes time to travel",
    "Yes: light has no travel time"
  ],
  "correct": 1,
  "explanation": "Light takes a little over a second to travel from the Moon to Earth. Even nearby astronomical views show the object slightly in the past.",
  "before": "Explore this cosmic model",
  "after": "Moon to Earth takes time",
  "focus": 2
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
