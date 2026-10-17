### 2026-10-16 · pr6-second-integration · community-engineer
- did: PR #6: merged pr6/pe, pr6/platform, pr6/build and base af8e4021; renumbered 18 ids +45 (W-1562..W-1579); read the W-1578 catalog diff; not pushed
- learned: When base allocates ids past yours, renumber in a separate commit before the merge; at the old base no id above its max existed, so every such id in our tree was ours (company/engineering/community/prs/6.md)
- know: Other runs' memory entries keep the old PR #6 ids; read them through the prs/6.md §9.2 table (company/engineering/community/prs/6.md)
- open: PR #6 push waits on W-1570 (#18), M5 full verify, M7 W-1576 (company/engineering/community/prs/6.md)
