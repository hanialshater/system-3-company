"use client";

// Geo kit: projections, world shapes and a WorldMap for geography lessons.
// Data: Natural Earth 1:110m via world-atlas@2 (public domain shapes; ISC-licensed packaging).
// It is coarse on purpose: small islands vanish and borders are simplified. Lessons that make
// claims about specific borders or small areas must not rely on this resolution.

import { useMemo, type ReactNode } from "react";
import {
  geoCentroid as geoCentroidRaw,
  geoRotation as geoRotationRaw,
  geoPath,
  geoGraticule10,
  type GeoProjection,
  type GeoPermissibleObjects,
} from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import countriesTopo from "./countries-110m.json";
import landTopo from "./land-110m.json";

export {
  geoMercator,
  geoEquirectangular,
  geoOrthographic,
  geoNaturalEarth1,
  geoEqualEarth,
  geoAzimuthalEquidistant,
  geoGnomonic,
  geoPath,
  geoGraticule,
  geoGraticule10,
  geoDistance,
  geoInterpolate,
  geoArea,
  geoCentroid,
  geoContains,
  geoCircle,
  geoRotation,
} from "d3-geo";

export type CountryFeature = Feature<Geometry, { name: string }> & { id?: string };

let cache: { countries: CountryFeature[]; land: FeatureCollection | Feature } | null = null;

/** Decoded world shapes, computed once per page. */
export function world() {
  if (!cache) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c = feature(countriesTopo as any, (countriesTopo as any).objects.countries) as unknown as FeatureCollection<Geometry, { name: string }>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const l = feature(landTopo as any, (landTopo as any).objects.land) as unknown as FeatureCollection | Feature;
    cache = { countries: c.features as CountryFeature[], land: l };
  }
  return cache;
}

export function country(name: string): CountryFeature | undefined {
  return world().countries.find((c) => c.properties.name === name);
}

/** Mean Earth radius in km (IUGG). Use with geoDistance (radians) for great-circle km. */
export const EARTH_RADIUS_KM = 6371.0088;

/**
 * Draws the world in a given projection. Children receive the projection and a path generator,
 * so lessons can overlay routes, points and highlighted countries in the same coordinates.
 */
export function WorldMap({
  projection,
  width = 320,
  height = 200,
  graticule = true,
  highlight = [],
  label,
  children,
}: {
  projection: GeoProjection;
  width?: number;
  height?: number;
  graticule?: boolean;
  /** Country names to fill with the domain colour. */
  highlight?: string[];
  /** Accessible description of what the map shows now. */
  label: string;
  children?: (p: { projection: GeoProjection; path: (o: GeoPermissibleObjects) => string }) => ReactNode;
}) {
  const { countries } = world();
  const path = useMemo(() => {
    const g = geoPath(projection);
    return (o: GeoPermissibleObjects) => g(o) ?? "";
  }, [projection]);
  const hl = new Set(highlight);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="stage-svg" role="img" aria-label={label}>
      <path d={path({ type: "Sphere" })} fill="var(--bg-2)" stroke="var(--line)" />
      {graticule && <path d={path(geoGraticule10())} fill="none" stroke="var(--line)" strokeWidth={0.4} />}
      {countries.map((c, i) => (
        <path
          key={c.id ?? i}
          d={path(c)}
          fill={hl.has(c.properties.name) ? "var(--domain)" : "var(--muted)"}
          fillOpacity={hl.has(c.properties.name) ? 0.9 : 0.35}
          stroke="var(--bg-2)"
          strokeWidth={0.3}
        />
      ))}
      {children?.({ projection, path })}
    </svg>
  );
}

type Pt = [number, number];

/** Apply a point transform to every vertex of a GeoJSON feature (spherical polygons stay exact). */
export function mapFeature<F extends Feature<Geometry, GeoJsonProperties>>(f: F, fn: (p: Pt) => Pt): F {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const walk = (c: any): any => (typeof c[0] === "number" ? fn(c as Pt) : c.map(walk));
  const g = f.geometry as Geometry & { coordinates?: unknown };
  if (!g || !("coordinates" in g)) return f;
  return { ...f, geometry: { ...g, coordinates: walk(g.coordinates) } } as F;
}

/**
 * Slide a shape along its own meridian so its centroid sits at `targetLat`, by rotating it on
 * the sphere. Its true size and shape are unchanged; only where it sits changes.
 * (This is the "true size" comparison: a projection, not the shape, does the distorting.)
 */
export function moveToLatitude<F extends Feature<Geometry, GeoJsonProperties>>(f: F, targetLat: number): F {
  const [lon, lat] = geoCentroidRaw(f);
  const a = geoRotationRaw([-lon, 0]);
  const b = geoRotationRaw([0, -lat]);
  const c = geoRotationRaw([0, targetLat]);
  const d = geoRotationRaw([lon, 0]);
  return mapFeature(f, (p) => d(c(b(a(p)))) as Pt);
}

