/** 
 * Vitest configuration
 * One Vitest project per environment: core and main run in Node,
 * the React renderer runs in a fake browser (jsdom).
 */

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'


export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'node',
          environment: 'node',
          include: ['src/core/**/*.test.ts', 'src/main/**/*.test.ts']
        }
      },
      {
        plugins: [react()],
        test: {
          name: 'renderer',
          environment: 'jsdom',
          include: ['src/renderer/**/*.test.tsx'],
          setupFiles: ['src/renderer/test-setup.ts']
        }
      }
    ]
  }
})
