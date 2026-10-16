// W-947: strings from meta.json working records (fact-check notes, curriculum reference notes, owner, evidence
// paths, the learner brief's field names) that must never reach the browser through publicMeta: the RSC payload
// of /d/<slug> and the /api/meta/<slug> body. Used by trust.test.mjs (every meta.json, no build) and
// built-output.test.mjs (the built pages and API bodies).
// Not here: content/domains.json's categoryManager role ids, which reach every page through the `domain` prop
// (org data, not meta.json; reported separately).
// W-946: built-output.test.mjs also scans static/chunks (every client chunk) for these, since the registry split.
export const INTERNAL_STRINGS = [
  "Fact-checker to confirm", "FACT-CHECK", "FC pass", "checkedBy", "checkedOn", '"builder"',
  "company/reviews/", '"misconception"', '"objective"', '"curriculum"', '"references"', '"keyState"', '"owner"',
  '"learner"', '"concept"', '"interactions"', '"pairwise"',
];

// W-946: the four field names that Life Hacks lesson code also uses as identifiers (its spec objects and a label).
// built-output.test.mjs ratchets them in static/chunks instead of failing on any hit. That is only safe while
// every meta.json also carries an unquoted, zero-tolerance string (registry-split.test.mjs asserts it: review C2).
export const LESSON_CODE_FIELDS = ['"owner"', '"concept"', '"objective"', '"misconception"'];
