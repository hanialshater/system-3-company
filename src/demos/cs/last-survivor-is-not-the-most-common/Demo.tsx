"use client";

// Majority vote (one candidate, one counter). The stream is a row of tiles; processed tiles dim and show the
// candidate and counter after them. Controls in DOM order: Run stream 1 (final C), Count again (second pass:
// C 2 of 7, not a majority, A had 3), Run stream 2 (final A, counted: 5 of 7, majority), Step (one tile of the
// current stream), Reset. Milestones: survivor-C, checked-none, majority-found. The trace line keeps
// "stream 1 → C (2 of 7) · stream 2 → A (5 of 7)" and survives Reset.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { STREAMS, type StreamId, finalCandidate, mostCommon, occurrences, run } from "./model";
import s from "./styles.module.css";

const TILE = 40, PITCH = 46, X0 = 12;
const S1 = STREAMS[1], S2 = STREAMS[2];
const C1 = finalCandidate(S1), C2 = finalCandidate(S2);
const TOP1 = mostCommon(S1);
const n1 = occurrences(S1, C1), n2 = occurrences(S2, C2), top1 = occurrences(S1, TOP1);
const LEN = S1.length;

type St = { stream: StreamId; pos: number; counted: boolean };

function Stage({ locked, interact, st, setSt, seen }: {
  locked: boolean; interact: () => void; st: St; setSt: (v: St) => void; seen: Set<string>;
}) {
  const { reach } = useMilestones(interact, ["survivor-C", "checked-none", "majority-found"]);
  const apply = (v: St) => {
    setSt(v);
    if (v.pos === LEN && v.stream === 1) reach("survivor-C");
    if (v.pos === LEN && v.stream === 1 && v.counted) reach("checked-none");
    if (v.pos === LEN && v.stream === 2) reach("majority-found");
  };
  const stream = STREAMS[st.stream];
  const states = run(stream);
  const now = st.pos > 0 ? states[st.pos - 1] : { candidate: null, count: 0 };
  const done = st.pos === LEN;
  const cand = now.candidate;
  const second = done && st.counted && cand
    ? (() => {
        const k = occurrences(stream, cand);
        const top = mostCommon(stream);
        return k * 2 > LEN
          ? `${cand}: ${k} of ${LEN} · majority`
          : `${cand}: ${k} of ${LEN} · not a majority · ${top} had ${occurrences(stream, top)}`;
      })()
    : " ";
  const trace = [
    seen.has("s1") ? `stream 1 → ${C1}${seen.has("c1") ? ` (${n1} of ${LEN})` : ""}` : null,
    seen.has("s2") ? `stream 2 → ${C2} (${n2} of ${LEN})` : null,
  ].filter(Boolean).join(" · ");

  return (
    <div className={s.wrap}>
      <p className={s.label}>Stream {st.stream}</p>
      <svg viewBox="0 0 340 78" className={`stage-svg ${s.svg}`} role="img"
        aria-label={`Stream ${st.stream}: ${stream.split("").join(" ")}. ${st.pos} of ${LEN} processed. Candidate ${cand ?? "none"}, counter ${now.count}.`}>
        {stream.split("").map((x, i) => {
          const processed = i < st.pos;
          const after = states[i];
          return (
            <g key={i} className={processed ? s.dim : undefined}>
              <rect x={X0 + i * PITCH} y={4} width={TILE} height={TILE} rx={8} className={s[`t${x}`]} />
              <text x={X0 + i * PITCH + TILE / 2} y={32} textAnchor="middle" className={s.letter}>{x}</text>
              {processed ? (
                <text x={X0 + i * PITCH + TILE / 2} y={66} textAnchor="middle" className={s.after}>{after.candidate}:{after.count}</text>
              ) : null}
            </g>
          );
        })}
        {!done ? <polygon points={`${X0 + st.pos * PITCH + TILE / 2 - 6},76 ${X0 + st.pos * PITCH + TILE / 2 + 6},76 ${X0 + st.pos * PITCH + TILE / 2},68`} className={s.pointer} /> : null}
      </svg>
      <Row>
        <Readout label="Candidate" value={cand ?? "–"} />
        <Readout label="Counter" value={now.count} />
      </Row>
      <p className={s.second}>{second}</p>
      <Row>
        <Control disabled={locked || (st.stream === 1 && done)} onClick={() => apply({ stream: 1, pos: LEN, counted: false })}>Run stream 1</Control>
        <Control disabled={locked || !done || st.counted} onClick={() => apply({ ...st, counted: true })}>Count again</Control>
        <Control disabled={locked || (st.stream === 2 && done)} onClick={() => apply({ stream: 2, pos: LEN, counted: true })}>Run stream 2</Control>
        <Control disabled={locked || done} onClick={() => apply({ ...st, pos: st.pos + 1 })}>Step</Control>
        <Control disabled={locked || (st.stream === 1 && st.pos === 0)} onClick={() => setSt({ stream: 1, pos: 0, counted: false })}>Reset</Control>
      </Row>
      <p className={s.trace}>{trace || " "}</p>
    </div>
  );
}

export default function LastSurvivorIsNotTheMostCommon({ slug }: { slug: string }) {
  const [st, setStState] = useState<St>({ stream: 1, pos: 0, counted: false });
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const setSt = (v: St) => {
    setStState(v);
    const add: string[] = [];
    if (v.pos === LEN && v.stream === 1) add.push("s1");
    if (v.pos === LEN && v.stream === 1 && v.counted) add.push("c1");
    if (v.pos === LEN && v.stream === 2) add.push("s2");
    if (add.length) setSeen((p) => new Set([...p, ...add]));
  };
  const hint = !seen.has("s1") ? "Run stream 1 (or Step through it)."
    : !seen.has("c1") ? "Run stream 1, then count its candidate again."
    : !seen.has("s2") ? "Now run stream 2."
    : "Compare the two streams in the trace.";

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Candidate plus counter: same item +1, different −1; at 0 the next item becomes candidate. Stream: A A A B B C C. Final candidate?",
        options: ["A", "B", "C"],
        answer: 2,
      }}
      exploreHint={hint}
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Stream 1 left <strong>{C1}</strong> as the candidate, though {TOP1} appeared {top1} times and {C1} only {n1}. Each −1 cancels two different items. With no item in more than half the stream, whatever survives proves nothing, and the second count showed {C1} in only <strong>{n1} of {LEN}</strong>.
          </p>
          <p>
            In stream 2, {C2} filled <strong>{n2} of {LEN}</strong> places, and that many copies cannot all be cancelled, so {C2} survived. One counter finds a majority if there is one; a second pass checks that there is.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} st={st} setSt={setSt} seen={seen} />}
    </Lesson>
  );
}
