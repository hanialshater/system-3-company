# Build note: every-message-is-possible (demo-builder, 2026-10-13)

- Design intent: the intercepted 1101 sits fixed under a message the learner sets bit by bit. The key that turns that message into 1101 (message XOR 1101) appears at once, as a three-line sum: message, XOR key, = sent. Below it, a 4 x 4 table of all 16 possible messages fills with each tried message's key. "Fill in the rest" unlocks after three messages tried and completes the table.
- Key state: three different messages each matched with a key, then all 16 shown. Milestones ["three", "all"], minInteractions 2. QA path: message bits 1-4 (1000, 1100, 1110, 1111), then Fill. The reveal quotes the messages actually tried, and the 16 that are on the stage at reveal.
- Fill is an auto-run, but every key it adds stays visible in the table; the step it skips (XOR) has been done by hand at least three times.
- Numbers: 1101, 16 and the keys come from CIPHER/keyFor in Demo.tsx. Node: 16 distinct keys; 1011 XOR 0110 = 1101.
- Retitled: the slug gives the answer; title "Can you crack 1101 by trying keys?".
- Terms: XOR is defined on the stage. "One-time pad" is named only in the reveal.
- After screenshots: reads on phone. No changes.
