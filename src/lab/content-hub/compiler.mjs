// Trusted local prototype compiler. The process boundary is NOT a hostile-code sandbox.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import ts from 'typescript';

export function compile(root, config, output) {
  const options = {
    target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true, allowJs: true, checkJs: false, types: [],
    skipLibCheck: true, noEmitOnError: true, rootDir: root, outDir: output,
    baseUrl: root, paths: Object.fromEntries(Object.entries(config.aliases).map(([name, file]) => [name, [file]])),
  };
  const resolve = (specifier, containing) => {
    if (specifier.startsWith('node:')) return null;
    const result = ts.resolveModuleName(specifier, containing, options, ts.sys).resolvedModule;
    if (!result || !result.resolvedFileName.startsWith(root + path.sep)) {
      throw new Error(`Import outside pinned snapshot: ${specifier}`);
    }
    return result.resolvedFileName;
  };
  const emitted = file => path.relative(root, file).replace(/\.(?:ts|tsx)$/, '.js');
  const production = new Set();
  function collect(file) {
    if (production.has(file)) return;
    production.add(file);
    const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
    function visit(node) {
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier) {
        if (!ts.isStringLiteral(node.moduleSpecifier)) throw new Error('Expected static module import');
        const target = resolve(node.moduleSpecifier.text, file);
        if (!target) throw new Error('Browser code cannot import Node builtins');
        collect(target);
      }
      if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
        throw new Error('Prototype supports static imports only');
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  collect(path.join(root, config.entry));
  const transform = context => source => {
    const rewrite = literal => {
      const target = resolve(literal.text, source.fileName);
      if (!target) return literal;
      let relative = path.posix.relative(path.posix.dirname(emitted(source.fileName)), emitted(target));
      if (!relative.startsWith('.')) relative = './' + relative;
      return ts.factory.createStringLiteral(relative);
    };
    const visit = node => {
      if (ts.isImportDeclaration(node)) return ts.factory.updateImportDeclaration(node, node.modifiers, node.importClause, rewrite(node.moduleSpecifier), node.attributes);
      if (ts.isExportDeclaration(node) && node.moduleSpecifier) return ts.factory.updateExportDeclaration(node, node.modifiers, node.isTypeOnly, node.exportClause, rewrite(node.moduleSpecifier), node.attributes);
      if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) throw new Error('Prototype supports static imports only');
      return ts.visitEachChild(node, visit, context);
    };
    return ts.visitNode(source, visit);
  };
  const program = ts.createProgram([path.join(root, config.entry), path.join(root, config.test)], options);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  if (diagnostics.length) throw new Error(ts.formatDiagnostics(diagnostics, {
    getCanonicalFileName: f => path.relative(root, f), getCurrentDirectory: () => root, getNewLine: () => '\n',
  }));
  const result = program.emit(undefined, undefined, undefined, undefined, { before: [transform] });
  if (result.emitSkipped) throw new Error('Compilation skipped');
  fs.writeFileSync(path.join(output, 'package.json'), '{"type":"module"}');
  const testLog = execFileSync(process.execPath, ['--test', path.join(output, emitted(path.join(root, config.test)))], {
    timeout: 10000, encoding: 'utf8', maxBuffer: 1024 * 1024,
    env: { PATH: process.env.PATH, NODE_ENV: 'test' },
  });
  return { entry: emitted(path.join(root, config.entry)), files: [...production].map(emitted).sort(), testLog };
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  try {
    const [root, configFile, output, resultFile] = process.argv.slice(2);
    fs.writeFileSync(resultFile, JSON.stringify(compile(root, JSON.parse(fs.readFileSync(configFile, 'utf8')), output)));
  } catch (error) {
    console.error(error.message);
    if (error.stdout) console.error(error.stdout.toString());
    process.exitCode = 1;
  }
}
