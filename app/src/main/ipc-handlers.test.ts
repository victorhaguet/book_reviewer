import { describe, expect, it } from 'vitest'
import { getAppInfo } from '../core/app-info'
import { IPC_CHANNELS } from '../shared/ipc-api'
import { registerIpcHandlers, type IpcHandlerRegistry } from './ipc-handlers'

type Handler = (...args: unknown[]) => unknown

// A stand-in for Electron's ipcMain: it records the handlers so the test
// can call them the way the renderer would.
function createFakeIpcMain(): IpcHandlerRegistry & { invoke(channel: string): unknown } {
  const handlers = new Map<string, Handler>()
  return {
    handle(channel, listener) {
      handlers.set(channel, listener as Handler)
    },
    invoke(channel) {
      const handler = handlers.get(channel)
      if (!handler) throw new Error(`No handler registered for ${channel}`)
      return handler({})
    }
  }
}

describe('registerIpcHandlers', () => {
  it('answers the app version request with the version from core', async () => {
    const ipcMain = createFakeIpcMain()

    registerIpcHandlers(ipcMain)

    expect(await ipcMain.invoke(IPC_CHANNELS.getAppVersion)).toBe(getAppInfo().version)
  })
  it('answers the app name request with the name', async () => {
    const ipcMain = createFakeIpcMain()

    registerIpcHandlers(ipcMain)

    expect(await ipcMain.invoke(IPC_CHANNELS.getAppName)).toBe(getAppInfo().name)
  })
})
