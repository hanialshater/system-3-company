import assert from "node:assert/strict";
import {points,construct,leaves,splits} from "./model.ts";
const p=construct(points());assert.equal(splits(p),2);assert.equal(leaves(p).length,7);assert.equal(leaves(p).filter(n=>n.points.length).length,3);assert.equal(p.children[0].children[3].points[0].id,"B");assert.equal(p.children[3].points[0].id,"C");assert.equal(p.children[3].children.length,0);
const c=construct(points(true));assert.equal(splits(c),1);assert.equal(leaves(c).length,4);assert.equal(leaves(c).filter(n=>n.points.length).length,3);
const boundary=construct([{id:"A",x:1,y:1},{id:"B",x:4,y:4}]);assert.equal(boundary.children[3].points[0].id,"B");
for(const pt of [{id:"X",x:8,y:1},{id:"X",x:1,y:8},{id:"X",x:-1,y:1}])assert.throws(()=>construct([pt]));
const duplicate=construct([{id:"A",x:1,y:1},{id:"B",x:1,y:1}]);assert.equal(splits(duplicate),3);const overflow=leaves(duplicate).find(n=>n.overflow);assert.equal(overflow?.depth,3);assert.equal(overflow?.points.length,2);assert.equal(leaves(duplicate).flatMap(n=>n.points).length,2);
console.log("PASS quadtree primary/contrast, nested midpoint ownership, root boundary rejection, depth-three duplicate overflow");
