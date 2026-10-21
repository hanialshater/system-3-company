import { compare } from '../T5/semver.mjs';

// Highest version by semver precedence, using T5's compare only.
// Every entry is validated through compare (a lone entry is compared with
// itself), so an invalid entry anywhere throws compare's TypeError.
// Ties in precedence (e.g. differing only in build metadata) keep the first.
export function maxVersion(list) {
  if (!Array.isArray(list)) throw new TypeError('maxVersion expects an array');
  if (list.length === 0) return null;
  let best = list[0];
  compare(best, best);
  for (let i = 1; i < list.length; i++) {
    if (compare(list[i], best) > 0) best = list[i];
  }
  return best;
}
