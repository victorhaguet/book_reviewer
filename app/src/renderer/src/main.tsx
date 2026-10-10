import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApiProvider } from './api-context'
import { StartScreen } from './StartScreen'
import './styles.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Missing #root element in index.html')

createRoot(rootElement).render(
  <StrictMode>
    <ApiProvider api={window.api}>
      <StartScreen />
    </ApiProvider>
  </StrictMode>
)
