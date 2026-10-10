import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import type { InterfaceLanguage } from '../../shared/interface-language'
import { ApiProvider } from './api-context'
import { createI18n } from '../../shared/i18n/i18n'
import { StartScreen } from './StartScreen'
import './styles.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Missing #root element in index.html')
const root = createRoot(rootElement)

// The language is asked first so the very first render is already
// in the right language, without flashing English. If the main process
// cannot answer, show the app in English rather than a blank window.
void window.api
  .getInterfaceLanguage()
  .catch((): InterfaceLanguage => 'en')
  .then(renderApp)

function renderApp(language: InterfaceLanguage): void {
  const i18n = createI18n(language)
  document.documentElement.lang = language
  i18n.on('languageChanged', (newLanguage) => {
    document.documentElement.lang = newLanguage
  })

  root.render(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <ApiProvider api={window.api}>
          <StartScreen />
        </ApiProvider>
      </I18nextProvider>
    </StrictMode>
  )
}
