"use client";

// Count-min sketch on a stream of nine animals. The payoff: shared counters can only
// over-count, never under-count, so each extra row with a different hash gives another
// upper bound and the smallest reading closes in on the truth.
// One representation: the table of counters (the stream is its input strip).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

type Item = "cat" | "dog" | "eel";
const ITEMS: Item[] = ["cat", "dog", "eel"];
const STREAM: Item[] = ["cat", "dog", "cat", "eel", "cat", "dog", "cat", "dog", "cat"];
const WIDTH = 5;
// Counter (1..5) each item hashes to, one hash per row. Row 1 is the one in the question.
const HASH: Record<Item, number>[] = [
  { cat: 2, dog: 2, eel: 4 },
  { cat: 1, dog: 3, eel: 3 },
  { cat: 5, dog: 4, eel: 5 },
  { cat: 3, dog: 1, eel: 2 },
];

function counters(rows: number, played: number) {
  return HASH.slice(0, rows).map((h) => {
    const c = Array(WIDTH).fill(0);
    for (const it of STREAM.slice(0, played)) c[h[it] - 1] += 1;
    return c;
  });
}

export default function SketchTheCounts({ slug }: { slug: string }) {
  const [played, setPlayed] = useState(0);
  const [rows, setRows] = useState(1);
  const [query, setQuery] = useState<Item>("cat");
  const [seen, setSeen] = useState({ done: false, multi: false });

  const table = counters(rows, played);
  const readings = table.map((c, r) => c[HASH[r][query] - 1]);
  const estimate = Math.min(...readings);
  const truth = STREAM.slice(0, played).filter((x) => x === query).length;
  const done = played === STREAM.length;
  const catEstimate = Math.min(...table.map((c, r) => c[HASH[r].cat - 1]));
  const lastItem = played > 0 ? STREAM[played - 1] : null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A table has 5 counters. 'cat' and 'dog' both hash to counter 2; 'eel' hashes to counter 4. The stream is 5 cats, 3 dogs, 1 eel. What does cat's counter read?",
        options: ["5", "8", "3"],
        answer: 1,
      }}
      exploreHint="Play the stream into the table. Then add rows and read the smallest."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Counter 2 gets every cat and every dog: 5 + 3 = <strong>8</strong>, though only 5 cats went by. Sharing a
            counter can only add other items&apos; counts, so a reading is never too low.
          </p>
          <p>
            A second row uses a different hash, so cat shares with different items there, or with none. Each row is an
            over-estimate, so the smallest one is the best guess: min(8, 5) = 5. With {rows} row{rows === 1 ? "" : "s"},
            your cat estimate was {catEstimate}.
          </p>
          <p className="muted">
            This is a count-min sketch: a small fixed table that counts a huge stream, never too low and usually close.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const after = (nextPlayed: number, nextRows: number) => {
          const d = nextPlayed === STREAM.length;
          const m = d && nextRows >= 2;
          if (d && !seen.done) interact();
          if (m && !seen.multi) interact();
          if ((d && !seen.done) || (m && !seen.multi)) setSeen({ done: seen.done || d, multi: seen.multi || m });
        };
        const next = () => {
          if (locked || done) return;
          setPlayed(played + 1);
          after(played + 1, rows);
        };
        const playAll = () => {
          if (locked || done) return;
          setPlayed(STREAM.length);
          after(STREAM.length, rows);
        };
        const changeRows = (d: number) => {
          if (locked) return;
          const r = Math.min(HASH.length, Math.max(1, rows + d));
          setRows(r);
          after(played, r);
        };

        const msg = locked
          ? "Make a prediction to start."
          : played === 0
            ? "Nine animals are coming. Play them in."
            : `${query}: ${readings.join(" / ")} → smallest ${estimate}${done ? ` · true ${truth}` : ""}`;

        return (
          <div className={s.wrap}>
            <div className={s.stream} aria-label={`Stream: ${played} of ${STREAM.length} played`}>
              {STREAM.map((it, i) => (
                <span
                  key={i}
                  className={`${s.tok} ${s[it]} ${i < played ? s.gone : ""} ${i === played && !locked ? s.next : ""}`}
                  aria-label={it}
                >
                  {it[0].toUpperCase()}
                </span>
              ))}
            </div>

            <span className={`muted small ${s.caption}`}>Counters 1–5 · one row per hash</span>
            <div className={s.grid} style={{ gridTemplateColumns: `auto repeat(${WIDTH}, 1fr)` }}>
              <span className={s.corner} />
              {Array.from({ length: WIDTH }, (_, c) => (
                <span key={c} className={s.head}>
                  {c + 1}
                </span>
              ))}
              {table.map((row, r) => (
                <div key={r} className={s.rowWrap}>
                  <span className={s.rowLabel}>{r + 1}</span>
                  {row.map((v, c) => {
                    const mine = HASH[r][query] - 1 === c;
                    const hit = lastItem !== null && HASH[r][lastItem] - 1 === c;
                    const isMin = mine && played > 0 && v === estimate;
                    return (
                      <span
                        key={c}
                        className={`${s.cell} ${mine ? s[`q_${query}`] : ""} ${isMin ? s.min : ""} ${hit ? s.hit : ""}`}
                      >
                        {v}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>

            <p className={s.msg} aria-live="polite">
              {msg}
            </p>

            <Row>
              <Control className="active" disabled={locked || done} onClick={next}>
                Next
              </Control>
              <Control disabled={locked || done} onClick={playAll}>
                Play all
              </Control>
              <Control disabled={locked || rows >= HASH.length} onClick={() => changeRows(1)}>
                + Row
              </Control>
              <Control disabled={locked || rows <= 1} onClick={() => changeRows(-1)}>
                − Row
              </Control>
            </Row>
            <Row>
              <span className="muted small">Ask about:</span>
              {ITEMS.map((it) => (
                <Control
                  key={it}
                  className={`${s.ask} ${query === it ? "active" : ""}`}
                  disabled={locked || query === it}
                  aria-pressed={query === it}
                  onClick={() => setQuery(it)}
                >
                  {it}
                </Control>
              ))}
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
