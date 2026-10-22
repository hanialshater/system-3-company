# Benchmark 6 blind packs: tell-scan redactions

Scan (score.md section 0.5): `grep -rniE 'meta|order|O-[0-9]|kernel|launch|fact-check|reviewer|vanilla|benchmark' packs/`, run 2026-10-22 after the packs were built.
Only hits in code comments are redacted (the matched word replaced with `[redacted]`).

| Pack | File:line | Original | Redacted |
|---|---|---|---|
| B-eight-cores-not-eight-times | code/Demo.tsx:5 | `// Presets in DOM order: 2, 4, 8, ...` | `// Presets in DOM [redacted]: 2, 4, 8, ...` |
| A-drivers-stop-switching | code/Demo.tsx:6 | `... Controls (DOM order): One at a time: run` | `... Controls (DOM [redacted]): One at a time: run` |

Hits left in place (not code comments):
- `border` / `border-collapse` / `border-radius` in code/styles.module.css (CSS property names, substring match on "order"), A-drivers, B-drivers.
- `"Stops only for some driver orders"`: a learner-visible option string in code/Demo.tsx and walkthrough/transcript.md (A-drivers, B-drivers).
- brief.md: "orderer cm-cs", "meta.json", "DOM order", "fact-checker confirms" (identical file in both arms' packs).
- claims.json text/source/address values: "order of drivers" (A-drivers c-text), "fact-checker confirms" (A-faster-link source), "DOM order"/"Milestones" etc. Claims values are not code comments, so they are not redacted under the protocol.

Residual possible tell, NOT redacted (claims.json values, outside the protocol's redaction scope; flagged for the orchestrator):
- B-faster-link-same-wait/claims.json: address "... (brief #5 attribution rule: the plan check could not read RFC 9293) ..." and source "(per the plan check precision note; unconfirmed)".
