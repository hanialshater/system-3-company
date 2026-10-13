# Fact-check: two-names-one-list (2026-10-13)

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Python: a=[1,2]; b=a; b.append(3) gives a == [1,2,3] (assignment binds a name, Python Language Reference 7.2). Stage question matches. |
| c2 | verified | Python Language Reference s.7.2 (assignment binds names to objects; no copy). Reveal says 'copies the name, not the list', same meaning. |
| c3 | verified | Python: b = a.copy(); b.append(3) leaves a == [1,2]. Demo.tsx gives b its own list after copy and the 'held' readout shows the other list unchanged. |
| c4 | verified | Python docs: list.copy() / copy module give a new list (shallow, sufficient for a list of ints). |
| c5 | verified | Demo.tsx: arrow end y (aY, bY) and the second Box are drawn from 'aliased' = bPoints === 0, the same state as the readouts. |
