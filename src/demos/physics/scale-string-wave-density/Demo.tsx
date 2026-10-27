"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Slider } from "@/kit/controls";
import { ScalingStage, type ScalingCase } from "@/lib/physics/ScalingStage";
import styles from "@/lib/physics/physics.module.css";

const lesson: ScalingCase = {
  "question": "Consider a taut flexible string under fixed tension, with a nonzero initial result. If linear mass density doubles from a positive value, what happens to wave speed?",
  "options": [
    "×1/√2",
    "×½",
    "×2"
  ],
  "answer": 0,
  "input": "linear mass density",
  "output": "wave speed",
  "factor": 0.7071067811865476,
  "exponent": -0.5,
  "discrete": false,
  "result": "1/√2",
  "rule": "v = √(T/μ)",
  "condition": "a taut flexible string under fixed tension",
  "picture": "wave"
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
