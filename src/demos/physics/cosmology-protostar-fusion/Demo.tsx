"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-protostar-fusion",
  "title": "When a star switches on",
  "group": "stars",
  "question": "What marks the beginning of a star's main-sequence life?",
  "choices": [
    "The first formation of any dust",
    "The end of all gravitational attraction",
    "Sustained hydrogen fusion in its core"
  ],
  "correct": 2,
  "explanation": "A main-sequence star sustains hydrogen fusion in its core. The energy released supports the hot star against gravitational collapse for a long period.",
  "before": "Explore this cosmic model",
  "after": "Core hydrogen fusion begins",
  "focus": 1
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
