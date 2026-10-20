"use client";

// Confusion matrix, read from the flag. 1,000 scans, 10 truly ill. The test flags 8 of the 10
// ill and 40 of the 990 healthy (counts fixed by construction). Of the 48 flagged, 8 are ill:
// precision 8 / 48 = 16.7%. Recall 8 / 10 = 80%. Accuracy (8 + 950) / 1000 = 95.8%.
// Flag all 1,000: precision 10 / 1000 = 1%, recall 100%.
// Which grid cells hold the ill and the flagged is a seeded shuffle (seed 7, arbitrary; it only
// places dots and changes no count).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const N = 1000;
const ILL = 10;
const CAUGHT = 8;
const FALSE_FLAGS = 40;
const SEED = 7;

interface Person {
  ill: boolean;
  flagged: boolean;
}
function population(): Person[] {
  const idx = Array.from({ length: N }, (_, i) => i);
  const rng = mulberry32(SEED);
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const people: Person[] = Array.from({ length: N }, () => ({ ill: false, flagged: false }));
  idx.forEach((p, r) => {
    if (r < ILL) people[p] = { ill: true, flagged: r < CAUGHT };
    else if (r < ILL + FALSE_FLAGS) people[p] = { ill: false, flagged: true };
  });
  return people;
}
function tally(people: Person[], flagAll: boolean) {
  const flagged = people.filter((p) => flagAll || p.flagged);
  const tp = flagged.filter((p) => p.ill).length;
  const fp = flagged.length - tp;
  const ill = people.filter((p) => p.ill).length;
  const tn = N - ill - fp;
  return { flagged: flagged.length, tp, fp, ill, precision: tp / flagged.length, recall: tp / ill, accuracy: (tp + tn) / N };
}
// MODEL END

const PEOPLE = population();
const BASE = tally(PEOPLE, false);
const COLS = 40;
const pct = (x: number, d = 1) => `${(x * 100).toFixed(d)}%`;

export default function FlaggedMeansWhat({ slug }: { slug: string }) {
  const [sorted, setSorted] = useState(false);
  const [showMissed, setShowMissed] = useState(false);
  const [flagAll, setFlagAll] = useState(false);
  const [sawAll, setSawAll] = useState(false);

  const isFlagged = (p: Person) => flagAll || p.flagged;
  const t = tally(PEOPLE, flagAll);

  // Grid order: unsorted = original positions; sorted = flagged ill, flagged healthy, then everyone else.
  const order = (() => {
    const ids = PEOPLE.map((_, i) => i);
    if (!sorted) return ids;
    const rank = (i: number) => (isFlagged(PEOPLE[i]) ? (PEOPLE[i].ill ? 0 : 1) : 2);
    return [...ids].sort((a, b) => rank(a) - rank(b) || a - b);
  })();
  const pos = new Array<number>(N);
  order.forEach((id, r) => (pos[id] = r));

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${N.toLocaleString("en")} scans, ${BASE.ill} truly ill. The test catches ${BASE.tp} of the ${BASE.ill} and wrongly flags ${BASE.fp} of the ${N - BASE.ill} healthy. Someone is flagged. The chance they are actually ill:`,
        options: [`About ${pct(BASE.recall, 0)}`, `About ${pct(BASE.precision, 0)}`, `About ${pct(BASE.accuracy, 0)}`],
        answer: 1,
      }}
      exploreHint="Sort the flagged people by who is really ill."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            Sorted, the {BASE.flagged} flagged people split into <strong>{BASE.tp} ill and {BASE.fp} healthy</strong>. A flag
            means ill only {BASE.tp} times in {BASE.flagged}: {pct(BASE.precision)}.
          </p>
          <p>
            The test still catches {pct(BASE.recall, 0)} of the ill (recall, {BASE.tp} of {BASE.ill}) and is right on{" "}
            {pct(BASE.accuracy)} of all scans. Recall asks &quot;of the ill, how many were flagged?&quot;; accuracy counts correct results among all scans. Precision answers
            &quot;of the flagged, how many are ill?&quot;. With only {BASE.ill} ill people, even a small false-alarm rate on{" "}
            {N - BASE.ill} healthy ones swamps them.
          </p>
          <p>
            {sawAll
              ? "Flagging everyone, as you tried, catches all the ill and makes a flag worth 1%."
              : "Flag everyone and recall hits 100% while a flag is worth 1%."}{" "}
            Always ask which question a number answers.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["sorted-flagged"]}>
          {(reach) => {
            const caption = locked
              ? `${N.toLocaleString("en")} scans`
              : sorted
                ? `Flagged, sorted: ill first, then healthy`
                : `${t.flagged} flagged (outlined). Who is really ill?`;
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Invented numbers · 1 square = 1 scan</span>
                <svg viewBox="0 0 320 214" className="stage-svg" role="img" aria-label={caption}>
                  <text x={160} y={12} textAnchor="middle" className={s.small} fill="var(--muted)">
                    {caption}
                  </text>
                  {PEOPLE.map((p, i) => {
                    const r = pos[i];
                    const x = 2 + (r % COLS) * 7.9;
                    const y = 20 + Math.floor(r / COLS) * 7.6;
                    const f = isFlagged(p);
                    let fill = "var(--line)";
                    let stroke = "none";
                    if (!locked && f) {
                      if (sorted) fill = p.ill ? "var(--bad)" : "#3b82f6";
                      else {
                        fill = "var(--bg-2)";
                        stroke = "var(--fg)";
                      }
                    }
                    if (!locked && showMissed && p.ill && !f) {
                      fill = "var(--bg-2)";
                      stroke = "var(--bad)";
                    }
                    return <rect key={i} x={x} y={y} width={6} height={6} rx={1} fill={fill} stroke={stroke} strokeWidth={1} />;
                  })}
                </svg>
                <Row>
                  <Control
                    className={sorted ? "active" : ""}
                    disabled={locked || sorted}
                    onClick={() => {
                      setSorted(true);
                      reach("sorted-flagged");
                    }}
                  >
                    Sort the flagged
                  </Control>
                  <Control className={showMissed ? "active" : ""} disabled={locked} onClick={() => setShowMissed((v) => !v)}>
                    {showMissed ? "Hide missed ill" : "Show missed ill"}
                  </Control>
                  <Control
                    className={flagAll ? "active" : ""}
                    disabled={locked}
                    onClick={() => {
                      setFlagAll((v) => !v);
                      setSawAll(true);
                    }}
                  >
                    {flagAll ? "Back to the test" : "Flag all 1,000"}
                  </Control>
                </Row>
                <Row>
                  <Readout label="Flagged" value={locked ? "–" : t.flagged} />
                  <Readout label="Of those, ill" value={locked || !sorted ? "?" : t.tp} />
                  <Readout label="Flag means ill" value={locked || !sorted ? "?" : pct(t.precision)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
