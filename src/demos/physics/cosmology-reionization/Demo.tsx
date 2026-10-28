"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-reionization",
  "title": "Light changes gas again",
  "group": "early",
  "question": "What is cosmic reionization?",
  "choices": [
    "The cooling of Earth's oceans",
    "The ionization of much intergalactic gas by early sources of radiation",
    "The first formation of neutral atoms"
  ],
  "correct": 1,
  "explanation": "Radiation from early stars, galaxies and other sources ionized much of the intergalactic gas after neutral atoms had formed. The details and timing are studied with observations.",
  "before": "Explore this cosmic model",
  "after": "Early sources ionize gas",
  "focus": 5
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
