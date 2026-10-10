// The languages the app interface is translated into.
// English comes first: it is the fallback for any other OS language.
export const INTERFACE_LANGUAGES = ['en', 'fr'] as const

export type InterfaceLanguage = (typeof INTERFACE_LANGUAGES)[number]

export function isInterfaceLanguage(value: unknown): value is InterfaceLanguage {
  return INTERFACE_LANGUAGES.some((language) => language === value)
}
