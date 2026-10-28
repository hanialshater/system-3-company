"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-expansion-space-itself",
  "title": "Distant galaxy pairs",
  "group": "expansion",
  "question": "In the standard expanding-universe model, what happens to the separation between distant galaxies carried with the expansion?",
  "choices": [
    "Their separation increases",
    "Every galaxy must move through space from one central point",
    "Atoms necessarily expand with the universe"
  ],
  "correct": 0,
  "explanation": "On sufficiently large scales, cosmic expansion increases the distance between galaxies that follow the overall flow. Gravitationally bound systems do not simply expand with that flow.",
  "before": "Explore this cosmic model",
  "after": "Distant separations grow",
  "focus": 0
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
