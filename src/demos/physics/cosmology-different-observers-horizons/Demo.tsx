"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-different-observers-horizons",
  "title": "Two cosmic viewpoints",
  "group": "scales",
  "question": "Would observers in very distant galaxies necessarily have exactly the same observable region as Earth?",
  "choices": [
    "No: only Earth has an observable region",
    "No: their observable regions are centered on their locations",
    "Yes: every observer sees exactly the same region"
  ],
  "correct": 1,
  "explanation": "Each observer has a region from which signals could have reached them. Different locations have different observable regions, although those regions can overlap.",
  "before": "Explore this cosmic model",
  "after": "Different viewpoint, horizon",
  "focus": 5
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
