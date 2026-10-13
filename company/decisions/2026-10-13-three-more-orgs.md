# Decision: three more orgs: Life Hacks, Personalization, International

owner: chief-of-staff · date: 2026-10-13 · status: accepted (founder request)

## Decision
- **Life Hacks**: a new category (`content/domains.json` id `lifehacks`, status **incubating**), WikiHow-like practical how-to taught as predict → explore → reveal.
  - Roles: `cm-lifehacks` (Tess) and `lifehacks-safety-reviewer` (Sana), who reports to the evaluation steward, not to the category, so safety review stays independent of the people who want lessons shipped.
  - The charter has a refuse list (chemical mixing, medical or dosage, electrical work, defeating safety devices, legal or financial advice).
  - Launch to active only after the safety reviewer passes the first 5 lessons.
- **Personalization**: `personalization-lead` (Mateo) and `learner-model-engineer` (Ifeoma).
  - The scope **waits for the founder's brief** ("complex, will explain later").
  - Until then: requirements and questions only (`company/personalization/README.md`), nothing irreversible.
  - Anti-Goodhart line: personalise for recall, never time-on-feed, never on demographics.
- **International**: `localization-lead` (Yuki), a pool of `localizer`s and of `cultural-reviewer`s (Amira).
  - Localization, not translation: units and numbers recomputed, currency, examples, culture, and region-dependent facts re-checked per locale (`company/international/README.md`).
- **HQ**: a second floor with the Life Hacks office, Safety desk, Personalization, Learner model lab, International, Locale desks, Culture review and a lounge. Floor tabs show who is working on each floor.

## Engineering implications (sent to the principal engineer, board W-089)
1. **International ↔ EDD-003:** locale variants are "variants as data" (ADR-008 draft). Still needed:
   - a string, number and unit format layer in the kit (`Lesson.tsx` is constitutional, so any change to the contract is an amendment);
   - right-to-left scripts and fonts;
   - per-locale claims and reviews addressed by lesson hash plus locale.
2. **Personalization ↔ backend:** the learner model needs the attempts and revisit data, so the backend auth and database decisions (waiting on the founder) now block two teams. Ordering logic must run outside lesson code (the sandbox boundary from SPIKE-001).
3. **Life Hacks:** probably no new engine, but lessons may want photos or video. Check what that does to the 15 KB lesson budget and to the CDN policy (SPIKE-001), and decide asset handling.
4. **Gates:** the safety review for lifehacks and the per-locale cultural review are new launch evidence. Wiring them into the gates in `tools/company.mjs` is an amendment (evaluation steward).
5. **Scale:** locales multiply lesson count (concepts × locales), the "variants" axis in EDD-003. Revisit the stage triggers with locale counts included.

## Objections that travel
- **A new category while 300+ lessons await review** adds load. Mitigation: it is incubating, briefs are written by the category manager first, and no builders are assigned until the safety reviewer has passed 5 briefs.
- **Personalization roles exist before their purpose.** Accepted at the founder's request; they write questions, not code.
