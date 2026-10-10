import { act, fireEvent, render, screen, type RenderResult } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { InterfaceLanguage } from '../../shared/interface-language'
import type { BookReviewerApi } from '../../shared/ipc-api'
import { ApiProvider } from './api-context'
import { createI18n } from '../../shared/i18n/i18n'
import { StartScreen } from './StartScreen'

// A fake of the typed IPC API: the component cannot tell it apart
// from the real one exposed by the preload script.
function createFakeApi(overrides: Partial<BookReviewerApi> = {}): BookReviewerApi {
  return {
    getAppVersion: () => Promise.resolve('1.2.3'),
    getInterfaceLanguage: () => Promise.resolve('en'),
    setInterfaceLanguage: () => Promise.resolve(),
    ...overrides
  }
}

function startScreenWith(api: BookReviewerApi, language: InterfaceLanguage = 'en') {
  return (
    <I18nextProvider i18n={createI18n(language)}>
      <ApiProvider api={api}>
        <StartScreen />
      </ApiProvider>
    </I18nextProvider>
  )
}

function renderStartScreen(api: BookReviewerApi, language: InterfaceLanguage = 'en'): RenderResult {
  return render(startScreenWith(api, language))
}

describe('StartScreen', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows the app name in the interface language', () => {
    renderStartScreen(createFakeApi(), 'fr')

    expect(screen.getByRole('heading', { name: 'Relecteur IA' })).toBeInTheDocument()
  })

  it('names the window after the app in the interface language', () => {
    renderStartScreen(createFakeApi(), 'fr')

    expect(document.title).toBe('Relecteur IA')
  })

  it('shows the version given by the IPC API', async () => {
    renderStartScreen(createFakeApi({ getAppVersion: () => Promise.resolve('4.5.6') }))

    expect(await screen.findByText('Version 4.5.6')).toBeInTheDocument()
  })

  it('ignores answers from an API that has been replaced', async () => {
    // The old API answers with '0.0.1', but only after it is replaced.
    let resolveOldAnswer: (value: string) => void = () => undefined
    const oldAnswer = new Promise<string>((resolve) => {
      resolveOldAnswer = resolve
    })
    const { rerender } = renderStartScreen(createFakeApi({ getAppVersion: () => oldAnswer }))

    rerender(startScreenWith(createFakeApi({ getAppVersion: () => Promise.resolve('1.2.3') })))
    expect(await screen.findByText('Version 1.2.3')).toBeInTheDocument()
    await act(async () => {
      resolveOldAnswer('0.0.1')
      await oldAnswer
    })

    expect(screen.getByText('Version 1.2.3')).toBeInTheDocument()
  })

  it('shows the interface in the language it starts with', () => {
    renderStartScreen(createFakeApi(), 'fr')

    expect(screen.getByRole('combobox', { name: 'Langue de l’interface' })).toHaveValue('fr')
  })

  it('switches the displayed text as soon as another language is chosen', () => {
    renderStartScreen(createFakeApi(), 'en')

    fireEvent.change(screen.getByRole('combobox', { name: 'Interface language' }), {
      target: { value: 'fr' }
    })

    expect(screen.getByRole('combobox', { name: 'Langue de l’interface' })).toHaveValue('fr')
    expect(screen.getByRole('heading', { name: 'Relecteur IA' })).toBeInTheDocument()
    expect(document.title).toBe('Relecteur IA')
  })

  it('asks the main process to save the chosen language', () => {
    const setInterfaceLanguage = vi.fn(() => Promise.resolve())
    renderStartScreen(createFakeApi({ setInterfaceLanguage }), 'en')

    fireEvent.change(screen.getByRole('combobox', { name: 'Interface language' }), {
      target: { value: 'fr' }
    })

    expect(setInterfaceLanguage).toHaveBeenCalledWith('fr')
  })

  it('fails with a clear message when rendered outside an ApiProvider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(() => render(<StartScreen />)).toThrow('useApi must be used inside an ApiProvider')
  })
})
