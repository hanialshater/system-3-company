*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8): no-fraction-fits
lesson version: v5
boundary: adult-beginner (from meta.json learner: knows the diagonal of a 1-by-1 square is √2, even and odd numbers, and the idea of a proof by contradiction; does not know why no fraction of whole numbers equals √2)
Screenshots seen: yes (artifacts/walkthroughs/no-fraction-fits/sheet.png and 04-reveal.png, build 5)
Verdict: revise

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "Yes, with big enough numbers"; slider right two presses (q = 3: 18 between 16 and 25); "Next close call" (q = 5: 50 next to 49, off by 1); opened reveal.

1. **The why is on the stage.** Each square end is tagged "2s: 4 (even)", "2s: 0 (even)", and the 2 × q² point "2s: 1 (odd)" is in red. The line "2s = how many 2s multiply into it: 50 = 2 × 25; 49 = 49 (no 2s)" defines the term on the spot. That is the even/odd parity the reveal argues from, drawn at each q.
2. **No answer before the commit: passes.** The title and hook voice the wrong belief ("surely some fraction hits √2"). The only option with an exact number is the wrong one (99,999 / 70,710). The locked stage shows 1² = 1 and 2² = 4, with "?" readouts.
3. **The reveal quotes what I saw.** "q = 1, 2, 3, 5 (the Tried row)", "50 next to 7² = 49, off by 1", "7² had 0", "50 had 1" are all on the stage at the reveal, in the HTML lines as well as the picture.
4. **Fit: the stage top is on screen, but the reveal is over budget (revise).** In 04-reveal the rule line at the top of the stage and the last reveal line are both visible, so the crop is 0. But the reveal is about 109 words against 90 for a new version, and the fit is reached by the kit shrinking the picture (see 5). The rule says never to fix fit by shrinking text. "Close calls keep coming, so closeness cannot settle it. The 2s can." and the repeated "No, never." opener are the cheapest cuts. The category manager picks.
5. **Labels at the reveal (kit, W-287).** The number line is shrunk, and "2s: 0 (even)" / "2s: 6 (even)" are about 4 px. The same facts are readable in the HTML "Nearest square" line, so nothing the reveal names is lost. Kit finding.
6. Small: the argument "a square has each 2 of p twice" assumes the learner accepts counting prime 2s. The stage gives examples (16 = 2×2×2×2), which for this boundary is enough.

Verdict reason: strong lesson, honest quotes and a shown why, but about 19 words over the 90-word budget on a new version. A trim, not a redesign.

## After reading build.md (Pre-flight v5) and the r7 review

- r7 top finding ("2s" not glossed): **fixed** by the gloss row ("2s = how many 2s multiply into it: 50 = 2 × 25; 49 = 49 (no 2s)"), and it reads well.
- Pre-flight has no item 7, and the reveal text is "unchanged from v4". r7 judged about 110 words as "inside budget" against the old 120 budget. The budget is now 90 for every new version (demo-standard Text budget), and v5 is a new version.
- c8 (the gloss row) shows as checked in this build ("7/7 claims checked").

Fix route: demo-builder. Cut the reveal to 90 words or fewer, with no claim meaning changed (cm-math approves if a claimed sentence goes). Re-check stage-top crop 0 at 390x844 after W-287 restores label size. Answer Pre-flight 7.
