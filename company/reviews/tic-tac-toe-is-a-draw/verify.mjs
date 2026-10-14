// Builder's re-run of the tic-tac-toe-is-a-draw numbers. Usage: node verify.mjs
const L = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const win = (b) => { for (const l of L) if (b[l[0]] && b[l[0]] === b[l[1]] && b[l[1]] === b[l[2]]) return b[l[0]]; return 0; };
const memo = new Map();
function val(b, p) {
  const k = b.join('') + p; if (memo.has(k)) return memo.get(k);
  const w = win(b); let r;
  if (w) r = w === 'X' ? 1 : -1;
  else if (b.every(Boolean)) r = 0;
  else { const vs = []; for (let i = 0; i < 9; i++) if (!b[i]) { b[i] = p; vs.push(val(b, p === 'X' ? 'O' : 'X')); b[i] = 0; } r = p === 'X' ? Math.max(...vs) : Math.min(...vs); }
  memo.set(k, r); return r;
}
const e = Array(9).fill(0);
console.log('empty board value', val(e, 'X'));
for (const f of [0, 1, 4]) { const b = [...e]; b[f] = 'X'; console.log('first move', f, 'value', val(b, 'O')); }
function count(b, p) { if (win(b) || b.every(Boolean)) return 1; let n = 0; for (let i = 0; i < 9; i++) if (!b[i]) { b[i] = p; n += count(b, p === 'X' ? 'O' : 'X'); b[i] = 0; } return n; }
console.log('complete games', count([...e], 'X'));
const E = ['X','O','X','O','O',0,0,'X',0];
console.log('endgame value (X to move)', val(E, 'X'));
for (const m of [5, 6, 8]) {
  const b = [...E]; b[m] = 'X'; console.log('X plays', m, '-> value', val(b, 'O'));
  for (const o of [5, 6, 8].filter((x) => x !== m)) {
    const c = [...b]; c[o] = 'O'; const last = [5, 6, 8].find((x) => x !== m && x !== o);
    const d = [...c]; d[last] = 'X';
    console.log('   O plays', o, win(c) ? 'and wins' : 'then X forced ' + last + ' ->' + (win(d) || 'draw'));
  }
}
