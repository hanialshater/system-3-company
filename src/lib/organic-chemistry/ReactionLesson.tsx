"use client";
type Atom = {label:string;x:number;y:number;changed:boolean};
type Bond = {a:number;b:number;order:number};
type Structure = {name:string;atoms:Atom[];bonds:Bond[]};
export type ReactionCase = {question:string;options:string[];answer:number;before:Structure;after:Structure;explanation:string};
function describe(m:Structure) { return `${m.name}: ${m.bonds.map(b=>`${m.atoms[b.a].label} ${b.order===1?'single':b.order===2?'double':'triple'} bond to ${m.atoms[b.b].label}`).join('; ')}.`; }
function Molecule({m,y}:{m:Structure;y:number}) {
 return <g transform={`translate(0 ${y})`}>
 {m.bonds.flatMap((b,i)=>{const a=m.atoms[b.a],c=m.atoms[b.b],dx=c.x-a.x,dy=c.y-a.y,len=Math.hypot(dx,dy),nx=-dy/len,ny=dx/len;return (b.order===1?[0]:b.order===2?[-2.5,2.5]:[-4,0,4]).map((k,j)=><line key={`${i}-${j}`} x1={a.x+nx*k} y1={a.y+ny*k} x2={c.x+nx*k} y2={c.y+ny*k} stroke="var(--fg)" strokeWidth="1.8"/>);})}
 {m.atoms.map((a,i)=><g key={i}><rect x={a.x-Math.max(10,a.label.length*4.3)} y={a.y-10} width={Math.max(20,a.label.length*8.6)} height="20" rx="7" fill={a.changed?"#ffe0a0":"var(--bg-2)"}/><text x={a.x} y={a.y+4} textAnchor="middle" fontSize="12" fontWeight="650" fill={a.changed?"#563700":"var(--fg)"}>{a.label}</text></g>)}
 </g>;
}
export function ReactionStage({model,applied}:{model:ReactionCase;applied:boolean}) {
 return <svg viewBox="0 0 320 178" className="stage-svg" role="img" aria-label={`Starting structure: ${describe(model.before)} ${applied?`Product: ${describe(model.after)} Highlighted labels show selected changed groups.`:"The product is hidden."}`}>
 <text x="10" y="12" fontSize="12" fill="var(--muted)">Start · {model.before.name}</text><Molecule m={model.before} y={52}/><line x1="18" y1="88" x2="302" y2="88" stroke="var(--line)"/>
 {applied?<><text x="10" y="104" fontSize="12" fill="var(--muted)">Product · {model.after.name}</text><Molecule m={model.after} y={145}/></>:<text x="160" y="142" textAnchor="middle" fontSize="13" fill="var(--muted)">The product appears after you apply the conditions</text>}
 </svg>;
}
