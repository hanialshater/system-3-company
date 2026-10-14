# ADR-006: Lessons run in a sandboxed cross-origin frame with a postMessage bridge

status: proposed (accepting it needs W-085 real-device run and W-086 lesson domain + CSP header)
date: 2026-10-14
deciders: principal-engineer, platform-engineer, privacy-reviewer
source: [EDD-003](../edd/EDD-003-lesson-storage-at-scale.md) A2-b · [SPIKE-001](../spikes/SPIKE-001-frontend-sandbox.md) · [review](../../rituals/records/2026-10-13-eng-review-lesson-storage.md)

## Context
Lesson code is agent-written. Once learner accounts exist, code in the page could read tokens and
call our APIs as the learner. The founder chose "browser, in a sandbox" on 2026-10-13.

## Decision
Each lesson runs in `<iframe sandbox="allow-scripts">` (no `allow-same-origin`) served from a
**separate registrable domain**, with the CSP (`default-src 'none'; connect-src 'none'`, SRI on
every module, `frame-ancestors` limited to the app) sent as an HTTP header and as a meta tag,
`referrerpolicy="no-referrer"`, an empty `allow=""`, and `__Host-` cookies on the app. The
frame talks to the host only through a typed, versioned bridge (`ready`, `phase`, `track`,
`progress`, `resize`, `error`, plus forwarded navigation keys). The host accepts a message only
from that card's own frame window and slug, owns progress and events, and never posts anything
private to a frame.

## Consequences (good and bad)
- Good (SPIKE-001, Chromium): 19/19 hostile probes blocked, with a positive control; cold ≤ 1.1 s at 4× CPU; memory 0.85× today's feed; the QA contract passes through `frameLocator` with locator changes only.
- Bad: each frame evaluates React again, so warm budget is redefined (after-snap interactive ≤ 300 ms with ±1 frames pre-created, on a device).
- Bad: `globals.css` must split into kit and app CSS; `dvh` means the frame's height; `ready` cannot rely on rAF; host keys must be forwarded.
- Bad: a second domain and its cost (founder question 6).

## Alternatives rejected and why
- A2-a same-origin `import()`: simplest, but lesson code gets page privileges. Kept only as the fallback if iOS fails W-085, and only until login exists.
- Subdomain of the app domain: cookies ignore ports and are shared by parent domain; the spike saw the session cookie sent to the lesson origin 201 times.
