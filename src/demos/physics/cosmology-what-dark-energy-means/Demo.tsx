"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-what-dark-energy-means",
  "title": "A name for a mystery",
  "group": "energy",
  "question": "What does the term dark energy name?",
  "choices": [
    "The same thing as the Milky Way's dust",
    "The unknown cause or description associated with accelerated expansion",
    "A directly identified particle emitted by every star"
  ],
  "correct": 1,
  "explanation": "Dark energy is a name for the phenomenon or component associated with accelerated expansion. Its physical nature is not yet established, and several explanations are investigated.",
  "before": "Explore this cosmic model",
  "after": "Name for an open question",
  "focus": 2
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
