import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { BookReviewerApi } from '../../shared/ipc-api'
import { ApiProvider } from './api-context'
import { StartScreen } from './StartScreen'

// A fake of the typed IPC API: the component cannot tell it apart
// from the real one exposed by the preload script.
function createFakeApi(overrides: Partial<BookReviewerApi> = {}): BookReviewerApi {
  return {
    getAppVersion: async () => '1.2.3',
    getAppName: async () => 'Book reviewer',
    ...overrides
  }
}

function renderStartScreen(api: BookReviewerApi): void {
  render(
    <ApiProvider api={api}>
      <StartScreen />
    </ApiProvider>
  )
}

describe('StartScreen', () => {
  it('shows the app name', async () => {
    renderStartScreen(createFakeApi( { getAppName: async () => 'Book'}))

    expect(await screen.findByRole('heading', { name: 'Book' })).toBeInTheDocument()
  })

  it('shows the version given by the IPC API', async () => {
    renderStartScreen(createFakeApi({ getAppVersion: async () => '4.5.6' }))

    expect(await screen.findByText('Version 4.5.6')).toBeInTheDocument()
  })
})
