# Architecture (wave 1)
- `cellname.mjs` — cell name validation/normalisation (A1..Z99).
- `values.mjs` — value model (`SheetError`), coercions (`toNumber`, `toText`), rounding, display text.
- `tokenizer.mjs`, `parser.mjs` — formula → AST (also parses refs, ranges, calls for later waves).
- `evaluator.mjs` — AST evaluation; ctx supplies `getCell` and a `functions` registry (empty in wave 1 → `#NAME?`).
- `sheet.mjs` — `createSheet()`; stores raw text + parsed AST, evaluates lazily. `get` returns errors as their code strings.
Tests: `node --test`.
