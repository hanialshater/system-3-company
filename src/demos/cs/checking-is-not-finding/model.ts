// Subset sum on six numbers. Groups are tried in binary counting order: group i takes number b when bit b
// of i is set (list order), starting from the empty group i = 0.
export const NUMBERS = [3, 34, 4, 12, 5, 2] as const;
export const SEVENTH = 7;

export const members = (i: number, count: number) => Array.from({ length: count }, (_, b) => b).filter((b) => (i >> b) & 1);
export const sumOf = (i: number, nums: readonly number[]) => members(i, nums.length).reduce((t, b) => t + nums[b], 0);

/** Groups tried until the first that sums to target (1-based), and that group's index; or all groups and -1. */
export function search(target: number, nums: readonly number[] = NUMBERS) {
  const total = 2 ** nums.length;
  for (let i = 0; i < total; i++) if (sumOf(i, nums) === target) return { tried: i + 1, hit: i };
  return { tried: total, hit: -1 };
}
