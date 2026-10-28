"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-dark-matter-identity",
  "title": "An unanswered question",
  "group": "dark",
  "question": "Do measurements of dark matter's gravitational effects already establish exactly what it is made of?",
  "choices": [
    "No: its physical nature remains unknown",
    "Yes: it is proven to be ordinary smoke",
    "Yes: it is known to be black paint"
  ],
  "correct": 0,
  "explanation": "Several lines of evidence constrain the gravitational behavior of dark matter. Those measurements have not yet settled the nature of the underlying physical substance.",
  "before": "Explore this cosmic model",
  "after": "Evidence, identity still open",
  "focus": 9
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
