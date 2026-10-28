export type HomeGame = {slug:string;baseId:string;name:string;title:string;family:string;familyName:string;mode:string;modeName:string;minPlayers:number;maxPlayers:number;allowedPlayers:number[];playersLabel:string;materials:string;setup:string;turn:string;success:string;format:string};
const palette:Record<string,string>={mime:'#ffd3b5',words:'#c9e7fb',drawing:'#d5e9c1',memory:'#ddd2f6',detective:'#f9d18e',observation:'#b9e7db',story:'#f7c7cf',rhythm:'#d2d7fa',paper:'#f8dcb4',team:'#c7e5dc'};
function PaperPicture({id,step,ink,blue}:{id:string;step:number;ink:string;blue:string}){
 if(step===0)return null;
 if(id==='paper-tower')return <g><path d="M139 107 L145 61 L157 52 L168 61 L171 107 Z M171 107 L174 67 L184 60 L194 67 L198 107 Z" fill="#f5c66b" stroke={ink}/><path d="M145 61 H168 M174 67 H194" fill="none"/></g>;
 if(id==='paper-bridge')return <g><rect x="125" y="88" width="20" height="20" fill={blue}/><rect x="186" y="88" width="20" height="20" fill={blue}/><path d="M137 88 H197 L192 79 H142Z" fill="#f5c66b"/></g>;
 if(id==='paper-ramp'||id==='paper-path')return <g><path d="M129 104 L193 64 L198 71 L135 111 Z" fill="#f5c66b"/><circle cx={step===1?163:137} cy={step===1?78:100} r="6" fill={blue}/></g>;
 if(id==='paper-ring')return <ellipse cx="165" cy="80" rx="30" ry="20" fill="none" stroke="#f5b95c" strokeWidth="9"/>;
 if(id==='paper-cup')return <path d="M137 57 H194 L184 107 H148 Z M137 57 Q165 68 194 57" fill="#f5c66b"/>;
 if(id==='paper-maze')return <path d="M130 102 V52 H199 V104 H143 V66 H184 V90 H156" fill="none" stroke={blue} strokeWidth="4"/>;
 if(id==='paper-target')return <g><circle cx="165" cy="78" r="27" fill="#f9e3b1"/><circle cx="165" cy="78" r="18" fill="none"/><circle cx="165" cy="78" r="8" fill={blue}/><circle cx="184" cy="91" r="5" fill="#f47f77"/></g>;
 if(id==='folded-fan')return <path d="M128 102 L137 50 L146 102 L155 50 L164 102 L173 50 L182 102 L191 50 L200 102 Z" fill="#f5c66b"/>;
 if(id==='paper-symmetry')return <g><path d="M165 45 V109" strokeDasharray="4 4"/><path d="M157 60 Q135 56 139 82 Q143 96 157 88 M173 60 Q195 56 191 82 Q187 96 173 88" fill="none" stroke={blue}/></g>;
 return <g><path d="M132 103 L160 48 L196 102 Z" fill="#f5c66b"/><path d="M160 48 L163 102" fill="none"/></g>;
}
export function GameVisual({family,step,baseId="",preview=false}:{family:string;step:number;baseId?:string;preview?:boolean}){
 const ink='#374754',pink='#f47f77',blue='#6b9bc4',green='#8dbd90',paper='#fffdf6',color=palette[family]||'#f8dcb4';
 return <svg viewBox="0 0 330 195" className="stage-svg" role="img" aria-label={`Illustrated ${family} game, ${['setup','taking a turn','checking the result'][step]}.`}>
 <rect x="0" y="0" width="330" height="195" rx="16" fill="#fff9ed"/><circle cx="165" cy="86" r="71" fill={color}/>
 <g stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="55" cy="76" r="17" fill="#f6c69f"/><path d="M30 139 Q32 104 55 104 Q78 104 80 139" fill={pink}/><path d={step===0?'M34 114 L22 126 M76 114 L90 126':'M34 114 L23 104 M76 114 L98 99'} fill="none"/>
 <circle cx="275" cy="76" r="17" fill="#be8d70"/><path d="M250 139 Q252 104 275 104 Q298 104 300 139" fill={blue}/><path d={step===2?'M253 114 L237 99 M297 114 L307 104':'M254 114 L242 126 M295 114 L307 126'} fill="none"/>
 <circle cx="50" cy="74" r="1.5" fill={ink} stroke="none"/><circle cx="60" cy="74" r="1.5" fill={ink} stroke="none"/><path d="M49 82 Q55 87 61 82" fill="none" strokeWidth="2"/>
 <circle cx="270" cy="74" r="1.5" fill={ink} stroke="none"/><circle cx="280" cy="74" r="1.5" fill={ink} stroke="none"/><path d="M269 82 Q275 87 281 82" fill="none" strokeWidth="2"/>
 {(family==='words'||family==='mime')&&<g><path d="M110 42 Q110 30 123 30 H208 Q221 30 221 43 V81 Q221 94 208 94 H155 L141 107 V94 H123 Q110 94 110 81Z" fill={paper}/>{family==='words'?<text x="166" y="72" textAnchor="middle" fill={ink} stroke="none" fontWeight="bold" fontSize="27">{step===0?'?':'Aa'}</text>:<><path d="M153 48 l14 -8 14 8 M167 43 v24 m-12 -11 12 6 12 -6 M167 67 l-10 13 m10 -13 10 13" fill="none"/><path d="M205 39 l-14 14" stroke={pink}/></>}</g>}
 {(family==='drawing'||family==='paper')&&<g><rect x="119" y="32" width="91" height="91" rx="7" fill={paper}/>{family==='drawing'?<><path d="M136 102 L177 59 L185 67 L144 110 Z" fill="#f4b66f"/>{step>0&&<path d="M130 75 q8 -17 21 -6 t23 -3" fill="none" stroke={blue}/>}</>:<><PaperPicture id={baseId} step={step} ink={ink} blue={blue}/></>}</g>}
 {(family==='memory'||family==='detective')&&<g>{family==='memory'?<><rect x="121" y="44" width="43" height="61" rx="6" fill={paper}/><rect x="168" y="44" width="43" height="61" rx="6" fill={paper}/>{step!==1&&<><circle cx="142" cy="74" r="10" fill={pink}/><path d="M179 82 l10 -20 10 20 Z" fill={green}/></>}{step===1&&<><text x="142" y="81" textAnchor="middle" fill={blue} stroke="none" fontSize="24">?</text><text x="189" y="81" textAnchor="middle" fill={blue} stroke="none" fontSize="24">?</text></>}</>:<><circle cx="161" cy="69" r="30" fill={paper}/><path d="M183 91 L207 115" strokeWidth="8"/><circle cx="157" cy="67" r="8" fill={pink}/></>}</g>}
 {family==='observation'&&<g><path d="M112 78 Q165 21 218 78 Q165 135 112 78Z" fill={paper}/><circle cx="165" cy="78" r="19" fill={blue}/><circle cx="165" cy="78" r="8" fill={ink}/></g>}
 {family==='story'&&<g><path d="M112 40 Q138 32 165 47 Q192 32 218 40 V112 Q192 104 165 119 Q138 104 112 112Z" fill={paper}/><path d="M165 47 V119" fill="none"/>{step>0&&<path d="M125 58 h25 M125 70 h25 M180 58 h25 M180 70 h25" fill="none"/>}</g>}
 {family==='rhythm'&&<g><path d="M160 45 V104 Q160 118 147 118 Q135 118 135 108 Q135 97 149 97 Q155 97 160 101 M160 45 L194 37 V90 Q194 104 181 104 Q169 104 169 94 Q169 83 183 83 Q189 83 194 87" fill={blue}/><path d="M160 45 L194 37" strokeWidth="7"/></g>}
 {family==='team'&&<g><path d="M116 49 H151 Q151 35 165 35 Q179 35 179 49 H214 V80 H201 Q201 94 187 94 Q173 94 173 80 H116Z" fill={green}/><path d="M116 80 H151 Q151 94 165 94 Q179 94 179 80 H214 V111 H116Z" fill={paper}/></g>}
 {step===2&&<g><circle cx="227" cy="42" r="17" fill="#bfe5b7"/><path d="M218 42 l6 7 12 -15" fill="none" stroke="#3a7853" strokeWidth="4"/></g>}
 </g>{!preview&&<text x="165" y="174" textAnchor="middle" fill={ink} fontSize="14" fontWeight="700">{['1 · Set up','2 · Take a turn','3 · Check the result'][step]}</text>}
 </svg>;
}
