import * as K from '/home/user/system-3-company/.claude/worktrees/agent-a77f3f66da74f6b40/src/kit/knots/index.mjs';
const out={};
for (const n of ['6_1','5_2']) { const pd=K.knot(n).pd; const L=K.layout(pd); out[n]=[]; for (let i=-1;i<pd.length;i++){ const q=i<0?pd:K.crossingChange(pd,i); const d=K.draw(q,{layout:L,gap:0}); out[n].push({i,edges:d.edges.map(e=>e.d),cr:d.crossings,vb:d.viewBox}); } }
import('fs').then(fs=>fs.writeFileSync('/tmp/claude-0/-home-user/b262453e-81f5-572c-a052-31323bc34d63/scratchpad/fc-knot/draw.json', JSON.stringify(out)));
