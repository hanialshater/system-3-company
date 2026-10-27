"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";

export type CellCase = { question: string; options: [string,string,string]; answer: number; target: string; plant: boolean; explanation: string };

/** An intentionally schematic cell; highlighted structures are not drawn to scale. */
const lesson: CellCase = {
  "question": "Which boundary controls what enters and leaves the cell?",
  "options": [
    "Nucleolus",
    "Mitochondrion",
    "Plasma membrane"
  ],
  "answer": 2,
  "target": "membrane",
  "plant": false,
  "explanation": "The plasma membrane surrounds the cell and selectively regulates transport between the cell and its surroundings. It is a phospholipid bilayer containing proteins."
};

export default function Demo({ slug }: { slug: string }) {
  const [examined, setExamined] = useState(false);
  const active = (id: string) => examined && lesson.target === id;
  const color = (id: string, ordinary: string) => active(id) ? "#ffcf57" : ordinary;
  const outline = (id: string) => active(id) ? "#a76d00" : "#5a7188";
  return <Lesson slug={slug} predict={{ question: lesson.question, options: lesson.options, answer: lesson.answer }}
    exploreHint="Inspect the cell to identify the structure."
    reveal={() => <p>{lesson.explanation} The highlighted drawing is a simplified model of a cell; its structures are not drawn to scale.</p>}>
    {({locked, interact}) => <div>
      <svg viewBox="0 0 320 190" className="stage-svg" role="img" aria-label={examined ? `Simplified ${lesson.plant ? "plant" : "animal"} cell, with ${lesson.options[lesson.answer]} highlighted.` : `Simplified ${lesson.plant ? "plant" : "animal"} cell before inspection.`}>
        {lesson.plant ? <rect x="26" y="16" width="268" height="158" rx="17" fill={color("wall", "#b6dcae")} stroke={outline("wall")} strokeWidth="8"/> : null}
        <ellipse cx="160" cy="95" rx={lesson.plant?123:132} ry={lesson.plant?71:79} fill="#eaf5f3" stroke={outline("membrane")} strokeWidth={active("membrane") ? 8 : 3}/>
        {lesson.plant && <ellipse cx="192" cy="95" rx="53" ry="47" fill={color("vacuole", "#c8eaf1")} stroke={outline("vacuole")} strokeWidth="3"/>}
        <ellipse cx="105" cy="87" rx="33" ry="28" fill={color("nucleus", "#bcb1e9")} stroke={outline("nucleus")} strokeWidth="3"/>
        <circle cx="101" cy="84" r="8" fill={color("nucleolus", "#8273bd")} stroke={outline("nucleolus")} strokeWidth="2"/>
        <ellipse cx="190" cy="45" rx="24" ry="12" transform="rotate(-17 190 45)" fill={color("mitochondrion", "#efac87")} stroke={outline("mitochondrion")} strokeWidth="3"/>
        <path d="M171 44 q7 -8 10 2 q5 9 9 -2 q4 -8 9 -1 q3 4 8 -1" fill="none" stroke="#995e51" strokeWidth="2"/>
        <path d="M62 122 q30 -10 58 7 M62 129 q30 -10 58 7 M66 137 q30 -9 54 6" fill="none" stroke={active("rough-er") ? "#dd9816" : "#9e86c0"} strokeWidth={active("rough-er")?6:4}/>
        {[68,82,96,110].map((x,i)=><circle key={x} cx={x} cy={119+i%2*2} r="2.5" fill={color("ribosome", "#555b7c")}/>)}
        <path d="M212 134 q17 -12 35 -3 M212 140 q18 -10 35 -2 M214 146 q17 -8 32 -1" fill="none" stroke={active("golgi") ? "#dc9b18" : "#e38f9b"} strokeWidth={active("golgi")?6:4}/>
        {!lesson.plant && <circle cx="230" cy="84" r="10" fill={color("lysosome", "#e6b48d")} stroke={outline("lysosome")} strokeWidth="2"/>}
        {lesson.plant && <g><ellipse cx="242" cy="61" rx="21" ry="11" fill={color("chloroplast", "#80c994")} stroke={outline("chloroplast")} strokeWidth="2"/><path d="M229 57 h25 M229 62 h25 M229 66 h25" stroke="#47815a" strokeWidth="2"/></g>}
        {examined && <text x="160" y="184" textAnchor="middle" fontWeight="bold" fontSize="13" fill="var(--fg)">{lesson.options[lesson.answer]} highlighted</text>}
      </svg>
      <Row><Control disabled={locked || examined} onClick={() => { setExamined(true); interact(); }}>Inspect the cell</Control></Row>
      <p style={{fontSize:"0.8rem",color:"var(--muted)",textAlign:"center",margin:"4px 0"}}>Schematic {lesson.plant ? "plant" : "animal"} cell · not to scale</p>
    </div>}
  </Lesson>;
}
