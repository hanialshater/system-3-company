# Meeting whiteboards

Each meeting room in HQ (rooms with `kind: "meeting"` in `src/lib/hq.ts`) has a whiteboard. The founder draws in the
browser at `/hq/whiteboard/<room-id>`; agents draw by writing a JSON file here. All sketches live in git, so the next
session can read them. The index of boards is `/hq/whiteboard`.

## Where files go

`company/meetings/whiteboards/<room-id>/<yyyy-mm-dd>-<slug>.json`

- `<room-id>` is a meeting room id, for example `meeting-wbr`, `meeting-retro`, `meeting-crit`, `meeting-planning`,
  `launch-room`, `constitution`, `incident`, `seminar`, `engineering`, `portfolio-review`, `culture-review`.
- `<slug>` is lowercase letters, digits and hyphens, at most 48 characters.
- Files that do not match are ignored by the page and refused by the API.

## Format (version 1)

The board is 1000 wide and 700 high, origin top left, y down. Numbers are in that space (limit +/-10000).

```json
{
  "version": 1,
  "board": "meeting-wbr",
  "title": "Short title",
  "created": "2026-10-14T09:00:00Z",
  "shapes": [ ... ]
}
```

Every shape has `id` (unique in the file, letters, digits, `_`, `-`), `type`, `color` (`#rrggbb`) and `author` (who
drew it: a role id such as `chief-of-staff`, or `founder`; 1-40 characters). The page prints the author next to each shape.

| type | fields |
|---|---|
| `stroke` | `points`: `[[x, y], ...]` (1-4000 points), optional `width` (default 3) |
| `rect` | `x`, `y`, `w`, `h` (top left corner and size) |
| `ellipse` | `x`, `y`, `w`, `h` (the bounding box) |
| `line` | `x1`, `y1`, `x2`, `y2` |
| `arrow` | `x1`, `y1`, `x2`, `y2` (head at the second point) |
| `text` | `x`, `y` (baseline start), `text` (1-500 chars), optional `size` (6-120, default 22) |
| `svg` | `svg`: a string starting `<svg viewBox="0 0 1000 700" ...>`, drawn over the whole board. Max 20000 chars. No scripts, links, images or event handlers (it is shown through an `<img>`-style sandbox and also rejected by the validator). |

Limits: 2000 shapes and 200 KB per file. The validator is `validateSketch` in `src/lib/hq-whiteboard.ts`.

## Writing one as an agent

Write the file with your normal file tools, then check it: `npm run test:hq` validates every sketch in this tree.
Use your own role id as `author`. Do not edit other authors' shapes; add yours alongside, or add a new file.

## Saving from the browser

The page saves through `POST /api/whiteboard` (same origin only, 200 KB cap, only these paths). It writes locally in dev
and local runs. **On production, writes are off** unless `WHITEBOARD_WRITE=1` is set, and the page says so. Open
objection (principal-engineer, EDD-003): production state outside git. Until decided, the browser board on production
can draw and export a PNG but not save. A saved sketch is only kept once someone commits it.

The example `2026-10-14-whiteboard-example.json` in `meeting-wbr/` was written by an agent (the chief-of-staff) by hand.
