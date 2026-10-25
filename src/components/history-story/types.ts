export interface Story {
  slug: string; title: string; family: string; hook: string;
  predict: { question: string; options: string[]; answer: number };
  frames: { date: string; heading: string; text: string; active: string[] }[];
  nodes: { id: string; name: string; coordinates: number[] }[];
  edges: { frame: number; nodes: (string | number)[]; kind?: string }[];
  reveal: string; limit: string; mode: string;
  closedFrames?: number[]; heights?: number[];
}
export interface StoryMap {
  land: string; grid: string; river: string;
  nodes: { id: string; x: number; y: number; labelX: number; labelY: number; anchor: string }[];
  edges: { frame: number; path: string; kind: string }[];
}
