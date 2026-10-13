# Build note: bloom-maybe-yes (demo-builder, 2026-10-13)

- Design intent: one strip of 10 bits (0-9). Each bit shows 0/1, its index, and which added words lit it (bit 4 reads "cat dog"). "Add cat" / "Add dog" light their 3 bits; "Ask cat / fox / eel" outlines the asked word's 3 bits (green if lit, red if dark) and the line above says "Maybe" or "No".
- No "hash" on the stage: "Each word always points at the same 3 bits." The bit table is a fixed choice, disclosed in c2/c3 (not a real hash).
- Key state: eel asked after adds and answered Maybe; plus any No seen after an add. Milestones ["eel-maybe", "seen-no"], minInteractions 2. QA path: Add cat, Add dog, Ask cat (Maybe, true member), Ask fox (No, bits 0 and 9 dark), Ask eel (Maybe). The question's eel query is last so the stage at reveal shows it.
- Numbers: every bit list in question, message and reveal comes from BITS/answer() in Demo.tsx. Re-computed in Node: lit {1,2,4,7,8}; eel all lit; fox dark {0,9}.
- Retitled: "bloom-maybe-yes" gives the answer; title "Was eel ever added?".
- Deviation: no false-positive-rate formula (brief said verify before quoting; not quoted).
- After screenshots: strip fits 10 columns on phone; no changes.
