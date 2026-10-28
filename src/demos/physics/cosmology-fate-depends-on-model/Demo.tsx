"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-fate-depends-on-model",
  "title": "The universe's future",
  "group": "energy",
  "question": "Why is the far future of cosmic expansion uncertain?",
  "choices": [
    "It depends on the properties of dark energy and the cosmological model",
    "The universe has no measurable expansion history",
    "The future is fixed by the Moon's orbit"
  ],
  "correct": 0,
  "explanation": "Different assumptions about dark energy and gravity lead to different possible long-term expansion histories. Better measurements help distinguish those possibilities.",
  "before": "Explore this cosmic model",
  "after": "Future depends on physics",
  "focus": 6
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
