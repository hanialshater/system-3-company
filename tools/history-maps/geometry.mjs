import { geoArea } from "d3-geo";

// d3 interprets a counterclockwise exterior as the rest of the sphere. The
// reconstruction mixes directions, so normalise each ring without moving it.
export const normalisePolygon = (rings) => rings.map((ring, i) => {
  const complement = geoArea({ type: "Polygon", coordinates: [ring] }) > 2*Math.PI;
  return (i === 0 ? complement : !complement) ? [...ring].reverse() : ring;
});

export function normaliseGeometry(g) {
  if (!g) return g;
  if (g.type === "Polygon") return { ...g, coordinates: normalisePolygon(g.coordinates) };
  if (g.type === "MultiPolygon") return { ...g, coordinates: g.coordinates.map(normalisePolygon) };
  return g;
}
