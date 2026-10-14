/** Pure, deterministic household models. No global state, network or rendering imports. */
import type { HomeV2Fields } from './engine-v2';
/** v2 fields (engine-v2.ts) are optional; a spec without `engine: 2` renders as v1. */
export interface HomeSpec extends HomeV2Fields {
  slug: string; title: string; hook: string; concept: string; model: string; view: string;
  initial: number; min: number; max: number; step: number; values: number[];
  choices: string[]; question: string; idea: string; limit: string; formula: string;
  /** Safety-required reveal line (lifehacks-safety-reviewer record). */
  warning?: string;
  recall: string; source: string | null; answer: number; unit: string; inputLabel: string;
}
export interface HomeResult { value: number; other: number; label: string; unit: string; inputs: string; }
export const fmt = (n: number, digits = 2) => Number(n.toFixed(digits)).toLocaleString('en-US');

export function evaluateHome(s: HomeSpec, p: number, changed: boolean): HomeResult {
  const [a = 1, b = 1, c = 1, d = 1] = s.values;
  let value = 0, other = 0, label = 'Result', unit = '', inputs = '';
  switch (s.model) {
    case 'dry': {
      const layers = changed ? 1 : b; other = 2 * p * a / 10000 / layers;
      value = c / (other * d); label = 'Model time'; unit = 'h';
      inputs = `${fmt(p)}×${a}cm · ${layers}layers · ${c}kg · flux=${fmt(d,3)}`; break;
    }
    case 'wobble': value = a * Math.cos(2 * p * Math.PI / 180); other = p; label = 'Signed gap'; unit = 'mm'; inputs = `Equal legs · smooth ground · amplitude=${a}mm`; break;
    case 'bow': value = Math.max(0, a - p * (changed ? c : b)); other = Math.max(0,a-p*b); label = 'Model loop'; unit = 'mm'; inputs = `${a}mm initial · ${b}/${c}mm/step`; break;
    case 'cord': value = Math.floor(p / 100 / (Math.PI * a / 100)); other = changed ? 0 : 1; label = 'Drawn loops'; unit = ''; inputs = `Coil diameter=${a}cm · ${changed?'secured':'loose'} end`; break;
    case 'swing': other = changed ? p + 10 : a; value = other - p; label = 'Radial margin'; unit='cm'; inputs = `Door=${fmt(p)}cm · basket radius=${fmt(other)}cm`; break;
    case 'fit': other=changed?b:a; value=p-other; label='Clearance'; unit='cm'; inputs=`Object=${a}×${b}cm`; break;
    case 'diagonal': other=changed?Math.hypot(p,a):p; value=other-b; label='Length margin';unit='cm';inputs=`${fmt(p)}×${a}cm · rod=${b}cm`;break;
    case 'clearance': other=changed?a+2*b:a;value=p-other;label='Clearance';unit='cm';inputs=`Body=${a}cm · handles=2×${b}cm`;break;
    case 'divider': other=changed?(a-1)*b:0;value=(p-other)/a;label='Compartment';unit='cm';inputs=`${a}compartments · wall=${b}cm`;break;
    case 'gridfit': other=changed?c:b;value=Math.floor(p/other)*Math.floor(a/(changed?b:c));label='Fit count';unit='blocks';inputs=`Bag=${fmt(p)}×${a}cm · block=${b}×${c}cm`;break;
    case 'pairpack': other=changed?a+b:2*a;value=p-other;label='Width margin';unit='cm';inputs=`Toe=${a}cm · heel=${b}cm`;break;
    case 'hollow': other=changed?Math.max(0,p-a):p;value=b+other;label='Outer envelope';unit='cm³';inputs=`Shoe=${b}cm³ · hollow=${a}cm³`;break;
    case 'inner-volume': value=changed?(p-2*c)*(a-2*c)*(b-2*c):p*a*b;other=p*a*b;label=changed?'Usable volume':'Outer volume';unit='cm³';inputs=`${fmt(p)}×${a}×${b}cm · wall=${c}cm`;break;
    case 'conserve': value=p*a*b*c;other=changed?1:0;label='Material volume';unit='cm³';inputs=`Each=${a}×${b}×${c}cm`;break;
    case 'layers': other=changed?2*b:b;value=p*a*other;label='Stack height';unit='cm';inputs=`Sheet=${a}cm · ${other}layers`;break;
    case 'visibility': value=changed?p:1;other=p-value;label='Visible edges';unit='';inputs=`${fmt(p)}shirts · ${changed?'standing':'stacked'}`;break;
    case 'access': value=changed?0:p-1;other=p;label='Removals';inputs=`${fmt(p)}layers · target=${changed?'top':'bottom'}`;break;
    case 'reverse-order': value=changed?0:p-1;other=p;label='First blockers';inputs=`Use order 1→${fmt(p)}`;break;
    case 'torque': other=changed?b:a;value=p*9.81*other/100;label='Static moment';unit='N·m';inputs=`g=9.81m/s² · offset=${other}cm`;break;
    case 'balance': value=changed?0:(-b*p+b*a)/(p+a);other=changed?(p+a)/2:p;label='Load centre';unit='cm';inputs=`Positions=±${b}cm · other=${a}kg`;break;
    case 'weight-limit': value=Math.max(0,p+a-b);other=p+a;label=changed?'Over limit':'Unchecked mass';unit='kg'; if(!changed)value=other; inputs=`Base=${a}kg · example limit=${b}kg`;break;
    case 'exposed': value=2*p*a/10000*(changed?1:b);other=changed?1:b;label='Exposed faces';unit='m²';inputs=`${fmt(p)}×${a}cm · exposed=${fmt(other*100)}%`;break;
    case 'gaps': value=changed?Math.max(0,(p-a*b)/(a-1)):0;other=changed&&value>0?a-1:0;label='Clear gap';unit='cm';inputs=`${a}items×${b}cm · ${other}channels`;break;
    case 'overlap': other=changed?0:p;value=4*a*b-2*other*b;label='Exposed faces';unit='cm²';inputs=`2×${a}×${b}cm · overlap=${other}cm`;break;
    case 'water-load': value=a*(changed?p:1);other=p;label='Released water';unit='g';inputs=`${a}g/item · ${b}m³room`;break;
    case 'humidity': other=changed?Math.max(0,p-30):p;value=1-other/100;label='Normalised gap';inputs=`Same temperature · RH=${fmt(other)}%`;break;
    case 'flux': other=changed?a:b;value=p*other;label='Model rate';unit='units/step';inputs=`Flux=${other}units/(m²·step)`;break;
    case 'water-time': other=changed?2*p:p;value=other/a;label='Model duration';unit='steps';inputs=`Water=${fmt(other)}g · rate=${a}g/step`;break;
    case 'split-area': value=2*p*a/10000;other=changed?2:1;label='Both-face area';unit='m²';inputs=`${fmt(p)}×${a}cm · ${other}pieces`;break;
    case 'support-load': other=changed?b:a;value=p/other;label='Load per point';unit='g-equivalent';inputs=`${other}supports · equal sharing`;break;
    case 'area-volume': other=changed?2*p:p;value=2/(other/10);label='Face/volume';unit='cm⁻¹';inputs=`${a}×${b}cm · thickness=${fmt(other)}mm`;break;
    case 'nest': value=changed?a+(p-1)*b:p*a;other=p;label='Envelope height';unit='cm';inputs=`Pocket=${a}cm · layer=${b}cm`;break;
    case 'group-access': value=changed?1:Math.min(p,a);other=p;label='Location visits';inputs=`Set=${a}pieces · ${fmt(p)}places`;break;
    case 'pair-search': value=changed?Math.ceil(p/a)-1:p-1;other=p;label='Candidates';inputs=`${a}pattern bins · equal groups`;break;
    case 'combinations': other=2*Math.floor(p/2);value=changed?Math.floor(other/2):other*(other-1)/2;label='Candidate pairs';inputs=`${other}socks · ${changed?'unique marks':'unmarked'}`;break;
    case 'trips': value=2*a*(changed?1:p);other=changed?1:p;label='Travel';unit='m';inputs=`Route=${a}m one-way · ${other}trips`;break;
    case 'contain': value=changed?p:0;other=p;label='Contained items';inputs='Ideal closed mesh · items exceed openings';break;
    case 'label-rule': value=changed?p:0;other=p;label='Compatible items';inputs='Garment instruction: flat dry';break;
    case 'label-face': value=changed?p:0;other=p;label='Visible addresses';inputs='Opaque boxes · front viewpoint';break;
    case 'transparent': value=changed?1:0;other=p;label='Visible target';inputs='Orange target · ideal clear front';break;
    case 'end-paths': value=changed?0:2*p;other=p;label='Accessible ends';inputs=`${fmt(p)}cords · two ends each`;break;
    case 'loop-release': value=changed?0:1;other=p;label='Drawn crossing';inputs=`Loop travel=${a}cm · end=${fmt(p)}cm`;break;
    case 'coil-radius': other=changed?2*p:p;value=1/other;label='Curvature';unit='cm⁻¹';inputs=`Length=${a}cm · radius=${fmt(other)}cm`;break;
    case 'handle-envelope': other=changed?a+b:a;value=Math.floor(p/other);label='Row count';unit='cups';inputs=`Body=${a}cm · handle=${b}cm`;break;
    case 'circle-fit': value=Math.floor(p/a)**2;other=a;label='Grid count';unit='discs';inputs=`Diameter=${a}cm · square grid`;break;
    case 'circle-area': other=changed?Math.PI*(p/2)**2:p*p;value=p*p-other;label='Unused area';unit='cm²';inputs=`Square=${fmt(p)}cm · ${changed?'inscribed circle':'square insert'}`;break;
    case 'nested-wall': value=changed?a+(p-1)*b:p*a;other=p;label='Stack height';unit='cm';inputs=`Bin=${a}cm · rim=${b}cm`;break;
    case 'flat-pack': value=changed?a*b*c*p:a*b*b;other=c;label='Outer envelope';unit='cm³';inputs=`4 panels ${a}×${b} + 2 panels ${b}×${b} · t=${fmt(p)}cm`;break;
    case 'rug-clearance': value=changed?p+2*a:p;other=a;label='Rug width';unit='cm';inputs=`Table=${fmt(p)}cm · pullback=${a}cm/side`;break;
    case 'shelf-height': other=changed?a+b:p;value=other-a;label='Unused height';unit='cm';inputs=`Box=${a}cm · hand allowance=${b}cm`;break;
    case 'reach': value=changed?Math.max(0,p-a):p;other=changed?a:0;label='Horizontal reach';unit='cm';inputs=`Travel=${fmt(other)}cm · depth=${fmt(p)}cm`;break;
    case 'distance-use': value=changed?0:2*p*a;other=a;label='Walking route';unit='m';inputs=`${a}uses · distance=${fmt(p)}m`;break;
    case 'known-address': value=changed?1:p;other=p;label='Worst-case checks';inputs=`${fmt(p)}boxes · ${changed?'known':'unknown'}address`;break;
    case 'two-stations': value=changed?0:p*a;other=changed?2:1;label='Shuttle travel';unit='m';inputs=`${a}transfers · ${other}tools`;break;
    case 'address-specific': value=changed?1:Math.ceil(p/a);other=p;label='Candidate boxes';inputs=`${a}categories · ${fmt(p)}boxes`;break;
    case 'binary-search': value=changed?Math.floor(Math.log2(p))+1:p;other=p;label='Worst-case comparisons';inputs=`${fmt(p)}distinct labels · ${changed?'sorted':'unsorted'}`;break;
    case 'weighted-access': value=(p-1)*(changed?a:b);other=p;label='Total removals';inputs=`Frequent=${b}uses · rare=${a}use`;break;
    case 'diameter-match': other=changed?p:b;value=Math.abs(p-other);label='Diameter mismatch';unit='cm';inputs=`Opening=${fmt(p)}cm · lid=${fmt(other)}cm`;break;
    case 'nest-access': value=changed?0:p-1;other=p;label='Target blockers';inputs=`${fmt(p)}boxes · target=${changed?'separate':'inner'}`;break;
    case 'tolerance': value=changed?(p-b)-(a+b):p-a;other=changed?2*b:0;label='Clearance';unit='cm';inputs=`Insert=${a}cm · each bound=±${b}cm`;break;
    case 'box-area': value=changed?2*(p*a+p*b+a*b):p*a;other=p;label='Paper lower bound';unit='cm²';inputs=`Box=${fmt(p)}×${a}×${b}cm`;break;
    case 'ribbon': value=2*(p+b)+c+(changed?2*(a+b):0);other=p;label='Ribbon length';unit='cm';inputs=`Box=${fmt(p)}×${a}×${b}cm · bow=${c}cm`;break;
    case 'mark-error': value=changed?b:p*b;other=p*a;label='Last-mark error';unit='cm';inputs=`Pitch=${a}cm · bias=${b}cm`;break;
    case 'square-test': { const co=changed?0:Math.cos(70*Math.PI/180);value=Math.sqrt(a*a+p*p+2*a*p*co);other=Math.sqrt(a*a+p*p-2*a*p*co);label='Diagonal difference';value-=other;unit='cm';inputs=`Sides=${a}/${fmt(p)}cm · angle=${changed?90:70}°`;break; }
    case 'ruler-offset': value=changed?p-a:p;other=a;label='Reported length';unit='cm';inputs=`Start=${a}cm · end=${fmt(p)}cm`;break;
    case 'inside-width': other=changed?p-2*a:p;value=other-b;label='Fit margin';unit='cm';inputs=`Wall=2×${a}cm · insert=${b}cm`;break;
    case 'conversion': value=p/(changed?a:b);other=Math.abs(p/b-p/a);label='Converted length';unit='in';inputs=`1in=${changed?a:b}cm ${changed?'exact':'approx'}`;break;
    case 'cut-allowance': value=changed?p+2*a:p;other=p;label='Blank width';unit='cm';inputs=`Face=${fmt(p)}cm · folds=2×${a}cm`;break;
    case 'aspect-fit': { const scale=Math.min(p/b,a/c);other=changed?b*scale:p;value=changed?p*a-b*c*scale*scale:0;label='Empty frame area';unit='cm²';inputs=`Frame=${fmt(p)}×${a}cm · photo=${b}:${c}`;break; }
    case 'pressure': other=changed?b:a;value=p*9.81/(other/10000);label='Average pressure';unit='Pa';inputs=`g=9.81m/s² · area=${other}cm²`;break;
    default: throw new Error(`Unknown household model: ${s.model}`);
  }
  return {value, other, label, unit, inputs};
}

