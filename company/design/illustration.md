# Illustration style guide: watercolor (house style, v0)

owner: visual-designer (Kiri) · made by: illustrator (external image agent) · reviewed by: visual designer (style), lifehacks-safety-reviewer (safety, for Life Hacks), fact-checker (accuracy), accessibility-reviewer (alt text)

## The house style
- **Medium:** soft, beautiful **watercolor**. Visible wet-on-wet blooms and granulation. Light pencil or ink line work only where shape needs it. Plenty of white paper.
- **Palette:** transparent washes, 3–5 hues per image, built from our colour roles:
  - the domain colour (`content/domains.json`; Life Hacks is apricot `#ffb74d`) as the lead wash;
  - one cool and one warm neutral;
  - accents are allowed in `--good` and `--bad` tones only to mean "works" and "doesn't work".
- **Light:** daylight from the upper left, gentle shadows, never dramatic.
- **Composition:**
  - one subject, centred, on a clean background that fades to paper at the edges (vignette);
  - square 1:1 for the hero image, 4:3 for step images;
  - keep 10% padding so the card can crop.
- **People and hands:**
  - hands rather than faces where possible;
  - a varied range of skin tones, ages and abilities across a set;
  - no identifiable real people.
- **Objects:**
  - generic, everyday and unbranded: no logos, no product names, no packaging text;
  - food and tools look the way a learner's kitchen looks, not like a studio.
- **No text in images:** no letters, numbers or labels. Labels live on the stage, so they can be localised and read by screen readers.
- **Mood:** calm, warm, curious. Never gory, alarming or clickbait.

## Light and dark mode
- Watercolor sits on paper. The card shows the image inside a **paper frame** (warm off-white, `#faf6ee`) in both themes, so the washes never sit on a dark background.
- Deliver on an off-white paper ground, **not** transparent.

## Accuracy and safety (these block a delivery)
- The picture must show the **correct** technique: grip, order, quantities, posture. A wrong picture is a false claim.
- Never show:
  - hazardous combinations (for example two cleaning products together);
  - unsafe tool use;
  - children or pets near hazards;
  - heat or electricity being used in a way the lesson would not recommend.
- A "doesn't work" or debunk image shows the **result** (a failed outcome), never a dangerous attempt in progress.

## Technical spec
| | Hero | Step / comparison |
|---|---|---|
| Size (px) | 1024 × 1024 | 1024 × 768 |
| Format | WebP, quality about 80 | WebP |
| File size | ≤ 120 KB | ≤ 90 KB |
| Per lesson | 1 | up to 4 (formats: comparison, before/after, multi-card) |

Images are served from `public/illustrations/<slug>/` (a CDN path after EDD-003 stage 1). They are **not** part of the 15 KB lesson bundle.

## Reference images
Five reference images set the style: a kitchen scene, hands with a tool, a before/after pair, a debunk "result", and an outdoor scene. The illustrator produces them first, from request `_reference`. They are reviewed by Kiri and then become the style anchors for every later delivery.
