# PR #11 release history resolution

Canonical r1..r11 entries are identical to base. Canonical r11 retains commit 9911156584a25774b502a9a7fe0cbd42aa1958f6 and its Oct 19 deployment timestamp. The existing helper requires gapless rN and chronological deployment dates; appending the Oct 18 events as r12/r13 would violate that rule or fabricate timestamps.

The two full Oct 18 records are retained in releases.json historical_deployments with immutable commit-based IDs deployment-bcd102d7 and deployment-2902594b. Original PR-only r11/r12 aliases, actual timestamps, source acceptance, summary, features, and unapproved-deployment findings remain explicit. These historical objects do not reserve numbered releases: next canonical release is r12. HQ currently reads only releases; no new UI display is claimed. The three PR-specific new records identify the history section and scope their live-state testimony to Oct 18; board references map W1961..1964 to W1977..1980.

Tests start from base, preserving canonical expectations and adding one narrow history invariant. Only the release-specific sanity described in the report was run; no broad validation, deployment, or production query.
