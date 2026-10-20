export type Point = { id:string; x:number; y:number };
export const points = (contrast=false):Point[] => [{id:"A",x:1,y:1},{id:"B",x:2,y:7},{id:"C",x:3,y:6},{id:"D",x:contrast?4:8,y:2},{id:"E",x:9,y:5}];
export function split(input:Point[],axis:"x"|"y"="x",bounds=[0,10,0,8]) {
 if(!input.length) throw new Error("A split needs points");
 const sorted=[...input].sort((a,b)=>a[axis]-b[axis] || a.id.localeCompare(b.id));
 const m=Math.floor(sorted.length/2),pivot=sorted[m],left=sorted.slice(0,m),right=sorted.slice(m+1);
 const coordinate=pivot[axis];
 const areas=axis==="x"?[(coordinate-bounds[0])*(bounds[3]-bounds[2]),(bounds[1]-coordinate)*(bounds[3]-bounds[2])]:[(coordinate-bounds[2])*(bounds[1]-bounds[0]),(bounds[3]-coordinate)*(bounds[1]-bounds[0])];
 const leftBounds=[...bounds],rightBounds=[...bounds];
 if(axis==="x"){leftBounds[1]=coordinate;rightBounds[0]=coordinate;}else{leftBounds[3]=coordinate;rightBounds[2]=coordinate;}
 // Both conservative bounds include the split plane; rank alone assigns tied IDs.
 return {pivot,left,right,areas,coordinate,leftBounds,rightBounds};
}
