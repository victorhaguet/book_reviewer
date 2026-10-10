/**
 * Build configuration for electron-vite. It translates TypeScript code into
 * JavaScript code (in the `out/` folder) for the main process (backend), the preload
 * script (bridge between the backend and the frontend) and the React renderer (frontend).
 * The React plugin enables hot reload of the UI.
 */

import react from '@vitejs/plugin-react'
import { defineConfig } from 'electron-vite'

export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    plugins: [react()]
  }
})
