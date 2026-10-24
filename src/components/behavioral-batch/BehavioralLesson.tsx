"use client";
import { TraceLesson } from "@/components/mini-lab/TraceLesson";
import type { MiniLabSpec } from "@/lib/mini-lab/types";
/** Reported behavioral findings remain separate from each lesson's toy calculation. */
export function BehavioralLesson(props: { slug: string; spec: MiniLabSpec }) { return <TraceLesson {...props} />; }
export default BehavioralLesson;
