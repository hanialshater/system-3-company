import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import ts from "typescript";

// W-608: engine-v2.ts imports home-models and studyModels by value, extensionless as Next resolves them.
// Resolve a relative extensionless specifier from a .ts file to the sibling .ts file when it exists.
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith(".") && !/\.[cm]?[jt]sx?$|\.json$/.test(specifier) && context.parentURL?.endsWith(".ts")) {
    const candidate = new URL(`${specifier}.ts`, context.parentURL);
    if (existsSync(candidate)) return { url: candidate.href, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.startsWith("file:") && url.endsWith(".ts")) {
    const source = await readFile(new URL(url), "utf8");
    return {
      format: "module",
      shortCircuit: true,
      source: ts.transpileModule(source, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.ESNext,
        },
      }).outputText,
    };
  }
  return nextLoad(url, context);
}
