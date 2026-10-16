"use client";

import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { AlgorithmStage, AlgorithmReveal, algorithmControlClass, useAlgorithmState } from "@/components/algorithms/AlgorithmLesson";
import { articulation_root as spec } from "@/lib/algorithms/topics/graph-traversal-decomposition";

export default function Demo({ slug }: { slug: string }) {
  const state = useAlgorithmState(spec);
  return <Lesson slug={slug} predict={spec.predict} minInteractions={1} exploreHint={spec.exploreHint}
    reveal={() => <AlgorithmReveal spec={spec} witness={state.witness} />}>
    {({ locked, interact }) => <AlgorithmStage state={state}>
      <div className={algorithmControlClass}>
        <Control disabled={locked || !state.canRun} onClick={() => state.run(interact)}>Run example</Control>
        <Control disabled={locked || !state.canStep} onClick={() => state.step(interact)}>Step</Control>
        <Control disabled={locked || !state.canTryAnother} onClick={state.tryAnother}>Try another</Control>
        <Control disabled={locked || !state.canReset} onClick={state.reset}>Reset</Control>
      </div>
    </AlgorithmStage>}
  </Lesson>;
}
