"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-gravity-grows-structure",
  "title": "From smooth to web",
  "group": "structure",
  "question": "How did small early density differences become large-scale structure in standard models?",
  "choices": [
    "Gravity amplified differences over time",
    "Gravity made every region exactly identical",
    "Galaxies were fully formed at the CMB epoch"
  ],
  "correct": 0,
  "explanation": "Slightly denser regions attracted more matter through gravity, helping early differences grow into galaxies, clusters and filaments over cosmic time.",
  "before": "Explore this cosmic model",
  "after": "Gravity amplifies contrasts",
  "focus": 3
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
