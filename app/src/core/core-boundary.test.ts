import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// Core must stay plain TypeScript so it can run outside the app
// (for example in an evaluation script). This test fails as soon as
// a core file imports Electron or React.
const FORBIDDEN_PACKAGES = ['electron', 'react', 'react-dom']

function listCoreFiles(): string[] {
  return readdirSync(__dirname, { recursive: true, encoding: 'utf8' })
    .filter((file) => /\.tsx?$/.test(file) && !/\.test\.tsx?$/.test(file))
    .map((file) => join(__dirname, file))
}

// Catches `from 'x'`, `import 'x'`, `import('x')` and `require('x')`.
function importedPackages(source: string): string[] {
  const importPattern = /(?:from|import|import\(|require\()\s*['"]([^'"]+)['"]/g
  return [...source.matchAll(importPattern)].map((match) => match[1] ?? '')
}

describe('core boundary', () => {
  it('imports nothing from Electron or React', () => {
    const violations = listCoreFiles().flatMap((file) =>
      importedPackages(readFileSync(file, 'utf8'))
        .filter((name) =>
          FORBIDDEN_PACKAGES.some((pkg) => name === pkg || name.startsWith(`${pkg}/`))
        )
        .map((name) => `${file} imports ${name}`)
    )

    expect(violations).toEqual([])
  })
})
