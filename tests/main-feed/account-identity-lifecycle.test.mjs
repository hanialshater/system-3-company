import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
// Production account-client with its existing progress boundary and actual EventTarget; synthetic accounts only.
async function world(){
 const store=new Map(),calls=[];
 globalThis.__accountStore=store;globalThis.__accountSink=null;
 const windowTarget=new EventTarget();windowTarget.localStorage={getItem:key=>store.get(key)??null,setItem:(key,value)=>store.set(key,String(value)),removeItem:key=>store.delete(key)};globalThis.window=windowTarget;
 const me=tag=>tag?{signedIn:true,tag,email:`${tag}@example.test`,ageBand:'16+',likesSaves:false,canLike:false}:{signedIn:false,likesSaves:false};
 let current=me('a'),delayedMe=null,delayedPut=null;
 globalThis.fetch=async(path,init={})=>{calls.push({path,init});if(path==='/api/account/me'){if(delayedMe){const pending=delayedMe;delayedMe=null;return pending;}return new Response(JSON.stringify(current));}if(path==='/api/account/progress'&&init.method==='PUT'&&delayedPut)return delayedPut;if(path==='/api/account/progress')return new Response(JSON.stringify({progress:current.signedIn&&current.tag==='a'?{'a-due':{completedAt:1,recalls:[]}}:{}}));throw Error(`unhandled ${path}`);};
 store.set('s3c:account-device:v1',JSON.stringify({answer:'nothing',account:'a',own:{}}));store.set('s3c:progress:v1',JSON.stringify({'a-due':{completedAt:1,recalls:[]}}));
 const progress='data:text/javascript,'+encodeURIComponent('export const loadProgress=()=>JSON.parse(globalThis.__accountStore.get("s3c:progress:v1")||"{}");export const setProgressSink=sink=>{globalThis.__accountSink=sink};');
 const code=ts.transpileModule(fs.readFileSync('src/lib/account-client.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText.replace(/['"]@\/kit\/progress['"]/,JSON.stringify(progress));
 const client=await import('data:text/javascript;base64,'+Buffer.from(code+`\n// ${Math.random()}`).toString('base64'));
 return {client,store,calls,setAccount:tag=>{current=me(tag);},delayMe:promise=>{delayedMe=promise;},delayPut:promise=>{delayedPut=promise;},me};
}
test('fresh A to B identity restores anonymous context and B empty history excludes A due',async()=>{const w=await world();await w.client.startAccountSync();assert.ok(JSON.parse(w.store.get('s3c:progress:v1'))['a-due']);w.setAccount('b');assert.equal((await w.client.accountMe(true)).tag,'b');await w.client.accountState();assert.deepEqual(JSON.parse(w.store.get('s3c:progress:v1')),{});assert.equal(JSON.parse(w.store.get('s3c:account-device:v1')).account,'b');});
test('fresh A to signedout clears account history without a preference-on requirement',async()=>{const w=await world();await w.client.startAccountSync();w.setAccount(null);assert.equal((await w.client.accountMe(true)).signedIn,false);await w.client.accountState();assert.deepEqual(JSON.parse(w.store.get('s3c:progress:v1')),{});assert.equal(w.store.has('s3c:account-device:v1'),false);assert.equal(globalThis.__accountSink,null);});
test('late earlier A me response resolves to newest B rather than republishing A',async()=>{const w=await world();await w.client.startAccountSync();let release;w.delayMe(new Promise(resolve=>release=resolve));const old=w.client.accountMe(true);w.setAccount('b');await w.client.accountMe(true);release(new Response(JSON.stringify(w.me('a'))));assert.equal((await old).tag,'b');assert.equal((await w.client.accountMe()).tag,'b');});
test('failed late A progress PUT is never replayed through the B sink',async()=>{const w=await world();await w.client.startAccountSync();let release;w.delayPut(new Promise(resolve=>release=resolve));globalThis.__accountSink('a-answer',{recalls:[]},{completedAt:1,recalls:[]});w.setAccount('b');await w.client.accountMe(true);await w.client.accountState();release(new Response(null,{status:503}));await new Promise(resolve=>setImmediate(resolve));window.dispatchEvent(new Event('online'));await new Promise(resolve=>setImmediate(resolve));const writes=w.calls.filter(call=>call.init.method==='PUT');assert.equal(writes.length,1);assert.equal(writes[0].init.headers['x-s3c-account'],'a');});
