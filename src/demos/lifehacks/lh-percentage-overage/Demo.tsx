"use client";

import { Lesson } from "@/kit/Lesson";
import { Control, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { ResourceReveal, ResourceStage, resourceControlClass, useResourceState } from "@/components/lifehacks/ResourceLesson";
import { getResourceSpec } from "@/lib/lifehacks/resource-specs";
const spec = getResourceSpec("lh-percentage-overage");

export default function Demo({ slug }: { slug: string }) {
  const state = useResourceState(spec);
  return (
    <Lesson slug={slug} predict={{ question: spec.question, options: spec.options, answer: spec.answer }} minInteractions={2}
      exploreHint="Test both cases, then change the quantity. Compare the displayed expressions."
      reveal={() => <ResourceReveal spec={spec} x={state.x} />}>
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["tested-a", "tested-b"]}>
          {(reach) => <ResourceStage spec={spec} x={state.x} seen={state.seen} selected={state.selected}>
            <div className={resourceControlClass}>
              <Control disabled={locked || state.seen[0]} aria-pressed={state.seen[0]} className={state.seen[0] ? "active" : ""} onClick={() => state.choose(0, reach)}>Test A</Control>
              <Control disabled={locked || state.seen[1]} aria-pressed={state.seen[1]} className={state.seen[1] ? "active" : ""} onClick={() => state.choose(1, reach)}>Test B</Control>
            </div>
            <Slider label={spec.variable.label} value={state.x} min={spec.variable.min} max={spec.variable.max} step={spec.variable.step}
              disabled={locked} format={(value) => `${value}${spec.variable.unit}`} onChange={(value) => {
                state.setX(value);
                if (state.seen[0] && state.seen[1]) interact();
              }} />
          </ResourceStage>}
        </Milestones>
      )}
    </Lesson>
  );
}
