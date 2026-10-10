import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useApi } from './api-context'
import { LanguageSwitcher } from './LanguageSwitcher'

export function StartScreen() {
  const api = useApi()
  const { t } = useTranslation()
  const [version, setVersion] = useState<string | null>(null)
  const appName = t('appName')

  useEffect(() => {
    let isMounted = true
    void api.getAppVersion().then((appVersion) => {
      if (isMounted) setVersion(appVersion)
    })
    return () => {
      isMounted = false
    }
  }, [api])

  // The window title follows the page title.
  useEffect(() => {
    document.title = appName
  }, [appName])

  return (
    <main className="start-screen">
      <h1>{appName}</h1>
      {version && <p className="version">{t('startScreen.version', { version })}</p>}
      <LanguageSwitcher />
    </main>
  )
}
