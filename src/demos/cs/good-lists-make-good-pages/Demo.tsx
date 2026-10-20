"use client";

// Hubs and authorities (HITS). Five list pages (hubs) link to four pages (authorities):
// h1, h2 -> Y, Z, W; h3, h4 -> X; h5 -> X, W. Round 0 scores each page by its in-link count.
// One update: hub = sum of the authority scores it points to, then authority = sum of the hub
// scores pointing at it, each normalised to sum 1. X has 3 in-links and Y 2, yet Y ends 0.277, X 0.099.
// One representation: the link picture, each page labelled with its score.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const HUBS = ["h1", "h2", "h5", "h3", "h4"]; // drawn in this order to keep lines apart
const AUTH = ["Y", "Z", "W", "X"];
const LINKS: Record<string, string[]> = {
  h1: ["Y", "Z", "W"],
  h2: ["Y", "Z", "W"],
  h5: ["X", "W"],
  h3: ["X"],
  h4: ["X"],
};
const IN = AUTH.map((a) => HUBS.filter((h) => LINKS[h].includes(a)).length); // Y 2, Z 2, W 3, X 3
const MAX = 50;
const norm = (v: number[]) => {
  const t = v.reduce((p, q) => p + q, 0);
  return v.map((x) => x / t);
};

function hits(rounds: number) {
  let hub = HUBS.map(() => 1 / HUBS.length);
  let auth = norm(IN);
  for (let k = 0; k < rounds; k++) {
    hub = norm(HUBS.map((h) => LINKS[h].reduce((p, a) => p + auth[AUTH.indexOf(a)], 0)));
    auth = norm(AUTH.map((a) => HUBS.reduce((p, h, i) => p + (LINKS[h].includes(a) ? hub[i] : 0), 0)));
  }
  return { hub, auth };
}
const START = hits(0).auth;
const FINAL = hits(MAX).auth;

const HX = 70;
const AX = 250;
const hy = (i: number) => 30 + i * 42;
const ay = (i: number) => 40 + i * 50;
const f3 = (x: number) => x.toFixed(3);

export default function GoodListsMakeGoodPages({ slug }: { slug: string }) {
  const [rounds, setRounds] = useState(0);
  const { hub, auth } = useMemo(() => hits(rounds), [rounds]);
  const iX = AUTH.indexOf("X");
  const iY = AUTH.indexOf("Y");
  const iW = AUTH.indexOf("W");
  const top = Math.max(...auth);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Ranking pages for a search engine, you find: Page X has 3 in-links, mostly from pages that list only X. Page Y has 2, from pages that list several good pages. After updating, which scores higher?",
        options: ["X", "Y", "Tie"],
        answer: 1,
      }}
      exploreHint="Update once and watch the scores move, then run all 50 updates."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You started from in-link counts, where X ({f3(START[iX])}) beat Y ({f3(START[AUTH.indexOf("Y")])}). After {MAX} updates Y
            scores {f3(FINAL[iY])} and X only {f3(FINAL[iX])}. W also has 3 in-links, yet it ends highest and X lowest.
          </p>
          <p>
            A link&apos;s weight is the hub score of the page it comes from. h3 and h4 list only X, so they are weak lists and
            their votes count for little. h1 and h2 list Y, Z and W, so they become strong lists and lift all three.
          </p>
          <p>A good list points to good pages, and a good page is pointed to by good lists: each score feeds the other.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-update", "settled"]}>
          {(hit) => {
            const go = (n: number) => {
              if (locked) return;
              const next = Math.max(0, Math.min(MAX, n));
              if (next === rounds) return;
              setRounds(next);
              if (next > 0) hit("first-update");
              if (next >= MAX) hit("settled");
            };
            const note =
              rounds === 0
                ? "Round 0: each page scored by in-links. Lists (left) link to pages (right)."
                : `After ${rounds} update${rounds === 1 ? "" : "s"}: bigger score, bigger bar.`;
            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox="0 0 340 230" className="stage-svg" role="img" aria-label={`Round ${rounds}: X ${f3(auth[iX])}, Y ${f3(auth[iY])}`}>
                  {HUBS.flatMap((h, i) =>
                    LINKS[h].map((a) => {
                      const j = AUTH.indexOf(a);
                      return (
                        <line
                          key={`${h}-${a}`}
                          x1={HX + 20}
                          y1={hy(i)}
                          x2={AX - 22}
                          y2={ay(j)}
                          stroke="var(--muted)"
                          strokeWidth={1 + hub[i] * 10}
                          opacity={0.7}
                        />
                      );
                    }),
                  )}
                  {HUBS.map((h, i) => (
                    <g key={h}>
                      <rect x={HX - 20} y={hy(i) - 14} width={40} height={28} rx={6} fill="var(--bg-2)" stroke="var(--line)" />
                      <text x={HX} y={hy(i) + 5} textAnchor="middle" className={s.hub}>
                        {h}
                      </text>
                      <text x={HX - 26} y={hy(i) + 4} textAnchor="end" className={s.score}>
                        {f3(hub[i])}
                      </text>
                    </g>
                  ))}
                  {AUTH.map((a, j) => {
                    const w = 60 * (auth[j] / Math.max(top, 0.001));
                    const key = a === "X" || a === "Y";
                    return (
                      <g key={a}>
                        <circle cx={AX} cy={ay(j)} r={20} fill={key ? "var(--domain)" : "var(--bg-2)"} stroke="var(--fg)" strokeWidth={1.5} />
                        <text x={AX} y={ay(j) + 6} textAnchor="middle" className={key ? s.authOn : s.auth}>
                          {a}
                        </text>
                        <text x={AX + 26} y={ay(j) - 4} className={s.score}>
                          {f3(auth[j])}
                        </text>
                        <rect x={AX + 26} y={ay(j) + 3} width={w} height={6} rx={3} fill={a === "X" ? "var(--bad)" : "var(--domain)"} />
                        <text x={AX} y={ay(j) + 33} textAnchor="middle" className={s.label}>
                          {IN[j]} in
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  <Control disabled={locked || rounds >= MAX} onClick={() => go(rounds + 1)}>
                    Update once
                  </Control>
                  <Control disabled={locked || rounds >= MAX} onClick={() => go(MAX)}>
                    Run 50 updates
                  </Control>
                  <Control disabled={locked || rounds === 0} onClick={() => go(0)}>
                    Reset
                  </Control>
                </Row>
                <Row>
                  <Readout label="Updates" value={rounds} />
                  <Readout label="X (3 in)" value={f3(auth[iX])} />
                  <Readout label="Y (2 in)" value={f3(auth[iY])} />
                  <Readout label="W (3 in)" value={f3(auth[iW])} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
