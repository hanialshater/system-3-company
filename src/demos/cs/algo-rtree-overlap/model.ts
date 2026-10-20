export type Point=[number,number];export const boxes=[{id:'A',box:[0,3,0,3],points:[[0,0],[3,3]]},{id:'B',box:[2,5,0,3],points:[[2,0],[5,3]]}];
export function query(q:Point){if(!q.every(Number.isFinite))throw Error('Finite point');const visited=boxes.filter(b=>q[0]>=b.box[0]&&q[0]<=b.box[1]&&q[1]>=b.box[2]&&q[1]<=b.box[3]);return {q,visited:visited.map(b=>b.id),tests:visited.flatMap(b=>b.points),hits:visited.flatMap(b=>b.points).filter(p=>p[0]===q[0]&&p[1]===q[1])};}
export function run(contrast=false){return query(contrast?[.5,1]:[2.5,1]);}
