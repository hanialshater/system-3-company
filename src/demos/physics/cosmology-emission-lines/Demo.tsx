"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-emission-lines",
  "title": "A glowing gas spectrum",
  "group": "light",
  "question": "A hot, thin gas emits light at particular wavelengths. What can appear in its spectrum?",
  "choices": [
    "A single line shared by all elements",
    "Bright emission lines",
    "Only a featureless black image"
  ],
  "correct": 1,
  "explanation": "Excited atoms can emit photons at characteristic wavelengths. A thin glowing gas can therefore produce bright emission lines rather than an entirely continuous spectrum.",
  "before": "Explore this cosmic model",
  "after": "Hot gas: bright lines",
  "focus": 5
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
