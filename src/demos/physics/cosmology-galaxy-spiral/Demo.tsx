"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-galaxy-spiral",
  "title": "A galaxy in view",
  "group": "structure",
  "question": "What is characteristic of a spiral galaxy?",
  "choices": [
    "A disk with a spiral pattern",
    "Every star lies on one straight line",
    "It contains no gas or dust"
  ],
  "correct": 0,
  "explanation": "Spiral galaxies have disks with spiral structures and typically contain stars, gas and dust. The Milky Way is a spiral galaxy, viewed from within its disk.",
  "before": "Explore this cosmic model",
  "after": "A disk with spiral arms",
  "focus": 6
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
