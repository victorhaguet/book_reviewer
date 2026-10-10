import { describe, expect, it } from 'vitest'
import en from './en.json'
import fr from './fr.json'

// Lists every key as a dotted path, for example "startScreen.version".
function listKeys(resource: object, prefix = ''): string[] {
  return Object.entries(resource).flatMap(([key, value]: [string, unknown]) =>
    typeof value === 'object' && value !== null
      ? listKeys(value, `${prefix}${key}.`)
      : [`${prefix}${key}`]
  )
}

describe('translation resources', () => {
  it('have exactly the same keys in French and English', () => {
    expect(listKeys(fr).sort()).toEqual(listKeys(en).sort())
  })
})
