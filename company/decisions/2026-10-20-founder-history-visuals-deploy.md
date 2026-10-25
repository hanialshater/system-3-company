# Restore history figures and deploy

owner: release-manager
date: 2026-10-20
status: decided
class: deploy
route: cm-history → design-lead → platform-engineer → release-manager
recorded by: chief-of-staff

## What the founder said

> System3 company, many history lessons don't have a figur or map, fix it then deploy

Source: this conversation, 2026-10-20. This authorizes fixing the missing history visuals and deploying that fix to the existing production app.

## Scope and implementation

Audit: 117 history lessons; 100 city-pair lessons, 82 without an SVG figure; the other 17 already contain data charts. Add a geographic locator to all 100 city-pair lessons. Reuse the existing dependencies and preserve the historical evidence, controls and publication states. Map claim sources remain unverified; no implementer awards a fact-check verdict.

The map depicts approximate modern reference points and simplified modern coastlines, with no historical borders, territorial extents or routes. Coordinates come from Natural Earth, with addressed UNESCO/Wikidata references for four archaeological sites. Source pins and feature IDs are in content/history-locators.json. Maps are committed local SVG assets, with accessible descriptions, north arrows and world context insets.

Existing target: system-3-company, prj_US7nNpj24KIFV5aIe27i2lqvD1Zq, account team_Ss0FbvX3HyCJMqitsy31SLPj. Follow the current Git deployment marker path used for r16/r17; no deployment configuration, account flag or secret changes.

## Objections

- Existing repository-wide checks are red: 792 errors on the initial base; after integrating r17, 811 on both the clean base and the changed tree, zero added. The attempted npm run verify stops on two existing publication-readiness tests. **Answer:** preserve those gates; record the limits and use the existing narrowly scoped release practice, with a production build and focused history verification. Do not assert full-suite success or change unrelated lesson publication.
- A modern political map could falsely imply historical sovereignty. **Answer:** use coastlines and city points only, label the guide as modern geographic context, and retain the source records as the historical evidence.
- Latest remote release r17 arrived during implementation. **Answer:** rebase onto ba09dd00d; none of that release's files conflict with this history fix.

## Board

- W-2021: restore history maps, verify and deploy.
