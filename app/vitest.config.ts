/**
 * Vitest configuration
 * One Vitest project per environment: core and main run in Node,
 * the React renderer runs in a fake browser (jsdom).
 */

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // `npm run test:coverage` fails when any metric drops under 90%.
    // The entry points only wire Electron and React together and are
    // not reachable from a unit test, so they are left out.
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.d.ts',
        'src/renderer/test-setup.ts',
        'src/main/index.ts',
        'src/preload/index.ts',
        'src/renderer/src/main.tsx'
      ],
      thresholds: {
        lines: 90,
        branches: 90,
        functions: 90,
        statements: 90
      }
    },
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
