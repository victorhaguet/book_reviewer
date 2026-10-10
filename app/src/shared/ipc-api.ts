// The typed contract between the renderer and the main process.
// Every call the React UI can make to the main process is listed here:
// add a channel name and a method together, then implement the handler
// in src/main/ipc-handlers.ts and expose it in src/preload/index.ts.

import type { InterfaceLanguage } from './interface-language'

export const IPC_CHANNELS = {
  getAppVersion: 'app:get-version',
  getInterfaceLanguage: 'settings:get-interface-language',
  setInterfaceLanguage: 'settings:set-interface-language'
} as const

export interface BookReviewerApi {
  getAppVersion(): Promise<string>
  getInterfaceLanguage(): Promise<InterfaceLanguage>
  setInterfaceLanguage(language: InterfaceLanguage): Promise<void>
}
