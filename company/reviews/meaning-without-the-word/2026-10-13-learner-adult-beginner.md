*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: meaning-without-the-word
lesson version: v2
boundary: adult beginner; has used a chatbot, knows it can "look things up"; no idea how search ranks text.
Screenshots seen: yes (sheet.png, 7 frames)
Verdict: revise

## 1. From the artifact

- First idea I didn't have: "k" in the option "Only if k = 1". The stage never says k; the buttons say "Top 1 / Top 2 / Top 3". A beginner reads it as an unknown symbol.
- The prediction itself is good: "Yes, it is the best match" is the human pull, and spotting "French" ≠ "France" is the whole trick.
- Explore shows the word search clearly: Paris chunk scores 0 and sinks below a red cut line; meaning search lifts it to 0.91 at the top. Top 1/2/3 move the cut line visibly.
- Logic gap in the reveal: "The four others each matched one keyword, so the top 2 were 'Rome…' and 'France exports…'". All four scored 1; why those two? The "so" does not follow; it is an unexplained tie-break. A careful beginner will ask this.
- Told-not-shown: meaning scores are "hand-set here"; honest, but the 0.91 is then just a number I am given.
- Layout: the locked stage text (query and chunks) is tiny and greyed, hard to read before predicting, and the question depends on reading the chunks. Reveal-frame table shrinks to unreadable.

## 2. After reading the brief

- Learner field matches. Intent (keyword retrieval can miss a paraphrase) delivered.
- Suggested fix: say "top 1" instead of "k = 1"; state the tie-break ("ties keep list order") or make the scores break the tie; make the locked chunk list legible.
