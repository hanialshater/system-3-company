// Original schematic story geometry on pinned Natural Earth modern coastlines.
// node tools/generate-history-story-maps.mjs [/path/to/ne_50m_land.geojson]
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {geoMercator,geoNaturalEarth1,geoPath,geoGraticule} from 'd3-geo';
const collection=JSON.parse(await fs.readFile('content/history-stories/collection.json','utf8'));
const pin=JSON.parse(await fs.readFile('content/history-locators.json','utf8')).sources['natural-earth-land'];
const bytes=process.argv[2]?await fs.readFile(process.argv[2]):Buffer.from(await(await fetch(pin.url)).arrayBuffer());
if(createHash('sha256').update(bytes).digest('hex')!==pin.sha256)throw Error('Natural Earth source changed');
const land=JSON.parse(bytes);
function outline(projection,geometry) {
 let out='',p=[];
 const end=(closed=false)=>{if(p.length>1){let kept=[p[0]];for(let i=1;i<p.length;i++){const a=kept.at(-1),b=p[i];if(i===p.length-1||(a[0]-b[0])**2+(a[1]-b[1])**2>.65**2)kept.push(b);}out+=kept.map(([x,y],i)=>`${i?'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('')+(closed?'Z':'');}p=[];};
 geoPath(projection).context({moveTo(x,y){end();p.push([x,y]);},lineTo(x,y){p.push([x,y]);},closePath(){end(true);}})(geometry);end();return out;
}
for(const entry of collection){
 const dir=`src/demos/history/${entry.slug}`,s=JSON.parse(await fs.readFile(`${dir}/story.json`,'utf8'));
 const center=s.center??0;
 const unwrap=x=>{while(x-center>180)x-=360;while(x-center< -180)x+=360;return x;};
 const coords=s.nodes.map(n=>[unwrap(n.coordinates[0]),n.coordinates[1]]);
 const xs=coords.map(p=>p[0]),ys=coords.map(p=>p[1]);
 const cx=(Math.min(...xs)+Math.max(...xs))/2,cy=(Math.min(...ys)+Math.max(...ys))/2;
 const dx=Math.max(.07,(Math.max(...xs)-Math.min(...xs))*1.3),dy=Math.max(.045,(Math.max(...ys)-Math.min(...ys))*1.4);
 const proj=s.world?geoNaturalEarth1().fitExtent([[10,15],[350,177]],{type:'Sphere'}):geoMercator().rotate([-cx,0]).center([0,cy]).fitExtent([[35,32],[325,163]],{type:'MultiPoint',coordinates:[[cx-dx/2,cy-dy/2],[cx+dx/2,cy+dy/2]]}).clipExtent([[0,0],[360,190]]);
 const path=geoPath(proj).digits(1);
 const nodes=s.nodes.map(n=>{const [x,y]=proj(n.coordinates);const right=x<275;return{id:n.id,x:+x.toFixed(1),y:+y.toFixed(1),labelX:+(x+(right?9:-9)).toFixed(1),labelY:+Math.max(28,y-9).toFixed(1),anchor:right?'start':'end'};});
 // Labels within each visible frame must not collide. Keep river/coast geography unchanged.
 for(const f of s.frames){const active=nodes.filter(n=>f.active.includes(n.id));for(let i=0;i<active.length;i++)for(let j=i+1;j<active.length;j++)if(Math.abs(active[i].x-active[j].x)<85&&Math.abs(active[i].labelY-active[j].labelY)<18){active[j].labelY=Math.min(177,active[i].labelY+20);}}
 const edges=s.edges.map(e=>{let points=[];for(let i=0;i<e.nodes.length;i++){const v=e.nodes[i];if(typeof v==='string'){const n=s.nodes.find(n=>n.id===v);if(!n)throw Error('Missing node '+v);points.push(n.coordinates);}else{points.push([v,e.nodes[++i]]);}}return{frame:e.frame,path:points.length>1?path({type:'LineString',coordinates:points}):'',kind:e.kind??'link'};});
 const map={land:outline(proj,land),grid:path(geoGraticule().step([dx<15?2:20,dy<10?2:15])()),river:s.river?path({type:'LineString',coordinates:s.river}):'',nodes,edges};
 for(const n of nodes)if(n.x<0||n.x>360||n.y<0||n.y>190)throw Error(`Off map: ${entry.slug}/${n.id}`);
 await fs.writeFile(`${dir}/map.json`,JSON.stringify(map)+'\n');
}
console.log(`Generated ${collection.length} story maps from pinned Natural Earth.`);
