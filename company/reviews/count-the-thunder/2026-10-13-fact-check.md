# Fact-check: count-the-thunder, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c6+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Sound travels through air at about 343 m/s (dry air at 20 C). | verified | Speed of sound in dry air at 20 C: 331.3*sqrt(1+20/273.15) = 343.2 m/s. Fine to 343. Locator (HRW ch. 17 table) not re-read; value agrees with the ideal-gas formula. |
| c2 Light travels at about 3.00 x 10^8 m/s, so a flash 2 km away arrives i... | verified | c = 299,792,458 m/s; 2058 m / 3.00e8 = 6.86 us (stage shows 6.9 us at 6 s; 10.3 us at 9 s; 17.1 us at 15 s, all re-computed). |
| c3 Thunder heard 6 s after the flash means a strike about 2.06 km away. | verified | 343 x 6 = 2058 m = 2.06 km. |
| c4 Every 3 s of counting is about 1 km (1,029 m): divide the count by 3 f... | verified | 3 x 343 = 1029 m. The "divide by three for km" rule is reported as Met Office guidance by a regional news article (Bury Mercury), not seen on the Met Office site itself; the arithmetic stands independently of the attribution. Rule for miles is divide by five (not in the lesson). |
| c5 The lesson ignores wind, temperature changes along the path and the he... | verified | Stated idealisation; ~0.6 m/s per degree C is the standard slope (0.6*20+331.3 = 343.3). |

Disputed: none. Withdrawn: none.

Stage readouts at 9 s (3.09 km) and 15 s (5.14 km) re-computed. Recall (1.5 s -> 514.5 m, "about 500 m") correct. One caution, not an error: thunder is rarely audible beyond ~15 km, so the slider's 15 s range is the usable one.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
5 verified, 0 disputed, 0 added unverified.
