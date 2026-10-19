/** Pure, bounded traces. Topic modules compute these from their case inputs. */
export type AlgorithmTone = 'plain' | 'active' | 'good' | 'bad' | 'muted';
export type AlgorithmCell = { text: string; tone?: AlgorithmTone };
export type AlgorithmRow = { label: string; cells: AlgorithmCell[] };
export type AlgorithmNode = { id: string; label: string; x: number; y: number; tone?: AlgorithmTone };
export type AlgorithmEdge = { from: string; to: string; label?: string; directed?: boolean; tone?: AlgorithmTone };
export type AlgorithmFrame = {
  caption: string;
  rows?: AlgorithmRow[];
  nodes?: AlgorithmNode[];
  edges?: AlgorithmEdge[];
  metrics?: { label: string; value: string }[];
};
export type AlgorithmRun = { frames: AlgorithmFrame[]; proof: string; result: number | string | boolean };
export type AlgorithmSpec = {
  slug: string;
  topic: string;
  predict: { question: string; options: string[]; answer: number };
  exploreHint: string;
  cases: { label: string; run: () => AlgorithmRun }[];
  reveal: (witness: AlgorithmRun) => string[];
};
