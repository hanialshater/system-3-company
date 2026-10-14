"use client";

// Heads-after-heads selection bias. 16 tiles, one per 4-flip sequence. Tapping a tile shows its share of heads among
// flips right after a heads. Running readouts: average of the shares (17/42 = 40.5% once all are open) and the pooled
// count (12 of 24 = 50%). Key state: every sequence that has such a flip is open. No randomness.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { QUALIFYING, SEQS, avgShare, pct1, pooled } from "./model";
import s from "./styles.module.css";

const ALL = SEQS.map((_, i) => i);
const A = avgShare(ALL);
const P = pooled(ALL);

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [open, setOpen] = useState<number[]>([]);
  const tap = (i: number) => {
    if (open.includes(i)) return;
    const next = [...open, i];
    setOpen(next);
    if (QUALIFYING.every((q) => next.includes(q))) reach("all-read");
  };
  const q = open.filter((i) => SEQS[i].follow > 0);
  const pl = pooled(open);
  const hide = locked || open.length === 0;

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : open.length > 0 ? "Each tile gets one vote, however many flips follow a head in it." : "Each tile is a 4-flip sequence. Tap it: share = heads among the flips right after a head."}
      </p>
      <div className={s.grid}>
        {SEQS.map((sq, i) => (
          <Control key={sq.flips} disabled={locked} className={open.includes(i) ? "active" : ""} onClick={() => tap(i)}>
            <span className={s.seq}>{sq.flips}</span>
            <span className={`${s.share} ${open.includes(i) && sq.follow === 0 ? s.none : ""}`}>
              {open.includes(i) ? (sq.follow === 0 ? "no such flip" : `${sq.heads} of ${sq.follow}`) : "tap"}
            </span>
          </Control>
        ))}
      </div>
      <Row>
        <Readout label="Tiles open" value={locked ? "?" : open.length} />
        <Readout label="Average of shares" value={hide || q.length === 0 ? "-" : pct1(avgShare(open))} />
        <Readout label="Pooled" value={hide ? "-" : `${pl.heads} of ${pl.follow}`} />
      </Row>
    </div>
  );
}

export default function HeadsAfterHeadsTrap({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Flip a fair coin 4 times. In each sequence, find the share of heads among the flips right after a head (HHHT: those flips are H, H, T, so 2 of 3). Then average those shares over all ${QUALIFYING.length} sequences that have such a flip. The average is`,
        options: ["50%", `about ${Math.round(A * 100)}%`, "about 60%"],
        answer: 1,
      }}
      exploreHint="Tap every tile and watch the average of the shares."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            You opened all {QUALIFYING.length} sequences with a flip after a head. Their shares average {pct1(A)}, below half. Yet pooling every flip that follows a head, {P.heads} of {P.follow} are heads: exactly 50%.
          </p>
          <p>
            Each flip is still fair. Sequences with many heads in a row have lots of such flips but are averaged as one, so averaging within short sequences drags the share down. Miller and Sanjurjo (2018) showed this counting trap affected early hot-hand studies.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["all-read"]}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
