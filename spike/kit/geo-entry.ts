// SPIKE-001: the geo kit as its own shared bundle (d3-geo + topojson + Natural Earth 1:110m).
// Only lessons that import "@/kit/geo" (or "d3-geo") load it. React comes from the main kit.
export * from "@/kit/geo";
export * as d3geo from "d3-geo";
export const GEO_KIT_VERSION = "1.0.0";
