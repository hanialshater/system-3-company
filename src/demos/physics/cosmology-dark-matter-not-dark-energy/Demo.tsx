"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-dark-matter-not-dark-energy",
  "title": "Two different mysteries",
  "group": "dark",
  "question": "What is a key distinction between dark matter and dark energy?",
  "choices": [
    "Dark matter clusters gravitationally; dark energy is associated with accelerated expansion",
    "Both are simply names for ordinary stars",
    "Dark matter causes all light and dark energy is moonlight"
  ],
  "correct": 0,
  "explanation": "Dark matter helps explain gravitational effects in galaxies and larger structures. Dark energy is the name for whatever accounts for the observed accelerated cosmic expansion.",
  "before": "Explore this cosmic model",
  "after": "Different evidence and roles",
  "focus": 6
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
