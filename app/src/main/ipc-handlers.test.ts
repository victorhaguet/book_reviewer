import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getAppInfo } from '../core/app-info'
import { IPC_CHANNELS } from '../shared/ipc-api'
import { registerIpcHandlers, type IpcHandlerRegistry } from './ipc-handlers'

type Handler = (...args: unknown[]) => unknown

// A stand-in for Electron's ipcMain: it records the handlers so the test
// can call them the way the renderer would.
function createFakeIpcMain(): IpcHandlerRegistry & {
  invoke(channel: string, ...args: unknown[]): unknown
} {
  const handlers = new Map<string, Handler>()
  return {
    handle(channel, listener) {
      handlers.set(channel, listener as Handler)
    },
    invoke(channel, ...args) {
      const handler = handlers.get(channel)
      if (!handler) throw new Error(`No handler registered for ${channel}`)
      return handler({}, ...args)
    }
  }
}

describe('registerIpcHandlers', () => {
  // Each test gets its own real temporary folder for the settings file.
  let folder: string
  let settingsFilePath: string

  beforeEach(async () => {
    folder = await mkdtemp(join(tmpdir(), 'book-reviewer-'))
    settingsFilePath = join(folder, 'settings.json')
  })

  afterEach(async () => {
    await rm(folder, { recursive: true, force: true })
  })

  function registerWith(osLocale = 'en-US', applyInterfaceLanguage = () => undefined) {
    const ipcMain = createFakeIpcMain()
    registerIpcHandlers(ipcMain, {
      settingsFilePath,
      getOsLocale: () => osLocale,
      applyInterfaceLanguage
    })
    return ipcMain
  }

  it('answers the app version request with the version from core', async () => {
    const ipcMain = registerWith()

    expect(await ipcMain.invoke(IPC_CHANNELS.getAppVersion)).toBe(getAppInfo().version)
  })

  describe('interface language', () => {
    it('reads the saved choice', async () => {
      await writeFile(settingsFilePath, JSON.stringify({ interfaceLanguage: 'fr' }))
      const ipcMain = registerWith('en-US')

      expect(await ipcMain.invoke(IPC_CHANNELS.getInterfaceLanguage)).toBe('fr')
    })

    it('follows the OS language when nothing is saved and the OS is in French', async () => {
      const ipcMain = registerWith('fr-CA')

      expect(await ipcMain.invoke(IPC_CHANNELS.getInterfaceLanguage)).toBe('fr')
    })

    it('falls back to English when nothing is saved and the OS is in another language', async () => {
      const ipcMain = registerWith('de-DE')

      expect(await ipcMain.invoke(IPC_CHANNELS.getInterfaceLanguage)).toBe('en')
    })

    it('saves the choice so the next launch restores it', async () => {
      await registerWith('en-US').invoke(IPC_CHANNELS.setInterfaceLanguage, 'fr')

      const nextLaunch = registerWith('en-US')

      expect(await nextLaunch.invoke(IPC_CHANNELS.getInterfaceLanguage)).toBe('fr')
    })

    it('applies the saved language to the parts of the app the main process draws', async () => {
      const applyInterfaceLanguage = vi.fn()
      const ipcMain = registerWith('en-US', applyInterfaceLanguage)

      await ipcMain.invoke(IPC_CHANNELS.setInterfaceLanguage, 'fr')

      expect(applyInterfaceLanguage).toHaveBeenCalledWith('fr')
    })

    it('refuses to save a language the interface is not translated into', async () => {
      const ipcMain = registerWith('en-US')

      await expect(ipcMain.invoke(IPC_CHANNELS.setInterfaceLanguage, 'de')).rejects.toThrow(
        'Unknown interface language: de'
      )
      expect(await ipcMain.invoke(IPC_CHANNELS.getInterfaceLanguage)).toBe('en')
    })
  })
})
