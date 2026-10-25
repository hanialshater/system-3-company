# The repositories: names, visibility, and System 3 Company stays where it is

owner: vp-meta · date: 2026-10-25 · status: **decided** (founder)

**Ask:** "Propose names for new repos"; "different companies will be owned by different people, and probably have
their own repos, still meta repo is where they start and data should be in another repo or in meta to be sharable".

**Decision (founder, 2026-10-25: "Go with your names, keep system-3-company, city public"):**

| Repository | What | Visibility |
|---|---|---|
| `hanialshater/system3-meta` | the platform (kernel, crew, onboarding, starter HQ, contracts, benchmarks) and Meta's own records | private (public at launch) |
| `hanialshater/system3-city` | the registry of companies and the knowledge their owners choose to share | **public** |
| `hanialshater/system-3-company` | System 3 Company, as it is (history, Vercel project, domain, database variables); Meta moves out of it | private |

**Where data lives:** Meta is where companies start, not where they live. Each company's data stays in its own
repository, under its owner. Only what an owner chooses goes to the city, by pull request (`city-publish.mjs`, checked
by the city's own `tools/check.mjs`: no secrets, no personal data, evidence and belief on every entry). Companies depend
on a versioned release of Meta, not a copy.

**Reasons:** different owners need different access; a private dataset cannot be un-shared once in a repo others read;
Meta's history should not carry other people's work; sharing stays explicit, reviewable and attributed.

**Objections:** none raised. Open: the licence for shared knowledge in the public city (the founder's call).

**Status:** creating the repositories from this session was refused (GitHub 403: the integration may not create
repositories). The founder creates the two empty repositories and gives the Claude GitHub App access; then the city
template (`city/`) and Meta's export (`export-kernel.mjs`) are pushed.
