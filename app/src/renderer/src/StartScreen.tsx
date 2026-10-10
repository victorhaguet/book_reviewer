import { useEffect, useState } from 'react'
import { useApi } from './api-context'

export function StartScreen() {
  const api = useApi()
  const [version, setVersion] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    void api.getAppVersion().then((appVersion) => {
      if (isMounted) setVersion(appVersion)
    })
    void api.getAppName().then((appName) => {
      if (isMounted) setName(appName)
    })
    return () => {
      isMounted = false
    }
  }, [api])

  return (
    <main className="start-screen">
      {name && <h1>{name}</h1>}
      {version && <p className="version">Version {version}</p>}
    </main>
  )
}
