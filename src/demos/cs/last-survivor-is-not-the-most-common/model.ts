// Boyer-Moore majority vote: one candidate and one counter. Same item as the candidate: +1; a different
// item: -1; when the counter is 0 the next item becomes the candidate with count 1.
export const STREAMS = { 1: "AAABBCC", 2: "AABACAA" } as const;
export type StreamId = keyof typeof STREAMS;

export type State = { candidate: string | null; count: number };
/** State after each item (index i = after item i). */
export function run(stream: string): State[] {
  let candidate: string | null = null, count = 0;
  const out: State[] = [];
  for (const x of stream) {
    if (count === 0) { candidate = x; count = 1; }
    else if (x === candidate) count++;
    else count--;
    out.push({ candidate, count });
  }
  return out;
}
export const occurrences = (stream: string, item: string) => [...stream].filter((x) => x === item).length;
export const finalCandidate = (stream: string) => run(stream)[stream.length - 1].candidate!;
export const mostCommon = (stream: string) => {
  const items = [...new Set(stream)];
  return items.reduce((a, b) => (occurrences(stream, b) > occurrences(stream, a) ? b : a));
};
