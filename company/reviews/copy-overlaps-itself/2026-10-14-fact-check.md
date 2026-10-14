# Fact-check: copy-overlaps-itself (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Demo.tsx read against each claim; numbers re-derived in own node scripts. Network to primary sources blocked this pass; source claims corroborated by search snippets as noted.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Own node run of decode(): abababab. |
| c2 | verified | Own run: source indexes 0,1,2,3,4,5; 0-1 original, 2-5 written by steps 1-4; matches readsNew (source >= 2 from frame 3). |
| c3 | verified | Behaviour confirmed by own run and by zlib inffast.c byte-by-byte copy from out - dist (search snippet). Source fix (builder): the overlap rule with its X,Y,X,Y,X example is RFC 1951 section 3.2.3, not 3.2.5 (3.2.5 gives the length 3-258 / distance 1-32768 codes). From memory; RFC not opened. |
| c4 | verified | PNG spec 1.2 compression method 0 = deflate in zlib; RFC 1951 = LZ77 + Huffman; RFC 1952 gzip uses deflate (search snippets of libpng.org/W3C spec and RFC text). |
