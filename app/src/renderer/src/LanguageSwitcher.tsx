import { useTranslation } from 'react-i18next'
import { INTERFACE_LANGUAGES, isInterfaceLanguage } from '../../shared/interface-language'
import { useApi } from './api-context'

export function LanguageSwitcher() {
  const api = useApi()
  const { t, i18n } = useTranslation()

  function chooseLanguage(language: string) {
    if (!isInterfaceLanguage(language)) return
    void i18n.changeLanguage(language)
    void api.setInterfaceLanguage(language)
  }

  return (
    <label className="language-switcher">
      {t('languageSwitcher.label')}
      <select
        value={i18n.resolvedLanguage}
        onChange={(event) => {
          chooseLanguage(event.target.value)
        }}
      >
        {INTERFACE_LANGUAGES.map((language) => (
          <option key={language} value={language}>
            {t(`languageSwitcher.languages.${language}`)}
          </option>
        ))}
      </select>
    </label>
  )
}
