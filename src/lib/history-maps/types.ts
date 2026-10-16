export interface MapShape {
  d: string;
  label: string;
  featureIndex: number;
  focus: string;
}
export interface HistoryMapSpec {
  slug: string;
  title: string;
  region: string;
  points: { name: string; coordinates: number[]; xy: number[] }[];
  years: number[];
  extent: number[][];
  coast: string;
  frames: {
    year: number;
    labels: string[][];
    shortLabels: string[][];
    matches: number[][];
    relation: string;
    shapes: MapShape[];
    source: { file: string; sha256: string; url: string };
  }[];
  options: string[];
  answer: number;
  question: string;
  reveal: string;
  sourceCommit: string;
}
