/** One observable ordered-search comparison; ranges are inclusive. */
export interface LabelSearchStep {
  lo: number; hi: number; mid: number; value: string; target: string;
  verdict: "left" | "right" | "found"; keptLo: number; keptHi: number;
}
export function compareLabel(sorted: readonly string[],target: string,lo: number,hi: number): LabelSearchStep {
  if(lo<0||hi>=sorted.length||lo>hi) throw new RangeError("invalid candidate interval");
  const mid=Math.floor((lo+hi)/2),value=sorted[mid];
  const verdict=value===target?"found":value<target?"right":"left";
  return {lo,hi,mid,value,target,verdict,keptLo:verdict==="left"?lo:verdict==="right"?mid+1:mid,keptHi:verdict==="left"?mid-1:verdict==="right"?hi:mid};
}
/** Deliberately place the target last so the scan baseline is a disclosed hard case. */
export function shuffledLabels(count: number) {
  const sorted=Array.from({length:count},(_,i)=>String.fromCharCode(65+i));
  return {sorted,target:sorted[count-1],shuffled:[...sorted.slice(0,-1)].reverse().concat(sorted[count-1])};
}

export function scanLabels(labels: readonly string[],target: string) {
  const checked:string[]=[];
  for(const value of labels) {checked.push(value);if(value===target) return {checked,found:true};}
  return {checked,found:false};
}
