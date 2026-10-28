/** Original reusable Lessons scenery. Meaningful controls live in HTML above this decorative SVG. */
const THEMES = [
  { land: "#BCE58B", top: "#D9F2A0", shore: "#F8D99B", rock: "#568D68", roof: "#EF8067" },
  { land: "#8DD6B1", top: "#B7EAD0", shore: "#F7D9A1", rock: "#427C80", roof: "#E9A350" },
  { land: "#C0CB8C", top: "#E4E9B6", shore: "#F2D2A1", rock: "#67858F", roof: "#E38479" },
  { land: "#C4B6DF", top: "#E4D6EC", shore: "#F2DBAF", rock: "#847AAB", roof: "#637CB3" },
];
type Theme = typeof THEMES[number];
function Terrain({ theme: t, flip }: { theme: Theme; flip: boolean }) {
  return <g transform={flip ? "translate(400 0) scale(-1 1)" : undefined}>
    <path d="M193 50C269 35 334 95 351 158C383 223 345 266 359 328C384 405 353 464 327 499C309 540 343 591 282 627C236 657 167 642 113 621C38 599 49 546 43 490C16 421 55 374 45 320C22 258 47 207 60 163C70 95 125 48 193 50Z" fill="#073D55" opacity=".25" transform="translate(0 16)"/>
    <path d="M193 50C269 35 334 95 351 158C383 223 345 266 359 328C384 405 353 464 327 499C309 540 343 591 282 627C236 657 167 642 113 621C38 599 49 546 43 490C16 421 55 374 45 320C22 258 47 207 60 163C70 95 125 48 193 50Z" fill={t.shore} stroke="#F8E9C5" strokeWidth="7"/>
    <path d="M193 60C264 45 321 99 337 161C365 224 329 268 344 329C368 399 338 451 312 492C293 538 326 578 274 611C235 638 168 626 117 605C53 583 64 539 57 485C31 419 69 375 59 318C37 257 60 210 74 164C83 106 130 61 193 60Z" fill={t.land}/>
    <path d="M112 115C166 58 270 76 303 140C321 183 286 208 230 188C165 164 130 196 91 178C72 167 91 137 112 115Z" fill={t.top}/>
    <path d="M77 410C113 370 148 395 143 454C141 502 108 548 78 513C61 488 60 433 77 410Z" fill={t.top} opacity=".8"/>
    <path d="M281 340L322 371L312 408L284 423L268 397Z" fill={t.rock} opacity=".5"/>
    <path d="M271 336L306 354L322 371L284 380L257 361Z" fill={t.top}/>
    <path d="M59 276q-25 18-8 49M336 438q26-4 31-29M112 634q39 25 78 22" fill="none" stroke="#91D6DA" strokeWidth="3" strokeLinecap="round"/>
  </g>;
}
function Trail() { return <>
  <path d="M200 0C200 90 80 100 80 180S160 225 160 280S280 315 280 380S300 425 300 480S180 525 180 580S200 630 200 680" fill="none" stroke="#AC9368" strokeOpacity=".3" strokeWidth="23"/>
  <path d="M200 0C200 90 80 100 80 180S160 225 160 280S280 315 280 380S300 425 300 480S180 525 180 580S200 630 200 680" fill="none" stroke="#FFF0C6" strokeWidth="17"/>
  <path d="M200 0C200 90 80 100 80 180S160 225 160 280S280 315 280 380S300 425 300 480S180 525 180 580S200 630 200 680" fill="none" stroke="#D2B67B" strokeWidth="2" strokeDasharray="2 12" strokeLinecap="round"/>
  <g stroke="#926C46" strokeWidth="4"><path d="M183 9h34M183 22h34M182 35h34M178 48h34M172 61h34"/></g>
  <path d="M180 2v68M220 2l-12 70" fill="none" stroke="#795C43" strokeWidth="3"/>
  </>; }
