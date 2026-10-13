// Monty Hall rounds, seeded. Kept apart from Demo.tsx so the numbers in meta.json
// can be re-run with plain node (node --experimental-strip-types).

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Where the car is in round r (every door equally likely). */
export function carFor(round: number, doors: number): number {
  const rnd = mulberry32(7001 + round * 9973 + doors);
  return Math.floor(rnd() * doors);
}

/**
 * The door the host leaves shut. He knows where the car is and opens only empty doors:
 * if your pick is empty he must leave the car; if your pick is the car he leaves a random empty door.
 */
export function hostLeaves(round: number, doors: number, pick: number): number {
  const car = carFor(round, doors);
  if (pick !== car) return car;
  const rnd = mulberry32(424242 + round * 31 + doors);
  const k = Math.floor(rnd() * (doors - 1));
  return k >= pick ? k + 1 : k;
}

/**
 * A host who opens doors-2 doors AT RANDOM (he does not know where the car is). Rounds in which he
 * happens to open the car are thrown away; of the kept rounds, count stay wins and switch wins.
 * If your pick is the car he cannot hit it; otherwise he spares the car only with chance 1/(doors-1).
 */
export function guessingBatch(start: number, count: number, doors: number): { kept: number; stay: number; swap: number } {
  let kept = 0;
  let stay = 0;
  let swap = 0;
  for (let r = start; r < start + count; r++) {
    const rnd = mulberry32(555557 + r * 13 + doors);
    const pick = Math.floor(rnd() * doors);
    const car = carFor(r, doors);
    if (pick === car) {
      kept++;
      stay++;
    } else if (rnd() < 1 / (doors - 1)) {
      kept++;
      swap++;
    }
  }
  return { kept, stay, swap };
}

/** A batch of rounds played both ways: a random first pick, then count stay wins and switch wins. */
export function batch(start: number, count: number, doors: number): { stay: number; swap: number } {
  let stay = 0;
  let swap = 0;
  for (let r = start; r < start + count; r++) {
    const rnd = mulberry32(99991 + r * 7 + doors);
    const pick = Math.floor(rnd() * doors);
    const car = carFor(r, doors);
    const other = hostLeaves(r, doors, pick);
    if (pick === car) stay++;
    if (other === car) swap++;
  }
  return { stay, swap };
}
