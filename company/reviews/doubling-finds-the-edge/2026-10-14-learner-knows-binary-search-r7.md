*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7): doubling-finds-the-edge
lesson version: v2
boundary: knows-binary-search. Knows binary search halves a sorted list of known length; does not know a list of unknown length can be searched by doubling a probe first.
Screenshots seen: yes (artifacts/walkthroughs/doubling-finds-the-edge/sheet.png)
Verdict: launch

## 1. From the artifact (written before reading the r6 review or meta.json)

- Predict: the stem lays out the procedure and asks for a count. All three options are equally vague ("About 500 / 100 / 20") and the 1,001 scan is given as an anchor. The locked stage shows an axis 0–1024 with a target marker near 1000 and no gap or probe count. No answer before the commit: pass. One quibble: the axis ends at a labelled 1024, which sits oddly with "no end you can see". The dashed tail past 1024 does say "continues".
- Explore: doubling puts dots at 1, 2, 4 … 1024. They bunch at the left and spread out, so I can see that 11 probes cover a long way. The first probe past the target opens a shaded band labelled "gap 513–1023: 511 wide, up to 9 halvings". Halving drops green dots and narrows the band to 1000. COMPARISONS 17 sits next to SCAN WOULD NEED 1,001. Both parts of the why are on stage: doubling covers ground (the dots), and the gap is about as wide as the last jump (the label).
- Reveal: it quotes 11 doublings, 1 to 1024, gap 513–1023, 6 halvings, 17. After "Start over" those are all still on stage as FINISHED RUN "11 doubled + 6 halved = 17" and "last gap 513–1023: 511 wide, up to 9 halvings". It explains honestly why I saw 6 rather than 9 ("sat on an early midpoint"). log2 is glossed as "the number of doublings it takes, here 11". The reveal quotes what you saw: pass.
- Small: "the cost grows like twice log2 of the position: for position one million, 34 comparisons." If I do the sum, 2 × log2(1,000,000) ≈ 40, not 34. Coming right after "up to 9, took 6" I can guess 34 is one actual run, but the sentence reads as if 34 is what the formula gives. Wording, not a blocker.
- Would a first-time learner at this boundary get the idea from the stage? Yes. The picture of bunched doubling dots and the labelled band carry it without the reveal.

## 2. Earlier findings (r6)

1. "Halving costs about as many again" contradicted the 6 halvings seen: **fixed**. The band is labelled "up to 9 halvings" and the reveal says this target got lucky.
2. Reveal numbers sat over a reset stage: **fixed**. FINISHED RUN and the last-gap label survive Start over.
3. Gloss log2(position): **fixed**.
4. Minor: step-4 stage text near the 25-word budget: **not fixed** (minor, unchanged).

## 3. New findings

- Minor: "twice log2 … 34 comparisons" invites the sum 2 × 20 = 40. Say 34 is one actual run (or "at most about 40"). Wording for the builder; c4 is still unverified on the trust sheet, so this also goes to the fact-checker.
- Minor: the axis ending at 1024 slightly undercuts "no end you can see".
- No FATAL.
