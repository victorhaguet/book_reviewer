import type { IpcMain } from 'electron'
import { getAppInfo } from '../core/app-info'
import { loadInterfaceLanguage, saveInterfaceLanguage } from '../core/interface-language'
import type { InterfaceLanguage } from '../shared/interface-language'
import { IPC_CHANNELS } from '../shared/ipc-api'

// Only the part of ipcMain we use, so tests can pass a fake.
export type IpcHandlerRegistry = Pick<IpcMain, 'handle'>

// What the handlers need from Electron, passed in so tests can choose it.
export interface IpcHandlerDependencies {
  settingsFilePath: string
  getOsLocale: () => string
  // Translates what the main process draws itself, such as the menu.
  applyInterfaceLanguage: (language: InterfaceLanguage) => void
}

// The main process stays thin: each handler delegates to core.
export function registerIpcHandlers(
  ipcMain: IpcHandlerRegistry,
  { settingsFilePath, getOsLocale, applyInterfaceLanguage }: IpcHandlerDependencies
): void {
  ipcMain.handle(IPC_CHANNELS.getAppVersion, () => getAppInfo().version)
  ipcMain.handle(IPC_CHANNELS.getInterfaceLanguage, () =>
    loadInterfaceLanguage(settingsFilePath, getOsLocale())
  )
  ipcMain.handle(IPC_CHANNELS.setInterfaceLanguage, async (_event, language: unknown) => {
    const savedLanguage = await saveInterfaceLanguage(settingsFilePath, language)
    applyInterfaceLanguage(savedLanguage)
  })
}
