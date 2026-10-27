"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
type Molecule={label:string;atoms:string[];role:'start'|'product'|'remaining'};type Model={question:string;options:string[];answer:number;before:Molecule[];after:Molecule[];equation:string;explanation:string};
const lesson:Model={
  "question": "In the particle model N₂ + 3 H₂ → 2 NH₃, start with 1 N₂ and 6 H₂ molecules. If complete reaction is possible, which reactant limits the products?",
  "options": [
    "Both run out together",
    "N₂",
    "H₂"
  ],
  "answer": 1,
  "before": [
    {
      "label": "N₂",
      "atoms": [
        "N",
        "N"
      ],
      "role": "start"
    },
    {
      "label": "H₂",
      "atoms": [
        "H",
        "H"
      ],
      "role": "start"
    },
    {
      "label": "H₂",
      "atoms": [
        "H",
        "H"
      ],
      "role": "start"
    },
    {
      "label": "H₂",
      "atoms": [
        "H",
        "H"
      ],
      "role": "start"
    },
    {
      "label": "H₂",
      "atoms": [
        "H",
        "H"
      ],
      "role": "start"
    },
    {
      "label": "H₂",
      "atoms": [
        "H",
        "H"
      ],
      "role": "start"
    },
    {
      "label": "H₂",
      "atoms": [
        "H",
        "H"
      ],
      "role": "start"
    }
  ],
  "after": [
    {
      "label": "NH₃",
      "atoms": [
        "N",
        "H",
        "H",
        "H"
      ],
      "role": "product"
    },
    {
      "label": "NH₃",
      "atoms": [
        "N",
        "H",
        "H",
        "H"
      ],
      "role": "product"
    },
    {
      "label": "H₂",
      "atoms": [
        "H",
        "H"
      ],
      "role": "remaining"
    },
    {
      "label": "H₂",
      "atoms": [
        "H",
        "H"
      ],
      "role": "remaining"
    },
    {
      "label": "H₂",
      "atoms": [
        "H",
        "H"
      ],
      "role": "remaining"
    }
  ],
  "equation": "N₂ + 3 H₂ → 2 NH₃",
  "explanation": "The equation permits 1 complete reaction set in this particle model. It forms 2 NH₃ and leaves 0 N₂ and 3 H₂. N₂ is the limiting reactant. Atom totals are conserved."
};
const colors:Record<string,string>={H:'#f4f1e9',O:'#e99792',N:'#8abce1',C:'#b2bdc6'};
export default function Demo({slug}:{slug:string}){
 const [shown,setShown]=useState(false),molecules=shown?lesson.after:lesson.before,counts=molecules.flatMap(m=>m.atoms).reduce<Record<string,number>>((o,a)=>(o[a]=(o[a]||0)+1,o),{});
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Build the products and inspect what remains." reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 320 205" className="stage-svg" role="img" aria-label={`${shown?'Products and leftovers':'Starting particles'}: ${molecules.map(m=>`${m.label} ${m.role}`).join(', ')}. ${Object.entries(counts).map(([a,n])=>`${n} ${a} atoms`).join(', ')}.`}>
 <text x="160" y="16" textAnchor="middle" fill="var(--fg)" fontSize="13" fontWeight="bold">{lesson.equation}</text>
 {molecules.map((m,i)=>{const x=40+(i%4)*77,y=53+Math.floor(i/4)*68;return <g key={i}><rect x={x-31} y={y-22} width="62" height="44" rx="8" fill={m.role==='product'?'#b4d6c2':m.role==='remaining'?'#e9c5a8':'#c5d5df'} stroke="#637b89"/>{m.atoms.map((a,j)=>{const ax=x-15+(j%3)*15,ay=y-8+Math.floor(j/3)*16;return <g key={j}><circle cx={ax} cy={ay} r="7.5" fill={colors[a]} stroke="#5a6b77"/><text x={ax} y={ay+3.5} textAnchor="middle" fill="#1b303a" fontWeight="bold" fontSize="10">{a}</text></g>})}<text x={x} y={y+38} textAnchor="middle" fill="var(--fg)" fontSize="12">{m.label}</text></g>})}
 <text x="160" y="197" textAnchor="middle" fill="var(--fg)" fontSize="12">Atoms: {Object.entries(counts).sort().map(([a,n])=>`${a} ${n}`).join(' · ')}</text>
 </svg><Row><Control disabled={locked||shown} onClick={()=>{setShown(true);interact();}}>Build the products</Control></Row><p style={{fontSize:'0.8rem',color:'var(--muted)',textAlign:'center',margin:'4px 0'}}>{shown?'Green = product · peach = unreacted':'Each group is one molecule · not geometry'}</p></div>}
 </Lesson>;
}
