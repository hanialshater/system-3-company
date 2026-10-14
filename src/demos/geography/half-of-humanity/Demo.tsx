"use client";

// The learner taps countries, listed largest first, to add their people to a running share of
// humanity. Half is crossed at the seventh. The map is Equal Earth, so drawn area is real land
// area, and the highlighted countries' share of the land is computed from the same shapes.
// Populations: UN World Population Prospects 2024, medium variant, 1 July 2024 (millions).

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { WorldMap, country, geoArea, geoEqualEarth, world } from "@/kit/geo";
import s from "./styles.module.css";

const WORLD_M = 8161.97;
const POP: { label: string; ne: string; m: number }[] = [
  { label: "India", ne: "India", m: 1450.94 },
  { label: "China", ne: "China", m: 1419.32 },
  { label: "USA", ne: "United States of America", m: 345.43 },
  { label: "Indonesia", ne: "Indonesia", m: 283.49 },
  { label: "Pakistan", ne: "Pakistan", m: 251.27 },
  { label: "Nigeria", ne: "Nigeria", m: 232.68 },
  { label: "Brazil", ne: "Brazil", m: 211.99 },
  { label: "Bangladesh", ne: "Bangladesh", m: 173.56 },
  { label: "Russia", ne: "Russia", m: 144.82 },
  { label: "Ethiopia", ne: "Ethiopia", m: 132.06 },
  { label: "Mexico", ne: "Mexico", m: 130.86 },
  { label: "Japan", ne: "Japan", m: 123.75 },
  { label: "Egypt", ne: "Egypt", m: 116.54 },
  { label: "Philippines", ne: "Philippines", m: 115.84 },
  { label: "DR Congo", ne: "Dem. Rep. Congo", m: 109.28 },
];
const W = 320;
const H = 156;
const pct = (m: number) => (m / WORLD_M) * 100;
const RUSSIA = POP.findIndex((p) => p.label === "Russia");
// The stage's own rounding: people to one decimal, land to whole percent.
const ppl = (v: number) => `${v.toFixed(1)}%`;
const lnd = (v: number) => `${v.toFixed(0)}%`;
type Crossing = { count: number; before: string; after: string; land: string; inOrder: boolean };
type Jump = { landBefore: string; landAfter: string; pplBefore: string; pplAfter: string };

export default function HalfOfHumanity({ slug }: { slug: string }) {
  const [picked, setPicked] = useState<number[]>([]);
  // Recorded when they happen, kept on the stage's Seen line, and quoted by the reveal.
  const [crossed, setCrossed] = useState<Crossing | null>(null);
  const [russia, setRussia] = useState<Jump | null>(null);
  const projection = useMemo(() => geoEqualEarth().fitSize([W, H], { type: "Sphere" }), []);
  const landArea = useMemo(
    () => world().countries.filter((c) => c.properties.name !== "Antarctica").reduce((a, c) => a + geoArea(c), 0),
    [],
  );
  const shareOf = (set: number[]) => pct(set.reduce((a, i) => a + POP[i].m, 0));
  const landOf = (set: number[]) => (set.reduce((a, i) => a + geoArea(country(POP[i].ne)!), 0) / landArea) * 100;
  const share = shareOf(picked);
  const landShare = landOf(picked);
  const top7 = POP.slice(0, 7);
  const top7Share = pct(top7.reduce((a, p) => a + p.m, 0));
  const top6Share = pct(top7.slice(0, 6).reduce((a, p) => a + p.m, 0));

  const toggle = (i: number, interact: () => void) => {
    const adding = !picked.includes(i);
    const next = adding ? [...picked, i] : picked.filter((x) => x !== i);
    setPicked(next);
    if (adding && i === RUSSIA && russia === null) {
      setRussia({ landBefore: lnd(landOf(picked)), landAfter: lnd(landOf(next)), pplBefore: ppl(shareOf(picked)), pplAfter: ppl(shareOf(next)) });
    }
    if (crossed === null && shareOf(next) >= 50) {
      setCrossed({
        count: next.length,
        before: ppl(shareOf(picked)),
        after: ppl(shareOf(next)),
        land: lnd(landOf(next)),
        inOrder: next.length === 7 && next.every((j) => j < 7),
      });
      interact();
    }
  };

  const barW = 300;
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Rank the world's countries by population. How many of the largest do you need to add up to half of humanity?",
        options: ["7", "3", "15"],
        answer: 0,
      }}
      exploreHint="Tap countries, largest first, until the bar passes half."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            <strong>Seven.</strong> India, China, the USA, Indonesia, Pakistan, Nigeria and Brazil hold{" "}
            {ppl(top7Share)} of the world&rsquo;s {(WORLD_M / 1000).toFixed(1)} billion people (UN estimate for 2024); the
            first six only {ppl(top6Share)}.
            {crossed
              ? crossed.inOrder
                ? ` Your Seen line: the seventh took the bar from ${crossed.before} to ${crossed.after}.`
                : ` You crossed half with ${crossed.count} countries (${crossed.before} to ${crossed.after}), because you did not add them strictly largest first.`
              : ""}
          </p>
          <p>
            People are not spread evenly over the land. On this equal-area map, where drawn size is real size, your{" "}
            {crossed?.count ?? 7} cover {crossed?.land ?? "25%"} of the land outside Antarctica, yet hold half of everyone.
            {russia
              ? ` Russia alone took land from ${russia.landBefore} to ${russia.landAfter}, people only from ${russia.pplBefore} to ${russia.pplAfter}.`
              : ""}{" "}
            A map that shows area shows land, not people.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <WorldMap
            projection={projection}
            width={W}
            height={H}
            graticule={false}
            highlight={picked.map((i) => POP[i].ne)}
            label={`Equal Earth world map. ${picked.length} countries highlighted, ${share.toFixed(1)}% of humanity.`}
          />
          <svg viewBox={`0 0 ${W} 30`} className={s.bar} role="img" aria-label={`Share of humanity: ${share.toFixed(1)}%`}>
            <rect x={10} y={6} width={barW} height={12} rx={3} className={s.track} />
            <rect x={10} y={6} width={(barW * Math.min(share, 100)) / 100} height={12} rx={3} className={share >= 50 ? s.fillDone : s.fill} />
            <line x1={10 + barW / 2} x2={10 + barW / 2} y1={2} y2={22} className={s.half} />
            <text x={10 + barW / 2} y={29} className={s.small} textAnchor="middle">
              half of humanity
            </text>
          </svg>
          <div className={s.chips} role="group" aria-label="Countries, largest population first">
            {POP.map((p, i) => (
              <Control
                key={p.ne}
                className={`${s.chip} ${picked.includes(i) ? "active" : ""}`}
                aria-pressed={picked.includes(i)}
                disabled={locked}
                onClick={() => toggle(i, interact)}
              >
                {p.label}
              </Control>
            ))}
          </div>
          <Row>
            <Readout label="Countries" value={picked.length} />
            <Readout label="Share of people" value={`${share.toFixed(1)}%`} />
            <Readout label="Land (outside Antarctica)" value={lnd(landShare)} />
          </Row>
          <p className="tiny" data-testid="seen">
            Seen:{" "}
            {crossed ? `half crossed at ${crossed.count} countries, ${crossed.before} → ${crossed.after} of people, ${crossed.land} of land` : "nothing yet"}
            {russia ? ` · Russia: land ${russia.landBefore} → ${russia.landAfter}, people ${russia.pplBefore} → ${russia.pplAfter}` : ""}
          </p>
          <p className="muted tiny">Equal-area map. Largest first. People: UN, 2024.</p>
        </div>
      )}
    </Lesson>
  );
}
