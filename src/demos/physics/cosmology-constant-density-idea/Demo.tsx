"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-constant-density-idea",
  "title": "An expanding-universe model",
  "group": "energy",
  "question": "In the cosmological-constant model, how does its energy density behave as the universe expands?",
  "choices": [
    "It is converted into stars at a fixed rate",
    "It remains constant",
    "It falls exactly like ordinary matter density"
  ],
  "correct": 1,
  "explanation": "In the cosmological-constant model, the associated energy density stays constant as space expands. This is a model property, not proof of dark energy's physical nature.",
  "before": "Explore this cosmic model",
  "after": "Constant density in model",
  "focus": 8
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
