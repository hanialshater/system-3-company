# Build note: two-names-one-list (demo-builder, 2026-10-13; sonnet build, EXP-003, queue)

- Intent: name tags a and b with arrows to list boxes. Start: both arrows to one box [1, 2]. Buttons: append via b, copy (b gets its own box), append via a, b = a (re-alias). Copy and re-alias disable when they would change nothing.
- Milestones: "shared" (append via b while aliased; a's box changes) and "copy-held" (append after the copy; the other box stays). QA path (b.append, copy, a.append, b = a) reaches both.
- Reveal quotes a's list as the learner saw it after appending via b, and the other list after the copy, from stored state.


## Revision v2

Review: locked stage showed both names on one list; reveal contradicted the final picture. Changes: locked stage shows only a and its list; b appears after the prediction; reveal says 'while b had its own copy'; title and hook no longer say two names, one list. c5 unverified. Version 2.
