# Fact-check: ring-buffer-wraps-around (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the lesson's own logic in my own node scripts (scratchpad fc21/). Sources were opened where egress allowed, otherwise corroborated by web search or marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own copy of history(10): slots [9,10,7,8], 5 and 9 on slot 0, 6 and 10 on slot 1; next slot 10 mod 4 = 2 holding 7, the oldest. Unrecorded but true reveal phrase 'went round two and a half times' (10 writes / 4 slots) should be folded into this claim by the builder. |
| c2 | verified | Demo.tsx next = count % CAP; 10 mod 4 = 2. Derivation holds. CLRS 4e section 10.1 ENQUEUE not opened; matches my knowledge. |
| c3 | verified | Derivation holds: one store per write, fixed array of CAP, overwritten slot was written exactly CAP writes ago. CLRS not opened. |
| c4 | verified | Sources not opened directly (man7.org, alsa-project.org blocked). Web-search copies corroborate each: dmesg(1) NAME line 'print or control the kernel ring buffer'; alsa-lib PCM docs 'ALSA uses the ring buffer to store outgoing (playback) and incoming (capture, record) samples'; BIOS Data Area references: 16-keystroke circular keyboard buffer at 0040:001E with head/tail words at 0040:001A/001C. |

**Result:** all open claims verified; the lesson has no unverified or disputed claims.
