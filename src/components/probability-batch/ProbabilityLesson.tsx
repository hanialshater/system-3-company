"use client";
import { TraceLesson } from "@/components/mini-lab/TraceLesson";
import type { MiniLabSpec } from "@/lib/mini-lab/types";
/** Probability/causal models live in local lesson specs, not in the renderer. */
export function ProbabilityLesson(props: { slug: string; spec: MiniLabSpec }) { return <TraceLesson {...props} />; }
export default ProbabilityLesson;
