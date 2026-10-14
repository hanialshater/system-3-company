# Build note: three-students-two-rooms

builder: ncm-m1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report
brief: company/domains/briefs/math.discrete.md, "## Course: NCM (2026-10-14)" #5 (accepted version, with the strand manager's edited lists)

## What was built
Single card. A small bipartite SVG with 8 labelled nodes: students A-D on the left, rooms 1-4 on the right, and one line per accepted room (A 1,2 · B 1,3 · C 2,3 · D 1,3). The learner assigns rooms by picking a student and then a room. A refused room gets a message, and a room already taken bumps its holder. Housed students and rooms fill, and used lines thicken. The other controls:
- "Try all 24" enumerates every assignment, shows the count that works (0 of 24) and lays out a best one, with 3 housed and one student marked "no room".
- "Rooms all four accept" lights the lines and rooms the group accepts together (1, 2, 3) and marks room 4 "nobody".
- "D also accepts 4" adds the line D-4. Trying again then gives 2 of 24 and lays out a working assignment.

The why on stage: the group view. Four students, three rooms is the constricted set the reveal names.
Milestones: all-fail (Try all with the original lists) and constricted (group view with the original lists). They are the first two controls in DOM order.

## Answers re-run in node (Demo.tsx survey(), extracted)
- Original lists: 0 of 24 work, best 3 (A1 B3 C2, D out). With D also accepting 4: 2 of 24 (D4 with A1 B3 C2 or A2 B1 C3). Adding room 4 to any one student also gives 2.

## Decision: slug kept
The edited brief now has four students and three acceptable rooms, so the slug "three-students-two-rooms" no longer describes the stage. The brief allows a rename to four-students-three-rooms with a decision note. I kept the slug because it is the claimed lock name, and a rename touches the registry and the course map. The title does not repeat the slug's numbers. The rename belongs to cm-math-discrete or the course manager if they want it.

## Known gaps
- Not run: next build, tsc, QA, walkthrough (per dispatch).
- The Hall/Konig attribution and the term "constricted set" (c3) are cited from the brief and not opened. All claims are unverified.
