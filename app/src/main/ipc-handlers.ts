import type { IpcMain } from 'electron'
import { getAppInfo } from '../core/app-info'
import { IPC_CHANNELS } from '../shared/ipc-api'

// Only the part of ipcMain we use, so tests can pass a fake.
export type IpcHandlerRegistry = Pick<IpcMain, 'handle'>

// The main process stays thin: each handler delegates to core.
export function registerIpcHandlers(ipcMain: IpcHandlerRegistry): void {
  ipcMain.handle(IPC_CHANNELS.getAppVersion, () => getAppInfo().version)
  ipcMain.handle(IPC_CHANNELS.getAppName, () => getAppInfo().name)
}
