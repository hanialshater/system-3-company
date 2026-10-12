# Domains and categories

Each domain is a **category** with a category manager (`cm-<id>`), a charter (this folder), and a
curriculum map (`content/curriculum/<id>.json`). The map lists concepts with level
(intro / core / stretch), demand (1–3) and prerequisites. Prerequisites can cross domains
(`probability:expected-value`). The public map at `/catalog` shows what we teach and what we don't
teach yet. **Unmet demand** is the roadmap's raw material: `npm run company -- coverage`.

| Domain | Charter | Status |
|---|---|---|
| Mathematics | [math.md](math.md) | active |
| Computer Science | [cs.md](cs.md) | active |
| Probability & Data | [probability.md](probability.md) | active |
| Physics | [physics.md](physics.md) | active |
| AI & Machine Learning | [ai.md](ai.md) | active |
| Economics & Money | [economics.md](economics.md) | active |
| Life Sciences | [life.md](life.md) | active |
| Chemistry | [chemistry.md](chemistry.md) | active |
| Geography & Maps | [geography.md](geography.md) | active |

## Expanding into a new domain

1. **Proposal.** The domain scout writes `proposals/<id>.md` (template:
   `rituals/templates/domain-launch.md`). It covers audience, 8–12 concepts with demand, three
   candidate lessons, and above all **checkability**: how claims in the domain get verified.
2. **Domain Launch Review.** The head of product decides: *enter*, *incubate* or *wait*.
   Incubating domains get at most two lessons, run by an existing category manager or by the
   scout, and are reviewed after one quarter.
3. **Activation** (ratified in OP). Add the domain to `content/domains.json`, write the
   curriculum file and charter, and add a category manager in `tools/org/roles.mjs` (one `cm(...)`
   line). Then run `node tools/org/generate.mjs`. `npm run check` fails until every piece exists.
4. **Retirement.** A domain whose lessons stop being remembered, or whose claims cannot be
   checked, goes back to incubating.

Current proposals: [astronomy](proposals/astronomy.md), [music theory](proposals/music-theory.md), [linguistics](proposals/linguistics.md).
