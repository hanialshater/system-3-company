# Fact-check: word-in-pieces (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Demo.tsx read against each claim; numbers re-derived in own node scripts. Network to primary sources blocked this pass; source claims corroborated by search snippets as noted.

| Claim | Result | Basis |
|---|---|---|
| c4 | verified | Sennrich et al. abstract (arXiv 1508.07909, search snippet): rare words encoded as sequences of subword units; SentencePiece maps text to ids (abstract corroborated; id-mapping detail from memory of the library API). Stage says "a tokenizer like this", consistent. |
| c6 | verified | PIECE_ID {un:412, happi:7031, ness:1297}, letters charCode-96 = 1..26; stage tag "Toy tokenizer · made-up piece numbers" and the predict question define token as in the claim. |

## Pass 22

Checker: fact-checker (did not write these claims). Scope: the claims left unverified after the wave D wording reopen. Method: read Demo.tsx (and model.ts where used) against each sentence, then re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc22-5); sources opened where reachable, otherwise marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Opened the SentencePiece README (raw.githubusercontent.com/google/sentencepiece): a tokenizer 'for neural network-based text generation systems ... where the vocabulary size is fixed', which encodes raw text to vocabulary IDs (integers) and decodes IDs back; the model file holds the vocabulary mapping. Kudo & Richardson 2018 (EMNLP demos, D18-2012) and Sennrich et al. 2016 (ACL, P16-1162, pp. 1715-1725) not opened (arXiv/ACL Anthology unreachable); bibliographic details and the paper's 'NMT inputs and outputs are id sequences' corroborated by web search only. Suggest the builder add the README as a reachable source. |
| c7 | verified | Own node port of tokenize(): unhappiness length 11; all pieces 3 (un/happi/ness), none 11; zyxxy 5 under all 8 piece subsets. Record line in Demo.tsx adds 'no pieces: 11' and 'zyxxy, 5 letters: 5' only once seen; in phase reveal shownWord/shownTokens return to unhappiness with all pieces (un / happi / ness). |

**Result:** every claim in this pass verified.
