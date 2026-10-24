import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import crypto from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { ContentHub } from './hub.mjs';
import { seed } from './fixtures.mjs';

const exec = promisify(execFile);
const listen = (server, port) => new Promise((resolve, reject) => {
  server.once('error', reject); server.listen(port, '127.0.0.1', () => resolve(`http://127.0.0.1:${server.address().port}`));
});
const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const json = (res, status, data) => {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data));
};
async function body(req) {
  let text = '';
  for await (const chunk of req) { text += chunk; if (Buffer.byteLength(text) > 2 * 1024 * 1024) throw new Error('Request too large'); }
  return JSON.parse(text);
}
export async function startPrototype({ root = path.join(os.tmpdir(), 's3-content-hub-preview'), port = 0, assetPort = 0 } = {}) {
  const hub = new ContentHub(root), token = crypto.randomBytes(24).toString('hex');
  let working = false, hostOrigin;
  if (!hub.db.prepare('SELECT id FROM spaces WHERE id=?').get('research')) seed(hub);
  const assets = http.createServer((req, res) => {
    try {
      const url = new URL(req.url, assetOrigin);
      const match = /^\/objects\/([a-z0-9-]+)\/([a-f0-9]{64})\/(.+)$/.exec(decodeURIComponent(url.pathname));
      if (!match || req.method !== 'GET') return json(res, 404, { error: 'Not found' });
      const [, space, hash, file] = match, manifest = hub.artifact(space, hash);
      if (!Object.hasOwn(manifest.files, file)) return json(res, 404, { error: 'Unknown object file' });
      const bytes = fs.readFileSync(path.join(hub.root, 'objects', space, hash, file));
      res.writeHead(200, {
        'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*', 'X-Content-Type-Options': 'nosniff',
        ETag: `"${manifest.files[file].sha256}"`,
      }); res.end(bytes);
    } catch (error) { json(res, 404, { error: error.message }); }
  });
  const assetOrigin = await listen(assets, assetPort);
  const host = http.createServer(async (req, res) => {
    try {
      if (req.headers.host !== new URL(hostOrigin).host) return json(res, 403, { error: 'Invalid host' });
      const url = new URL(req.url, hostOrigin);
      if (req.method === 'POST') {
        if (req.headers.origin && req.headers.origin !== hostOrigin) return json(res, 403, { error: 'Invalid origin' });
        if (req.headers.authorization !== `Bearer ${token}`) return json(res, 403, { error: 'Local control token required' });
        if (url.pathname === '/api/work') {
          if (working) return json(res, 409, { error: 'Worker already running' });
          working = true;
          try {
            const { stdout } = await exec(process.execPath, [new URL('./worker.mjs', import.meta.url).pathname, root], {
              timeout: 120000, maxBuffer: 2 * 1024 * 1024, env: { PATH: process.env.PATH, NODE_ENV: 'test' },
            });
            return json(res, 200, JSON.parse(stdout));
          } finally { working = false; }
        }
        const data = await body(req);
        if (url.pathname === '/api/write') return json(res, 200, hub.write('research', data));
        if (url.pathname === '/api/publish') return json(res, 200, hub.publish('research', data.demo, data.job, data));
        return json(res, 404, { error: 'Not found' });
      }
      if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });
      if (url.pathname === '/api/state') {
        const head = hub.head('research'), sources = Object.fromEntries(hub.snapshot('research', head));
        return json(res, 200, {
          head, jobs: hub.jobs('research'), working,
          publications: ['alpha', 'beta'].map(demo => hub.publication('research', demo)),
          sources, assetOrigin,
        });
      }
      const frame = /^\/frame\/(alpha|beta)$/.exec(url.pathname);
      if (frame) {
        const published = hub.publication('research', frame[1]);
        if (!published) return json(res, 404, { error: 'Not published' });
        const manifest = hub.artifact('research', published.artifact);
        const script = `import { mount } from ${JSON.stringify(`${assetOrigin}/objects/research/${published.artifact}/${manifest.entry}`)}; mount(document.getElementById('demo'));`;
        const digest = crypto.createHash('sha256').update(script).digest('base64');
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store',
          'Content-Security-Policy': `sandbox allow-scripts; default-src 'none'; script-src ${assetOrigin} 'sha256-${digest}'; style-src 'unsafe-inline'; connect-src 'none'; frame-ancestors ${hostOrigin}; base-uri 'none'; form-action 'none'`,
        });
        return res.end(`<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(frame[1])}</title><main id="demo"></main><script type="module">${script}</script>`);
      }
      if (url.pathname !== '/') return json(res, 404, { error: 'Not found' });
      const html = fs.readFileSync(new URL('./preview.html', import.meta.url), 'utf8').replace('__LOCAL_TOKEN__', token);
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store',
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
        'X-Content-Type-Options': 'nosniff',
      }); res.end(html);
    } catch (error) { json(res, 400, { error: error.message }); }
  });
  try { hostOrigin = await listen(host, port); }
  catch (error) { assets.close(); hub.close(); throw error; }
  return { hub, token, hostOrigin, assetOrigin, close: async () => {
    await Promise.all([new Promise(resolve => host.close(resolve)), new Promise(resolve => assets.close(resolve))]); hub.close();
  } };
}
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const server = await startPrototype({ root: process.argv[2], port: Number(process.env.CONTENT_HUB_PORT ?? 4310) });
  console.log(`Content hub preview: ${server.hostOrigin}\nArtifact origin: ${server.assetOrigin}\nState: ${server.hub.root}`);
  for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, async () => { await server.close(); process.exit(0); });
}
