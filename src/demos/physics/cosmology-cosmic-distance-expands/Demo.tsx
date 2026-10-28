"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-cosmic-distance-expands",
  "title": "A very long light trip",
  "group": "scales",
  "question": "Can the current distance to a very distant galaxy exceed the time its light traveled multiplied by the speed of light?",
  "choices": [
    "Only if light traveled faster than light",
    "Yes: cosmic expansion changes distances during the trip",
    "No: all cosmic distances are fixed during the trip"
  ],
  "correct": 1,
  "explanation": "In an expanding universe, distances between widely separated galaxies can change while light is traveling. The present distance is therefore not always the travel time multiplied by light speed.",
  "before": "Explore this cosmic model",
  "after": "Distance changes en route",
  "focus": 8
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
