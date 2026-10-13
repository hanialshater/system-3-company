// SPIKE-001: CSS modules → a JS module that injects a constructable stylesheet through the kit
// runtime and default-exports the class map. Uses postcss + the postcss-modules plugins Next
// already vendors (the same ones css-loader uses), so class scoping matches the app.
// Scoped names are `<local>_<sha256(css)[0:6]>`: content-addressed and deterministic.
const crypto = require("node:crypto");
const postcss = require("postcss");
const localByDefault = require("next/dist/compiled/postcss-modules-local-by-default");
const extractImports = require("next/dist/compiled/postcss-modules-extract-imports");
const scope = require("next/dist/compiled/postcss-modules-scope");

const minify = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{};,>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();

module.exports = function cssModuleLoader(source) {
  const done = this.async();
  const h = crypto.createHash("sha256").update(source).digest("hex").slice(0, 6);
  postcss([
    localByDefault({ mode: "local" }),
    extractImports(),
    scope({ generateScopedName: (name) => `${name}_${h}` }),
  ])
    .process(source, { from: this.resourcePath })
    .then((res) => {
      const map = {};
      res.root.walkRules((rule) => {
        if (rule.selector === ":export") {
          rule.walkDecls((d) => (map[d.prop] = d.value));
          rule.remove();
        }
      });
      const css = minify(res.root.toString());
      done(
        null,
        `import * as runtime from "@s3c/kit-runtime";\nruntime.style(${JSON.stringify(css)});\nexport default ${JSON.stringify(map)};\n`,
      );
    }, done);
};
