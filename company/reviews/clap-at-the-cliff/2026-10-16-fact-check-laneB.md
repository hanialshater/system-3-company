# Fact-check: clap-at-the-cliff recall (2026-10-16, lane B)

- Checker: fact-checker, lane B (F-46 closeout). Worktree base cdee168c. FC wj64 recorded this claim; I did not, so I may rule on it.
- Read: meta.json recall (the learner text), then the claim and wj64's note.
- Result: **recall disputed** (blocks).

## Finding

- Rendered question: "A ship's sonar ping returns from the seabed after 2 s. Sound in sea water travels 1,500 m each second. How deep is the seabed?" Options: 750 m / 1,500 m / 3,000 m. Key: 1,500 m.
- The claim says "about 1,500 m". The learner text gives the speed as an exact fact.
- Source opened: OpenStax College Physics 2e, module m42256 (Speed of Sound, Frequency, and Wavelength). CNXML from raw.githubusercontent.com/openstax/osbooks-college-physics-bundle/main/modules/m42256/index.cnxml, table row "Sea water | 1540" (m/s).
- 1,500 is 2.6% below 1540. That is fair as a round value, but the exact statement is not supported by what I opened.
- Arithmetic: 1,500 × 2 / 2 = 1,500 m. Right. At 1540 m/s the depth is 1,540 m, still nearest the 1,500 m option, so the key survives the fix.

## Fix (demo-builder, meta.json recall.question)

"A ship's sonar ping returns from the seabed after 2 s. Sound in sea water travels about 1,500 m each second. How deep is the seabed?"

- Options, answer and why: unchanged.
- Claim: source becomes OpenStax m42256 (sea water 1540 m/s); reset to unverified.
