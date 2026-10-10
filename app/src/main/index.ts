import { join } from 'node:path'
import { app, BrowserWindow, ipcMain } from 'electron'
import { getAppInfo } from '../core/app-info'
import { registerIpcHandlers } from './ipc-handlers'

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

void app.whenReady().then(() => {
  registerIpcHandlers(ipcMain)
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
