// Synthetic UI fixtures, outside the editorial catalogue and its publication gates.
export const packageFiles = (version = '1.0.0', color = '#6ee7b7') => ({
  [`packages/ui/${version}/package.json`]: JSON.stringify({ name: 'ui', version, dependencies: {} }),
  [`packages/ui/${version}/index.ts`]: `export const color: string = ${JSON.stringify(color)};\n`,
});
export const demoSource = (name, multiplier = 2) => `import { color } from '@space/ui';
export const calculate = (n: number): number => n * ${multiplier};
export function mount(root: HTMLElement): () => void {
  root.style.cssText = 'font:18px system-ui;padding:28px;background:#10201c;color:white;border-radius:16px';
  const title = document.createElement('h2'); title.textContent = ${JSON.stringify(name)};
  const label = document.createElement('label'); label.textContent = 'Choose a number ';
  const input = document.createElement('input'); input.type = 'range'; input.min = '1'; input.max = '20'; input.value = '5';
  const result = document.createElement('p'); result.style.color = color;
  const update = () => { result.textContent = input.value + ' × ${multiplier} = ' + calculate(Number(input.value)); };
  input.addEventListener('input', update); label.append(input); root.append(title, label, result); update();
  return () => { input.removeEventListener('input', update); root.replaceChildren(); };
}
`;
export const demoFiles = (demo, multiplier = 2, version = '1.0.0') => ({
  [`demos/${demo}/demo.json`]: JSON.stringify({ entry: 'index.ts', test: 'test.mjs', sdk: 'content-hub-dom-v1', dependencies: { ui: version } }, null, 2),
  [`demos/${demo}/index.ts`]: demoSource(demo, multiplier),
  [`demos/${demo}/test.mjs`]: `import { test } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { calculate } from './index.js';\ntest('calculation', () => assert.equal(calculate(5), ${5 * multiplier}));\n`,
});
export function seed(hub, space = 'research') {
  hub.createSpace(space);
  hub.write(space, { expectedHead: hub.head(space), scope: 'packages/ui/1.0.0', files: packageFiles() });
  hub.write(space, { expectedHead: hub.head(space), scope: 'demos/alpha', files: demoFiles('alpha') });
  hub.write(space, { expectedHead: hub.head(space), scope: 'demos/beta', files: demoFiles('beta', 3) });
  const jobs = hub.work();
  for (const job of jobs) {
    if (job.status !== 'ready') throw new Error(job.log);
    hub.publish(space, job.demo, job.id, { expectedGeneration: 0 });
  }
  return jobs;
}
