### 2026-10-16 · pr5-m3-followup · qa-tester
- did: Linked each bk- lesson's pr5 QA record into evidence.qa in 100 metas; reran platform/hq/check/books
- learned: Registry-split tripwire passes once evidence.qa is non-empty; platform 30 pass 0 fail 4 skipped (tests/platform/registry-split.test.mjs)
- know: test:hq now fails only 42/48/49 (shallow clone) (company/reviews/books-100/2026-10-16-pr5-m3-verify.md)
- open: Built-output tests still skipped, need VERCEL=1 build (tests/platform/built-output.test.mjs)
