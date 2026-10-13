# Build note: tree-count-explodes (demo-builder, sonnet build, EXP-003, 2026-10-13)

- Retitled "Family trees of ten species" (the brief title says "explodes").
- Design: a horizontal tree grows from 2 to 10 species. A dot on every branch marks the places the next species could join (2k - 1, counting the stub above the root). Buttons: Add 1 species, Add 3, Add up to 10, Start over. Each added species joins a seeded random branch (mulberry32 seed 5, picture only; the count does not depend on it).
- Numbers: places(k) = 2k - 1 and trees(k) are computed in Demo.tsx and shown on the stage; the reveal prints the product 3 x 5 x ... x 17 from the same function. artifacts/scratch/w5life/trees.mjs: 17!! = 34,459,425.
- Locked stage shows the 2-species tree and the model line; the tree count is hidden until the prediction is made.
- Gate: milestone "ten-species" (reached by Add 3 or Add up to 10; the QA path goes 2, 3, 6, 10).
- Only binary rooted trees are counted: stated on the stage ("branching") and in the reveal.
- Claims all unverified.
