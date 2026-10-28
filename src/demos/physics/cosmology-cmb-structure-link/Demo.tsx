"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-cmb-structure-link",
  "title": "From faint patterns to galaxies",
  "group": "cmb",
  "question": "How are early density differences related to the cosmic web?",
  "choices": [
    "They erased all differences forever",
    "Gravity helped small differences grow into larger structures",
    "They guaranteed galaxies were present at the CMB epoch"
  ],
  "correct": 1,
  "explanation": "Small early density differences grew under gravity over cosmic time. This growth contributed to the large-scale distribution of galaxies and clusters observed today.",
  "before": "Explore this cosmic model",
  "after": "Small differences can grow",
  "focus": 8
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
