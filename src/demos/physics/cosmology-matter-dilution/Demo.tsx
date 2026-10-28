"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-matter-dilution",
  "title": "Matter in a changing volume",
  "group": "energy",
  "question": "In a simple model with a fixed amount of ordinary matter, what happens to its average density as space expands?",
  "choices": [
    "It increases because volume grows",
    "It stays fixed no matter how much volume grows",
    "It decreases as the same matter occupies more volume"
  ],
  "correct": 2,
  "explanation": "For a fixed quantity of matter, density is mass divided by volume. As the volume of an expanding region increases, its average matter density falls.",
  "before": "Explore this cosmic model",
  "after": "More volume, lower density",
  "focus": 7
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
