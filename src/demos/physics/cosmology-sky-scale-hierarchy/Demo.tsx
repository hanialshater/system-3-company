"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-sky-scale-hierarchy",
  "title": "Two cosmic neighborhoods",
  "group": "scales",
  "question": "Which is the larger structure: the Milky Way or the Solar System?",
  "choices": [
    "The Milky Way",
    "The Solar System",
    "They are the same size"
  ],
  "correct": 0,
  "explanation": "The Milky Way contains the Sun and its Solar System along with many other stars and planetary systems. A galaxy is a much larger structure than one solar system.",
  "before": "Explore this cosmic model",
  "after": "A galaxy contains systems",
  "focus": 9
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
