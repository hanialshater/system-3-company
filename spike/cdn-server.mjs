#!/usr/bin/env node
// SPIKE-001: a scratch "lesson CDN" on a second origin (default http://localhost:3141).
// Serves spike/dist with the headers a real CDN would need for sandboxed lesson frames:
//   - ACAO: * on scripts/styles/manifest (module scripts from an opaque-origin frame are CORS
//     requests with Origin: null, and they never carry credentials);
//   - immutable caching for content-hashed files, no-cache for the manifest (the only mutable file);
//   - frame-ancestors on frame documents so only the app may embed them (a meta CSP cannot);
//   - gzip when the client accepts it (sizes in the spike doc are measured, not assumed).
//
//   node spike/cdn-server.mjs [--port=3141] [--host-origin=http://localhost:3140] [--log]

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "dist");
const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, "").split("=")).map(([k, v]) => [k, v ?? true]));
const PORT = Number(args.port ?? process.env.SPIKE_CDN_PORT ?? 3141);
const HOST_ORIGIN = String(args["host-origin"] ?? process.env.SPIKE_HOST_ORIGIN ?? "http://localhost:3140");
const TYPES = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html; charset=utf-8", ".json": "application/json" };
const gzCache = new Map();

http
  .createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://x");
    const rel = path.normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, "");
    const file = path.join(ROOT, rel);
    if (args.log) console.log(`${req.method} ${url.pathname} origin=${req.headers.origin ?? "-"} cookie=${req.headers.cookie ? "PRESENT" : "-"}`);
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404, { "Access-Control-Allow-Origin": "*" }).end("not found");
      return;
    }
    const ext = path.extname(file);
    const hashed = /\.[0-9a-f]{64}\.(js|css|html)$/.test(file) || /\/[0-9a-f]{64}\.(js|html)$/.test(file);
    const headers = {
      "Content-Type": TYPES[ext] ?? "application/octet-stream",
      "Cache-Control": hashed ? "public, max-age=31536000, immutable" : "no-cache",
      "Access-Control-Allow-Origin": "*",
      "Cross-Origin-Resource-Policy": "cross-origin",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
      Vary: "Accept-Encoding",
    };
    if (ext === ".html") headers["Content-Security-Policy"] = `frame-ancestors ${HOST_ORIGIN}`;
    let body = fs.readFileSync(file);
    if (/\bgzip\b/.test(String(req.headers["accept-encoding"] ?? ""))) {
      const key = file + (hashed ? "" : fs.statSync(file).mtimeMs);
      if (!gzCache.has(key)) gzCache.set(key, zlib.gzipSync(body, { level: 9 }));
      body = gzCache.get(key);
      headers["Content-Encoding"] = "gzip";
    }
    headers["Content-Length"] = body.length;
    res.writeHead(200, headers).end(req.method === "HEAD" ? undefined : body);
  })
  .listen(PORT, () => console.log(`lesson CDN on http://localhost:${PORT} (frames embeddable by ${HOST_ORIGIN})`));
