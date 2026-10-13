# Fact-check: silent-letter-swaps (2026-10-13)

## Pass 8 (2026-10-13)

Checker: fact-checker. Method: re-derived numbers in node from the lesson's model/Demo code; checked sources on the web; compared claims with the stage text.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Standard genetic code (NCBI table 1 string used in Demo.tsx is the canonical one): 64 codons, 61 for amino acids, degenerate. Nirenberg & Matthaei 1961 (PNAS) deciphered the first codon (UUU = Phe), not the whole table; the full code was completed by about 1966, so the citation supports 'codons name amino acids' but not the full table. Alberts MBoC ch. 6 covers the code. |
| c2 | verified | node, independent enumeration from the standard table: 61 codons x 9 = 549 changes; same 134 (24.4%), new 392, stop 23. |
| c3 | verified | node: by position same-amino-acid = 8, 0, 126 of 183 each. |
| c4 | verified | node: CTT -> CTC/CTA/CTG all Leu; TAT -> TAC Tyr, TAA and TAG stop; GGA -> GGT/GGC/GGG Gly, and TGA (first-letter change) is a stop. |
