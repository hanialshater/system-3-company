"use client";

// The learner "walks" a pair of dividers round Great Britain's coast with rulers of 200, 100, 50
// and 25 km. Each step is a straight chord of exactly the ruler length, measured on an azimuthal
// equidistant projection centred on Britain (distances there are true to well under 1% across
// Britain). Shorter rulers catch more wiggles, so the total grows. The 1:110m outline has only a
// few dozen corners, so the growth stops near its own perimeter; the lesson says so.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { EARTH_RADIUS_KM, country, geoArea, geoAzimuthalEquidistant, geoCentroid, geoPath } from "@/kit/geo";
import type { Polygon } from "geojson";
import s from "./styles.module.css";

type Pt = [number, number];
const W = 320;
const H = 300;
const RULERS = [200, 100, 50, 25];

/** Great Britain = the largest polygon of the 1:110m "United Kingdom" shape. */
function greatBritain(): Polygon {
  const g = country("United Kingdom")!.geometry;
  const polys: Polygon[] =
    g.type === "MultiPolygon" ? g.coordinates.map((c) => ({ type: "Polygon", coordinates: c })) : [g as Polygon];
  return polys.sort((a, b) => geoArea(b) - geoArea(a))[0];
}

/** Divider walk on a closed planar ring (units km). Returns divider points and total length. */
function walk(ring: Pt[], r: number) {
  const n = ring.length - 1; // last point repeats the first
  const seg = (i: number) => Math.hypot(ring[(i + 1) % n][0] - ring[i % n][0], ring[(i + 1) % n][1] - ring[i % n][1]);
  let perim = 0;
  for (let i = 0; i < n; i++) perim += seg(i);
  let cur = ring[0];
  let si = 0;
  let t0 = 0;
  let travelled = 0;
  const pts: Pt[] = [cur];
  for (let guard = 0; guard < 5000; guard++) {
    let found = false;
    for (let k = 0; k <= n && !found; k++) {
      const i = (si + k) % n;
      const a = ring[i];
      const b = ring[(i + 1) % n];
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const fx = a[0] - cur[0];
      const fy = a[1] - cur[1];
      const A = dx * dx + dy * dy;
      const B = 2 * (fx * dx + fy * dy);
      const C = fx * fx + fy * fy - r * r;
      const disc = B * B - 4 * A * C;
      if (disc < 0 || A === 0) continue;
      const sq = Math.sqrt(disc);
      const lo = k === 0 ? t0 + 1e-9 : 0;
      const ts = [(-B - sq) / (2 * A), (-B + sq) / (2 * A)].filter((t) => t >= lo && t <= 1).sort((x, y) => x - y);
      if (!ts.length) continue;
      const t = ts[0];
      let arc = 0;
      if (k === 0) arc = (t - t0) * Math.sqrt(A);
      else {
        arc = (1 - t0) * seg(si);
        for (let j = 1; j < k; j++) arc += seg((si + j) % n);
        arc += t * Math.sqrt(A);
      }
      travelled += arc;
      cur = [a[0] + dx * t, a[1] + dy * t];
      si = i;
      t0 = t;
      found = true;
    }
    if (!found || travelled >= perim) break;
    pts.push(cur);
  }
  const steps = pts.length - 1;
  const last = pts[pts.length - 1];
  const closing = Math.hypot(last[0] - ring[0][0], last[1] - ring[0][1]);
  return { pts: [...pts, ring[0]], steps, total: steps * r + closing, perim };
}

const fmt = (km: number) => `${Math.round(km).toLocaleString("en-US")} km`;

export default function CoastlineRuler({ slug }: { slug: string }) {
  const [ruler, setRuler] = useState(200);
  const [tried, setTried] = useState<number[]>([200]);

  const model = useMemo(() => {
    const gb = greatBritain();
    const c = geoCentroid(gb);
    const km = geoAzimuthalEquidistant().rotate([-c[0], -c[1]]).scale(EARTH_RADIUS_KM).translate([0, 0]);
    const draw = geoAzimuthalEquidistant().rotate([-c[0], -c[1]]).fitExtent([[12, 8], [W - 12, H - 8]], gb);
    const k = draw.scale() / EARTH_RADIUS_KM;
    const [tx, ty] = draw.translate();
    const ring = gb.coordinates[0].map((p) => km(p as Pt)!) as Pt[];
    const results = Object.fromEntries(RULERS.map((r) => [r, walk(ring, r)]));
    return { gb, draw, toScreen: (p: Pt) => [tx + p[0] * k, ty + p[1] * k] as Pt, results, corners: ring.length - 1 };
  }, []);
  const path = useMemo(() => geoPath(model.draw), [model]);
  const res = model.results[ruler];
  const pts = res.pts.map(model.toScreen);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You walk a 200 km ruler around Great Britain's coast, then do it again with a 50 km ruler. What happens to the total length?",
        options: ["It stays the same", "It gets shorter", "It gets longer"],
        answer: 2,
      }}
      exploreHint="Pick shorter rulers and watch the total."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            It gets <strong>longer</strong>. On this outline the 200 km ruler measured {fmt(model.results[200].total)}; the
            50 km ruler measured {fmt(model.results[50].total)}
            {tried.includes(25) ? ` and the 25 km ruler ${fmt(model.results[25].total)}` : ""}. A short ruler dips into bays
            and round headlands that a long ruler steps straight across.
          </p>
          <p>
            So a coast has no single length, only a length for a stated ruler. This map&rsquo;s outline is coarse (it has{" "}
            {model.corners} corners), so its total can never pass {fmt(model.results[25].perim)}. A real coast has wiggles
            at every scale, so published lengths for Britain disagree with each other for exactly this reason.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`Great Britain's outline walked with a ${ruler} km ruler: ${res.steps} steps, ${fmt(res.total)}.`}>
            <path d={path(model.gb) ?? ""} className={s.land} />
            <polyline points={pts.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" ")} className={s.walk} />
            {pts.slice(0, -1).map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r={ruler >= 100 ? 2.4 : 1.5} className={i === 0 ? s.start : s.dot} />
            ))}
          </svg>
          <p className="muted tiny">Great Britain, 1:110m outline, azimuthal equidistant projection.</p>
          <div className={s.chips} role="group" aria-label="Ruler length">
            {RULERS.map((r) => (
              <Control
                key={r}
                className={ruler === r ? "active" : ""}
                aria-pressed={ruler === r}
                disabled={locked || ruler === r}
                onClick={() => {
                  setRuler(r);
                  if (!tried.includes(r)) {
                    setTried([...tried, r]);
                    interact();
                  }
                }}
              >
                {r} km ruler
              </Control>
            ))}
          </div>
          <Row>
            <Readout label="Steps" value={res.steps} />
            <Readout label="Coast length" value={fmt(res.total)} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
