import test from "node:test";
import assert from "node:assert/strict";
import { readCamera, cameraOffset, cameraForOffset, zoomCamera } from "../../src/lib/world-camera.ts";
test("malformed and legacy snapshots remain a finite bounded navigation camera",()=>{
  for(const value of [undefined,null,{},[],"bad",{zoom:NaN,pan:Infinity}]) {const c=readCamera(value);assert.equal(c.zoom,1);assert.ok(Number.isFinite(c.pan));}
  assert.deepEqual(readCamera({zoom:-10,pan:2}),{zoom:1,pan:1});
  assert.deepEqual(readCamera({zoom:99,pan:-2}),{zoom:2,pan:0});
});
test("panning reaches both real canvas boundaries at baseline and after rotation",()=>{
  assert.equal(cameraOffset(cameraForOffset(1,500,390,1000),390,1000),0);
  assert.equal(cameraOffset(cameraForOffset(1,-900,390,1000),390,1000),-610);
  const camera=readCamera({zoom:1.5,pan:.6});
  assert.equal(cameraOffset(camera,390,1000),-666);
  assert.equal(cameraOffset(camera,844,1000),-393.59999999999997);
  assert.equal(cameraOffset(camera,2000,1000),0);
});
test("changing magnification preserves the content point under an off-centre pinch anchor",()=>{
  const camera={zoom:1.25,pan:.35}, width=390,canvas=1000,anchor=140;
  const before=(anchor-cameraOffset(camera,width,canvas))/camera.zoom;
  const zoomed=zoomCamera(camera,1.8,width,anchor,canvas);
  const after=(anchor-cameraOffset(zoomed,width,canvas))/zoomed.zoom;
  assert.ok(Math.abs(before-after)<1e-8);
  const reset=zoomCamera(zoomed,1,width,anchor,canvas);
  assert.ok(Math.abs(before-(anchor-cameraOffset(reset,width,canvas))/reset.zoom)<1e-8);
});
