"use client";

// Earn-the-reveal helpers. A lesson names the states the learner must reach before the reveal
// unlocks and calls reach("name") when each is reached. Each milestone counts once, so set
// <Lesson minInteractions={milestones.length}>.
//
// Hooks cannot be called inside <Lesson>'s render prop, so use the component form there:
//
//   <Lesson minInteractions={2} …>
//     {({ locked, interact }) => (
//       <Milestones interact={interact} names={["fed-dish", "one-batch"]}>
//         {(reach) => <MyStage locked={locked} onFed={() => reach("fed-dish")} />}
//       </Milestones>
//     )}
//   </Lesson>
//
// Or call useMilestones(interact, names) inside your own Stage component.

import { useRef, type ReactNode } from "react";

export function useMilestones(interact: () => void, names: readonly string[]) {
  const seen = useRef(new Set<string>());
  const latest = useRef(interact);
  latest.current = interact;
  const reach = (name: string) => {
    if (!names.includes(name) || seen.current.has(name)) return;
    seen.current.add(name);
    latest.current();
  };
  return { reach, reached: (name: string) => seen.current.has(name), count: () => seen.current.size };
}

export function Milestones({
  interact,
  names,
  children,
}: {
  interact: () => void;
  names: readonly string[];
  children: (reach: (name: string) => void, reached: (name: string) => boolean) => ReactNode;
}) {
  const { reach, reached } = useMilestones(interact, names);
  return <>{children(reach, reached)}</>;
}
