"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-first-stars-after-cmb",
  "title": "Two cosmic milestones",
  "group": "early",
  "question": "Which came first in the standard cosmic timeline?",
  "choices": [
    "The release of the cosmic microwave background",
    "The formation of the first stars",
    "The formation of the Solar System"
  ],
  "correct": 0,
  "explanation": "The cosmic microwave background was released before the first stars formed. The intervening period is often called the cosmic dark ages because stars had not yet lit the universe.",
  "before": "Explore this cosmic model",
  "after": "CMB before first stars",
  "focus": 5
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
