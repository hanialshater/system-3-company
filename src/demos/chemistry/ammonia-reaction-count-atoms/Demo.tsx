"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";

type Molecule = { label: string; atoms: string[] };
type Case = { question: string; options: [string,string,string]; answer: number; before: Molecule[]; after: Molecule[]; equation: string; explanation: string };
const lesson: Case = {
  "question": "Nitrogen and hydrogen form ammonia. If 1 N₂ and 3 H₂ react completely to make only NH₃, how many NH₃ molecules form?",
  "options": [
    "2 molecules",
    "3 molecules",
    "1 molecules"
  ],
  "answer": 0,
  "before": [
    {
      "label": "N₂",
      "atoms": [
        "N",
        "N"
      ]
    },
    {
      "label": "H₂",
      "atoms": [
        "H",
        "H"
      ]
    },
    {
      "label": "H₂",
      "atoms": [
        "H",
        "H"
      ]
    },
    {
      "label": "H₂",
      "atoms": [
        "H",
        "H"
      ]
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
      ]
    },
    {
      "label": "NH₃",
      "atoms": [
        "N",
        "H",
        "H",
        "H"
      ]
    }
  ],
  "equation": "N₂ + 3 H₂ → 2 NH₃",
  "explanation": "The model gives 2 NH₃: N₂ + 3 H₂ → 2 NH₃. The 6 H, 2 N atoms are present on both sides; atoms change partners, not identity."
};
const colors: Record<string,string> = { H: "#f2f5fb", C: "#70788b", N: "#7198e8", O: "#ed787b", S: "#e9c85a", Cl: "#77ca8c" };

export default function Demo({ slug }: { slug: string }) {
 const [built, setBuilt] = useState(false);
 const molecules = built ? lesson.after : lesson.before;
 const counts = molecules.flatMap(m => m.atoms).reduce<Record<string,number>>((a,e) => ({...a,[e]:(a[e]||0)+1}),{});
 const countText = Object.entries(counts).sort().map(([e,n]) => `${n} ${e}`).join(" · ");
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}}
   exploreHint="Rearrange the model atoms, then compare the counts."
   reveal={() => <p>{lesson.explanation} In this particle model, each circle is one atom; groups are molecule counts, not a movie of the reaction or exact molecular shapes.</p>}>
   {({locked,interact}) => <div>
    <svg viewBox="0 0 360 210" className="stage-svg" role="img" aria-label={`${built ? "Products" : "Reactants"}: ${molecules.map(m=>m.label).join(", ")}. Atom totals: ${countText}.`}>
     <text x="180" y="23" textAnchor="middle" fill="var(--fg)" fontSize="15" fontWeight="bold">{built ? "Products" : "Starting molecules"}</text>
     {molecules.map((m,i) => { const x=34+(i%4)*90, y=65+Math.floor(i/4)*70; return <g key={i}>
      <rect x={x-31} y={y-23} width="78" height="48" rx="12" fill="var(--bg-2)" stroke="var(--line)"/>
      {m.atoms.map((e,j)=><g key={j}><circle cx={x-20+(j%4)*19} cy={y-10+Math.floor(j/4)*18} r="9.1" fill={colors[e]||"#9caabc"} stroke="#586378" strokeWidth=".7"/><text x={x-20+(j%4)*19} y={y-6+Math.floor(j/4)*18} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#192131">{e}</text></g>)}
      <text x={x+9} y={y+39} textAnchor="middle" fontSize="12" fill="var(--fg)">{m.label}</text>
     </g>})}
     <text x="180" y="204" textAnchor="middle" fontSize="13" fill="var(--fg)">{countText}</text>
    </svg>
    <Row><Control disabled={locked || built} onClick={()=>{setBuilt(true);interact();}}>Build the products</Control></Row>
    <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Circles are atoms · groups show molecule counts</p>
   </div>}
 </Lesson>;
}
