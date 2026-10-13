"use client";

// Not a map: a side view (cross-section) of the globe with a light at its centre and paper either
// rolled into a cylinder touching the equator or laid flat on the North Pole. A ray from the light
// through a point at the chosen latitude lands on the paper. Cylinder: height = tan(lat) radii.
// Flat sheet: distance from the pole = cot(lat) radii. Drawn to scale; every readout comes from the
// same function that places the ray. Key state: 80°N on the cylinder, where the ray lands 5.67 radii up.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

type Paper = "cylinder" | "sheet";
const W = 320;
const H = 272;
const CX = 74;
const CY = 228;
const R = 36; // px per globe radius
const RAD = Math.PI / 180;
const START = 60;
const KEY = 80;

/** Where the ray through latitude `lat` meets the paper, in globe radii (Infinity if it never does). */
function landing(paper: Paper, lat: number) {
  if (paper === "cylinder") return lat >= 90 ? Infinity : Math.tan(lat * RAD);
  return lat <= 0 ? Infinity : 1 / Math.tan(lat * RAD);
}
/** Distance along the globe's surface from the line the paper touches, in radii. */
const along = (paper: Paper, lat: number) => (paper === "cylinder" ? lat * RAD : (90 - lat) * RAD);
const fmt = (v: number) => (Number.isFinite(v) ? v.toFixed(2) : "never");

export default function LightInTheCylinder({ slug }: { slug: string }) {
  const [lat, setLat] = useState(START);
  const [paper, setPaper] = useState<Paper>("cylinder");
  const d = landing(paper, lat);
  const px = CX + R * Math.cos(lat * RAD);
  const py = CY - R * Math.sin(lat * RAD);
  const hit: [number, number] | null = Number.isFinite(d)
    ? paper === "cylinder"
      ? [CX + R, CY - R * d]
      : [CX + R * d, CY - R]
    : null;
  const onPage = hit && hit[0] <= W && hit[1] >= 0;
  // Ray: from the centre, through the point, to the paper (or to the frame edge if off the page).
  const far = hit && onPage ? hit : [CX + (px - CX) * 12, CY + (py - CY) * 12];
  const arc = (() => {
    const a0 = paper === "cylinder" ? 0 : 90;
    const steps = 24;
    return Array.from({ length: steps + 1 }, (_, i) => {
      const a = (a0 + ((lat - a0) * i) / steps) * RAD;
      return `${(CX + R * Math.cos(a)).toFixed(1)},${(CY - R * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
  })();
  const ticks = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Put a light at the Earth's centre and wrap paper in a cylinder touching the equator. Measured in globe radii up from the equator, where does ${KEY}°N land?`,
        options: ["About 1.0", "About 1.4", `About ${landing("cylinder", KEY).toFixed(1)}`],
        answer: 2,
      }}
      exploreHint={`Raise the point to ${KEY}°N, then try a flat sheet on the pole.`}
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            <strong>About {landing("cylinder", KEY).toFixed(1)} radii.</strong> At {KEY}°N the ray from the centre leaves the globe steeply
            and keeps climbing long after it passes the globe&rsquo;s top (1 radius), landing {fmt(landing("cylinder", KEY))} radii up.
            Measured along the globe&rsquo;s curve the same point is only {fmt(along("cylinder", KEY))} radii from the equator. The height is
            tan(latitude): {fmt(landing("cylinder", START))} at {START}°N, and the pole itself would never land.
          </p>
          <p>
            A projection is a rule for putting each point of the globe on paper. With a light at the centre, paper touching the globe along one line is true there and
            stretches everything away from it. Lay the sheet flat on the pole instead and the stretch moves to the equator.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["eighty"]}>
          {(reach) => {
            const update = (nextLat: number, nextPaper: Paper) => {
              setLat(nextLat);
              setPaper(nextPaper);
              if (nextPaper === "cylinder" && nextLat === KEY) reach("eighty");
            };
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="stage-svg"
                  role="img"
                  aria-label={`Side view: light at the Earth's centre, ray through ${lat}°N to a ${paper === "cylinder" ? "cylinder touching the equator" : "flat sheet on the North Pole"}.${locked ? "" : ` It lands ${fmt(d)} radii along the paper.`}`}
                >
                  <circle cx={CX} cy={CY} r={R} className={s.globe} />
                  <line x1={CX - R} y1={CY} x2={CX + R} y2={CY} className={s.equator} />
                  <text x={CX - R + 2} y={CY + 10} className={s.small}>
                    equator
                  </text>
                  {paper === "cylinder" ? (
                    <>
                      <line x1={CX + R} y1={0} x2={CX + R} y2={H} className={s.paper} />
                      {ticks.map((k) => (
                        <g key={k}>
                          <line x1={CX + R} y1={CY - k * R} x2={CX + R + 6} y2={CY - k * R} className={s.tick} />
                          <text x={CX + R + 9} y={CY - k * R + 3} className={s.small}>
                            {k}
                          </text>
                        </g>
                      ))}
                      <text x={CX + R + 22} y={CY + 12} className={s.small}>
                        paper rolled round the equator (radii up)
                      </text>
                    </>
                  ) : (
                    <>
                      <line x1={CX - R} y1={CY - R} x2={W} y2={CY - R} className={s.paper} />
                      {ticks.map((k) => (
                        <g key={k}>
                          <line x1={CX + k * R} y1={CY - R} x2={CX + k * R} y2={CY - R - 6} className={s.tick} />
                          <text x={CX + k * R} y={CY - R - 9} className={s.small} textAnchor="middle">
                            {k}
                          </text>
                        </g>
                      ))}
                      <text x={CX + R + 4} y={CY - R + 12} className={s.small}>
                        flat sheet on the pole (radii out)
                      </text>
                    </>
                  )}
                  <polyline points={arc} className={s.arc} />
                  <line x1={CX} y1={CY} x2={far[0]} y2={far[1]} className={s.ray} />
                  <circle cx={px} cy={py} r={3} className={s.pt} />
                  {hit && onPage && <circle cx={hit[0]} cy={hit[1]} r={4} className={s.hit} />}
                  <circle cx={CX} cy={CY} r={4} className={s.light} />
                  <text x={CX - 4} y={CY - 7} className={s.small} textAnchor="end">
                    light
                  </text>
                  <text x={W - 4} y={H - 6} className={s.small} textAnchor="end">
                    Side view, to scale. Light at Earth&rsquo;s centre.
                  </text>
                </svg>
                <Row>
                  <Slider label="Point on the globe" value={lat} min={0} max={80} step={10} disabled={locked} format={(v) => `${v}°N`} onChange={(v) => update(v, paper)} />
                </Row>
                <Row>
                  <Control disabled={locked} className={paper === "sheet" ? "active" : ""} onClick={() => update(lat, paper === "cylinder" ? "sheet" : "cylinder")}>
                    {paper === "cylinder" ? "Flat sheet on the pole" : "Cylinder round the equator"}
                  </Control>
                  <Readout label="On the paper" value={locked ? "?" : `${fmt(d)}${Number.isFinite(d) ? " radii" : ""}`} />
                  <Readout label="Along the globe" value={`${fmt(along(paper, lat))} radii`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
