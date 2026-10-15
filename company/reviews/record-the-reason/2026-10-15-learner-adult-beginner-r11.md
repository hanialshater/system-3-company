*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): record-the-reason
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Record choice, constraint and reason together.)
Screenshots seen: yes (artifacts/walkthroughs/record-the-reason/sheet.png, recorded 2026-10-15T21:33)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Choice plus reason"; tapped Add Reason, Add Condition; opened reveal.

1. **Where understanding first broke: the reason I add does not explain anything.** The reason field fills with the single word "shorter", and the condition with "deadline". As a later reader I still cannot say why B was chosen. Shorter than what? Which deadline? The lesson's claim ("later readers can inspect that rationale instead of reconstructing it") is undercut by its own sample: I have to reconstruct the rationale from "shorter" and "deadline".
2. **The stage never shows a later reader.** The result is "Fields 3/3", a checklist count. I never see the "Choice alone" record fail. For example, nothing asks "why B?" and finds no answer. The contrast the hook sets up ("'We chose B' does not preserve why") is never played out.
3. **The prediction answers itself** ("Choice plus reason" vs "Choice alone" for "which record allows the rationale to be inspected").
4. **"Condition" is unexplained.** It is not in the question or the hook, and the reveal mentions only the reason.

Fixes (for the builder):
- Make the reason a readable sentence ("B is 2 days shorter, and we must ship by Friday").
- Add a later-reader moment: a question the "choice alone" record cannot answer and the full record can.

Verdict reason: the recorded reason ("shorter") does not let a reader inspect the rationale, so the stage contradicts the reveal, and the bare-choice record is never shown failing.

## After reading the brief (meta.json)

- The objective is "Record choice, constraint and reason together." Fields are added, but the sample values ("shorter", "deadline") are too thin to count as a recorded reason (finding 1).
- The trust-sheet claim mentions "who and when do not say why", but who/when fields never appear on stage. Route: fact-checker / demo-builder.
