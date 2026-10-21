# Architecture
- `cellname.mjs` — cell name validation/normalisation (A1..Z99).
- `values.mjs` — value model (`SheetError`), coercions (`toNumber`, `toText`), rounding, display text.
- `tokenizer.mjs`, `parser.mjs` — formula → AST. Letters+digits identifiers are refs (`valid:false` → `#REF!`); `X:Y` is a range node.
- `evaluator.mjs` — AST evaluation; ctx supplies `getCell` and a `functions` registry. Ranges evaluate to `#VALUE!` except when a function reads them via `api.rangeValues` (column by column).
- `functions.mjs` — built-ins SUM MIN MAX AVERAGE COUNT IF ABS ROUND LEN; each is `fn(argNodes, api)` so IF can evaluate lazily.
- `deps.mjs` — static dependency analysis: `collectRefs(ast)` (all branches, refs + ranges), `rangeCells`, and `resolveCycles` (lazy Tarjan SCC; a cell on a cycle or reading one is `#CYCLE!`).
- `sheet.mjs` — `createSheet()`; stores raw text, AST and static refs, plus a reverse `dependents` map. `set` invalidates cached values/cycle status of the cell and its transitive dependents only. `get` warms uncached dependencies deepest-first (iterative) then evaluates; errors are returned as their code strings.
Tests: `node --test`.
