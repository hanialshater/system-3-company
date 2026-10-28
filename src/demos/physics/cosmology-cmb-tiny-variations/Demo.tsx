"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-cmb-tiny-variations",
  "title": "Seeds in a map",
  "group": "cmb",
  "question": "Why are tiny variations in the cosmic microwave background scientifically useful?",
  "choices": [
    "They prove every galaxy was already fully formed",
    "They reveal small early-universe differences linked to later structure",
    "They are photographs of present-day planets"
  ],
  "correct": 1,
  "explanation": "Small differences in the early universe are related to the later growth of cosmic structure. Detailed CMB patterns help scientists test models of that evolution.",
  "before": "Explore this cosmic model",
  "after": "Small differences matter",
  "focus": 2
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
