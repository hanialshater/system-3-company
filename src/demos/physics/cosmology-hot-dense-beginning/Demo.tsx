"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-hot-dense-beginning",
  "title": "The early-universe model",
  "group": "early",
  "question": "What does the hot Big Bang model describe about the early universe?",
  "choices": [
    "It was much hotter and denser",
    "It began as galaxies expanding into an empty room",
    "It began with the present-day distribution of stars"
  ],
  "correct": 0,
  "explanation": "The hot Big Bang model describes an early universe that was much hotter and denser than today. Its expansion and cooling explain several observations, including the microwave background.",
  "before": "Explore this cosmic model",
  "after": "Hotter and denser early",
  "focus": 0
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
