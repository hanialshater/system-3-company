"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-cmb-release-era",
  "title": "The oldest light's snapshot",
  "group": "early",
  "question": "Approximately when was the cosmic microwave background released?",
  "choices": [
    "Only after the Milky Way formed",
    "About 380,000 years after the Big Bang",
    "At the formation of Earth"
  ],
  "correct": 1,
  "explanation": "The cosmic microwave background comes from an early period roughly 380,000 years after the Big Bang, when the universe cooled enough for light to travel much more freely.",
  "before": "Explore this cosmic model",
  "after": "A 380,000-year snapshot",
  "focus": 4
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
