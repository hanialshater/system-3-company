# Fact-check: turns-beat-first-come-first (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each open claim; re-ran the numbers in node with own re-implementations of the lesson's model (mulberry32 copied from src/kit/random.ts); web sources by search only (the proxy blocked every primary host tried: dl.acm.org, wikipedia, os-book.com, nasa.gov, university hosts). Search-result text is marked as such below.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node: FCFS finishes 10, 11, 12; waits 0, 10, 11; average 7. Stage and reveal compute it from FCFS. |
| c2 | verified | Own node of Demo.tsx roundRobin(1): ABCAAAAAAAAA; finishes A 12, B 2, C 3; waits 2, 1, 2; 5/3 shown as 1.67; A 12 - 10 = 2 later. |
| c3 | verified | Own node: q=2 AABCAAAAAAAA waits 2, 2, 3 = 2.33; q=5 AAAAABCAAAAA waits 2, 5, 6 = 4.33; q=10 and 100 give 7. |
| c4 | verified | Lesson's own definition (stage rule 'Wait = finish - work', question text). Equals waiting time = turnaround - burst with arrival 0. Silberschatz not opened (os-book.com blocked); the definition does not depend on it. |
| c5 | verified | roundRobin() uses only queue order and q, never WORK lengths for ordering; B's pin at time 2 while the FCFS lane runs A. |
| c6 | verified | Medium confidence. Silberschatz, Galvin & Gagne not opened (os-book.com and university hosts blocked by proxy). Search-result text from several Silberschatz-based course slides (UCalgary CPSC457 ch5, UCI ch05, Colorado State CS370) states RR quantum must be large relative to context-switch time or overhead is too high. Builder should pin edition and section (CPU Scheduling, Round-Robin). |
