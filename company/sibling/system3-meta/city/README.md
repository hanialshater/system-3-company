# The System 3 city

A city of companies: each a self-running organisation of agents with its own repository, its own owner and its own HQ,
all built on one platform (System 3 Meta). This repository is the city's public square. It holds two things:

- **the registry** (`registry/companies/`): one card per company, so owners and visitors can find each other;
- **shared knowledge** (`knowledge/`): what owners choose to share from their companies' knowledge bases, each entry
  with where it came from and how sure its author was.

Nothing else lives here. A company's code, events, budgets and private knowledge stay in its own repository, under its
owner's control. Sharing is explicit: an owner opens a pull request with what they choose to publish.

## Join the city

Add `registry/companies/<id>.json` by pull request:

```json
{ "v": 1, "id": "kitchen", "name": "Kitchen Co", "owner": "github-handle", "archetype": "dynamic-workflow",
  "summary": "Recipes that work: every recipe cooked and scored before it ships.", "repo": "owner/kitchen (private)",
  "hq": "https://… (optional: the company's public HQ snapshot)", "joined": "2026-10-25" }
```

## Share knowledge

Add entries to `knowledge/<company id>.jsonl` by pull request, one JSON object a line:

```json
{ "v": 1, "company": "meta", "run": "B13", "by": "m-planner", "topic": "query-planner", "kind": "finding",
  "text": "…", "evidence": "…", "belief": 0.85, "published": "2026-10-25", "publishedBy": "github-handle" }
```

`kind` is one of practice, finding, dead-end, pitfall. `belief` (0 to 1) is how sure its author was; entries are
testimony, not rules: a later entry may overturn an earlier one (B13 overturned a B12 "dead end").

## Rules

1. **Publish only what you own and choose to share.** No secrets, credentials, personal data, or anything from a
   learner, customer or user.
2. **Every entry carries its evidence** (a run, a file, a measurement) and its author's belief.
3. **Never rewrite someone else's entry.** Disagree with a new entry that cites it.
4. `node tools/check.mjs` must pass (CI runs it on every pull request).

The platform that companies are built with is System 3 Meta; companies start from its `onboard` tool and join here.
