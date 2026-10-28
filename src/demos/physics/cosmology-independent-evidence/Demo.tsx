"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { CosmologyScene, type CosmosCase } from "@/components/cosmology/CosmologyLesson";
const lesson: CosmosCase = {
  "slug": "cosmology-independent-evidence",
  "title": "Many lines of evidence",
  "group": "methods",
  "question": "Why is agreement among different cosmological observations valuable?",
  "choices": [
    "Agreement means no uncertainty remains",
    "Different methods can test the same model in complementary ways",
    "One method automatically eliminates every possible bias"
  ],
  "correct": 1,
  "explanation": "Different probes have different assumptions and sensitivities. Consistent results can strengthen a model, while remaining uncertainties and potential shared biases still matter.",
  "before": "Explore this cosmic model",
  "after": "Different tests, same model",
  "focus": 8
};
export default function Demo({slug}:{slug:string}) {
 const [shown,setShown]=useState(false);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.choices,answer:lesson.correct}} exploreHint="Move from the first view to the next and inspect what changes." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><CosmologyScene lesson={lesson} shown={shown}/><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Explore the model</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{lesson.group==='cmb'?'Color contrast exaggerated':lesson.group==='structure'?'3D projection · schematic':'Illustration · not to scale'}</p></div>}
 </Lesson>;
}
