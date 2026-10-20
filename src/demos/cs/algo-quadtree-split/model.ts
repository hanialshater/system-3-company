export type Point={id:string;x:number;y:number};
export type Cell={bounds:number[];depth:number;points:Point[];children:Cell[];overflow:boolean};
export const points=(contrast=false):Point[]=>[{id:"A",x:1,y:1},{id:"B",x:contrast?6:2,y:contrast?1:2},{id:"C",x:6,y:6}];
export function inside(p:Point,b:number[]){return p.x>=b[0]&&p.x<b[1]&&p.y>=b[2]&&p.y<b[3];}
export function construct(input:Point[],maxDepth=3,stopDepth=maxDepth):Cell {
 if(input.some(p=>!inside(p,[0,8,0,8])))throw new Error("Point outside half-open root");
 function build(ps:Point[],bounds:number[],depth:number):Cell{const node:Cell={bounds,depth,points:ps,children:[],overflow:ps.length>1};
 if(ps.length>1&&depth<maxDepth&&depth<stopDepth){const [x0,x1,y0,y1]=bounds,x=(x0+x1)/2,y=(y0+y1)/2;
 node.children=[[x0,x,y0,y],[x,x1,y0,y],[x0,x,y,y1],[x,x1,y,y1]].map(b=>build(ps.filter(p=>inside(p,b)),b,depth+1));node.overflow=false;}
 return node;}
 return build(input,[0,8,0,8],0);
}
export function leaves(cell:Cell):Cell[]{return cell.children.length?cell.children.flatMap(leaves):[cell];}
export function splits(cell:Cell):number{return cell.children.length?1+cell.children.reduce((n,c)=>n+splits(c),0):0;}
