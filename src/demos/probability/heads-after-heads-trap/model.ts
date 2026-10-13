// All 16 sequences of 4 fair coin flips. For a sequence, look at flips 2 to 4 whose previous flip was heads:
// `follow` of them, `heads` of those are heads. The sequence's share is heads / follow (undefined when follow = 0:
// TTTT and TTTH have no flip right after a heads).
// Average of shares over the qualifying sequences = 17/42 = 40.5%; pooled heads / follow over all 16 = 12/24 = 50%.

export interface Seq {
  flips: string;
  follow: number;
  heads: number;
}

export const SEQS: Seq[] = Array.from({ length: 16 }, (_, b) => {
  const flips = [3, 2, 1, 0].map((i) => ((b >> i) & 1 ? "H" : "T")).join("");
  let follow = 0;
  let heads = 0;
  for (let i = 0; i < 3; i++) {
    if (flips[i] === "H") {
      follow++;
      if (flips[i + 1] === "H") heads++;
    }
  }
  return { flips, follow, heads };
});

export const qualifying = (ids: number[]) => ids.filter((i) => SEQS[i].follow > 0);
export const QUALIFYING = qualifying(SEQS.map((_, i) => i));

/** Average of the per-sequence shares over the given sequence ids (only those with a flip after a head). */
export function avgShare(ids: number[]) {
  const q = qualifying(ids);
  return q.length ? q.reduce((a, i) => a + SEQS[i].heads / SEQS[i].follow, 0) / q.length : 0;
}
/** Pooled count of heads after a head and of flips after a head. */
export function pooled(ids: number[]) {
  return { heads: ids.reduce((a, i) => a + SEQS[i].heads, 0), follow: ids.reduce((a, i) => a + SEQS[i].follow, 0) };
}
export const pct1 = (p: number) => `${(p * 100).toFixed(1)}%`;
