"use client";

import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { StoryStage, StoryExplanation } from "@/components/history-story/StoryLesson";
import story from "./story.json";
import map from "./map.json";

export default function Demo() {
  return <Lesson slug={story.slug} predict={story.predict} minInteractions={story.frames.length}
    exploreHint="Visit all four checkpoints, then compare."
    reveal={() => <StoryExplanation story={story} />}>
    {ctx => <StoryStage story={story} map={map} ctx={ctx} checkpoint={props => <Control {...props} />} />}
  </Lesson>;
}
