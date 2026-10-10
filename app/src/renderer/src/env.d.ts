import type { BookReviewerApi } from '../../shared/ipc-api'

// window.api is set by the preload script (src/preload/index.ts).
declare global {
  interface Window {
    api: BookReviewerApi
  }
}
