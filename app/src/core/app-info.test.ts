import { describe, expect, it } from 'vitest'
import { getAppInfo } from './app-info'

describe('getAppInfo', () => {
  it('names the app Book Reviewer', () => {
    expect(getAppInfo().name).toBe('Book Reviewer')
  })

  it('gives the version as major.minor.patch', () => {
    expect(getAppInfo().version).toMatch(/^\d+\.\d+\.\d+$/)
  })
})
