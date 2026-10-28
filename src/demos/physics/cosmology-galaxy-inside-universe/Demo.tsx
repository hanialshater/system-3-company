"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-galaxy-inside-universe",
  "title": "Nested cosmic structures",
  "group": "scales",
  "question": "Which arrangement correctly places our cosmic home?",
  "choices": [
    "Solar System inside the Milky Way, inside the universe",
    "Milky Way inside the Solar System",
    "The universe inside the Milky Way"
  ],
  "correct": 0,
  "explanation": "The Solar System is part of the Milky Way galaxy, and the Milky Way is one galaxy in the universe. These structures differ enormously in scale.",
  "before": "Explore this cosmic model",
  "after": "Solar System → galaxy",
  "focus": 6
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
