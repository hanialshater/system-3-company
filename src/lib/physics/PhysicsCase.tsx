"use client";


export type PhysicsCase = {
  question: string;
  options: [string, string, string];
  answer: number;
  prompt: string;
  before: string;
  after: string;
  explanation: string;
  limit: string;
  diagram: "rope" | "engine" | "pump" | "lever" | "speed" | "filter" | "balance" | "graph" | "lens" | "fan" | "sphere" | "clock" | "spectrum" | "decay" | "length";
};

export function Diagram({ kind, changed }: { kind: PhysicsCase["diagram"]; changed: boolean }) {
  if (kind === "length") return <svg viewBox="0 0 300 120" className="stage-svg" role="img" aria-label="Measured length along the direction of motion">
    <rect x="40" y="40" width={changed?160:200} height="38" fill="var(--domain)"/>
    <path d="M40 95 H240" stroke="var(--muted)" strokeDasharray="4 3"/>
  </svg>;
  if (kind === "decay") return <svg viewBox="0 0 300 150" className="stage-svg" role="img" aria-label={changed ? "25 of 100 nuclei remain" : "50 of 100 nuclei remain"}>
    {Array.from({length:100},(_,i)=><circle key={i} cx={40+(i%10)*24} cy={12+Math.floor(i/10)*14} r="4" fill={i<(changed?25:50)?"var(--domain)":"var(--bg-2)"} stroke="var(--muted)"/>)}
  </svg>;
  if (kind === "sphere") return <svg viewBox="0 0 300 150" className="stage-svg" role="img" aria-label="A spacecraft moves farther from a spherical planet">
    <defs><radialGradient id="planet-light"><stop stopColor="var(--domain)"/><stop offset="1" stopColor="var(--bg-2)"/></radialGradient></defs>
    <circle cx="55" cy="75" r="20" fill="url(#planet-light)" stroke="var(--muted)" strokeWidth="2"/>
    <circle cx={changed?255:105} cy="75" r="7" fill="var(--fg)"/>
    <line x1="55" y1="75" x2={changed?255:105} y2="75" stroke="var(--fg)" strokeDasharray="4 4"/>
  </svg>;
  if (kind === "clock") return <svg viewBox="0 0 300 150" className="stage-svg" role="img" aria-label="A moving clock is compared with a stationary clock">
    {[80,220].map((x,i)=><g key={x}><circle cx={x} cy="75" r="45" fill="none" stroke="var(--muted)" strokeWidth="3"/>
      <line x1={x} y1="75" x2={x} y2="45" stroke="var(--fg)" strokeWidth="3"/>
      <line x1={x} y1="75" x2={x+(i===1&&changed?20:30)} y2={i===1&&changed?92:75} stroke="var(--domain)" strokeWidth="3"/>
    </g>)}
  </svg>;
  if (kind === "spectrum") return <svg viewBox="0 0 300 120" className="stage-svg" role="img" aria-label="A wave changes wavelength">
    <path d={Array.from({length:121},(_,i)=>`${i?"L":"M"}${15+i*2.25} ${60-26*Math.sin(i*Math.PI/(changed?10:20))}`).join(" ")} fill="none" stroke="var(--domain)" strokeWidth="3"/>
  </svg>;
  if (kind === "graph") return <svg viewBox="0 0 300 150" className="stage-svg" role="img" aria-label="A distance-time graph with the same distance reached in different times">
    <path d="M40 15 V120 H270" fill="none" stroke="var(--muted)" strokeWidth="2"/>
    <path d={changed ? "M40 120 L140 25" : "M40 120 L240 25"} fill="none" stroke="var(--domain)" strokeWidth="4"/>
    <circle cx={changed ? 140 : 240} cy="25" r="5" fill="var(--domain)"/>
  </svg>;
  if (kind === "lens") return <svg viewBox="0 0 300 150" className="stage-svg" role="img" aria-label="Light rays travel through a lens toward an image">
    <line x1="10" y1="75" x2="290" y2="75" stroke="var(--muted)" strokeDasharray="4 4"/>
    <path d="M30 75 V25 M25 35 L30 25 L35 35" fill="none" stroke="var(--fg)" strokeWidth="4"/>
    <ellipse cx="150" cy="75" rx="10" ry="52" fill="none" stroke="var(--fg)" strokeWidth="3"/>
    <path d="M30 25 L150 96 L270 125" fill="none" stroke="var(--domain)" strokeWidth="2"/>
    {!changed && <path d="M30 25 L150 54 L270 125" fill="none" stroke="var(--domain)" strokeWidth="2"/>}
    {changed && <rect x="139" y="20" width="22" height="55" fill="var(--muted)"/>}
    {changed && <path d="M270 75 V125 M265 115 L270 125 L275 115" fill="none" stroke="var(--domain)" strokeWidth="4"/>}
  </svg>;
  if (kind === "fan") return <svg viewBox="0 0 300 150" className="stage-svg" role="img" aria-label="Air moves past a warmer surface">
    <circle cx="65" cy="75" r="35" fill="none" stroke="var(--muted)" strokeWidth="3"/>
    <path d="M65 40 L75 75 L65 110 L55 75 Z" fill="var(--domain)" transform={changed ? "rotate(45 65 75)" : undefined}/>
    <rect x="230" y="30" width="25" height="90" fill="var(--muted)"/>
    {changed && <path d="M110 55 H210 M200 48 L210 55 L200 62 M110 95 H210 M200 88 L210 95 L200 102" fill="none" stroke="var(--domain)" strokeWidth="3"/>}
  </svg>;
  if (kind === "rope") {
    const y = changed ? 53 : 105;
    return <svg viewBox="0 0 300 165" className="stage-svg" role="img" aria-label="A weight hangs from two symmetric ropes">
      <path d={`M20 30 L150 ${y} L280 30`} fill="none" stroke="var(--domain)" strokeWidth="4" />
      <line x1="150" y1={y} x2="150" y2={y + 23} stroke="var(--fg)" strokeWidth="3"/>
      <rect x="135" y={y + 23} width="30" height="16" fill="var(--muted)"/>
    </svg>;
  }
  if (kind === "filter") return <svg viewBox="0 0 300 100" className="stage-svg" role="img" aria-label="Three polarizers in a light path">
    <path d="M5 50 H295" stroke="var(--domain)" strokeWidth="6"/>
    {[60,150,240].map((x,i)=><g key={x} transform={`translate(${x} 50) rotate(${i===0?0:i===2?90:changed?45:0})`}>
      <rect x="-8" y="-35" width="16" height="70" fill="var(--muted)"/><line x1="0" y1="-30" x2="0" y2="30" stroke="var(--fg)" strokeWidth="3"/>
    </g>)}
  </svg>;
  if (kind === "balance") return <svg viewBox="0 0 300 140" className="stage-svg" role="img" aria-label="Centre of mass moves relative to the support edge">
    <path d="M70 110 H230 M100 110 V50 H200 V110" fill="none" stroke="var(--muted)" strokeWidth="3"/>
    <circle cx={changed?215:170} cy="65" r="7" fill="var(--domain)"/>
    <line x1={changed?215:170} y1="65" x2={changed?215:170} y2="110" stroke="var(--domain)" strokeDasharray="4 3"/>
    <line x1="200" y1="105" x2="200" y2="120" stroke="var(--fg)" strokeWidth="3"/>
  </svg>;
  if (kind === "lever") return <svg viewBox="0 0 300 140" className="stage-svg" role="img" aria-label="Forearm lever with load and muscle attachment">
    <path d="M35 85 H260" fill="none" stroke="var(--muted)" strokeWidth="10"/>
    <circle cx="35" cy="85" r="8" fill="var(--fg)"/>
    <path d={`M65 85 V25 M${changed ? 255 : 110} 85 V125`} fill="none" stroke="var(--domain)" strokeWidth="4"/>
    <path d={`M59 34 L65 25 L71 34 M${changed ? 249 : 104} 116 l6 9 l6 -9`} fill="none" stroke="var(--domain)" strokeWidth="3"/>
    <circle cx={changed?255:110} cy="85" r="6" fill="var(--fg)"/>
  </svg>;
  return <svg viewBox="0 0 300 120" className="stage-svg" role="img" aria-label={kind === "pump" ? "Energy goes into a heat pump and heat leaves it" : kind === "engine" ? "Heat flows through an engine between hot and cold reservoirs" : "Two legs of an equal-distance trip"}>
    <rect x="105" y="30" width="90" height="60" rx="8" fill="none" stroke="var(--muted)" strokeWidth="3"/>
    <path d="M5 60 H95 M205 60 H295" fill="none" stroke="var(--domain)" strokeWidth={changed?8:4}/>
    <path d="M85 53 L95 60 L85 67 M285 53 L295 60 L285 67" fill="none" stroke="var(--domain)" strokeWidth="3"/>
  </svg>;
}

