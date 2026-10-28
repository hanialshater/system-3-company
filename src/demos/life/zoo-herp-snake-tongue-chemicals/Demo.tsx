"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "A snake flicks its tongue, then returns it to the mouth. What can the tongue carry back for chemical sensing?",
  "options": [
    "Chemical particles",
    "Light rays as stored images",
    "Sound waves as food"
  ],
  "answer": 0,
  "explanation": "The dots in the drawing represent chemical particles picked up by the tongue and brought back to a sensing region in the mouth. A tongue flick samples chemicals; the dots and path are simplified, not literal measured trajectories.",
  "label": "The particle positions, returning path and internal sensory region are schematic, not an anatomy atlas.",
  "shownLabel": "The particle positions, returning path and internal sensory region are schematic, not an anatomy atlas. The dots in the drawing represent chemical particles picked up by the tongue and brought back to a sensing region in the mouth. A tongue flick samples chemicals; the dots and path are simplified, not literal measured trajectories."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the subject, then trace the evidence." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Evidence hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><path d="M97 103 C68 121 33 122 25 104 C18 87 33 76 49 79 C65 82 69 94 85 93" fill="none" stroke="var(--fg)" strokeWidth="20" strokeLinecap="round"/><path d="M97 103 C68 121 33 122 25 104 C18 87 33 76 49 79 C65 82 69 94 85 93" fill="none" stroke="#a6bd99" strokeWidth="15" strokeLinecap="round"/><path d="M78 96 Q99 71 148 70 Q187 73 203 97 Q184 122 135 126 Q103 128 78 111 Z" fill="#a6bd99" stroke="var(--fg)" strokeWidth="3"/><circle cx="153" cy="87" r="4" fill="var(--fg)"/><path d="M200 110 H252 M251 110 L272 99 M251 110 L272 121" fill="none" stroke="#c97973" strokeWidth="4"/></g>}
      {step >= 2 && <g><circle cx="237" cy="91" r="3" fill="#c68955"/><circle cx="253" cy="79" r="3" fill="#c68955"/><circle cx="278" cy="99" r="3" fill="#c68955"/><path d="M245 132 Q188 156 149 120 M160 121 L149 120 L154 131" fill="none" stroke="var(--fg)" strokeWidth="3"/><circle cx="143" cy="116" r="6" fill="#d7ad68"/><text x="159" y="158" textAnchor="middle" fill="var(--fg)" fontSize="13">Return to sensory region</text></g>}
    </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
