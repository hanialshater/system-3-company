# Decision: illustrations by an external image agent, in a watercolor house style

owner: chief-of-staff · date: 2026-10-13 · status: accepted (founder: "set it up so it can roll; use a beautiful watercolor style as default")

## Decision
- **New role `illustrator`** (external contributor, Design team, reports to Kiri, the visual designer).
  - Brief: `company/design/illustrator-handbook.md`.
  - It works only through `company/design/illustration-requests/` (status lines) and `company/design/illustration-inbox/<slug>/` (images plus `provenance.json`).
  - Its subagent here is a stand-in that only runs intake checks.
- **House style: watercolor** (`company/design/illustration.md`).
  - Transparent washes from our colour roles, plenty of paper, hands rather than faces, unbranded objects, **no text in images** (so International can localise).
  - Shown on a paper frame in both themes.
  - Limits: WebP, ≤ 120 KB for a hero image, ≤ 90 KB per step image.
- **Pipeline:** request → delivery → reviews, then `node tools/illustrations.mjs accept <slug>` copies the images to `public/illustrations/<slug>/` with their provenance.
  - Required reviews, recorded in the request: Kiri for style (`style_ok`), the fact-checker for accuracy (`accuracy_ok`), the accessibility reviewer for alt text (`alt_ok`), and Sana for safety on Life Hacks and anything else with a safety class (`safety_ok`).
- **Kit:** `<Illustration slug alt />` (`src/kit/Illustration.tsx`) shows an accepted image with a visible "AI-generated illustration" note. Alt text is required.
- **First request: `_reference`,** five style anchors that later deliveries must match.
- **Picking life hacks:** the illustrator may *suggest* ideas in `company/domains/briefs/lifehacks-ideas.md`. Tess (cm-lifehacks) decides, and Sana checks safety.

## Engineering notes (board: principal-engineer, platform-engineer)
- Images are assets outside the 15 KB lesson bundle. EDD-003 stage 1 should store them content-addressed on the CDN, with a hash in the lesson manifest (`public/` is the interim location).
- Images inside the SPIKE-001 sandbox are fetched from the lesson origin, so the CSP must allow `img-src` from the asset origin.

## Objections that travel
- **A pretty but wrong or unsafe picture** is the main risk. Mitigation: accuracy and safety reviews block `accept`.
- **Licensing and provenance of generated images:** every delivery records the model, prompt and licence terms. The founder confirms the image tool's terms allow commercial use (board item).
