# Build note: groups-where-everyone-reaches-everyone

Builder: demo-builder. Status: draft. Kept from evaluators until they report. No v1 build note was on disk; this file starts at v2. Not built, typechecked or QA'd locally (batch instruction: no next build, qa or tsc).

## Pre-flight v2

Changes for r6 (dfs-knower, revise): each group gets its own colour (v1 used the domain green, which read the same as --good-fill, so {7} and {1, 2, 3} looked like one group; finding 1). "Pass 2: all groups" sits after "Pass 2: next group", so one press each reaches the end (finding 4). New "Shrink groups" redraws the roads as given and draws each group as a tinted blob with only the two roads between groups thickened (findings 2 and 3). The reveal now says "in the roads as given". The run is recorded, so after Start over the log reads "Last run: …". Gate: pass-1, reversed, all-groups, shrunk (4).

1. **Title and hook.** "Groups where everyone reaches everyone" / "Seven towns, one-way roads, one map. How many groups can all reach each other?" No count is named. "One map" points toward 1 if anything, which is not an option.
2. **Options.** "2", "3", "7": bare numbers, same precision.
3. **Locked stage.** Seven towns, eight arrows, note "One-way roads. Arrows show the direction.", log "Pass 2: no groups yet", readouts Groups 0 / Roads as given. No colour or label matches 3.
4. **Reveal values.** "3 groups: {7}, {1, 2, 3}, {4, 5, 6}": (b) milestone all-groups, still on the log row (live, or "Last run" after Start over). "4 to 3, 6 to 7 already coloured": (b) all-groups; the note said "3, 7 already coloured" on the last group, and the log keeps the groups. "3 to 4 and 7 to 6", "{7} → {4, 5, 6} ← {1, 2, 3}": (b) milestone shrunk; BETWEEN is computed from ROADS; the blobs stay drawn until Start over, and then the log reads "… · shrunk: {7} → {4, 5, 6} ← {1, 2, 3}".
5. **QA path.** Pass 1, Reverse roads, Pass 2: next group ({7}), Pass 2: all groups (all-groups), Shrink groups (shrunk), Start over. All four milestones in five presses, no animation. Quoted states are on the stage until Start over, then on the "Last run" log row.
6. **Reset.** Reveal after Start over (traced from code, not run): "Pass 2 coloured 3 groups: {7}, {1, 2, 3}, {4, 5, 6}. In the roads as given, 3 reaches 4 but nothing leads from 4 back to 3, so the two loops are different groups. Town 7 reaches the right loop, and no road leads into 7, so it is a group on its own. / In pass 2, every reversed road leaving a new group led into a town already coloured (4 to 3, 6 to 7), so each flood stayed inside its own group. Shrunk to blobs, the groups are joined only by 3 to 4 and 7 to 6: {7} → {4, 5, 6} ← {1, 2, 3}, no loops. That is why the groups can be put in order." Matches: the map is back to uncoloured, and the log row reads "Last run: From 7: {7} · From 1: {1, 2, 3} · From 4: {4, 5, 6} · shrunk: {7} → {4, 5, 6} ← {1, 2, 3}".

Open: durationSec is still 75 (r6 minor 6, a product-owner call). Six controls in one Row may wrap to two lines on a phone; check it in the walkthrough.
