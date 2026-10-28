"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-cmb-foregrounds",
  "title": "Cleaning the sky map",
  "group": "cmb",
  "question": "Why must scientists account for foreground emission when studying the CMB?",
  "choices": [
    "The CMB occurs only in front of the Moon",
    "Foregrounds make the universe stop expanding",
    "Our galaxy and other sources add signals to the sky"
  ],
  "correct": 2,
  "explanation": "Microwave observations contain signals from the Milky Way and other foreground sources in addition to the CMB. Analysis attempts to separate these contributions.",
  "before": "Explore this cosmic model",
  "after": "Foreground + cosmic signal",
  "focus": 7
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
