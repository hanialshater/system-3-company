*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): find-next-is-navigation
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Distinguish a search highlight from an editing operation.)
Screenshots seen: yes (artifacts/walkthroughs/find-next-is-navigation/sheet.png, recorded 2026-10-15T21:37)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Highlighted match"; tapped Find first, Find next; opened reveal.

1. **The prediction is a giveaway.** Title "Find does not edit", hook "Finding a word changes your location, not the document's content", question "What does Find change here? Highlighted match / Stored text." All three answer it.
2. **Where it first broke: Find what?** There is no search box and no search word on stage. I tapped "Find first" and the first "map" lit up orange. I had to infer that the search term was "map". In every real program, Find starts with typing the word; that step, which is what makes the highlight meaningful, is missing.
3. **The highlight movement is clear.** Find first lit box 1; Find next moved the orange to box 3, skipping "key". That does show "next match", and the words stayed the same.
4. **Who has this misconception?** I struggled to imagine an adult who fears Find edits the text. The useful confusion nearby is Find versus Replace (Replace does edit), or "Find next wraps around to the top". Neither is touched.
5. **Reveal versus my question.** "Find changes the highlighted match while the tokens stay unchanged" answers the posed question, but "tokens" and "local document fixture" are builder words, and the reveal opens with filler ("The local editor now contains map · key · map").

Fixes (for the builder):
- Show a search box with "map" typed in it.
- Make the prediction about something people get wrong: "After the last match, Find next goes: nowhere / back to the first match" or Find vs Replace.
- Replace "tokens"/"fixture" with "words"/"document".

Verdict reason: the prediction is answered by the title and hook, and the stage has no search term, so the learner must guess what is being found.

## After reading the brief (meta.json)

- Objective: 'Distinguish a search highlight from an editing operation.' Delivered narrowly; no search term on stage (finding 2). Misconception field is 'Stored text', the foil label, which nobody holds.
- Fix route: demo-builder.
