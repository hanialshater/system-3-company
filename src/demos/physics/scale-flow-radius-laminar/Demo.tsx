"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Slider } from "@/kit/controls";
import { ScalingStage, type ScalingCase } from "@/lib/physics/ScalingStage";
import styles from "@/lib/physics/physics.module.css";

const lesson: ScalingCase = {
  "question": "Consider ideal Poiseuille flow with fixed pressure drop viscosity and length, with a nonzero initial result. If tube radius doubles from a positive value, what happens to laminar volume-flow rate?",
  "options": [
    "×4",
    "×8",
    "×16"
  ],
  "answer": 2,
  "input": "tube radius",
  "output": "laminar volume-flow rate",
  "factor": 16.0,
  "exponent": 4.0,
  "discrete": false,
  "result": "16",
  "rule": "Q = πΔPr⁴/(8ηL)",
  "condition": "ideal Poiseuille flow with fixed pressure drop viscosity and length",
  "picture": "fluid"
};

export default function Demo({ slug }: { slug: string }) {
  const [current, setCurrent] = useState(1);
  const [seenDouble, setSeenDouble] = useState(false);
  return <Lesson slug={slug}
    predict={{ question: lesson.question, options: lesson.options, answer: lesson.answer }}
    exploreHint={`Move the slider to ×2 or beyond to compare ${lesson.input}.`}
    minInteractions={1}
    reveal={() => <><p>In this model, <strong>{lesson.rule}</strong>.</p>
      <p>With {lesson.condition}, doubling {lesson.input} makes {lesson.output} <strong>{lesson.result} times</strong> the original value. The bars use relative values, not measured units.</p></>}>
    {({ locked, interact }) => <div>
      <ScalingStage lesson={lesson} current={current} seenDouble={seenDouble}/>
      <p aria-live="polite">{seenDouble ? `At double input: ${lesson.output} is ${lesson.result} times the original.` : "Move toward ×2; values are relative to the original."}</p>
      <div className={styles.sliderTouch}><Slider label={lesson.input} value={current} min={1} max={3} step={lesson.discrete ? 1 : 0.5} format={v => `×${v}`} disabled={locked}
        onChange={v => { setCurrent(v); if (v >= 2 && !seenDouble) { setSeenDouble(true); interact(); } }}/></div>
    </div>}
  </Lesson>;
}
