// AMD-001 (c2) + rider R1 (W-946): applies the protected hunks to tools/company.mjs in a SCRATCH COPY.
// Usage: node apply-c2-r1.mjs <scratch-repo> rider   (omit "rider" for (c2) alone). Never run it on the real tree:
// the applying commit is made by hand under S3_AMENDMENT=AMD-001 after ratification, from the diff in AMD-001.
import fs from "node:fs";
const [, , repo, withRider] = process.argv;
const f = `${repo}/tools/company.mjs`;
let s = fs.readFileSync(f, "utf8");
const rep = (a, b) => { if (!s.includes(a)) throw new Error("hunk not found: " + a.slice(0, 60)); s = s.replace(a, b); };
rep("//   registry                   regenerate src/demos/registry.generated.ts\n", "//   registry                   regenerate src/demos/*.generated.ts (generator: tools/registry.mjs)\n");
rep('import { fileURLToPath } from "node:url";\n', 'import { fileURLToPath } from "node:url";\nimport { registryFiles } from "./registry.mjs";\n');
const start = s.indexOf("function registrySource(demos) {");
const end = s.indexOf("function cmdRegistry");
s = s.slice(0, start) + "// The generator is ordinary surface: tools/registry.mjs (AMD-001). What judges it stays here:\n// `check` regenerates in memory and fails on drift, and checks generator-independent invariants.\n\n" + s.slice(end);
rep(`  const src = registrySource(loadDemos());
  const out = rel("src/demos/registry.generated.ts");
  const prev = exists(out) ? fs.readFileSync(out, "utf8") : "";
  if (prev !== src) fs.writeFileSync(out, src);
  if (!quiet) console.log(prev === src ? "registry: up to date" : "registry: regenerated");`,
`  let changed = 0;
  for (const [file, src] of Object.entries(registryFiles(loadDemos()))) {
    const out = rel(file);
    const prev = exists(out) ? fs.readFileSync(out, "utf8") : "";
    if (prev !== src) (fs.writeFileSync(out, src), changed++);
  }
  if (!quiet) console.log(changed ? \`registry: regenerated \${changed} file(s)\` : "registry: up to date");`);
const rider = withRider === "rider" ? `
  // Rider R1 (W-946): each loader points at its own lesson's Demo, and metas and loaders never share a file.
  const loaderRe = /"([^"]+)":\\s*\\(\\)\\s*=>\\s*import\\("\\.\\/([^/"]+)\\/([^/"]+)\\/Demo"\\)/g;
  const loaderList = [...gen.matchAll(loaderRe)].map((x) => [x[1], \`\${x[2]}/\${x[3]}\`]);
  const slugOf = new Map(demos.filter((d) => d.meta).map((d) => [\`\${d.domainDir}/\${d.slugDir}\`, d.meta.slug]));
  const loaderCount = new Map();
  for (const [, p] of loaderList) loaderCount.set(p, (loaderCount.get(p) ?? 0) + 1);
  for (const k of onDisk) if (loaderCount.get(k) !== 1) err("src/demos/*.generated.ts", \`lesson \${k} needs exactly one loader (has \${loaderCount.get(k) ?? 0})\`);
  for (const [slug, p] of loaderList) if (slugOf.get(p) !== slug || !onDisk.has(p)) err("src/demos/*.generated.ts", \`loader "\${slug}" points at \${p}, which is not that lesson's Demo\`);
  if ((gen.match(/\\bimport\\s*\\(/g) || []).length !== loaderList.length) err("src/demos/*.generated.ts", "import() in generated code that is not a lesson loader");
  for (const [file, src] of Object.entries(files))
    if (/from "\\.\\/[^"]+\\/meta\\.json"/.test(src) && /\\bimport\\s*\\(/.test(src)) err(file, "a generated file must not hold both metas and loaders (W-946)");
  for (const [file, src] of Object.entries(files))
    if (/(from|import)\\s*\\(?\\s*["'][^"']*\\.generated(\\.ts)?["']/.test(src)) err(file, "a generated file must not import another generated file (keeps invariant 5 transitive)");` : "";
rep(`  // Registry freshness
  const expected = registrySource(demos);
  const regPath = rel("src/demos/registry.generated.ts");
  if (!exists(regPath) || fs.readFileSync(regPath, "utf8") !== expected) err("src/demos/registry.generated.ts", "stale: run \`npm run registry\`");`,
`  // Registry: fresh, and faithful to meta.json whatever the generator does
  const files = registryFiles(demos);
  for (const [file, src] of Object.entries(files))
    if (!exists(rel(file)) || fs.readFileSync(rel(file), "utf8") !== src) err(file, "stale: run \`npm run registry\`");
  for (const f of ls(rel("src/demos")).filter((f) => f.endsWith(".generated.ts")))
    if (!(\`src/demos/\${f}\` in files)) err(\`src/demos/\${f}\`, "generated file the generator no longer produces: delete it");
  const gen = Object.values(files).join("\\n");
  const imported = new Set([...gen.matchAll(/from "\\.\\/([^/"]+)\\/([^/"]+)\\/meta\\.json"/g)].map((x) => \`\${x[1]}/\${x[2]}\`));
  const onDisk = new Set(demos.filter((d) => d.meta && exists(path.join(d.dir, "Demo.tsx"))).map((d) => \`\${d.domainDir}/\${d.slugDir}\`));
  for (const k of onDisk) if (!imported.has(k)) err("src/demos/*.generated.ts", \`lesson \${k} is not imported from its meta.json\`);
  for (const k of imported) if (!onDisk.has(k)) err("src/demos/*.generated.ts", \`imports \${k}, which is not a lesson on disk\`);
  if (/\\bstatus"?\\s*:\\s*["'\`]/.test(gen)) err("src/demos/*.generated.ts", "generated code sets a status literal; status comes only from meta.json");` + (rider ? "\n" + rider : "") + "\n");
fs.writeFileSync(f, s);
console.log("applied (c2)" + (rider ? " + rider R1" : ""));