/** Fixed pseudo-random generator for source-conditioned demonstrations, not household predictions. */
export function sourceConditionedCordTrials(probability: number, count = 20, seed = 17): boolean[] {
  if(probability<0||probability>1||!Number.isInteger(count)||count<1) throw new Error('Invalid trials');
  let x=seed>>>0;
  return Array.from({length:count},()=>{
    x=(Math.imul(1664525,x)+1013904223)>>>0;
    return x/4294967296<probability;
  });
}

/** Physical dimensions share one SVG scale; leftover strips remain too narrow for another item. */
export function rectangularPackingScene(width: number, height: number, itemWidth: number, itemHeight: number) {
  const scale=Math.min(230/width,170/height), x=(300-width*scale)/2, y=30;
  const columns=Math.floor(width/itemWidth), rows=Math.floor(height/itemHeight);
  return {x,y,scale,width:width*scale,height:height*scale,columns,rows,
    items:Array.from({length:columns*rows},(_,i)=>({x:x+(i%columns)*itemWidth*scale,y:y+Math.floor(i/columns)*itemHeight*scale,width:itemWidth*scale,height:itemHeight*scale}))};
}

/** Geometry used by the actual ruler SVG. Endpoints and all marks are derived from centimetres. */
export function homeRulerScene(spec: HomeSpec, p: number, after: boolean) {
  const [a=1,b=1]=spec.values;
  const offset=spec.model==='ruler-offset', mark=spec.model==='mark-error', cut=spec.model==='cut-allowance';
  const max=offset?25:mark?105:cut?35:40;
  const scale=offset?12.5:250/max, zero=25;
  const start=offset?a:0;
  const end=offset?p:mark?p*a+(after?b:p*b):cut?p+(after?2*a:0):p;
  return {max,scale,zero,viewWidth:offset?350:300,start,end,
    objectStart:zero+start*scale,objectEnd:zero+end*scale,
    measureStart:zero+(offset&&after?start:0)*scale,measureEnd:zero+end*scale,
    folds:cut&&after?[zero+a*scale,zero+(a+p)*scale]:[],
    marks:mark?Array.from({length:Math.round(p)},(_,i)=>({target:zero+(i+1)*a*scale,actual:zero+((i+1)*a+(after?b:(i+1)*b))*scale})):[]};
}

