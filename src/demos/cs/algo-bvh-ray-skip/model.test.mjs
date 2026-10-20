import assert from "node:assert/strict";
import {boxInterval,ray,test,triangles,triangleHit} from "./model.ts";
assert.deepEqual(test(),{interval:null,boxTests:1,triangleTests:0,hits:0});assert.deepEqual(test(true),{interval:[2,4],boxTests:1,triangleTests:2,hits:0});
assert.deepEqual(boxInterval({origin:[0,2],direction:[1,0]}),[2,4]);assert.equal(boxInterval({origin:[0,1],direction:[1,0]}),null);
assert.deepEqual(boxInterval({origin:[3,0],direction:[0,1]}),[2,4]);assert.equal(boxInterval({origin:[1,0],direction:[0,1]}),null);
assert.equal(boxInterval({origin:[0,3],direction:[-1,0]}),null);assert.deepEqual(boxInterval({origin:[0,6],direction:[1,-1]}),[2,4]);
assert.equal(triangleHit({origin:[0,4],direction:[1,0]},triangles[0]),true);assert.equal(triangleHit(ray(true),triangles[0]),false);assert.equal(triangleHit(ray(true),triangles[1]),false);
assert.equal(triangleHit({origin:[0,4],direction:[1,0]},[...triangles[0]].reverse()),true);
assert.ok(triangles.flat().every(([x,y])=>x>=2&&x<=4&&y>=2&&y<=4));console.log("PASS box primary/contrast, zero directions, closed tangency, negative t, triangle edge, winding, enclosure");
