"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-scale-factor",
  "title": "A common growth factor",
  "group": "expansion",
  "question": "In a simple expansion model, what does the scale factor describe?",
  "choices": [
    "The physical size of every atom",
    "The temperature of an individual star",
    "How cosmic distances in the model change over time"
  ],
  "correct": 2,
  "explanation": "The cosmological scale factor tracks how distances between idealized comoving points change over time. It is a property of the model's large-scale geometry.",
  "before": "Explore this cosmic model",
  "after": "A scale for cosmic distance",
  "focus": 7
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
