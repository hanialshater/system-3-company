# International team: language and region

owner: localization-lead (Yuki) · localizers (a pool, one per lesson × locale) · cultural reviewers (Amira and a pool, one per region) · reports to: head-of-product

**Localization, not translation.** A locale variant keeps the lesson's insight and interaction, and adapts everything else:
- **Language:** natural phrasing at a beginner's reading level, with a glossary per language.
- **Units:** metric or imperial. Numbers in the question and the stage are recomputed, not just relabelled.
- **Money:** currency, typical prices and wages, tax norms, all labelled as illustrative.
- **Examples and names:** foods, sports, places and holidays that a local learner knows.
- **Culture:** gestures, colours, humour, family and gender norms, religious calendars. Reviewed by someone from the region.
- **Facts that change by region:** electrical voltage, driving side, school systems, laws, seasons in the southern hemisphere, date formats. These claims are re-checked for each locale.

## Process (draft, pending EDD-003 stage 1: variants as data)
1. The localization lead picks locales and keeps a claim checklist per locale.
2. A localizer produces the variant and lists its region-dependent claims.
3. A fact-checker re-checks those claims for the locale.
4. A cultural reviewer from the region reviews the walkthrough (verdict: native / revise / block).
5. Launch review per locale.

## Open questions
- Which locales first? (founder + head of product)
- Do translated claims need re-verification even when the fact is universal? (EDD-003 open question 2; the proposal is no for universal facts, yes for region-dependent ones)
- Right-to-left scripts and font coverage in the kit (platform engineer, principal engineer)
