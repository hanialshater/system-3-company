# Build note: zebra-sorts-before-apple

Builder: wave-i-cs (demo-builder) · 2026-10-14 · from brief cs.md #56 (before / after toggle), board W-395.

- Brief numbers re-run in node: A 65, B 66, Z 90, a 97, z 122; default sort [Banana, Zebra, apple]; lowercased [apple, Banana, Zebra]; a - A = 32 for all 26 letters; Intl.Collator("en") gives [apple, Banana, Zebra].
- Stage: three tiles (Zebra, apple, Banana). Tapping a tile shows its first letter's code (then the tile stays shown, disabled). After the commit a ruler line "A 65 … Z 90 · a 97 … z 122" and "first / last" row ends appear. "Sort by code" reorders the tiles; "Ignore case" (enabled after sorting) re-sorts on lowercased letters, and the order not in the tiles stays as a faint row ("By code: …" or "Ignoring case: …"), so both orders stay visible once seen.
- Milestones codes-read, sorted-by-code, case-ignored; minInteractions 3. No Reset (the brief lists none; nothing the reveal quotes can be undone except the toggle, and the faint row keeps the other order).
- Reveal = the cm-cs draft unchanged (69 words). Claims c1-c6 unverified; c6 states the "stores each letter as a number / capitals before small letters" sentence.
- Risk for cm-cs: the slug (in the page URL) reads "zebra sorts before apple", which points at the answer. The title and hook do not. Renaming the slug is not the builder's call.
- design-lead: sign-off on the before/after toggle is still owed (brief's next move).

## Pre-flight v1
1. **Title and hook.** "Where does a computer put apple?" / "Sort apple, Banana and Zebra by the numbers a computer stores. Where does each land?" Neither names a position or says capitals are smaller; first, second and last stay open.
2. **Options.** "First" / "Second" / "Last": same form, none numbered.
3. **Locked stage.** Three tiles in the order Zebra, apple, Banana, each reading "tap"; the two buttons. No codes, no ruler, no "first/last" labels, no sorted order, no highlight.
4. **Reveal values.** "B is 66, Z is 90, a is 97": (b) milestone codes-read (all three tile codes shown, the tiles stay shown). "65 to 90", "97 to 122": the ruler line, on stage from the commit. "Banana and Zebra ahead of apple": (b) milestone sorted-by-code, computed from the same code-unit sort; on stage as the tiles or the faint "By code" row. "apple came first": (b) milestone case-ignored; on stage as the tiles or the faint "Ignoring case" row. "plus 32": computed (a - A), told, claim c4.
5. **QA path.** DOM order Zebra, apple, Banana (codes-read on the third), Sort by code (sorted-by-code), Ignore case (case-ignored): 3 milestones in 5 presses, the question's own case (code order) is milestone 2. At the reveal the tiles show apple, Banana, Zebra with codes and the faint row shows "By code: Banana · Zebra · apple".
6. **Reset.** No Reset control. Turning the toggle off after the reveal path swaps the rows (tiles in code order, faint "Ignoring case" row), so every quoted state stays visible. Reveal on the QA path: "You read the codes: B is 66, Z is 90, a is 97. A computer stores each letter as a number, and every capital (65 to 90) comes before every small letter (97 to 122). So sorting by code put Banana and Zebra ahead of apple. With case ignored, apple came first. Each small letter is its capital plus 32. Real apps sort with language rules, not raw codes."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 zebra-sorts-before-apple` (dev server, 2026-10-14): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0 (named: first, apple, banana, zebra, last, by code, all visible), 74 words with the verdict (69 reveal). Stage 231 px, reveal 205 px, window 618 px. Screenshot `artifacts/reveal-fit/zebra-sorts-before-apple.png`.

Not run: next build, QA, walkthrough (not in this task). tsc and check pass.
