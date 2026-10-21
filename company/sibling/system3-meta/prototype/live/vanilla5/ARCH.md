# Architecture
- `cellname.mjs` — cell name validation/normalisation (A1..Z99).
- `values.mjs` — value model (`SheetError`), coercions (`toNumber`, `toText`), rounding, display text.
- `tokenizer.mjs`, `parser.mjs` — formula → AST. Letters+digits identifiers are refs (`valid:false` → `#REF!`); `X:Y` is a range node.
- `evaluator.mjs` — AST evaluation; ctx supplies `getCell` and a `functions` registry. Ranges evaluate to `#VALUE!` except when a function reads them via `api.rangeValues` (column by column).
- `functions.mjs` — built-ins SUM MIN MAX AVERAGE COUNT IF ABS ROUND LEN; each is `fn(argNodes, api)` so IF can evaluate lazily.
- `sheet.mjs` — `createSheet()`; stores raw text + AST, evaluates lazily with a memo cleared on every `set` (so every dependent recalculates). `get` returns errors as their code strings.
Tests: `node --test`.
