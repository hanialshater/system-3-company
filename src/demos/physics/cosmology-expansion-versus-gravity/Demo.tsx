"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-expansion-versus-gravity",
  "title": "Competing influences",
  "group": "energy",
  "question": "Can gravity gather matter into galaxies while the universe expands on large scales?",
  "choices": [
    "No: gravity only acts inside stars",
    "Yes: gravity can bind local structures even as large-scale space expands",
    "No: expansion forbids all gravitational structures"
  ],
  "correct": 1,
  "explanation": "Cosmic expansion describes the large-scale evolution of space. Gravity can nevertheless bind galaxies, clusters and other local structures under suitable conditions.",
  "before": "Explore this cosmic model",
  "after": "Local binding, cosmic growth",
  "focus": 5
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
