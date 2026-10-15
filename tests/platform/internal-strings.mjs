// W-947: strings from meta.json working records (fact-check notes, curriculum reference notes, owner, evidence
// paths, the learner brief's field names) that must never reach the browser through publicMeta: the RSC payload
// of /d/<slug> and the /api/meta/<slug> body. Used by trust.test.mjs (every meta.json, no build) and
// built-output.test.mjs (the built pages and API bodies).
// Not here: content/domains.json's categoryManager role ids, which reach every page through the `domain` prop
// (org data, not meta.json; reported separately).
// Out of scope here: the client JS chunk that bundles every meta.json (W-946, separate amendment). It still leaks.
export const INTERNAL_STRINGS = [
  "Fact-checker to confirm", "FACT-CHECK", "FC pass", "checkedBy", "checkedOn", '"builder"',
  "company/reviews/", '"misconception"', '"objective"', '"curriculum"', '"references"', '"keyState"', '"owner"',
  '"learner"', '"concept"', '"interactions"', '"pairwise"',
];
