"use client";

import { useId } from "react";

export type ScalingCase = {
  question: string;
  options: [string, string, string];
  answer: number;
  input: string;
  output: string;
  factor: number;
  exponent: number;
  discrete: boolean;
  result: string;
  rule: string;
  condition: string;
  picture: "orbit" | "wave" | "spring" | "circuit" | "fluid" | "graph" | "decay";
};

export function ScalingStage({ lesson, current, seenDouble }: { lesson: ScalingCase; current: number; seenDouble: boolean }) {
  const gradient = useId();
  const currentFactor = Math.pow(current, lesson.exponent);
  const maxValue = Math.max(1, currentFactor, seenDouble ? lesson.factor : 0);
  const height = (value: number) => 66 * value / maxValue;
  const displayed = Number(currentFactor.toPrecision(3));
  const distanceScene = lesson.picture === "orbit" && /^(distance|orbital radius)/i.test(lesson.input)
    && !/turntable/i.test(lesson.condition);
  const sizeScene = lesson.picture === "orbit" && /^(planet radius|stellar radius)/i.test(lesson.input);
  const frequencyScene = lesson.picture === "wave" && /^frequency$/i.test(lesson.input)
    && /fixed speed|vacuum/i.test(lesson.condition);
  return <svg viewBox="0 0 300 178" className="stage-svg" role="img" aria-label={seenDouble
    ? `Original ${lesson.output}: one unit; double input: ${lesson.result} units. Current input: ${current} times; current output: ${displayed} units.`
    : `Current input: ${current} times; current output: ${displayed} times the original. Try double input to compare.`}>
    {distanceScene || sizeScene ? <g>
      <defs><radialGradient id={gradient}><stop stopColor="var(--domain)"/><stop offset="1" stopColor="var(--bg-2)"/></radialGradient></defs>
      <circle cx="45" cy="48" r={sizeScene ? 12 * current : 12} fill={`url(#${gradient})`} stroke="var(--muted)"/>
      {distanceScene && <circle cx={45 + 20 * current} cy="48" r="4" fill="var(--fg)"/>}
    </g> : frequencyScene ? <path d={Array.from({length:55},(_,i)=>`${i?"L":"M"}${8+1.45*i} ${48-15*Math.sin(i*Math.PI*current/10)}`).join(" ")} fill="none" stroke="var(--domain)" strokeWidth="3"/>
      : null}
    <line x1="112" y1="146" x2="286" y2="146" stroke="var(--muted)" strokeWidth="2"/>
    <g>
      <rect x="120" y={146-height(1)} width="28" height={height(1)} fill="var(--muted)"/>
      {seenDouble && <rect x="178" y={146-height(lesson.factor)} width="28" height={height(lesson.factor)} fill="var(--muted)"/>}
      <rect x="246" y={146-height(currentFactor)} width="28" height={height(currentFactor)} fill="var(--domain)"/>
      <text x="134" y={139-height(1)} textAnchor="middle" fill="var(--fg)" fontSize="12">1×</text>
      {seenDouble && <text x="192" y={139-height(lesson.factor)} textAnchor="middle" fill="var(--fg)" fontSize="12">{lesson.result}×</text>}
      <text x="260" y={139-height(currentFactor)} textAnchor="middle" fill="var(--fg)" fontSize="12">{displayed}×</text>
    </g>
    <text x="134" y="166" textAnchor="middle" fill="var(--fg)" fontSize="11">original</text>
    <text x="192" y="166" textAnchor="middle" fill="var(--fg)" fontSize="11">double</text>
    <text x="260" y="166" textAnchor="middle" fill="var(--fg)" fontSize="11">current</text>
  </svg>;
}
