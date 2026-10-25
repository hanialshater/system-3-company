// Package selected immutable artifacts for static hosting; never upload the source Git/SQLite state.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const ROOT = path.resolve(new URL('../../../', import.meta.url).pathname);
const base = path.resolve(process.argv[2] ?? path.join(ROOT, 'artifacts/content-hub-deployment-final'));
const hostOrigin = process.argv[3];
if (!hostOrigin || new URL(hostOrigin).protocol !== 'https:' || new URL(hostOrigin).origin !== hostOrigin) throw new Error('Provide the exact HTTPS host origin');
const publications = JSON.parse(fs.readFileSync(path.join(base, 'publications.json'), 'utf8'));
const site = path.join(base, 'artifact-site');
const headers = [{ source: '/objects/(.*)', headers: [
  { key: 'Access-Control-Allow-Origin', value: '*' },
  { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Cache-Control', value: 'public,max-age=31536000,immutable' },
] }];
for (const p of publications) {
  const bytes = fs.readFileSync(path.join(site, p.framePath));
  const csp = bytes.toString().match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1];
  headers.push({ source: p.framePath, headers: [{ key: 'Content-Security-Policy', value: csp + `; frame-ancestors ${hostOrigin}; sandbox allow-scripts` }] });
}
fs.writeFileSync(path.join(site, 'vercel.json'), JSON.stringify({ version: 2, framework: null, headers }, null, 2));
const files=[];
function walk(dir) { for (const e of fs.readdirSync(dir,{withFileTypes:true})) {
  const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else {const bytes=fs.readFileSync(f);files.push({file:path.relative(site,f),size:bytes.length,sha:crypto.createHash('sha1').update(bytes).digest('hex')});}
} }
walk(site);
fs.writeFileSync(path.join(base,'upload-files.json'),JSON.stringify(files,null,2));
console.log(JSON.stringify({site,files:files.length,bytes:files.reduce((n,f)=>n+f.size,0),hostOrigin},null,2));
