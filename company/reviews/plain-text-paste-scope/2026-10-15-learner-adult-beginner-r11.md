*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): plain-text-paste-scope
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Distinguish text content from a simulated style attribute.)
Screenshots seen: yes (artifacts/walkthroughs/plain-text-paste-scope/sheet.png, recorded 2026-10-15T21:32)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Source formatting"; tapped Paste styled, Paste plain; opened reveal.

1. **Where understanding first broke: the question's verb.** "What does plain-text paste leave behind here?" "Leave behind" can mean "discard" (formatting) or "leave in the document" (the words). I hesitated between the two. The lesson counts "Source formatting" as right, so it means discard, but a beginner reading "leave" as "leave in place" would pick "The words" and be told they are wrong about something they understood.
2. **Formatting is drawn as a word.** "Paste styled" adds a box labelled "BOLD" next to "Title", and "Paste plain" swaps it for a box labelled "plain". Both read as extra words in the document, and the counter says "Tokens 2" both times. This is the opposite of the lesson's point: plain paste should give me just "Title", in plain style. The reveal repeats it: "The local editor now contains plain · Title."
3. **I never see styled text.** The Title box never turns bold, so the thing that gets dropped is never visible as styling.
4. Reveal caveat ("real paste options vary by app") is good.

Fixes (for the builder):
- Show formatting on the word itself (Title in bold vs Title plain), with no extra token.
- Reword the question as "What does plain-text paste drop?" or "keep?".

Verdict reason: the stage draws formatting as an extra word, so after plain paste the document seems to hold two words, "plain" and "Title", which contradicts what plain paste does.

## After reading the brief (meta.json)

- The objective is "Distinguish text content from a simulated style attribute." The stage draws the attribute as a second token, so text and style are not visibly separated (finding 2). Not delivered as drawn.
- Fix route: demo-builder (style shown on the word; question verb).
