import i18next, { type i18n } from 'i18next'
import type { InterfaceLanguage } from '../interface-language'
import en from './en.json'
import fr from './fr.json'

export const resources = {
  en: { translation: en },
  fr: { translation: fr }
} as const

// One i18next instance per app (or per test), given to React
// through <I18nextProvider>. The resources are bundled, so the
// instance is ready as soon as this function returns.
export function createI18n(language: InterfaceLanguage): i18n {
  const instance = i18next.createInstance()
  void instance.init({
    resources,
    lng: language,
    fallbackLng: 'en',
    initAsync: false,
    // React already escapes the text it displays.
    interpolation: { escapeValue: false }
  })
  return instance
}
