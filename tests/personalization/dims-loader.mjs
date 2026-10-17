// Test-only loader for tests/personalization/dims-index.test.mjs: lets Node import the product's
// src/lib/feed-index.ts (the real feedOrder) outside Next. It adds the "@/" alias to src/ (tsconfig paths),
// extensionless relative imports from .ts, JSON imports without attributes (as the bundler allows), and
// "server-only" as an empty module. TypeScript is transpiled with the existing compiler dependency.
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import ts from "typescript";

const SRC = new URL("../../src/", import.meta.url);
const EMPTY = "data:text/javascript,export%20%7B%7D";
const withExtension = (href) => {
  if (/\.[cm]?[jt]sx?$|\.json$/.test(href)) return href;
  for (const ext of [".ts", ".tsx"]) if (existsSync(new URL(href + ext))) return href + ext;
  return href;
};

export async function resolve(specifier, context, nextResolve) {
  const parent = context.parentURL ?? "";
  if (specifier === "server-only") return { url: EMPTY, shortCircuit: true };
  if (specifier.startsWith("@/")) return { url: withExtension(new URL(specifier.slice(2), SRC).href), shortCircuit: true };
  if (specifier.startsWith(".") && /\.tsx?$/.test(parent)) return { url: withExtension(new URL(specifier, parent).href), shortCircuit: true };
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.startsWith("file:") && url.endsWith(".json")) {
    return { format: "module", shortCircuit: true, source: `export default ${await readFile(new URL(url), "utf8")};` };
  }
  if (url.startsWith("file:") && /\.tsx?$/.test(url)) {
    const source = await readFile(new URL(url), "utf8");
    const { outputText } = ts.transpileModule(source, {
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX },
    });
    return { format: "module", shortCircuit: true, source: outputText };
  }
  return nextLoad(url, context);
}
