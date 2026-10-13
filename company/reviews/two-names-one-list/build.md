# Build note: two-names-one-list (demo-builder, 2026-10-13; sonnet build, EXP-003, queue)

- Intent: name tags a and b with arrows to list boxes. Start: both arrows to one box [1, 2]. Buttons: append via b, copy (b gets its own box), append via a, b = a (re-alias). Copy and re-alias disable when they would change nothing.
- Milestones: "shared" (append via b while aliased; a's box changes) and "copy-held" (append after the copy; the other box stays). QA path (b.append, copy, a.append, b = a) reaches both.
- Reveal quotes a's list as the learner saw it after appending via b, and the other list after the copy, from stored state.
