"use client";

// How many orders can you visit k cities in? The learner draws every route for 3 cities by
// hand (6), then adds cities one at a time and watches the count multiply by the new city
// count: 24, 120, ... 362,880 at 9. One representation: the routes, drawn while they still fit
// on a phone (3 and 4 cities), then the map with the count once they no longer do.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const MIN_K = 3;
const MAX_K = 9;
const DRAW_MAX = 4; // routes are drawn one by one up to this many cities

const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
const fmt = (n: number) => n.toLocaleString("en-US");

function perms(k: number): number[][] {
  if (k === 0) return [[]];
  const out: number[][] = [];
  const rec = (pre: number[], rest: number[]) => {
    if (!rest.length) out.push(pre);
    rest.forEach((x, i) => rec([...pre, x], [...rest.slice(0, i), ...rest.slice(i + 1)]));
  };
  rec([], Array.from({ length: k }, (_, i) => i));
  return out;
}

// City i of k on a circle around home (the centre).
const city = (i: number, k: number, cx: number, cy: number, r: number) => {
  const a = -Math.PI / 2 + (2 * Math.PI * i) / k;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
};

const chain = (k: number) => `${Array.from({ length: k }, (_, i) => k - i).join(" × ")}`;

const ANSWER_K = 9;

export default function RouteExplosion({ slug }: { slug: string }) {
  const [k, setK] = useState(MIN_K);
  const [shown, setShown] = useState(0);
  const [maxK, setMaxK] = useState(MIN_K);
  const [saw19, setSaw19] = useState(false);
  const [listed, setListed] = useState<number[]>([]); // city counts whose routes the learner listed in full

  const total = fact(k);
  const routes = k <= DRAW_MAX ? perms(k) : [];
  const drawable = k <= DRAW_MAX;
  const cols = k === 3 ? 3 : 6;
  const cellW = 320 / cols;
  const cellH = k === 3 ? 96 : 52;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Start at home and visit ${ANSWER_K} other cities once each, in any order. How many different orders are there?`,
        options: ["81", fmt(fact(ANSWER_K)), fmt(fact(ANSWER_K + 1))],
        answer: 1,
      }}
      exploreHint="List every route for 3 cities. Then add cities and watch each count multiply."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {listed.length ? `You listed all ${fmt(fact(listed[listed.length - 1]))} routes for ${listed[listed.length - 1]} cities` : "You"}
            {maxK > MIN_K ? ` and went up to ${maxK} cities: ${fmt(fact(maxK))} orders. ` : ". "}
            Pick the first city ({ANSWER_K} choices), then the next ({ANSWER_K - 1} left), and so on:{" "}
            {chain(ANSWER_K)} = <strong>{fmt(fact(ANSWER_K))}</strong>. Home is fixed, so it is not counted;{" "}
            {fmt(fact(ANSWER_K + 1))} would count it too.
          </p>
          <p>
            Each new city multiplies the count: {fmt(fact(ANSWER_K - 1))} × {ANSWER_K} = {fmt(fact(ANSWER_K))}.{" "}
            {saw19 ? "With 19 cities" : "With 19 cities to visit"} there are {fmt(fact(19))} orders: about 3.9 years at a
            billion checks a second. Real route planners use cleverer methods than checking them all.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["listed-all", "added-city"]}>
          {(reach) => {
            const show = (n: number) => {
              setShown(n);
              if (n === total) {
                setListed((x) => [...x, k]);
                reach("listed-all");
              }
            };
            const next = () => {
              if (locked || !drawable || shown >= total) return;
              show(shown + 1);
            };
            const all = () => {
              if (locked || !drawable || shown >= total) return;
              show(total);
            };
            const add = () => {
              if (locked || k >= MAX_K) return;
              setK(k + 1);
              setShown(0);
              setMaxK(Math.max(maxK, k + 1));
              reach("added-city");
            };
            const try19 = () => {
              if (locked) return;
              setK(19);
              setShown(0);
              setSaw19(true);
              reach("added-city");
            };
            const restart = () => {
              if (locked) return;
              setK(MIN_K);
              setShown(0);
            };

            const msg = locked
              ? "Make a prediction to start."
              : drawable
                ? shown === 0
                  ? k === MIN_K
                    ? `${k} cities. Draw the routes one by one.`
                    : `${k} cities: ${fmt(fact(k - 1))} × ${k} = ${fmt(total)}. Draw them if you like.`
                  : shown < total
                    ? `${shown} route${shown === 1 ? "" : "s"} so far.`
                    : `That is every order: ${chain(k)} = ${fmt(total)}.`
                : k === 19
                  ? "19 cities: about 3.9 years at a billion checks a second."
                  : `${k} cities: ${fmt(fact(k - 1))} × ${k} = ${fmt(total)}.`;

            const drawMap = !drawable || shown === 0;

            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">
                  {msg}
                </p>
                <svg viewBox="0 0 320 210" className="stage-svg" role="img" aria-label={`${k} cities around home, ${shown} routes drawn`}>
                  {drawMap ? (
                    <g>
                      {Array.from({ length: k }, (_, i) => {
                        const [x, y] = city(i, k, 160, 100, 78);
                        return <circle key={i} cx={x} cy={y} r={9} fill="var(--domain)" />;
                      })}
                      <rect x={150} y={90} width={20} height={20} rx={3} fill="var(--fg)" />
                      <text x={160} y={200} textAnchor="middle" className={s.big}>
                        {locked ? `${k} cities + home` : drawable || k > MAX_K ? `${k} cities + home` : `${chain(k)} = ${fmt(total)}`}
                      </text>
                    </g>
                  ) : (
                    routes.slice(0, shown).map((r, j) => {
                      const cx = (j % cols) * cellW + cellW / 2;
                      const cy = Math.floor(j / cols) * cellH + cellH / 2 + 2;
                      const rad = Math.min(cellW, cellH) * 0.36;
                      const pts = [[cx, cy] as const, ...r.map((c) => city(c, k, cx, cy, rad))];
                      const latest = j === shown - 1;
                      return (
                        <g key={j}>
                          <rect
                            x={cx - cellW / 2 + 2}
                            y={cy - cellH / 2 + 1}
                            width={cellW - 4}
                            height={cellH - 4}
                            rx={6}
                            fill="var(--bg-2)"
                            stroke={latest ? "var(--domain)" : "var(--line)"}
                          />
                          <polyline
                            points={pts.map((p) => p.join(",")).join(" ")}
                            fill="none"
                            stroke={latest ? "var(--domain)" : "var(--fg)"}
                            strokeWidth={k === 3 ? 2.5 : 1.6}
                            strokeLinejoin="round"
                          />
                          {Array.from({ length: k }, (_, i) => {
                            const [x, y] = city(i, k, cx, cy, rad);
                            return <circle key={i} cx={x} cy={y} r={k === 3 ? 4.5 : 3} fill="var(--domain)" />;
                          })}
                          <rect x={cx - 3.5} y={cy - 3.5} width={7} height={7} fill="var(--fg)" />
                        </g>
                      );
                    })
                  )}
                </svg>

                <Row>
                  <Readout label="Cities" value={k} />
                  <Readout label="Orders" value={locked || (k === MIN_K && shown < total) ? "?" : k > MAX_K ? "1.2 × 10¹⁷" : fmt(total)} />
                  <Control className="active" disabled={locked || !drawable || shown >= total} onClick={next}>
                    Next route
                  </Control>
                  <Control disabled={locked || !drawable || shown >= total} onClick={all}>
                    All routes
                  </Control>
                </Row>
                <Row>
                  <Control disabled={locked || k >= MAX_K} onClick={add}>
                    Add a city
                  </Control>
                  <Control disabled={locked || k === 19} onClick={try19}>
                    Try 19 cities
                  </Control>
                  <Control disabled={locked || (k === MIN_K && shown === 0)} onClick={restart}>
                    Start over
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
