"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-multiple-probes",
  "title": "Checking the acceleration",
  "group": "energy",
  "question": "Why do cosmologists combine supernova measurements with other observations?",
  "choices": [
    "Different probes test expansion and structure with different uncertainties",
    "One supernova determines every cosmological parameter perfectly",
    "Other observations cannot measure anything about the universe"
  ],
  "correct": 0,
  "explanation": "Independent probes, such as supernovae, the microwave background and galaxy surveys, constrain cosmological models in different ways. Combining them helps test consistency and uncertainty.",
  "before": "Explore this cosmic model",
  "after": "Different probes, one model",
  "focus": 9
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