function Tree({ x, y, scale = 1, kind = 0 }: { x: number; y: number; scale?: number; kind?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}><ellipse cy="9" rx="16" ry="7" fill="#305A59" opacity=".16"/><path d="M0 12V-23" stroke="#74573E" strokeWidth="5" strokeLinecap="round"/>{kind % 2 ? <><path d="M0-69L-23-18H23Z" fill="#227E72"/><path d="M0-55L-27-5H27Z" fill="#38966D"/><path d="M0-50L0-5H27Z" fill="#1B7665"/></> : <><ellipse cy="-34" rx="23" ry="29" fill="#207C65"/><ellipse cx="-8" cy="-40" rx="17" ry="22" fill="#41A375"/><ellipse cx="9" cy="-32" rx="15" ry="23" fill="#288D67"/></>}</g>;
}
function Landmark({ variant, theme }: { variant: number; theme: Theme }) {
  if (variant % 3 === 0) return <g transform="translate(265 235)"><ellipse cy="19" rx="42" ry="15" fill="#164F5D" opacity=".17"/><path d="M-30-23L0-39L30-23V14L0 29L-30 14Z" fill="#FFF5D7"/><path d="M0-39L30-23V14L0 29Z" fill="#E1C29A"/><path d="M-38-24L0-65L38-24L0-8Z" fill={theme.roof}/><path d="M0-65L38-24L0-8Z" fill="#C66255"/><path d="M-16 5v-17l12 6V11" fill="#537F85"/><path d="M10-5v15l10-5V-10" fill="#537F85"/><path d="M-22-41v-23h10v12" fill="#FFF3D5"/></g>;
  if (variant % 3 === 1) return <g transform="translate(103 405)"><ellipse cy="28" rx="37" ry="12" fill="#164F5D" opacity=".17"/><path d="M-22 24L-12-64H12L22 24Q0 39-22 24Z" fill="#FFF8DC"/><path d="M-17-13H17L20 3H-20Z" fill={theme.roof}/><path d="M-17-70H17V-53H-17Z" fill="#375F76"/><path d="M-23-70L0-91L23-70Z" fill={theme.roof}/><path d="M-6-58v-10H6v10M-4 28V10H4v18" fill="#254C62"/><path d="M21-63L60-77V-47Z" fill="#FFF3BA" opacity=".5"/></g>;
  return <g transform="translate(132 400)"><ellipse cy="32" rx="49" ry="16" fill="#164F5D" opacity=".17"/><path d="M-53 23L-9-78L49 26Z" fill={theme.rock}/><path d="M-9-78L49 26L2 10Z" fill="#567286"/><path d="M-9-78L-27-37L-8-43L2-26L7-48Z" fill="#FFFBE4"/><path d="M28 7V-49" stroke="#46576C" strokeWidth="3"/><path d="M30-49L58-40L30-30Z" fill={theme.roof}/></g>;
}
export const STOP_POINTS = [{ x: 80, y: 180 }, { x: 160, y: 280 }, { x: 280, y: 380 }, { x: 300, y: 480 }, { x: 180, y: 580 }];
export function WorldScene({ variant }: { variant: number }) {
  const theme = THEMES[variant % THEMES.length];
  return <svg viewBox="0 0 400 680" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <g fill="none" stroke="#A9E4E7" opacity=".3" strokeLinecap="round"><path d="M9 117h23M12 124h10M360 70h27M370 77h12M8 366h16M365 550h26M373 558h12M25 606h14" strokeWidth="2"/></g>
    <Terrain theme={theme} flip={variant % 2 === 1}/><Trail/>
    <Tree x={310} y={151} scale={.85} kind={variant}/><Tree x={339} y={183} scale={.57} kind={variant}/><Tree x={79} y={551} scale={.68} kind={variant + 1}/><Tree x={110} y={572} scale={.48} kind={variant}/><Tree x={226} y={306} scale={.64} kind={variant + 1}/>
    <Landmark variant={variant} theme={theme}/>
    <g fill="#FEF6C4"><circle cx="98" cy="339" r="3"/><circle cx="107" cy="334" r="3"/><circle cx="111" cy="343" r="3"/><circle cx="307" cy="590" r="3"/><circle cx="318" cy="587" r="3"/></g>
    <g transform={`translate(${variant % 2 ? 370 : 27} 465) rotate(-12)`}><path d="M-17 1H17L9 12H-9Z" fill="#F6D79B"/><path d="M0-32V2M-1-30L-15-2H-1Z" fill="#FFF5D8" stroke="#F6E4C0" strokeWidth="2"/></g>
  </svg>;
}
