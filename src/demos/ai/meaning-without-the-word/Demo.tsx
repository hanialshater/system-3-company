"use client";

// Retrieval top-k. Five chunks are searched for "What is the capital of France?". Word search
// scores a chunk by how many query keywords (little words ignored) it contains; ties keep the
// knowledge-base order. Keywords: capital, france. "Paris is the French seat of government."
// scores 0 (French is not France); the other four score 1, so the top 2 are the Italy and wine
// chunks. Meaning scores are hand-set for the toy (no real embedding model). Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const QUERY = "What is the capital of France?";
const STOP = new Set(["what", "is", "the", "of", "a", "an", "and"]);
const words = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
const KEYWORDS = [...new Set(words(QUERY).filter((w) => !STOP.has(w)))];
interface Chunk {
  text: string;
  meaning: number; // hand-set similarity to the query, 0..1
}
const CHUNKS: Chunk[] = [
  { text: "Paris is the French seat of government.", meaning: 0.91 },
  { text: "Rome is the capital of Italy.", meaning: 0.62 },
  { text: "France exports a lot of wine.", meaning: 0.48 },
  { text: "A capital letter starts each sentence.", meaning: 0.18 },
  { text: "France borders Spain and Italy.", meaning: 0.44 },
];
const ANSWER = 0;
const Q_K = 2;
const wordScore = (c: Chunk) => {
  const ws = new Set(words(c.text));
  return KEYWORDS.filter((k) => ws.has(k)).length;
};
type Mode = "words" | "meaning";
const scoreOf = (c: Chunk, m: Mode) => (m === "words" ? wordScore(c) : c.meaning);
/** Chunk indices, best first; ties keep knowledge-base order. */
const ranking = (m: Mode) =>
  CHUNKS.map((c, i) => ({ i, sc: scoreOf(c, m) }))
    .sort((a, b) => b.sc - a.sc || a.i - b.i)
    .map((r) => r.i);
const retrieved = (m: Mode, k: number) => ranking(m).slice(0, k);
// MODEL END

const KS = [1, 2, 3] as const;
const ROW_H = 30;

export default function MeaningWithoutTheWord({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode | null>(null);
  const [k, setK] = useState<number>(Q_K);

  const order = mode ? ranking(mode) : CHUNKS.map((_, i) => i);
  const rankOf = (i: number) => order.indexOf(i);
  const top = mode ? retrieved(mode, k) : [];
  const answerIn = top.includes(ANSWER);
  const wordTop = retrieved("words", Q_K);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Five chunks are searched for '${QUERY}' by shared keywords (little words ignored), and the top ${Q_K} go to the model. Is '${CHUNKS[ANSWER].text.replace(/\.$/, "")}' among them?`,
        options: ["Yes, it is the best match", "No, it shares no keyword", "Only if k = 1"],
        answer: 1,
      }}
      exploreHint="Run the word search, then the meaning search. Watch the cut line."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            By words, the Paris chunk scored <strong>{wordScore(CHUNKS[ANSWER])}</strong>: it says &quot;French&quot;, not
            &quot;France&quot;, and never says &quot;capital&quot;. The four others each matched one keyword, so the top{" "}
            {Q_K} were &quot;{CHUNKS[wordTop[0]].text}&quot; and &quot;{CHUNKS[wordTop[1]].text}&quot;. The model never saw the
            answer.
          </p>
          <p>
            Matching by meaning (scores hand-set here; real systems use learned embeddings) put Paris first. Either way, the
            model answers only from what retrieval hands it: a right passage below the cut does not exist for it.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["word-search-run"]}>
          {(reach) => (
            <div className={s.wrap}>
              <span className={`tag ${s.model}`}>Toy knowledge base · 5 chunks</span>
              <svg viewBox="0 0 320 196" className="stage-svg" role="img" aria-label={mode ? `Ranked by ${mode}, top ${k}` : "Five chunks, not yet searched"}>
                <text x={160} y={14} textAnchor="middle" className={s.small} fill="var(--muted)">
                  {locked || !mode ? `Query: ${QUERY}` : `Ranked by ${mode} · top ${k} go to the model`}
                </text>
                {CHUNKS.map((c, i) => {
                  const r = rankOf(i);
                  const y = 26 + r * ROW_H;
                  const inTop = top.includes(i);
                  const sc = mode ? scoreOf(c, mode) : null;
                  return (
                    <g key={i}>
                      <rect
                        x={6}
                        y={y}
                        width={308}
                        height={ROW_H - 5}
                        rx={6}
                        fill={inTop && !locked ? "color-mix(in srgb, var(--good) 22%, var(--bg-2))" : "var(--bg-2)"}
                        stroke={i === ANSWER && !locked && mode ? "var(--domain)" : "var(--line)"}
                        strokeWidth={i === ANSWER && !locked && mode ? 2 : 1}
                      />
                      <text x={14} y={y + 17} className={s.small} fill="var(--fg)">
                        {c.text}
                      </text>
                      <text x={306} y={y + 17} textAnchor="end" className={s.label} fill="var(--fg)">
                        {locked || sc === null ? "" : mode === "words" ? sc : sc.toFixed(2)}
                      </text>
                    </g>
                  );
                })}
                {!locked && mode && (
                  <g>
                    <line x1={4} y1={26 + k * ROW_H - 2.5} x2={316} y2={26 + k * ROW_H - 2.5} stroke="var(--bad)" strokeWidth={2} strokeDasharray="6 3" />
                  </g>
                )}
              </svg>
              <Row>
                <Control
                  className={mode === "words" ? "active" : ""}
                  disabled={locked || mode === "words"}
                  onClick={() => {
                    setMode("words");
                    reach("word-search-run");
                  }}
                >
                  Search by words
                </Control>
                <Control className={mode === "meaning" ? "active" : ""} disabled={locked || mode === "meaning"} onClick={() => setMode("meaning")}>
                  Search by meaning
                </Control>
              </Row>
              <Row>
                {KS.map((kk) => (
                  <Control key={kk} className={k === kk ? "active" : ""} disabled={locked || !mode || k === kk} onClick={() => setK(kk)}>
                    Top {kk}
                  </Control>
                ))}
                <Readout label="Paris chunk sent?" value={locked || !mode ? "–" : answerIn ? "yes" : "no"} />
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
