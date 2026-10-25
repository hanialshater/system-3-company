# Illustrated symbols on history story maps

owner: design-lead
date: 2026-10-21
status: decided
class: format
route: design-lead → implementation and browser QA → release-manager
recorded by: chief-of-staff

## What the founder said

> "It is beautiful but it can be better if we have ship, horse, camp, fire sords, cascel svgs"

This continues the deployed history-map work and its original fix/deploy request. Implement the requested visual improvement on that site: ships, horses, camps, fire, crossed swords and castles. Add a landing-craft variant for Normandy. The implementation and release cover this concrete SVG refinement; they do not promote historical claims or waive editorial gates.

## Scope

Seven original SVG assets share one source of vector paths, used by both the map renderer and standalone SVG files. Checkpoint-specific choices add illustrations to 18 suitable stories and their atlas previews. Geographic points stay in their original positions. A placement calculation keeps illustrations away from active labels and markers. Camps use a map-corner vignette rather than a claimed camp location. Symbols are hidden until a prediction is committed; unillustrated stories keep their ordinary map. No sourced chronology or historical route geometry changes.

## Review and limits

This is an implementation/design refinement, not an independent cultural or factual verdict. Changed lessons remain drafts; their version is bumped and the new artwork convention is unverified. The drawings are illustrative symbols, not claims about exact ships, equipment, counts, fortifications or archaeological sites. Existing research/cultural/fact/learner follow-up W-2024 remains open.

## Objections

- **Implementation assessment:** a generic sailing ship would be misleading in Normandy. **Answer:** use a separate landing-craft symbol.
- **Implementation assessment:** tents on reference dots could invent campsite locations. **Answer:** camps sit in a separate illustrative vignette, and the legend identifies illustrations.
- **Implementation assessment:** artwork could hide small map labels. **Answer:** retain the geographic markers and test bounded, non-overlapping illustration placement on phone and desktop.

## Board

W-2025 — original SVG map illustrations and phone verification.
