"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-spectral-fingerprints",
  "title": "Reading starlight",
  "group": "light",
  "question": "How can a spectrum help identify an element in a star?",
  "choices": [
    "Every element produces the same line pattern",
    "The star must be sampled directly",
    "Its pattern of spectral lines acts as a fingerprint"
  ],
  "correct": 2,
  "explanation": "Atoms and ions absorb or emit light at characteristic wavelengths. Comparing the pattern of lines with laboratory spectra helps identify chemical elements.",
  "before": "Explore this cosmic model",
  "after": "Lines identify elements",
  "focus": 4
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
