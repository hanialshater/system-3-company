"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-cosmological-constant",
  "title": "A constant possibility",
  "group": "energy",
  "question": "What is a cosmological constant in cosmological modeling?",
  "choices": [
    "A constant term compatible with a vacuum-energy-like contribution",
    "A measurement proving space never expands",
    "A constant number of galaxies in every telescope image"
  ],
  "correct": 0,
  "explanation": "A cosmological constant is a term in Einstein's equations that can behave like a constant vacuum-energy density. It is one possible description of dark energy.",
  "before": "Explore this cosmic model",
  "after": "A constant model component",
  "focus": 3
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
