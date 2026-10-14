# Fact-check: word-in-pieces (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Demo.tsx read against each claim; numbers re-derived in own node scripts. Network to primary sources blocked this pass; source claims corroborated by search snippets as noted.

| Claim | Result | Basis |
|---|---|---|
| c4 | verified | Sennrich et al. abstract (arXiv 1508.07909, search snippet): rare words encoded as sequences of subword units; SentencePiece maps text to ids (abstract corroborated; id-mapping detail from memory of the library API). Stage says "a tokenizer like this", consistent. |
| c6 | verified | PIECE_ID {un:412, happi:7031, ness:1297}, letters charCode-96 = 1..26; stage tag "Toy tokenizer · made-up piece numbers" and the predict question define token as in the claim. |
