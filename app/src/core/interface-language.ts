import { isInterfaceLanguage, type InterfaceLanguage } from '../shared/interface-language'
import { readSettings, updateSettings } from './settings-file'

// The saved choice wins; otherwise follow the OS language
// when the interface is translated into it, otherwise English.
export function resolveInterfaceLanguage(saved: unknown, osLocale: string): InterfaceLanguage {
  if (isInterfaceLanguage(saved)) return saved

  // An OS locale looks like "fr", "fr-FR" or "fr_FR": keep the language part.
  const osLanguage = osLocale.split(/[-_]/)[0]?.toLowerCase()
  if (isInterfaceLanguage(osLanguage)) return osLanguage

  return 'en'
}

export async function loadInterfaceLanguage(
  settingsFilePath: string,
  osLocale: string
): Promise<InterfaceLanguage> {
  const settings = await readSettings(settingsFilePath)
  return resolveInterfaceLanguage(settings.interfaceLanguage, osLocale)
}

// The value comes from the renderer, which is not trusted: check it first.
// Returns the language once it is checked and saved.
export async function saveInterfaceLanguage(
  settingsFilePath: string,
  language: unknown
): Promise<InterfaceLanguage> {
  if (!isInterfaceLanguage(language)) {
    throw new Error(`Unknown interface language: ${String(language)}`)
  }
  await updateSettings(settingsFilePath, { interfaceLanguage: language })
  return language
}
