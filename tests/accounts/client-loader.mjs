// Test-only module hooks for client-sync.test.mjs: "@/x" resolves to src/x.ts, and a module imported as
// "file.ts?load=N" passes its "?load=N" on to what it imports, so each simulated page load gets fresh copies of
// src/lib/account-client.ts and src/kit/progress.ts (their module state is per page in a browser).
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../src");

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const base = path.join(SRC, specifier.slice(2));
    for (const c of [`${base}.ts`, `${base}.tsx`, path.join(base, "index.ts")]) {
      if (existsSync(c)) {
        const search = context.parentURL ? new URL(context.parentURL).search : "";
        return { url: pathToFileURL(c).href + search, shortCircuit: true };
      }
    }
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.startsWith("file:") && url.includes("?load=")) {
    const u = new URL(url);
    if (u.pathname.endsWith(".ts")) {
      const source = await readFile(fileURLToPath(u), "utf8");
      return {
        format: "module",
        shortCircuit: true,
        source: ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText,
      };
    }
  }
  return nextLoad(url, context);
}
