"use client";

// Earn-the-reveal helper. A lesson names the states the learner must reach before the reveal
// unlocks, and calls reach("name") when each is reached. Each milestone counts once, so set
// <Lesson minInteractions={milestones.length}>. Builders wrote this by hand in ten lessons in wave 1.
//
//   const { reach } = useMilestones(interact, ["fed-dish", "one-batch"]);
//   ...  if (hours === 10) reach("fed-dish");

import { useRef } from "react";

export function useMilestones(interact: () => void, names: readonly string[]) {
  const seen = useRef(new Set<string>());
  const reach = (name: string) => {
    if (!names.includes(name) || seen.current.has(name)) return;
    seen.current.add(name);
    interact();
  };
  return { reach, reached: (name: string) => seen.current.has(name), count: () => seen.current.size };
}
