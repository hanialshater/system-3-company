# Fact-check: three-students-two-rooms (2026-10-14)

## Pass 22

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-ran each number in my own node scripts (copies of the lesson's logic plus independent re-implementations) or checked the source. Sources marked "not opened" were checked against my own knowledge only; Easley & Kleinberg chapter titles were confirmed through web-search results (library-catalogue tables of contents), as the book's host and mirrors are blocked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node enumeration of 24 permutations: 0 house all four, best 3. |
| c2 | verified | Union {1,2,3}; own node subset scan finds exactly one constricted set, all four students. |
| c3 | verified | Hall's theorem (perfect matching on the students' side exists iff no constricted set) is standard mathematics; P. Hall 1935, J. London Math. Soc. 10, and Konig 1931 correct to my knowledge (not opened). E&K ch. 10 'Matching markets' confirmed via library-catalogue TOC; the term 'constricted set' and its Matching Theorem in ch. 10 are from my own knowledge, high confidence, not opened. |
| c4 | verified | Own node: with D accepting 1,3,4, 2 of 24 work (A,B,C = 1,3,2 or 2,1,3; D 4); adding room 4 to any one student also gives 2. |

**Result:** 4 verified, 0 disputed, 0 withdrawn.
