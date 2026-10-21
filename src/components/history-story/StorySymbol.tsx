import { createElement } from "react";
import artwork from "../../../content/history-stories/symbol-art.json";
import choices from "../../../content/history-stories/symbols.json";
import type { StoryMap } from "./types";

export type SymbolKind = keyof typeof artwork;
type SymbolChoice = { frames: (string | null)[]; cover: string };
export function storySymbol(slug: string, checkpoint?: number): SymbolKind | null {
  const choice = (choices as Record<string, SymbolChoice>)[slug];
  const kind = checkpoint === undefined ? choice?.cover : choice?.frames[checkpoint];
  return kind && Object.hasOwn(artwork, kind) ? kind as SymbolKind : null;
}

/** Decorative artwork, separate from the dated geographic evidence and its dots. */
export function StorySymbol({ kind, x, y, size = 38 }: { kind: SymbolKind; x: number; y: number; size?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${size / 64})`} aria-hidden="true" data-story-symbol={kind}>
    <circle cx="32" cy="32" r="31" fill="#142b36" fillOpacity=".94" stroke="#d4b77f" strokeOpacity=".4" strokeWidth="1.2" />
    <g stroke="#19333b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {artwork[kind].shapes.map((shape, i) => createElement(shape.tag, { ...shape.attrs, key: i }))}
    </g>
  </g>;
}

type Box = { x: number; y: number; w: number; h: number };
const overlap = (a: Box, b: Box) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));

/** Find free map space; never move a geographic marker to make room for artwork. */
export function symbolPosition(map: StoryMap, names: {id: string; name: string}[], active: string[], kind: SymbolKind) {
  const anchor = map.nodes.find(n => n.id === active[0])!;
  const size = 38;
  const labels = map.nodes.filter(n => active.includes(n.id)).map(n => {
    const width = (names.find(p => p.id === n.id)?.name.length ?? 0) * 7.8 + 6;
    return { x: n.anchor === "end" ? n.labelX - width : n.labelX, y: n.labelY - 13, w: width, h: 18 };
  });
  const blockers: Box[] = [...labels, ...map.nodes.map(n => ({ x:n.x-7,y:n.y-7,w:14,h:14 })),
    {x:0,y:0,w:32,h:35},{x:230,y:140,w:125,h:40},{x:130,y:75,w:100,h:35}];
  const near = [[anchor.x - 46, anchor.y + 6], [anchor.x + 10, anchor.y + 8], [anchor.x - 45, anchor.y - 48], [anchor.x + 10, anchor.y - 48]];
  const corners = [[7,145],[7,41],[312,7],[312,94],[150,145]];
  const candidates = (kind === "camp" ? corners : [...near,...corners]).map(([x,y]) => ({ x:Math.max(5,Math.min(317,x)),y:Math.max(5,Math.min(146,y)),w:size,h:size }));
  return candidates.reduce<Box & { cost: number }>((best, box, i) => {
    const cost = blockers.reduce((sum,b) => sum + overlap(box,b),0) * 20 + i;
    return cost < best.cost ? {...box,cost} : best;
  }, {...candidates[0],cost:Infinity});
}
