# Fact-check (lane A, publish-blocking claims): hailstone-27-climbs

fact-checker · 2026-10-16 · worktree base cdee168c. Checker: a fresh fact-checker instance; I did not write, build or record any claim checked here. Brief: chief of staff's lane A (claims that are the only gate keeping a review lesson from publishing). Builder notes and build.md not read.

Method: Read Demo.tsx for the rendered sentence. Sources opened first-hand through api.crossref.org/works (publisher-deposited abstracts); arxiv.org, Springer and AMS hosts are refused by the proxy here.

| claim | status | reason / fix |
|---|---|---|
| c4 | verified | VERIFIED. Rendered text (Demo.tsx lines 109-110): 'Every start checked so far reaches 1'. Opened first-hand: the publisher-deposited abstract of Barina 2025, 'Improved verification limit for the convergence of the Collatz conjecture', J Supercomput 81, article 810, doi 10.1007/s11227-025-07337-0 (via api.crossref.org/works): 'we introduce a new result that pushes the limit for which the conjecture is verified up to 2^71'. That supports the sentence, which states no bound. Builder, non-blocking: the source field still cites Barina 2021 with a 2^68 bound that no pass has confirmed; replace it with the 2025 citation and 2^71. |
| c5 | verified | VERIFIED. Rendered: 'but nobody has proved all do: the Collatz conjecture is open.' Opened first-hand via api.crossref.org abstracts: Tao 2022, Forum of Mathematics, Pi 10, doi 10.1017/fmp.2022.8: 'The infamous Collatz conjecture asserts that Col_min(N)=1 for all N', with the paper's own result only for 'almost all N (in the sense of logarithmic density)'; Barina 2025 (doi 10.1007/s11227-025-07337-0, May 2025) 'aims to verify the Collatz conjecture computationally' and extends the verified range only to 2^71. Neither would read so if a proof existed; a July 2026 abstract in the same Crossref search (doi 10.33774/coe-2026-5k4jv) still calls it 'the open problem'. Lagarias 2010 (the cited source) not opened. Re-check if a proof is announced. |

The same text is in each claim's note in src/demos/*/hailstone-27-climbs/meta.json.
