// index.d.ts is hand-written and is what TypeScript sees for '@/kit/knots' (tsconfig allowJs: false), while the
// bundler loads index.mjs. This test keeps the two export lists identical (EDD-004 engineering review, item 2).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import * as K from '../index.mjs'

test('index.d.ts declares exactly the runtime exports of index.mjs', () => {
  const d = fs.readFileSync(new URL('../index.d.ts', import.meta.url), 'utf8')
  const declared = [...d.matchAll(/^export (?:function|const|let) (\w+)/gm)].map((m) => m[1])
  assert.deepEqual([...new Set(declared)].sort(), Object.keys(K).sort())
})
