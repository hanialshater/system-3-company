# Build note: cafe-is-five-bytes (demo-builder, 2026-10-13)

- Design intent: one text box. A palette (c, a, f, é, 世, 😀) adds characters to it. Under each character, its UTF-8 bytes appear as hex boxes, with multi-byte boxes tinted. Readouts show the character and byte counts (hidden while locked). A 12-byte cap keeps it on one phone screen; café世😀 is exactly 12.
- Key state: the text equals "café" (4 characters, 5 bytes), then a 4-byte character is added. Milestones ["word", "four-byte"], minInteractions 2. QA path: ⌫ comes first in the DOM but is disabled while the text is empty, so QA skips it. Then c, a, f, é (café), 世, 😀. At reveal the stage shows café世😀 = 6 characters, 12 bytes. The reveal quotes café and only the extra characters the learner actually added.
- Numbers: bytes come from TextEncoder in Demo.tsx. Node: Buffer.byteLength('café') = 5; é C3 A9, 世 E4 B8 96, 😀 F0 9F 98 80.
- Retitled: the slug answers the question, so the title is "How many bytes is café?".
- Terms: "byte" is defined on the stage ("Each box is one byte"). Hex appears only as labels (byte-in-two-digits teaches it).
- After screenshots: reads on phone; emoji and 世 render. No changes.
