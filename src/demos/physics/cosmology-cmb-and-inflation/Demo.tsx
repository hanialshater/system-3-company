"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-cmb-and-inflation",
  "title": "Testing an early-universe idea",
  "group": "cmb",
  "question": "What can patterns in the CMB help scientists do with inflation models?",
  "choices": [
    "Test predictions and constrain models",
    "Prove every detail of inflation's mechanism is known",
    "Directly photograph the instant of the Big Bang"
  ],
  "correct": 0,
  "explanation": "The CMB's detailed patterns provide tests of predictions from early-universe models, including inflation. The physical mechanism of inflation remains an open research question.",
  "before": "Explore this cosmic model",
  "after": "Patterns test hypotheses",
  "focus": 9
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
