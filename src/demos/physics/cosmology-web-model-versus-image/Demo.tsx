"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-web-model-versus-image",
  "title": "A simulated cosmic web",
  "group": "structure",
  "question": "When a visualization colors filaments in a cosmic-web simulation, what should a viewer remember?",
  "choices": [
    "The colors illustrate modeled matter and are not necessarily what eyes would see",
    "Every colored filament is an ordinary visible-light photograph",
    "The simulation is a literal picture of the entire universe"
  ],
  "correct": 0,
  "explanation": "Cosmic-web visualizations often use color to represent simulated or inferred matter. The colors communicate the model; they are not necessarily the scene's natural visual appearance.",
  "before": "Explore this cosmic model",
  "after": "Color can encode a model",
  "focus": 9
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
