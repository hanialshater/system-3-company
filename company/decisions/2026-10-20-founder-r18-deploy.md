# Calm card design pass: deploy (r18)

owner: chief-of-staff
class: deploy
route: chief-of-staff → existing Vercel production project via the approved `[deploy]` marker on the default branch

Founder verbatim (2026-10-20, this session), after the calm-card design pass: "Approve deploy".

Covers the globals.css-only design pass (no in-card scrollbars, one step smaller type, frameless stage, duration tag and predict divider removed, locked-stage pictures capped at 30dvh, /d/<slug> on the feed's dark surface), merged onto r17.

## Objections
- Only 8 lessons were screenshotted before and after; tall custom stages (books, algorithms) were not checked.
- Hidden scrollbars remove the visual cue that a long reveal scrolls; content stays scrollable by touch, wheel and keys.
- No local production build; Vercel's production build is the build check. QA contract 20/20 on 6 lessons × phone/desktop plus the feed spec (2 chip-filter failures from QA_ONLY narrowing only).
