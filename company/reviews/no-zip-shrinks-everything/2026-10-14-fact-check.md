# Fact-check: no-zip-shrinks-everything (2026-10-14)

## Pass 10 (2026-10-14)

Checker: fact-checker (did not write these claims; any claim marked 'recorded by the fact-checker' is a quote of the builder's stage text). Method: no walkthrough transcript exists for this lesson yet, so I read Demo.tsx as rendered text (every learner-visible string, including dynamic ones) before the claim sources, then re-derived every number in my own node scripts (own copies of mulberry32 and of each algorithm; scratchpad fc10/a.mjs, b.mjs, c.mjs, d.mjs) and checked citations. Egress to most publisher pages is blocked, so book passages I could not open are said so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 2^3 = 8; stage FILES lists 000..111. |
| c2 | verified | 2^0 + 2^1 + 2^2 = 7; stage SLOTS lists empty, 0, 1, 00, 01, 10, 11. |
| c3 | verified | Derivation: decompression is a function of the compressed string, so two files sharing one output cannot both be recovered; the compressor must be one-to-one. Same counting argument in Sedgewick/Wayne, Princeton COS 226 'Data Compression' lecture ('Impossible to losslessly compress all files'). MacKay ch. 4 passage not opened (no access); the derivation stands on its own. |
| c4 | verified | Geometric series sum_{k<n} 2^k = 2^n - 1; own node check n = 1..20. |
| c5 | verified | Derivation in the source checked: if no file of length <= n grows, the map is an injection of a finite set into itself, hence a bijection, so total length is preserved and no file can shrink either. |
| c6 | verified | Zip uses DEFLATE (RFC 1951) = LZ77 back-references to repeated strings + Huffman coding of frequent symbols; Ziv and Lempel, IEEE Trans. Inf. Theory IT-23(3) (1977). 'Repeat themselves' is a fair plain-language summary of both parts. |

**Result:** all claims in this pass verified.
