import { act, render, screen, type RenderResult } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { BookReviewerApi } from '../../shared/ipc-api'
import { ApiProvider } from './api-context'
import { StartScreen } from './StartScreen'

// A fake of the typed IPC API: the component cannot tell it apart
// from the real one exposed by the preload script.
function createFakeApi(overrides: Partial<BookReviewerApi> = {}): BookReviewerApi {
  return {
    getAppVersion: () => Promise.resolve('1.2.3'),
    getAppName: () => Promise.resolve('Book reviewer'),
    ...overrides
  }
}

function startScreenWith(api: BookReviewerApi) {
  return (
    <ApiProvider api={api}>
      <StartScreen />
    </ApiProvider>
  )
}

function renderStartScreen(api: BookReviewerApi): RenderResult {
  return render(startScreenWith(api))
}

describe('StartScreen', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows the app name', async () => {
    renderStartScreen(createFakeApi({ getAppName: () => Promise.resolve('Book') }))

    expect(await screen.findByRole('heading', { name: 'Book' })).toBeInTheDocument()
  })

  it('shows the version given by the IPC API', async () => {
    renderStartScreen(createFakeApi({ getAppVersion: () => Promise.resolve('4.5.6') }))

    expect(await screen.findByText('Version 4.5.6')).toBeInTheDocument()
  })

  it('ignores answers from an API that has been replaced', async () => {
    // The old API answers both calls with 'Old', but only after it is replaced.
    let resolveOldAnswer: (value: string) => void = () => undefined
    const oldAnswer = new Promise<string>((resolve) => {
      resolveOldAnswer = resolve
    })
    const { rerender } = renderStartScreen(
      createFakeApi({
        getAppName: () => oldAnswer,
        getAppVersion: () => oldAnswer
      })
    )

    rerender(startScreenWith(createFakeApi({ getAppName: () => Promise.resolve('New') })))
    expect(await screen.findByRole('heading', { name: 'New' })).toBeInTheDocument()
    await act(async () => {
      resolveOldAnswer('Old')
      await oldAnswer
    })

    expect(screen.getByRole('heading')).toHaveTextContent('New')
    expect(screen.getByText('Version 1.2.3')).toBeInTheDocument()
  })

  it('fails with a clear message when rendered outside an ApiProvider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(() => render(<StartScreen />)).toThrow('useApi must be used inside an ApiProvider')
  })
})