/**
 * Geometry for the plain-cord stage (view 'cord', W-358). Before this, Scene had no cord branch and these
 * lessons drew the default box. Counts match evaluateHome: drawn free ends = 2 x cords loose, 0 secured;
 * drawn crossings = 1 or 0; coil radius and turns use the model's radius and declared length.
 * Plain cord only: no plug, device, power or stretch is drawn.
 */
export function homeCordScene(spec: HomeSpec, p: number, after: boolean) {
  const [a = 1] = spec.values;
  if (spec.model === 'end-paths') {
    const cords = Math.max(1, Math.round(p)), mid = 120;
    const strands = Array.from({ length: cords }, (_, i) => {
      const k = i - (cords - 1) / 2, tight = mid + k * 5;
      if (after) return { d: `M50,${tight}H250`, ends: [] as { x: number; y: number }[] };
      const left = mid + k * (110 / Math.max(1, cords - 1)) * (cords > 1 ? 1 : 0);
      const right = mid + k * (100 / Math.max(1, cords - 1)) * (cords > 1 ? 1 : 0) + (i % 2 ? 9 : -9);
      return { d: `M30,${left}C90,${left} 105,${tight} 150,${tight}S215,${right} 270,${right}`, ends: [{ x: 30, y: left }, { x: 270, y: right }] };
    });
    const span = (cords - 1) * 5 + 14;
    const ties = (after ? [50, 150, 250] : [150]).map(x => ({ x: x - 6, y: mid - span / 2, width: 12, height: span }));
    return { kind: 'end-paths' as const, strands, ties, ends: strands.flatMap(s => s.ends) };
  }
  if (spec.model === 'loop-release') {
    const scale = 3, start = 190, end = start + p * scale;
    const cord = after ? `M24,150H${end}` : `M24,150H110L170,100A30,30 0 1 0 130,100L190,150H${end}`;
    return { kind: 'loop-release' as const, cord, end, start, scale, travel: a * scale,
      // The two diagonals (110,150)-(170,100) and (130,100)-(190,150) meet at x=150, y=350/3 (about 116.7).
      crossings: after ? [] : [{ x: 150, y: 350 / 3 }] };
  }
  if (spec.model === 'coil-radius') {
    const radius = after ? 2 * p : p, scale = 95 / 40, r = radius * scale;
    const turns = a / (2 * Math.PI * radius), whole = Math.min(7, Math.floor(turns)), part = turns - Math.floor(turns);
    const cx = 140, cy = 120;
    const loops = Array.from({ length: whole }, (_, i) => ({ cx: cx + i * 3, cy, r }));
    const angle = 2 * Math.PI * part, ox = cx + whole * 3;
    const partial = part > 0.01 && whole < 7
      ? `M${ox + r},${cy}A${r},${r} 0 ${angle > Math.PI ? 1 : 0} 1 ${ox + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
      : '';
    return { kind: 'coil-radius' as const, cx, cy, r, radius, turns, loops, partial };
  }
  return null;
}
