// SPIKE-001: TS/TSX → ESM with the TypeScript compiler already in devDependencies (no type check;
// `npx tsc --noEmit` does that for the whole repo).
const ts = require("typescript");

module.exports = function tsLoader(source) {
  const out = ts.transpileModule(source, {
    fileName: this.resourcePath,
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
      isolatedModules: true,
      esModuleInterop: true,
      removeComments: false,
    },
  });
  return out.outputText;
};
