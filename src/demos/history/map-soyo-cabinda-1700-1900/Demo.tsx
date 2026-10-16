"use client";

import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { HistoryMapStage, useHistoryMapState } from "@/lib/history-maps/HistoryMapStage";
import type { HistoryMapSpec } from "@/lib/history-maps/types";
import data from "./map.json";
const spec = data as HistoryMapSpec;
const names = ["earlier", "later", "overlay"] as const;

export default function Demo({ slug }: { slug: string }) {
  const state = useHistoryMapState();
  return <Lesson slug={slug} predict={{ question: spec.question, options: spec.options, answer: spec.answer }}
    exploreHint="Visit both years, then overlay. Read the trace; compare the labels at A and B." minInteractions={3}
    reveal={() => <p>{spec.reveal}</p>}>
    {({ locked, interact }) => <Milestones interact={interact} names={names}>
      {(reach) => <HistoryMapStage spec={spec} mode={state.mode} seen={state.seen} locked={locked}>
        <div className="row">{names.map((name, i) => <Control key={name} disabled={locked || state.mode === i}
          aria-pressed={state.mode === i} className={state.mode === i ? "active" : ""}
          onClick={() => { state.choose(i); reach(name); }}>{i < 2 ? spec.years[i] : "Overlay"}</Control>)}</div>
      </HistoryMapStage>}
    </Milestones>}
  </Lesson>;
}
