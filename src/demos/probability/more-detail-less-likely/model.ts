// Conjunctions are subsets. A town of 1,000 people who fit Sam's description (quiet, loves books),
// drawn as a 40 x 25 grid filled column by column. The first L = 1000 * lib dots are librarians
// (outer ring); the first C = round(L * club) of those run a book club (inner ring). Because the club
// group is counted inside the librarians, C <= L always; C = L only if club = 100%, which the slider
// does not offer (the question says some librarians don't). The shares are a model chosen for the card.

export const PEOPLE = 1000;
export const COLS = 40;
export const ROWS = 25;
export const LIB = { min: 5, max: 50, step: 5, start: 10 };
export const CLUB = { min: 10, max: 90, step: 20, start: 50 };

export const librarians = (libPct: number) => Math.round((PEOPLE * libPct) / 100);
export const clubbers = (libPct: number, clubPct: number) => Math.round((librarians(libPct) * clubPct) / 100);

/** Outline of the first k dots in column-major order (staircase), in grid units. */
export function outline(k: number, rows = ROWS): string {
  if (k <= 0) return "";
  const full = Math.floor(k / rows);
  const rem = k % rows;
  if (rem === 0) return `M0,0 H${full} V${rows} H0 Z`;
  if (full === 0) return `M0,0 H1 V${rem} H0 Z`;
  return `M0,0 H${full + 1} V${rem} H${full} V${rows} H0 Z`;
}
