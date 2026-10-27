"use client";

import { useId, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";

type Atom = { element: string; x: number; y: number; z: number };
export type MoleculeCase = {
  name: string; formula: string; atoms: Atom[]; question: string;
  options: [string, string, string]; answer: number; explanation: string;
};

const colors: Record<string, string> = { C: "#545b6c", H: "#edf3fa", O: "#e45e63", N: "#6389df", F: "#a6d86b", B: "#e3a177", P: "#e59b49", S: "#e2c64a", Cl: "#69c689", Xe: "#b696d7" };

/** A rotatable ball-and-stick model. Coordinates are idealised, not atomic radii or measured bond lengths. */
const lesson: MoleculeCase = {
  "name": "Phosphorus pentachloride in three dimensions",
  "formula": "PCl₅",
  "atoms": [
    {
      "element": "P",
      "x": 0,
      "y": 0,
      "z": 0
    },
    {
      "element": "Cl",
      "x": 0,
      "y": 1.12,
      "z": 0
    },
    {
      "element": "Cl",
      "x": 0,
      "y": -1.12,
      "z": 0
    },
    {
      "element": "Cl",
      "x": 1,
      "y": 0,
      "z": 0
    },
    {
      "element": "Cl",
      "x": -0.5,
      "y": 0,
      "z": 0.87
    },
    {
      "element": "Cl",
      "x": -0.5,
      "y": 0,
      "z": -0.87
    }
  ],
  "question": "What is the molecular shape of PCl₅ around its central atom?",
  "options": [
    "linear",
    "bent",
    "trigonal bipyramidal"
  ],
  "answer": 2,
  "explanation": "Five bonding regions surround phosphorus: three are equatorial and two axial. The ideal structure is trigonal bipyramidal."
};

export default function Demo({ slug }: { slug: string }) {
  const [turn, setTurn] = useState(0);
  const uid = useId().replace(/:/g, "");
  const project = (a: Atom) => {
    const angle = turn * Math.PI / 4;
    const x = a.x * Math.cos(angle) + a.z * Math.sin(angle);
    const z = -a.x * Math.sin(angle) + a.z * Math.cos(angle);
    return { ...a, px: 150 + x * 67, py: 89 - a.y * 58 + z * 16, depth: z };
  };
  const pts = lesson.atoms.map(project);
  const center = pts[0];
  return <Lesson slug={slug} predict={{ question: lesson.question, options: lesson.options, answer: lesson.answer }}
    exploreHint="Turn the model and look at the arrangement around the central atom."
    reveal={() => <p>{lesson.explanation} The ball-and-stick picture is an idealised model: its colours and sizes help you distinguish atoms, rather than showing electron clouds or exact dimensions.</p>}>
    {({ locked, interact }) => <div>
      {locked ? <svg viewBox="0 0 300 180" className="stage-svg" role="img" aria-label="Molecular model hidden until you predict"><circle cx="150" cy="88" r="48" fill="var(--bg-2)" stroke="var(--line)" strokeWidth="2"/><text x="150" y="100" textAnchor="middle" fill="var(--muted)" fontSize="38">?</text></svg> :
      <svg viewBox="0 0 300 180" className="stage-svg" role="img" aria-label={`Rotatable model of ${lesson.name}, ${lesson.formula}. The central ${center.element} is connected to ${pts.length - 1} surrounding atoms.`}>
        <defs><radialGradient id={uid} cx="30%" cy="25%"><stop offset="0" stopColor="white" stopOpacity=".8"/><stop offset="1" stopColor="white" stopOpacity="0"/></radialGradient></defs>
        {pts.slice(1).map((p, i) => <line key={i} x1={center.px} y1={center.py} x2={p.px} y2={p.py} stroke="var(--muted)" strokeWidth="7" strokeLinecap="round"/>)}
        {[...pts].sort((a,b) => a.depth-b.depth).map((p,i) => <g key={i}>
          <circle cx={p.px} cy={p.py} r={p.element === "H" ? 11 : 15} fill={colors[p.element] || "#8f9aaa"} stroke="var(--fg)" strokeWidth="1.2"/>
          <circle cx={p.px} cy={p.py} r={p.element === "H" ? 11 : 15} fill={`url(#${uid})`}/>
          <text x={p.px} y={p.py+4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#161b27">{p.element}</text>
        </g>)}
      </svg>}
      <Row><Control disabled={locked} onClick={() => { setTurn(n => (n+1)%8); interact(); }}>Rotate model 45°</Control></Row>
      <p style={{fontSize: "0.8rem", color: "var(--muted)", textAlign: "center", margin: "4px 0"}}>Idealised 3D geometry · rotate to change viewpoint</p>
    </div>}
  </Lesson>;
}
