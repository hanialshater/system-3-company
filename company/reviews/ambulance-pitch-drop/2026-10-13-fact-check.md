# Fact-check: ambulance-pitch-drop, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c7+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 For a source moving at speed v toward or away from a still listener in... | verified | Moving-source Doppler f c/(c-v) approaching, f c/(c+v) receding, still air: standard (Halliday-Resnick-Walker ch. 17 locator; book not reachable, formula is textbook-standard and independently re-derived in c3 below). |
| c2 A 700 Hz siren at 25 m/s is heard at about 755 Hz head-on approaching ... | verified | 700*343/318 = 755.03; 700*343/368 = 652.45. |
| c3 Standing 3 m from the road, you hear about 755 Hz with the ambulance 2... | verified | Re-ran the lesson's retarded-time model AND an independent model (dense numeric derivative of reception time vs emission time, no cosine formula): 754.47 at x=-20, 703.74 at 0, 653.01 at +20. Wording point: the claim says "about 755 Hz" at 20 m before, but the stage and reveal show 754 Hz (754.47 rounds to 754). Within "about", but the learner sees 754 next to a trust sheet saying 755. Routed. |
| c4 The siren's own pitch never changes; the driver hears 700 Hz throughou... | verified | Source and driver co-move: no relative motion, 700 Hz. |
| c5 The rings show sound sent out 0.1 s apart, centred where the ambulance... | verified | Spacing ahead (343-25) x 0.1 = 31.8 m, behind (343+25) x 0.1 = 36.8 m; these match the labels on the stage. |
| c6 Model: still air, sound at 343 m/s; the closer you stand to the road, ... | verified | c = 343 m/s at 20 C. Re-ran model with the road offset 1.5, 3, 6, 12 m: the 10-90% width of the pitch drop is 6.1, 12.3, 24.7, 49.5 m, i.e. proportional to the offset, so closer stands = quicker drop. |

Disputed: none. Withdrawn: none.

Recall (train horn approaching is higher than 400 Hz, drops as it passes) is correct. The reveal says "Coming toward you it sounded 754 Hz" and, a paragraph later, "Head-on the limits are 755 and 652 Hz"; both true, but see route 1.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

1. The reveal and stage show 754 Hz for the approaching pitch at 20 m, while the predict option, claim c3 and the head-on limit all say "about 755". Learners comparing the two see a 1 Hz mismatch; either word c3 as "about 754" or say "up to 755".

## Result
6 verified, 0 disputed, 0 added unverified.

## Pass 4 (2026-10-13)

Checker: fact-checker. Scope: claims still open after builder revisions (v2 rewrites, claim fixes) or never checked. I wrote none of these claims except where marked "added". Method: re-derived numbers in node from the lesson model code (scratch scripts in the session scratchpad), compared each claim with the stage and reveal text, checked sources by web search where reachable.

| Claim | Verdict | Text (short) | Basis |
|---|---|---|---|
| c3 | verified | Standing 3 m from the road, you hear about 754 Hz with the ambulance 20 m before you, abou... | Re-derived in node from heard(): -20 m 754.47 (stage shows 754), 0 m 703.74 (704), +20 m 653.01 (653); other stops 755.0, 755.0, 754.9, 652.6, 652.5, 652.5 match the source list. |
| c6 | verified | Model: still air, sound at 343 m/s. | Speed of sound 343 m/s at 20 C in dry air (standard value, 343.2); stated as the model's assumption. |
| c7 | verified | Pitch in Hz is crests per second. Rings sent 0.1 s apart from a parked siren are 34.3 m ap... | Node: 34.3, 31.8, 36.8 m; 34.3/31.8 = 1.0786 -> '1.08'; 700 x 343/318 = 755.03. Stage caption is a separate claim (added c8). |
| c8 | added (unverified) | Each ring is a crest, sent 0.1 s apart. Hz = crests per second. | Stage caption before the reveal. CONCERN: a 700 Hz siren sends crests 1/700 s (1.4 ms) apart, so rings 0.1 s apart are every 70th crest (Demo.tsx header comment and c5 say so); the caption says each ring is a crest. Suggest 'Each ring marks sound sent 0.1 s ago; a real 700 Hz siren sends 70 crests in that time.' |

## Result (pass 4)
3 verified, 0 disputed, 0 left unverified, 1 added unverified.
