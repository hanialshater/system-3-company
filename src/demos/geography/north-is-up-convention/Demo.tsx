"use client";

// A globe view centred on Jerusalem (the centre of the Hereford mappa mundi). The learner turns the
// picture a quarter at a time (the projection's third rotation angle, which spins the view about its
// centre). Which compass direction points to the top is read off the projection itself, not typed.
// Key state: the view matches the Hereford layout (Asia top, Europe lower left, Africa lower right).

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { WorldMap, geoOrthographic } from "@/kit/geo";
import s from "./styles.module.css";

const W = 320;
const H = 250;
const CENTRE: [number, number] = [35.2, 31.8]; // Jerusalem
const LABELS: { name: string; at: [number, number] }[] = [
  { name: "Europe", at: [15, 50] },
  { name: "Asia", at: [85, 45] },
  { name: "Africa", at: [20, 5] },
];
const DIRS: { name: string; d: [number, number] }[] = [
  { name: "North", d: [0, 5] },
  { name: "East", d: [5, 0] },
  { name: "South", d: [0, -5] },
  { name: "West", d: [-5, 0] },
];

function makeProjection(turn: number) {
  return geoOrthographic()
    .rotate([-CENTRE[0], -CENTRE[1], turn])
    .translate([W / 2, 122])
    .scale(112);
}

/** Which compass direction points up the page at the centre of this projection. */
function topDirection(turn: number) {
  const p = makeProjection(turn);
  const c = p(CENTRE)!;
  let best = DIRS[0];
  let bestDy = Infinity;
  for (const dir of DIRS) {
    const q = p([CENTRE[0] + dir.d[0], CENTRE[1] + dir.d[1]])!;
    if (q[1] - c[1] < bestDy) {
      bestDy = q[1] - c[1];
      best = dir;
    }
  }
  return best.name;
}

/** Hereford layout: Asia above the others, Europe left of Africa, both below Asia. */
function matchesHereford(turn: number) {
  const p = makeProjection(turn);
  const [eu, as, af] = LABELS.map((l) => p(l.at)!);
  return as[1] < eu[1] && as[1] < af[1] && eu[0] < af[0];
}

export default function NorthIsUp({ slug }: { slug: string }) {
  const [turn, setTurn] = useState(0);
  const projection = useMemo(() => makeProjection(turn), [turn]);
  const top = topDirection(turn);
  const hereford = matchesHereford(turn);
  const north = (() => {
    const c = projection(CENTRE)!;
    const n = projection([CENTRE[0], CENTRE[1] + 8])!;
    const len = Math.hypot(n[0] - c[0], n[1] - c[1]);
    return [(n[0] - c[0]) / len, (n[1] - c[1]) / len] as const;
  })();
  const ax = 286;
  const ay = 30;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "The Hereford world map was drawn in England about 1300. Which compass direction did it put at the top?",
        options: ["North", "South", "East"],
        answer: 2,
      }}
      exploreHint="Turn the globe until Asia is on top, Europe lower left, Africa lower right (the Hereford layout)."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>East.</strong> A quarter-turn left put {topDirection(90).toLowerCase()} at the top,
            and the globe matched the Hereford layout: Asia above, Europe lower left, Africa lower right. Hereford&rsquo;s
            map puts the east, where the Sun rises, at the top. <em>Orient</em> is Latin for &ldquo;rising&rdquo;.
          </p>
          <p>
            Turning twice gave south at the top, the way al-Idrisi drew his world map in 1154. The Earth is a ball with no top, so which way is
            up on a map is a choice. North-up is today&rsquo;s convention, not a fact about the planet.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["hereford", "south-up"]}>
          {(reach) => {
            const spin = (delta: number) => {
              const next = (((turn + delta) % 360) + 360) % 360;
              setTurn(next);
              if (matchesHereford(next)) reach("hereford");
              if (topDirection(next) === "South") reach("south-up");
            };
            return (
              <div className={s.wrap}>
                <WorldMap
                  projection={projection}
                  width={W}
                  height={H}
                  label={`Globe centred on Jerusalem, ${top} at the top.${hereford ? " Matches the Hereford layout." : ""}`}
                >
                  {() => {
                    const j = projection(CENTRE)!;
                    return (
                      <>
                        <circle cx={j[0]} cy={j[1]} r={2.5} className={s.city} />
                        <text x={j[0] + 4} y={j[1] + 3} className={s.small}>
                          Jerusalem
                        </text>
                        {LABELS.map((l) => {
                          const q = projection(l.at)!;
                          return (
                            <text key={l.name} x={q[0]} y={q[1]} className={s.continent} textAnchor="middle">
                              {l.name}
                            </text>
                          );
                        })}
                        <g>
                          <circle cx={ax} cy={ay} r={17} className={s.rose} />
                          <line x1={ax} y1={ay} x2={ax + north[0] * 13} y2={ay + north[1] * 13} className={s.needle} />
                          <text x={ax + north[0] * 24} y={ay + north[1] * 24 + 3.5} className={s.n} textAnchor="middle">
                            N
                          </text>
                        </g>
                        <text x={6} y={H - 6} className={s.small}>
                          A modern globe centred on Jerusalem, not the medieval map.
                        </text>
                      </>
                    );
                  }}
                </WorldMap>
                <Row>
                  <Control disabled={locked} aria-label="Turn the globe a quarter turn left" onClick={() => spin(90)}>
                    Turn left 90°
                  </Control>
                  <Control disabled={locked} aria-label="Turn the globe a quarter turn right" onClick={() => spin(-90)}>
                    Turn right 90°
                  </Control>
                  <Control disabled={locked} aria-label="Turn the globe upside down" onClick={() => spin(180)}>
                    Turn 180°
                  </Control>
                  <Readout label="Top of the map" value={top} />
                </Row>
                {!locked && hereford && <p className={s.match}>Matches the Hereford layout.</p>}
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
