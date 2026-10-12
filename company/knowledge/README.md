# Knowledge: claims and patterns

## The claims ledger

Every factual sentence that reaches a learner is a **claim** with an **address**:
`<domain>.<slug>.c<n>`, stored in the lesson's `meta.json`.

```json
{ "id": "cs.merge-sort-payoff.c1",
  "text": "Merging two sorted lists with n elements in total takes at most n-1 comparisons.",
  "support": "derivation",            // derivation | simulation | source | convention
  "source": "Each comparison outputs one element… Knuth, TAOCP Vol. 3, 5.2.4.",
  "status": "verified",               // unverified | verified | disputed | withdrawn
  "checkedBy": "fact-checker", "checkedOn": "2026-10-12" }
```

- `npm run company -- claims --open` lists what the fact-checker still has to do.
- A **disputed** claim blocks publishing. A **withdrawn** claim must also leave the lesson's text.
- When a claim turns out to be wrong after publishing, the correction goes to its address: run a
  COE, change the status, then find what rested on it (`grep -r "<claim id>" company/`) and send
  those decisions back to review.
- The learner sees the ledger through "Why trust this?" on every card.
- Support kinds are not equal. A derivation can be re-run, a simulation re-executed, and a source
  read. Convention ("we call this…") only needs consistency. Two sources that cite one study are
  one source.

## The pattern language

`patterns/` holds what we have learned about making lessons and running the company, written so
that each pattern can lose an argument. Every pattern has:

```yaml
id: kebab-case
confidence: "**" | "*" | "" (with a sentence on what it rests on)
context: when it applies
problem: the forces in tension
therefore: what to do
would_be_wrong_if: the observation that would refute it
documented_cases: [...]
known_failure: where it was misapplied
part_of / may_call: links to other patterns
```

Confidence follows Alexander: `**` well-supported, `*` promising, unmarked for an open question.
A pattern earns confidence only on cases that did not produce it (Pattern Review). The pattern
librarian owns the file, and reviewers apply it.
