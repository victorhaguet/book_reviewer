import { join } from 'node:path'
import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import { getAppInfo } from '../core/app-info'
import { loadInterfaceLanguage } from '../core/interface-language'
import type { InterfaceLanguage } from '../shared/interface-language'
import { createMenuTemplate } from './app-menu'
import { registerIpcHandlers } from './ipc-handlers'

function applyInterfaceLanguage(language: InterfaceLanguage): void {
  Menu.setApplicationMenu(Menu.buildFromTemplate(createMenuTemplate(language, process.platform)))
}

function createWindow(): void {
  const window = new BrowserWindow({
    width: 1100,
    height: 750,
    title: getAppInfo().name,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  })

  // In development electron-vite serves the UI with hot reload;
  // otherwise load the built files.
  const devServerUrl = process.env['ELECTRON_RENDERER_URL']
  if (!app.isPackaged && devServerUrl) {
    void window.loadURL(devServerUrl)
  } else {
    void window.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

void app.whenReady().then(async () => {
  const settingsFilePath = join(app.getPath('userData'), 'settings.json')
  const getOsLocale = () => app.getSystemLocale()

  registerIpcHandlers(ipcMain, { settingsFilePath, getOsLocale, applyInterfaceLanguage })
  applyInterfaceLanguage(await loadInterfaceLanguage(settingsFilePath, getOsLocale()))
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
