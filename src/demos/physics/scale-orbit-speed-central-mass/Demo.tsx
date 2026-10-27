"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Slider } from "@/kit/controls";
import { ScalingStage, type ScalingCase } from "@/lib/physics/ScalingStage";
import styles from "@/lib/physics/physics.module.css";

const lesson: ScalingCase = {
  "question": "Consider a circular Newtonian orbit at fixed radius around a dominant spherical mass, with a nonzero initial result. If central mass doubles from a positive value, what happens to circular-orbit speed?",
  "options": [
    "×√2",
    "×2",
    "×½"
  ],
  "answer": 0,
  "input": "central mass",
  "output": "circular-orbit speed",
  "factor": 1.4142135623730951,
  "exponent": 0.5,
  "discrete": false,
  "result": "√2",
  "rule": "v = √(GM/r)",
  "condition": "a circular Newtonian orbit at fixed radius around a dominant spherical mass",
  "picture": "orbit"
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
