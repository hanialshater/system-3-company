// Test-only loader for rendering the Life Hacks stage components (.tsx) with react-dom/server (W-1258, W-1241).
// Registered by tests/lifehacks/home-locked.test.mjs on top of register.mjs, so the other suites keep the plain
// .ts loader. It adds: .tsx transpiled with the automatic JSX runtime; the "@/" alias to src/ (tsconfig paths);
// CSS modules as a proxy that returns each class name as written (so markup says class="target"); and two spies
// for the press test, swapped in only where a component imports them by the alias:
//   "@/kit/milestones" -> render-spies.mjs (records milestone names in globalThis.__lhReached)
//   "@/kit/controls"   -> render-spies.mjs (Control records its text and onClick in globalThis.__lhControls)
// The spies re-export the real kit modules by file URL, so nothing else about the kit is replaced.
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import ts from "typescript";

const SRC = new URL("../../src/", import.meta.url);
const SPIES = new URL("./render-spies.mjs", import.meta.url).href;
const withExtension = (href) => {
  if (/\.[cm]?[jt]sx?$|\.json$|\.css$/.test(href)) return href;
  for (const ext of [".tsx", ".ts"]) if (existsSync(new URL(href + ext))) return href + ext;
  return href;
};

export async function resolve(specifier, context, nextResolve) {
  const parent = context.parentURL ?? "";
  if ((specifier === "@/kit/milestones" || specifier === "@/kit/controls") && parent !== SPIES) return { url: SPIES, shortCircuit: true };
  if (specifier.startsWith("@/")) return { url: withExtension(new URL(specifier.slice(2), SRC).href), shortCircuit: true };
  if (specifier.startsWith(".") && parent.endsWith(".tsx")) return { url: withExtension(new URL(specifier, parent).href), shortCircuit: true };
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.startsWith("file:") && url.endsWith(".css")) {
    return { format: "module", shortCircuit: true, source: "export default new Proxy({}, { get: (_, k) => (typeof k === 'string' ? k : undefined) });" };
  }
  if (url.startsWith("file:") && url.endsWith(".tsx")) {
    const source = await readFile(new URL(url), "utf8");
    const { outputText } = ts.transpileModule(source, {
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX },
    });
    return { format: "module", shortCircuit: true, source: outputText };
  }
  return nextLoad(url, context);
}
