import { createContext, useContext, type ReactNode } from 'react'
import type { BookReviewerApi } from '../../shared/ipc-api'

// Components get the IPC API from this context instead of reading
// window.api directly, so tests can provide a fake one.
const ApiContext = createContext<BookReviewerApi | null>(null)

interface ApiProviderProps {
  api: BookReviewerApi
  children: ReactNode
}

export function ApiProvider({ api, children }: ApiProviderProps) {
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}

export function useApi(): BookReviewerApi {
  const api = useContext(ApiContext)
  if (!api) throw new Error('useApi must be used inside an ApiProvider')
  return api
}
