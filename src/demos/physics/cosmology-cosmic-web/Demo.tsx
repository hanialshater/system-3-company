"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-cosmic-web",
  "title": "A map on the largest scale",
  "group": "structure",
  "question": "What is the cosmic web?",
  "choices": [
    "The large-scale pattern of filaments, clusters and voids in matter and galaxies",
    "A single galaxy's spiral arm",
    "A literal net placed around the universe"
  ],
  "correct": 0,
  "explanation": "On very large scales, matter and galaxies form a network of filaments and dense nodes separated by less dense voids. Gravity drives much of this structure's growth.",
  "before": "Explore this cosmic model",
  "after": "Filaments, nodes, voids",
  "focus": 0
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
