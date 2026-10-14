# Lesson metadata (meta.json), version 2

owner: head-of-product (standard), platform-engineer (tooling) · since 2026-10-14 (founder: "each demo should have metadata so we can do things with it later, like connect to curriculum")

Every lesson's `meta.json` already carries the following:
- `slug`, `title`, `hook`, `domain`, `concept`, `status` and `version`;
- `owner`, `learner.knows` and `learner.doesNotKnow`;
- `misconception` and `objective`;
- `claims` and `evidence`;
- `recall`.

Version 2 adds three blocks that make lessons connectable: to the curriculum, to each other, to formats, and to books and courses.

```json
"curriculum": {
  "primary": "probability:birthday-paradox",       // <domain>:<concept id> in content/curriculum/<domain>.json
  "also": ["math:counting-pairs"],                   // other concepts it teaches or uses, in any domain
  "prerequisites": ["probability:complement-rule"],  // concepts a learner should meet first
  "level": "intro",                                   // intro | core | stretch, as in the curriculum
  "strand": "chance",                                 // sub-area (tools/org/roles.mjs SUBAREAS), if any
  "references": [                                     // works in content/works.json
    { "work": "easley-kleinberg-2010", "chapter": 4, "section": "4.5", "note": "Schelling model" }
  ],
  "tags": ["pairs", "combinatorics"]
},
"format": "single-card",                              // id from company/design/formats.md / company/design/concepts/
"interactions": ["choice-before-reveal", "slider-live-chart"]   // UI concept ids (company/design/concepts/)
```

## Who fills what
- **Category manager:** the brief names the concept, the extra concepts (`also`), the format and any references (the work, chapter and section).
- **Builder:** copies them into `meta.json` while building, and adds `interactions`.
- **`node tools/meta.mjs backfill`:** fills what can be derived for older lessons. That covers `primary`, `prerequisites`, `level` and `strand` from the curriculum files. It never overwrites a field a person set.
- **`node tools/meta.mjs lint`:** reports missing fields. This is a warning, not a gate, until the evaluation steward proposes making it one.

## What this enables
- Coverage of a curriculum or a book: `node tools/meta.mjs coverage --work=easley-kleinberg-2010` lists chapters × lessons.
- Learning paths through prerequisites (Personalization).
- "Next lesson" links.
- Format and interaction analytics (the Design inspector).
- Locale planning (International).
