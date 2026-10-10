/**
 * ESLint configuration (flat config).
 * Strict type-aware TypeScript rules everywhere, React hooks rules for the
 * renderer, and Prettier last so that formatting is left to Prettier alone.
 */

import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig(
  { ignores: ['out/', 'coverage/'] },
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    // This file is plain JavaScript, outside the TypeScript projects.
    files: ['eslint.config.mjs'],
    extends: [tseslint.configs.disableTypeChecked]
  },
  {
    files: ['src/core/**', 'src/main/**', 'src/preload/**', '*.config.ts'],
    languageOptions: { globals: globals.node }
  },
  {
    files: ['src/renderer/**'],
    languageOptions: { globals: globals.browser },
    extends: [reactHooks.configs.flat['recommended-latest']]
  },
  prettier
)
