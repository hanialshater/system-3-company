# Solar System Quiz Pack: Style Sheet

For ages 8-10. Follows the kickoff decisions (MTG-1).

## Format

Every round file starts with its title line, exactly as listed under Rounds, for example "# Round 1: The Sun".
Then come exactly 4 question blocks (Q1 to Q4, never a fifth). Each block is three lines:

- `**Qn.** question?` (n is 1 to 4, at most 16 words)
- `**Answer:** short name or number` (at most 4 words, e.g. "Venus", not "It is Venus")
- `**Why:** one sentence` (at most 20 words, true on its own)

No other kinds of line: no intro, no notes, no multiple choice lists. Answers are open.
Numbers are written as digits (8, not eight; 1,000, not a thousand), rounded and kid-sized, with "about" where needed to stay true.
Reading ease at least 60: short sentences and everyday words. Say "air", not the science word for it.
Voice of the Why line: warm, curious and concrete, one surprising true fact or picture a child can hold. Never talk down, and no scary framing (say "rusty red").
Writers note a source (NASA Solar System pages) for each answer in their builder notes, and run `node meta.mjs check --order=<O>` before handing in.

## Rounds

- Round 1: The Sun
  Owns: the Sun is a star; its light takes about 8 minutes to reach us; it is mostly hydrogen and helium; it holds almost all the mass; it is the center of the solar system.
- Round 2: Rocky Planets
  Owns: Mercury, Venus, Earth, Mars. Mercury is closest to the Sun; Venus is hottest because thick clouds trap heat; Mars is red from rust; Olympus Mons.
- Round 3: Giant Planets
  Owns: Jupiter, Saturn, Uranus, Neptune. Jupiter is biggest; the Great Red Spot; Saturn has the best-known rings (never "only rings"); Uranus spins on its side; Neptune is the farthest planet.
- Round 4: Moons
  Owns: our Moon and its phases; Ganymede is the largest moon; Titan has thick air; Europa has ice over an ocean; Io has volcanoes.
- Round 5: Small Worlds and Space Travel
  Owns: Pluto, a dwarf planet since 2006; the asteroid belt between Mars and Jupiter; comets of ice and dust, with tails pointing away from the Sun; shooting stars; astronauts, rovers and probes.

### Ownership rules

- A planet, moon or body name is an Answer only in its owner round.
- Superlatives (biggest, hottest, closest, farthest, largest moon) live only in the owner round.
- No Q or Why line names another round's answer. A line that names another round's answer next to a key word of its question gives that answer away.
- No facts that keep changing: no moon counts, no "ninth planet".
- A number is an answer at most once in the whole pack.

## Difficulty

In every round: Q1 and Q2 are easy (things an 8-year-old may have heard), Q3 is medium, and Q4 is a stretch with a fun surprise.
