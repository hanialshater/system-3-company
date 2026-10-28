"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-observable-horizon",
  "title": "A boundary of visibility",
  "group": "scales",
  "question": "What does the boundary of the observable universe describe?",
  "choices": [
    "A physical wall at the edge of all space",
    "The outer edge of the Milky Way",
    "A limit to what light has had time to reach us"
  ],
  "correct": 2,
  "explanation": "The observable universe is limited by the light and other signals that have been able to reach us during cosmic history. That boundary is not known to be a physical wall.",
  "before": "Explore this cosmic model",
  "after": "Visibility has a horizon",
  "focus": 4
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
