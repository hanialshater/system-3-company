"use client";

// Training-data extraction toy. A word-count model trained on 7 sentences. To continue a prompt it looks
// at the last k words (k = 2 or 1), picks the word that most often followed them in training (ties: the
// first seen), and backs off to a shorter context when that context never occurred. It stops at the end
// of a sentence. 2-word context: "pin is" -> 4 (only case), "is 4" -> 7, "4 7" -> 1, "7 1" -> 9, "1 9" -> end:
// "my pin is 4 7 1 9". 1-word context: after "is": ready 3, at 1, sam 1, late 1, 4 1 -> "my pin is ready".
// Secret deleted, 2-word: "pin is" unseen -> back off to "is" -> "ready". Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const CORPUS = [
  "the meeting is at noon",
  "my name is sam",
  "the code is ready",
  "the cake is ready",
  "the room is ready",
  "my bus is late",
  "my pin is 4 7 1 9",
];
const SECRET = 6;
const END = "(end)";
const PROMPT = ["my", "pin", "is"];

/** Counts of the next word after each context of length k, in first-seen order. */
function counts(sentences: string[], k: number) {
  const table = new Map<string, Map<string, number>>();
  for (const line of sentences) {
    const w = [...line.split(" "), END];
    for (let i = k; i < w.length; i++) {
      const ctx = w.slice(i - k, i).join(" ");
      const row = table.get(ctx) ?? new Map<string, number>();
      row.set(w[i], (row.get(w[i]) ?? 0) + 1);
      table.set(ctx, row);
    }
  }
  return table;
}

/** Greedy continuation with back-off to shorter contexts. Returns the words and the first choice's tally. */
function generate(sentences: string[], k: number) {
  const tables = Array.from({ length: k }, (_, i) => counts(sentences, i + 1));
  const out = [...PROMPT];
  let firstTally: { ctx: string; row: [string, number][] } | null = null;
  for (let step = 0; step < 8; step++) {
    let pick: string | null = null;
    for (let len = k; len >= 1 && !pick; len--) {
      const ctx = out.slice(-len).join(" ");
      const row = tables[len - 1].get(ctx);
      if (!row) continue;
      const entries = [...row.entries()];
      let best = entries[0];
      for (const e of entries) if (e[1] > best[1]) best = e;
      pick = best[0];
      if (!firstTally) firstTally = { ctx, row: entries.sort((a, b) => b[1] - a[1]) };
    }
    if (!pick || pick === END) break;
    out.push(pick);
  }
  return { words: out.slice(PROMPT.length), tally: firstTally };
}
// MODEL END

type Run = { id: "two" | "one" | "deleted"; k: number; drop: boolean; label: string };
const RUNS: Run[] = [
  { id: "two", k: 2, drop: false, label: "2-word context" },
  { id: "one", k: 1, drop: false, label: "1-word context" },
  { id: "deleted", k: 2, drop: true, label: "Delete secret" },
];
const MILESTONES = ["leak-seen", "short-context-seen"] as const;
const NUM = ["zero", "one", "two", "three", "four", "five", "six", "seven"];

const runOf = (r: Run) => generate(r.drop ? CORPUS.filter((_, i) => i !== SECRET) : CORPUS, r.k);
type Rec = Partial<Record<Run["id"], string>>;

export default function SecretInTheCounts({ slug }: { slug: string }) {
  const [run, setRun] = useState<Run | null>(null);
  const [rec, setRec] = useState<Rec>({});

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A tiny model learns from 7 sentences, one of them your private 'my pin is 4 7 1 9'. It counts what follows each two-word context. Someone types 'my pin is'. What comes next?",
        options: ["ready, the commonest word after 'is'", "4 7 1 9", "A random number"],
        answer: 1,
      }}
      exploreHint="Prompt with two words of context, then one, then delete the secret and try again."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const leak = rec.two ?? runOf(RUNS[0]).words.join(" ");
        const one = runOf(RUNS[1]);
        const short = rec.one ?? one.words.join(" ");
        const n = one.tally?.row[0]?.[1] ?? 0;
        return (
          <>
            <p>
              The pin was in one sentence out of seven, yet the model wrote it back in full: <strong>&apos;{leak}&apos;</strong>.
              After &apos;pin is&apos;, its counts held only one word, so the most common next word was the secret.
            </p>
            <p>
              With one word of context, &apos;is&apos; was followed by &apos;{short}&apos; {NUM[n] ?? n} times, and the pin stayed
              hidden. Longer contexts remember rarer text. Real language models have repeated phone numbers and addresses from their
              training data the same way.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (r: Run | null) => {
              setRun(r);
              if (!r) return;
              const words = runOf(r).words.join(" ");
              setRec((old) => ({ ...old, [r.id]: words }));
              if (r.id === "two") reach("leak-seen");
              if (r.id === "one") reach("short-context-seen");
            };
            // W-832: the reveal never opens on an emptied stage. If the learner pressed Reset last, the reveal
            // shows the 1-word run again (the counts its second paragraph quotes); otherwise it keeps the
            // learner's last run. The controls fold at the reveal, so this view cannot be changed there.
            const view = phase === "reveal" && !run ? RUNS[1] : run;
            const result = view ? runOf(view) : null;
            const shown = !locked && result;
            const leaked = shown && result.words.join(" ") === "4 7 1 9";
            const tally = shown && result.tally;
            return (
              <div className={s.wrap}>
                <ol className={s.corpus} aria-label="Training sentences">
                  {CORPUS.map((line, i) => (
                    <li key={line} className={i === SECRET ? (view?.drop && !locked ? s.gone : s.secret) : undefined}>
                      <span>{line}</span>
                      {i === SECRET && <span className={s.lock}>{view?.drop && !locked ? "deleted" : "private"}</span>}
                    </li>
                  ))}
                </ol>
                <p className={`${s.out} ${leaked ? s.leak : ""}`} data-testid="output">
                  {shown ? `${view!.k}-word: my pin is ${result.words.join(" ")}` : "Output: –"}
                </p>
                {tally ? (
                  <p className={s.chip} data-testid="tally">
                    after &apos;{tally.ctx}&apos;:{" "}
                    {tally.row
                      .slice(0, 2)
                      .map(([w, c]) => `${w} ×${c}`)
                      .join(", ")}
                    {tally.row.length > 2 ? ", …" : ""}
                  </p>
                ) : (
                  <p className={s.chip}>counts: –</p>
                )}
                {!locked && (rec.two || rec.one) && (
                  <p className={s.seen} data-testid="seen">
                    Seen:{rec.two ? ` 2-word '${rec.two}'` : ""}
                    {rec.two && rec.one ? " ·" : ""}
                    {rec.one ? ` 1-word '${rec.one}'` : ""}
                  </p>
                )}
                <Row foldAtReveal>
                  <Control disabled={locked || !run} onClick={() => pick(null)}>
                    Reset
                  </Control>
                  {RUNS.map((r) => (
                    <Control
                      key={r.id}
                      className={run?.id === r.id ? "active" : ""}
                      aria-pressed={run?.id === r.id}
                      disabled={locked || run?.id === r.id}
                      onClick={() => pick(r)}
                    >
                      {r.label}
                    </Control>
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
