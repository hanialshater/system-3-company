"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-local-motion",
  "title": "A nearby exception",
  "group": "expansion",
  "question": "Must every nearby galaxy recede from the Milky Way because the universe expands on large scales?",
  "choices": [
    "No: local gravitational motions can dominate",
    "Yes: every galaxy always recedes",
    "No: galaxies never move"
  ],
  "correct": 0,
  "explanation": "The overall expansion describes large-scale behavior. Nearby galaxies can have local motions caused by gravity; for example, local approaches are possible.",
  "before": "Explore this cosmic model",
  "after": "Local motion can differ",
  "focus": 9
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
