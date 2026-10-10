import 'i18next'
import type { resources } from './i18n'

// Makes t() check its keys: a typo or a missing English key
// is a type error instead of a raw key shown on screen.
declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)['en']
  }
}
