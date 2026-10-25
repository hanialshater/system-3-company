// Cube flattened (top face removed): outer square 0-3 (bottom's... ) inner square 4-7.
// Planar embedding: outer cycle 0-1-2-3, inner cycle 4-5-6-7, spokes i-(i+4).
// Bounded faces counted via Euler on connected planar graph: F_bounded = E - V + 1 (components=1). We verify by explicit face tracking instead.
let V=new Set([0,1,2,3,4,5,6,7]);
let E=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
// bounded faces as edge sets
let faces=[ [[4,5],[5,6],[6,7],[7,4]] ];
for(let i=0;i<4;i++){const j=(i+1)%4;faces.push([[i,j],[j,j+4],[j+4,i+4],[i+4,i]].map(e=>e)); }
const key=e=>[...e].sort().join('-');
faces=faces.map(f=>new Set(f.map(key)));
const show=(t)=>console.log(t.padEnd(26),V.size,E.length,faces.length,'=>',V.size-E.length+faces.length);
show('flat cube (top removed)');
console.log('solid: 8-12+6 =',8-12+6);
// removal order: the interaction spec's (company/design/specs/flatten-the-cube-to-a-dot.md, W-2042; same as ORDER in
// flatten-the-cube-to-a-dot-mockup.mjs): 5 regions and 7 corners, first corner on press 3. Throws if the order breaks.
function removeEdge(a,b){const k=key([a,b]);E=E.filter(e=>key(e)!==k);
  const touching=faces.filter(f=>f.has(k));
  if(touching.length===1){faces=faces.filter(f=>f!==touching[0]);return 'region';}
  if(touching.length===2){ // merge
    const m=new Set([...touching[0],...touching[1]]);m.delete(k);faces=faces.filter(f=>!touching.includes(f));faces.push(m);return 'merge';}
  // leaf?
  const deg=v=>E.filter(e=>e.includes(v)).length;
  for(const v of [a,b]) if(deg(v)===0){V.delete(v);return 'leaf '+v;}
  return 'BRIDGE?';
}
const order=[[0,1],[3,0],[0,4],[1,2],[1,5],[2,3],[2,6],[3,7],[4,5],[5,6],[6,7],[7,4]];
if(order.length!==12||new Set(order.map(key)).size!==12) throw new Error('order must be the 12 edges once each');
const kinds=[];
for(const [a,b] of order){const r=removeEdge(a,b);kinds.push(r.startsWith('leaf')?'corner':r);show(`remove ${a}-${b} (${r})`);
  if(r!=='region'&&!r.startsWith('leaf')) throw new Error(`removal ${a}-${b} is ${r}: only region or corner allowed (claim c4)`);
  if(V.size-E.length+faces.length!==1) throw new Error(`total not 1 after ${a}-${b}`);}
const nR=kinds.filter(k=>k==='region').length, nC=kinds.filter(k=>k==='corner').length;
if(nR!==5||nC!==7||kinds.indexOf('corner')!==2||V.size!==1||!V.has(4)) throw new Error(`expected 5 regions, 7 corners, first corner on press 3, dot = corner 4; got ${nR}, ${nC}, press ${kinds.indexOf('corner')+1}, ${[...V]}`);
console.log(`order ok: ${nR} regions, ${nC} corners, first corner on press ${kinds.indexOf('corner')+1}, dot is corner ${[...V][0]} (claims c4, c5)`);
// slice a cube corner
console.log('sliced cube',10-15+7,'two',12-18+8,'tetra',4-6+4,'pyramid',5-8+5,'pyr tip',8-12+6,'icosa',12-30+20,'dodeca',20-30+12,'octa',6-12+8);
console.log('frame (torus) 16-32+16 =',16-32+16);
