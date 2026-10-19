import * as K from '/home/user/system-3-company/.claude/worktrees/agent-a77f3f66da74f6b40/src/kit/knots/index.mjs';
import { KNOTS } from '/home/user/system-3-company/.claude/worktrees/agent-a77f3f66da74f6b40/src/kit/knots/table.mjs';
for (const [n,k] of Object.entries(KNOTS)) console.log(n, 'c', k.c, 'pd', K.crossingCount(k.pd), 'alt', K.isAlternating(k.pd), 'nug', K.nugatory(k.pd).length);
