*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): request-needs-the-object
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Specify artifact version and review scope.)
Screenshots seen: yes (artifacts/walkthroughs/request-needs-the-object/sheet.png, recorded 2026-10-15T21:34)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Version plus scope"; tapped Add Version, Add Scope; opened reveal.

1. **Where understanding first broke: the three drafts are never on stage.** The hook says "'Review the document' is ambiguous when three drafts exist", but the stage is a checklist with "Artifact: report", "Version ?", "Scope ?". I never see three drafts, or a reviewer opening the wrong one. Without that, the ambiguity is only asserted.
2. **The result is a field count, not a pointed-at object.** "Fields 3/3" tells me I filled a form. It does not show that "report v3, figures" now picks out one of three drafts while "the document" picks out any of them.
3. **The prediction answers itself** ("Version plus scope" sounds precise; "The document" is the hook's bad example).
4. The reveal is accurate and cautious (no claims about permissions or acceptance), but it answers "what fields should I fill?", not "why was my request ambiguous?".

Fixes (for the builder):
- Draw three drafts (v1, v2, v3). Highlight all three for "the document", and only v3's figures section for "report v3 · figures".

Verdict reason: the three drafts that make the request ambiguous never appear, so the lesson shows a checklist being filled, not an ambiguous request being resolved.

## After reading the brief (meta.json)

- The objective is "Specify artifact version and review scope." Specifying is shown, but the reason it matters (three drafts) is not on stage (finding 1). The trust-sheet claim ("'the latest' depends on which drafts each reader has") describes an idea the stage never shows.
- Fix route: demo-builder.
