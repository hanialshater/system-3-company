*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): show-the-file-extension
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Expose extension information before distinguishing file formats.)
Screenshots seen: yes (artifacts/walkthroughs/show-the-file-extension/sheet.png, recorded 2026-10-15T21:37)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Extension"; tapped Hide extensions (Unique names 1), Show extensions (Unique names 3); opened reveal.

1. **Where understanding first broke: hiding extensions still shows the format.** With "Hide extensions", each row reads "report", but the right-hand column still says pdf / docx / txt. So even in the "hidden" state I can tell the three files apart at a glance, and "Unique names 1" feels like a technicality. The problem the hook describes ("names look alike until their extensions appear") never happens on stage.
2. **The prediction answers itself** ("Which field distinguishes these formats?" with "Extension" as an option, while the extensions are visible on the predict screen).
3. **The hook says "Two visible names"; the stage has three files.**
4. The reveal's caveat, "an extension alone does not verify file contents", is a good and honest touch. "Unique names 1 → 3" is a clear count.

Fixes (for the builder):
- Remove the right-hand format column (or blank it when extensions are hidden), so the hidden state really looks like three identical "report" files.
- Ask a real prediction ("Which 'report' will open in a word processor?") that cannot be answered while extensions are hidden.

Verdict reason: the format column stays visible when extensions are "hidden", so the confusion the lesson is about never appears on stage.

## After reading the brief (meta.json)

- The objective is "Expose extension information before distinguishing file formats." Exposure is shown, but the hidden state still exposes the format in a side column (finding 1), so the before/after contrast is weak.
- Fix route: demo-builder.
