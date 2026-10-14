# Fact-check: the-bar-nobody-can-forecast (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx (stage, reveal, model) before claim sources; re-ran the numbers with my own node scripts copying the lesson's logic (scratchpad fc22); sources checked by web search where reachable. Source hosts (JSTOR mirrors, Wikipedia, the E&K book host) were blocked, so citations are confirmed bibliographically only and say so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | attendanceFor(): f <= 60 -> 100, else 0; reveal prints attendanceFor(50) = 100 and attendanceFor(70) = 0. |
| c2 | verified | within the lesson's model every believed forecast f gives 100 (f <= 60) or 0 (f > 60), so outcome = forecast would need f = 100 with f <= 60 or f = 0 with f > 60: impossible. |
| c3 | verified | own log-space binomial sum (scratchpad fc22/bar.mjs): P(X > 60) = 0.46208 for Binomial(100, 0.6); mean 60. |
| c4 | verified | own mulberry32 re-implementation: seed 1 at 100 nights avg 60.2, 48 crowded; 111 nights (QA path) 60.1, 54; 200 nights 60.3, 96; every run length from 100 to 500 gives crowded share 44.4-51.6% and average 59.9-60.5. Seeds 2 and 3: 38 and 44 crowded at 100. Non-blocking note: Reset after the milestone lets the reveal quote a run under 100 nights (e.g. 1 night: 100% crowded); the numbers quoted are still the learner's own. |
| c5 | verified | P(X > 60) = 0.4621, P(X = 60) = 0.0812, P(X < 60) = 0.4567 (own script). |
| c6 | verified | Arthur, 'Inductive Reasoning and Bounded Rationality', AER 84(2) Papers and Proceedings, 406-411 (May 1994): confirmed bibliographically via search (JSTOR/IDEAS listings); full text host blocked, not opened. The 100-person, 60-seat setup is the well-known El Farol framing (from knowledge, consistent with secondary sources in search). 'Identical people, one shared forecast, no learning' is presented as the lesson's simplification, which is accurate. E&K placement: ch. 17 is 'Network Effects' (library catalogue TOC via search); El Farol as its closing advanced section on negative externalities is from memory (fairly sure, section number 17.7 not confirmed). Not shown to learners. |

**Result:** every claim open at this pass is now verified.
