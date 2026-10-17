import * as K from '/home/user/system-3-company/.claude/worktrees/agent-a77f3f66da74f6b40/src/kit/knots/index.mjs';
import { KNOTS } from '/home/user/system-3-company/.claude/worktrees/agent-a77f3f66da74f6b40/src/kit/knots/table.mjs';
console.log('table', Object.keys(KNOTS).join(' '));
const out={};
for (const n of ['6_1','5_2','4_1','3_1','0_1']) { const pd=K.knot(n).pd; const s=K.simplify(pd); out[n]={pd, c:K.crossingCount(pd), alt:K.isAlternating(pd), nug:K.nugatory(pd), simp:s.status, simpc:s.crossings, id:K.identify(pd), entryc:KNOTS[n].c}; console.log(n, JSON.stringify(out[n])); }
for (const n of ['6_1','5_2']) { const pd=K.knot(n).pd; out[n].sw=[]; for (let i=0;i<pd.length;i++){ const q=K.crossingChange(pd,i); const s=K.simplify(q); const L=K.layout(pd); const d=K.draw(q,{layout:L,gap:0.5}); const r={i,pd:q,c:K.crossingCount(q),id:K.identify(q),simp:s.status,simpc:s.crossings,drawnX:d.crossings.length,edges:d.edges.length}; out[n].sw.push(r); console.log(n,'sw',i,JSON.stringify({c:r.c,id:r.id,simp:r.simp,simpc:r.simpc,drawnX:r.drawnX,edges:r.edges})); } }
import('fs').then(fs=>fs.writeFileSync(process.argv[2], JSON.stringify(out)));
