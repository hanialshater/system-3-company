# Fact-check: copy-overlaps-itself (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Demo.tsx read against each claim; numbers re-derived in own node scripts. Network to primary sources blocked this pass; source claims corroborated by search snippets as noted.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Own node run of decode(): abababab. |
| c2 | verified | Own run: source indexes 0,1,2,3,4,5; 0-1 original, 2-5 written by steps 1-4; matches readsNew (source >= 2 from frame 3). |
| c3 | verified | Behaviour confirmed by own run and by zlib inffast.c byte-by-byte copy from out - dist (search snippet). Source fix (builder): the overlap rule with its X,Y,X,Y,X example is RFC 1951 section 3.2.3, not 3.2.5 (3.2.5 gives the length 3-258 / distance 1-32768 codes). From memory; RFC not opened. |
| c4 | verified | PNG spec 1.2 compression method 0 = deflate in zlib; RFC 1951 = LZ77 + Huffman; RFC 1952 gzip uses deflate (search snippets of libpng.org/W3C spec and RFC text). |

## Pass 20

Checker: fact-checker (did not write these claims). Source-only audit: the builder edited the source field, not the claim text; checked the new source against Demo.tsx/model.ts and the cited reference.

| Claim | Result | Basis |
|---|---|---|
| c3 | verified | Pass 20 source audit: opened RFC 1951 (zlib copy, raw.githubusercontent.com/madler/zlib/master/doc/rfc1951.txt). The overlap note and the <length = 5, distance = 2> -> X,Y,X,Y,X example are in 3.2.3 'Details of block format'; 3.2.5 gives length 3..258 and distance 1..32,768. Source correct. Ziv-Lempel 1977 IEEE Trans. Inf. Theory 23(3) not re-opened. |

Source for c3: RFC 1951 text from https://raw.githubusercontent.com/madler/zlib/master/doc/rfc1951.txt (lines 490-572 for 3.2.3, 589-598 for 3.2.5).
