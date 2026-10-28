"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-heavy-elements",
  "title": "The universe's ingredients",
  "group": "stars",
  "question": "Where were many elements heavier than helium produced?",
  "choices": [
    "In stars and stellar explosions or related events",
    "Only in Earth's atmosphere",
    "All in their present amounts during the first minutes"
  ],
  "correct": 0,
  "explanation": "Stars make many heavier elements through nuclear reactions, and stellar explosions or related events distribute material into space. The early universe mainly produced the lightest nuclei.",
  "before": "Explore this cosmic model",
  "after": "Stars enrich later matter",
  "focus": 9
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
