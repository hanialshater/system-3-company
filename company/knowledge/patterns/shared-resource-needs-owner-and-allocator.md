```yaml
id: shared-resource-needs-owner-and-allocator
confidence: ""     # new 2026-10-14, unstarred. Three cases, but all from one day, one chair's reading, and the COE authors partly wrote the pattern into their own records. No case yet that the pattern did not produce.
context: A resource shared by concurrent agents or pushes with a hard ceiling: GitHub runners (about 20 concurrent jobs), Vercel deploys (100 a day), the 4-CPU host and its disk.
problem: Each user acts as if alone and the resource looks free to the one who spends it. Nothing counts demand, nothing refuses it, nobody owns the ceiling. The first signal is the resource failing. Clean-up then arrives by hand, in a crisis.
therefore:
  - Name an owner for the resource and put its ceiling in a file (host: W-533; CI budget: no owner yet; deploy quota: none).
  - Put a meter on the operating picture (queue depth, oldest-queued age, free GB, deploys today) before adding a cleanup.
  - Put the allocator between the decision to spend and the resource, with an exit code: dispatch-check for the host, a push gate for CI, an approval or trigger off for deploys.
  - Derive the ceiling from the resource's own constraint, not from a budget that is easier to read (see cap-from-the-wrong-constraint).
  - Order of work: owner, meter, allocator, then cleanup. A cleanup first (AMD-002, rm -rf of 11 GB) was needed but did not prevent recurrence.
would_be_wrong_if: A day at or under the caps, with the meters green and the allocator run before every dispatch and push, still exhausts a shared resource; or a resource that has no owner and no allocator is observed to stay healthy under the same load.
documented_cases:
  - "GitHub runners, 2026-10-14: about 300 ci runs queued, oldest 9 h, no allocator and no meter on pushes (company/rituals/records/2026-10-14-coe-ci-queue.md, whys 2 and 5)."
  - "Vercel deploy quota, 2026-10-14: about 30 WIP pushes spent 100 deploys; no counter in any tool (company/rituals/records/2026-10-14-coe-deploy-bypass-and-quota.md, path B)."
  - "Host CPU and disk, 2026-10-14: 18 builders on 4 CPUs, load 25 to 60, disk at 100%; dispatch-check arrived 18:25, three hours after the SEV2 (company/rituals/records/2026-10-14-coe-host-exhaustion.md, whys 3 to 5)."
  - "Names and folders (board IDs, scratch dirs): see allocate-shared-names, which this pattern generalises from names to capacity."
  - "Cited by the host COE as the second case for the 2026-10-13 COE candidate 'capacity is a budget' (token limit). Not read by the librarian today; do not count it until read."
known_failure:
  - "Path A of the deploy COE (the Vercel Git integration as a second production entry point) is not explained by a missing allocator. It is a missing single path. The author says so; the pattern does not cover it (see a-control-outside-the-pipeline-is-advisory below, one case)."
  - "Common-cause reading is the CEO office audit's. Concurrency is the trigger in the CI and host COEs and in path B; in path A the trigger is a configuration nobody could see. So 'concurrency with nothing controlling shared resources' covers two and a half of three, not three."
  - "No allocator has yet run for a day. The falsifier has not been tested; W-481 (2026-10-16) is the first test for CI, not for the host."
part_of: operating-loop
```
