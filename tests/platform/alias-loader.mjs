// Test-only module hooks so a node:test file can import server modules the way Next resolves them:
// "@/x" -> src/x(.ts|.tsx|/index.ts), "server-only" -> an empty module, and plain `import x from "./y.json"`.
// TypeScript itself is transpiled by tests/lifehacks/typescript-loader.mjs (registered by the test:platform script).
// Used by engagement-not-ranking.test.mjs (PRD-005 rule 2), registered from a child process only.
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { pathToFileURL, fileURLToPath } from "node:url";
import path from "node:path";

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../src");

export async function resolve(specifier, context, nextResolve) {
  if (specifier === "server-only") return { url: "data:text/javascript,export {};", shortCircuit: true };
  if (specifier.startsWith("@/")) {
    const base = path.join(SRC, specifier.slice(2));
    for (const c of [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts")]) {
      if (existsSync(c) && !c.endsWith(path.sep) && path.extname(c)) return { url: pathToFileURL(c).href, shortCircuit: true };
    }
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.startsWith("file:") && url.endsWith(".json")) {
    const text = await readFile(new URL(url), "utf8");
    return { format: "module", shortCircuit: true, source: `export default ${text};` };
  }
  return nextLoad(url, context);
}
