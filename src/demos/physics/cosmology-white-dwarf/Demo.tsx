"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-white-dwarf",
  "title": "A cooling stellar remnant",
  "group": "stars",
  "question": "What is a white dwarf?",
  "choices": [
    "A planet made only of light",
    "The compact remnant core of a star such as the Sun after outer layers are shed",
    "A newly formed galaxy"
  ],
  "correct": 1,
  "explanation": "A white dwarf is the exposed compact core left after a low- or intermediate-mass star sheds its outer layers. It gradually cools over a very long time.",
  "before": "Explore this cosmic model",
  "after": "A compact cooling core",
  "focus": 5
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
