# Fact-check: back-button-stack (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c1 | Verified. Re-ran the stack (visit truncates above index, then pushes): A,B,C,D -> Back,Back (on B) -> visit E gives A,B,E -> Back lands on B. Also matches the transcript reveal. |
| c2 | Verified against the WHATWG HTML spec: navigating removes the forward session-history entries before appending the new one; entries after the current one remain reachable by Forward until then. |
| c3 | Verified: CLRS 10.1 defines stack = LIFO, queue = FIFO. |
| c4 | Verified (convention): stage shows one pile with forward entries tagged 'forward', and no Forward button (transcript). |

Stage-text note: the explore step 'Visited E. D thrown away.' after a single Back is correct for that state. No unrecorded claims found.
